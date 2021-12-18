import clsx from 'clsx';

export default function Button({ className, ...props }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 bg-fuchsia-500 focus:text-teal-900 focus:shadow-hover focus:outline-none focus:shadow-teal-500 hover:text-teal-900 hover:shadow-hover hover:shadow-teal-500 ',
        className
      )}
      {...props}
    />
  );
}
