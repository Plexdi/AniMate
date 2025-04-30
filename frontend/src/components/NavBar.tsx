'use client';

import useCurrentUser from "@/Hooks/useCurrentUser";
import Button from "./Button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const user = useCurrentUser();
  const [search, setSearch] = useState('');

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/register');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="p-4 bg-black text-white flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-7">
          <h1 className="text-xl font-bold">AniMate</h1>
          <button>Browse</button>
          <button>Manga</button>
          <button>News</button>
        </div>

        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anime..."
            className="px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#f8a56c] transition w-64"
          />
        </form>

        {user ? (
          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>Open</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Anime List</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Favourites</DropdownMenuItem>
                <DropdownMenuItem>Friends</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span>Welcome, {user.displayName || user.email}</span>
            <img
              src={user.photoURL || '/default-avatar.png'}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        ) : (
          <div className="flex gap-6">
            <Button variant="filled" onClick={handleSignup} size="md" className="bg-[#f8a56c]">
              Sign Up
            </Button>
            <Button variant="outlined" onClick={handleLogin}>
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
