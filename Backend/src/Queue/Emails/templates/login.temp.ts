import { IPayload_Body } from "../../@types"

export const login_temp = (data: IPayload_Body) => {
     return `
     <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Login Detected</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');
  body { margin:0; padding:0; background:#0f0f13; font-family:'DM Sans', sans-serif; }
  .wrapper { background:#0f0f13; padding:40px 20px; }
  .card { max-width:560px; margin:0 auto; background:#1a1a24; border-radius:16px; overflow:hidden; border:1px solid #2a2a3a; }
  .header { background:linear-gradient(135deg,#0c1a3a 0%,#0f2d6e 50%,#0c1a3a 100%); padding:48px 40px 40px; text-align:center; position:relative; }
  .header::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#3b82f6,transparent); }
  .icon-wrap { width:64px; height:64px; background:rgba(59,130,246,0.15); border:1px solid rgba(59,130,246,0.3); border-radius:16px; display:inline-flex; align-items:center; justify-content:center; margin-bottom:20px; }
  .header h1 { font-family:'DM Serif Display', serif; color:#fff; font-size:28px; margin:0 0 8px; font-weight:400; }
  .header p { color:#93c5fd; font-size:14px; margin:0; line-height:1.5; }
  .body { padding:40px; }
  .greeting { color:#e2e8f0; font-size:15px; margin-bottom:16px; }
  .message { color:#94a3b8; font-size:14px; line-height:1.7; margin-bottom:24px; }
  .info-box { background:#0f172a; border:1px solid #1e3a5f; border-radius:12px; padding:20px 24px; margin-bottom:28px; }
  .info-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #1e293b; }
  .info-row:last-child { border-bottom:none; padding-bottom:0; }
  .info-label { color:#64748b; font-size:13px; }
  .info-value { color:#cbd5e1; font-size:13px; font-weight:500; }
  .alert-box { background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:10px; padding:16px 18px; display:flex; gap:12px; align-items:flex-start; margin-bottom:28px; }
  .alert-text { font-size:13px; color:#fca5a5; line-height:1.6; }
  .btn-row { display:flex; gap:12px; justify-content:center; margin-bottom:16px; }
  .btn-safe { display:inline-block; background:linear-gradient(135deg,#1d4ed8,#3b82f6); color:#fff; text-decoration:none; padding:12px 28px; border-radius:10px; font-size:14px; font-weight:600; }
  .btn-danger { display:inline-block; background:transparent; border:1px solid rgba(239,68,68,0.4); color:#f87171; text-decoration:none; padding:12px 28px; border-radius:10px; font-size:14px; font-weight:600; }
  .footer { background:#111118; padding:24px 40px; text-align:center; }
  .footer p { color:#374151; font-size:12px; margin:4px 0; line-height:1.6; }
  .footer a { color:#4b5563; text-decoration:none; }
  .logo { font-family:'DM Serif Display', serif; color:#3b82f6; font-size:22px; letter-spacing:-0.5px; margin-bottom:4px; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="card">
    <div class="header">
      <div class="icon-wrap">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <h1>New Login Detected</h1>
      <p>A new sign-in to your account was recorded</p>
    </div>
    <div class="body">
      <p class="greeting">Hello, <strong style="color:#e2e8f0">${data.name}</strong> 👋</p>
      <p class="message">We noticed a new login to your account. Here are the details of this session:</p>
      <div class="info-box">
        <div class="info-row">
          <span class="info-label">📅 Date & Time</span>
          <span class="info-value">${data.login_date}</span>
        </div>
        <div class="info-row">
          <span class="info-label">📍 Location</span>
          <span class="info-value">${data.location}</span>
        </div>
        <div class="info-row">
          <span class="info-label">🌐 IP Address</span>
          <span class="info-value">${data.ip_address}</span>
        </div>
        <div class="info-row">
          <span class="info-label">💻 Device</span>
          <span class="info-value">${data.device}</span>
        </div>
      </div>
      <div class="alert-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span class="alert-text">If this wasn't you, your account may be compromised. Please secure your account immediately by clicking <strong>"Not Me"</strong> below.</span>
      </div>
      <div class="btn-row">
        <a href="#" class="btn-safe">✓ That was me</a>
        <a href="#" class="btn-danger">✕ Not me — Secure now</a>
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
