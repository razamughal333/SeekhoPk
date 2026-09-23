import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import CourseRow from '../components/CourseRow';
import { getCourses } from '../services/courseService';

export default function CourseListing() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    getCourses()
      .then(({ data }) => setCourses(data))
      .catch(() => setError('Could not load courses right now. Try refreshing.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(courses.map((c) => c.category));
    return ['All', ...unique];
  }, [courses]);

  const filtered = courses.filter((c) => {
    const matchesCategory = category === 'All' || c.category === category;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <section className="border-b-2 border-ink bg-ink text-bg">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="font-display text-4xl font-semibold">All courses</h1>
          <p className="mt-2 font-body text-bg/70">
            {courses.length} course{courses.length !== 1 ? 's' : ''} available right now.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search by course title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-ink bg-bg px-4 py-2 font-body text-sm focus:outline-none"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`border-2 border-ink px-3 py-1.5 font-body text-sm font-medium transition-colors ${
                  category === cat ? 'bg-ink text-bg' : 'text-ink hover:bg-ink/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="font-body text-ink/60">Loading courses…</p>}
        {error && <p className="font-body text-ink/60">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="font-body text-ink/60">No courses match your search.</p>
        )}
        {!loading && filtered.length > 0 && (
          <div>
            {filtered.map((course) => (
              <CourseRow key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
