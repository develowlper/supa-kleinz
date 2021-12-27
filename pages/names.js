import Button from 'components/Button';
import TextField from 'components/TextField';
import { useFormik } from 'formik';
import { supabase } from 'lib/supabaseClient';
import Head from 'next/head';

import { capitalize } from 'utils/capitalize';

import enforceAuthenticated from 'lib/auth/enforceAuthenticated';
import { getNames } from 'data/names';
import useSWR, { mutate, SWRConfig } from 'swr';
import Name from 'components/Name';
import NameSheet from 'components/Namesheet';
import { useState } from 'react';

function Names({ user_id, swrQuery }) {
  const [isCreating, setIsCreating] = useState(false);

  const {
    data: { data: names, error },
  } = useSWR(swrQuery, async () => getNames(user_id));

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const name = values.name.trim();
      if (name.length) {
        setIsCreating(true);
        await supabase.from('names').insert({ name, user_id }).single();
        mutate(swrQuery);
        resetForm();
        setIsCreating(false);
      }
    },
  });

  if (error) {
    return 'ERROR';
  }

  return (
    <div className="space-y-2">
      <Head>
        <title>Names</title>
      </Head>
      <div className="space-y-3 my-6">
        <form className="flex gap-2 items-end" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name your child.</label>
            <TextField
              type="text"
              id="name"
              name="name"
              placeholder="Enter name here."
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
          <Button disabled={isCreating} type="submit">
            Create
          </Button>
          {isCreating && <span>SAVING</span>}
        </form>
        <div className=" md:flex md:space-x-3 space-y-3 md:space-y-0">
          {['ok', 'like', 'dislike'].map((key) => {
            return (
              <NameSheet
                key={key}
                className={'flex-1 border shadow-md bg-white py-3 px-6'}
              >
                <h2 className="text-lg">
                  <strong>{capitalize(key)}</strong>
                </h2>

                {names.length < 1 && <p>No names (yet).</p>}
                {names
                  .filter((check) => check.mood === key)
                  .map(({ name, id, mood }) => {
                    return <Name name={name} key={id} mood={mood} id={id} />;
                  })}
              </NameSheet>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Page({ fallback, ...props }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Names {...props} />
    </SWRConfig>
  );
}

export const getServerSideProps = enforceAuthenticated(async (ctx, user) => {
  const { resolvedUrl } = ctx;

  const res = await getNames(user.id);

  return {
    props: {
      swrQuery: resolvedUrl,
      fallback: {
        [resolvedUrl]: res,
      },
      user_id: user.id,
    },
  };
});
