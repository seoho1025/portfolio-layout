import { profile } from './profile';
import { skills } from './skills';
import { projects } from './projects';
import { careers } from './careers';

// 개요 화면(Overview) — 스크롤에 따라 순서대로 강조되는 항목들.
// 각 항목은 실제 섹션 하나와 연결되고, 클릭하면 그 섹션으로 스크롤한다.
// preview: 활성 카드 안에 보여줄 요약 줄 (실제 섹션 데이터에서 추출)
export type OverviewStep = {
  sectionId: string;
  title: string;
  description: string;
  preview: string[];
};

export const overviewSteps: OverviewStep[] = [
  {
    sectionId: 'about',
    title: 'About',
    description: '어떤 사람이고 무엇을 지향하는지',
    preview: [
      profile.name || '홍길동',
      `${profile.location || '서울시 성동구'} · ${profile.birthdate || '2000.05.14'}`,
    ],
  },
  {
    sectionId: 'skills',
    title: 'Skills',
    description: '사용하는 기술과 숙련도',
    preview: skills.map((c) => `${c.label} ${c.items.length}`),
  },
  {
    sectionId: 'projects',
    title: 'Projects',
    description: '직접 만든 프로젝트와 회고',
    preview: [
      `프로젝트 ${projects.length}개`,
      projects
        .slice(0, 3)
        .map((p) => p.title.replace(/\.$/, ''))
        .join(' · '),
    ],
  },
  {
    sectionId: 'career',
    title: 'Career',
    description: '인턴 · 활동 · 부트캠프 이력',
    preview: careers.length
      ? [
          careers[0].name,
          careers[0].roles.join(' · ') +
            (careers.length > 1 ? ` 외 ${careers.length - 1}곳` : ''),
        ]
      : [],
  },
];
