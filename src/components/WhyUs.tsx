import React from "react";
import { ShieldCheck, CalendarRange, HeartHandshake, Smile, EyeOff, Ban } from "lucide-react";

export default function WhyUs() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 p-6 md:p-10 text-white relative z-10 shadow-2xl">
      
      {/* Whimsical Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 mb-4 text-emerald-300">
          <ShieldCheck className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-green-300 tracking-tight leading-snug">
          Completely Free Stories, Zero Barrier to Bedtime Calm
        </h1>
        <p className="text-slate-400 text-sm mt-3 max-w-2xl mx-auto italic">
          No sign-ups, no fees, and no user profiles. Just pure, personalized sensory storybooks designed to bring peace to your family.
        </p>
      </div>

      {/* Main Grid of Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-slate-300">
        
        {/* Benefit 1: Free Forever */}
        <div className="p-6 rounded-2xl bg-slate-950/50 border border-indigo-950/80 hover:border-emerald-500/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 flex items-center justify-center text-emerald-400 border border-emerald-800 mb-4">
            <Ban className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">
            No Fees, No Upgrades
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Many tools entice you with a "free trial" only to lock the actual bedtime story or critical trigger settings behind a monthly subscription. Here, every feature—including short, medium, and 1000-word stories—is draftable at <strong>zero financial cost</strong>. Always.
          </p>
        </div>

        {/* Benefit 2: Absolute Privacy */}
        <div className="p-6 rounded-2xl bg-slate-950/50 border border-indigo-950/80 hover:border-emerald-500/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-teal-950/80 flex items-center justify-center text-teal-400 border border-teal-800 mb-4">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">
            No Email, No Sign Ups
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We don't gather your child's name, age, interests, or sensitive fear data. Because there are <strong>no sign-ups</strong>, we never sell lists or spam your inbox. Your custom story parameters are processed live and saved entirely inside your own browser's local sandbox.
          </p>
        </div>

        {/* Benefit 3: ADHD & ASD Safe Environment */}
        <div className="p-6 rounded-2xl bg-slate-950/50 border border-indigo-950/80 hover:border-emerald-500/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/80 flex items-center justify-center text-indigo-400 border border-indigo-800 mb-4">
            <Smile className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">
            Ad-Free Sensory Comfort
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Loud blinking banner ads can trigger sensory distraction or anxiety for ADHD and autistic child readers. Our space is kept entirely clean and empty of tracker ads, yielding a cozy, quiet bedtime reading environment.
          </p>
        </div>

        {/* Benefit 4: Interactive Memory Bookshelf */}
        <div className="p-6 rounded-2xl bg-slate-950/50 border border-indigo-950/80 hover:border-emerald-500/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 flex items-center justify-center text-amber-400 border border-amber-800 mb-4">
            <CalendarRange className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-2">
            Unlimited Local Re-reads
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every story you generate is automatically pinned to your personal <strong>"Bookshelf"</strong>. Children love repeating favorite comfort stories, and they can re-open their bookshelf anytime to read them again with cozy voiceovers.
          </p>
        </div>

      </div>

      {/* Trust Quote Slogan */}
      <div className="p-6 rounded-2xl bg-emerald-900/10 border border-emerald-500/20 text-center">
        <h4 className="text-sm font-bold text-emerald-300 flex items-center justify-center gap-2 mb-1">
          <HeartHandshake className="w-4 h-4" />
          Our Sacred Family Promise
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
          We believe sensory-friendly parenting tools should be a universal right, not a luxury. We provide this completely free, backed directly by Gemini AI's powerful, secure server endpoints, as a tribute to neurodiverse families everywhere.
        </p>
      </div>

    </div>
  );
}
