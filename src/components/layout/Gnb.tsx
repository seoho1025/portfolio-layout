import { useEffect, useState } from 'react';
import { NAV_SECTIONS, SECTION_IDS } from '../../config/section';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { scrollToSection } from '../../lib/scroll';
import ThemeSwitcher from './ThemeSwitcher';
import styles from './Gnb.module.css';

export default function Gnb() {
  // 메인 화면(첫 뷰포트)을 벗어났는지 -> 헤더 스타일 전환
  const [flat, setFlat] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setFlat(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.gnb} data-flat={flat}>
      <div className={styles.inner}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          {profile.name || 'PORTFOLIO'}
        </a>

        <nav className={styles.nav}>
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={styles.link}
              data-active={active === s.id}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(s.id);
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
