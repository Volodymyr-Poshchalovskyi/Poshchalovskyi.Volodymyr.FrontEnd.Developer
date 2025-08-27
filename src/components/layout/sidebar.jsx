import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHome, FaFolderOpen, FaFileAlt, FaLinkedin, FaGithub, FaTelegramPlane, FaRegEnvelope, FaCheck, FaSun, FaMoon } from 'react-icons/fa';
import Logo from '../../assets/Photo/Logo.png';
import LogoDark from '../../assets/Photo/LogoDark.png'; // <-- темне лого

const ThemeSwitcher = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return children({ darkMode, toggleTheme });
};

export const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'uk' ? 'en' : 'uk';
    i18n.changeLanguage(newLang);
  };

  const handleCopyEmail = (email) => {
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/your-profile' },
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/your-username' },
    { name: 'Telegram', icon: <FaTelegramPlane />, url: 'https://t.me/your-username' },
    { name: 'Email', icon: copied ? <FaCheck /> : <FaRegEnvelope />, url: 'mailto:volodymyr.poshchalovskyi@gmail.com', isEmail: true }
  ];

  return (
    <ThemeSwitcher>
      {({ darkMode, toggleTheme }) => (
        <>
          {/* Burger for mobile */}
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
            </svg>
          </button>

          {/* Sidebar */}
          <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidenav"
          >
            <div className="flex flex-col overflow-y-auto py-6 px-4 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img
                  src={darkMode ? LogoDark : Logo}
                  alt="Logo"
                  className="w-28 h-auto rounded-md"
                />
              </div>

              {/* Navigation */}
              <ul className="space-y-3 mb-6">
                <li>
                  <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <FaHome className="w-5 h-5" />
                    <span className="ml-3">{t('sidebar.home')}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <FaFolderOpen className="w-5 h-5" />
                    <span className="ml-3">{t('sidebar.portfolio')}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <FaFileAlt className="w-5 h-5" />
                    <span className="ml-3">{t('sidebar.cv')}</span>
                  </a>
                </li>
              </ul>

              {/* Divider */}
              <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

              {/* Social links */}
<ul className="flex flex-col mt-8">
  {socialLinks.map((link) => (
    <li key={link.name} className="mt-3 first:mt-0">
      {link.isEmail ? (
        <button
          onClick={() => handleCopyEmail(link.url.replace('mailto:', ''))}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm"
        >
          <span className="text-lg">{link.icon}</span>
          <span>E-mail</span> {/* <-- тепер завжди показує E-mail */}
        </button>
      ) : (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm"
        >
          <span className="text-lg">{link.icon}</span>
          <span>{link.name}</span>
        </a>
      )}
    </li>
  ))}
</ul>


              {/* Theme/Language buttons */}
              <div className="flex justify-around items-center p-4 space-x-4 mt-auto">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  {darkMode ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
                </button>

                <button
                  onClick={toggleLanguage}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  {i18n.language === 'uk' ? '🇺🇸' : '🇺🇦'}
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </ThemeSwitcher>
  );
};
