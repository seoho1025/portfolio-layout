import Section from '../layout/Section';
import Reveal from '../ui/Reveal';
import { profile } from '../../data/profile';
import styles from './About.module.css';

const INFO = [
  { label: '이름', value: profile.name || '홍길동' },
  { label: '생년월일', value: profile.birthdate || '2000.05.14' },
  { label: '거주지', value: profile.location || '서울시 성동구' },
  {
    label: '학력',
    value: profile.education || 'OO대학교 컴퓨터공학과 · 2027.02 졸업예정',
  },
];

const BIO =
  profile.about ||
  '사내 위키가 없어 같은 질문이 반복되던 인턴 팀에서, 온보딩 문서를 만들어 신규 인원의 첫 PR까지 걸리는 시간을 5일에서 2일로 줄였습니다. 코드를 쓰는 일만큼 왜 그렇게 썼는지 남기는 일을 중요하게 생각합니다. 현재는 React 렌더링 최적화와 디자인 시스템에 관심을 두고 있습니다.';

export default function About() {
  return (
    <Section id="about" title="About">
      <Reveal className={styles.layout} y={44} scale={0.97}>
        <div className={styles.photo}>
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name || '프로필'} />
          ) : (
            <span className={styles.photoPlaceholder}>
              프로필 이미지
              <br />
              1:1
            </span>
          )}
        </div>

        <div className={styles.window}>
          <div className={styles.titleBar}>
            <div className={styles.lights} aria-hidden="true">
              <div className={styles.light} />
              <div className={styles.light} />
              <div className={styles.light} />
            </div>
            <span className={styles.windowTitle}>About</span>
          </div>

          <div className={styles.windowBody}>
            <div className={styles.grid}>
              {INFO.map((item) => (
                <div key={item.label} className={styles.cell}>
                  <span className={styles.label}>{item.label}</span>
                  <span className={styles.value}>{item.value}</span>
                </div>
              ))}
            </div>

            <p className={styles.bio}>{BIO}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
