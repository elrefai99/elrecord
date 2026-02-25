import { Job } from "bullmq";
import { nodemailerFunction } from "../provider/nodemailer";
import { forget_password_temp, register_temp } from "./templates";

const sendEmail = async (payload: any) => {
     switch (payload.data.type) {
          case "forgetPassword":
               return nodemailerFunction(payload.data.email, forget_password_temp(payload.data), payload.data.subject)
          case "register":
               return nodemailerFunction(payload.data.email, register_temp(payload.data), payload.data.subject)
          default:
               return ""
     }
}

export const jobProcessor = async (job: Job): Promise<any> => {
     await sendEmail(job.data)
};
