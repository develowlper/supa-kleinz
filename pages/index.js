import { styled } from '@stitches/react';
import Birthday from 'components/Birthday';
import Head from 'components/Head';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  padding: '0 1rem',
});

const Content = styled('div', {
  maxWidth: 800,
});

export default function Home() {
  return (
    <>
      <Head title="kleinz" />
      <Container>
        <Content>
          <h1>Welcome to Kleinz</h1>
          <Birthday />
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
        </Content>
      </Container>
    </>
  );
}
