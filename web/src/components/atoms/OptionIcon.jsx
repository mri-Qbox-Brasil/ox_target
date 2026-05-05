export default function OptionIcon({ icon, color }) {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 border transition-transform duration-200 group-hover:scale-110"
      style={{ background: `${color}12`, borderColor: `${color}22` }}
    >
      {icon ? (
        <i className={`${icon.includes('fa-') ? icon : 'fas fa-' + icon} text-base`} style={{ color }} />
      ) : (
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      )}
    </div>
  );
}
