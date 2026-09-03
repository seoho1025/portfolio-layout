import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** 진입 시차 (초) */
  delay?: number;
  /** 아래에서 올라오는 거리 (px) */
  y?: number;
  /** 시작 스케일 (1 = 없음) */
  scale?: number;
};

/**
 * 스크롤로 화면에 들어올 때 한 번만 fade + rise (+ optional scale).
 * prefers-reduced-motion 이면 모션 없이 그대로 렌더.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  scale = 1,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
