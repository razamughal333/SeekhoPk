import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ImageWithFallback from '../components/ImageWithFallback';
import { useAuth } from '../context/AuthContext';
import { getCourseById, deleteCourse } from '../services/courseService';
import { enrollInCourse } from '../services/enrollmentService';

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollStatus, setEnrollStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [enrollMessage, setEnrollMessage] = useState('');

  useEffect(() => {
    getCourseById(id)
      .then(({ data }) => setCourse(data))
      .catch(() => setError('This course could not be found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    setEnrollStatus('loading');
    try {
      await enrollInCourse(id);
      setEnrollStatus('success');
      setEnrollMessage("You're enrolled. Find this course on your dashboard.");
    } catch (err) {
      setEnrollStatus('error');
      setEnrollMessage(err.response?.data?.message || 'Enrollment failed. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this course? This cannot be undone.')) return;
    try {
      await deleteCourse(id);
      navigate('/courses');
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete this course.');
    }
  };

  const isOwnerOrAdmin =
    user && course && (user.role === 'admin' || user._id === course.instructor?._id);

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-6 py-20 font-body text-ink/60">Loading…</div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="font-body text-ink/70">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ImageWithFallback
        src={course.image}
        alt={course.title}
        className="h-56 w-full border-b-2 border-ink object-cover sm:h-72"
      />

      <section className="border-b-2 border-ink bg-ink text-bg">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <span className="rounded-full border border-bg/40 px-2.5 py-0.5 font-body text-xs text-bg/80">
            {course.category}
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">{course.title}</h1>
          {course.instructor?.name && (
            <p className="mt-3 font-body text-bg/70">Taught by {course.instructor.name}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_260px]">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">About this course</h2>
            <p className="mt-3 whitespace-pre-line font-body leading-relaxed text-ink/80">
              {course.description}
            </p>

            {isOwnerOrAdmin && (
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => navigate(`/courses/${id}/edit`)}
                  className="border-2 border-ink px-4 py-2 font-body text-sm font-medium text-ink hover:bg-ink hover:text-bg"
                >
                  Edit course
                </button>
                <button
                  onClick={handleDelete}
                  className="border-2 border-ink px-4 py-2 font-body text-sm font-medium text-ink hover:bg-red-700 hover:border-red-700 hover:text-bg"
                >
                  Delete course
                </button>
              </div>
            )}
          </div>

          <aside className="h-fit border-2 border-ink p-6">
            <p className="font-display text-3xl font-semibold text-teal">
              Rs {course.price?.toLocaleString('en-PK')}
            </p>

            {user?.role === 'student' && (
              <button
                onClick={handleEnroll}
                disabled={enrollStatus === 'loading' || enrollStatus === 'success'}
                className="mt-5 w-full border-2 border-ink bg-teal py-2.5 font-body font-medium text-bg transition-colors hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enrollStatus === 'success' ? 'Enrolled' : 'Enroll in this course'}
              </button>
            )}

            {!user && (
              <p className="mt-5 font-body text-sm text-ink/60">
                Log in as a student to enroll in this course.
              </p>
            )}

            {enrollMessage && (
              <p
                className={`mt-3 font-body text-sm ${
                  enrollStatus === 'error' ? 'text-red-700' : 'text-teal-dark'
                }`}
              >
                {enrollMessage}
              </p>
            )}
          </aside>
        </div>
      </section>
    </Layout>
  );
}
