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
  try {
    const fileData = await fs.readFile(path);
    const name = filename;
    const upload = await uploadImage({ file: fileData, name }); // supabase.from('names').select();
    res.status(200).json({ upload });
    return;
  } catch (err) {
    res.statusCode(500).json({ error: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
