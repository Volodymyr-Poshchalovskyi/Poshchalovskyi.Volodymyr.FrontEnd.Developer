// src/components/layout/Layout.jsx
import React from 'react';
import { Sidebar } from './sidebar';


const Layout = ({ children }) => {
  return (
    <div>
     
      <Sidebar />

      {/* Основний контент сторінки */}
      <main className="p-4 sm:ml-64">
        {}
        <div className="mt-14"> {/* Додаємо відступ зверху, щоб контент не ховався під "бургер" */}
          {children}
        </div>
      </main>

      
    </div>
  );
};

export default Layout;