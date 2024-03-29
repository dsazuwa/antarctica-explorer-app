import { useRouter } from 'next/router';

import Pagination from '@/components/common/Pagination';
import PerPageSelector from '@/components/common/PerPageSelector';
import { itemsPerPageOptions } from '@/lib/constants';
import { updateQueryParam } from '@/lib/param.utils';
import { useAppSelector } from '@/store';

export default function PaginationControls() {
  const router = useRouter();

  const { currentPage, itemsPerPage, totalPages } = useAppSelector(
    (s) => s.expeditionState.expeditions,
  );

  const handleClick = (param: 'page' | 'itemsPerPage', value: number) => {
    updateQueryParam(router, { param, value });
  };

  return (
    <div className='mt-auto flex h-20 w-full flex-col-reverse items-center gap-2 text-xs sm:grid sm:h-10 sm:grid-cols-3 md:gap-0'>
      <PerPageSelector
        options={itemsPerPageOptions}
        itemsPerPage={
          itemsPerPageOptions.findIndex((x) => x === itemsPerPage) || 0
        }
        setItemsPerPage={(i) => handleClick('itemsPerPage', i)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        navigateToFirst={() => handleClick('page', 0)}
        navigateToPrevious={() =>
          handleClick('page', Math.max(0, currentPage - 1))
        }
        navigateToNext={() =>
          handleClick('page', Math.min(currentPage + 1, totalPages - 1))
        }
        navigateToLast={() => handleClick('page', Math.max(totalPages - 1, 0))}
      />
    </div>
  );
}
