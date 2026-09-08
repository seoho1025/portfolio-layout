import { MotionConfig, motion } from 'motion/react';
import Section from '../layout/Section';
import Reveal from '../ui/Reveal';
import { usePortfolio } from '../../context/PortfolioProvider';
import styles from './Career.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

// 회사/활동 이름 → 로고 설정 (public/images/careers/)
// DB 안 거치고 여기서 관리. 없는 건 "LOGO" 표시
//  fit  : 'cover' = 원 꽉 채움(가장자리 잘림) / 'contain' = 전체 보임(여백)
//  pos  : cover 일 때 어느 부분 보여줄지. '50% 30%' 처럼 (두 번째 값이 작을수록 위)
//  pad  : contain 일 때 원 안쪽 여백(px). 클수록 로고 작아짐
const LOGOS: Record<
  string,
  { src: string; fit: 'cover' | 'contain'; pos?: string; pad?: number }
> = {
  'MOVE AI CHALLENGE 2026': {
    src: '/images/careers/move-ai.png',
    fit: 'cover',
    pos: '50% 65%', // 사진을 좀 아래로
  },
  '한이음 ICT멘토링': {
    src: '/images/careers/han.png',
    fit: 'cover',
  },
  '현대오토에버 모빌리티 스쿨': {
    src: '/images/careers/autoever.png',
    fit: 'cover',
  },
  '제5회 링글 서비스 기획 & 마케팅 공모전': {
    src: '/images/careers/ringle.png',
    fit: 'cover',
  },
  'NH 농협은행 AI 아이디어 챌린지': {
    src: '/images/careers/nh-bank.png',
    fit: 'contain', // 글씨 잘려서 contain
    pad: 16,
  },
  'CJ 프레시웨이 공모전': {
    src: '/images/projects/cj-freshway/1.jpg',
    fit: 'contain', // 스크린샷이라 전체 보이게
    pad: 8,
  },
};

export default function Career() {
  const { careers } = usePortfolio();
  return (
    <Section id="career" title="Career">
      <MotionConfig reducedMotion="user">
        <div className={styles.list}>
          {careers.map((career) => {
            const logo = LOGOS[career.name];
            return (
            <Reveal key={career.name} className={styles.entry} y={40}>
              <div className={styles.logo}>
                {logo ? (
                  <img
                    src={logo.src}
                    alt={career.name}
                    style={{
                      objectFit: logo.fit,
                      objectPosition: logo.pos ?? 'center',
                      padding: logo.pad ?? 0,
                    }}
                  />
                ) : (
                  <span className={styles.logoPlaceholder}>LOGO</span>
                )}
              </div>

              <div className={styles.content}>
                <h3 className={styles.company}>{career.name}</h3>
                <p className={styles.companyPeriod}>{career.period}</p>

                {career.quote && (
                  <p className={styles.quote}>&ldquo;{career.quote}&rdquo;</p>
                )}

                {career.roles.length > 0 && (
                  <ul className={styles.roles}>
                    {career.roles.map((role) => (
                      <li key={role} className={styles.role}>
                        {role}
                      </li>
                    ))}
                  </ul>
                )}

                <ul className={styles.items}>
                  {career.items.map((item, i) => (
                    <motion.li
                      key={item.title}
                      className={styles.item}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                    >
                      <p className={styles.itemTitle}>{item.title}</p>
                      <p className={styles.itemPeriod}>{item.period}</p>
                      <p className={styles.itemDesc}>{item.description}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
            );
          })}
        </div>
      </MotionConfig>
    </Section>
  );
}
