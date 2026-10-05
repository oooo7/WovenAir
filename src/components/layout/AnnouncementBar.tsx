export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-[#1F1E1A] text-[#F6F1E8] text-[11px] tracking-[0.2em] uppercase py-2 px-4 text-center border-b border-[#2C2B26] transition-colors">
      <div className="max-w-[1320px] mx-auto flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9B5E49]" />
        <span>Complimentary shipping across India · International delivery available</span>
      </div>
    </aside>
  );
}
