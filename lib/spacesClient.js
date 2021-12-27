import AWS from 'aws-sdk';

const endpointUrl = process.env.SPACES_ENDPOINT;
const accessKeyId = process.env.SPACES_KEY;
const secretAccessKey = process.env.SPACES_SECRET;

const endpoint = new AWS.Endpoint(endpointUrl);

const spacesClient = new AWS.S3({
  endpoint,
  accessKeyId,
  secretAccessKey,
});

export default spacesClient;
