function Card({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-black/30">
      <h3 className="mb-3 text-lg font-semibold text-neon">{title}</h3>
      {children}
    </div>
  );
}

export default Card;
