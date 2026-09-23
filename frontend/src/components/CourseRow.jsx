import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

export default function CourseRow({ course }) {
  return (
    <Link
      to={`/courses/${course._id}`}
      className="group flex flex-col gap-4 border-b-2 border-ink/15 py-6 transition-colors last:border-b-0 hover:border-ink sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <ImageWithFallback
          src={course.image}
          alt={course.title}
          className="h-16 w-16 shrink-0 border-2 border-ink object-cover"
        />
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-medium text-ink group-hover:text-teal">
              {course.title}
            </h3>
            <span className="rounded-full border border-ink/30 px-2.5 py-0.5 font-body text-xs text-ink/70">
              {course.category}
            </span>
          </div>
          <p className="line-clamp-1 font-body text-sm text-ink/60">{course.description}</p>
          {course.instructor?.name && (
            <p className="mt-1 font-body text-xs text-ink/50">By {course.instructor.name}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="font-display text-lg font-semibold text-teal">
          Rs {course.price?.toLocaleString('en-PK')}
        </span>
        <span className="hidden font-body text-sm text-ink/50 group-hover:text-ink sm:inline">
          View course
        </span>
      </div>
    </Link>
  );
}
