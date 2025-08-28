import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHome, FaFolderOpen, FaFileAlt, FaLinkedin, FaGithub, FaTelegramPlane, FaRegEnvelope, FaSun, FaMoon, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import Logo from '../../assets/Photo/Logo.png';
import LogoDark from '../../assets/Photo/LogoDark.png';

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
  const [isModalMounted, setModalMounted] = useState(false);
  const [isModalAnimating, setModalAnimating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [shouldRenderMobileMenu, setShouldRenderMobileMenu] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setShouldRenderMobileMenu(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setShouldRenderMobileMenu(false);
      }, 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  const toggleLanguage = () => {
    const newLang = i18n.language === 'uk' ? 'en' : 'uk';
    i18n.changeLanguage(newLang);
  };

  const handleCopyEmail = (email) => {
    if (isModalMounted) return;
    navigator.clipboard.writeText(email).then(() => {
      setModalMounted(true);
      setTimeout(() => {
        setModalAnimating(false);
        setTimeout(() => setModalMounted(false), 200);
      }, 2000);
    });
  };

  useEffect(() => {
    if (isModalMounted) {
      const timer = setTimeout(() => setModalAnimating(true), 10);
      return () => clearTimeout(timer);
    }
  }, [isModalMounted]);

  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/your-profile' },
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/your-username' },
    { name: 'Telegram', icon: <FaTelegramPlane />, url: 'https://t.me/your-username' },
    { name: 'Email', icon: <FaRegEnvelope />, url: 'mailto:volodymyr.poshchalovskyi@gmail.com', isEmail: true }
  ];

  const textSpanClass = `whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
    isCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[150px] opacity-100 ml-3'
  }`;

  return (
    <ThemeSwitcher>
      {({ darkMode, toggleTheme }) => (
        <>
          <button
            onClick={() => setMobileMenuOpen(true)}
            type="button"
            className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover-bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
            </svg>
          </button>

          {shouldRenderMobileMenu && (
            <div
              onClick={() => setMobileMenuOpen(false)}
              className={`fixed inset-0 z-30 bg-black/50 sm:hidden transition-opacity duration-300 ease-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            ></div>
          )}

          <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-out sm:translate-x-0 ${isCollapsed ? 'sm:w-20' : 'sm:w-56'} ${isMobileMenuOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}`}
            aria-label="Sidenav"
          >
            <div className={`absolute top-6 w-full z-50 hidden sm:flex transition-all duration-300 ease-in-out ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out ${!isCollapsed && 'mr-[-16px]'}`}
                aria-label="Toggle sidebar"
              >
                {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
              </button>
            </div>
            
            <div className="flex flex-col overflow-y-auto py-6 px-4 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              
              <div className="absolute top-4 right-4 sm:hidden">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                  aria-label="Close menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex justify-center items-center mb-6 h-[56px]">
                  <img
                    src={darkMode ? LogoDark : Logo}
                    alt="Logo"
                    className={`w-28 h-auto rounded-md transition-opacity duration-300 ease-in-out ${isCollapsed && !isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  />
              </div>

              <ul className="space-y-3 mb-6">
                <li>
                  <a href="#" className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isCollapsed && 'justify-center'}`}>
                    <FaHome className="w-5 h-5" />
                    <span className={textSpanClass}>{t('sidebar.home')}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isCollapsed && 'justify-center'}`}>
                    <FaFolderOpen className="w-5 h-5" />
                    <span className={textSpanClass}>{t('sidebar.portfolio')}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isCollapsed && 'justify-center'}`}>
                    <FaFileAlt className="w-5 h-5" />
                    <span className={textSpanClass}>{t('sidebar.cv')}</span>
                  </a>
                </li>
              </ul>

              <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

              <ul className="flex flex-col mt-8">
                {socialLinks.map((link) => (
                  <li key={link.name} className="mt-3 first:mt-0">
                    {link.isEmail ? (
                      <div className="relative">
                        <button
                          onClick={() => handleCopyEmail(link.url.replace('mailto:', ''))}
                          className={`flex items-center w-full text-base text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors ${isCollapsed && 'justify-center'}`}
                        >
                          <span className="text-xl"><FaRegEnvelope /></span>
                          <span className={textSpanClass}>E-mail</span>
                        </button>
                        {isModalMounted && !isCollapsed && (
                          <div className={`absolute left-0 top-full mt-2 px-3 py-1.5 text-sm font-medium rounded-lg z-10 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 ease-in-out ${isModalAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            {/* <-- ЗМІНЕНО: Текст "Скопійовано" тепер береться з файлу локалізації --> */}
                            {t('sidebar.copied')}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center w-full text-base text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors ${isCollapsed && 'justify-center'}`}
                      >
                        <span className="text-xl">{link.icon}</span>
                        <span className={textSpanClass}>{link.name}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <div className={`flex items-center p-4 mt-auto transition-all duration-300 ease-in-out ${isCollapsed ? 'flex-col space-y-4' : 'justify-around space-x-4'}`}>
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