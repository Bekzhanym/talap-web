# Firebase Setup Instructions

## 1. Создание проекта Firebase

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Authentication в разделе "Authentication" → "Sign-in method"
4. Включите Email/Password аутентификацию

## 2. Настройка Frontend

### Создайте файл `.env`:

1. Скопируйте `env.example` в `.env`:
```bash
cd frontend
cp env.example .env
```

2. Обновите `frontend/.env` с вашими реальными данными:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyC-your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# API Configuration
VITE_API_BASE_URL=http://localhost:8000
```

### Получите конфигурацию из Firebase Console:

1. Firebase Console → Project Settings → General
2. В разделе "Your apps" найдите веб-приложение или создайте новое
3. Скопируйте конфигурацию:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC-your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

4. Преобразуйте в переменные окружения:
   - `apiKey` → `VITE_FIREBASE_API_KEY`
   - `authDomain` → `VITE_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `VITE_FIREBASE_PROJECT_ID`
   - `storageBucket` → `VITE_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `VITE_FIREBASE_APP_ID`

## 3. Настройка Backend

### Создайте Service Account Key:

1. Firebase Console → Project Settings → Service accounts
2. Нажмите "Generate new private key"
3. Скачайте JSON файл
4. Поместите файл в папку `backend/` как `serviceAccountKey.json`

### Обновите `backend/main.py`:

```python
cred = credentials.Certificate("serviceAccountKey.json")
```

## 4. Настройка Email Verification

1. Firebase Console → Authentication → Templates
2. Настройте Email verification template
3. Убедитесь, что Email verification включено в Sign-in methods

## 5. CORS настройки

Если нужно, обновите CORS настройки в `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "your-production-domain"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 6. Запуск приложения

### Frontend:
```bash
cd frontend
npm run dev
```

### Backend:
```bash
cd backend
python main.py
```

## 7. Тестирование

1. Откройте http://localhost:5173
2. Если видите ошибку конфигурации, проверьте `.env` файл
3. Зарегистрируйтесь с email и паролем
4. Проверьте email для верификации
5. Войдите в систему
6. Проверьте доступ к защищенным маршрутам

## 🔒 Безопасность

### Frontend (.env файл):
- ✅ Никогда не коммитьте `.env` файл в git
- ✅ Файл уже добавлен в `.gitignore`
- ✅ Используйте `env.example` как шаблон
- ✅ Все переменные начинаются с `VITE_` для доступности в браузере

### Backend:
- ✅ Никогда не коммитьте `serviceAccountKey.json` в git
- ✅ Файл уже добавлен в `.gitignore`
- ✅ Используйте переменные окружения для production

## 🚨 Устранение неполадок

### Ошибка "Missing required Firebase configuration fields":
1. Проверьте, что файл `.env` существует в папке `frontend/`
2. Убедитесь, что все переменные `VITE_FIREBASE_*` заполнены
3. Перезапустите dev сервер

### Ошибка "Firebase configuration contains placeholder values":
1. Замените placeholder значения на реальные данные из Firebase Console
2. Убедитесь, что скопировали правильную конфигурацию

### Ошибка "Firebase API key appears to be invalid":
1. Проверьте, что API ключ скопирован полностью (обычно 39 символов)
2. Убедитесь, что нет лишних пробелов в `.env` файле

### Ошибка "Failed to initialize Firebase":
1. Проверьте все значения в `.env` файле
2. Убедитесь, что проект в Firebase Console активен
3. Проверьте, что веб-приложение добавлено в Firebase проект 