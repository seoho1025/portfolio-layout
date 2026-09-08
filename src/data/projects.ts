//프로젝트 디테일한 부분 잡기
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
  slug: string; /*URL이나 식별자로 쓰기 좋게 다듬은 짧은 문자열*/
  title: string;
  parts: string;
  thumbnail: string;
  images : string[];
  featured: boolean;
  stack: string[];
  period: string;
  team: string;
  role: string;
  overview: string;
  retro: string;
  troubles: TroubleShooting[];
  links: ProjectLink[];
  host?: string;
  award?: string;
};

