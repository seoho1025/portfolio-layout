export type CareerType = 'intern' | 'hackathon' | 'activity' | 'bootcamp';

export type CareerItem = {
  title: string;
  period: string;
  description: string;
};

export type Career = {
  type: CareerType;
  name: string;
  logo: string;
  period: string;
  quote: string;
  roles: string[];
  awardScale: string;
  items: CareerItem[];
};

// placeholder — 실제 이력으로 교체하세요.
export const careers: Career[] = [
  {
    type: 'intern',
    name: '(주) 예시컴퍼니',
    logo: '',
    period: '2024.11 - (재직 중)',
    quote: '사용자에게 가장 단순한 경험을 만듭니다',
    roles: ['Frontend 개발', 'Backend 개발'],
    awardScale: '',
    items: [
      {
        title: '(신규) 검색 개편 프로젝트',
        period: '2025년 하반기 - (진행 중)',
        description:
          '검색 결과 정확도와 응답 속도를 개선하는 개편 작업 (Frontend, Backend)',
      },
      {
        title: '온보딩 플로우 리디자인',
        period: '2025년 상반기',
        description:
          '신규 가입 전환율 개선을 위한 온보딩 화면 재설계 및 구현 (Frontend)',
      },
      {
        title: '디자인 시스템 구축',
        period: '2024년 하반기 - 2025년 상반기',
        description:
          '반복되는 UI를 토큰과 컴포넌트로 정리해 개발 속도를 개선 (Frontend)',
      },
      {
        title: '관리자 대시보드 개발',
        period: '2024년 하반기',
        description:
          '운영팀의 반복 업무를 줄이기 위한 내부 대시보드 개발 (Frontend, Backend)',
      },
    ],
  },
];
