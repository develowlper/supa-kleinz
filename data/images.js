import spacesClient from 'lib/spacesClient';

const Bucket = process.env.SPACES_BUCKET;

export const uploadImage = ({ file, name }) => {
  return spacesClient
    .putObject({
      Body: file,
      Key: name,
      Bucket,
    })
    .promise();
};
