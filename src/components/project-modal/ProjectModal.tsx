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
  const [idx, setIdx] = useState(0);

  // 모달에 보여줄 이미지들: images 있으면 그것, 없으면 thumbnail 한 장
  const gallery =
    project && project.images.length > 0
      ? project.images
      : project && project.thumbnail
        ? [project.thumbnail]
        : [];

  useEffect(() => {
    if (!project) return;
    setIdx(0); // 다른 프로젝트 열면 첫 장부터

    const len =
      project.images.length > 0 ? project.images.length : project.thumbnail ? 1 : 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (len > 1 && e.key === 'ArrowRight') setIdx((i) => (i + 1) % len);
      if (len > 1 && e.key === 'ArrowLeft') setIdx((i) => (i - 1 + len) % len);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
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
              <div className={styles.gallery} data-empty={gallery.length === 0}>
                {gallery.length > 0 ? (
                  <img
                    src={gallery[idx]}
                    alt={`${project.title} 이미지 ${idx + 1}`}
                  />
                ) : (
                  <span>{project.title}</span>
                )}

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      className={styles.galleryPrev}
                      onClick={() =>
                        setIdx((i) => (i - 1 + gallery.length) % gallery.length)
                      }
                      aria-label="이전 이미지"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className={styles.galleryNext}
                      onClick={() => setIdx((i) => (i + 1) % gallery.length)}
                      aria-label="다음 이미지"
                    >
                      ›
                    </button>
                    <div className={styles.dots} aria-hidden="true">
                      {gallery.map((_, i) => (
                        <span key={i} data-active={i === idx} />
                      ))}
                    </div>
                  </>
                )}
              </div>

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
