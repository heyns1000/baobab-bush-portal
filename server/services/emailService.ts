import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zeptomail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'emailapikey',
    pass: process.env.SMTP_PASS || '',
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

export interface License {
  key: string;
  tier: 'free' | 'pro' | 'enterprise';
  userId: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
  features: string[];
}

export function generateLicenseKey(tier: 'free' | 'pro' | 'enterprise'): string {
  const prefix = tier === 'enterprise' ? 'BP-ENT' : tier === 'pro' ? 'BP-PRO' : 'BP-FREE';
  const random = crypto.randomBytes(12).toString('hex').toUpperCase();
  const formatted = random.match(/.{1,4}/g)?.join('-') || random;
  return `${prefix}-${formatted}`;
}

export function createLicense(
  userId: string,
  email: string,
  tier: 'free' | 'pro' | 'enterprise' = 'free'
): License {
  const features: Record<string, string[]> = {
    free: ['3 Tree Houses', 'Basic Analytics', 'Community Access'],
    pro: ['Unlimited Tree Houses', 'Advanced Analytics', 'Live Coding', 'Priority Support'],
    enterprise: ['Everything in Pro', 'Custom Branding', 'API Access', 'Dedicated Support', 'SLA'],
  };

  const durationDays = tier === 'free' ? 365 * 100 : tier === 'pro' ? 365 : 365;

  return {
    key: generateLicenseKey(tier),
    tier,
    userId,
    email,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000),
    features: features[tier],
  };
}

export async function sendWelcomeEmail(
  to: string,
  name: string,
  license: License
): Promise<{ success: boolean; messageId?: string; error?: any }> {
  const appUrl = process.env.APP_URL || 'https://bushportal.faa.zone';
  const fromName = process.env.SMTP_FROM_NAME || 'BushPortal Team';
  const fromEmail = process.env.SMTP_FROM || 'noreply@bushportal.faa.zone';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BushPortal</title>
</head>
<body style="margin: 0; padding: 0; background-color: #fffbeb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td>
        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); border-radius: 16px 16px 0 0; padding: 32px;">
          <tr>
            <td align="center">
              <div style="font-size: 48px; margin-bottom: 16px;">🌳</div>
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to BushPortal™</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Your Digital Tree House Awaits</p>
            </td>
          </tr>
        </table>

        <!-- Body -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: white; padding: 32px; border-left: 1px solid #fcd34d; border-right: 1px solid #fcd34d;">
          <tr>
            <td>
              <p style="color: #78350f; font-size: 18px; margin: 0 0 24px 0;">Hi ${name},</p>

              <p style="color: #92400e; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Thank you for joining our global podcasting community of <strong>247+ storytellers</strong> across <strong>120 countries</strong>.
                Your journey from here to Timbuktu begins now!
              </p>

              <!-- License Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #fef3c7; border: 2px solid #fbbf24; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <tr>
                  <td>
                    <p style="color: #92400e; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; font-weight: 600;">Your License Key</p>
                    <p style="color: #78350f; font-size: 20px; font-family: monospace; margin: 0 0 16px 0; word-break: break-all; font-weight: bold;">${license.key}</p>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%">
                          <p style="color: #92400e; font-size: 12px; margin: 0;">Tier</p>
                          <p style="color: #78350f; font-size: 16px; margin: 4px 0 0 0; font-weight: 600; text-transform: uppercase;">${license.tier}</p>
                        </td>
                        <td width="50%">
                          <p style="color: #92400e; font-size: 12px; margin: 0;">Valid Until</p>
                          <p style="color: #78350f; font-size: 16px; margin: 4px 0 0 0; font-weight: 600;">${license.expiresAt.toLocaleDateString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Features -->
              <p style="color: #78350f; font-size: 16px; font-weight: 600; margin: 24px 0 12px 0;">Your Features:</p>
              <ul style="color: #92400e; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                ${license.features.map(f => `<li>${f}</li>`).join('')}
              </ul>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${appUrl}/tree-houses" style="display: inline-block; background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                      Explore Your Tree Houses →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 24px 0 0 0;">
                Deep roots. Wide canopy. Eternal connection.<br>
                <strong>From here to Timbuktu - forever transmitting.</strong>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #78350f; border-radius: 0 0 16px 16px; padding: 24px;">
          <tr>
            <td align="center">
              <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0;">
                Licensed under Apache License v2.0 by Fruitful Holdings (Pty) Ltd
              </p>
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 8px 0 0 0;">
                Built with love in South Africa 🇿🇦 • VaultPulse Status: ●●●●● ACTIVE
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject: `Welcome to BushPortal™ 🌳 Your License: ${license.key}`,
      html,
    });

    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(
  to: string,
  resetToken: string
): Promise<{ success: boolean; error?: any }> {
  const appUrl = process.env.APP_URL || 'https://bushportal.faa.zone';
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

  try {
    await transporter.sendMail({
      from: `"BushPortal Team" <${process.env.SMTP_FROM || 'noreply@bushportal.faa.zone'}>`,
      to,
      subject: 'Reset Your BushPortal Password 🔐',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 48px;">🌳</div>
            <h1 style="color: #d97706;">Password Reset Request</h1>
          </div>
          <p style="color: #78350f;">Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="background: #d97706; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #92400e; font-size: 14px;">This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
