import Head from 'components/Head';

export default function Home() {
  return (
    <>
      <Head title="kleinz" />
      <div>
        <h1 className="text-3xl">Welcome to Kleinz</h1>
        <h2>Roadmap:</h2>
        <ul>v1: Q2/22</ul>
        <h2>Release Notes:</h2>
        <h3>
          v0.3:
          <ul>
            <li>
              Features:
              <ul>
                <li>First version of genitals (gnihihihihih)</li>
                <li>A bit more overhead than before</li>
              </ul>
            </li>
          </ul>
        </h3>
        <h3>
          v0.2:
          <ul>
            <li>
              Features:
              <ul>
                <li>Started development of hands and feet</li>
                <li>A bit more overhead than before</li>
              </ul>
            </li>
          </ul>
        </h3>
        <h3>
          v0.1:
          <ul>
            <li>
              Features:
              <ul>
                <li>Initial build</li>
                <li>Stable foundation for upcoming features</li>
                <li>A bit of overhead</li>
              </ul>
            </li>
          </ul>
        </h3>
      </div>
    </>
  );
}
