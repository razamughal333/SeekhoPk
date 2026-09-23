import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-start justify-center px-6">
        <p className="font-display text-6xl font-semibold text-ink">404</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink">Page not found</h1>
        <p className="mt-2 font-body text-ink/60">
          This page doesn't exist. It may have moved or the link is wrong.
        </p>
        <Link
          to="/"
          className="mt-6 border-2 border-ink bg-teal px-5 py-2.5 font-body font-medium text-bg hover:bg-teal-dark"
        >
          Back to home
        </Link>
      </section>
    </Layout>
  );
}
