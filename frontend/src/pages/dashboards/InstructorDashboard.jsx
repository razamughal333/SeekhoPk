import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { getCourses, deleteCourse } from '../../services/courseService';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCourses = () => {
    setLoading(true);
    getCourses()
      .then(({ data }) => setCourses(data.filter((c) => c.instructor?._id === user._id)))
      .catch(() => setError('Could not load your courses.'))
      .finally(() => setLoading(false));
  };

  useEffect(loadCourses, [user._id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course? This cannot be undone.')) return;
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete this course.');
    }
  };

  return (
    <Layout>
      <section className="border-b-2 border-ink bg-ink text-bg">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold">Your courses</h1>
            <p className="mt-2 font-body text-bg/70">Manage what you teach on SeekhoPakistan.</p>
          </div>
          <Link
            to="/dashboard/instructor/courses/new"
            className="border-2 border-bg bg-saffron px-5 py-2.5 font-body font-medium text-ink hover:bg-saffron-dark"
          >
            Add new course
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        {loading && <p className="font-body text-ink/60">Loading…</p>}
        {error && <p className="font-body text-ink/60">{error}</p>}

        {!loading && !error && courses.length === 0 && (
          <p className="font-body text-ink/60">
            You haven't added any courses yet — add your first one above.
          </p>
        )}

        {!loading && courses.length > 0 && (
          <div>
            {courses.map((course) => (
              <div
                key={course._id}
                className="flex flex-col gap-3 border-b-2 border-ink/15 py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <Link
                    to={`/courses/${course._id}`}
                    className="font-display text-xl font-medium text-ink hover:text-teal"
                  >
                    {course.title}
                  </Link>
                  <p className="mt-1 font-body text-sm text-ink/60">
                    {course.category} · Rs {course.price?.toLocaleString('en-PK')}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/courses/${course._id}/edit`}
                    className="border-2 border-ink px-3 py-1.5 font-body text-sm font-medium text-ink hover:bg-ink hover:text-bg"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="border-2 border-ink px-3 py-1.5 font-body text-sm font-medium text-ink hover:border-red-700 hover:bg-red-700 hover:text-bg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
