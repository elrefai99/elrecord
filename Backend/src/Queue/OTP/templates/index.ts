import { IPayload_Body } from "../../@types"

export const otp_temp = (data: IPayload_Body, code: string) => {
  return `
     <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your One-Time Password</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&family=Space+Mono:wght@700&display=swap');
  body { margin:0; padding:0; background:#0f0f13; font-family:'DM Sans', sans-serif; }
  .wrapper { background:#0f0f13; padding:40px 20px; }
  .card { max-width:560px; margin:0 auto; background:#1a1a24; border-radius:16px; overflow:hidden; border:1px solid #2a2a3a; }
  .header { background:linear-gradient(135deg,#1c0a3a 0%,#3b0764 50%,#1c0a3a 100%); padding:48px 40px 40px; text-align:center; position:relative; }
  .header::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#a855f7,transparent); }
  .icon-wrap { width:64px; height:64px; background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.3); border-radius:50%; display:inline-flex; align-items:center; justify-content:center; margin-bottom:20px; }
  .header h1 { font-family:'DM Serif Display', serif; color:#fff; font-size:28px; margin:0 0 8px; font-weight:400; }
  .header p { color:#d8b4fe; font-size:14px; margin:0; line-height:1.5; }
  .body { padding:40px; }
  .greeting { color:#e2e8f0; font-size:15px; margin-bottom:16px; }
  .message { color:#94a3b8; font-size:14px; line-height:1.7; margin-bottom:32px; }
  .otp-wrap { text-align:center; margin-bottom:32px; }
  .otp-label { color:#64748b; font-size:12px; letter-spacing:2px; text-transform:uppercase; margin-bottom:16px; }
  .otp-code { display:inline-flex; gap:10px; justify-content:center; }
  .otp-digit { width:52px; height:64px; background:#0f0a1f; border:1.5px solid rgba(168,85,247,0.4); border-radius:12px; display:inline-flex; align-items:center; justify-content:center; font-family:'Space Mono', monospace; font-size:28px; font-weight:700; color:#e9d5ff; letter-spacing:-1px; box-shadow:0 0 20px rgba(168,85,247,0.1); }
  .timer { display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:28px; }
  .timer-text { color:#94a3b8; font-size:13px; }
  .timer-value { color:#a855f7; font-weight:600; font-size:13px; }
  .warning { background:rgba(168,85,247,0.08); border:1px solid rgba(168,85,247,0.15); border-radius:10px; padding:14px 18px; font-size:13px; color:#c4b5fd; line-height:1.6; margin-bottom:8px; }
  .footer { background:#111118; padding:24px 40px; text-align:center; }
  .footer p { color:#374151; font-size:12px; margin:4px 0; line-height:1.6; }
  .footer a { color:#4b5563; text-decoration:none; }
  .logo { font-family:'DM Serif Display', serif; color:#a855f7; font-size:22px; letter-spacing:-0.5px; margin-bottom:4px; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="card">
    <div class="header">
      <div class="icon-wrap">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
      </div>
      <h1>Verification Code</h1>
      <p>Use this code to complete your verification</p>
    </div>
    <div class="body">
      <p class="greeting">Hello, <strong style="color:#e2e8f0">${data.name}</strong> 👋</p>
      <p class="message">Your one-time password (OTP) is ready. Enter this code in the verification screen to continue. Do not share this code with anyone.</p>
      <div class="otp-wrap">
        <div class="otp-label">Your verification code</div>
        <div class="otp-code">
          ${code?.split('').map((digit) => `<div class="otp-digit">${digit}</div>`).join('')}
        </div>
      </div>
      <div class="timer">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span class="timer-text">This code expires in</span>
        <span class="timer-value">10 minutes</span>
      </div>
      <div class="warning">
        🔒 <strong>Security Notice:</strong> YourApp will never ask you for this OTP via phone or chat. If someone is asking, it's a scam.
      </div>
    </div>
    <div class="footer">
      <div class="logo">YourApp</div>
      <p>© 2025 YourApp Inc. · <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></p>
      <p>123 Main Street, San Francisco, CA 94105</p>
    </div>
  </div>
</div>
</body>
</html>`
}
