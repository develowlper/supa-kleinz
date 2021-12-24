import { supabase } from 'lib/supabaseClient';
import middleware from 'middleware/middleware';
import nextConnect from 'next-connect';
import fs from 'fs/promises';
import { uploadImage } from 'data/images';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const file = req?.files?.file[0];
  if (!file) {
    res.status(400).json({ error: 'No file uploaded' });
  }
  const path = file.path;
  const filename = path.split('/').pop();

  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    res.statusCode(401).json({ error: 'Not logged in' });
    return;
  }
  const fileData = await fs.readFile(path);
  const name = filename;

  await uploadImage({ file: fileData, name });
  res.status(200).json({});
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
