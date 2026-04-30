import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

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
  loading: boolean;
}

const defaultState: AppState = {
  products: [],
  collaborators: [],
  photos: [],
  goal: 20000
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar dados iniciais
    const fetchData = async () => {
      const [productsRes, collabsRes, photosRes, settingsRes] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('collaborators').select('*'),
        supabase.from('photos').select('*'),
        supabase.from('settings').select('*').eq('id', 'general').single()
      ]);

      setState(s => ({
        ...s,
        products: productsRes.data || [],
        collaborators: collabsRes.data || [],
        photos: photosRes.data || [],
        goal: settingsRes.data?.goal || 20000
      }));
      setLoading(false);
    };

    fetchData();

    // Inscrever para atualizações em tempo real
    const productsSub = supabase.channel('products-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, payload => {
        if (payload.eventType === 'INSERT') {
          setState(s => ({ ...s, products: [...s.products, payload.new as Product] }));
        } else if (payload.eventType === 'UPDATE') {
          setState(s => ({ ...s, products: s.products.map(p => p.id === payload.new.id ? payload.new as Product : p) }));
        } else if (payload.eventType === 'DELETE') {
          setState(s => ({ ...s, products: s.products.filter(p => p.id !== payload.old.id) }));
        }
      }).subscribe();

    const collabsSub = supabase.channel('collaborators-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'collaborators' }, payload => {
        if (payload.eventType === 'INSERT') {
          setState(s => ({ ...s, collaborators: [...s.collaborators, payload.new as Collaborator] }));
        } else if (payload.eventType === 'UPDATE') {
          setState(s => ({ ...s, collaborators: s.collaborators.map(c => c.id === payload.new.id ? payload.new as Collaborator : c) }));
        } else if (payload.eventType === 'DELETE') {
          setState(s => ({ ...s, collaborators: s.collaborators.filter(c => c.id !== payload.old.id) }));
        }
      }).subscribe();

    const photosSub = supabase.channel('photos-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'photos' }, payload => {
        if (payload.eventType === 'INSERT') {
          setState(s => ({ ...s, photos: [...s.photos, payload.new as Photo] }));
        } else if (payload.eventType === 'DELETE') {
          setState(s => ({ ...s, photos: s.photos.filter(p => p.id !== payload.old.id) }));
        }
      }).subscribe();

    const settingsSub = supabase.channel('settings-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, payload => {
        if (payload.eventType === 'UPDATE' && payload.new.id === 'general') {
          setState(s => ({ ...s, goal: payload.new.goal }));
        }
      }).subscribe();

    return () => {
      supabase.removeChannel(productsSub);
      supabase.removeChannel(collabsSub);
      supabase.removeChannel(photosSub);
      supabase.removeChannel(settingsSub);
    };
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const { data, error } = await supabase.from('products').insert([product]).select().single();
    if (error) { console.error(error); alert("Erro ao salvar: " + error.message); }
    if (data) setState(s => ({ ...s, products: [...s.products, data] }));
  };

  const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id'>>) => {
    const { error } = await supabase.from('products').update(updates).eq('id', id);
    if (error) { console.error(error); alert("Erro ao atualizar: " + error.message); }
  };

  const removeProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) { console.error(error); alert("Erro ao deletar: " + error.message); }
  };

  const addCollaborator = async (collaborator: Omit<Collaborator, 'id'>) => {
    const { data, error } = await supabase.from('collaborators').insert([collaborator]).select().single();
    if (error) { console.error(error); alert("Erro ao salvar: " + error.message); }
    if (data) setState(s => ({ ...s, collaborators: [...s.collaborators, data] }));
  };

  const removeCollaborator = async (id: string) => {
    const { error } = await supabase.from('collaborators').delete().eq('id', id);
    if (error) { console.error(error); alert("Erro ao deletar: " + error.message); }
  };

  const addPhoto = async (photo: Omit<Photo, 'id'>) => {
    const { data, error } = await supabase.from('photos').insert([photo]).select().single();
    if (error) { console.error(error); alert("Erro ao salvar: " + error.message); }
    if (data) setState(s => ({ ...s, photos: [...s.photos, data] }));
  };

  const removePhoto = async (id: string) => {
    const { error } = await supabase.from('photos').delete().eq('id', id);
    if (error) { console.error(error); alert("Erro ao deletar: " + error.message); }
  };

  const updateGoal = async (goal: number) => {
     // UPSERT no Supabase
     const { data, error } = await supabase.from('settings').upsert({ id: 'general', goal }).select().single();
     if (error) { console.error(error); alert("Erro ao salvar meta: " + error.message); }
     if (data) setState(s => ({ ...s, goal: data.goal }));
  };

  const totalValue = state.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);

  return (
    <AppContext.Provider value={{
      state, addProduct, updateProduct, removeProduct,
      addCollaborator, removeCollaborator, addPhoto, removePhoto, updateGoal, totalValue,
      loading
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
