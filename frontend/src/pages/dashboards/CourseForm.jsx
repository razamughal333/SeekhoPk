import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import ImageWithFallback from '../../components/ImageWithFallback';
import { getCourseById, createCourse, updateCourse } from '../../services/courseService';

export default function CourseForm() {
  const { id } = useParams(); // present only when editing
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;
    getCourseById(id)
      .then(({ data }) =>
        setForm({
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
          image: data.image || '',
        })
      )
      .catch(() => setError('Could not load this course.'))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payload = { ...form, price: Number(form.price) };
      if (isEditing) {
        await updateCourse(id, payload);
        navigate(`/courses/${id}`);
      } else {
        const { data } = await createCourse(payload);
        navigate(`/courses/${data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save this course.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-6 py-16 font-body text-ink/60">Loading…</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-6 py-14">
        <h1 className="font-display text-3xl font-semibold text-ink">
          {isEditing ? 'Edit course' : 'Create a new course'}
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-sm font-medium text-ink">Title</span>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-body text-sm font-medium text-ink">Description</span>
            <textarea
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-sm font-medium text-ink">Category</span>
              <input
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Web Development"
                className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-body text-sm font-medium text-ink">Price (Rs)</span>
              <input
                name="price"
                type="number"
                min="0"
                required
                value={form.price}
                onChange={handleChange}
                className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="font-body text-sm font-medium text-ink">
              Cover image URL <span className="font-normal text-ink/50">(optional)</span>
            </span>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="border-2 border-ink bg-bg px-4 py-2.5 font-body focus:outline-none"
            />
          </label>

          {form.image && (
            <ImageWithFallback
              src={form.image}
              alt="Cover preview"
              className="h-40 w-full border-2 border-ink object-cover"
            />
          )}

          {error && <p className="font-body text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 border-2 border-ink bg-teal py-2.5 font-body font-medium text-bg transition-colors hover:bg-teal-dark disabled:opacity-60"
          >
            {submitting ? 'Saving…' : isEditing ? 'Save changes' : 'Create course'}
          </button>
        </form>
      </section>
    </Layout>
  );
}
