const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM, // full Gmail address
      pass: process.env.EMAIL_PASS  // app password
    },
    tls: {
      rejectUnauthorized: false // only for development
    }
  });


  const mailOptions = {
    from: email,
    to: 'blogspherehelpdesk@gmail.com',
    subject: `New message from ${name}`,
    html: `
    <style>
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      
      .fade-in { animation: fadeInUp 0.8s ease-out; }
      .gradient-border { 
        background: linear-gradient(-45deg, #3b82f6, #6366f1, #8b5cf6, #a855f7);
        background-size: 400% 400%;
        animation: gradientShift 4s ease infinite;
      }
      .pulse-hover:hover { animation: pulse 0.3s ease-in-out; }
    </style>
    
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #e2e8f0; border-radius: 12px;" class="fade-in">
      
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6); margin: 0 auto 15px; border-radius: 2px;" class="gradient-border"></div>
        <h2 style="color: #f8fafc; margin: 0; font-size: 24px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          ✨ New Contact Form Submission
        </h2>
      </div>
      
      <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 25px; border-radius: 12px; margin: 20px 0; border: 1px solid #475569; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);" class="pulse-hover">
        <h3 style="background: linear-gradient(90deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-top: 0; margin-bottom: 25px; font-size: 18px; font-weight: 600;">
          📋 Contact Details
        </h3>
        
        <div style="margin-bottom: 20px; padding: 12px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border-left: 4px solid #3b82f6;">
          <strong style="color: #cbd5e1; font-size: 14px;">👤 NAME:</strong>
          <div style="margin-top: 5px; color: #f8fafc; font-size: 16px; font-weight: 500;">${name}</div>
        </div>
        
        <div style="margin-bottom: 20px; padding: 12px; background: rgba(102, 102, 241, 0.1); border-radius: 8px; border-left: 4px solid #6366f1;">
          <strong style="color: #cbd5e1; font-size: 14px;">📧 EMAIL:</strong>
          <div style="margin-top: 5px;">
            <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none; font-size: 16px; font-weight: 500; transition: color 0.3s ease;">${email}</a>
          </div>
        </div>
        
        <div style="margin-bottom: 20px; padding: 12px; background: rgba(139, 92, 246, 0.1); border-radius: 8px; border-left: 4px solid #8b5cf6;">
          <strong style="color: #cbd5e1; font-size: 14px;">💬 MESSAGE:</strong>
          <div style="margin-top: 8px; padding: 15px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 8px; color: #e2e8f0; line-height: 1.6; border: 1px solid #475569;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: rgba(15, 23, 42, 0.5); border-radius: 8px; border-top: 2px solid #475569; text-align: center;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
          🕒 Received on ${new Date().toLocaleString()}<br>
          <span style="color: #64748b;">Sent via BlogSphere Contact Form</span>
        </p>
      </div>
      
    </div>
  `,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // fallback for clients that don't support HTML
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
};
