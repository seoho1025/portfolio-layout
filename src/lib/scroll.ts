/** 헤더 offset(scroll-padding-top)을 존중하며 해당 섹션으로 부드럽게 스크롤. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}
