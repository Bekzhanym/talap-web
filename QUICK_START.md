# 🚀 Быстрый старт

## Предварительные требования

- Node.js 18+ и npm
- Python 3.8+ и pip
- Firebase проект (см. [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

## 1. Установка зависимостей

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
pip install -r requirements.txt
```

## 2. Настройка Firebase

### Frontend (.env файл):

1. Создайте файл `.env` из примера:
```bash
cd frontend
cp env.example .env
```

2. Получите конфигурацию из Firebase Console:
   - Перейдите в [Firebase Console](https://console.firebase.google.com/)
   - Выберите ваш проект
   - Project Settings → General → Your apps → Web app
   - Скопируйте конфигурацию

3. Обновите `frontend/.env` с реальными данными:
```env
VITE_FIREBASE_API_KEY=AIzaSyC-your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (Service Account Key):

1. Firebase Console → Project Settings → Service accounts
2. Нажмите "Generate new private key"
3. Скачайте JSON файл
4. Поместите файл в `backend/serviceAccountKey.json`

## 3. Запуск приложения

```bash
# Терминал 1 - Frontend
cd frontend
npm run dev

# Терминал 2 - Backend
cd backend
python3 main.py
```

## 4. Тестирование

1. Откройте http://localhost:5173
2. Если видите ошибку конфигурации, проверьте `.env` файл
3. Зарегистрируйтесь с email и паролем
4. Проверьте email для верификации
5. Войдите в систему
6. Проверьте работу API через кнопки в Dashboard

## 🔧 Возможные проблемы

### Ошибка конфигурации Firebase
```bash
# Проверьте .env файл
cd frontend
cat .env

# Убедитесь, что все переменные заполнены
grep "VITE_FIREBASE" .env
```

### Frontend не собирается
```bash
cd frontend
npm install
npm run build
```

### Backend не запускается
```bash
cd backend
pip install -r requirements.txt
python3 main.py
```

### Firebase ошибки
- Проверьте конфигурацию в `frontend/.env`
- Убедитесь, что Service Account Key находится в `backend/serviceAccountKey.json`
- Проверьте, что Email/Password аутентификация включена в Firebase Console

### CORS ошибки
- Убедитесь, что бэкенд запущен на порту 8000
- Проверьте CORS настройки в `backend/main.py`

## 🔒 Безопасность

- ✅ `.env` файл исключен из git (добавлен в `.gitignore`)
- ✅ `serviceAccountKey.json` исключен из git
- ✅ Все конфиденциальные данные в переменных окружения
- ✅ Валидация конфигурации при запуске

## 📞 Поддержка

Если возникли проблемы, проверьте:
1. [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - подробные инструкции по Firebase
2. [README.md](./README.md) - полная документация проекта
3. Логи в консоли браузера и терминале
4. Убедитесь, что `.env` файл создан и заполнен правильно 