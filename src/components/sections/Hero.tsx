import { profile } from '../../data/profile';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <h1 className={styles.title}>{profile.name || 'PORTFOLIO'}</h1>
      {/* TODO: pin 스크롤 인터랙션 */}
    </section>
  );
}
