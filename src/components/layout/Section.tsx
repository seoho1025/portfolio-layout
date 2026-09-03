import type { ReactNode } from 'react';
import styles from './Section.module.css';

type SectionProps = {
  id: string;
  title?: string;
  children?: ReactNode;
};

/** 일반 섹션 공통 껍데기 — id 앵커, 최대폭, 좌우 여백, 상단 제목. */
export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
