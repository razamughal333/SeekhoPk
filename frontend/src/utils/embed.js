// Returns an embeddable iframe URL if the link is a recognizable YouTube link,
// otherwise returns null so the caller can fall back to a plain link.
export function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        const id = parsed.searchParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (parsed.pathname.startsWith('/embed/')) {
        return url;
      }
    }
  } catch {
    return null;
  }

  return null;
}
