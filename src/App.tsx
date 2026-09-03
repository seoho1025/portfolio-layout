import Gnb from './components/layout/Gnb';
import Hero from './components/sections/Hero';
import Overview from './components/sections/Overview';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Career from './components/sections/Career';

function App() {
  return (
    <>
      <Gnb />
      <main>
        <Hero />
        <Overview />
        <About />
        <Skills />
        <Projects />
        <Career />
      </main>
    </>
  );
}

export default App;
