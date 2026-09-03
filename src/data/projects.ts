export type ProjectLink = {
  label: string;
  url: string;
};

export type TroubleShooting = {
  problem: string;
  cause: string;
  failedAttempt: string;
  solution: string;
  result: string;
};

export type Project = {
  slug: string;
  title: string;
  parts: string;
  thumbnail: string;
  featured: boolean;
  stack: string[];
  period: string;
  team: string;
  role: string;
  overview: string;
  retro: string;
  troubles: TroubleShooting[];
  links: ProjectLink[];
};

// placeholder — 실제 프로젝트로 교체하세요.
export const projects: Project[] = [
  {
    slug: 'brand-website',
    title: 'Brand Website dev.',
    parts: 'Design · Publish · F/B-end',
    thumbnail: '',
    featured: true,
    stack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    period: '2025.03 – 2025.05',
    team: '개인',
    role: '기획 · 디자인 · 프론트엔드',
    overview:
      '브랜드 소개용 원페이지 웹사이트. 디자인 토큰을 먼저 정의하고 컴포넌트를 조립하는 방식으로 진행해, 후반 시안 변경에도 빠르게 대응할 수 있었습니다.',
    retro:
      '토큰을 먼저 잡으니 디자인 변경 대응이 빨랐습니다. 다만 초기 토큰 설계에 예상보다 시간이 더 필요했고, 문서로 남겨 다음 프로젝트에 재사용했습니다.',
    troubles: [
      {
        problem: '스크롤에 연동된 애니메이션이 프레임 드랍',
        cause: 'html의 scroll-behavior: smooth 가 스크롤 연동 계산과 충돌',
        failedAttempt: 'transition 시간을 줄여봤지만 근본 원인이 아니었음',
        solution: 'CSS smooth 제거, 앵커 이동만 JS scrollIntoView({ behavior: "smooth" }) 로 처리',
        result: '스크롤 체감이 부드러워지고 스크롤 중 CPU 사용률 감소',
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Live', url: 'https://example.com' },
    ],
  },
  {
    slug: 'lifecaption',
    title: 'Platform dev.',
    parts: 'UI/UX · Publish · F/B-end',
    thumbnail: '',
    featured: true,
    stack: ['Next.js', 'TypeScript', 'Zustand', 'FastAPI'],
    period: '2024.09 – 2025.01',
    team: '4인 (FE 2 · BE 1 · 디자인 1)',
    role: '프론트엔드 리드 · 실시간 자막 뷰 구현',
    overview:
      '청각장애인의 학습권과 의사소통을 돕는 실시간 자막 플랫폼. 웹소켓으로 들어오는 자막을 지연 없이 렌더링하는 뷰를 담당했습니다.',
    retro:
      '초기엔 상태를 전역으로 관리하다 리렌더가 많았고, 자막 뷰를 별도 스토어로 분리해 개선했습니다. 실시간 UI의 성능 병목을 측정하는 습관이 생겼습니다.',
    troubles: [
      {
        problem: '자막이 초당 수십 건 들어올 때 입력 지연 발생',
        cause: '자막 배열 전체를 상태로 두어 매 수신마다 전체 리렌더',
        failedAttempt: 'React.memo 를 넓게 적용했지만 부모 리렌더는 그대로였음',
        solution: '자막 뷰를 독립 스토어로 분리하고 화면에 보이는 구간만 렌더',
        result: '입력 지연이 사라지고 프레임이 안정적으로 유지됨',
      },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com' }],
  },
  {
    slug: 'value-bite',
    title: 'Solution introduction.',
    parts: 'Design · Publish · F/B-end',
    thumbnail: '',
    featured: false,
    stack: ['React', 'TypeScript', 'Spring Boot', 'MySQL'],
    period: '2024.03 – 2024.06',
    team: '3인',
    role: '프론트엔드 · 소개 페이지 및 관리자 화면',
    overview:
      '소상공인용 솔루션 소개 및 신청 사이트. 소개 페이지와 신청 폼, 간단한 관리자 화면을 구현했습니다.',
    retro:
      '폼 검증 로직이 컴포넌트에 흩어져 유지보수가 어려웠고, 스키마 기반 검증으로 정리했습니다.',
    troubles: [
      {
        problem: '신청 폼 제출 후 중복 요청이 종종 발생',
        cause: '제출 버튼에 로딩/비활성 처리가 없어 더블 클릭 허용',
        failedAttempt: 'debounce 를 걸었지만 느린 네트워크에선 여전히 중복',
        solution: '요청 시작 시 버튼 비활성 + 서버측 멱등키 도입',
        result: '중복 신청 건이 사라짐',
      },
    ],
    links: [{ label: 'Live', url: 'https://example.com' }],
  },
  {
    slug: 'public-project',
    title: 'Public Project.',
    parts: 'Publish',
    thumbnail: '',
    featured: false,
    stack: ['HTML', 'SCSS', 'JavaScript'],
    period: '2023.11 – 2023.12',
    team: '2인',
    role: '퍼블리싱 전담',
    overview:
      '공공기관 안내 페이지 다국어 퍼블리싱. 시맨틱 마크업과 접근성 기준(WCAG AA)에 맞춰 작업했습니다.',
    retro:
      '접근성 체크리스트를 처음부터 두고 작업하니 후반 수정이 거의 없었습니다.',
    troubles: [
      {
        problem: '스크린리더에서 탭 메뉴 순서가 뒤섞임',
        cause: 'DOM 순서와 시각적 순서가 CSS로 인해 불일치',
        failedAttempt: 'tabindex 를 수동 지정했으나 유지보수가 어려움',
        solution: 'DOM 순서를 시각적 순서와 일치시키고 레이아웃만 CSS로 조정',
        result: '키보드/스크린리더 탐색 순서가 자연스러워짐',
      },
    ],
    links: [{ label: 'Live', url: 'https://example.com' }],
  },
  {
    slug: 'nft-tcg',
    title: 'NFT Trading Card Game dev.',
    parts: 'Publish · Front-end',
    thumbnail: '',
    featured: false,
    stack: ['React', 'TypeScript', 'ethers.js', 'Vite'],
    period: '2024.07 – 2024.08',
    team: '해커톤 4인',
    role: '프론트엔드 · 카드 인벤토리 및 거래 UI',
    overview:
      '지갑을 연결해 카드 NFT를 확인하고 거래하는 웹 클라이언트. 해커톤에서 48시간 동안 제작했습니다.',
    retro:
      '체인 응답 대기 시간을 UI에서 어떻게 다루느냐가 체감 품질을 좌우한다는 걸 배웠습니다.',
    troubles: [
      {
        problem: '트랜잭션 전송 후 화면이 멈춘 것처럼 보임',
        cause: '컨펌 대기 동안 아무 피드백이 없었음',
        failedAttempt: '스피너만 추가했지만 진행 상황을 알 수 없어 답답함은 그대로',
        solution: '전송 → 대기 → 컨펌 단계를 표시하고 예상 시간을 안내',
        result: '사용자가 이탈 없이 컨펌을 기다리게 됨',
      },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com' }],
  },
  {
    slug: 'daily-app',
    title: 'Mobile App dev.',
    parts: 'Publish · Front-end',
    thumbnail: '',
    featured: false,
    stack: ['React Native', 'TypeScript', 'Zustand'],
    period: '2024.02 – 2024.04',
    team: '3인',
    role: '프론트엔드 · 홈/기록 화면',
    overview:
      '하루 지출을 빠르게 기록하는 모바일 앱. iOS/Android 공통 컴포넌트로 화면을 구성했습니다.',
    retro:
      '플랫폼별 예외 처리를 뒤늦게 몰아서 하다 일정이 밀렸고, 다음엔 초기에 두 플랫폼을 함께 확인하기로 했습니다.',
    troubles: [
      {
        problem: '리스트 스크롤 시 iOS에서만 프레임 저하',
        cause: '항목마다 그림자를 렌더링해 오프스크린 합성 비용 증가',
        failedAttempt: '항목 수를 줄여봤지만 근본 원인은 그림자였음',
        solution: '그림자를 단색 배경 + 얇은 경계선으로 대체',
        result: 'iOS에서도 스크롤이 매끄러워짐',
      },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com' }],
  },
];
