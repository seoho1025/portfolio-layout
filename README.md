# portfolio

개인 포트폴리오 웹사이트. 단일 페이지에 섹션을 스크롤로 이어 붙인 구조입니다.

## 기술 스택

| 구분 | 사용 |
| --- | --- |
| 빌드 | Vite 8 |
| 프레임워크 | React 19 |
| 언어 | TypeScript |
| 스타일 | CSS Modules + CSS 변수(디자인 토큰) |
| 린트 | oxlint |

라우터 없음 (단일 페이지). 상태 관리 라이브러리 없음.

## 시작하기

```bash
npm install
npm run dev       # 개발 서버 (http://localhost:5173)
npm run build     # 타입 체크(tsc -b) + 프로덕션 빌드 → dist/
npm run preview   # 빌드 결과 미리보기
npm run lint      # oxlint
```

## 폴더 구조

```
src/
├─ main.tsx                 엔트리 (createRoot)
├─ App.tsx                  App → Layout → Page 조립
├─ app/
│  ├─ layout.tsx            Gnb + 콘텐츠 + ScrollTopButton 뼈대
│  ├─ page.tsx              섹션 나열 (Hero → About → Skills → …)
│  └─ globals.css           리셋 + 토큰 import + 기본 타이포
├─ components/
│  ├─ sections/             페이지 섹션 단위 컴포넌트
│  │                        Hero, About, Skills, Projects, Career, Archive
│  ├─ common/               화면 뼈대·공통 UI
│  │                        Gnb, ScrollTopButton, ThemeSwitcher
│  └─ project-modal/        프로젝트 상세 모달 (ProjectModal, ProjectSideNav)
├─ data/                    화면에 뿌릴 콘텐츠 데이터 + 타입 (아래 표 참고)
└─ styles/                  디자인 토큰 — src/styles/README.md 참고
```

각 컴포넌트는 같은 폴더에 `*.module.css` 를 짝으로 둡니다.

## 콘텐츠 수정 가이드

텍스트·이미지 경로 등 화면에 보이는 내용은 **컴포넌트가 아니라 `src/data/` 에서** 수정합니다.
각 파일은 타입 정의 + 데이터를 함께 export 합니다.

| 파일 | 내용 | 대응 섹션 |
| --- | --- | --- |
| `data/profile.ts` | 이름·소개·연락처·이력서 링크 등 프로필 | Hero, About |
| `data/skills.ts` | 스킬 카테고리(frontend/backend/tool-infra/ai) 및 항목·숙련도 | Skills |
| `data/projects.ts` | 프로젝트 목록 (개요·회고·트러블슈팅·링크) | Projects, 프로젝트 모달 |
| `data/careers.ts` | 인턴·해커톤·활동·부트캠프 이력 | Career |
| `data/archives.ts` | 외부 채널·게시글 아카이브 | Archive |

> 항목을 추가할 땐 해당 파일의 배열에 객체를 push 하듯 추가하면 되고,
> 타입이 잡혀 있어 필드 누락 시 `npm run build` 에서 걸립니다.

## 디자인 시스템

색상 / 폰트 / spacing / radius 토큰은 `src/styles/` 에 CSS 변수로만 정의합니다 (CSS-only).
자세한 내용과 사용법은 [`src/styles/README.md`](src/styles/README.md) 참고.

- 색상: `--color-main`, `--color-sub1`, `--color-sub2`, `--color-gray01`~`08`
- 폰트: `NanumSquare Neo` (`--font-sans`)
- 컴포넌트 스타일에서는 하드코딩 대신 `var(--color-*)`, `var(--space-*)` 사용

## 컨벤션

- 컴포넌트 파일·export 는 `PascalCase`, 파일 1개 = 컴포넌트 1개
- 스타일은 CSS Modules (`styles.foo`), 전역은 `app/globals.css` 만
- import 는 상대 경로 (`../`)

## 현재 상태

- 대부분의 섹션 컴포넌트는 아직 골격만 있고 `data/` 도 빈 배열 상태입니다.
- `src/app/` 은 Next.js 스타일 네이밍이지만 Vite SPA 라 라우팅 기능은 없습니다.
  섹션 구현을 본격적으로 시작하기 전, `App.tsx` 로 병합할지 검토 예정.
- `ThemeSwitcher` 는 자리만 있고 다크 모드 토큰/로직 미구현.
