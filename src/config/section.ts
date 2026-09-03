// 섹션 순서 · id · 라벨을 한 곳에서 관리.
// GNB(네비 링크), useActiveSection(스크롤 스파이)이 공유한다.

export const SECTIONS = [
  { id: 'hero', label: 'Home', nav: false },
  { id: 'overview', label: 'Overview', nav: false },
  { id: 'about', label: 'About', nav: true },
  { id: 'skills', label: 'Skills', nav: true },
  { id: 'projects', label: 'Projects', nav: true },
  { id: 'career', label: 'Career', nav: true },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

// GNB에 노출할 항목
export const NAV_SECTIONS = SECTIONS.filter((s) => s.nav);

// 스크롤 스파이 감시 대상 (전체)
export const SECTION_IDS = SECTIONS.map((s) => s.id);
