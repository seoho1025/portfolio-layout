import { supabase } from './supabase';

// settings 테이블은 한 줄만 있음 (id = 1)

// 현재 활성 테마 key 읽기 ('' = 기본)
export async function getTheme() {
  const { data } = await supabase
    .from('settings')
    .select('active_theme')
    .eq('id', 1)
    .single();
  return data?.active_theme || '';
}

// 테마 저장 (로그인해야 됨 = RLS)
export async function setTheme(key: string) {
  await supabase.from('settings').update({ active_theme: key }).eq('id', 1);
}

// <html data-theme="..."> 세팅 + localStorage 캐시
export function applyTheme(key: string) {
  localStorage.setItem('theme', key);
  if (key) {
    document.documentElement.dataset.theme = key;
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}
