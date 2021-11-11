import { useRouter } from 'next/router';
import { useState } from 'react';
import styleUtils from 'styles/utils.module.css';

const tasks = [
  {
    id: 'name',
    label: 'Namen finden',
    checked: false,
  },
  {
    id: 'elternzeit',
    label: 'Entscheidung zur Elternzeit treffen',
    checked: false,
  },
  {
    id: 'arbeitgeber',
    label: 'Elternzeit Arbeitgeber mitteilen',
    checked: false,
  },
  {
    id: 'geburtsvorbereitung',
    label: 'Anmeldung zum Geburtsvorbereitungskurs',
    checked: false,
  },
  {
    id: 'krankenhaus',
    checked: false,
    label: 'Anmeldung im Krankenhaus',
  },
  {
    id: 'vaterschaft',
    checked: false,
    label: 'Vaterschaftsanerkennung',
  },
  {
    id: 'sorgeerklärung',
    label: 'Sorgerechtserklärung beim Jugendamt',
    checked: false,
  },
  {
    id: 'mutterschaftsgeld',
    checked: false,
    label: 'Antrag auf Mutterschaftsgeld',
  },

  {
    id: 'kinderarzt',
    label: 'Anmeldung bei der Kinderärztin',
    checked: false,
  },
  {
    id: 'nabelschnurblut',
    checked: false,
    label: 'Einlagerung Nabelschnurblut klären',
  },
  {
    id: 'elternzeitantrag',
    label: 'Antrag auf Elternzeit beim Arbeitgeber',
    checked: false,
  },
  {
    id: 'elterngeldantrag',
    label: 'Antrag auf Elterngeld vorbereiten',
    checked: false,
  },
  {
    id: 'willkommen',
    checked: false,
    label: 'Willkommenspaket bei der Stadt Leipzig beantragen',
  },
  { id: 'kindergeld', label: 'Kindergeld beantragen', checked: false },
  {
    id: 'krankenhaustasche',
    checked: false,
    label: 'Krankenhaustasche packen',
  },
  {
    id: 'krankenkasse',
    label: 'Anmeldung bei der Krankenkasse',
    checked: false,
  },
];

export default function List() {
  const router = useRouter();

  const [state, set] = useState(tasks);

  const { id } = router.query;

  const handleChecked = (e) => {
    set((old) => {
      const index = old.findIndex((x) => x.id === e.target.id);
      const res = [...old];
      res[index] = {
        ...res[index],
        checked: e.target.checked,
      };
      return res;
    });
  };

  return (
    <div>
      <h1>{id}:</h1>
      <ul>
        {state.map(({ label, id: taskId, checked }) => {
          return (
            <li className={styleUtils.removeListStyle} key={taskId}>
              <input
                id={taskId}
                type="checkbox"
                checked={checked}
                onChange={handleChecked}
              />
              <label htmlFor={taskId}> {label}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
