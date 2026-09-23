import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CourseRow from "../components/CourseRow";
import ImageWithFallback from "../components/ImageWithFallback";
import { getCourses } from "../services/courseService";

const routes = [
  "Web Development",
  "Data Science",
  "Graphic Design",
  "Digital Marketing",
  "Spoken English",
  "Mobile Apps",
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCourses()
      .then(({ data }) => setCourses(data.slice(0, 4)))
      .catch(() => setError("Could not load courses right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:py-24">
          <div>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
              Learn a skill.
              <br />
              Teach what you know.
            </h1>
            <p className="mt-6 max-w-md font-body text-lg text-ink/70">
              SeekhoPakistan connects students with instructors across the
              country — browse a course, enroll in minutes, and track your
              progress from one dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="border-2 border-ink bg-teal px-6 py-3 font-body font-medium text-bg transition-colors hover:bg-teal-dark"
              >
                Browse courses
              </Link>
              <Link
                to="/register"
                className="border-2 border-ink px-6 py-3 font-body font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
              >
                Create an account
              </Link>
            </div>
          </div>

          {/* Route-board style list of categories */}
          <div className="border-2 border-ink bg-ink text-bg">
            <div className="border-b-2 border-bg/20 px-5 py-3 font-body text-xs font-medium text-saffron">
              Popular on SeekhoPakistan
            </div>
            <ul>
              {routes.map((route, i) => (
                <li
                  key={route}
                  className={`flex items-center justify-between px-5 py-3.5 font-display text-lg ${
                    i !== routes.length - 1 ? "border-b-2 border-bg/20" : ""
                  }`}
                >
                  <span>{route}</span>
                  <span className="font-body text-xs text-bg/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Banner image — drop a photo at public/images/hero-banner.jpg to fill this */}
      <ImageWithFallback
        src="/images/hero-banner.jpg"
        alt="Students learning on SeekhoPakistan"
        className="h-72 w-full border-b-2 border-ink object-cover sm:h-96"
      />

      {/* Featured courses */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold text-ink">
            Recently added courses
          </h2>
          <Link
            to="/courses"
            className="font-body text-sm font-medium text-teal hover:underline"
          >
            See all courses
          </Link>
        </div>

        {loading && <p className="font-body text-ink/60">Loading courses…</p>}
        {error && <p className="font-body text-ink/60">{error}</p>}
        {!loading && !error && courses.length === 0 && (
          <p className="font-body text-ink/60">
            No courses yet — check back soon, or log in as an instructor to add
            one.
          </p>
        )}
        {!loading && courses.length > 0 && (
          <div>
            {courses.map((course) => (
              <CourseRow key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* How it works — genuinely a 3-step sequence, so numbering is earned here */}
      <section className="border-t-2 border-ink bg-ink text-bg">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Find a course",
              body: "Search by category or browse everything on offer, from web development to spoken English.",
            },
            {
              step: "02",
              title: "Enroll",
              body: "Create a free account and enroll in one click — no payment gateway required for this build.",
            },
            {
              step: "03",
              title: "Track your progress",
              body: "Your student dashboard keeps every enrolled course and its progress in one place.",
            },
          ].map((item) => (
            <div key={item.step}>
              <p className="font-display text-2xl text-saffron">{item.step}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 font-body text-sm text-bg/70">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
