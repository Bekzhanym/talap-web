# 🚀 Инструкции по настройке и тестированию

## 📁 Структура проекта (ПРОВЕРЕНА ✅)

```
talap-web/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthForm.tsx      ✅ Форма входа/регистрации
│   │   │   ├── Dashboard.tsx     ✅ Главная страница с тестом API
│   │   │   ├── TestAPI.tsx       ✅ Тестовый компонент API
│   │   │   └── ProtectedRoute.tsx ✅ Защищённые роуты
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx   ✅ Контекст аутентификации
│   │   ├── types/
│   │   │   └── auth.ts           ✅ TypeScript типы
│   │   ├── api/
│   │   │   └── axios.ts          ✅ HTTP клиент с токенами
│   │   ├── firebase.ts           ✅ Конфигурация Firebase
│   │   ├── App.tsx               ✅ Роутинг и интеграция
│   │   └── index.css             ✅ Tailwind CSS подключён
│   ├── tailwind.config.js        ✅ Конфигурация Tailwind
│   ├── postcss.config.js         ✅ Конфигурация PostCSS
│   └── package.json              ✅ Зависимости
├── backend/
│   ├── main.py                   ✅ FastAPI с Firebase Auth
│   ├── test_main.py              ✅ Тестовая версия без Firebase
│   └── requirements.txt          ✅ Python зависимости
└── README.md                     ✅ Документация
```

## 🔧 Пошаговая настройка

### 1. Frontend (React + TypeScript)

```bash
cd frontend
npm install
npm run dev
```

**Результат:** Приложение запустится на `http://localhost:5173`

### 2. Backend (FastAPI)

#### Вариант A: Тестовая версия (без Firebase)
```bash
cd backend
pip install -r requirements.txt
python test_main.py
```

#### Вариант B: Полная версия (с Firebase)
```bash
cd backend
pip install -r requirements.txt
python main.py
```

**Результат:** API запустится на `http://localhost:8000`

## 🧪 Тестирование

### 1. Тест Frontend
1. Откройте `http://localhost:5173`
2. Должна открыться форма входа/регистрации
3. Попробуйте зарегистрироваться (пока без Firebase)

### 2. Тест Backend (с test_main.py)
1. Запустите `python test_main.py`
2. Откройте `http://localhost:8000` - должно показать `{"message": "Test API is running"}`
3. Откройте `http://localhost:8000/test` - должно показать `{"message": "Test endpoint working"}`

### 3. Тест интеграции Frontend + Backend
1. Запустите оба сервера (frontend + backend)
2. Войдите в приложение (любой email/пароль для теста)
3. На Dashboard нажмите "Тест /" - должно показать сообщение от API
4. Нажмите "Тест /me" - должно показать тестовые данные пользователя

## 🔐 Настройка Firebase (для полной версии)

### 1. Создание проекта Firebase
1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Создайте новый проект
3. Включите Authentication → Email/Password

### 2. Настройка Frontend
Обновите `frontend/src/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "ваш-api-key",
  authDomain: "ваш-project.firebaseapp.com",
  projectId: "ваш-project-id",
  storageBucket: "ваш-project.appspot.com",
  messagingSenderId: "ваш-sender-id",
  appId: "ваш-app-id"
};
```

### 3. Настройка Backend
1. В Firebase Console → Project Settings → Service Accounts
2. Скачайте `serviceAccountKey.json`
3. Поместите в папку `backend/`
4. Обновите путь в `backend/main.py`:
```python
cred = credentials.Certificate("serviceAccountKey.json")
```

## 🐛 Возможные проблемы

### Frontend не запускается
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend не запускается
```bash
cd backend
pip install --upgrade pip
pip install -r requirements.txt
python test_main.py
```

### CORS ошибки
Проверьте, что в `backend/main.py` или `backend/test_main.py` правильно настроены origins:
```python
allow_origins=["http://localhost:5173", "http://localhost:3000"]
```

### Tailwind CSS не работает
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## ✅ Что должно работать

1. **Frontend:** Форма входа/регистрации с Tailwind CSS
2. **Backend:** API эндпоинты с CORS
3. **Интеграция:** Тестовые запросы с фронтенда на бэкенд
4. **Роутинг:** Защищённые роуты и редиректы
5. **Аутентификация:** Контекст и хук useAuth

## 🚀 Следующие шаги

После успешного тестирования:
1. Настройте Firebase конфигурацию
2. Протестируйте реальную регистрацию и вход
3. Добавьте дополнительные функции по необходимости 