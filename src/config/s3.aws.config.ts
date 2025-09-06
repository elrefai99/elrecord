import { S3Client } from "@aws-sdk/client-s3"

export const bucketName = process.env.AWS_S3_BUCKET as string
export const region = process.env.AWS_IAM_REGION as string
export const accessKeyId = process.env.AWS_IAM_ACCESS_KEY as string
export const secretAccessKey = process.env.AWS_IAM_SECRET_ACCESS_KEY as string

export const s3Client = new S3Client({
     region,
     credentials: {
          accessKeyId,
          secretAccessKey
     }
})
