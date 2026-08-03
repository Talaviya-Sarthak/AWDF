/**
 * Shared Tailwind utility class strings.
 *
 * All material styling (paper, leather, metal, raised controls, badges,
 * inset inputs) is expressed with Tailwind utilities — complex effects use
 * arbitrary values — so the app no longer needs bespoke component CSS.
 * Keeping the strings here avoids duplication across components.
 */

/** Joins truthy class names. */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

/* ------------------------------------------------------------------ */
/* Paper surfaces                                                      */
/* ------------------------------------------------------------------ */

export const paperCard = [
  'relative',
  'border',
  'border-[#e3dccd]',
  'rounded-2xl',
  'bg-[linear-gradient(180deg,#fffefb_0%,#faf7ef_55%,#f4efe4_100%)]',
  'shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_-1px_0_rgba(80,65,40,0.08)_inset,0_1px_2px_rgba(58,48,34,0.08),0_12px_24px_-12px_rgba(58,48,34,0.3)]',
].join(' ');

/** Glossy highlight sweep across the top of a surface (pseudo-element). */
export const gloss = [
  'after:pointer-events-none',
  'after:absolute',
  'after:inset-x-0',
  'after:top-0',
  'after:h-[46%]',
  'after:rounded-[inherit]',
  'after:bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0))]',
  "after:content-['']",
].join(' ');

/** Hover lift for cards — keeps the beveled edge while deepening the shadow. */
export const paperCardLift = [
  'transition-[transform,box-shadow]',
  'hover:-translate-y-[3px]',
  'hover:shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_-1px_0_rgba(80,65,40,0.08)_inset,0_1px_2px_rgba(58,48,34,0.08),0_18px_34px_-14px_rgba(58,48,34,0.4)]',
].join(' ');

/* ------------------------------------------------------------------ */
/* Leather sidebar                                                     */
/* ------------------------------------------------------------------ */

export const leatherSidebar = [
  'bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.06),transparent_45%),repeating-linear-gradient(0deg,rgba(0,0,0,0.1)_0_1px,transparent_1px_3px),linear-gradient(180deg,#443d39_0%,#332d2a_35%,#251f1c_72%,#1b1614_100%)]',
  'shadow-[inset_-3px_0_8px_rgba(0,0,0,0.45),2px_0_12px_rgba(0,0,0,0.15)]',
].join(' ');

export const leatherPatch = [
  'rounded-[14px]',
  'border',
  'border-white/10',
  'bg-[linear-gradient(180deg,#4b4440_0%,#322c28_100%)]',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-4px_8px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.4)]',
].join(' ');

export const logoBadge = [
  'flex',
  'h-[38px]',
  'w-[38px]',
  'items-center',
  'justify-center',
  'rounded-[11px]',
  'text-lg',
  'text-white',
  'border',
  'border-white/35',
  'bg-[linear-gradient(180deg,#5f97f5_0%,#2457c9_100%)]',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(0,0,0,0.3),0_2px_5px_rgba(0,0,0,0.35)]',
].join(' ');

export const navItem = [
  'relative',
  'flex',
  'items-center',
  'gap-3',
  'px-3.5',
  'py-2.5',
  'rounded-xl',
  'text-sm',
  'font-semibold',
  'border',
  'border-transparent',
  'text-[rgba(246,242,234,0.62)]',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
  'transition-colors',
  'hover:bg-white/5',
  'hover:text-[rgba(246,242,234,0.92)]',
].join(' ');

export const navItemActive = [
  'text-white',
  'border-[rgba(96,165,250,0.35)]',
  'bg-[linear-gradient(180deg,rgba(59,130,246,0.35),rgba(37,99,235,0.55))]',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_6px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.06)]',
].join(' ');

/* ------------------------------------------------------------------ */
/* Metal top navigation                                                */
/* ------------------------------------------------------------------ */

export const metalBar = [
  'border-b',
  'border-[#7e838d]',
  'bg-[linear-gradient(180deg,#e2e5ea_0%,#c3c8d0_22%,#a9aeb8_50%,#979ca6_52%,#b6bac3_78%,#c8ccd3_100%)]',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_2px_8px_rgba(30,32,38,0.18)]',
].join(' ');

export const metalText = 'text-shadow-[0_1px_0_rgba(255,255,255,0.75)]';

export const avatar = [
  'flex',
  'h-9',
  'w-9',
  'items-center',
  'justify-center',
  'rounded-full',
  'text-[13px]',
  'font-bold',
  'text-white',
  'border',
  'border-black/35',
  'bg-[radial-gradient(circle_at_35%_30%,#6a7180,#3d424c_60%,#2b2f37)]',
  'shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.3)]',
].join(' ');

/* ------------------------------------------------------------------ */
/* Raised buttons                                                      */
/* ------------------------------------------------------------------ */

export const btnBase = [
  'relative',
  'inline-flex',
  'items-center',
  'justify-center',
  'gap-2',
  'font-bold',
  'rounded-xl',
  'select-none',
  'cursor-pointer',
  'transition-all',
  'duration-150',
  'focus:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-accent-500/60',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-background',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
].join(' ');

export const btnPrimary = [
  'text-white',
  'border',
  'border-[#1e4fae]',
  'bg-[linear-gradient(180deg,#4f8ff7_0%,#2f6ff0_48%,#245edb_100%)]',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.18),0_3px_0_#1a448f,0_7px_14px_rgba(29,78,216,0.35)]',
  'hover:brightness-105',
  'active:translate-y-0.5',
  'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25),0_1px_0_#1a448f]',
].join(' ');

export const btnSecondary = [
  'text-[#3c4048]',
  'border',
  'border-[#cfc8ba]',
  'bg-[linear-gradient(180deg,#fdfcfa_0%,#efece4_55%,#e4dfd4_100%)]',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_3px_0_#b9b1a1,0_6px_10px_rgba(58,48,34,0.18)]',
  'active:translate-y-0.5',
  'active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.12),0_1px_0_#b9b1a1]',
].join(' ');

export const btnDanger = [
  'text-white',
  'border',
  'border-[#a12a25]',
  'bg-[linear-gradient(180deg,#ee6a62_0%,#dd4b43_50%,#c63a33_100%)]',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.18),0_3px_0_#8f241f,0_7px_14px_rgba(207,58,51,0.32)]',
  'hover:brightness-105',
  'active:translate-y-0.5',
  'active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25),0_1px_0_#8f241f]',
].join(' ');

export const btnGhost = [
  'text-graphite-500',
  'hover:bg-white/55',
  'hover:text-graphite-700',
  'hover:shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
].join(' ');

export const btnIcon = [
  'flex',
  'h-[34px]',
  'w-[34px]',
  'items-center',
  'justify-center',
  'rounded-[10px]',
  'text-[15px]',
  'text-graphite-500',
  'border',
  'border-[#d8d1c3]',
  'bg-[linear-gradient(180deg,#fbfaf6_0%,#eceae1_100%)]',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(58,48,34,0.15)]',
  'transition',
  'hover:text-graphite-700',
  'hover:-translate-y-px',
  'active:translate-y-px',
  'active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.15)]',
].join(' ');

export const btnIconDanger = ['hover:text-status-red', 'hover:border-[#e4b6b2]'].join(' ');

/* ------------------------------------------------------------------ */
/* Inset inputs                                                        */
/* ------------------------------------------------------------------ */

export const inputInset = [
  'rounded-xl',
  'border',
  'border-[#cfc8ba]',
  'text-graphite-800',
  'bg-[linear-gradient(180deg,#e6e1d5_0%,#f3efe6_45%,#efe9dc_100%)]',
  'shadow-[inset_0_2px_4px_rgba(70,60,40,0.22),inset_0_-1px_0_rgba(255,255,255,0.75),0_1px_0_rgba(255,255,255,0.9)]',
  'transition',
  'placeholder:text-[#a89f8e]',
  'focus:border-accent-500',
  'focus:outline-none',
  'focus:shadow-[inset_0_2px_4px_rgba(70,60,40,0.18),0_0_0_3px_rgba(59,130,246,0.22),inset_0_-1px_0_rgba(255,255,255,0.75)]',
].join(' ');

/* ------------------------------------------------------------------ */
/* Badges & status dots                                                */
/* ------------------------------------------------------------------ */

export const badge = [
  'inline-flex',
  'items-center',
  'gap-1.5',
  'rounded-full',
  'px-2.5',
  'py-0.5',
  'text-[11px]',
  'font-bold',
  'uppercase',
  'tracking-wider',
  'border',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.18)]',
].join(' ');

export const badgeGreen = [
  'bg-[linear-gradient(180deg,#57a84e_0%,#38853a_100%)]',
  'text-white',
  'border-[#2f6a30]',
  'text-shadow-[0_-1px_0_rgba(0,0,0,0.25)]',
].join(' ');

export const badgeYellow = [
  'bg-[linear-gradient(180deg,#f2c94c_0%,#d9a520_100%)]',
  'text-[#4a3300]',
  'border-[#b3861a]',
  'text-shadow-[0_1px_0_rgba(255,255,255,0.35)]',
].join(' ');

export const badgeRed = [
  'bg-[linear-gradient(180deg,#e05a51_0%,#c23a33_100%)]',
  'text-white',
  'border-[#9e2d27]',
  'text-shadow-[0_-1px_0_rgba(0,0,0,0.25)]',
].join(' ');

export const badgeBlue = [
  'bg-[linear-gradient(180deg,#4f8ff7_0%,#2f6fe8_100%)]',
  'text-white',
  'border-[#1f52b0]',
  'text-shadow-[0_-1px_0_rgba(0,0,0,0.25)]',
].join(' ');

export const badgeGray = [
  'bg-[linear-gradient(180deg,#b8bcc4_0%,#9298a2_100%)]',
  'text-white',
  'border-[#7c818b]',
  'text-shadow-[0_-1px_0_rgba(0,0,0,0.25)]',
].join(' ');

export const statusDot = [
  'block',
  'h-2.5',
  'w-2.5',
  'rounded-full',
  'shadow-[inset_0_-2px_3px_rgba(0,0,0,0.25),0_0_0_2px_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.2)]',
].join(' ');

/* ------------------------------------------------------------------ */
/* Icon tiles (embossed stat icons)                                    */
/* ------------------------------------------------------------------ */

export const iconTile = [
  'flex',
  'h-[46px]',
  'w-[46px]',
  'shrink-0',
  'items-center',
  'justify-center',
  'rounded-[13px]',
  'text-xl',
  'text-white',
  'border',
  'border-black/25',
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.22),0_4px_8px_rgba(0,0,0,0.2)]',
].join(' ');

export const iconTileBlue = 'bg-[linear-gradient(180deg,#5f97f5_0%,#2c67dd_100%)]';
export const iconTileGreen = 'bg-[linear-gradient(180deg,#5cb356_0%,#36843a_100%)]';
export const iconTileYellow = 'bg-[linear-gradient(180deg,#eec63f_0%,#c99716_100%)]';
export const iconTileRed = 'bg-[linear-gradient(180deg,#e5645c_0%,#bd332c_100%)]';
export const iconTileGray = 'bg-[linear-gradient(180deg,#c0c4cc_0%,#8b919c_100%)]';

/* ------------------------------------------------------------------ */
/* Embossed text / icons                                               */
/* ------------------------------------------------------------------ */

export const emboss =
  'text-shadow-[0_-1px_0_rgba(255,255,255,0.7),0_1px_1px_rgba(0,0,0,0.18)]';

export const iconEmboss =
  'drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] drop-shadow-[0_-1px_1px_rgba(0,0,0,0.2)]';

/* ------------------------------------------------------------------ */
/* Floating modal                                                      */
/* ------------------------------------------------------------------ */

export const modalBackdrop = 'animate-fade-in';

export const modalShell = [
  'rounded-[20px]',
  'border',
  'border-[#ddd4c2]',
  'bg-[linear-gradient(180deg,#fffefb_0%,#f8f4eb_100%)]',
  'shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_40px_70px_-24px_rgba(15,12,6,0.55),0_14px_28px_rgba(15,12,6,0.28),0_2px_6px_rgba(0,0,0,0.18)]',
  'animate-modal-pop',
].join(' ');

/* ------------------------------------------------------------------ */
/* Notebook-inspired card details                                      */
/* ------------------------------------------------------------------ */

export const notebookAccent = [
  'absolute',
  'left-0',
  'top-4',
  'bottom-4',
  'w-[5px]',
  'rounded-r-[4px]',
  'shadow-[0_1px_2px_rgba(0,0,0,0.18)]',
].join(' ');

export const accentHigh = 'bg-[linear-gradient(180deg,#e05a51_0%,#b93a33_100%)]';
export const accentMedium = 'bg-[linear-gradient(180deg,#f2c94c_0%,#cf9a1a_100%)]';
export const accentLow = 'bg-[linear-gradient(180deg,#5cb356_0%,#3a843a_100%)]';
