
import os
from pathlib import Path

from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes


# Завантажуємо токен із .env
env_path = Path(__file__).with_name(".env")
load_dotenv(env_path)

TOKEN = os.getenv("BOT_TOKEN")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Привіт! 👋\n"
        "Ласкаво просимо до помоги!\n\n"
        "Наша помощь скоро буде доступний."
    )


def main():
    if not TOKEN:
        raise ValueError("Не знайдено BOT_TOKEN у файлі .env")

    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))

    print("MultiBrowser bot запущений!")

    app.run_polling()


if __name__ == "__main__":
    main()
