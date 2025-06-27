# React + TypeScript + Firebase + FastAPI Authentication System

Полная система аутентификации с React фронтендом и FastAPI бэкендом, использующая Firebase Authentication.

## 🚀 Быстрый старт

1. **Клонируйте репозиторий**
   ```bash
   git clone <your-repo-url>
   cd talap-web
   ```

2. **Настройте переменные окружения**
   ```bash
   cp env.example .env
   # Отредактируйте .env файл с вашими Firebase настройками
   ```

3. **Установите зависимости**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   pip install -r requirements.txt
   ```

4. **Запустите приложение**
   ```bash
   # Backend (в папке backend)
   python main.py
   
   # Frontend (в папке frontend)
   npm run dev
   ```

## 📁 Структура проекта

```
talap-web/
├── .env                    # Общие переменные окружения
├── env.example            # Пример переменных окружения
├── frontend/              # React + TypeScript приложение
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── contexts/      # React контексты
│   │   ├── services/      # API сервисы
│   │   └── types/         # TypeScript типы
│   └── package.json
├── backend/               # FastAPI приложение
│   ├── main.py           # Основной файл API
│   └── requirements.txt  # Python зависимости
└── README.md
```

## 🔧 Конфигурация

### Переменные окружения (.env)

Создайте файл `.env` в корне проекта на основе `env.example`:

```env
# Frontend Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Backend Configuration
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=path/to/your/serviceAccountKey.json
API_BASE_URL=http://localhost:8000
```

### Firebase Setup

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/)
2. Включите Authentication с Email/Password
3. Скачайте service account key для бэкенда
4. Получите конфигурацию для веб-приложения

Подробные инструкции в [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

## 🎯 Функциональность

### Frontend
- ✅ Аутентификация через Firebase (email/password)
- ✅ Регистрация и вход
- ✅ Верификация email
- ✅ Защищенные маршруты
- ✅ Контекст аутентификации
- ✅ Современный UI с Tailwind CSS
- ✅ Обработка ошибок и загрузки

### Backend
- ✅ FastAPI с Firebase Admin SDK
- ✅ JWT верификация токенов
- ✅ Защищенные эндпоинты
- ✅ CORS настройки
- ✅ Примеры API эндпоинтов

### API Endpoints
- `GET /me` - Информация о пользователе
- `POST /save-progress` - Сохранение прогресса
- `POST /generate-test` - Генерация теста
- `POST /upload` - Загрузка файлов
- `GET /files` - Список файлов пользователя

## 🔒 Безопасность

- Firebase ID токены для аутентификации
- Верификация email
- Защищенные маршруты
- Валидация данных
- CORS настройки

Подробности в [SECURITY.md](SECURITY.md)

## 🧪 Тестирование

```bash
# Frontend тесты
cd frontend
npm test

# Backend тесты
cd backend
python -m pytest
```

## 📚 Документация

- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Настройка Firebase
- [QUICK_START.md](QUICK_START.md) - Быстрый старт
- [SECURITY.md](SECURITY.md) - Безопасность
- [SETUP.md](SETUP.md) - Подробная настройка

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch
3. Commit изменения
4. Push в branch
5. Создайте Pull Request

## 📄 Лицензия

MIT License 