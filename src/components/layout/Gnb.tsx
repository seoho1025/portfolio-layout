import { useEffect, useState } from 'react';
import { NAV_SECTIONS, SECTION_IDS } from '../../config/section';
import { usePortfolio } from '../../context/PortfolioProvider';
import { useActiveSection } from '../../hooks/useActiveSection';
import { scrollToSection } from '../../lib/scroll';
import styles from './Gnb.module.css';

type GnbProps = {
  onAdminClick: () => void;
};

export default function Gnb({ onAdminClick }: GnbProps) {
  const { profile } = usePortfolio();

  // flat: 첫 화면(히어로)을 벗어났는지 여부
  //  - 벗어나면 헤더의 그림자·구분선 제거 (data-flat으로 스타일 전환)
  //  - 값이 바뀌면 헤더를 다시 그림
  const [flat, setFlat] = useState(false);

  // active: 현재 화면에 보이는 섹션 id
  //  - 스크롤에 따라 GNB 항목 하이라이트(메인 색)를 옮기는 데 사용
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    // 스크롤이 첫 뷰포트 85%를 넘으면 flat = true
    const onScroll = () => setFlat(window.scrollY > window.innerHeight * 0.85);
    onScroll(); // 최초 렌더 시 현재 위치 반영

    // 스크롤할 때마다 갱신 (passive: 스크롤 성능 저하 방지)
    window.addEventListener('scroll', onScroll, { passive: true });

    // 컴포넌트가 사라질 때 리스너 정리 (메모리 누수 방지)
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.gnb} data-flat={flat}>
      <div className={styles.inner}>
        {/* 로고: 클릭 시 최상단(hero)으로 이동, 이름 없으면 'PORTFOLIO' */}
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault(); // 기본 앵커 점프 막고 부드러운 스크롤로 대체
            scrollToSection('hero');
          }}
        >
          {profile.name || 'PORTFOLIO'}
        </a>

        {/* 네비: About·Skills 등 항목 클릭 시 해당 섹션으로 이동 */}
        <nav className={styles.nav}>
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={styles.link}
              data-active={active === s.id} // 현재 보고 있는 섹션이면 활성 스타일
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(s.id); // 부드럽게 이동
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* 우측 액션 영역: 관리자 로그인 */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.login}
            onClick={onAdminClick}
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
