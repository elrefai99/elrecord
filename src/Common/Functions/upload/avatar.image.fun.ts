import sharp from 'sharp'
import { bucketName, s3Client } from '../../config/AWS/s3.aws.config'
import { PutObjectCommand } from '@aws-sdk/client-s3'

const colorArray = [
     { 1: '#F6AE2D' },
     { 2: '#00509D' },
     { 3: '#6A6A6A' },
     { 4: '#202020' },
     { 5: '#E8E8E8' },
]

const checkFunctionName = async (name: string): Promise<any> => {
     let isArabic = false
     let isEnglish = false

     for (const letter of name) {
          const letterCode = letter.charCodeAt(0)

          if ((letterCode >= 0x0600 && letterCode <= 0x06FF) || // Arabic Unicode range
               (letterCode >= 0x0750 && letterCode <= 0x077F) || // Arabic Supplement Unicode range
               (letterCode >= 0xFE70 && letterCode <= 0xFEFF)) { // Arabic Presentation Forms Unicode range
               isArabic = true
          }
          else if ((letterCode >= 0x0041 && letterCode <= 0x005A) || // English uppercase Unicode range
               (letterCode >= 0x0061 && letterCode <= 0x007A)) { // English lowercase Unicode range
               isEnglish = true
          }

          if (isArabic && isEnglish) {
               return 'Mixed'
          }

          if (isArabic) {
               return 'Arabic'
          } else if (isEnglish) {
               return 'English'
          } else {
               return 'Unknown'
          }
     }
}

function getColor(color: any) {
     const random = Math.floor(Math.random() * color.length)
     const colorObject = color[random]
     const colorKey = Object.keys(colorObject)[0]

     return colorObject[colorKey]
}

export async function avatarImage(name: string, id: any) {
     await Promise.resolve().then(async () => {
          const width = 450
          const height = 450
          const background = getColor(colorArray)

          const avatar = sharp({
               create: {
                    width,
                    height,
                    channels: 4,
                    background
               }
          })

          const checkText = await checkFunctionName(name)
          let init = ''

          if (checkText === "Arabic") {
               init = name.split(' ').map((part) => part[0].toUpperCase()).join(' ')
          }
          if (checkText === "English") {
               init = name.split(' ').map((part) => part[0].toUpperCase()).join('')
          }

          const imageBuffer = await avatar.composite([{
               input: Buffer.from(`
                              <svg width="${width}" height="${height}">
                                <text x="50%" y="60%" font-size="150" font-family="Arial" text-anchor="middle" fill="#e8e8e8" alignment-baseline="middle">${init}</text>
                              </svg>`), top: 0, left: 0
          }]).png().toBuffer()

          const uploadParams = new PutObjectCommand({
               Bucket: bucketName,
               Key: `cdn/user/${id}.png`,
               Body: imageBuffer,
               ContentType: "image/png",
          });

          await s3Client.send(uploadParams);

          const main = `${process.env.CDN_CLOUD_URL}/cdn/user/${id}.png`

          return main
     })
}
