import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { topCitiesByInventory } from '../lib/cityInventory';

/**
 * Desktop "Communities" mega-menu nav item.
 *
 * Behaviour:
 *   - Opens on hover (mouse) and on click/Enter/Space/ArrowDown (keyboard).
 *   - Closes on Escape, on focus leaving the panel, and on outside click.
 *   - First link inside is focused when opened via keyboard so tab order is
 *     predictable for screen-reader users.
 *
 * Visuals follow the existing header — same teal accent, same typeface
 * weights, same hover treatment as the other top-level nav items.
 */
const CommunitiesNavDropdown = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Top cities by inventory — derived from data so the surface never lies
  // about which cities have communities. 9 keeps a tight three-column grid.
  const cities = topCitiesByInventory(9);

  // Close on outside click + Escape; refocus trigger so keyboard users
  // don't lose their place.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // When opened by keyboard, move focus into the panel so the next Tab
  // lands inside the menu rather than on the next header item.
  const openAndFocusFirst = () => {
    setOpen(true);
    requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>('a, button');
      first?.focus();
    });
  };

  const onTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAndFocusFirst();
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        onKeyDown={onTriggerKey}
        className="inline-flex items-center text-senior-slate hover:text-senior-blue font-medium transition-colors"
      >
        Communities
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`ml-1 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="menu"
          aria-label="Communities"
          className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[min(48rem,90vw)] z-50"
        >
        <div className="bg-white border border-neutral-200 rounded-xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* By City */}
            <div>
              <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase mb-3">
                By city
              </p>
              <ul className="space-y-1.5">
                {cities.map(c => (
                  <li key={c.slug}>
                    <Link
                      to={`/assisted-living/${c.slug}`}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between text-sm text-senior-slate hover:text-senior-blue transition-colors"
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="text-xs text-neutral-500 group-hover:text-senior-blue">
                        {c.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* By Care Type */}
            <div>
              <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase mb-3">
                By care type
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    to="/assisted-living/sacramento"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-senior-slate hover:text-senior-blue transition-colors"
                  >
                    Assisted Living
                  </Link>
                </li>
                <li>
                  <Link
                    to="/memory-care"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-senior-slate hover:text-senior-blue transition-colors"
                  >
                    Memory Care
                  </Link>
                </li>
                <li>
                  <Link
                    to="/board-and-care-homes/sacramento"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-senior-slate hover:text-senior-blue transition-colors"
                  >
                    Board &amp; Care Homes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/senior-living/sacramento"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-senior-slate hover:text-senior-blue transition-colors"
                  >
                    Senior Living
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hub link */}
            <div className="flex flex-col">
              <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase mb-3">
                Explore all
              </p>
              <Link
                to="/communities"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="group bg-sage-50 border border-teal-100 rounded-lg p-4 hover:border-teal-300 hover:shadow-sm transition-all"
              >
                <p className="font-serif text-base font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
                  Browse all communities
                </p>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Every Sacramento-metro city we cover, grouped by county.
                </p>
                <span className="mt-3 inline-flex items-center text-xs font-medium text-teal-700">
                  See all cities
                  <ArrowRight
                    size={12}
                    className="ml-1 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <Link
                to="/locations"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="mt-3 text-xs text-senior-slate hover:text-senior-blue underline-offset-2 hover:underline"
              >
                Full directory (all {/* count is rendered as-is */}
                communities) →
              </Link>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default CommunitiesNavDropdown;
