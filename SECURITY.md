# 🔒 Security Guidelines

## Переменные окружения

### Frontend (.env файл)

✅ **Правильно:**
```env
VITE_FIREBASE_API_KEY=AIzaSyC-your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

❌ **Неправильно:**
```typescript
// Не храните конфигурацию в коде
const firebaseConfig = {
  apiKey: "AIzaSyC-your-actual-api-key",
  // ...
};
```

### Backend (Service Account Key)

✅ **Правильно:**
- Файл `serviceAccountKey.json` в `.gitignore`
- Использование переменных окружения в production

❌ **Неправильно:**
- Коммит `serviceAccountKey.json` в git
- Хранение ключей в коде

## Безопасность Firebase

### API Keys
- Firebase API keys **НЕ** являются секретными
- Они привязаны к домену и ограничены правилами безопасности
- Можно безопасно использовать в frontend коде

### Service Account Keys
- **ЯВЛЯЮТСЯ секретными**
- Никогда не коммитьте в git
- Используйте только на сервере

## Валидация конфигурации

Система автоматически проверяет:

1. **Наличие всех переменных** - все `VITE_FIREBASE_*` должны быть заполнены
2. **Отсутствие placeholder значений** - проверка на "your-api-key-here" и подобные
3. **Формат API ключа** - минимальная длина и структура
4. **Формат Project ID** - проверка на корректность

## Production рекомендации

### Frontend
```env
# Production .env
VITE_FIREBASE_API_KEY=your-production-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-production-domain.firebaseapp.com
VITE_API_BASE_URL=https://your-api-domain.com
```

### Backend
```bash
# Используйте переменные окружения
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
```

## Мониторинг безопасности

### Логи
- Все ошибки конфигурации логируются в консоль
- Проверяйте логи на наличие чувствительной информации

### Firebase Console
- Регулярно проверяйте Firebase Console → Authentication → Users
- Мониторьте подозрительную активность

## Обновление ключей

### Если API ключ скомпрометирован:
1. Firebase Console → Project Settings → General
2. Regenerate API key
3. Обновите `VITE_FIREBASE_API_KEY` в `.env`

### Если Service Account Key скомпрометирован:
1. Firebase Console → Project Settings → Service accounts
2. Delete старый ключ
3. Generate new private key
4. Обновите `serviceAccountKey.json`

## Дополнительные меры безопасности

### CORS
```python
# Ограничьте origins в production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)
```

### Firebase Rules
```javascript
// Ограничьте доступ к данным
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Чек-лист безопасности

- [ ] `.env` файл добавлен в `.gitignore`
- [ ] `serviceAccountKey.json` добавлен в `.gitignore`
- [ ] Все placeholder значения заменены на реальные
- [ ] CORS настроен для production
- [ ] Firebase Rules настроены
- [ ] Мониторинг включен
- [ ] Регулярные обновления ключей 