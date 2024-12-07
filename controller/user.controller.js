const db = require('../config'); // Подключаем базу данных

class UserController {
    // Создание пользователя
    async createUser(req, res) {
        const { userName, password, first_name, last_name, telephone } = req.body;

        // Проверка, существует ли пользователь с таким логином
        const checkUserSql = "SELECT * FROM Users WHERE userName = ?";
        
        db.get(checkUserSql, [login], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            // Если логин уже занят
            if (row) {
                return res.status(400).json({ error: 'User with this login already exists' });
            }

            // Получаем текущую дату для поля created_at
            const createdAt = new Date().toISOString();

            // Если логин уникален, продолжаем с созданием пользователя
            const insertUserSql = `
                INSERT INTO Users (userName, password, first_name, last_name, telephone)
                VALUES (?, ?, ?, ?, ?, ?,)
            `;
    
            db.run(insertUserSql, [userName, password, first_name, last_name,telephone], function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to create user' });
                } else {
                    return res.status(201).json({ user_id: this.lastID, userName });  // Возвращаем ID нового пользователя
                }
            });
        });
    }

    // Получение пользователя
    async getUser(req, res) {
        const { login, password } = req.body;
        const sql = "SELECT * FROM Users WHERE id=?";

        db.all(sql, [id], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Invalid login or password' });
            }
            
            res.status(200).json(rows);
        });
    }

    // Удаление пользователя
    async deleteUser(req, res) {
        const { user_id } = req.body;

        // Проверяем, указан ли user_id и является ли он числом
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Проверяем, существует ли пользователь с данным user_id
        const checkUserSql = 'SELECT * FROM Users WHERE id = ?';

        db.get(checkUserSql, [id], (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Удаляем пользователя
            const deleteSql = 'DELETE FROM Users WHERE id = ?';

            db.run(deleteSql, [id], function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to delete user' });
                }

                // Проверяем, сколько записей было удалено
                if (this.changes === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }

                return res.status(200).json({ message: 'User deleted successfully' });
            });
        });
    }

    // Обновление пользователя
    async updateUser(req, res) {
        const { id, userName, password, first_name, last_name, telephone} = req.body;

        // Проверяем, указан ли user_id и является ли он числом
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Проверяем, существует ли пользователь с данным user_id
        const checkUserSql = 'SELECT * FROM Users WHERE id = ?';

        db.get(checkUserSql, [user_id], (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Обновляем данные пользователя
            const updateUserSql = `
                UPDATE Users
                SET userName = ?, password = ?, first_name = ?, last_name = ?, telephone = ?
                WHERE user_id = ?
            `;
            
            db.run(updateUserSql, [login, password, first_name, last_name, data_of_birth, height, weight, user_id], function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to update user' });
                }

                if (this.changes === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }

                return res.status(200).json({ message: 'User updated successfully' });
            });
        });
    }
}

module.exports = new UserController();
