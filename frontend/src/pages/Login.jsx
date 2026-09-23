import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ImageWithFallback from '../components/ImageWithFallback';
import { useAuth } from '../context/AuthContext';

const roleHome = {
  admin: '/dashboard/admin',
  instructor: '/dashboard/instructor',
  student: '/dashboard/student',
};

export default function Login() {
  const { login, authError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) {
      const updated = JSON.parse(localStorage.getItem('seekhopk_user'));
      navigate(roleHome[updated.role] || '/');
    }
  };

  return (
    <Layout>
      <section className="mx-auto grid min-h-[70vh] max-w-4xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <ImageWithFallback
          src="/images/auth-side.jpg"
          alt=""
          className="hidden h-[28rem] w-full border-2 border-ink object-cover md:block"
        />

        <div>
        <h1 className="font-display text-3xl font-semibold text-ink">Log in</h1>
        <p className="mt-2 font-body text-ink/60">Welcome back to SeekhoPakistan.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-sm font-medium text-ink">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-body text-sm font-medium text-ink">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
            />
          </label>

          {authError && <p className="font-body text-sm text-red-700">{authError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 border-2 border-ink bg-teal py-2.5 font-body font-medium text-bg transition-colors hover:bg-teal-dark disabled:opacity-60"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 font-body text-sm text-ink/60">
          New to SeekhoPakistan?{' '}
          <Link to="/register" className="font-medium text-teal hover:underline">
            Create an account
          </Link>
        </p>
        </div>
      </section>
    </Layout>
  );
}
