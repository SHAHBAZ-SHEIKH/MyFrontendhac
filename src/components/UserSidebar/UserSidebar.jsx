import { Link, useLocation } from "react-router-dom";
import "./UserSidebar.css";
const UserSidebar = ({ isSidebarOpen, setIsSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <div className="admin-sidebar-content">
            <Link to="/user/dashboard" className={`admin-sidebar-link ${currentPath === '/user/dashboard' ? 'active' : ''}`}>
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </Link>
            <Link to="/user/loan" className={`admin-sidebar-link ${currentPath === '/admin/messages' ? 'active' : ''}`}>
              <i className="fas fa-users"></i>
              <span>Loan request</span>
            </Link>
            <Link to="/admin/courses" className={`admin-sidebar-link ${currentPath === '/admin/courses' ? 'active' : ''}`}>
              <i className="fas fa-book"></i>
              <span>LogOut</span>
            </Link>
            {/* <Link to="/admin/departments" className={`admin-sidebar-link ${currentPath === '/admin/departments' ? 'active' : ''}`}>
              <i className="fas fa-building"></i>
              <span>Departments</span>
            </Link>
            <Link className={`admin-sidebar-link`} onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </Link> */}
          </div>
        </aside>
    </>
  );
};

export default UserSidebar;