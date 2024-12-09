# Задача для работы с большими объемами данных в PostgreSQL

Тестовый сервис для работы с большим объемом данных - 217.171.146.85:3006

Этот репозиторий содержит сервис, построенный с использованием NestJS, для работы с большими объемами данных в базе данных PostgreSQL. Сервис предоставляет несколько эндпоинтов для создания пользователей, для подсчета, сброса и повторной случайной установки флага "проблем" в таблице базы данных, содержащей более миллиона строк.

## Возможности

- **GET /users/quantity-problems** - Возвращает общее количество пользователей с проблемами.
- **POST /users/add-users** - Добавляет нового пользователя в базу данных.
- **POST /users/reset-problems** - Сбрасывает все проблемы пользователей в базе данных.
- **POST /users/reset-and-count-problems** - Сбрасывает все проблемы пользователей и возвращает количество затронутых пользователей.
- **POST /users/update-random-problems** - Обновляет проблемы случайного числа пользователей.

## Требования

Перед запуском сервиса убедитесь, что у вас установлены следующие компоненты:

- **Node.js** (версия 16 или выше)
- **PostgreSQL** (версия 12 или выше)
- **NestJS** (можно установить глобально с помощью команды `npm i -g @nestjs/cli`)

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/your-username/large-data-postgres-task.git
   cd large-data-postgres-task
   ```

````

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Создайте базу данных в PostgreSQL (например, `your_database_name`).

4. Выполните миграции базы данных:

   Сначала создайте миграции с помощью следующей команды:

   ```bash
   npm run makemigrations
   ```

   Затем примените миграции к базе данных:

   ```bash
   npm run migrate
   ```

   Это создаст все необходимые таблицы и структуру базы данных в соответствии с вашей конфигурацией.

5. Настройте переменные окружения:

   Создайте файл `.env` в корне проекта и добавьте следующие данные:

   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_database_name
   ```

6. Запустите сервис локально:

   ```bash
   npm run start
   ```


## Эндпоинты

### `POST /users/add-users`

Добавляет нового пользователя в базу данных.

**Тело запроса:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "age": 30,
  "gender": "Male",
  "has_problems": true
}
```

**Ответ:**

```json
{
  "id": 123,
  "first_name": "John",
  "last_name": "Doe",
  "age": 30,
  "gender": "Male",
  "has_problems": true
}
```

---

### `GET /users/quantity-problems`

Возвращает общее количество пользователей, у которых есть проблемы.

**Ответ:**

```json
{
  "count": 1000
}
```

---

### `POST /users/reset-problems`

Сбрасывает поле `has_problems` у всех пользователей на `false`.

**Ответ:**

```json
{
  "message": "Проблемы успешно сброшены"
}
```

---

### `POST /users/reset-and-count-problems`

Сбрасывает проблемы у всех пользователей и возвращает количество затронутых пользователей.

**Ответ:**

```json
{
  "message": "Проблемы успешно сброшены",
  "affected_count": 1000
}
```

---

### `POST /users/update-random-problems`

Обновляет проблемы случайного числа пользователей.

**Тело запроса:**

```json
{
  "count": 500
}
```

**Ответ:**

```json
{
  "message": "Проблемы обновлены для 500 случайных пользователей"
}
```

## Миграции базы данных

В проекте используется TypeORM для работы с базой данных. Миграции выполняются с помощью следующих скриптов, настроенных в `package.json`:

- **Генерация миграций**: Для создания миграций, которые будут содержать изменения в структуре базы данных, используйте команду:

  ```bash
  npm run makemigrations
  ```

- **Применение миграций**: Чтобы применить миграции к базе данных, выполните команду:

  ```bash
  npm run migrate
  ```

Эти команды обеспечивают автоматическое создание и применение миграций.
```
````
