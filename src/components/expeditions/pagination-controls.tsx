'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Pagination from '@/components/pagination';
import SizeSelector from '@/components/size-selector';
import { sizeOptions } from '@/lib/constants';
import { updateQueryParam } from '@/lib/param.utils';

type Props = { size: number; currentPage: number; totalPages: number };

export default function PaginationControls({
  currentPage,
  totalPages,
  size,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (param: 'page' | 'size', value: number) => {
    updateQueryParam(router, searchParams, { param, value });
  };

  return (
    <div className='mt-auto flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row'>
      <SizeSelector
        options={sizeOptions}
        size={size}
        setSize={(size) => handleClick('size', size)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        navigateTo={(page: number) =>
          handleClick('page', Math.min(Math.max(1, page), totalPages))
        }
        navigateToPrevious={() =>
          handleClick('page', Math.max(1, currentPage - 1))
        }
        navigateToNext={() =>
          handleClick('page', Math.min(currentPage + 1, totalPages))
        }
      />
    </div>
  );
}
