import clsx from 'clsx';

export default function TextField({ className = '', ...props }) {
  return (
    <input
      className={clsx(
        'px-2 py-1 border-2 border-fuchsia-900  focus:border-teal-500 focus:outline-none bg-fuchsia-100',
        className
      )}
      {...props}
    />
  );
}
