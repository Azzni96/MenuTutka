import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Layout.css';

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleAutoLogin = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setIsAdmin(user?.user_level === 'admin');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/login");
  };

  useEffect(() => {
    handleAutoLogin(); // Check login status immediately when the component loads

    const handleStorageChange = () => {
      handleAutoLogin();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    handleAutoLogin(); // Update state immediately when the component renders
  }, [localStorage.getItem("token")]); // Listen for token changes

  return (
    <>
      <div>
        <nav>
          <ul>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/costumer-restaurants">Restaurants</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
                {isAdmin && (
                  <>
                    <li>
                      <Link to="/admin-feedback">All Feedback</Link>
                    </li>
                    <li>
                      <Link to="/admin-menus">All Menus</Link>
                    </li>
                    <li>
                      <Link to="/admin-restaurants">All Restaurants</Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
