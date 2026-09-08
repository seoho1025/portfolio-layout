import { supabase } from "./supabase";
import { type Profile } from "../data/profile";
import { type SkillCard } from "../data/skills";
import { type Project } from "../data/projects";
import { type OverviewStep } from "../data/overview";
import { type Career } from "../data/careers";


export type PortfolioData = {
    profile: Profile;
    overview : OverviewStep[];
    skills : SkillCard[];
    projects : Project[];
    careers : Career[];
};

export async function getPortfolio() : Promise<PortfolioData>{
    const [profile, overview, skills, projects, careers ] = await Promise.all([
        getProfile(),
        getOverviewStep(),
        getSkills(),
        getProjects(),
        getCareers(),
    ]);
    return { profile, overview, skills, projects, careers };
}

export async function getProfile() : Promise<Profile>{
    const { data , error } = await
    supabase.from('profile').select('*').single();
    if (error) throw error;
    
    return{
        name : data.name,
        tagline : data.tagline,
        summary : data.summary,
        lastUpdate : data.last_update,
        photo : data.photo,
        birthdate : data.birthdate,
        location : data.location,
        education : data.education,
        about : data.about,
        email : data.email,
        github : data.github,
        resumeUrl : data.resume_url,
        velog : data.velog,
    };
}

export async function getOverviewStep() : Promise<OverviewStep[]>{
    const { data, error } = await supabase
    .from('overview_steps').select('*').order('sort_order');
    if (error) throw error;

    return data.map((row) => ({
        sectionId : row.section_id,
        title : row.title,
        description : row.description,
    }));
}

export async function getSkills() : Promise<SkillCard[]>{
    const { data, error } = await supabase
    .from('skills').select('*').order('sort_order');
    if(error) throw error;

    return data.map((row) => ({
        id : row.id,
        label : row.label,
        items : row.items,
    }));
}

export async function getProjects() : Promise<Project[]>{
    const { data, error } = await supabase
    .from('projects').select('*').order('sort_order');
    if(error) throw error;

    return data.map((row) => ({
        slug : row.slug,
        title : row.title,
        parts : row.parts,
        thumbnail : row.thumbnail,
        images : row.images ?? [],
        featured : row.featured,
        stack : row.stack,
        period : row.period,
        team : row.team,
        role : row.role,
        overview : row.overview,
        retro : row.retro,
        troubles : row.troubles,
        links : row.links,
        host : row.host,
        award : row.award, 
    }));
}

export async function getCareers() : Promise<Career[]>{
    const { data, error } = await supabase
    .from('careers').select('*').order('sort_order');
    if ( error ) throw error;

    return data.map((row) => ({
        type : row.type,
        name : row.name,
        logo : row.logo,
        period : row.period,
        quote : row.quote,
        roles : row.roles,
        awardScale : row.award_scale,
        items : row.items,
    }));
}

