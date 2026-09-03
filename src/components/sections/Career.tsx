import { MotionConfig, motion } from 'motion/react';
import Section from '../layout/Section';
import Reveal from '../ui/Reveal';
import { careers } from '../../data/careers';
import styles from './Career.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Career() {
  return (
    <Section id="career" title="Career">
      <MotionConfig reducedMotion="user">
        <div className={styles.list}>
          {careers.map((career) => (
            <Reveal key={career.name} className={styles.entry} y={40}>
              <div className={styles.logo}>
                {career.logo ? (
                  <img src={career.logo} alt={career.name} />
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
          ))}
        </div>
      </MotionConfig>
    </Section>
  );
}
