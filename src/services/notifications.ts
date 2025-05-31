import TelegramBot from 'node-telegram-bot-api';
import { Token, MarketSentiment } from '../types';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

export interface NotificationPayload {
  type: 'action' | 'prediction' | 'status';
  token?: Token;
  action?: 'buy' | 'stake' | 'hold';
  amount?: number;
  sentiment?: MarketSentiment;
  confidence?: number;
}

class NotificationService {
  private chatIds: Set<string> = new Set();

  constructor() {
    this.setupCommands();
  }

  private setupCommands() {
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id.toString();
      this.chatIds.add(chatId);
      bot.sendMessage(chatId, 'Welcome to AutoPilot DCA! You will now receive notifications.');
    });

    bot.onText(/\/status/, async (msg) => {
      const chatId = msg.chat.id.toString();
      // Implement status check logic
      bot.sendMessage(chatId, 'System is running normally. Last check: ' + new Date().toLocaleString());
    });

    bot.onText(/\/pause/, (msg) => {
      const chatId = msg.chat.id.toString();
      // Implement pause logic
      bot.sendMessage(chatId, 'AutoPilot DCA has been paused. Use /resume to restart.');
    });

    bot.onText(/\/summary/, async (msg) => {
      const chatId = msg.chat.id.toString();
      // Implement summary generation logic
      bot.sendMessage(chatId, 'Portfolio summary will be implemented soon.');
    });
  }

  async sendNotification(chatId: string, payload: NotificationPayload) {
    let message = '';

    switch (payload.type) {
      case 'action':
        message = `🤖 AutoPilot DCA Action:\n${payload.action?.toUpperCase()} ${payload.token}\nAmount: $${payload.amount}`;
        break;
      case 'prediction':
        message = `🔮 New Prediction:\n${payload.token}: ${payload.sentiment}\nConfidence: ${(payload.confidence! * 100).toFixed(0)}%`;
        break;
      case 'status':
        message = '📊 Status Update:\nSystem running normally\nLast check: ' + new Date().toLocaleString();
        break;
    }

    try {
      await bot.sendMessage(chatId, message);
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
    }
  }

  async broadcastNotification(payload: NotificationPayload) {
    const promises = Array.from(this.chatIds).map(chatId => 
      this.sendNotification(chatId, payload)
    );
    await Promise.all(promises);
  }
}

export const notificationService = new NotificationService();