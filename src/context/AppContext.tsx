import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  logoUrl?: string;
}

export interface Photo {
  id: string;
  url: string;
}

interface AppState {
  products: Product[];
  collaborators: Collaborator[];
  photos: Photo[];
  goal: number;
}

interface AppContextType {
  state: AppState;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Omit<Product, 'id'>>) => void;
  removeProduct: (id: string) => void;
  addCollaborator: (collaborator: Omit<Collaborator, 'id'>) => void;
  removeCollaborator: (id: string) => void;
  addPhoto: (photo: Omit<Photo, 'id'>) => void;
  removePhoto: (id: string) => void;
  updateGoal: (goal: number) => void;
  totalValue: number;
}

const defaultState: AppState = {
  products: [
    { id: '1', name: 'Arroz (1kg)', price: 5.50, quantity: 1500 },
    { id: '2', name: 'Feijão (1kg)', price: 7.20, quantity: 583 }
  ],
  collaborators: [
    { id: '1', name: 'Supermercado Central', role: 'Parceiro Master' },
    { id: '2', name: 'João Silva', role: 'Coordenador Logística' }
  ],
  photos: [
    { id: '1', url: 'https://images.unsplash.com/photo-1593113565214-80af30e0081d?auto=format&fit=crop&q=80&w=800' },
    { id: '2', url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800' }
  ],
  goal: 20000
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('gincana_state');
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('gincana_state', JSON.stringify(state));
  }, [state]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setState(s => ({ ...s, products: [...s.products, { ...product, id: Date.now().toString() }] }));
  };

  const updateProduct = (id: string, updates: Partial<Omit<Product, 'id'>>) => {
    setState(s => ({
      ...s,
      products: s.products.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const removeProduct = (id: string) => {
    setState(s => ({ ...s, products: s.products.filter(p => p.id !== id) }));
  };

  const addCollaborator = (collaborator: Omit<Collaborator, 'id'>) => {
    setState(s => ({ ...s, collaborators: [...s.collaborators, { ...collaborator, id: Date.now().toString() }] }));
  };

  const removeCollaborator = (id: string) => {
    setState(s => ({ ...s, collaborators: s.collaborators.filter(c => c.id !== id) }));
  };

  const addPhoto = (photo: Omit<Photo, 'id'>) => {
    setState(s => ({ ...s, photos: [...s.photos, { ...photo, id: Date.now().toString() }] }));
  };

  const removePhoto = (id: string) => {
    setState(s => ({ ...s, photos: s.photos.filter(p => p.id !== id) }));
  };

  const updateGoal = (goal: number) => {
    setState(s => ({ ...s, goal }));
  };

  const totalValue = state.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);

  return (
    <AppContext.Provider value={{
      state, addProduct, updateProduct, removeProduct,
      addCollaborator, removeCollaborator, addPhoto, removePhoto, updateGoal, totalValue
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
