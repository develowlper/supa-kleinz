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
      tabIndex="0"
      ref={ref}
      className={clsx(
        'disabled:grayscale block shadow-md px-4 py-1 border border-fuchsia-500 bg-white focus:text-fuchsia-500 focus:shadow-hover focus:outline-none focus:shadow-fuchsia-500 hover:text-fuchsia-500 hover:shadow-hover hover:shadow-fuchsia-500',
        className
      )}
      {...props}
    />
  );
});
