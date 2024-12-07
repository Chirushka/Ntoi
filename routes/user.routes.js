const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();

// Создание нового пользователя
router.post('/create', userController.createUser);

// Получение пользователя
router.post('/getUser', userController.getUser);

// Удаление пользователя
router.delete('/delete', userController.deleteUser);

// Обновление пользователя
router.put('/update', userController.updateUser);

module.exports = router;
