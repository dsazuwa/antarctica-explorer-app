import { ArrowRightIcon } from '@radix-ui/react-icons';
import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

const variants = cva(
  'group flex flex-row items-center text-center gap-2 rounded-[32px] py-2 text-xs font-extrabold transition-colors md:text-sm',
  {
    variants: {
      variant: {
        primary:
          'border border-sky-800/50 text-sky-800 hover:border-sky-800 focus:bg-sky-800 focus:text-white hover:shadow-md px-4',
        secondary:
          'border border-amber-400 bg-amber-400 text-gray-700 hover:bg-white hover:shadow-md px-4',
        white: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const iconVariants = cva('', {
  variants: {
    variant: {
      primary: 'stroke-sky-800 group-focus:stroke-white',
      secondary: 'stroke-gray-700',
      white: undefined,
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type Props = {
  className?: string;
  website: string;
  label: string;
} & VariantProps<typeof variants>;

export default function LinkButton({
  className,
  variant,
  website,
  label,
}: Props) {
  return (
    <a
      href={website}
      target='_blank'
      rel='noopener noreferrer'
      className={clsx(variants({ variant, className }))}
    >
      <span>{label}</span>

      <span className='transition-transform group-hover:rotate-[-35deg]'>
        <ArrowRightIcon
          className={clsx(iconVariants({ variant }))}
          strokeWidth={1.2}
        />
      </span>
    </a>
  );
}
