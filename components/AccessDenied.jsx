import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';

export default function AccessDenied() {
  return (
    <div className="bg-fuchsia-100 flex justify-center items-center h-full">
      <h2 className="text-lg" link>
        {'Please signin to access this page'}
      </h2>
    </div>
  );
}
