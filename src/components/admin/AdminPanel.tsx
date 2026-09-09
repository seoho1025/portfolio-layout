import { useEffect, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { supabase } from '../../lib/supabase';
import styles from './AdminPanel.module.css';

type AdminPanelProps = {
  open: boolean;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Gnb 로그인 버튼이 여는 관리자 로그인 패널
// 로그인되면 패널은 닫히고, 로그아웃은 Gnb 버튼에서 처리
export default function AdminPanel({ open, onClose }: AdminPanelProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 열려있는 동안 ESC 로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function login(e: FormEvent) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('로그인 실패');
    } else {
      setEmail('');
      setPassword('');
      onClose(); // 로그인 성공하면 패널 닫음
    }
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="관리자 로그인"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <form onSubmit={login} className={styles.form}>
              <p className={styles.title}>관리자 로그인</p>
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className={styles.btn}>
                로그인
              </button>
              {error && <p className={styles.error}>{error}</p>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
