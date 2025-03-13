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
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gray-900 text-white p-6 shadow-lg">
          <ul className="flex space-x-6">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/" className="hover:underline">Home</Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:underline">Profile</Link>
                </li>
                <li>
                  <Link to="/costumer-restaurants" className="hover:underline">Restaurants</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">Logout</button>
                </li>
                {isAdmin && (
                  <>
                    <li>
                      <Link to="/admin-feedback" className="hover:underline">All Feedback</Link>
                    </li>
                    <li>
                      <Link to="/admin-menus" className="hover:underline">All Menus</Link>
                    </li>
                    <li>
                      <Link to="/admin-restaurants" className="hover:underline">All Restaurants</Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:underline">Login</Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">Home</Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:underline">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <main className="flex-grow p-6 bg-gray-200">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
