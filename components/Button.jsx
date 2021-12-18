import clsx from 'clsx';
import { forwardRef } from 'react';

const a = forwardRef(function A(props, ref) {
  return <a ref={ref} {...props} />;
});
const button = forwardRef(function Button(props, ref) {
  return <button ref={ref} {...props} />;
});

export default forwardRef(function Button(
  { link = false, className, ...props },
  ref
) {
  const Component = link ? a : button;
  return (
    <Component
      ref={ref}
      className={clsx(
        'shadow-inner px-4 py-2 bg-fuchsia-500 focus:text-teal-900 focus:shadow-hover focus:outline-none focus:shadow-teal-500 hover:text-teal-900 hover:shadow-hover hover:shadow-teal-500',
        className
      )}
      {...props}
    />
  );
});
