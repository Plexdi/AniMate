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
} from "@/components/ui/dropdown-menu"


export default function NavBar() {
  const router = useRouter();
  const user = useCurrentUser();
  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/register');
  };


  return (
    <div className="p-4 bg-gray-950 text-white flex justify-between">
        <div className="flex justify-center items-center gap-7">
            <h1 className="text-xl font-bold">AniMate</h1>
            <button>Browse</button>
            <button>Manga</button>
            <button>News</button>
        </div>

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
          <div className="flex justify-between gap-6 ">
            <Button variant="filled" onClick={handleSignup} size="md" className="bg-[#f8a56c]">
              Sign Up
            </Button>
            <Button variant="outlined" onClick={handleLogin}>
              Login
            </Button>
          </div>
      )}
    </div>
  );
}
