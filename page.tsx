"use client";
import { useClerk } from "@clerk/nextjs";
export default function Page() {
  const { openSignIn } = useClerk();
  const handleSignIn = (role: string) => {
    openSignIn({ 
      redirectUrl: `/${role}`
    });
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono overflow-hidden relative">
      {/* Enhanced Web3 Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial Gradient Pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.25)_0%,_transparent_70%)] animate-pulse-slow"></div>
        {/* Hex Pattern Float */}
        <div className="absolute inset-0 opacity-15 bg-[url('/hex-pattern.png')] animate-float"></div>
        {/* Subtle Glitch Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(34,211,238,0.05)_25%,_transparent_25%,_transparent_75%,_rgba(79,70,229,0.05)_75%)] bg-size-4 animate-glitch"></div>
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-cyan-400 rounded-full opacity-20 animate-particle"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
        {/* Dynamic Web3 Grid */}
        <div className="absolute inset-0 bg-[url('/web3-grid.png')] opacity-10 animate-slow-scroll"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-24 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-indigo-950/60 to-transparent animate-gradient-shift"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15)_0%,_transparent_60%)] animate-pulse-slow"></div>
          <div className="container mx-auto px-6 relative">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-500 mb-6 animate-text-glow tracking-tight">
              About OnlyAds
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed relative">
              <span className="before:absolute before:-inset-1 before:bg-gradient-to-r before:from-indigo-500/20 before:to-purple-500/20 before:blur-xl before:-z-10 animate-pulse-slow">
                A Web3 revolution in advertising fueled by authentic human reactions.
              </span>
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <div className="h-1 w-16 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full animate-expand"></div>
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-expand delay-200"></div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20 px-6 max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.2)_0%,_transparent_80%)] animate-spin-slow"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(79,70,229,0.1)_50%,_transparent_50%)] animate-slide"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-10 text-center relative z-10 animate-float-up drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
            Our Web3 Mission
          </h2>
          <div className="flex justify-center items-center">
            <p className="text-lg md:text-xl text-gray-200 leading-loose bg-gradient-to-br from-gray-900/70 to-indigo-950/70 p-8 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-500 max-w-2xl">
              We’re forging a decentralized future where advertising evolves beyond limits, powered by blockchain’s unyielding transparency and innovation...
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(79,70,229,0.15)_0%,_transparent_70%)] animate-pulse-slow"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-300 text-center mb-16 z-10 relative drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] animate-text-glow">
            Web3-Powered Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto relative">
            {[
              { title: "Authentic Reactions", desc: "Real-time emotions etched on-chain, redefining trust." },
              { title: "NFT Rewards", desc: "Mint exclusive tokens for your Web3 journey." },
              { title: "Blockchain Insights", desc: "Immutable data shaping a fearless ad ecosystem." },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-900/80 to-indigo-950/80 rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.2)] border border-indigo-900/40 hover:border-cyan-400/70 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.2)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-xl font-bold text-cyan-300 mb-3 relative z-10 group-hover:text-cyan-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 relative z-10">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 text-center relative">
          <div className="absolute inset-0 bg-[url('/web3-grid.png')] opacity-15 animate-slow-scroll"></div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(34,211,238,0.1)_25%,_transparent_25%,_transparent_75%,_rgba(79,70,229,0.1)_75%)] animate-glitch-slow"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-10 animate-text-glow">
            Ignite the Web3 Revolution
          </h2>
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => handleSignIn('products')}
              className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] hover:scale-110 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Join as User</span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 animate-pulse"></div>
            </button>
            <button
              onClick={() => handleSignIn('companyReg')}
              className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:text-white hover:border-cyan-300 hover:scale-110 transition-all duration-300 relative group"
            >
              <span className="relative z-10">Register Company</span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.2)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 animate-pulse"></div>
            </button>
          </div>
        </section>
      </main>
      {/* Custom CSS for Animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }
        @keyframes glitch-slow {
          0% { transform: translate(0); }
          50% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }
        @keyframes particle {
          0% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-100vh) scale(1.2); opacity: 0.5; }
          100% { transform: translateY(-200vh) scale(1); opacity: 0; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes expand {
          0% { width: 0; }
          100% { width: 4rem; }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(34, 211, 238, 0.5); }
          50% { text-shadow: 0 0 20px rgba(34, 211, 238, 0.8); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slide {
          0% { background-position: 0 0; }
          100% { background-position: 100px 0; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glitch { animation: glitch 0.5s infinite steps(1); }
        .animate-glitch-slow { animation: glitch-slow 3s infinite; }
        .animate-particle { animation: particle linear infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-expand { animation: expand 1.5s ease-in-out forwards; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
        .animate-slide { animation: slide 5s linear infinite; background-size: 100px 100px; }
        .bg-size-4 { background-size: 4px 4px; }
      `}</style>
    </div>
  );
}