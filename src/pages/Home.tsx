import { motion } from 'motion/react';
import { Target, Users, Camera, Heart, Flame, Award, Zap, Shield, TrendingUp, Lock, Rocket } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { state, totalValue, loading } = useAppContext();
  const PHOTOS = state.photos;
  const COLLABORATORS = state.collaborators;

  if (loading) {
    return <div className="min-h-screen bg-black flex justify-center items-center text-white"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-vinho" />
            <span className="font-display font-bold text-xl text-white uppercase tracking-tight">Os Vingadores</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#placar" className="text-sm font-medium text-zinc-400 hover:text-vinho-light transition-colors">Placar</a>
            <a href="#colaboradores" className="text-sm font-medium text-zinc-400 hover:text-vinho-light transition-colors">Colaboradores</a>
            <a href="#mural" className="text-sm font-medium text-zinc-400 hover:text-vinho-light transition-colors">Mural</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=2560')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vinho/20 text-vinho-light text-sm font-bold mb-6 tracking-widest uppercase border border-vinho/30">
                <Flame className="w-4 h-4" />
                Paz e Justiça
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase drop-shadow-lg">
                Equipe <br />
                <span className="text-vinho-light">
                  Os Vingadores
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 font-medium">
                Acompanhe o impacto da nossa equipe na arrecadação de alimentos. 
                Juntos pelo Objetivo de Desenvolvimento Sustentável #2.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Score Section (Top Secret Quantity) */}
        <section id="placar" className="py-20 -mt-24 relative z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-3xl shadow-xl border border-zinc-800 overflow-hidden"
            >
              <div className="bg-vinho p-8 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Lock className="w-24 h-24" />
                </div>
                <h2 className="text-sm font-bold tracking-widest uppercase text-white/80 mb-2 relative z-10">Valor Total Arrecadado</h2>
                <div className="font-display text-6xl md:text-8xl font-bold mb-4 relative z-10 flex justify-center items-baseline gap-2">
                  <span className="text-3xl md:text-4xl text-white/60">R$</span>
                  {Math.floor(totalValue).toLocaleString('pt-BR')}
                  <span className="text-3xl md:text-4xl text-white/60">,{(totalValue % 1).toFixed(2).substring(2)}</span>
                </div>
                <p className="text-white/80 text-sm max-w-md mx-auto relative z-10">
                  O peso exato e o tipo de alimentos são segredo estratégico da equipe até o dia da pesagem oficial!
                </p>
              </div>

              <div className="bg-zinc-900 border-t border-zinc-800 p-8">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-vinho-light" />
                      Progresso da Meta
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-1">Meta Oficial</p>
                    <p className="text-2xl font-display font-bold text-vinho-light">
                      R$ {state.goal?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                    </p>
                  </div>
                </div>

                <div className="relative h-6 bg-black rounded-full overflow-hidden border border-zinc-800 mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((totalValue / (state.goal || 1)) * 100, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-vinho-dark via-vinho to-vinho-light"
                  />
                </div>
                
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-zinc-400">0%</span>
                  <span className="text-vinho-light">{((totalValue / (state.goal || 1)) * 100).toFixed(1)}% Alcançado</span>
                  <span className="text-zinc-400">100%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Collaborators Panel */}
        <section id="colaboradores" className="py-20 bg-black border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-white mb-4">Painel de Colaboradores</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Nada disso seria possível sem a nossa rede de apoio. Conheça as pessoas e empresas que estão fazendo a diferença.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COLLABORATORS.map((colab) => (
                <motion.div
                  key={colab.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-sm hover:border-vinho/50 hover:bg-zinc-900 transition-all flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-vinho/20 text-vinho-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform overflow-hidden">
                    {colab.logoUrl ? (
                      <img src={colab.logoUrl} alt={colab.name} className="w-full h-full object-cover bg-white" />
                    ) : (
                      <Target className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">{colab.name}</h3>
                    <p className="text-sm text-zinc-400 mb-2 truncate">{colab.role}</p>
                    <div className="inline-flex items-center text-xs font-semibold text-vinho-light bg-vinho/10 border border-vinho/20 px-2 py-1 rounded">
                      <Shield className="w-3 h-3 mr-1" /> Parceiro Ativo
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section id="mural" className="py-20 bg-[#0a0a0a] border-t border-zinc-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="font-display text-4xl font-bold mb-4 flex items-center gap-3">
                  <Camera className="w-8 h-8 text-vinho-light" />
                  Mural de Ação
                </h2>
                <p className="text-zinc-400 max-w-xl">
                  Registros da nossa equipe nas ruas, mercados e triagens. Cada foto é um passo em direção a um mundo sem fome (ODS 2).
                </p>
              </div>
              <button className="px-6 py-3 bg-vinho hover:bg-vinho-light text-white font-semibold rounded-full transition-colors flex items-center gap-2 whitespace-nowrap">
                Enviar Foto <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {PHOTOS.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 3) * 0.1 }}
                  className="break-inside-avoid"
                >
                  <img 
                    src={photo.url} 
                    alt={`Ação da equipe ${idx + 1}`} 
                    className="w-full rounded-2xl object-cover border border-zinc-800"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 text-center border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-vinho-light" />
            <span className="font-display font-bold text-xl text-white uppercase tracking-widest">Os Vingadores</span>
          </div>
          <p className="text-zinc-500 text-sm">
            Focado nos Objetivos de Desenvolvimento Sustentável.<br/>
            Nenhuma informação estratégica da gincana foi vazada na criação desta página.
          </p>
        </div>
      </footer>
    </div>
  );
}
