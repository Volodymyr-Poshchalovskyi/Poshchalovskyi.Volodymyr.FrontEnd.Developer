// src/components/layout/ThemeSwitcher.jsx
import { useTheme } from '../../hooks/useTheme'; // Переконайтесь, що цей шлях правильний для вас

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('Кнопка теми натиснута!'); // <--- ДОДАЙТЕ ЦЕЙ РЯДОК
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick} // <--- Змінено тут
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-lg"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};