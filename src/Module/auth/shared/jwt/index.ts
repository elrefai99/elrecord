import jwt from "jsonwebtoken";

export const access_token = (id: string) => {
     const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string
     return jwt.sign({ id }, SECRET_KEY, { expiresIn: "1d", algorithm: 'HS256' });
}

export const refresh_token = (id: string) => {
     const SECRET_KEY = process.env.REFRESH_TOKEN_SECRET as string
     return jwt.sign({ id }, SECRET_KEY, { expiresIn: "7d", algorithm: 'HS256' });
}

export const payment_token = (payment: any, booking: any, user: any) => {
     const SECRET_KEY = process.env.PAYMENT_SECRET_KEY as string
     return jwt.sign({ payment, booking, user }, SECRET_KEY, { expiresIn: "1d", algorithm: 'HS256' });
}
export const pending_token = (id: string) => {
     const SECRET_KEY = process.env.PENDING_TOKEN_SECRET as string
     return jwt.sign({ id }, SECRET_KEY, { expiresIn: "1d", algorithm: 'HS256' });
}

export const otp_token = (number: number) => {
     const SECRET_KEY = process.env.OTP_EXPIRE_SECRET_KY as string
     return jwt.sign({ otp: number }, SECRET_KEY, { expiresIn: "5m", algorithm: 'HS256' });
}
