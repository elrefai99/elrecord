import { Job } from "bullmq";
import { forget_password_temp } from "./templates/forget_password.temp";
import { nodemailerFunction } from "../shared/nodemailer";

const sendEmail = async (data: any) => {
     switch (data.type) {
          case "forgetPassword":
               return nodemailerFunction(data.email, forget_password_temp(data), "Forget Password")
          default:
               return ""
     }
}

export const jobProcessor = async (job: Job): Promise<any> => {
     await sendEmail(job.data)
};
