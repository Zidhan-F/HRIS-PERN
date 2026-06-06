import React from 'react';
import { MENU_ITEMS } from '../utils/helpers';

export default function Sidebar({ sidebarOpen, sidebarClosing, closeSidebar, activeMenu, activeSubMenu, expandedMenu, user, handleMenuClick, handleSubMenuClick }) {
  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''} ${sidebarClosing ? 'sidebar-closing' : ''}`}>
      <div className="sidebar-header">
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <span className="material-icons-outlined">menu_open</span>
        </button>
        <div className="sidebar-logo" style={{ background: 'none', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
            <defs>
              <linearGradient id="dayhrGradSidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
            <rect width="24" height="24" rx="6" fill="url(#dayhrGradSidebar)" />
            <circle cx="12" cy="9" r="3.5" fill="white" />
            <path d="M12 13C8.5 13 6 15 6 18H18C18 15 15.5 13 12 13Z" fill="white" />
            <circle cx="17" cy="7" r="1.5" fill="#facc15" />
          </svg>
        </div>
        <div className="sidebar-company"><span className="sidebar-company-name" style={{ letterSpacing: '0.5px' }}><span style={{ color: '#60a5fa' }}>Day</span>HR Company</span></div>
      </div>
      <nav className="sidebar-nav">
        {MENU_ITEMS.map((item) => (
          <React.Fragment key={item.id}>
            <button className={`sidebar-menu-item ${activeMenu === item.id && !activeSubMenu ? 'active' : ''} ${expandedMenu === item.id ? 'expanded' : ''}`} onClick={() => handleMenuClick(item.id)}>
              <span className="sidebar-menu-left"><span className="material-icons-outlined">{item.icon}</span>{item.label}</span>
              {item.hasSubmenu && <span className={`material-icons-outlined arrow-icon ${expandedMenu === item.id ? 'rotate' : ''}`}>expand_more</span>}
            </button>
            {item.hasSubmenu && expandedMenu === item.id && item.submenus && (
              <div className="sidebar-submenus">
                {item.submenus
                  .filter(sub => !(['att-report', 'att-daily'].includes(sub.id) && user?.role === 'employee'))
                  .map(sub => (
                    <button key={sub.id} className={`sidebar-submenu-item ${activeSubMenu === sub.id ? 'active' : ''}`} onClick={() => handleSubMenuClick(item.id, sub.id)}>{sub.label}</button>
                  ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
}
