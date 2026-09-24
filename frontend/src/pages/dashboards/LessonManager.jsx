import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { getCourseById } from '../../services/courseService';
import { getLessons, createLesson, updateLesson, deleteLesson } from '../../services/lessonService';

export default function LessonManager() {
  const { id: courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ title: '', contentUrl: '' });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([getCourseById(courseId), getLessons(courseId)])
      .then(([c, l]) => {
        setCourse(c.data);
        setLessons(l.data);
      })
      .catch(() => setError('Could not load this course.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [courseId]);

  const resetForm = () => {
    setForm({ title: '', contentUrl: '' });
    setEditingId(null);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      if (editingId) {
        await updateLesson(editingId, form);
      } else {
        await createLesson(courseId, form);
      }
      resetForm();
      load();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not save this lesson.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (lesson) => {
    setEditingId(lesson._id);
    setForm({ title: lesson.title, contentUrl: lesson.contentUrl });
    setFormError('');
  };

  const handleDelete = async (lessonId) => {
    if (!window.confirm('Delete this lesson? This cannot be undone.')) return;
    try {
      await deleteLesson(lessonId);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete this lesson.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-6 py-16 font-body text-ink/60">Loading…</div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-6 py-16 font-body text-ink/70">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="border-b-2 border-ink bg-ink text-bg">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link to="/dashboard/instructor" className="font-body text-sm text-bg/60 hover:text-saffron">
            Back to your courses
          </Link>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Lessons — {course.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-10">
          {lessons.length === 0 && (
            <p className="font-body text-ink/60">No lessons yet — add the first one below.</p>
          )}
          {lessons.map((lesson, i) => (
            <div
              key={lesson._id}
              className="flex items-center justify-between gap-4 border-b-2 border-ink/15 py-4 last:border-b-0"
            >
              <div className="min-w-0">
                <p className="font-body font-medium text-ink">
                  <span className="text-ink/40">{String(i + 1).padStart(2, '0')}</span>{' '}
                  {lesson.title}
                </p>
                <p className="truncate font-body text-xs text-ink/50">{lesson.contentUrl}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => handleEdit(lesson)}
                  className="border-2 border-ink px-3 py-1.5 font-body text-sm font-medium text-ink hover:bg-ink hover:text-bg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="border-2 border-ink px-3 py-1.5 font-body text-sm font-medium text-ink hover:border-red-700 hover:bg-red-700 hover:text-bg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-2 border-ink p-6">
          <h2 className="font-display text-xl font-semibold text-ink">
            {editingId ? 'Edit lesson' : 'Add a new lesson'}
          </h2>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-sm font-medium text-ink">Lesson title</span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-body text-sm font-medium text-ink">
                Content URL <span className="font-normal text-ink/50">(video link or resource link)</span>
              </span>
              <input
                required
                type="url"
                value={form.contentUrl}
                onChange={(e) => setForm({ ...form, contentUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
                className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
              />
            </label>

            {formError && <p className="font-body text-sm text-red-700">{formError}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="border-2 border-ink bg-teal px-5 py-2.5 font-body font-medium text-bg hover:bg-teal-dark disabled:opacity-60"
              >
                {submitting ? 'Saving…' : editingId ? 'Save changes' : 'Add lesson'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border-2 border-ink px-5 py-2.5 font-body font-medium text-ink hover:bg-ink hover:text-bg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
