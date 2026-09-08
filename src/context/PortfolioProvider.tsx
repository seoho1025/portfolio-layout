//provider은 하나를 만들어두면 일일히 섹션을 전부 수정해야하므로 만듬 

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getPortfolio, type PortfolioData } from "../lib/portfolio";
//getPortfolio = Supabase가 테이블을 한번에 조회 
//PortfolioData = Supabase가 조회한 테이블들의 값 

//초기값이 null 이므로 provider가 그 값을 채워줌 
const PortfolioContext = createContext< PortfolioData | null >(null);

export function PortfolioProvider({ children } : {children : ReactNode}){
    const [ data, setData ] = useState<PortfolioData | null>(null); // 처음에는 로딩 중
    const [ failed, setFailed ] = useState(false); // fetch 실패 여부
    // 앱 시작 시 한 번만 실행 
    useEffect(() => {
        let ignore = false;
        getPortfolio()
            .then((d) => { if (!ignore) setData(d); }) // 성공 시 data에 저장 -> 재렌더
            .catch((err) => { // 실패 시 console에 원인을 표시하고 실패 메시지 전송
                console.error(err);
                if (!ignore) setFailed(true);
            });
        return () => { ignore = true; };
    }, []);

    if(failed) return <div>불러오지 못했어요</div>;
    if(!data) return <div>불러오는 중...</div>;

    return(
        <PortfolioContext.Provider value={data}>
            {children}
        </PortfolioContext.Provider>
    );
}

//앞서서 context에 담아뒀던 내용을 꺼내줌 
export function usePortfolio() {
    const context = useContext(PortfolioContext);
    if(!context) throw new Error('usePortfolioContext는 <PortfolioProvider>안에서만 실행');
    return context;
}

