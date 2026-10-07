import { Zap } from 'lucide-react';

function SaleAnnouncement() {
  return (
    <aside
      aria-label="Current promotion"
      className="bg-dark-bg px-4 py-2 text-white dark:bg-dark-surface"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2.5 text-center text-xs sm:gap-3 sm:text-sm">
        <span className="shrink-0 rounded bg-accent px-2 py-1 text-[10px] font-bold tracking-wide text-dark-bg sm:text-xs">
          HOT DROP
        </span>
        <Zap aria-hidden="true" size={15} className="shrink-0 fill-accent text-accent" />
        <p>
          <span className="font-semibold">FLASH SALE:</span>{' '}
          Use code <strong>BIG20</strong> for 20% off orders above ₹8,300
        </p>
      </div>
    </aside>
  );
}

export default SaleAnnouncement;
