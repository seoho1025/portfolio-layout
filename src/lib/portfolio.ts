import { supabase } from './supabase';
import type { Profile } from '../data/profile';
import type { OverviewStep } from '../data/overview';
import type { SkillCard } from '../data/skills';
import type { Project } from '../data/projects';
import type { Career } from '../data/careers';

// supabase 컬럼은 snake_case (resume_url), 우리 타입은 camelCase (resumeUrl)
// 그래서 각 함수에서 이름 맞춰서 리턴함

export async function getProfile(): Promise<Profile> {
  const { data, error } = await supabase.from('profile').select('*').single();
  if (error) throw error;

  return {
    name: data.name,
    tagline: data.tagline,
    summary: data.summary,
    lastUpdate: data.last_update,
    photo: data.photo,
    birthdate: data.birthdate,
    location: data.location,
    education: data.education,
    about: data.about,
    email: data.email,
    github: data.github,
    resumeUrl: data.resume_url,
    velog: data.velog,
  };
}

export async function getOverviewSteps(): Promise<OverviewStep[]> {
  const { data, error } = await supabase
    .from('overview_steps')
    .select('*')
    .order('sort_order'); // sort_order 작은 순으로
  if (error) throw error;

  return data.map((row) => ({
    sectionId: row.section_id,
    title: row.title,
    description: row.description,
  }));
}

export async function getSkills(): Promise<SkillCard[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order');
  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    label: row.label,
    items: row.items,
  }));
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order');
  if (error) throw error;

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    parts: row.parts,
    thumbnail: row.thumbnail,
    featured: row.featured,
    stack: row.stack,
    period: row.period,
    team: row.team,
    role: row.role,
    overview: row.overview,
    retro: row.retro,
    troubles: row.troubles,
    links: row.links,
    host: row.host,
    award: row.award,
  }));
}

export async function getCareers(): Promise<Career[]> {
  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .order('sort_order');
  if (error) throw error;

  return data.map((row) => ({
    type: row.type,
    name: row.name,
    logo: row.logo,
    period: row.period,
    quote: row.quote,
    roles: row.roles,
    awardScale: row.award_scale,
    items: row.items,
  }));
}

// 섹션들이 쓸 전체 데이터 모양
export type PortfolioData = {
  profile: Profile;
  overview: OverviewStep[];
  skills: SkillCard[];
  projects: Project[];
  careers: Career[];
};

// 앱 켜질 때 5개를 한꺼번에 불러온다
export async function getPortfolio(): Promise<PortfolioData> {
  const [profile, overview, skills, projects, careers] = await Promise.all([
    getProfile(),
    getOverviewSteps(),
    getSkills(),
    getProjects(),
    getCareers(),
  ]);

  return { profile, overview, skills, projects, careers };
}
