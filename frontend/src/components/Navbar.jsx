import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleHome = {
  admin: '/dashboard/admin',
  instructor: '/dashboard/instructor',
  student: '/dashboard/student',
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `border-b-2 pb-0.5 transition-colors ${
      isActive ? 'border-saffron text-ink' : 'border-transparent text-ink/70 hover:text-ink'
    }`;

  return (
    <header className="border-b-2 border-ink bg-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ink">
          Seekho<span className="text-teal">Pakistan</span>
        </Link>

        <nav className="hidden items-center gap-8 font-body text-sm font-medium md:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/courses" className={linkClass}>
            Courses
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          {user && (
            <NavLink to={roleHome[user.role]} className={linkClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden font-body text-sm text-ink/70 sm:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="border-2 border-ink px-4 py-1.5 font-body text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-body text-sm font-medium text-ink/80 hover:text-ink"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="border-2 border-ink bg-teal px-4 py-1.5 font-body text-sm font-medium text-bg transition-colors hover:bg-teal-dark"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
