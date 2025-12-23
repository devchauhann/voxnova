
import React from 'react';
import { Sparkles, ArrowRight, Mic2, Globe, Shield, Zap, Podcast, Accessibility, Video, Instagram, Twitter, Github } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-[100px] -z-10" />

      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
            <Mic2 className="text-white w-4 h-4" />
          </div>
          <span className="font-bold tracking-tighter text-xl">VoxNova</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
           <a href="#how" className="hover:text-black transition-colors">Process</a>
           <a href="#cases" className="hover:text-black transition-colors">Utility</a>
           <a href="#studio" className="hover:text-black transition-colors">Enterprise</a>
        </div>
        <button 
          onClick={onStart}
          className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Studio <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">The Future of Voice Studio</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-serif text-editorial font-bold tracking-tight">
            Speak to the <br />
            <span className="italic font-normal text-indigo-600">Digital Soul.</span>
          </h1>
          
          <p className="max-w-lg text-xl text-slate-400 leading-relaxed font-light">
            VoxNova transforms cold text into evocative, human-like narratives. A premium space for creators who demand editorial excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-12 py-6 bg-indigo-600 text-white rounded-[24px] font-bold text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1"
            >
              Enter the Studio
            </button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how" className="py-32 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-4">Workflow</h2>
            <h3 className="text-5xl font-serif">Three steps to <br/>vocal perfection.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { num: '01', title: 'Script Composition', desc: 'Paste your narrative into our editorial canvas. Our engine analyzes syntax for optimal pacing.' },
              { num: '02', title: 'Persona Selection', desc: 'Choose from a curated gallery of neural personas, from deep narrators to studio smooth HD voices.' },
              { num: '03', title: 'Editorial Render', desc: 'Fine-tune pitch and tempo in real-time, then export your masterpiece for immediate distribution.' }
            ].map((step, i) => (
              <div key={i} className="space-y-6">
                <span className="text-6xl font-serif text-slate-100 block">{step.num}</span>
                <h4 className="text-xl font-bold">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section id="cases" className="py-32 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <h3 className="text-6xl font-serif leading-none">Designed for <br/><span className="italic text-slate-400">every story.</span></h3>
              <p className="max-w-sm text-slate-400 text-sm">Versatility is at the core of our engine, powering everything from global podcasts to accessible web experiences.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-6 hover:-translate-y-2 transition-transform">
                 <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Podcast className="w-6 h-6" />
                 </div>
                 <h4 className="text-2xl font-serif font-bold">Podcasting</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">Create engaging voiceovers for your audio series without expensive recording hardware.</p>
              </div>
              <div className="bg-black p-12 rounded-[40px] text-white space-y-6 hover:-translate-y-2 transition-transform">
                 <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center">
                    <Video className="w-6 h-6" />
                 </div>
                 <h4 className="text-2xl font-serif font-bold">Content Creators</h4>
                 <p className="text-white/50 text-sm leading-relaxed">Perfect for social media reels, long-form video narrations, and educational tutorials.</p>
              </div>
              <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-6 hover:-translate-y-2 transition-transform">
                 <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <Accessibility className="w-6 h-6" />
                 </div>
                 <h4 className="text-2xl font-serif font-bold">Accessibility</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">Bridge the gap by providing high-quality audio alternatives for your textual content.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Trust & Big Text Marquee - Removed excess vertical padding for tighter fit */}
      <section className="bg-white overflow-hidden">
         <div className="whitespace-nowrap flex animate-marquee border-y border-slate-100 py-6 md:py-10">
            <span className="text-[120px] md:text-[200px] font-black uppercase tracking-tighter text-slate-100 mr-20">Editorial Quality</span>
            <span className="text-[120px] md:text-[200px] font-black uppercase tracking-tighter text-slate-100 mr-20">Neural Engine</span>
            <span className="text-[120px] md:text-[200px] font-black uppercase tracking-tighter text-slate-100 mr-20">Zero Latency</span>
            <span className="text-[120px] md:text-[200px] font-black uppercase tracking-tighter text-slate-100 mr-20">Studio Grade</span>
         </div>
      </section>

      {/* Editorial Footer */}
      <footer className="bg-white pt-32 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-6 space-y-8">
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600">Contact</h4>
               <p className="text-4xl md:text-5xl font-serif leading-tight hover:italic cursor-pointer transition-all">devgurjar9897@gmail.com</p>
               <div className="flex gap-6">
                  <a href="https://twitter.com/devchauhann3" className="p-3 border border-slate-100 rounded-full hover:bg-slate-50 transition-colors"><Twitter className="w-4 h-4" /></a>
                  <a href="https://instagram.com/devchauhan.in" className="p-3 border border-slate-100 rounded-full hover:bg-slate-50 transition-colors"><Instagram className="w-4 h-4" /></a>
                  <a href="https://github.com/devchauhann" className="p-3 border border-slate-100 rounded-full hover:bg-slate-50 transition-colors"><Github className="w-4 h-4" /></a>
               </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">Navigation</h4>
               <ul className="space-y-4 text-sm font-bold">
                  <li><a href="#" className="hover:text-indigo-600 transition-colors">Studio</a></li>
                  <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-indigo-600 transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-indigo-600 transition-colors">Enterprise</a></li>
               </ul>
            </div>
            <div className="lg:col-span-4 space-y-6">
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">Newsletter</h4>
               <p className="text-sm text-slate-400">Join 5,000+ creators for weekly vocal insights.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="email@address.com" className="flex-1 bg-slate-50 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none" />
                  <button className="px-6 py-3 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-widest">Join</button>
               </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-2">
                <Mic2 className="w-5 h-5 text-indigo-600" />
                <span className="font-bold tracking-tighter text-xl">VoxNova</span>
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               &copy; 2025 VoxNova Studio. All rights reserved. Made for the curious.
             </p>
             <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Cookie Policy</a>
             </div>
          </div>

          {/* Massive Footer Text */}
          <div className="mt-32 opacity-[0.03] select-none pointer-events-none">
             <h2 className="text-[15vw] font-black uppercase tracking-tighter leading-none text-center">VOXNOVA</h2>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;
