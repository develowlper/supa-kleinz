import Head from 'components/Head';
import enforceAuthenticated from 'lib/auth/enforceAuthenticated';

export default function Lists() {
  return (
    <div>
      <Head title="lists" />
      <div></div>
    </div>
  );
}
export const getServerSideProps = enforceAuthenticated();
