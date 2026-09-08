import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import type { Project } from '../../data/projects';
import styles from './ProjectModal.module.css';

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // 지금 보여줄 사진 번호 (0부터 시작)
  const [num, setNum] = useState(0);

  // 다른 프로젝트를 열면 다시 0번 사진으로
  useEffect(() => {
    setNum(0);
  }, [project]);

  // 모달 열려있는 동안: ESC 로 닫기 + 뒤 페이지 스크롤 막기
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // 닫힐 때 원래대로 되돌림
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  // createPortal = 모달을 컴포넌트 트리 말고 body 밑에 직접 그림 (다른 요소에 안 가려지게)
  return createPortal(
    <AnimatePresence>
      {project && (
        // 어두운 배경 — 클릭하면 닫힘
        <motion.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* 실제 창 — 안쪽 클릭은 닫히지 않게 stopPropagation */}
          <motion.div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 44, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.34, ease: EASE }}
          >
            <div className={styles.titleBar}>
              <div className={styles.lights}>
                <button
                  type="button"
                  className={styles.lightClose}
                  onClick={onClose}
                  aria-label="닫기"
                />
                <span className={styles.light} aria-hidden="true" />
                <span className={styles.light} aria-hidden="true" />
              </div>
              <span className={styles.titleText}>{project.title}</span>
            </div>

            <div className={styles.body}>
              {/* 사진 (num 번째) */}
              {project.images.length > 0 && (
                <div className={styles.thumb}>
                  <img src={project.images[num]} alt={project.title} />
                </div>
              )}

              {/* 사진 2장 이상일 때만 넘기기 버튼 */}
              {project.images.length > 1 && (
                <div className={styles.gallery}>
                  <button
                    type="button"
                    onClick={() => {
                      // 0보다 클 때만 뒤로
                      if (num > 0) {
                        setNum(num - 1);
                      }
                    }}
                  >
                    이전
                  </button>

                  <span>
                    {num + 1} / {project.images.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      // 마지막 장이 아닐 때만 앞으로
                      if (num < project.images.length - 1) {
                        setNum(num + 1);
                      }
                    }}
                  >
                    다음
                  </button>
                </div>
              )}

              <dl className={styles.metaGrid}>
                <div>
                  <dt>기간</dt>
                  <dd>{project.period}</dd>
                </div>
                <div>
                  <dt>팀</dt>
                  <dd>{project.team}</dd>
                </div>
                <div>
                  <dt>역할</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>파트</dt>
                  <dd>{project.parts}</dd>
                </div>
              </dl>

              {project.stack.length > 0 && (
                <ul className={styles.stack}>
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}

              <section className={styles.section}>
                <h3>개요</h3>
                <p>{project.overview}</p>
              </section>

              {project.troubles.length > 0 && (
                <section className={styles.section}>
                  <h3>트러블슈팅</h3>
                  {project.troubles.map((t, i) => (
                    <div key={i} className={styles.trouble}>
                      <p className={styles.troubleProblem}>{t.problem}</p>
                      <dl className={styles.troubleBody}>
                        <div>
                          <dt>원인</dt>
                          <dd>{t.cause}</dd>
                        </div>
                        {t.failedAttempt && (
                          <div>
                            <dt>시도</dt>
                            <dd>{t.failedAttempt}</dd>
                          </div>
                        )}
                        <div>
                          <dt>해결</dt>
                          <dd>{t.solution}</dd>
                        </div>
                        <div>
                          <dt>결과</dt>
                          <dd>{t.result}</dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </section>
              )}

              {project.retro && (
                <section className={styles.section}>
                  <h3>회고</h3>
                  <p>{project.retro}</p>
                </section>
              )}

              {project.links.length > 0 && (
                <div className={styles.links}>
                  {project.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
