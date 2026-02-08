import { Job } from "bullmq";
import { forget_password_temp } from "./templates/forget_password.temp";
import { nodemailerFunction } from "../shared/nodemailer";

const sendEmail = async (payload: any) => {
     switch (payload.data.type) {
          case "forgetPassword":
               return nodemailerFunction(payload.data.email, forget_password_temp(payload.data), payload.data.subject)
          default:
               return ""
     }
}

export const jobProcessor = async (job: Job): Promise<any> => {
     await sendEmail(job.data)
};
