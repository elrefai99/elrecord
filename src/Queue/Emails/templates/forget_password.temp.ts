export const forget_password_temp = (data: { link: string }) => {
    return `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 40px 0; text-align: center;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #333333; font-size: 24px; font-weight: 600;">Reset Your Password</h1>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                Hi there,
                            </p>
                            <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                We received a request to reset your password. Click the button below to create a new password:
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="${data.link}" style="display: inline-block; padding: 14px 40px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: 600;">Reset Password</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 20px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                Or copy and paste this link into your browser:
                            </p>
                            <p style="margin: 0 0 20px 0; color: #007bff; font-size: 14px; word-break: break-all;">
                                ${data.link}
                            </p>
                            
                            <!-- Security Info -->
                            <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #ffc107; border-radius: 4px;">
                                <p style="margin: 0 0 10px 0; color: #333333; font-size: 14px; font-weight: 600;">
                                    Security reminder:
                                </p>
                                <ul style="margin: 0; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.6;">
                                    <li>This link will expire in 1 hour</li>
                                    <li>If you didn't request this, please ignore this email</li>
                                    <li>Never share this link with anyone</li>
                                </ul>
                            </div>
                            
                            <p style="margin: 30px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px; text-align: center;">
                                This is an automated message, please do not reply to this email.
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                                &copy; 2024 Your Company Name. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
     `
}
