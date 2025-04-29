'use client';

import Button from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    router.push('/register');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9c87c] p-6">
      <div className="bg-[#1a1a1a] rounded-3xl p-8 flex gap-6 w-full max-w-6xl shadow-xl">
        {/* Left side - Form */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2 text-white">Welcome</h1>
          <p className="text-white mb-8">
            A brand new day is here. it's your day to shape.
            Sign in and get started on your projects.
          </p>

          <form onSubmit={handleEmailLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm text-white font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc123@gmail.com"
                className="w-full px-4 py-2 rounded-lg border text-white bg-[#1a1a1a] border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#f9c87c]"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                className="w-full px-4 py-2 rounded-lg border text-white bg-[#1a1a1a] border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#f9c87c]"
                required
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-[#f9c87c] hover:text-[#f8a56c]">
                  Forgot password
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f9c87c] text-white py-2 rounded-lg hover:bg-[#f8a56c] transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="relative flex items-center justify-center gap-4 my-4">
              <div className="h-[1px] flex-1 bg-gray-600"></div>
              <span className="text-gray-400 text-sm">or</span>
              <div className="h-[1px] flex-1 bg-gray-600"></div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-600 text-white hover:bg-gray-800 transition-colors"
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                Sign in with Google
              </button>
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-600 text-white hover:bg-gray-800 transition-colors"
              >
                <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
                Sign in with Facebook
              </button>
            </div>

            <p className="text-center text-gray-400">
              Don't have an account?{' '}
              <button type="button" onClick={handleSignup} className="text-[#f9c87c] hover:underline">
                Sign up
              </button>
            </p>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:block flex-1 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <Image
            src="https://i.pinimg.com/736x/99/f6/4c/99f64c6386159d44cb355b7625173569.jpg"
            alt="Anime background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-[#f9c87c]/20 p-8 rounded-xl w-3/4 h-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}