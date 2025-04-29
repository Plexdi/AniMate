'use client';

import Button from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '@/firebase/config';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { signup, formatAuthError } from '@/lib/auth';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signup(formData.email, formData.password);
      try{
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: "POST", 
            headers: {
                'Content-Type': "application/json"
            }
        })
      } catch (err){
        console.log(err)
      }
      router.push('/dashboard');
    } catch (error: any) {
      setError(formatAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      setError(formatAuthError(error));
    }
  };

  const handleFacebookSignup = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      setError(formatAuthError(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9c87c] p-6">
      <div className="bg-[#1a1a1a] rounded-3xl p-8 flex gap-6 w-full max-w-6xl shadow-xl">
        {/* Left side - Form add more later */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2 text-white">Create Account</h1>
          <p className="text-white mb-8">
            Join our community today and start your journey with us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-2 rounded-lg border text-white bg-[#1a1a1a] border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#f9c87c]"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-white mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-2 rounded-lg border text-white bg-[#1a1a1a] border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#f9c87c]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className="w-full px-4 py-2 rounded-lg border text-white bg-[#1a1a1a] border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#f9c87c]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg border text-white bg-[#1a1a1a] border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#f9c87c]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 rounded-lg border text-white bg-[#1a1a1a] border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#f9c87c]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f9c87c] text-white py-2 rounded-lg hover:bg-[#f8a56c] transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="relative flex items-center justify-center gap-4 my-4">
              <div className="h-[1px] flex-1 bg-gray-600"></div>
              <span className="text-gray-400 text-sm">or</span>
              <div className="h-[1px] flex-1 bg-gray-600"></div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-600 text-white hover:bg-gray-800 transition-colors"
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                Sign up with Google
              </button>
              <button
                type="button"
                onClick={handleFacebookSignup}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-600 text-white hover:bg-gray-800 transition-colors"
              >
                <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
                Sign up with Facebook
              </button>
            </div>

            <p className="text-center text-gray-400">
              Already have an account?{' '}
              <button type="button" onClick={handleLogin} className="text-[#f9c87c] hover:underline">
                Sign in
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