import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getAnalytics, getUsers, deleteUser } from '../../services/adminService';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([getAnalytics(), getUsers()])
      .then(([a, u]) => {
        setAnalytics(a.data);
        setUsers(u.data);
      })
      .catch(() => setError('Could not load admin data.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete this user.');
    }
  };

  const stats = analytics
    ? [
        { label: 'Total users', value: analytics.totalUsers },
        { label: 'Students', value: analytics.totalStudents },
        { label: 'Instructors', value: analytics.totalInstructors },
        { label: 'Courses', value: analytics.totalCourses },
        { label: 'Enrollments', value: analytics.totalEnrollments },
      ]
    : [];

  return (
    <Layout>
      <section className="border-b-2 border-ink bg-ink text-bg">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="font-display text-4xl font-semibold">Admin overview</h1>
          <p className="mt-2 font-body text-bg/70">Platform-wide numbers and user management.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        {loading && <p className="font-body text-ink/60">Loading…</p>}
        {error && <p className="font-body text-ink/60">{error}</p>}

        {!loading && analytics && (
          <div className="mb-12 grid grid-cols-2 gap-px border-2 border-ink bg-ink sm:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} className="bg-bg px-4 py-5">
                <p className="font-display text-3xl font-semibold text-teal">{s.value}</p>
                <p className="mt-1 font-body text-xs text-ink/60">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && users.length > 0 && (
          <div>
            <h2 className="mb-4 font-display text-2xl font-semibold text-ink">All users</h2>
            {users.map((u) => (
              <div
                key={u._id}
                className="flex items-center justify-between border-b-2 border-ink/15 py-4 last:border-b-0"
              >
                <div>
                  <p className="font-body font-medium text-ink">{u.name}</p>
                  <p className="font-body text-sm text-ink/60">
                    {u.email} · <span className="capitalize">{u.role}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteUser(u._id)}
                  className="border-2 border-ink px-3 py-1.5 font-body text-sm font-medium text-ink hover:border-red-700 hover:bg-red-700 hover:text-bg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
