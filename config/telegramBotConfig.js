import { Bot } from 'grammy';
import dotenv from 'dotenv';
import { verifyUserOtp } from '../services/authService.js';

dotenv.config();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply('Welcome! Please share your contact to verify your OTP.');
});

bot.on('contact', async (ctx) => {
  const phone = ctx.message.contact.phone_number;
  const otp = ctx.message.text.split(' ')[1]; // Assuming OTP is sent with contact
  try {
    await verifyUserOtp({ phone, otp });
    ctx.reply('Verification successful!');
  } catch (error) {
    ctx.reply('Invalid phone number or OTP.');
  }
});

bot.start();
