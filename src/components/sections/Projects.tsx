import { useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import Section from '../layout/Section';
import ProjectModal from '../project-modal/ProjectModal';
import { projects } from '../../data/projects';
import styles from './Projects.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <Section id="projects" title="Projects">
      <MotionConfig reducedMotion="user">
        <ul className={styles.grid}>
          {projects.map((project, i) => (
            <motion.li
              key={project.slug}
              className={styles.card}
              initial={{ opacity: 0, y: 64, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease: EASE, delay: (i % 3) * 0.1 }}
            >
              <button
                type="button"
                className={styles.thumb}
                data-tone={i % 3}
                onClick={() => setOpenSlug(project.slug)}
              >
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.title} />
                ) : (
                  <span className={styles.thumbLabel}>{project.title}</span>
                )}
              </button>

              <div className={styles.meta}>
                <div className={styles.metaCol}>
                  <span className={styles.metaLabel}>PROJECT</span>
                  <span className={styles.metaValue}>{project.title}</span>
                </div>
                <div className={styles.metaCol}>
                  <span className={styles.metaLabel}>PARTS</span>
                  <span className={styles.metaValue}>{project.parts}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </MotionConfig>

      <ProjectModal project={openProject} onClose={() => setOpenSlug(null)} />
    </Section>
  );
}
