import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen, Gamepad2, Volume2, Search, CheckCircle2,
  XCircle, RotateCcw, ChevronRight, Brain, Wrench,
  Star, Filter, Info, Award, BarChart3, RefreshCw,
  LogIn, UserPlus, KeyRound, Mail, Lock, User, ArrowRight, ArrowLeft, Loader2,
  Settings, Bell, Moon, Shield, Camera, Trash2, LogOut,
  Terminal, Cloud, Layout, ChevronDown, ChevronUp, Code2, Database, Send, Box
} from 'lucide-react';


// ==========================================
// BANCO DE DADOS (O motor do nosso App)
// ==========================================

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
  { id: 10, term: "Frontend", translation: "Interface", category: "Development", definition: "A parte visual de um software com a qual o usuário interage.", example: "The frontend uses Tailwind CSS for styling." },
  { id: 11, term: "API", translation: "Interface de Programação", category: "Development", definition: "Conjunto de rotinas e padrões de programação para acesso a um aplicativo de software.", example: "We use the Google Maps API to show the location." },
  { id: 12, term: "Sprint", translation: "Ciclo de desenvolvimento", category: "Product", definition: "Período de tempo fixo no qual um conjunto de tarefas deve ser concluído (Metodologia Ágil).", example: "We need to finish these features by the end of this sprint." },
  { id: 13, term: "DevOps", translation: "Desenvolvimento e Operações", category: "Infrastructure", definition: "Cultura e prática que une o desenvolvimento de software e a operação de infraestrutura.", example: "The DevOps team is setting up the CI/CD pipeline." },
  { id: 14, term: "UI (User Interface)", translation: "Interface do Usuário", category: "Product", definition: "A parte visual onde o usuário interage diretamente com o sistema (botões, telas, menus).", example: "The UI looks clean and modern." },
  { id: 15, term: "UX (User Experience)", translation: "Experiência do Usuário", category: "Product", definition: "Como o usuário se sente ao usar um sistema; a jornada e facilidade de uso.", example: "We need to improve the UX to reduce cart abandonment." },
  { id: 16, term: "Cache", translation: "Memória de acesso rápido", category: "Data", definition: "Armazenamento temporário de dados para que o sistema carregue mais rápido no futuro.", example: "Clear your browser cache to see the new changes." },
  { id: 17, term: "Refactoring", translation: "Refatoração", category: "Development", definition: "Processo de reescrever o código para melhorá-lo sem mudar o que ele faz visualmente.", example: "I am refactoring the old code to make it run faster." },
  { id: 18, term: "Repository", translation: "Repositório", category: "Data", definition: "Um local onde os arquivos e o histórico de versões do código são guardados.", example: "Clone the GitHub repository to your local machine." },
  { id: 19, term: "Endpoint", translation: "Ponto de acesso", category: "Development", definition: "Uma URL específica onde uma API pode ser acessada por um serviço externo.", example: "The frontend sends a request to the login endpoint." },
  { id: 20, term: "Payload", translation: "Carga de dados", category: "Data", definition: "Os dados reais que estão sendo enviados ou recebidos em uma requisição.", example: "The payload contains the user's email and password." },
  { id: 21, term: "Commit", translation: "Salvar alterações", category: "Development", definition: "Ato de salvar as modificações no sistema de controle de versão (Git).", example: "Don't forget to commit your changes before leaving." },
  { id: 22, term: "Pull Request", translation: "Pedido de integração", category: "Development", definition: "Solicitação para que o código novo seja revisado e integrado ao projeto principal.", example: "I opened a pull request with the new payment feature." },
  { id: 23, term: "Authentication", translation: "Autenticação", category: "Infrastructure", definition: "O processo de verificar quem o usuário é (Login e Senha).", example: "Authentication failed due to a wrong password." },
  { id: 24, term: "Authorization", translation: "Autorização", category: "Infrastructure", definition: "O processo de verificar o que o usuário tem permissão para fazer após logado.", example: "You don't have authorization to delete this file." },
  { id: 25, term: "Script", translation: "Roteiro de comandos", category: "Development", definition: "Um pequeno programa ou conjunto de instruções automatizadas.", example: "I wrote a Python script to automate the backup." }
];

const toolsData = [
  {
    id: 'ide',
    name: "IDE (VS Code, IntelliJ)",
    icon: <Code2 size={24} />,
    description: "Ambiente de Desenvolvimento Integrado. Onde você escreve, testa e depura seu código.",
    actionText: "Ver atalhos úteis",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    commands: [
      { cmd: "Ctrl + P", desc: "Abre a busca rápida de arquivos" },
      { cmd: "Ctrl + Shift + F", desc: "Busca um termo em todo o projeto" },
      { cmd: "Alt + Click", desc: "Adiciona múltiplos cursores na tela" }
    ]
  },
  {
    id: 'git',
    name: "Version Control (Git)",
    icon: <Terminal size={24} />,
    description: "Sistema que rastreia mudanças no código-fonte. O salva-vidas dos programadores.",
    actionText: "Ver comandos Git",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    commands: [
      { cmd: "git status", desc: "Mostra quais arquivos foram alterados" },
      { cmd: "git commit -m 'msg'", desc: "Salva suas alterações localmente" },
      { cmd: "git push", desc: "Envia suas alterações para a nuvem (GitHub)" }
    ]
  },
  {
    id: 'cloud',
    name: "Cloud Computing (AWS, Azure)",
    icon: <Cloud size={24} />,
    description: "Servidores, banco de dados e armazenamento acessados via internet, sem hardware físico.",
    actionText: "Ver conceitos Cloud",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    commands: [
      { cmd: "IaaS", desc: "Infraestrutura como Serviço (Máquinas virtuais)" },
      { cmd: "PaaS", desc: "Plataforma como Serviço (Hospedagem direta)" },
      { cmd: "SaaS", desc: "Software como Serviço (Google Drive, Netflix)" }
    ]
  },
  {
    id: 'docker',
    name: "Containers (Docker)",
    icon: <Box size={24} />,
    description: "Empacota o código e suas dependências para rodar igual em qualquer computador.",
    actionText: "Ver comandos Docker",
    color: "text-sky-600",
    bgColor: "bg-sky-100",
    commands: [
      { cmd: "docker ps", desc: "Lista todos os containers rodando no momento" },
      { cmd: "docker build -t img", desc: "Cria uma imagem a partir de um Dockerfile" },
      { cmd: "docker-compose up", desc: "Sobe vários containers interligados de uma vez" }
    ]
  },
  {
    id: 'postman',
    name: "API Testing (Postman)",
    icon: <Send size={24} />,
    description: "Ferramenta para criar, testar e documentar requisições para APIs.",
    actionText: "Ver métodos HTTP",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    commands: [
      { cmd: "GET", desc: "Pede e busca dados do servidor (Ex: buscar um usuário)" },
      { cmd: "POST", desc: "Envia novos dados para o servidor (Ex: criar um cadastro)" },
      { cmd: "DELETE", desc: "Remove dados do servidor (Ex: apagar uma foto)" }
    ]
  },
  {
    id: 'figma',
    name: "Design & UI (Figma)",
    icon: <Layout size={24} />,
    description: "Editor de design de interfaces e prototipagem colaborativo em tempo real.",
    actionText: "Ver atalhos de Design",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    commands: [
      { cmd: "Shift + A", desc: "Cria um Auto Layout (Flexbox para designers)" },
      { cmd: "Ctrl + Alt + K", desc: "Transforma um elemento em um Componente reutilizável" },
      { cmd: "Espaço + Drag", desc: "Move a visualização pelo canvas livremente" }
    ]
  }
];


// ==========================================
// GERENCIADOR DE TELAS (ROTEAMENTO)
// ==========================================

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  // Controle da Splash Screen: avança automaticamente após 2.5s
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <div className="font-sans text-slate-800">
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'onboarding' && <OnboardingScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'login' && <LoginScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'register' && <RegisterScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'recovery' && <RecoveryScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'main' && <MainApp onLogout={() => setCurrentScreen('onboarding')} />}
    </div>
  );
}

// ==========================================
// NOVAS TELAS: AUTENTICAÇÃO E BOAS VINDAS
// ==========================================

function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-indigo-900 flex flex-col items-center justify-center text-white">
      <div className="bg-white text-blue-700 p-6 rounded-3xl shadow-2xl mb-6 animate-bounce">
        <BookOpen size={64} />
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight mb-2">TechLingo</h1>
      <p className="text-blue-200 font-medium text-lg flex items-center gap-2">
        <Loader2 className="animate-spin" size={18} /> Carregando sistema...
      </p>
    </div>
  );
}

function OnboardingScreen({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-10 text-center text-white">
          <Brain size={64} className="mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-black mb-2">Aprenda Rápido</h2>
          <p className="text-blue-100">Domine o vocabulário técnico de TI com glossários, quizzes e jogos de memória.</p>
        </div>
        <div className="p-8 space-y-4">
          <button onClick={() => onNavigate('login')} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
            <LogIn size={20} /> Entrar / Cadastrar
          </button>
          <button onClick={() => onNavigate('main')} className="w-full bg-slate-100 text-slate-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
            Ignorar por enquanto <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full max-w-md">
        <button onClick={() => onNavigate('onboarding')} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
          <ArrowLeft size={20} /> Voltar
        </button>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-800">Bem-vindo de volta</h2>
            <p className="text-slate-500 mt-2">Acesse sua conta para salvar seu progresso.</p>
          </div>
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onNavigate('main'); }}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="email" required className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="dev@techlingo.com" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">Senha</label>
                <button type="button" onClick={() => onNavigate('recovery')} className="text-sm font-bold text-blue-600 hover:underline">Esqueceu a senha?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="password" required className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md">
              <LogIn size={20} /> Entrar no App
            </button>
          </form>
          <div className="mt-8 text-center text-sm font-medium text-slate-500">
            Não tem uma conta? <button onClick={() => onNavigate('register')} className="text-blue-600 font-bold hover:underline ml-1">Cadastre-se</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterScreen({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full max-w-md">
        <button onClick={() => onNavigate('login')} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
          <ArrowLeft size={20} /> Voltar para o Login
        </button>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-800">Criar Conta</h2>
            <p className="text-slate-500 mt-2">Junte-se a nós e domine o inglês de TI.</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate('main'); }}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" required className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all" placeholder="Usuário Desenvolvedor" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="email" required className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all" placeholder="dev@techlingo.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="password" required className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="w-full bg-slate-800 text-white py-4 mt-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-md">
              <UserPlus size={20} /> Finalizar Cadastro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function RecoveryScreen({ onNavigate }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full max-w-md">
        <button onClick={() => onNavigate('login')} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
          <ArrowLeft size={20} /> Voltar para o Login
        </button>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
              <KeyRound size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Recuperar Senha</h2>
            <p className="text-slate-500 mt-2">Enviaremos um link para você redefinir sua senha de acesso.</p>
          </div>
          {sent ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-center font-medium mb-6">
              Link de recuperação enviado com sucesso! Verifique sua caixa de entrada e spam.
            </div>
          ) : (
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Seu E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input type="email" required className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all" placeholder="dev@techlingo.com" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md">
                Enviar Link de Recuperação
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL (Onde o app interno vive)
// ==========================================

function MainApp({ onLogout }) {
  const [activeTab, setActiveTab] = useState('glossary');
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12 animate-in fade-in duration-500">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-extrabold flex items-center gap-3 tracking-tight">
                <span className="bg-white text-blue-700 p-2 rounded-xl shadow-sm">
                  <BookOpen size={32} />
                </span>
                TechLingo <span className="text-blue-200 font-light text-xl">Pro</span>
              </h1>
              <p className="mt-2 text-blue-100 font-medium opacity-90">Plataforma Dinâmica de Inglês Instrumental</p>
            </div>

            {/* Menu Superior: Perfil, Ajustes e Sair */}
            <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-1 sm:gap-2 font-bold px-3 py-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-white/20 text-white shadow-inner' : 'text-blue-200 hover:text-white hover:bg-white/10'}`} title="Perfil">
                <User size={20} /> <span className="hidden sm:inline">Perfil</span>
              </button>
              <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-1 sm:gap-2 font-bold px-3 py-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-white/20 text-white shadow-inner' : 'text-blue-200 hover:text-white hover:bg-white/10'}`} title="Ajustes">
                <Settings size={20} /> <span className="hidden sm:inline">Ajustes</span>
              </button>
              <div className="w-px h-6 bg-blue-400/50 mx-1 sm:mx-2"></div>
              <button onClick={onLogout} className="flex text-blue-200 hover:text-red-100 items-center gap-1 sm:gap-2 font-bold px-3 py-2 rounded-lg hover:bg-red-500/40 transition-colors" title="Sair">
                <LogOut size={20} /> <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="max-w-6xl mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-2 border border-slate-200 flex flex-wrap gap-2">
          <NavButton active={activeTab === 'glossary'} onClick={() => setActiveTab('glossary')} icon={<BookOpen size={18} />} label="Glossário" />
          <NavButton active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon={<Wrench size={18} />} label="Ferramentas" />
          <NavButton active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<Gamepad2 size={18} />} label="Quiz Aleatório" />
          <NavButton active={activeTab === 'game'} onClick={() => setActiveTab('game')} icon={<Brain size={18} />} label="Memória" />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {activeTab === 'glossary' && <GlossarySection favorites={favorites} toggleFavorite={toggleFavorite} />}
        {activeTab === 'tools' && <ToolsSection />}
        {activeTab === 'quiz' && <DynamicQuizSection />}
        {activeTab === 'game' && <MemoryGameSection />}
        {activeTab === 'profile' && <ProfileSection favoritesCount={favorites.length} />}
        {activeTab === 'settings' && <SettingsSection onLogout={onLogout} />}
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

// ==========================================
// SEÇÃO: GLOSSÁRIO
// ==========================================

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

// ==========================================
// SEÇÃO: FERRAMENTAS (Agora Interativa)
// ==========================================

function ToolsSection() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8 text-center sm:text-left bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-800 flex items-center justify-center sm:justify-start gap-2">
          <Wrench className="text-blue-600" /> Guia Prático de Bolso
        </h2>
        <p className="text-slate-500 mt-2">
          Não sabe como usar? Clique em uma ferramenta abaixo para descobrir seus comandos e atalhos mais utilizados no dia a dia.
        </p>
      </div>

      <div className="grid gap-4">
        {toolsData.map((tool) => {
          const isExpanded = expanded === tool.id;

          return (
            <div key={tool.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Cabeçalho Clicável */}
              <button
                onClick={() => toggleExpand(tool.id)}
                className="w-full p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center text-left focus:outline-none"
              >
                <div className={`${tool.bgColor} ${tool.color} p-4 rounded-xl shrink-0`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-slate-800">{tool.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{tool.description}</p>
                </div>
                <div className={`flex items-center gap-2 text-sm font-bold mt-2 sm:mt-0 transition-colors ${isExpanded ? 'text-blue-600' : 'text-slate-400'}`}>
                  {tool.actionText}
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {/* Área Expandida (Comandos) */}
              <div
                className={`transition-all duration-300 ease-in-out bg-slate-50 ${isExpanded ? 'max-h-[500px] border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <div className="p-6 grid gap-3">
                  {tool.commands.map((cmd, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-4 p-3 bg-white border border-slate-200 rounded-lg">
                      <span className="font-mono text-sm font-bold bg-slate-800 text-green-400 px-3 py-1 rounded-md min-w-[140px] text-center">
                        {cmd.cmd}
                      </span>
                      <span className="text-slate-600 text-sm font-medium">
                        {cmd.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// SEÇÃO: QUIZ DINÂMICO
// ==========================================

function DynamicQuizSection() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  // Função para gerar 10 perguntas aleatórias baseadas no glossário
  const generateQuiz = () => {
    const shuffled = [...glossaryData].sort(() => 0.5 - Math.random());
    const selectedTerms = shuffled.slice(0, 10); // Quiz agora com 10 perguntas

    const newQuestions = selectedTerms.map(term => {
      // Pega 3 traduções erradas aleatórias
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

  if (questions.length === 0) return <div className="text-center font-bold text-slate-500 py-10">Carregando quiz...</div>;

  if (finished) return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl text-center">
      <Award size={64} className="mx-auto text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold">Resultado Final</h2>
      <p className="text-4xl font-black text-blue-600 my-4">{score} / {questions.length}</p>
      <div className="bg-blue-50 text-blue-700 p-4 rounded-xl font-medium mb-6">
        {score >= 8 ? "Fantástico! Você é um expert." : score >= 5 ? "Bom trabalho! Continue praticando." : "Você consegue melhorar! Tente novamente."}
      </div>
      <button onClick={generateQuiz} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
        <RefreshCw size={20} /> Novo Quiz Aleatório
      </button>
    </div>
  );

  const q = questions[current];
  const progressPercent = ((current) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-200">

      {/* Barra de Progresso */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="mb-6 flex justify-between items-center text-xs font-bold text-slate-400">
        <span>QUESTÃO {current + 1} DE {questions.length}</span>
        <span className="text-blue-500 flex items-center gap-1"><Gamepad2 size={14} /> DINÂMICO</span>
      </div>
      <h3 className="text-2xl font-bold mb-8 text-slate-800">{q.question}</h3>
      <div className="grid gap-3 mb-8">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctAnswer;
          const isSelected = i === selected;
          let btnClass = "border-slate-200 hover:bg-slate-50 text-slate-700";
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
        <button onClick={next} className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors">
          {current + 1 === questions.length ? "Finalizar" : "Próxima"} <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

// ==========================================
// SEÇÃO: JOGO DA MEMÓRIA 
// ==========================================

function MemoryGameSection() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const init = () => {
    // Escolhe 8 termos aleatórios do glossário (Total de 16 cartas)
    const subset = [...glossaryData].sort(() => 0.5 - Math.random()).slice(0, 8);
    const deck = [];
    subset.forEach(i => {
      deck.push({ id: `${i.id}-term`, pid: i.id, txt: i.term, matched: false, flip: false });
      deck.push({ id: `${i.id}-trans`, pid: i.id, txt: i.translation, matched: false, flip: false });
    });
    setCards(deck.sort(() => 0.5 - Math.random()));
    setFlipped([]); setMatches(0); setMoves(0);
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
          mCards[f1].matched = true; mCards[f2].matched = true;
          setCards(mCards); setFlipped([]); setMatches(m => m + 1);
        }, 500);
      } else {
        setTimeout(() => {
          const rCards = [...newCards];
          rCards[f1].flip = false; rCards[f2].flip = false;
          setCards(rCards); setFlipped([]);
        }, 800);
      }
    }
  };

  if (matches === 8) return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl text-center">
      <div className="text-5xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-slate-800">Excelente Memória!</h2>
      <p className="text-slate-500 my-4">Você completou o desafio Master em <strong className="text-blue-600">{moves}</strong> movimentos.</p>
      <button onClick={init} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
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
      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((c, i) => (
          <button key={c.id} onClick={() => click(i)} className={`aspect-square rounded-2xl font-bold text-xs sm:text-sm p-1 sm:p-2 transition-all duration-300 shadow-sm ${c.flip || c.matched ? (c.matched ? 'bg-green-100 text-green-700 border-2 border-green-200' : 'bg-white text-slate-800 border-2 border-blue-200') : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]'}`}>
            {(c.flip || c.matched) ? c.txt : <Brain size={20} className="mx-auto opacity-40 sm:size-6" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// SEÇÃO: PERFIL 
// ==========================================

function ProfileSection({ favoritesCount }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="relative">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border-4 border-white shadow-lg">
            <User size={48} />
          </div>
          <button className="absolute bottom-0 right-0 bg-slate-800 text-white p-2 rounded-full hover:bg-slate-700 transition-colors shadow-md">
            <Camera size={14} />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-800">Usuário Desenvolvedor</h2>
          <p className="text-slate-500 font-medium">dev@techlingo.com</p>
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold border border-blue-100">Nível: Pleno</span>
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-bold border border-green-100 flex items-center gap-1">
              <Star size={14} /> Pro Member
            </span>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Estatísticas de Aprendizado</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
          <Star className="mx-auto text-yellow-500 mb-2" size={28} fill="currentColor" />
          <div className="text-3xl font-black text-slate-800">{favoritesCount}</div>
          <div className="text-sm font-bold text-slate-400 uppercase mt-1">Termos Favoritos</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
          <Award className="mx-auto text-blue-500 mb-2" size={28} />
          <div className="text-3xl font-black text-slate-800">12</div>
          <div className="text-sm font-bold text-slate-400 uppercase mt-1">Quizzes Completos</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
          <Brain className="mx-auto text-purple-500 mb-2" size={28} />
          <div className="text-3xl font-black text-slate-800">8</div>
          <div className="text-sm font-bold text-slate-400 uppercase mt-1">Jogos Vencidos</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SEÇÃO: CONFIGURAÇÕES
// ==========================================

function SettingsSection({ onLogout }) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-100">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <Settings size={24} className="text-blue-600" /> Configurações do Aplicativo
        </h2>
        <p className="text-slate-500 mt-2">Ajuste suas preferências de uso e gerencie sua conta.</p>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Preferências</h3>
          <div className="space-y-3">
            <SettingToggle icon={<Bell />} label="Notificações Push" description="Receba lembretes diários para estudar." defaultChecked={true} />
            <SettingToggle icon={<Moon />} label="Modo Escuro" description="Altera a aparência do app para cores escuras." defaultChecked={false} />
            <SettingToggle icon={<Volume2 />} label="Reprodução Automática" description="Tocar a pronúncia automaticamente no Quiz." defaultChecked={true} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Conta & Privacidade</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-slate-600"><Shield size={20} /></div>
                <div>
                  <div className="font-bold text-slate-800">Alterar Senha</div>
                  <div className="text-xs text-slate-500">Atualize sua credencial de acesso de forma segura</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 transition-all text-left group">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg text-red-600 group-hover:scale-110 transition-transform"><Trash2 size={20} /></div>
                <div>
                  <div className="font-bold text-red-700">Excluir Conta</div>
                  <div className="text-xs text-red-500">Ação permanente e irreversível</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button onClick={onLogout} className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-slate-800 text-white hover:bg-slate-900 transition-all shadow-md">
            <LogOut size={20} /> Sair do Aplicativo
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ icon, label, description, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${checked ? 'border-blue-200 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}
      onClick={() => setChecked(!checked)}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-colors ${checked ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <div>
          <div className="font-bold text-slate-800">{label}</div>
          <div className="text-xs text-slate-500">{description}</div>
        </div>
      </div>
      <div className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${checked ? 'bg-blue-600' : 'bg-slate-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}
