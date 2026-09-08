// 회사 테마 목록 = { key, 이름, 대표색 }
// 새 회사 추가: 여기 + tokens.css 에 :root[data-theme='key'] 블록 + --theme-key 변수
export const THEMES = [
  { key: '', label: '기본', color: 'var(--theme-default)' },
  { key: 'toss', label: '토스', color: 'var(--theme-toss)' },
  { key: 'naver', label: '네이버', color: 'var(--theme-naver)' },
  { key: 'daangn', label: '당근', color: 'var(--theme-daangn)' },
  { key: 'baemin', label: '배민', color: 'var(--theme-baemin)' },
  { key: 'kakao', label: '카카오', color: 'var(--theme-kakao)' },
];
