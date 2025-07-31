import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, deleteUser } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { UserProfile } from '../types';

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  register: (email: string, password: string, name?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfileInfo: (data: Partial<UserProfile>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) { setUser(null); setLoading(false); return }
      const ref = doc(db, 'users', fbUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setUser(snap.data() as UserProfile);
      else {
        const newProfile: UserProfile = { uid: fbUser.uid, email: fbUser.email ?? '', name: fbUser.displayName ?? '' };
        await setDoc(ref, newProfile);
        setUser(newProfile);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const register = async (email: string, password: string, name?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    const profile: UserProfile = { uid: cred.user.uid, email, name: name ?? '' };
    await setDoc(doc(db, 'users', cred.user.uid), profile);
    setUser(profile);
  };

  const login = async (email: string, password: string) => { await signInWithEmailAndPassword(auth, email, password) };
  const logout = async () => { await signOut(auth) };

  const refreshProfile = async () => {
    if (!auth.currentUser) return;
    const snap = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (snap.exists()) setUser(snap.data() as UserProfile);
  };

  const updateProfileInfo = async (data: Partial<UserProfile>) => {
    if (!auth.currentUser) return;
    const ref = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(ref, data as any);
    await refreshProfile();
  };

  const deleteAccount = async () => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;
    await deleteDoc(doc(db, 'users', uid));
    await deleteUser(auth.currentUser);
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, register, login, logout, refreshProfile, updateProfileInfo, deleteAccount }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
