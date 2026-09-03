export type SkillItem = {
  name: string;
  reason: string;
};

export type SkillCard = {
  id: string;
  label: string;
  items: SkillItem[];
};

export const skills: SkillCard[] = [
  {
    id: 'core',
    label: '주력',
    items: [
      { name: 'React', reason: '컴포넌트 설계와 렌더링 최적화' },
      { name: 'TypeScript', reason: '타입 정의로 협업 중 런타임 에러 감소' },
      { name: 'Next.js', reason: 'SSR 도입으로 초기 로딩 개선' },
      { name: 'Spring Boot', reason: 'REST API 설계 및 구현' },
      { name: 'Tailwind', reason: '디자인 토큰화로 컴포넌트 재사용률 개선' },
    ],
  },
  {
    id: 'experienced',
    label: '사용 경험',
    items: [
      { name: 'React Native', reason: '크로스 플랫폼 앱 개발' },
      {
        name: 'Zustand / Redux',
        reason: '상태관리 라이브러리 비교 적용, 보일러플레이트 감소',
      },
      { name: 'FastAPI', reason: '비동기 API 서버 구축' },
      { name: 'PostgreSQL / MySQL', reason: '스키마 설계 및 쿼리 최적화' },
      { name: 'Docker', reason: '로컬 개발 환경 통일' },
      { name: 'AWS', reason: '배포 및 운영 환경 구성' },
    ],
  },
  {
    id: 'tools',
    label: '도구',
    items: [
      { name: 'Git', reason: '브랜치 전략 기반 협업' },
      { name: 'Figma', reason: '시안 제작부터 개발까지 직접 연결' },
      { name: 'Swagger', reason: 'API 명세 문서화' },
      { name: '협업 도구', reason: 'Notion, Slack, Jira' },
    ],
  },
];
