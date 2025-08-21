export function PlaceholderCard({ title, children }) {
  return (
    <div className="gaia-card p-6">
      <h4 className="gaia-heading text-xl font-semibold">{title}</h4>
      <div className="mt-3 text-sm text-gray-600">{children || 'Coming soon...'}</div>
    </div>
  );
}

export function Grid({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="news">{children}</div>;
}


