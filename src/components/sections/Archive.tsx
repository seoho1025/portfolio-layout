import Section from '../layout/Section';
import Reveal from '../ui/Reveal';
import { useGithubActivity } from '../../hooks/useGithubActivity';
import styles from './Archive.module.css';

// 내 깃허브 아이디
const GITHUB_USER = 'seoho1025';
// 잔디를 보여줄 연도
const YEAR = new Date().getFullYear();

export default function Archive() {
  const { days, total, commits } = useGithubActivity(GITHUB_USER, YEAR);

  return (
    <Section id="archive" title="Archive">
      <Reveal className={styles.wrap} y={40}>
        {/* 잔디 카드 */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>{YEAR}년 커밋</span>
            <span className={styles.total}>{total}회</span>
          </div>

          {/* 날짜 하나당 칸 하나. 호버하면 CSS 로 날짜 툴팁 뜸 */}
          <div className={styles.gridScroll}>
            <div className={styles.grid}>
              {days.map((day) => (
                <span
                  key={day.date}
                  className={styles.cell}
                  data-level={day.level}
                  data-tip={`${day.date} · ${day.count}회`}
                />
              ))}
            </div>
          </div>

          {/* 색 범례 */}
          <div className={styles.legend}>
            <span>less</span>
            <span className={styles.cell} data-level={0} />
            <span className={styles.cell} data-level={1} />
            <span className={styles.cell} data-level={2} />
            <span className={styles.cell} data-level={3} />
            <span className={styles.cell} data-level={4} />
            <span>more</span>
          </div>
        </div>

        {/* 최근 커밋 카드 (커밋이 있을 때만 보여줌) */}
        {commits.length > 0 && (
          <div className={styles.card}>
            <span className={styles.cardTitle}>최근 커밋</span>
            <ul className={styles.commits}>
              {commits.map((commit, i) => (
                <li key={i}>
                  <a href={commit.url} target="_blank" rel="noreferrer">
                    <span className={styles.commitMsg}>{commit.message}</span>
                    <span className={styles.commitMeta}>
                      {commit.repo.replace(GITHUB_USER + '/', '')} ·{' '}
                      {commit.date.slice(5, 10)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Reveal>
    </Section>
  );
}
