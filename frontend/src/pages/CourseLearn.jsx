import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getCourseById } from '../services/courseService';
import { getLessons } from '../services/lessonService';
import { getMyCourses, completeLesson } from '../services/enrollmentService';
import { getYouTubeEmbedUrl } from '../utils/embed';

export default function CourseLearn() {
  const { id: courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    Promise.all([getCourseById(courseId), getLessons(courseId), getMyCourses()])
      .then(([c, l, my]) => {
        setCourse(c.data);
        setLessons(l.data);

        const match = my.data.find((enr) => enr.course._id === courseId);
        if (!match) {
          setError('not-enrolled');
          return;
        }
        setEnrollment(match);

        // land on the first lesson that isn't completed yet, if any
        const completedIds = new Set(match.completedLessons.map((id) => id.toString()));
        const firstIncomplete = l.data.findIndex((lsn) => !completedIds.has(lsn._id));
        setActiveIndex(firstIncomplete === -1 ? 0 : firstIncomplete);
      })
      .catch(() => setError('load-failed'))
      .finally(() => setLoading(false));
  }, [courseId]);

  const completedIds = new Set((enrollment?.completedLessons || []).map((id) => id.toString()));
  const activeLesson = lessons[activeIndex];
  const isActiveDone = activeLesson && completedIds.has(activeLesson._id);
  const embedUrl = activeLesson ? getYouTubeEmbedUrl(activeLesson.contentUrl) : null;

  const handleMarkComplete = async () => {
    if (!activeLesson) return;
    setMarking(true);
    try {
      const { data } = await completeLesson(courseId, activeLesson._id);
      setEnrollment(data);
      // auto-advance to the next lesson, if there is one
      if (activeIndex < lessons.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Could not mark this lesson complete.');
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-6 py-16 font-body text-ink/60">Loading…</div>
      </Layout>
    );
  }

  if (error === 'not-enrolled') {
    return (
      <Layout>
        <div className="mx-auto max-w-lg px-6 py-16 text-center">
          <p className="font-body text-ink/70">You need to enroll in this course first.</p>
          <Link
            to={`/courses/${courseId}`}
            className="mt-4 inline-block border-2 border-ink bg-teal px-5 py-2 font-body font-medium text-bg hover:bg-teal-dark"
          >
            Go to course page
          </Link>
        </div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="mx-auto max-w-lg px-6 py-16 font-body text-ink/70">
          Could not load this course.
        </div>
      </Layout>
    );
  }

  if (lessons.length === 0) {
    return (
      <Layout>
        <div className="mx-auto max-w-lg px-6 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">{course.title}</h1>
          <p className="mt-3 font-body text-ink/60">
            The instructor hasn't added any lessons to this course yet.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* progress bar */}
      <div className="border-b-2 border-ink bg-ink">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center justify-between font-body text-sm text-bg/80">
            <span>{course.title}</span>
            <span>{enrollment.progress}% complete</span>
          </div>
          <div className="mt-2 h-2 w-full border border-bg/30">
            <div
              className="h-full bg-saffron transition-all"
              style={{ width: `${enrollment.progress}%` }}
            />
          </div>
        </div>
      </div>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-[240px_1fr]">
        {/* lesson list sidebar */}
        <aside className="border-2 border-ink">
          {lessons.map((lesson, i) => {
            const done = completedIds.has(lesson._id);
            return (
              <button
                key={lesson._id}
                onClick={() => setActiveIndex(i)}
                className={`flex w-full items-center gap-3 border-b-2 border-ink/15 px-4 py-3 text-left last:border-b-0 ${
                  i === activeIndex ? 'bg-ink text-bg' : 'text-ink hover:bg-ink/5'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 text-xs ${
                    done
                      ? 'border-saffron bg-saffron text-ink'
                      : i === activeIndex
                        ? 'border-bg text-bg'
                        : 'border-ink text-ink'
                  }`}
                >
                  {done ? '✓' : i + 1}
                </span>
                <span className="font-body text-sm">{lesson.title}</span>
              </button>
            );
          })}
        </aside>

        {/* active lesson content */}
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{activeLesson.title}</h1>

          <div className="mt-5 border-2 border-ink">
            {embedUrl ? (
              <div className="aspect-video w-full">
                <iframe
                  src={embedUrl}
                  title={activeLesson.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex flex-col items-start gap-3 p-8">
                <p className="font-body text-ink/70">This lesson links to an external resource.</p>
                <a
                  href={activeLesson.contentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-ink bg-teal px-5 py-2 font-body font-medium text-bg hover:bg-teal-dark"
                >
                  Open lesson content
                </a>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleMarkComplete}
              disabled={marking || isActiveDone}
              className="border-2 border-ink bg-teal px-6 py-2.5 font-body font-medium text-bg hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isActiveDone
                ? 'Completed'
                : marking
                  ? 'Saving…'
                  : activeIndex < lessons.length - 1
                    ? 'Mark complete & continue'
                    : 'Mark complete'}
            </button>

            {isActiveDone && activeIndex < lessons.length - 1 && (
              <button
                onClick={() => setActiveIndex(activeIndex + 1)}
                className="font-body text-sm font-medium text-teal hover:underline"
              >
                Next lesson
              </button>
            )}
          </div>

          {enrollment.progress === 100 && (
            <p className="mt-6 border-2 border-ink bg-saffron/20 px-4 py-3 font-body text-sm text-ink">
              You've completed every lesson in this course.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
