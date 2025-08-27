// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">Book Management</Link>
          
          <div className="flex space-x-4">
            {currentUser ? (
              <>
                <Link to="/books" className="px-3 py-2 rounded hover:bg-indigo-500 transition">
                  Books
                </Link>
                <Link to="/add-book" className="px-3 py-2 rounded hover:bg-indigo-500 transition">
                  Add Book
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded hover:bg-indigo-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded hover:bg-indigo-500 transition">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded hover:bg-indigo-500 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;