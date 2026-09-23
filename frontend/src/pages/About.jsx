import Layout from "../components/Layout";

const links = [
  { label: "GitHub", href: "https://github.com/razamughal333" },
  { label: "Portfolio", href: "https://razamughal333.github.io/Portfolio" },
  { label: "Instagram", href: "https://www.instagram.com/raza_mughal_333/" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/raza-ahmed333/" },
];

export default function About() {
  return (
    <Layout>
      <section className="border-b-2 border-ink bg-ink text-bg">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            About SeekhoPakistan
          </h1>
          <p className="mt-4 max-w-2xl font-body text-bg/70">
            A learning platform built to connect students and instructors across
            Pakistan — browse a course, enroll in minutes, and teach what you
            know.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="font-display text-2xl font-semibold text-ink">
          What this is
        </h2>
        <p className="mt-3 max-w-2xl font-body leading-relaxed text-ink/80">
          SeekhoPakistan is a MERN-stack learning management system: students
          can browse and enroll in courses, instructors can create and manage
          what they teach, and admins keep an eye on the platform as a whole.
          Three roles, one shared course catalog.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              title: "Students",
              body: "Browse courses, enroll in one click, and track progress from a dedicated dashboard.",
            },
            {
              title: "Instructors",
              body: "Create, edit, and manage the courses you teach, with full control over pricing and content.",
            },
            {
              title: "Admins",
              body: "View platform-wide analytics and manage every user on SeekhoPakistan.",
            },
          ].map((role) => (
            <div key={role.title} className="border-2 border-ink p-5">
              <h3 className="font-display text-lg font-semibold text-teal">
                {role.title}
              </h3>
              <p className="mt-2 font-body text-sm text-ink/70">{role.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t-2 border-ink bg-bg">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Built by
          </h2>
          <p className="mt-3 font-body text-ink/80">
            Raza Ahmed Mughal — self-taught frontend developer, currently
            building toward full MERN stack proficiency.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-ink px-4 py-2 font-body text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
