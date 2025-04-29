'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/register');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] bg-[#f9c87c]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] gap-8 bg-[#f9c87c]">
      <h1 className="text-4xl font-bold text-white">
        {user ? `Welcome back, ${user.email}` : 'Welcome to Animate'}
      </h1>
      
      <div className="flex gap-4">
        {user ? (
          <>
            <Button variant="filled" onClick={() => router.push('/dashboard')}>
              Go to Dashboard
            </Button>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="filled" onClick={handleSignup}>
              Sign Up
            </Button>
            <Button variant="outlined" onClick={handleLogin}>
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
