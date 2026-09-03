import { useEffect, useState } from 'react';

/**
 * 화면에 보이는 섹션 중 가장 많이 노출된 섹션의 id를 반환.
 * GNB에서 현재 위치 강조에 사용.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      // 화면 중앙 근처를 기준선으로 삼아 한 번에 하나만 활성되게
      { rootMargin: '-45% 0px -50% 0px' },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
