export async function getPortfolio(){
    const [ profile, overview, skills, projects, careers ] = await
    Promise.all([...]);
    return { profile, overview, skills, projects, careers };
}
//getPortfolio가 반환하는 객체의 타입을 자동으로 산출
export type PortfolioData = Awaited<ReturnType<typeof getPortfolio>>;

