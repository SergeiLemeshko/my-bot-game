//Импортируем пакет, который установили
const TelegramApi = require('node-telegram-bot-api');

//Токен из чата
const token = '5940211677:AAH6wu7fYpGk4lJzO6td7sY6mXw66RoWNlY';

const bot = new TelegramApi(token, { polling: true });

//Ф-я, которая запускает бот
const start = () => {
	//Команды чат бота
	bot.setMyCommands([
		{ command: '/start', description: 'Приветствие' },
		{ command: '/info', description: 'Инфо о пользователе' },
	]);

	//Вешаем слушатели событий на обработку полученных сообщений
	bot.on('message', async msg => {
		//Вытаскиваем необходимую информацию 
		const text = msg.text;
		const chatId = msg.chat.id;
		//Если команда /start
		if (text === '/start') {
			await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/3.webp');
			await bot.sendMessage(chatId, `Добро пожаловать!`);
		}
		//Если команда /info
		if (text === '/info') {
			await bot.sendMessage(chatId, `Тебя зовут: ${msg.from.first_name} ${msg.from.username}`);
		}
	});
};

start();