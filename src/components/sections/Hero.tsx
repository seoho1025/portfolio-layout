import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { setTheme, applyTheme } from '../../lib/settings';
import { THEMES } from '../../config/theme';
import { usePortfolio } from '../../context/PortfolioProvider';
import styles from './Hero.module.css';

export default function Hero() {
  const { profile } = usePortfolio();

  // 로그인 상태면 색상 선택 원을 보여줌
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setIsAdmin(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAdmin(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // 드롭다운 열림 여부 + 현재 선택된 테마
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(localStorage.getItem('theme') || '');

  // hero 를 벗어나면 색상 선택 원 숨김
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function pick(key: string) {
    setTheme(key); // DB 저장
    applyTheme(key); // 즉시 적용
    setCurrent(key);
    setOpen(false);
  }

  const currentColor =
    THEMES.find((t) => t.key === current)?.color ?? 'var(--theme-default)';

  return (
    <section id="hero" className={styles.hero}>
      <h1 className={styles.title}>{profile.name || 'PORTFOLIO'}</h1>

      {isAdmin && !pastHero && (
        <div className={styles.picker}>
          {open && (
            <div className={styles.menu}>
              {THEMES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={styles.item}
                  onClick={() => pick(t.key)}
                >
                  <span className={styles.dot} style={{ background: t.color }} />
                  {t.label}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            className={styles.trigger}
            style={{ background: currentColor }}
            onClick={() => setOpen(!open)}
            aria-label="테마 색상 선택"
          />
        </div>
      )}
    </section>
  );
}
