export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
        <p className="font-display text-lg font-semibold text-ink">
          Seekho<span className="text-teal">Pakistan</span>
        </p>
        <p className="font-body text-sm text-ink/60">
          Built for students and instructors across Pakistan.
        </p>
      </div>
    </footer>
  );
}
