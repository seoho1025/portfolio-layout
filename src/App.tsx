import Gnb from './components/layout/Gnb';
import Hero from './components/sections/Hero';
import Overview from './components/sections/Overview';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Career from './components/sections/Career';
import Archive from './components/sections/Archive';
import AdminPanel from './components/admin/AdminPanel';
import { useState } from 'react';

function App() {
  // 관리자 패널 열림 여부 (Gnb 의 로그인 버튼이 켬)
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <>
      <Gnb onAdminClick={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <Overview />
        <About />
        <Skills />
        <Projects />
        <Career />
        <Archive />
      </main>
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
}

export default App;
