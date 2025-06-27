import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const EmailVerificationPage = () => {
  const { user, reloadUser, signOut, sendEmailVerification } = useAuth();
  const [checking, setChecking] = useState(false);
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const handleCheck = async () => {
    setChecking(true);
    setInfo('');
    await reloadUser();
    if (user?.emailVerified) {
      navigate('/dashboard');
    } else {
      setInfo('Пожалуйста, подтвердите аккаунт по ссылке в письме.');
    }
    setChecking(false);
  };

  const handleResend = async () => {
    setInfo('');
    try {
      await sendEmailVerification();
      setInfo('Письмо отправлено повторно!');
    } catch {
      setInfo('Ошибка при отправке письма.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Подтвердите ваш email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            На <span className="font-medium">{user?.email}</span> отправлено письмо с подтверждением.<br/>
            Перейдите по ссылке из письма, затем нажмите кнопку ниже.
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={handleCheck}
            disabled={checking}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {checking ? 'Проверка...' : 'Проверить подтверждение'}
          </button>
          <button
            onClick={handleResend}
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Отправить письмо повторно
          </button>
          <button
            onClick={signOut}
            className="w-full py-2 px-4 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Выйти
          </button>
        </div>
        {info && <div className="text-center text-sm text-blue-600">{info}</div>}
      </div>
    </div>
  );
}; 