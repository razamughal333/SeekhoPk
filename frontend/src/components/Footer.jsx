import { Link } from "react-router-dom";

const siteLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "About", to: "/about" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/razamughal333" },
  { label: "Portfolio", href: "https://razamughal333.github.io/Portfolio" },
  { label: "Instagram", href: "https://instagram.com/raza_mughal_333" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/raza-ahmed333/" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-ink text-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold">
            Seekho<span className="text-saffron">Pakistan</span>
          </p>
          <p className="mt-3 max-w-xs font-body text-sm text-bg/60">
            A learning platform connecting students and instructors across
            Pakistan.
          </p>
        </div>

        <div>
          <p className="font-body text-xs font-medium uppercase tracking-wide text-bg/50">
            Site
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {siteLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="font-body text-sm text-bg/80 transition-colors hover:text-saffron"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body text-xs font-medium uppercase tracking-wide text-bg/50">
            Connect
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-sm text-bg/80 transition-colors hover:text-saffron"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-bg/15">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <p className="font-body text-xs text-bg/50">
            Created by Raza Ahmed Mughal
          </p>
        </div>
      </div>
    </footer>
  );
}
