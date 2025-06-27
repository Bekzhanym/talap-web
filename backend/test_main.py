from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Test API", version="1.0.0")

# Настройка CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Test API is running"}

@app.get("/test")
def test_endpoint():
    return {"message": "Test endpoint working"}

@app.get("/me")
def get_user_info():
    """Тестовый эндпоинт без аутентификации"""
    return {
        "email": "test@example.com", 
        "uid": "test-uid",
        "email_verified": True
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 