import { supabase } from 'lib/supabaseClient';
import middleware from 'middleware/middleware';
import nextConnect from 'next-connect';
import fs from 'fs/promises';
import { uploadImageToSupabase } from 'data/images';
import sharp from 'sharp';
import { encodeImageToBlurhash } from 'lib/encodeImageToBlurhash';

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
  const thumbName = `thumb_${filename.replace(/\.[^/.]+$/, '')}.webp`;

  const thumbImage = await sharp(fileData)
    .resize({ width: 700 })
    .webp()
    .toBuffer();

  const meta = await sharp(thumbImage).metadata();

  const { data: thumbRes, error: thumbError } = await uploadImageToSupabase({
    file: thumbImage,
    name: thumbName,
  });

  const { data: uploadRes, error: uploadError } = await uploadImageToSupabase({
    file: fileData,
    name,
  });

  if (thumbError || uploadError) {
    res.status(200).json({ thumbError, uploadError });
    return;
  }

  const dbItem = await supabase.from('image_meta').insert({
    created_by: user.id,
    thumb_width: meta.width,
    thumb_height: meta.height,
    thumb_key: thumbRes.Key.replace('images/', ''),
    download_key: uploadRes.Key.replace('images/', ''),
    blurhash: await encodeImageToBlurhash(thumbImage),
  });

  res.status(200).json(dbItem?.data);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
