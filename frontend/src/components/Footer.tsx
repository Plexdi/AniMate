'use client'
export default function Footer() {
    return (
    <footer className="bg-gradient-to-t from-[#f9c87c] via-[#1a1a1a] to-black text-white px-10 pt-14 pb-8">
        <div className="text-center mb-10">
          <p className="text-lg font-semibold">Still looking for something to watch?</p>
          <p className="text-sm text-gray-300">Check out our full library</p>
          <button className="mt-4 px-6 py-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition rounded">
            VIEW ALL
          </button>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          <div>
            <h3 className="text-red-500 font-semibold mb-2">Explore</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Home</li>
              <li>Premium</li>
              <li>Anime</li>
              <li>Manga</li>
              <li>Music</li>
              <li>News</li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-red-500 font-semibold mb-2">Connect With Us</h3>
            <ul className="space-y-1 text-gray-300">
              <li>📺 YouTube</li>
              <li>📘 Facebook</li>
              <li>📸 Instagram</li>
              <li>🐦 Twitter</li>
              <li>🎵 TikTok</li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-red-500 font-semibold mb-2">Anime Ace</h3>
            <ul className="space-y-1 text-gray-300">
              <li>About</li>
              <li>Terms of Use</li>
              <li>Help Centre</li>
              <li>Privacy Policy</li>
              <li>Ad Choice</li>
              <li>Content Feedback</li>
              <li>FAQ</li>
              <li>Get the App</li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-red-500 font-semibold mb-2">Account</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Create Account</li>
              <li>Log In</li>
            </ul>
          </div>
        </div>
  
        <div className="mt-10 border-t border-gray-600 pt-4 text-sm flex flex-col md:flex-row justify-between items-center text-gray-400">
          <span>SONY PICTURES | @ <span className="text-red-500">Anime Ace</span></span>
          <span className="mt-2 md:mt-0">🌐 ENGLISH (US)</span>
        </div>
      </footer>
    );
  }
  