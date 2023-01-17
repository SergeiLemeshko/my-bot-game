//Импортируем пакет, который установили
const TelegramApi = require('node-telegram-bot-api');
//Импортируем опции для кнопок и достаем с помощью деструктуризации
const { gameOptions, againOption } = require('./options.js');

//Токен из чата
const token = '5940211677:AAH6wu7fYpGk4lJzO6td7sY6mXw66RoWNlY';

const bot = new TelegramApi(token, { polling: true });

const chats = {};



const startGame = async (chatId) => {
	await bot.sendMessage(chatId, `Я загадаю цифру от 0 до 9. Отгадай её.`);
	//Гененрируем случайное число
	const randomNumber = Math.floor(Math.random() * 10);
	chats[chatId] = randomNumber;
	await bot.sendMessage(chatId, 'Вперёд!', gameOptions);
};

//Ф-я, которая запускает бот
const start = () => {
	//Команды чат бота
	bot.setMyCommands([
		{ command: '/start', description: 'Приветствие' },
		{ command: '/info', description: 'Инфо о пользователе' },
		{ command: '/game', description: 'Игра: Угадай число' },
	]);

	//Вешаем слушатели событий на обработку полученных сообщений
	bot.on('message', async msg => {
		//Вытаскиваем необходимую информацию 
		const text = msg.text;
		const chatId = msg.chat.id;
		//Если команда /start
		if (text === '/start') {
			await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/3.webp');
			return bot.sendMessage(chatId, `Добро пожаловать!`);
		}
		//Если команда /info
		if (text === '/info') {
			return bot.sendMessage(chatId, `Тебя зовут: ${msg.from.first_name} ${msg.from.username}`);
		}
		//Если команда /play
		if (text === '/game') {
			return startGame(chatId);
		}
		//Если не отработало ни одно из условий
		return bot.sendMessage(chatId, 'Не понимаю Вас!');

	});

	//Прослушиваем кнопки
	bot.on('callback_query', msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;
		if (data === '/again') {
			return startGame(chatId);
		}
		if (data == chats[chatId]) {
			return bot.sendMessage(chatId, `Вы отгадали число ${chats[chatId]}`, againOption);
		} else {
			return bot.sendMessage(chatId, `Вы не угадали, бот загадал число ${chats[chatId]}`, againOption);
		}
	});
};

start();