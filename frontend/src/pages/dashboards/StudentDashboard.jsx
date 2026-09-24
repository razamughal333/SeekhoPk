import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getMyCourses } from '../../services/enrollmentService';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyCourses()
      .then(({ data }) => setEnrollments(data))
      .catch(() => setError('Could not load your enrolled courses.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <section className="border-b-2 border-ink bg-ink text-bg">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="font-display text-4xl font-semibold">Your courses, {user.name}</h1>
          <p className="mt-2 font-body text-bg/70">
            Everything you're enrolled in, in one place.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        {loading && <p className="font-body text-ink/60">Loading…</p>}
        {error && <p className="font-body text-ink/60">{error}</p>}

        {!loading && !error && enrollments.length === 0 && (
          <div className="border-2 border-ink p-8 text-center">
            <p className="font-body text-ink/70">
              You haven't enrolled in any course yet.
            </p>
            <Link
              to="/courses"
              className="mt-4 inline-block border-2 border-ink bg-teal px-5 py-2 font-body font-medium text-bg hover:bg-teal-dark"
            >
              Browse courses
            </Link>
          </div>
        )}

        {!loading && enrollments.length > 0 && (
          <div>
            {enrollments.map((enr) => (
              <div
                key={enr._id}
                className="flex flex-col gap-2 border-b-2 border-ink/15 py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <Link
                    to={`/courses/${enr.course._id}/learn`}
                    className="font-display text-xl font-medium text-ink hover:text-teal"
                  >
                    {enr.course.title}
                  </Link>
                  <p className="mt-1 font-body text-sm text-ink/60">
                    By {enr.course.instructor?.name || 'Unknown instructor'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-40 border border-ink/30">
                    <div
                      className="h-full bg-saffron"
                      style={{ width: `${enr.progress || 0}%` }}
                    />
                  </div>
                  <span className="font-body text-sm text-ink/60">{enr.progress || 0}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
