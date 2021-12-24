import { supabase } from 'lib/supabaseClient';
import middleware from 'middleware/middleware';
import nextConnect from 'next-connect';
import fs from 'fs/promises';
import { uploadImage } from 'data/images';
import sharp from 'sharp';
import { encode } from 'blurhash';
const encodeImageToBlurhash = (path) =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize({ width: 32, height: 32, fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });

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
  const thumb = await sharp(fileData)
    .resize({ width: 500, withoutEnlargement: true })
    .webp()
    .toBuffer();

  const thumbMeta = await sharp(thumb).metadata();

  const name = filename;
  const thumbArr = filename.split('.');
  thumbArr.pop();
  const thumbname = `thumb_${thumbArr.join('')}.webp`;

  await uploadImage({ file: fileData, name });
  await uploadImage({
    file: thumb,
    name: thumbname,
  });

  const blurhash = await encodeImageToBlurhash(fileData);

  const result = {
    key: name,
    thumb_key: thumbname,
    thumb_width: thumbMeta.width,
    thumb_height: thumbMeta.height,
    blurhash,
  };
  res.status(200).json(result);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
