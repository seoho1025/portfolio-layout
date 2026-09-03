import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { overviewSteps } from '../../data/overview';
import { scrollToSection } from '../../lib/scroll';
import styles from './Overview.module.css';

const N = overviewSteps.length;

export default function Overview() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  // 섹션 스크롤 진행률(0~1) → 활성 인덱스
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(p * N))));
  });

  // 메인 → 개요로 들어오는 구간에서 콘텐츠가 떠오르며 등장 (짧은 구간에 압축)
  const { scrollYProgress: entry } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  // 왼쪽 텍스트: 먼저 올라옴
  const textY = useTransform(entry, [0.1, 0.6], reduce ? [0, 0] : [120, 0]);
  const textOpacity = useTransform(entry, [0.1, 0.45], reduce ? [1, 1] : [0, 1]);
  // 오른쪽 패널: 살짝 늦게, 더 크게
  const panelY = useTransform(entry, [0.2, 0.8], reduce ? [0, 0] : [200, 0]);
  const panelOpacity = useTransform(entry, [0.2, 0.6], reduce ? [1, 1] : [0, 1]);
  const panelScale = useTransform(entry, [0.2, 0.85], reduce ? [1, 1] : [0.88, 1]);

  return (
    <section
      id="overview"
      ref={ref}
      className={styles.overview}
      style={{ height: `${N * 100}vh` }}
    >
      <div className={styles.sticky}>
        <div className={styles.inner}>
          {/* 왼쪽: 항목 리스트 */}
          <motion.div className={styles.left} style={{ y: textY, opacity: textOpacity }}>
            <p className={styles.kicker}>OVERVIEW</p>
            <h2 className={styles.headline}>
              이 포트폴리오는
              <br />
              이렇게 구성됩니다
            </h2>

            <ul className={styles.list}>
              {overviewSteps.map((step, i) => (
                <li key={step.sectionId} className={styles.item} data-active={i === active}>
                  <button
                    type="button"
                    className={styles.itemTitle}
                    onClick={() => scrollToSection(step.sectionId)}
                  >
                    {step.title}
                  </button>
                  <div className={styles.itemBody} aria-hidden={i !== active}>
                    <div className={styles.itemBodyInner}>
                      <button
                        type="button"
                        className={styles.itemCta}
                        onClick={() => scrollToSection(step.sectionId)}
                      >
                        바로가기 →
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 오른쪽: 섹션 목록 (하나의 패널) */}
          <motion.div
            className={styles.stage}
            style={{ y: panelY, opacity: panelOpacity, scale: panelScale }}
          >
            <div className={styles.deck}>
              {overviewSteps.map((step, i) => {
                const depth = i - active;
                return (
                  <button
                    key={step.sectionId}
                    type="button"
                    className={styles.card}
                    data-depth={depth < 0 ? 'past' : String(depth)}
                    data-active={i === active}
                    onClick={() => scrollToSection(step.sectionId)}
                  >
                    <span className={styles.cardTitle}>{step.title}</span>
                    <p className={styles.cardDesc}>
                      {step.description.map((seg, k) =>
                        seg.emphasis ? (
                          <strong key={k} className={styles.em}>
                            {seg.text}
                          </strong>
                        ) : (
                          <span key={k}>{seg.text}</span>
                        ),
                      )}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* 진행 눈금 */}
        <div className={styles.progress} aria-hidden>
          {overviewSteps.map((_, i) => (
            <span key={i} data-active={i === active} />
          ))}
        </div>
      </div>
    </section>
  );
}
