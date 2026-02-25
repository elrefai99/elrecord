import { Job } from "bullmq";
import { v4 as uuidv4 } from 'uuid';
import prisma from "../../core/prisma";
import { nodemailerFunction } from "../provider/nodemailer";
import { otp_temp } from "./templates";

export const jobProcessor = async (job: Job): Promise<any> => {
     const { userId, email } = job.data;
     const site_id = uuidv4()

     const code = Math.floor(100000 + Math.random() * 900000).toString();

     const otp = await prisma.oTP.create({
          data: {
               code,
               site_id,
               user_id: userId,
               expiresAt: new Date(Date.now() + 10 * 60 * 1000)
          }
     })
     const emailbody = otp_temp({ name: email }, otp.code)

     await nodemailerFunction(email, emailbody, "OTP")
};
