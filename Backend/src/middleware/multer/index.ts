import { Request } from "express";
import multer from "multer";
import path from "node:path";

const destination = (req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
     const { baseUrl } = req;
     const isUser = baseUrl === "/api/v1/user";

     const folderPath = path.join(__dirname, "../../../public",
          isUser ?
               "users"
               :
               ""
     );

     cb(null, folderPath);
}
function filename(_req: Request, file: any, callback: any) {
     callback(
          null,
          parseInt(
               Math.ceil(Math.random() * Date.now())
                    .toPrecision(16)
                    .toString()
                    .replace(".", "")
          ) + path.extname(file.originalname)
     );
}

const multerStorage = multer.diskStorage({
     destination: destination,
     filename: filename,
});

// user upload avatar image and verify image
export const uploadAvatar: any = multer({
     storage: multerStorage,
     limits: {
          fileSize: 75 * 1024 * 1024,
     },
}).single("img")
