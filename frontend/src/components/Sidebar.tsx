import { NavLink } from 'react-router-dom';
import { FiHome, FiBookOpen, FiFolder, FiCheckSquare, FiUser, FiLogOut } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  {
    to: '/',
    icon: <FiHome size={20} />, // 🏠
    label: 'Басты бет',
  },
  {
    to: '/my-lessons',
    icon: <FiBookOpen size={20} />, // 📘
    label: 'Менің сабақтарым',
  },
  {
    to: '/courses',
    icon: <FiFolder size={20} />, // 🗂
    label: 'Курстар',
  },
  {
    to: '/practice',
    icon: <FiCheckSquare size={20} />, // ✅
    label: 'Практика',
  },
  {
    to: '/assistant',
    icon: <FaRobot size={20} />, // 🤖
    label: 'ИИ',
  },
  {
    to: '/profile',
    icon: <FiUser size={20} />, // 👤
    label: 'Профиль',
  },
];

export const Sidebar: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      // Можно добавить обработку ошибки
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-30">
      <nav className="flex flex-col gap-1 mt-6 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-6 py-3 text-base font-medium rounded-none transition-colors
              ${isActive ? 'bg-[#E6F0FF] text-[#007BFF]' : 'text-gray-700'}
              hover:bg-[#F5F5F5]`
            }
          >
            {({ isActive }) => (
              <>
                {/* Левая синяя полоска при активном */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-[#007BFF] rounded-r" />
                )}
                <span className="z-10">{item.icon}</span>
                <span className="z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}; 