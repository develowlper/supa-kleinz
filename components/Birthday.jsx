import { styled } from '@stitches/react';

const Announcement = styled('div', {
  backgroundColor: 'var(--warning-color)',
  padding: '1rem',
});

const H2 = styled('h2', {
  textTransform: 'uppercase',
});

export default function Birthday() {
  return (
    <Announcement>
      <H2>Scheinz hat Geburtstag!</H2>
      <p>
        Zur Feier des Tages gibts eine neue Version von Kleinzkram. Diesmal
        privat, in Farbe und bunt.
      </p>
      <p>
        Außerdem machen wir einen kleinen Wellnessausflug. Wir müssen nur ein
        Datum finden und ich such uns ein paar schicke Möglichkeiten für ein
        Wellnesswochennede raus. Einen Gutschein für eine Wellnessmaßnahme
        deiner Wahl gibts obendrauf.😄
      </p>
      <p>
        So nun viel Spass mit {'"'}supa-kleinz{'"'}!
      </p>
    </Announcement>
  );
}
