export default function OptionLabel({ label }) {
  return (
    <div className="flex-1 overflow-hidden">
      <span className="block text-white/90 text-sm font-bold tracking-widest uppercase truncate group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
  );
}
