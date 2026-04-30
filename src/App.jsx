import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Gamepad2,
  Volume2,
  Search,
  Star,
  Wrench,
  Brain,
  Award,
  ChevronRight,
  RotateCcw,
  RefreshCw
} from 'lucide-react';

const glossaryData = [
  { id: 1, term: "Bug", translation: "Erro / Falha", category: "Development", definition: "Um erro ou falha no código de um programa que causa um comportamento inesperado.", example: "I need to fix a bug in the login authentication process." },
  { id: 2, term: "Deploy", translation: "Implantação", category: "Infrastructure", definition: "O processo de colocar um software no ar, disponível para uso em produção.", example: "We are going to deploy the new website update on Friday." },
  { id: 3, term: "Feature", translation: "Funcionalidade", category: "Product", definition: "Uma característica específica ou capacidade que um software oferece.", example: "Dark mode is the most requested feature by our users." },
  { id: 4, term: "Framework", translation: "Estrutura", category: "Development", definition: "Conjunto de ferramentas e bibliotecas que servem como base estrutural.", example: "React is a popular JavaScript framework for interfaces." },
  { id: 5, term: "Database", translation: "Banco de dados", category: "Data", definition: "Sistema organizado de armazenamento e recuperação de dados.", example: "All passwords are encrypted before being saved in the database." },
  { id: 6, term: "Middleware", translation: "Camada intermediária", category: "Infrastructure", definition: "Software que fornece serviços para aplicações além dos disponíveis pelo sistema operacional.", example: "The middleware handles authentication between the client and the server." },
  { id: 7, term: "Variable", translation: "Variável", category: "Development", definition: "Espaço na memória para armazenar dados que podem ser modificados.", example: "Create a variable to store the total price." },
  { id: 8, term: "Query", translation: "Consulta", category: "Data", definition: "Uma solicitação de informações de um banco de dados.", example: "This SQL query returns all users from the marketing department." },
  { id: 9, term: "Backend", translation: "Retaguarda", category: "Development", definition: "A parte de um sistema que lida com a lógica, banco de dados e servidor.", example: "The backend is written in Node.js." },
  { id: 10, term: "Frontend", translation: "Interface", category: "Development", definition: "A parte visual de um software com a qual o usuário interage.", example: "The frontend uses Tailwind CSS for styling." }
];

const toolsData = [
  { name: "IDE (Integrated Development Environment)", description: "Software que combina ferramentas comuns de desenvolvedor em uma única interface gráfica.", examples: "VS Code, IntelliJ, PyCharm" },
  { name: "Version Control (Git)", description: "Sistema que rastreia mudanças no código-fonte ao longo do tempo.", examples: "GitHub, GitLab, Bitbucket" },
  { name: "Cloud Computing", description: "Entrega de serviços de computação (servidores, armazenamento) pela internet.", examples: "AWS, Azure, Google Cloud" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('glossary');
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold flex items-center gap-3 tracking-tight">
                <span className="bg-white text-blue-700 p-2 rounded-xl shadow-sm">
                  <BookOpen size={32} />
                </span>
                TechLingo <span className="text-blue-200 font-light text-xl">Pro</span>
              </h1>
              <p className="mt-2 text-blue-100 font-medium opacity-90">Plataforma Dinâmica de Inglês Instrumental</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="max-w-6xl mx-auto px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-2 border border-slate-200 flex flex-wrap gap-2">
          <NavButton active={activeTab === 'glossary'} onClick={() => setActiveTab('glossary')} icon={<BookOpen size={18}/>} label="Glossário" />
          <NavButton active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon={<Wrench size={18}/>} label="Ferramentas" />
          <NavButton active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<Gamepad2 size={18}/>} label="Quiz Aleatório" />
          <NavButton active={activeTab === 'game'} onClick={() => setActiveTab('game')} icon={<Brain size={18}/>} label="Memória" />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {activeTab === 'glossary' && <GlossarySection favorites={favorites} toggleFavorite={toggleFavorite} />}
        {activeTab === 'tools' && <ToolsSection />}
        {activeTab === 'quiz' && <DynamicQuizSection />}
        {activeTab === 'game' && <MemoryGameSection />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${active ? 'bg-blue-600 text-white shadow-md scale-105' : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'}`}>
      {icon} {label}
    </button>
  );
}

function GlossarySection({ favorites, toggleFavorite }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Development', 'Data', 'Infrastructure', 'Product'];

  const filtered = useMemo(() => {
    return glossaryData.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) || item.translation.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || item.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input className="w-full pl-12 pr-4 py-4 rounded-2xl border-slate-200 shadow-sm" placeholder="Buscar termo..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${filter === c ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' : 'bg-white text-slate-500 border border-slate-200'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
            <div className="h-1.5 bg-blue-500" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-slate-800">{item.term}</h3>
                <div className="flex gap-1">
                  <button onClick={() => toggleFavorite(item.id)} className={favorites.includes(item.id) ? 'text-yellow-500' : 'text-slate-300'}>
                    <Star size={18} fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                  </button>
                  <button onClick={() => speak(item.term)} className="text-blue-500"><Volume2 size={18} /></button>
                </div>
              </div>
              <p className="text-blue-600 font-bold text-sm mb-2">{item.translation}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{item.definition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolsSection() {
  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      {toolsData.map((tool, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-6 items-center">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600"><Wrench size={24} /></div>
          <div>
            <h3 className="font-bold text-lg">{tool.name}</h3>
            <p className="text-slate-600 text-sm">{tool.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DynamicQuizSection() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  const generateQuiz = () => {
    const shuffled = [...glossaryData].sort(() => 0.5 - Math.random());
    const selectedTerms = shuffled.slice(0, 5);

    const newQuestions = selectedTerms.map(term => {
      const wrongOptions = glossaryData
        .filter(item => item.id !== term.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(item => item.translation);

      const allOptions = [...wrongOptions, term.translation].sort(() => 0.5 - Math.random());

      return {
        id: term.id,
        question: `Qual a tradução correta para o termo: "${term.term}"?`,
        options: allOptions,
        correctAnswer: allOptions.indexOf(term.translation)
      };
    });

    setQuestions(newQuestions);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correctAnswer) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) return <div className="text-center">Carregando quiz...</div>;

  if (finished) return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl text-center">
      <Award size={64} className="mx-auto text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold">Resultado Final</h2>
      <p className="text-4xl font-black text-blue-600 my-4">{score} / {questions.length}</p>
      <button onClick={generateQuiz} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
        <RefreshCw size={20} /> Novo Quiz Aleatório
      </button>
    </div>
  );

  const q = questions[current];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <div className="mb-6 flex justify-between items-center text-xs font-bold text-slate-400">
        <span>QUESTÃO {current + 1} DE {questions.length}</span>
        <span className="text-blue-500">DINÂMICO</span>
      </div>
      <h3 className="text-2xl font-bold mb-8">{q.question}</h3>
      <div className="grid gap-3 mb-8">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctAnswer;
          const isSelected = i === selected;
          let btnClass = "border-slate-200 hover:bg-slate-50";
          if (selected !== null) {
            if (isCorrect) btnClass = "border-green-500 bg-green-50 text-green-700";
            else if (isSelected) btnClass = "border-red-500 bg-red-50 text-red-700";
            else btnClass = "opacity-50 border-slate-100";
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null} className={`p-4 text-left font-bold border-2 rounded-xl transition-all ${btnClass}`}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <button onClick={next} className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2">
          {current + 1 === questions.length ? "Finalizar" : "Próxima"} <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

function MemoryGameSection() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const init = () => {
    const subset = [...glossaryData].sort(() => 0.5 - Math.random()).slice(0, 6);
    const deck = [];
    subset.forEach(i => {
      deck.push({ id: `${i.id}-term`, pid: i.id, txt: i.term, matched: false, flip: false });
      deck.push({ id: `${i.id}-trans`, pid: i.id, txt: i.translation, matched: false, flip: false });
    });
    setCards(deck.sort(() => 0.5 - Math.random()));
    setFlipped([]);
    setMatches(0);
    setMoves(0);
  };

  useEffect(init, []);

  const click = (idx) => {
    if (flipped.length === 2 || cards[idx].flip || cards[idx].matched) return;
    const newCards = [...cards];
    newCards[idx].flip = true;
    setCards(newCards);
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [f1, f2] = newFlipped;
      if (newCards[f1].pid === newCards[f2].pid) {
        setTimeout(() => {
          const mCards = [...newCards];
          mCards[f1].matched = true;
          mCards[f2].matched = true;
          setCards(mCards);
          setFlipped([]);
          setMatches(m => m + 1);
        }, 500);
      } else {
        setTimeout(() => {
          const rCards = [...newCards];
          rCards[f1].flip = false;
          rCards[f2].flip = false;
          setCards(rCards);
          setFlipped([]);
        }, 800);
      }
    }
  };

  if (matches === 6) return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl text-center">
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold">Excelente Memória!</h2>
      <p className="text-slate-500 my-4">Você completou o desafio em {moves} movimentos.</p>
      <button onClick={init} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
        <RotateCcw size={20} /> Jogar de Novo
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8 bg-white p-6 rounded-2xl border border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-800">Memorização Técnica</h2>
          <p className="text-sm text-slate-500">Combine o termo em inglês com o português.</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-slate-400 uppercase">Movimentos</div>
          <div className="text-3xl font-black text-blue-600">{moves}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <button key={c.id} onClick={() => click(i)} className={`aspect-square rounded-2xl font-bold text-xs sm:text-sm p-2 transition-all duration-300 shadow-sm ${c.flip || c.matched ? (c.matched ? 'bg-green-100 text-green-700 border-2 border-green-200' : 'bg-white border-2 border-blue-200') : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            {(c.flip || c.matched) ? c.txt : <Brain size={24} className="mx-auto opacity-40" />}
          </button>
        ))}
      </div>
    </div>
  );
}
