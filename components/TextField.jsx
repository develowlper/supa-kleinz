import clsx from 'clsx';

export default function TextField({ className = '', ...props }) {
  return (
    <input
      className={clsx(
        'px-2 py-1 shadow-md focus:shadow-hover focus:shadow-fuchsia-500 focus:outline-none border-none focus:ring-fuchsia-500',
        className
      )}
      {...props}
    />
  );
}
