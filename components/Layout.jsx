import { useRouter } from 'next/router';
import { Navbar, Footer } from './Navigation';
import Toolbar from './Toolbar';

export default function Layout({ children, ignore = ['/signin'] }) {
  const router = useRouter();

  if (ignore.some((x) => x === router.pathname)) {
    return children;
  }

  if (true) {
    return (
      <div className="flex flex-col h-screen">
        <Toolbar />
        <Navbar />
        <main role="main" className="flex-1 bg-fuchsia-50">
          <div className="container mx-auto">{children}</div>
        </main>
        <Footer />
      </div>
      // <div className="flex flex-col h-screen">
      //   <Navbar />
      //   <div className="flex flex-1 flex-wrap">
      //     <div className="flex-1 flex">
      //       <div className="bg-color-emeral-500">MOIN</div>
      //       <main role="main" className="flex-1 pt-1 px-2 bg-fuchsia-100">
      //         <div className="container mx-auto">{children}</div>
      //       </main>
      //     </div>
      //
      //   </div>
      // </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="bg-fuchsia-100 flex-1">
        <div className="container mx-auto pt-4 px-2 pb-2">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
