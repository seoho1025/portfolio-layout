# styles — 디자인 토큰

Figma `color System` 아트보드에서 추출한 색상 / 폰트 시스템.
출처: <https://www.figma.com/design/5BOpl3z7LngqLCY2896vOp/?node-id=7-9>

| 파일 | 내용 |
| --- | --- |
| `fonts.css` | `NanumSquare Neo` @font-face (300/400/700/800/900) |
| `tokens.css` | CSS 변수 — color(primitive/semantic) + typography + spacing + radius + layout |

`src/app/globals.css` 가 `fonts.css` + `tokens.css` 를 import 하고 리셋·기본 타이포를 적용합니다.

**CSS-only 방식**입니다. 모든 토큰은 CSS 변수(`--*`)로만 존재하고, JS 상수 버전은 두지 않습니다.
색상/사이즈가 필요한 곳은 항상 `var(--토큰)` 을 씁니다 (아래 사용법 참고).

## 색상

토큰은 **primitive → semantic** 2단이며 컴포넌트는 semantic 만 사용합니다.

**Primitive** (정리용, 직접 사용 금지)

| 토큰 | 값 | 이름 |
| --- | --- | --- |
| `--blue-500` `--blue-600` `--blue-700` | `#2d6af7` `#313df6` `#005bac` | 메인 / 서브1 / 서브2 |
| `--gray-950` → `--gray-200`, `--white` | `#1c1c2e` … `#e3e7ed` | 숫자가 클수록 어두움 |
| `--traffic-red` `--traffic-yellow` `--traffic-green` | | macOS 신호등 |

**Semantic** (컴포넌트가 쓰는 값)

| 그룹 | 토큰 |
| --- | --- |
| text | `--color-text-strong` `--color-text` `--color-text-muted` `--color-text-subtle` `--color-text-on-inverse` |
| brand | `--color-primary` `--color-primary-strong` `--color-primary-tint` |
| surface | `--color-bg` `--color-bg-subtle` `--color-surface-inverse` |
| glass | `--color-glass` `--color-glass-strong` |
| border | `--color-border` `--color-border-hairline` `--color-border-hairline-strong` |
| etc | `--color-scrim` · `--gradient-card-a` `-b` `-c` |
| shadow | `--shadow-sm` `--shadow-md` `--shadow-lg` `--shadow-xl` |

## 타이포 / 사이즈

| 그룹 | 토큰 | 비고 |
| --- | --- | --- |
| font-size | `--font-size-xs` `sm` `base` `lg` `xl` `2xl` `3xl` `4xl` `5xl` | 12→56px, t-shirt 스케일. `base` = 16px |
| line-height | `--line-height-tight`(1.2) `snug`(1.4) `normal`(1.5) `relaxed`(1.7) | 큰 사이즈일수록 tight |
| font-weight | `--font-weight-regular` `bold` `extrabold` `heavy` | 400 / 700 / 800 / 900 |
| spacing | `--space-1` … `--space-32` | 4px 베이스, 번호 = 4px × n |
| radius | `--radius-sm`(4) `md`(8) `lg`(16) `full` | Figma 스와치 5px 계열 |
| layout | `--layout-max-width`(1200px) `--layout-gutter` | 콘텐츠 최대 폭 / 좌우 여백 |

## 사용법

### 1. CSS Modules (`*.module.css`) — 기본

```css
.button {
  padding: var(--space-3) var(--space-6);
  background: var(--color-primary);
  color: var(--color-text-on-inverse);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-normal);
}

.section {
  max-width: var(--layout-max-width);
  margin-inline: auto;
  padding-block: var(--space-24); /* 섹션 세로 간격 */
  padding-inline: var(--layout-gutter);
}
```

### 2. React 인라인 스타일 — 값이 동적일 때

CSS 변수 문자열을 그대로 넣습니다.

```tsx
<span style={{ color: 'var(--color-primary)' }}>강조</span>

// 동적 선택
<div style={{ borderColor: active ? 'var(--color-primary)' : 'var(--color-border)' }} />
```

### 3. 하지 말 것

```css
color: #2d6af7;              /* ❌ 하드코딩 */
color: var(--color-primary); /* ✅ */
```

### 토큰 고르는 기준

- 브랜드 강조·CTA·링크 → `--color-primary` (hover·pressed 는 `--color-primary-strong`)
- 본문 텍스트 `--color-text`, 흐린 텍스트 `--color-text-muted`, 비활성 `--color-text-subtle`, 제목 `--color-text-strong`
- 테두리 `--color-border`(불투명) / `--color-border-hairline`(유리 패널 위), 옅은 배경 `--color-bg-subtle`
- 유리 패널 `--color-glass` / `--color-glass-strong`, 모달 뒷배경 `--color-scrim`
- 그림자는 `--shadow-sm|md|lg|xl`, 간격은 `--space-*`, 모서리는 `--radius-*` (임의 값 금지)

> 차트 라이브러리 등 JS에서 색 문자열이 꼭 필요한 상황이 생기면,
> 그때 필요한 값만 담은 `tokens.ts` 를 추가하세요. 지금은 두지 않습니다.

## 폰트 로컬 호스팅

기본은 jsDelivr CDN. 오프라인 환경이면 woff2를 `public/fonts/` 로 받아
`fonts.css` 의 `src` 경로만 `/fonts/...` 로 교체하세요.
