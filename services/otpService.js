import nodemailer from 'nodemailer';
import { Bot, Api } from 'grammy';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

export const sendOtpToEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendOtpToPhone = async (phone, otp) => {
  // const api = new Api(process.env.TELEGRAM_BOT_TOKEN);
  // await api.sendMessage(phone, `Your OTP code is ${otp}`);
  bot.command("getChatId", async (ctx) => {
    console.log(ctx.chat.id)
  })
  await bot.api.sendMessage(phone, `Your OTP code is ${otp}`);
};

bot.start()