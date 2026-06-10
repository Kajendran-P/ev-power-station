import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotif } from '../context/NotifContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { notifications, togglePanel } = useNotif();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-in">
          <div className="logo" onClick={() => { setIsOpen(false); navigate('/home'); }}>
            <div className="logo-ic"><i className="fa-solid fa-bolt" style={{color:'#030A06',fontSize:'16px'}}></i></div>
            <h3 className="logo-sub">
              <span className="hidden-mobile">EV Charging Power Station</span>
              <span className="visible-mobile">VoltReserve</span>
            </h3>
          </div>
          <div className="nav-lks">
            <NavLink to="/home" className={({isActive}) => 'nav-lk' + (isActive ? ' act' : '')}>Home</NavLink>
            <NavLink to="/stations" className={({isActive}) => 'nav-lk' + (isActive ? ' act' : '')}>Stations</NavLink>
            <NavLink to="/services" className={({isActive}) => 'nav-lk' + (isActive ? ' act' : '')}>Services</NavLink>
            <NavLink to="/spare-parts" className={({isActive}) => 'nav-lk' + (isActive ? ' act' : '')}>Spare Parts</NavLink>
            <NavLink to="/dashboard" className={({isActive}) => 'nav-lk' + (isActive ? ' act' : '')}>Dashboard</NavLink>
            <NavLink to="/technician" className={({isActive}) => 'nav-lk' + (isActive ? ' act' : '')}>Technician</NavLink>
            <NavLink to="/admin" className={({isActive}) => 'nav-lk' + (isActive ? ' act' : '')}>Admin</NavLink>
          </div>
          <div className="nav-r">
            {user ? (
              <>
                <div className="nav-user-pill">
                  <div className="nav-user-avatar">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="nav-user-info">
                    <span className="nav-user-name">{user.name || user.email}</span>
                    <span className="nav-user-status">
                      <span className="nav-online-dot"></span>
                      Online
                    </span>
                  </div>
                </div>
                <button className="btn-p btn-sm nav-logout-btn" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
              </>
            ) : (
              <button className="btn-p btn-sm" onClick={() => { navigate('/login'); }}>Sign In</button>
            )}
            <div className="notif-btn" onClick={() => { setIsOpen(false); togglePanel(); }} title="Notifications">
              <i className="fa-solid fa-bell" style={{fontSize:'15px'}}></i>
              {notifications.length > 0 && <div className="notif-dot"></div>}
            </div>
            <button className="nav-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`} style={{fontSize:'18px'}}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer${isOpen ? ' open' : ''}`}>
        <div className="mobile-drawer-links">
          <NavLink to="/home" onClick={() => setIsOpen(false)} className={({isActive}) => 'mobile-drawer-lk' + (isActive ? ' act' : '')}>
            <i className="fa-solid fa-house"></i> Home
          </NavLink>
          <NavLink to="/stations" onClick={() => setIsOpen(false)} className={({isActive}) => 'mobile-drawer-lk' + (isActive ? ' act' : '')}>
            <i className="fa-solid fa-charging-station"></i> Stations
          </NavLink>
          <NavLink to="/services" onClick={() => setIsOpen(false)} className={({isActive}) => 'mobile-drawer-lk' + (isActive ? ' act' : '')}>
            <i className="fa-solid fa-screwdriver-wrench"></i> Services
          </NavLink>
          <NavLink to="/spare-parts" onClick={() => setIsOpen(false)} className={({isActive}) => 'mobile-drawer-lk' + (isActive ? ' act' : '')}>
            <i className="fa-solid fa-gears"></i> Spare Parts
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={({isActive}) => 'mobile-drawer-lk' + (isActive ? ' act' : '')}>
            <i className="fa-solid fa-gauge"></i> Dashboard
          </NavLink>
          <NavLink to="/technician" onClick={() => setIsOpen(false)} className={({isActive}) => 'mobile-drawer-lk' + (isActive ? ' act' : '')}>
            <i className="fa-solid fa-user-gear"></i> Technician
          </NavLink>
          <NavLink to="/admin" onClick={() => setIsOpen(false)} className={({isActive}) => 'mobile-drawer-lk' + (isActive ? ' act' : '')}>
            <i className="fa-solid fa-user-shield"></i> Admin
          </NavLink>
          {user && (
            <button className="btn-s btn-sm mobile-drawer-logout" onClick={() => { logout(); setIsOpen(false); navigate('/login'); }}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}

