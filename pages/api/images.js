import { supabase } from 'lib/supabaseClient';
import middleware from 'middleware/middleware';
import nextConnect from 'next-connect';
import fs from 'fs/promises';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  console.log('req.headers', req.headers);
  const file = req?.files?.file[0];
  if (!file) {
    console.log('NO FILE');
    res.status(400).json({ error: 'No file uploaded' });
  }
  const path = file.path;
  const filename = path.split('/').pop();

  const { user } = await supabase.auth.api.getUserByCookie(req);

  console.log({ user });
  try {
    const readFile = await fs.readFile(path);
    const name = 'private/' + filename;
    console.log(name);
    const upload = await supabase.from('names').select();
    console.log(upload);

    const uploadRes = await supabase.storage
      .from('images')
      .upload(name, readFile, { contentType: 'images/jpeg' });
    console.log(uploadRes);
    //...

    res.status(200).json({ uploadRes });
  } catch (err) {
    console.log('ERR', err);
    res.statusCode(500).json({ error: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
