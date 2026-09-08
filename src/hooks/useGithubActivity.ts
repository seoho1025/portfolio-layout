import { useEffect, useState } from 'react';

// 잔디 한 칸 (하루)
export type Day = {
  date: string;
  count: number; // 그날 기여 수
  level: number; // 0~4, 색 진하기
};

// 최근 커밋 한 줄
export type Commit = {
  repo: string;
  message: string;
  date: string;
  url: string;
};

// 깃허브에서 잔디 + 최근 커밋을 가져오는 훅 (토큰 필요없음)
export function useGithubActivity(username: string) {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState(0);
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    // 1. 잔디 (프록시 API가 깃허브 대신 읽어줌)
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => res.json())
      .then((data) => {
        setDays(data.contributions || []);
        setTotal(data.total?.lastYear || 0);
      });

    // 2. 최근 커밋 (깃허브 공개 활동 중 push 한 것만)
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then((res) => res.json())
      .then((events) => {
        const list: Commit[] = [];
        for (const e of events) {
          if (e.type !== 'PushEvent') continue;
          for (const c of e.payload.commits) {
            list.push({
              repo: e.repo.name,
              message: c.message.split('\n')[0], // 커밋 메시지 첫 줄
              date: e.created_at,
              url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
            });
          }
        }
        setCommits(list.slice(0, 8)); // 최근 8개만
      });
  }, [username]);

  return { days, total, commits };
}
