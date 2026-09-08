import type { IconType } from 'react-icons';
import { MotionConfig, motion } from 'motion/react';
import { FaAws, FaJava, FaSlack } from 'react-icons/fa6';
import {
  SiCss,
  SiDiscord,
  SiDocker,
  SiExpo,
  SiFastapi,
  SiFigma,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiMysql,
  SiNextdotjs,
  SiNotion,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import Section from '../layout/Section';
import { usePortfolio } from '../../context/PortfolioProvider';
import styles from './Skills.module.css';

type IconSpec = { Icon: IconType; color: string };

// key = DB skills.items 의 name 과 정확히 일치해야 함
const ICONS: Record<string, IconSpec | IconSpec[]> = {
  // frontend
  React: { Icon: SiReact, color: '#149eca' },
  'Next.js': { Icon: SiNextdotjs, color: '#1c1c2e' },
  'ReactNative(expo)': { Icon: SiExpo, color: '#1c1c2e' },
  HTML: { Icon: SiHtml5, color: '#e34f26' },
  TailWind: { Icon: SiTailwindcss, color: '#0ea5c4' },
  Css: { Icon: SiCss, color: '#1572b6' },
  Zustand: { Icon: SiReact, color: '#8d6748' }, // 전용 아이콘 없음 — 임시
  Redux: { Icon: SiRedux, color: '#764abc' },
  TypeScript: { Icon: SiTypescript, color: '#3178c6' },
  JavaScript: { Icon: SiJavascript, color: '#e8b400' },

  // backend
  SpringBoot: { Icon: SiSpringboot, color: '#6db33f' },
  'Fast API': { Icon: SiFastapi, color: '#009688' },
  'PostgreSQL / MySQL': [
    { Icon: SiPostgresql, color: '#4169e1' },
    { Icon: SiMysql, color: '#00758f' },
  ],
  'PostSQL / MySQL': [
    { Icon: SiPostgresql, color: '#4169e1' },
    { Icon: SiMysql, color: '#00758f' },
  ],
  Docker: { Icon: SiDocker, color: '#2496ed' },
  AWS: { Icon: FaAws, color: '#e8850c' },
  Java: { Icon: FaJava, color: '#e76f00' },

  // tools
  GitHub: { Icon: SiGithub, color: '#1c1c2e' },
  Figma: { Icon: SiFigma, color: '#f24e1e' },
  Slack: { Icon: FaSlack, color: '#4a154b' },
  Jira: { Icon: SiJira, color: '#0052cc' },
  Notion: { Icon: SiNotion, color: '#1c1c2e' },
  Discord: { Icon: SiDiscord, color: '#5865f2' },
};

function resolveIcons(name: string): IconSpec[] {
  const entry = ICONS[name];
  if (!entry) return [];
  return Array.isArray(entry) ? entry : [entry];
}

const EASE = [0.22, 1, 0.36, 1] as const;
const STEP = 0.05;

const boxVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

function rowVariants(delay: number) {
  return {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } },
  };
}

export default function Skills() {
  const { skills } = usePortfolio();

  // 카테고리 라벨 + 스킬 행마다 순차 delay
  const delayOf: Record<string, number> = {};
  {
    let n = 0;
    for (const card of skills) {
      delayOf[`cat-${card.id}`] = n++ * STEP;
      for (const item of card.items)
        delayOf[`${card.id}-${item.name}`] = n++ * STEP;
    }
  }

  return (
    <Section id="skills" title="Skills">
      <MotionConfig reducedMotion="user">
        <motion.div
          className={styles.card}
          variants={boxVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className={styles.panel}>
            {skills.map((card) => (
              <div key={card.id} className={styles.group}>
                <motion.p
                  className={styles.category}
                  variants={rowVariants(delayOf[`cat-${card.id}`])}
                >
                  {card.label}
                </motion.p>
                <ul className={styles.list}>
                  {card.items.map((item) => {
                    const icons = resolveIcons(item.name);
                    return (
                      <motion.li
                        key={item.name}
                        className={styles.item}
                        variants={rowVariants(delayOf[`${card.id}-${item.name}`])}
                      >
                        {icons.length > 0 && (
                          <span className={styles.icons} aria-hidden="true">
                            {icons.map(({ Icon, color }, i) => (
                              <Icon key={i} className={styles.icon} style={{ color }} />
                            ))}
                          </span>
                        )}
                        <span className={styles.text}>
                          <span className={styles.name}>{item.name}</span>
                          <span className={styles.reason}>{item.reason}</span>
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </MotionConfig>
    </Section>
  );
}
