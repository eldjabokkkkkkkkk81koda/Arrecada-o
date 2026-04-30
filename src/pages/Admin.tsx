import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Target, Users, Camera, Shield, LogOut, Upload, Trash2, Plus, Edit2, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { state, addProduct, updateProduct, removeProduct, addCollaborator, removeCollaborator, addPhoto, removePhoto, updateGoal, totalValue, loading } = useAppContext();

  // Dialog states
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, quantity: 0 });
  const [newCollab, setNewCollab] = useState({ name: '', role: '', logoUrl: '' });
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'vitu777' && password === 'vitu777') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdmin', 'true');
      setError('');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdmin');
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex justify-center items-center text-white"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-vinho/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-vinho-light" />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold text-center mb-2">Painel Administrativo</h1>
          <p className="text-zinc-400 text-center mb-8">Acesso restrito à coordenação.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-400">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-vinho-light transition-colors"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-400">Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-vinho-light transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-vinho hover:bg-vinho-light text-white font-bold py-3 rounded-xl transition-colors mt-2"
            >
              Entrar
            </button>
          </form>
          <div className="mt-6 text-center">
             <Link to="/" className="text-zinc-500 hover:text-white text-sm">Voltar para o site principal</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white pb-20">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-vinho-light" />
            <span className="font-display font-bold text-xl uppercase tracking-tight">Admin | Os Vingadores</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Visualizar Site</Link>
            <button onClick={handleLogout} className="text-zinc-400 hover:text-red-400 p-2 rounded-full hover:bg-zinc-800 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex gap-3 text-emerald-500 text-sm">
          <Shield className="w-5 h-5 shrink-0" />
          <p>
            <strong>Conectado ao Supabase com Sucesso!</strong><br/>
            As alterações feitas aqui serão salvas no seu banco de dados na nuvem e aparecerão para todos os acessos.
          </p>
        </div>
        
        {/* Meta Section */}
        <section>
          <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-4">
             <div>
               <h2 className="text-2xl font-display font-bold">Meta de Arrecadação</h2>
               <p className="text-zinc-400 text-sm">Defina o valor da meta para a barra de progresso no site principal.</p>
             </div>
          </div>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-vinho/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-vinho-light" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Valor da Meta</p>
                {editingGoal ? (
                  <div className="flex gap-2 items-center mt-1">
                    <span className="text-lg">R$</span>
                    <input 
                      type="number"
                      value={goalInput}
                      onChange={e => setGoalInput(e.target.value)}
                      className="bg-black border border-zinc-800 rounded-lg px-3 py-1 focus:outline-none focus:border-vinho-light w-40"
                      autoFocus
                    />
                  </div>
                ) : (
                  <h3 className="text-3xl font-display font-bold">R$ {state.goal?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}</h3>
                )}
              </div>
            </div>
            <div>
              {editingGoal ? (
                <div className="flex gap-2">
                  <button onClick={() => setEditingGoal(false)} className="text-zinc-400 hover:text-white px-4 py-2">Cancelar</button>
                  <button 
                    onClick={() => {
                      updateGoal(parseFloat(goalInput) || 0);
                      setEditingGoal(false);
                    }}
                    className="bg-vinho hover:bg-vinho-light text-white px-6 py-2 rounded-xl font-bold transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setGoalInput(state.goal?.toString() || '');
                    setEditingGoal(true);
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" /> Alterar Meta
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Produtos Section */}
        <section>
          <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-4">
             <div>
               <h2 className="text-2xl font-display font-bold">Gerenciar Arrecadações</h2>
               <p className="text-zinc-400 text-sm">Controle de itens e cálculo de valor total.</p>
             </div>
          </div>
          
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-8">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-vinho-light" /> Adicionar Novo Item</h3>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
               <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-400">Nome do Produto</label>
                  <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl p-2.5 text-sm" placeholder="ex: Arroz 1kg" />
               </div>
               <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-400">Preço Unitário (R$)</label>
                  <input type="number" step="0.01" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} className="w-full bg-black border border-zinc-800 rounded-xl p-2.5 text-sm" placeholder="ex: 5.50" />
               </div>
               <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-400">Quantidade Arrecadada</label>
                  <input type="number" value={newProduct.quantity || ''} onChange={e => setNewProduct({...newProduct, quantity: parseInt(e.target.value, 10)})} className="w-full bg-black border border-zinc-800 rounded-xl p-2.5 text-sm" placeholder="ex: 100" />
               </div>
               <button 
                  onClick={() => {
                    if (newProduct.name) {
                      addProduct({ name: newProduct.name, price: newProduct.price || 0, quantity: newProduct.quantity || 0 });
                      setNewProduct({ name: '', price: 0, quantity: 0 });
                    }
                  }}
                  className="bg-zinc-800 hover:bg-vinho text-white rounded-xl py-2.5 px-4 font-medium transition-colors"
                >
                  Adicionar Item
               </button>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-sm">
                  <th className="pb-3 font-medium">Produto</th>
                  <th className="pb-3 font-medium">Preço (Unid)</th>
                  <th className="pb-3 font-medium">Quantidade</th>
                  <th className="pb-3 font-medium">Subtotal</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {state.products.map(product => (
                  <tr key={product.id} className="group">
                    <td className="py-4 font-medium">{product.name}</td>
                    <td className="py-4">
                      <input 
                         type="number" 
                         step="0.01"
                         className="bg-black border border-zinc-800 rounded-lg px-2 py-1 w-24 focus:border-vinho-light" 
                         value={product.price} 
                         onChange={e => updateProduct(product.id, { price: parseFloat(e.target.value) || 0 })} 
                      />
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          className="bg-black border border-zinc-800 rounded-lg px-2 py-1 w-24 focus:border-vinho-light" 
                          value={product.quantity} 
                          onChange={e => updateProduct(product.id, { quantity: parseInt(e.target.value, 10) || 0 })} 
                        />
                      </div>
                    </td>
                    <td className="py-4 text-emerald-400 font-medium">
                      R$ {(product.price * product.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 text-right">
                      <button onClick={() => removeProduct(product.id)} className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {state.products.length === 0 && (
                   <tr>
                     <td colSpan={5} className="py-8 text-center text-zinc-500 text-sm">Nenhum produto cadastrado.</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Colaboradores Section */}
        <section>
          <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-4">
             <div>
               <h2 className="text-2xl font-display font-bold">Colaboradores & Marcas</h2>
               <p className="text-zinc-400 text-sm">Gerencie patrocinadores e membros da equipe.</p>
             </div>
          </div>
          
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-8">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
               <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-400">Nome ou Marca</label>
                  <input type="text" value={newCollab.name} onChange={e => setNewCollab({...newCollab, name: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl p-2.5 text-sm" placeholder="ex: Padaria Pão Nosso" />
               </div>
               <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-400">Papel / Função</label>
                  <input type="text" value={newCollab.role} onChange={e => setNewCollab({...newCollab, role: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl p-2.5 text-sm" placeholder="ex: Patrocinador Master" />
               </div>
               <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-400">URL da Logo (Opcional)</label>
                  <input type="text" value={newCollab.logoUrl} onChange={e => setNewCollab({...newCollab, logoUrl: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl p-2.5 text-sm" placeholder="https://link-da-imagem.com/logo.png" />
               </div>
               <button 
                  onClick={() => {
                    if (newCollab.name) {
                      addCollaborator({ name: newCollab.name, role: newCollab.role, logoUrl: newCollab.logoUrl });
                      setNewCollab({ name: '', role: '', logoUrl: '' });
                    }
                  }}
                  className="bg-zinc-800 hover:bg-vinho text-white rounded-xl py-2.5 px-4 font-medium transition-colors"
                >
                  Adicionar Colaborador
               </button>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {state.collaborators.map(c => (
                <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    {c.logoUrl ? (
                      <img src={c.logoUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover shrink-0 bg-white" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-vinho/20 text-vinho-light flex items-center justify-center shrink-0">
                         <Target className="w-5 h-5" />
                      </div>
                    )}
                    <div className="truncate">
                      <div className="font-bold text-sm truncate">{c.name}</div>
                      <div className="text-xs text-zinc-400 truncate">{c.role}</div>
                    </div>
                  </div>
                  <button onClick={() => removeCollaborator(c.id)} className="text-zinc-600 hover:text-red-400 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
             ))}
          </div>
        </section>

        {/* Mural Section */}
        <section>
          <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-4">
             <div>
               <h2 className="text-2xl font-display font-bold">Mural de Fotos</h2>
               <p className="text-zinc-400 text-sm">Adicione fotos de entregas, coletas e equipe copiando o link da imagem.</p>
             </div>
          </div>
          
          <div className="flex gap-4 mb-8">
            <input 
              type="text" 
              value={newPhotoUrl} 
              onChange={e => setNewPhotoUrl(e.target.value)} 
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-vinho-light" 
              placeholder="Cole o link (URL) da foto (ex: https://unsplash.com/foto.jpg)" 
            />
            <button 
               onClick={() => {
                 if (newPhotoUrl) {
                   addPhoto({ url: newPhotoUrl });
                   setNewPhotoUrl('');
                 }
               }}
               className="bg-vinho hover:bg-vinho-light px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Adicionar Foto
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {state.photos.map(p => (
                <div key={p.id} className="relative group rounded-xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800">
                  <img src={p.url} alt="Mural" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => removePhoto(p.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
             ))}
          </div>
        </section>
        
      </main>
    </div>
  );
}
