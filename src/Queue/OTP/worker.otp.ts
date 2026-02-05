import '../../core/dotenv'
import { Worker, Job } from "bullmq";
import { jobProcessor } from './job.process.otp';

const worker = new Worker("otpQueue", jobProcessor, {
     connection: {
          url: process.env.REDIS_HOST,
     },
});

worker.on("completed", (job) => {
     job.updateProgress(100);
});

worker.on("failed", (job: Job | undefined, err: Error, _prev: string) => {
     if (job) {
          console.error(`Failed to send otp to ${job.data.to}:`, err);
     } else {
          console.error(`Failed to send otp: job is undefined`, err);
     }
});
