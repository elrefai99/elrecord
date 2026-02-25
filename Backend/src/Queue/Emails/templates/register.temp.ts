import { IPayload_Body } from "../../@types"

export const register_temp = (data: IPayload_Body) => {
  return `
     <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome! Registration Successful</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');
  body { margin:0; padding:0; background:#0f0f13; font-family:'DM Sans', sans-serif; }
  .wrapper { background:#0f0f13; padding:40px 20px; }
  .card { max-width:560px; margin:0 auto; background:#1a1a24; border-radius:16px; overflow:hidden; border:1px solid #2a2a3a; }
  .header { background:linear-gradient(135deg,#052e16 0%,#14532d 50%,#052e16 100%); padding:48px 40px 40px; text-align:center; position:relative; }
  .header::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#22c55e,transparent); }
  .icon-wrap { width:64px; height:64px; background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.3); border-radius:50%; display:inline-flex; align-items:center; justify-content:center; margin-bottom:20px; }
  .header h1 { font-family:'DM Serif Display', serif; color:#fff; font-size:28px; margin:0 0 8px; font-weight:400; }
  .header p { color:#86efac; font-size:14px; margin:0; line-height:1.5; }
  .body { padding:40px; }
  .greeting { color:#e2e8f0; font-size:15px; margin-bottom:16px; }
  .message { color:#94a3b8; font-size:14px; line-height:1.7; margin-bottom:28px; }
  .features { margin-bottom:32px; }
  .feature-item { display:flex; align-items:flex-start; gap:14px; padding:14px 0; border-bottom:1px solid #1f2937; }
  .feature-item:last-child { border-bottom:none; }
  .feat-icon { width:36px; height:36px; background:rgba(34,197,94,0.1); border-radius:8px; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
  .feat-title { color:#e2e8f0; font-size:14px; font-weight:600; margin-bottom:3px; }
  .feat-desc { color:#64748b; font-size:13px; line-height:1.5; }
  .btn-wrap { text-align:center; margin-bottom:28px; }
  .btn { display:inline-block; background:linear-gradient(135deg,#16a34a,#22c55e); color:#fff; text-decoration:none; padding:14px 40px; border-radius:10px; font-size:15px; font-weight:600; letter-spacing:0.3px; }
  .divider { border:none; border-top:1px solid #2a2a3a; margin:28px 0; }
  .footer { background:#111118; padding:24px 40px; text-align:center; }
  .footer p { color:#374151; font-size:12px; margin:4px 0; line-height:1.6; }
  .footer a { color:#4b5563; text-decoration:none; }
  .logo { font-family:'DM Serif Display', serif; color:#22c55e; font-size:22px; letter-spacing:-0.5px; margin-bottom:4px; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="card">
    <div class="header">
      <div class="icon-wrap">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h1>Welcome Aboard! 🎉</h1>
      <p>Your account has been created successfully</p>
    </div>
    <div class="body">
      <p class="greeting">Hello, <strong style="color:#e2e8f0">${data.name}</strong>!</p>
      <p class="message">We're thrilled to have you on board. Your account is all set up and ready to go. Here's what you can do now:</p>
      <div class="features">
        <div class="feature-item">
          <div class="feat-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          <div><div class="feat-title">Complete Your Profile</div><div class="feat-desc">Add your details and profile photo to personalize your experience</div></div>
        </div>
        <div class="feature-item">
          <div class="feat-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
          <div><div class="feat-title">Explore Features</div><div class="feat-desc">Discover all the powerful tools and features available to you</div></div>
        </div>
        <div class="feature-item">
          <div class="feat-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          <div><div class="feat-title">Connect & Collaborate</div><div class="feat-desc">Invite teammates and start collaborating on projects</div></div>
        </div>
      </div>
      <div class="btn-wrap">
        <a href="#" class="btn">Get Started Now →</a>
      </div>
      <hr class="divider">
      <p style="color:#64748b; font-size:13px; margin:0; line-height:1.6;">Your login email: <strong style="color:#94a3b8">johndoe@email.com</strong><br>Need help? Reply to this email or visit our <a href="#" style="color:#22c55e; text-decoration:none;">Help Center</a>.</p>
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
