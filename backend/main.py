from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, auth
import os
from typing import Optional, Dict, Any
from pydantic import BaseModel
from dotenv import load_dotenv

# Загружаем переменные окружения из корневого .env файла
load_dotenv('../.env')

# Инициализация Firebase Admin SDK
# Используем переменную окружения для пути к service account key
service_account_path = os.getenv('FIREBASE_SERVICE_ACCOUNT_KEY_PATH', 'path/to/serviceAccountKey.json')
try:
    cred = credentials.Certificate(service_account_path)
    firebase_admin.initialize_app(cred)
    print(f"Firebase Admin SDK initialized with service account: {service_account_path}")
except Exception as e:
    print(f"Firebase Admin SDK initialization error: {e}")
    print("Please check your FIREBASE_SERVICE_ACCOUNT_KEY_PATH in .env file")
    # Для разработки можно использовать эмулятор или пропустить инициализацию

app = FastAPI(title="File Upload API", version="1.0.0")

# Настройка CORS для фронтенда
# Используем переменную окружения для API_BASE_URL
api_base_url = os.getenv('API_BASE_URL', 'http://localhost:8000')
frontend_urls = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:5174",  # Vite dev server (alternative port)
    "http://localhost:5175",  # Vite dev server (alternative port)
    "http://localhost:5176",  # Vite dev server (alternative port)
    "http://localhost:3000",  # Alternative dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_urls,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic модели для запросов
class ProgressData(BaseModel):
    progress: Dict[str, Any]
    timestamp: Optional[str] = None

class TestGenerationParams(BaseModel):
    topic: str
    difficulty: str
    question_count: int = 10

def verify_firebase_token(request: Request):
    """Проверяет Firebase ID token из заголовка Authorization"""
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail='Missing or invalid Authorization header'
        )
    
    id_token = auth_header.split(' ')[1]
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail=f'Invalid token: {str(e)}'
        )

@app.get("/")
def read_root():
    return {"message": "File Upload API is running"}

@app.get("/me")
def get_user_info(user=Depends(verify_firebase_token)):
    """Получить информацию о текущем пользователе"""
    return {
        "email": user["email"], 
        "uid": user["uid"],
        "email_verified": user.get("email_verified", False)
    }

@app.post("/save-progress")
def save_progress(
    progress_data: ProgressData,
    user=Depends(verify_firebase_token)
):
    """Сохранить прогресс пользователя"""
    try:
        # В реальном приложении здесь была бы база данных
        # Для демонстрации просто возвращаем подтверждение
        return {
            "message": "Progress saved successfully",
            "user_email": user["email"],
            "user_uid": user["uid"],
            "progress": progress_data.progress,
            "timestamp": progress_data.timestamp
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving progress: {str(e)}"
        )

@app.post("/generate-test")
def generate_test(
    params: TestGenerationParams,
    user=Depends(verify_firebase_token)
):
    """Сгенерировать тест для пользователя"""
    try:
        # В реальном приложении здесь была бы генерация теста
        # Для демонстрации возвращаем mock данные
        mock_questions = [
            {
                "id": 1,
                "question": f"Sample question about {params.topic}",
                "options": ["A", "B", "C", "D"],
                "correct_answer": "A"
            }
        ] * params.question_count
        
        return {
            "message": "Test generated successfully",
            "user_email": user["email"],
            "user_uid": user["uid"],
            "topic": params.topic,
            "difficulty": params.difficulty,
            "question_count": params.question_count,
            "questions": mock_questions
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating test: {str(e)}"
        )

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...), 
    user=Depends(verify_firebase_token)
):
    """Загрузить файл (только для аутентифицированных пользователей)"""
    
    # Проверяем размер файла (максимум 10MB)
    if file.size and file.size > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File too large. Maximum size is 10MB"
        )
    
    # Проверяем тип файла (опционально)
    allowed_types = [".txt", ".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"]
    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type not allowed. Allowed types: {', '.join(allowed_types)}"
        )
    
    # Создаём папку для файлов если её нет
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Сохраняем файл
    file_path = os.path.join(upload_dir, f"{user['uid']}_{file.filename}")
    try:
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving file: {str(e)}"
        )
    
    return {
        "message": "File uploaded successfully",
        "filename": file.filename,
        "user_email": user["email"],
        "file_path": file_path,
        "file_size": len(contents)
    }

@app.get("/files")
def get_user_files(user=Depends(verify_firebase_token)):
    """Получить список файлов пользователя"""
    upload_dir = "uploads"
    user_files = []
    
    if os.path.exists(upload_dir):
        for filename in os.listdir(upload_dir):
            if filename.startswith(f"{user['uid']}_"):
                file_path = os.path.join(upload_dir, filename)
                file_size = os.path.getsize(file_path)
                user_files.append({
                    "filename": filename.replace(f"{user['uid']}_", ""),
                    "size": file_size,
                    "uploaded_at": os.path.getctime(file_path)
                })
    
    return {"files": user_files}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 