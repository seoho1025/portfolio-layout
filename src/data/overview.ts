// 개요 화면(Overview) — 스크롤에 따라 순서대로 강조되는 항목들.
// description: 카드에 표시할 설명. emphasis 조각은 main 색으로 강조.

export type DescSegment = { text: string; emphasis?: boolean };

export type OverviewStep = {
  sectionId: string;
  title: string;
  description: DescSegment[];
};

