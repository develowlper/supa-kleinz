import Button from 'components/Button';
import TextField from 'components/TextField';
import { useFormik } from 'formik';
import { supabase } from 'lib/supabaseClient';

import { capitalize } from 'utils/capitalize';

import enforceAuthenticated from 'lib/auth/enforceAuthenticated';
import { getNames } from 'data/names';
import useSWR, { mutate, SWRConfig } from 'swr';
import Name from 'components/Name';
import NameSheet from 'components/Namesheet';
import { useState } from 'react';
import ListPage from 'components/ListPage';
import { motion } from 'framer-motion';
import listTransition from 'components/animations/listTransition';

function Names({ user_id, swrQuery }) {
  const { data: names, error } = useSWR(swrQuery, async () =>
    getNames(user_id)
  );

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const name = values.name.trim();
      if (name.length) {
        mutate(swrQuery, (names) => [name, ...names], false);
        await supabase.from('names').insert({ name, user_id }).single();
        mutate(swrQuery);
        resetForm();
      }
    },
  });

  if (error) {
    return 'ERROR';
  }

  return (
    <ListPage title="Names">
      <form
        className="flex gap-2 items-end flex-wrap"
        onSubmit={formik.handleSubmit}
      >
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
        <Button type="submit">Create</Button>
      </form>
      <motion.div
        initial="hidden"
        animate="show"
        variants={listTransition}
        className=" md:flex md:space-x-3 space-y-3 md:space-y-0"
      >
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
      </motion.div>
    </ListPage>
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
