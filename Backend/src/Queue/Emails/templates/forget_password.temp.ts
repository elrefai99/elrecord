import { IPayload_Body } from "../../@types"

export const forget_password_temp = (data: IPayload_Body) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Your Password</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');
  body { margin:0; padding:0; background:#0f0f13; font-family:'DM Sans', sans-serif; }
  .wrapper { background:#0f0f13; padding:40px 20px; }
  .card { max-width:560px; margin:0 auto; background:#1a1a24; border-radius:16px; overflow:hidden; border:1px solid #2a2a3a; }
  .header { background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%); padding:48px 40px 40px; text-align:center; position:relative; }
  .header::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#6366f1,transparent); }
  .icon-wrap { width:64px; height:64px; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3); border-radius:16px; display:inline-flex; align-items:center; justify-content:center; margin-bottom:20px; }
  .header h1 { font-family:'DM Serif Display', serif; color:#fff; font-size:28px; margin:0 0 8px; font-weight:400; }
  .header p { color:#a5b4fc; font-size:14px; margin:0; line-height:1.5; }
  .body { padding:40px; }
  .greeting { color:#e2e8f0; font-size:15px; margin-bottom:16px; }
  .message { color:#94a3b8; font-size:14px; line-height:1.7; margin-bottom:32px; }
  .btn-wrap { text-align:center; margin-bottom:32px; }
  .btn { display:inline-block; background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; text-decoration:none; padding:14px 40px; border-radius:10px; font-size:15px; font-weight:600; letter-spacing:0.3px; }
  .divider { border:none; border-top:1px solid #2a2a3a; margin:28px 0; }
  .link-fallback { font-size:12px; color:#64748b; line-height:1.6; }
  .link-fallback a { color:#6366f1; word-break:break-all; text-decoration:none; }
  .expiry { background:#1e1b4b; border:1px solid rgba(99,102,241,0.2); border-radius:10px; padding:14px 18px; font-size:13px; color:#a5b4fc; display:flex; align-items:center; gap:10px; margin-bottom:28px; }
  .footer { background:#111118; padding:24px 40px; text-align:center; }
  .footer p { color:#374151; font-size:12px; margin:4px 0; line-height:1.6; }
  .footer a { color:#4b5563; text-decoration:none; }
  .logo { font-family:'DM Serif Display', serif; color:#6366f1; font-size:22px; letter-spacing:-0.5px; margin-bottom:4px; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="card">
    <div class="header">
      <div class="icon-wrap">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <h1>Reset Your Password</h1>
      <p>We received a request to reset your account password</p>
    </div>
    <div class="body">
      <p class="greeting">Hello, <strong style="color:#e2e8f0">John Doe</strong> 👋</p>
      <p class="message">Someone requested a password reset for your account. If this was you, click the button below to choose a new password. If you didn't request this, you can safely ignore this email — your password won't change.</p>
      <div class="expiry">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        This link expires in <strong style="color:#c7d2fe">15 minutes</strong>
      </div>
      <div class="btn-wrap">
        <a href="#" class="btn">Reset Password</a>
      </div>
      <hr class="divider">
      <div class="link-fallback">
        Button not working? Copy and paste this link into your browser:<br>
        <a href="#">${data.link}</a>
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
</html>
     `
}
