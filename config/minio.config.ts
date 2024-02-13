export const minioConfig = {
  endPoint: `${process.env.MINIO_ENDPOINT}`,
  port: `${process.env.MINIO_PORT}`,
  accessKey: `${process.env.MINIO_ACCESSKEY}`,
  secretKey: `${process.env.MINIO_SECRETKEY}`,
  bucket: `${process.env.MINIO_BUCKET}`,
};
