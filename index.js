const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');  // Путь к маршрутам пользователя

const app = express();

// Используем middleware для парсинга JSON
app.use(bodyParser.json());  // Для обработки JSON-данных в теле запроса

// Подключаем маршруты
app.use('/api/users', userRoutes);  // Все маршруты пользователя начинаются с /api/users

// Запуск сервера
const port = 8080;
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});