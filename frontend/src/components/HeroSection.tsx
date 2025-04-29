// HeroSection.tsx
'use client';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] text-white">
      {/* Background Image */}
      <img
        src="https://cdn.animenewsnetwork.com/thumbnails/max600x600/cms/news.8/221920/butler.jpg"
        alt="Black Butler"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay gradient (left side) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Black Butler</h1>
        <p className="text-lg mb-6">
          Ciel Phantomhive is the most powerful boy in all of England, but he bears the scars of unspeakable suffering...
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-[#f9c87c] hover:bg-[#f8a56c] text-white px-6 py-2 rounded font-semibold">
            ▶ View Details
          </button>
          <button className="border border-white px-4 py-2 rounded">🔖</button>
        </div>
      </div>
    </section>
  );
}
