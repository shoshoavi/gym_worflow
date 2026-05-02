import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, X, MonitorPlay, 
  MessageCircle, BarChart3, Clock, TrendingUp,
  ShieldCheck, Smartphone, Zap, CheckCircle2,
  Users, Settings, ArrowRight, UserCheck, Phone,
  FileText, ArrowDownRight, ArrowUpRight, Copy, Database, Layers
} from 'lucide-react';

const COLORS = {
  primary: '#EB0000',
  white: '#FFFFFF',
  black: '#000000',
  charcoal: '#1A1A1A',
  gray: '#F3F4F6',
  darkGray: '#374151'
};

const slidesData = [
  {
    id: 1,
    notes: "Acknowledge German title. Pivot: 'I don't speak German, but I translated this site myself — check codeagent.live/de on your phone. Language isn't the barrier — execution is.'",
    content: (props) => <Slide1 {...props} />
  },
  {
    id: 2,
    notes: "Two things make me different. Production systems for global companies. And I was a personal trainer — I know why members sign up and why they leave.",
    content: (props) => <Slide2 {...props} />
  },
  {
    id: 3,
    notes: "Diplomatic tone — NOT attack. Frame as 'we did our homework, here's what we see, here's what we fix together.' This slide earns authority by showing specificity.",
    content: (props) => <Slide3 {...props} />
  },
  {
    id: 4,
    notes: "If a chatbot can answer 'what are your hours' — why does your highest-paid front-desk person do it?",
    content: (props) => <Slide4 {...props} />
  },
  {
    id: 5,
    notes: "WhatsApp: 98% open rates in Germany. Clever Fit — and most gyms — aren't on it.",
    content: (props) => <Slide5 {...props} />
  },
  {
    id: 6,
    notes: "Three flows. One system. Prospect vs. member. Team sees only what needs them.",
    content: (props) => <Slide6 {...props} />
  },
  {
    id: 7,
    notes: "Operational layer, not one-size chatbot.",
    content: (props) => <Slide7 {...props} />
  },
  {
    id: 8,
    notes: "Germany. GDPR. WhatsApp. Designed around them, not despite them.",
    content: (props) => <Slide8 {...props} />
  },
  {
    id: 9,
    notes: "Franchise economics advantage — one platform, all studios, all German.",
    content: (props) => <Slide9 {...props} />
  },
  {
    id: 10,
    notes: "Coach Hub is beta. Nutrition Tracker and Habit Tracker are responsive web apps — can demo live in mobile view.",
    content: (props) => <Slide10 {...props} />
  },
  {
    id: 11,
    notes: "My success happens only if your numbers go up. That's alignment you don't get anywhere else.",
    content: (props) => <Slide11 {...props} />
  },
  {
    id: 12,
    notes: "NOT negotiating today. Numbers in meeting #2. Today: do we like each other, do we believe this, is it real?",
    content: (props) => <Slide12 {...props} />
  },
  {
    id: 13,
    notes: "Phase 3 is the retention moat. Phase 4 is the margin engine. The chatbot is the entry point. Team scales with the partnership.",
    content: (props) => <Slide13 {...props} />
  },
  {
    id: 14,
    notes: "Pause. Ask them for their numbers. If they refuse, use default. Close: 'One studio, conservative. Multiply by Clever Fit's franchise size. Let's talk pilot #1.'",
    content: (props) => <Slide14 {...props} />
  },
  {
    id: 15,
    notes: "Interactive Calculator. Use their numbers or the standard baseline.",
    content: (props) => <Slide15 {...props} />
  },
  {
    id: 16,
    notes: "Backup slide - proof of translation execution.",
    content: (props) => <Slide16 {...props} />
  }
];

// --- Slide Components ---

const Slide1 = () => (
  <div className="flex-1 flex flex-col justify-center items-start bg-[#1A1A1A] p-24 relative overflow-hidden h-full">
    <div className="absolute top-0 left-0 w-4 h-full bg-[#EB0000]"></div>
    <div className="absolute right-0 top-0 opacity-10">
      <svg width="600" height="600" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="0.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    </div>
    <div className="z-10 ml-8">
      <h1 className="text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
        Code Agent | <span className="text-[#EB0000]">Vom ersten Tag an</span><br/>einsatzbereit
      </h1>
      <h2 className="text-3xl text-gray-400 font-light tracking-wide border-l-2 border-[#EB0000] pl-6 py-2">
        AI Lead Management & WhatsApp Upsell<br/>
        <span className="text-white font-medium">Built for Clever Fit</span>
      </h2>
    </div>
  </div>
);

const Slide2 = () => (
  <div className="flex-1 flex flex-col p-16 h-full bg-white">
    <h1 className="text-5xl font-bold text-[#1A1A1A] mb-16 tracking-tight">Who I am</h1>
    <div className="flex flex-1 gap-16">
      <div className="w-1/3 flex flex-col items-center justify-center">
        <div className="w-64 h-64 border-4 border-[#EB0000] p-2 rounded-sm shadow-xl relative overflow-hidden bg-gray-100 flex items-center justify-center">
          <UserCheck size={80} color="#1A1A1A" strokeWidth={1} />
          <div className="absolute bottom-0 left-0 w-full bg-[#EB0000] text-white text-center py-2 font-bold tracking-widest text-sm uppercase">Arthur Shimonov</div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col justify-center gap-8">
        {[
          { i: <Database size={28}/>, t: "Senior Software Engineer — 5 years in hightech with top-100 global companies" },
          { i: <ShieldCheck size={28}/>, t: "DevOps/SRE — scalability and security by default" },
          { i: <Settings size={28}/>, t: "IDF technology unit alumnus" },
          { i: <Clock size={28}/>, t: "Former personal trainer and nutritionist — I know this industry from both sides" },
          { i: <Zap size={28}/>, t: "One person, one mission — ship what a 4-5 person team ships" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-6">
            <div className="p-3 bg-white border border-[#EB0000] text-[#EB0000] rounded-sm shadow-sm">
              {item.i}
            </div>
            <p className="text-2xl text-[#1A1A1A] font-medium leading-relaxed pt-2">{item.t}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Slide3 = () => (
  <div className="flex-1 flex flex-col p-12 h-full bg-white">
    <h1 className="text-4xl font-bold text-[#1A1A1A] mb-10 tracking-tight border-b-4 border-[#EB0000] pb-4 inline-block self-start">
      We studied Clever Fit before today. Here's what we found.
    </h1>
    <div className="flex flex-1 gap-12">
      <div className="w-5/12 bg-gray-50 border border-gray-200 p-6 rounded-md relative flex flex-col justify-between">
        <div className="absolute top-0 right-0 bg-[#1A1A1A] text-white text-xs px-3 py-1 font-bold">CURRENT STATE</div>
        
        <div className="border border-gray-300 bg-white p-4 shadow-sm mb-6 mt-4">
           <div className="text-xl font-bold text-[#EB0000] mb-2 uppercase tracking-wide">Homepage</div>
           <div className="h-12 bg-[#EB0000] w-full flex items-center justify-center text-white font-bold text-sm">
             I'm ready to invest clever (Franchise CTA)
           </div>
           <p className="text-xs text-gray-500 mt-2 italic text-center">Misses primary member acquisition</p>
        </div>

        <div className="border border-gray-300 bg-white p-4 shadow-sm">
           <div className="text-xl font-bold text-[#1A1A1A] mb-4 uppercase tracking-wide">Signup Form</div>
           <div className="space-y-3">
             <div className="h-8 bg-gray-100 border border-gray-200 w-full flex items-center px-3 text-sm text-gray-400">Name</div>
             <div className="h-8 bg-gray-100 border border-gray-200 w-full flex items-center px-3 text-sm text-gray-400">Email</div>
             <div className="h-8 bg-gray-100 border border-gray-200 w-full flex items-center px-3 text-sm text-gray-400">Studio</div>
             <div className="h-8 bg-gray-100 border border-gray-200 w-full flex items-center px-3 text-sm text-gray-400">Consent</div>
           </div>
           <div className="mt-4 flex items-center gap-2 text-[#EB0000] font-bold text-sm">
             <X size={16} /> No Phone <X size={16} className="ml-2"/> No Goals
           </div>
        </div>
      </div>

      <div className="w-7/12 flex flex-col justify-center">
        <ul className="space-y-5">
          {[
            "Your homepage primary CTA targets franchise investors, not members",
            "Member signup form captures only 4 fields (no phone, no WhatsApp, no goals)",
            "No WhatsApp integration — in a country with 98% WhatsApp open rates",
            "No live chat, no chatbot",
            "No instant confirmation / response",
            "No qualification or personalization",
            "No upsell at signup (PT / supplements / nutrition / family plans all missed)",
            "2-year lock-in and price jump at week 24 hidden in FAQ — abandonment risk",
            "No branded mobile app"
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <X size={24} color="#EB0000" className="flex-shrink-0 mt-1" strokeWidth={3} />
              <span className="text-xl text-[#1A1A1A] font-medium leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
      <p className="text-xl font-bold text-[#EB0000] tracking-wide">These are not user problems. They're system problems. And they're fixable.</p>
    </div>
  </div>
);

const Slide4 = () => (
  <div className="flex-1 flex flex-col p-16 h-full bg-[#1A1A1A]">
    <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Your team is the most expensive<br/><span className="text-[#EB0000]">FAQ system</span> in the world</h1>
    
    <div className="flex flex-1 items-center justify-center gap-20">
      <div className="relative w-[400px] h-[400px]">
        {/* CSS Pie Chart Approximation */}
        <div className="w-full h-full rounded-full" style={{
          background: `conic-gradient(
            #EB0000 0deg 162deg, 
            #FFFFFF 162deg 270deg, 
            #666666 270deg 324deg, 
            #333333 324deg 360deg
          )`
        }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#1A1A1A] rounded-full flex items-center justify-center flex-col shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
            <span className="text-white text-lg tracking-widest uppercase">Front Desk Time</span>
            <span className="text-[#EB0000] text-5xl font-bold mt-2">100%</span>
        </div>
        
        {/* Labels */}
        <div className="absolute top-[20%] -right-[15%] bg-[#EB0000] text-white px-4 py-2 rounded-sm font-bold text-xl shadow-lg border border-red-900 flex items-center gap-2">
          <MessageCircle size={20}/> 45% FAQs
        </div>
        <div className="absolute bottom-[10%] right-[0%] bg-white text-[#1A1A1A] px-4 py-2 rounded-sm font-bold text-lg">
          30% Retention
        </div>
        <div className="absolute bottom-[15%] -left-[10%] bg-[#666666] text-white px-4 py-2 rounded-sm font-bold text-lg">
          15% Sales
        </div>
        <div className="absolute top-[30%] -left-[5%] bg-[#333333] text-white px-4 py-2 rounded-sm font-bold text-lg">
          10% Admin
        </div>
      </div>
    </div>
  </div>
);

const Slide5 = () => (
  <div className="flex-1 flex flex-col p-16 h-full bg-white relative overflow-hidden">
    <div className="absolute right-0 bottom-0 w-64 h-64 bg-gray-50 rounded-tl-full z-0"></div>
    <h1 className="text-5xl font-bold text-[#1A1A1A] mb-4 tracking-tight z-10 relative">The upsell conversation isn't happening</h1>
    <h2 className="text-2xl text-[#EB0000] font-bold mb-16 z-10 relative">WhatsApp: 98% open rates in Germany. Clever Fit aren't on it.</h2>
    
    <div className="flex flex-1 items-center justify-center z-10 relative">
      <div className="w-full max-w-4xl border-2 border-gray-200 bg-gray-50 p-12 rounded-xl shadow-lg relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest shadow-xl border border-gray-700">
          Gym Membership (€29.90)
        </div>

        <div className="flex justify-between items-center mt-12 gap-4">
          <div className="w-1/4 flex flex-col items-center">
            <div className="w-20 h-20 bg-white border border-[#EB0000] rounded-full flex items-center justify-center relative shadow-sm">
              <UserCheck color="#1A1A1A" size={32}/>
              <div className="absolute -top-2 -right-2 bg-[#EB0000] rounded-full p-1"><X color="white" size={16} strokeWidth={3}/></div>
            </div>
            <span className="mt-4 font-bold text-[#1A1A1A] text-center text-lg">Personal Training</span>
            <span className="text-[#EB0000] font-bold">+€60/mo</span>
          </div>

          <ArrowRight color="#EB0000" size={32} className="opacity-50"/>

          <div className="w-1/4 flex flex-col items-center">
            <div className="w-20 h-20 bg-white border border-[#EB0000] rounded-full flex items-center justify-center relative shadow-sm">
              <Zap color="#1A1A1A" size={32}/>
              <div className="absolute -top-2 -right-2 bg-[#EB0000] rounded-full p-1"><X color="white" size={16} strokeWidth={3}/></div>
            </div>
            <span className="mt-4 font-bold text-[#1A1A1A] text-center text-lg">Supplements</span>
            <span className="text-[#EB0000] font-bold">+€30/mo</span>
          </div>

          <ArrowRight color="#EB0000" size={32} className="opacity-50"/>

          <div className="w-1/4 flex flex-col items-center">
             <div className="w-20 h-20 bg-white border border-[#EB0000] rounded-full flex items-center justify-center relative shadow-sm">
              <Users color="#1A1A1A" size={32}/>
              <div className="absolute -top-2 -right-2 bg-[#EB0000] rounded-full p-1"><X color="white" size={16} strokeWidth={3}/></div>
            </div>
            <span className="mt-4 font-bold text-[#1A1A1A] text-center text-lg">Family Plan</span>
            <span className="text-[#EB0000] font-bold">+€20/mo</span>
          </div>
        </div>
        
        <div className="mt-12 text-center text-xl font-medium text-gray-500 bg-white py-4 border border-gray-200 shadow-inner">
          <span className="text-[#EB0000] font-bold block mb-2">The Leak:</span>
          Members want results, not just access. You have the services, but no channel to offer them at the exact right moment.
        </div>
      </div>
    </div>
  </div>
);

const Slide6 = () => (
  <div className="flex-1 flex flex-col p-12 h-full bg-white">
    <h1 className="text-4xl font-bold text-[#1A1A1A] mb-8 tracking-tight">One platform, three flows</h1>
    
    <div className="flex flex-col flex-1 gap-4">
      {/* Lane 1 */}
      <div className="flex h-1/4 bg-gray-50 border-l-8 border-gray-300 shadow-sm rounded-r-md items-center pl-6 pr-4 relative">
        <div className="w-48 font-bold text-[#1A1A1A] tracking-wider uppercase text-sm border-r border-gray-300 h-full flex items-center">VISITOR JOURNEY</div>
        <div className="flex-1 flex justify-around items-center pl-8">
          <div className="bg-white border border-gray-300 p-3 shadow-sm rounded-sm text-center w-48 font-medium">Ad / Social</div>
          <ArrowRight className="text-gray-400" />
          <div className="bg-white border border-gray-300 p-3 shadow-sm rounded-sm text-center w-48 font-medium">Website</div>
          <ArrowRight className="text-gray-400" />
          <div className="bg-[#1A1A1A] text-white border border-[#1A1A1A] p-3 shadow-sm rounded-sm text-center w-56 font-bold flex flex-col">
            <span>Lead Form</span>
            <span className="text-[#EB0000] text-xs mt-1">WhatsApp Consent</span>
          </div>
        </div>
      </div>

      {/* Lane 2 */}
      <div className="flex h-1/4 bg-[#1A1A1A] border-l-8 border-[#EB0000] shadow-md rounded-r-md items-center pl-6 pr-4 relative">
        <div className="w-48 font-bold text-white tracking-wider uppercase text-sm border-r border-gray-700 h-full flex items-center">OUR SYSTEM</div>
        <div className="flex-1 flex justify-around items-center pl-8">
          <div className="bg-[#333] border border-gray-600 p-3 rounded-sm text-center w-40 text-white font-medium text-sm">CRM Sync</div>
          <ArrowRight className="text-gray-500" />
          <div className="bg-[#333] border border-gray-600 p-3 rounded-sm text-center w-40 text-white font-medium text-sm">Google Sheets</div>
          <ArrowRight className="text-gray-500" />
          <div className="bg-white text-[#1A1A1A] border-2 border-[#EB0000] p-3 rounded-sm text-center w-48 font-bold shadow-[0_0_15px_rgba(235,0,0,0.3)]">
            AI Assistant<br/><span className="text-xs font-normal text-gray-500">Intent Routing</span>
          </div>
        </div>
      </div>

      {/* Lane 3 */}
      <div className="flex h-1/4 bg-red-50 border-l-8 border-[#EB0000] shadow-sm rounded-r-md items-center pl-6 pr-4 relative">
        <div className="w-48 font-bold text-[#EB0000] tracking-wider uppercase text-sm border-r border-red-200 h-full flex items-center">WHATSAPP</div>
        <div className="flex-1 flex justify-around items-center pl-8">
          <div className="bg-white border border-red-200 p-4 shadow-sm rounded-sm text-center w-1/3 mx-2 flex items-center gap-3">
             <div className="bg-[#EB0000] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
             <div className="text-left"><div className="font-bold text-[#1A1A1A]">Deal Offer</div><div className="text-xs text-gray-500">Non-members</div></div>
          </div>
          <div className="bg-white border border-red-200 p-4 shadow-sm rounded-sm text-center w-1/3 mx-2 flex items-center gap-3">
             <div className="bg-[#EB0000] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
             <div className="text-left"><div className="font-bold text-[#1A1A1A]">Welcome / Upsell</div><div className="text-xs text-gray-500">New members</div></div>
          </div>
          <div className="bg-white border border-red-200 p-4 shadow-sm rounded-sm text-center w-1/3 mx-2 flex items-center gap-3">
             <div className="bg-[#1A1A1A] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
             <div className="text-left"><div className="font-bold text-[#1A1A1A]">Ongoing Support</div><div className="text-xs text-gray-500">AI auto-resolve</div></div>
          </div>
        </div>
      </div>

      {/* Lane 4 */}
      <div className="flex h-1/4 bg-gray-100 border-l-8 border-gray-400 shadow-sm rounded-r-md items-center pl-6 pr-4 relative">
        <div className="w-48 font-bold text-gray-600 tracking-wider uppercase text-sm border-r border-gray-300 h-full flex items-center">YOUR TEAM</div>
        <div className="flex-1 flex justify-start items-center pl-8">
           <div className="bg-white border border-gray-300 p-4 shadow-sm rounded-sm text-center w-full max-w-md mx-auto flex items-center justify-center gap-4">
             <ShieldCheck color="#1A1A1A" size={28}/>
             <div className="text-left">
               <div className="font-bold text-[#1A1A1A] text-lg">Human Escalation</div>
               <div className="text-sm text-gray-500">Complaints, contracts, billing ONLY</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const Slide7 = () => (
  <div className="flex-1 flex flex-col p-16 h-full bg-[#1A1A1A] text-white">
    <h1 className="text-5xl font-bold mb-4 tracking-tight">The bot knows who's paying</h1>
    <h2 className="text-xl text-gray-400 mb-16 font-light">Intelligent routing powered by CRM data, not simple keywords.</h2>
    
    <div className="flex flex-1 items-center justify-center relative">
      
      {/* Tree structure built with flexbox and absolute lines */}
      <div className="flex flex-col items-center w-full max-w-4xl">
        <div className="bg-white text-[#1A1A1A] border-4 border-[#EB0000] px-8 py-4 text-xl font-bold z-10 shadow-[0_0_30px_rgba(235,0,0,0.2)]">
          Incoming WhatsApp Message
        </div>
        
        <div className="w-1 h-12 bg-gray-600"></div>
        
        <div className="bg-[#333] border border-gray-500 px-6 py-3 rounded-full text-lg z-10">
          Check CRM Status
        </div>
        
        <div className="w-1 h-12 bg-gray-600 relative">
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-[600px] h-1 bg-gray-600"></div>
        </div>
        
        <div className="flex justify-between w-[800px]">
           {/* Left Branch */}
           <div className="flex flex-col items-center w-1/2">
             <div className="w-1 h-8 bg-gray-600"></div>
             <div className="bg-gray-800 border border-[#EB0000] text-[#EB0000] px-6 py-3 font-bold text-lg rounded-sm uppercase tracking-wider mb-8 shadow-lg">
               Not a Member
             </div>
             
             <div className="bg-white text-[#1A1A1A] p-5 w-64 rounded-sm shadow-xl text-center">
               <div className="font-bold mb-2 border-b border-gray-200 pb-2">Sales Playbook</div>
               <div className="text-sm text-gray-600">Send tailored trial offer, push to book tour, track conversion.</div>
             </div>
           </div>

           {/* Right Branch */}
           <div className="flex flex-col items-center w-1/2 relative">
             <div className="w-1 h-8 bg-gray-600"></div>
             <div className="bg-[#EB0000] border border-[#EB0000] text-white px-6 py-3 font-bold text-lg rounded-sm uppercase tracking-wider mb-8 shadow-lg">
               Paying Member
             </div>
             
             <div className="w-1 h-8 bg-gray-600 absolute top-[70px]"></div>
             <div className="absolute top-[102px] w-[200px] h-1 bg-gray-600"></div>

             <div className="flex w-[300px] justify-between mt-8">
               <div className="flex flex-col items-center">
                 <div className="w-1 h-6 bg-gray-600"></div>
                 <div className="bg-white text-[#1A1A1A] p-4 w-40 rounded-sm shadow-xl text-center">
                   <div className="font-bold text-sm mb-1 text-[#EB0000]">Routine / Upsell</div>
                   <div className="text-xs text-gray-600">AI auto-reply + suggest PT</div>
                 </div>
               </div>
               <div className="flex flex-col items-center">
                 <div className="w-1 h-6 bg-gray-600"></div>
                 <div className="bg-gray-800 text-white border border-gray-600 p-4 w-40 rounded-sm shadow-xl text-center">
                   <div className="font-bold text-sm mb-1 text-white">Sensitive</div>
                   <div className="text-xs text-gray-400">Escalate to Staff instantly</div>
                 </div>
               </div>
             </div>

           </div>
        </div>

      </div>
    </div>
  </div>
);

const Slide8 = () => (
  <div className="flex-1 flex flex-col p-16 h-full bg-white">
    <h1 className="text-5xl font-bold text-[#1A1A1A] mb-20 tracking-tight text-center">Germany-ready by design</h1>
    
    <div className="grid grid-cols-2 gap-12 flex-1 max-w-5xl mx-auto w-full">
      
      <div className="border-2 border-gray-100 bg-white shadow-xl rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#EB0000]"></div>
        <div className="bg-red-50 p-6 rounded-full mb-6">
          <CheckCircle2 size={48} color="#EB0000" />
        </div>
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Opt-in Consent First</h3>
        <p className="text-gray-600 text-lg">No cold outreach. 100% of interactions start with explicit consent captured via form or inbound message.</p>
      </div>

      <div className="border-2 border-gray-100 bg-white shadow-xl rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#1A1A1A]"></div>
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <FileText size={48} color="#1A1A1A" />
        </div>
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Full Audit Trail</h3>
        <p className="text-gray-600 text-lg">Every message, opt-in timestamp, and automated action is logged into the CRM for complete compliance visibility.</p>
      </div>

      <div className="border-2 border-gray-100 bg-white shadow-xl rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#1A1A1A]"></div>
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShieldCheck size={48} color="#1A1A1A" />
        </div>
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Meta-Approved Templates</h3>
        <p className="text-gray-600 text-lg">All outbound engagement runs exclusively on strictly pre-approved WhatsApp template messages.</p>
      </div>

      <div className="border-2 border-gray-100 bg-white shadow-xl rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#EB0000]"></div>
        <div className="bg-red-50 p-6 rounded-full mb-6">
          <Settings size={48} color="#EB0000" />
        </div>
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Right-to-Erasure Ready</h3>
        <p className="text-gray-600 text-lg">One-click data purge capability built into the architecture to instantly fulfill GDPR deletion requests.</p>
      </div>

    </div>
  </div>
);

const Slide9 = () => (
  <div className="flex-1 flex flex-col p-16 h-full bg-[#1A1A1A] text-white">
    <h1 className="text-5xl font-bold mb-12 tracking-tight">Built for Clever Fit franchise scale</h1>
    
    <div className="flex flex-1 gap-12 items-center">
      <div className="w-1/2 relative h-full flex items-center justify-center">
        {/* Abstract Franchise Map Concept */}
        <div className="relative w-[400px] h-[400px]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EB0000] p-6 rounded-lg shadow-[0_0_40px_rgba(235,0,0,0.4)] z-20 flex items-center gap-3">
             <Database color="white" size={32}/>
             <span className="font-bold text-xl tracking-wider">CORE ENGINE</span>
          </div>
          
          {/* Connecting lines and nodes */}
          <svg className="absolute top-0 left-0 w-full h-full z-10">
            <path d="M200 200 L100 100" stroke="#444" strokeWidth="2" strokeDasharray="5,5"/>
            <path d="M200 200 L300 80" stroke="#444" strokeWidth="2" strokeDasharray="5,5"/>
            <path d="M200 200 L340 250" stroke="#444" strokeWidth="2" strokeDasharray="5,5"/>
            <path d="M200 200 L120 320" stroke="#444" strokeWidth="2" strokeDasharray="5,5"/>
            <path d="M200 200 L250 350" stroke="#444" strokeWidth="2" strokeDasharray="5,5"/>
            <path d="M200 200 L50 220" stroke="#444" strokeWidth="2" strokeDasharray="5,5"/>
          </svg>
          
          {/* Nodes */}
          <div className="absolute top-[80px] left-[80px] bg-white text-[#1A1A1A] p-2 text-xs font-bold rounded-sm border-2 border-[#EB0000] z-20">München</div>
          <div className="absolute top-[60px] left-[280px] bg-white text-[#1A1A1A] p-2 text-xs font-bold rounded-sm border-2 border-[#1A1A1A] z-20">Berlin</div>
          <div className="absolute top-[230px] left-[320px] bg-white text-[#1A1A1A] p-2 text-xs font-bold rounded-sm border-2 border-[#EB0000] z-20">Hamburg</div>
          <div className="absolute top-[300px] left-[100px] bg-white text-[#1A1A1A] p-2 text-xs font-bold rounded-sm border-2 border-[#1A1A1A] z-20">Köln</div>
          <div className="absolute top-[330px] left-[230px] bg-white text-[#1A1A1A] p-2 text-xs font-bold rounded-sm border-2 border-[#EB0000] z-20">Frankfurt</div>
          <div className="absolute top-[200px] left-[30px] bg-white text-[#1A1A1A] p-2 text-xs font-bold rounded-sm border-2 border-[#EB0000] z-20">Stuttgart</div>
          
          {/* Pulse effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#EB0000] rounded-full opacity-20 animate-[ping_3s_linear_infinite] z-0"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#EB0000] rounded-full opacity-10 z-0"></div>
        </div>
      </div>
      
      <div className="w-1/2">
        <ul className="space-y-8">
          <li className="flex items-start gap-4">
            <div className="bg-[#EB0000] p-2 mt-1"><Layers size={24} color="white"/></div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Per-studio Data Isolation</h3>
              <p className="text-gray-400 text-lg">Multi-tenant architecture ensures strict segregation of leads, members, and analytics by gym_id.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-white p-2 mt-1"><MessageCircle size={24} color="#1A1A1A"/></div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Localized German Templates</h3>
              <p className="text-gray-400 text-lg">Global brand consistency, but each franchise location can customize its specific pricing and local offers.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-[#EB0000] p-2 mt-1"><TrendingUp size={24} color="white"/></div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Rapid Rollout</h3>
              <p className="text-gray-400 text-lg">One studio proves the model and unit economics. Flipping the switch for the next 50 takes weeks, not months.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const Slide10 = () => (
  <div className="flex-1 flex flex-col p-12 h-full bg-white relative">
    <h1 className="text-4xl font-bold text-[#1A1A1A] mb-8 tracking-tight">Selected projects</h1>
    
    <div className="grid grid-cols-2 gap-8 flex-1 w-full max-w-6xl mx-auto">
      
      {/* Project 1 - Coach Hub (Fitness) */}
      <div className="border-4 border-[#EB0000] p-6 flex flex-col relative bg-gray-50 group overflow-hidden">
        <div className="absolute top-4 right-4 bg-[#EB0000] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">Fitness & Coaching</div>
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide">Coach Hub AI</h3>
        <p className="text-sm text-gray-600 mb-4">CRM & Business Dashboard</p>
        <div className="flex-1 bg-[#1A1A1A] rounded-t-lg p-4 flex flex-col relative border-t border-l border-r border-gray-700 shadow-xl mt-2">
           <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
             <div className="text-white text-xs font-bold">Dashboard</div>
             <div className="text-[#EB0000] text-xs">$2,400 Rev</div>
           </div>
           <div className="grid grid-cols-2 gap-2 flex-1">
             <div className="bg-gray-800 rounded p-2"><div className="text-gray-400 text-[10px]">Total Clients</div><div className="text-white font-bold">12</div></div>
             <div className="bg-gray-800 rounded p-2"><div className="text-gray-400 text-[10px]">Active Plans</div><div className="text-white font-bold">8</div></div>
             <div className="bg-gray-800 rounded p-2 col-span-2 mt-2 border-l-2 border-[#EB0000] pl-2 flex flex-col justify-center">
                <div className="text-[10px] text-white">Recent Activity: Client updated</div>
             </div>
           </div>
        </div>
      </div>

      {/* Project 2 - Nutrition Tracker (Fitness) */}
      <div className="border-4 border-[#1A1A1A] p-6 flex flex-col relative bg-gray-50 group overflow-hidden">
        <div className="absolute top-4 right-4 bg-[#1A1A1A] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">Fitness & AI</div>
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide">AI Nutrition Tracker</h3>
        <p className="text-sm text-gray-600 mb-4">Mobile-first app w/ AI food recognition</p>
        <div className="flex-1 flex justify-center items-end mt-2">
           <div className="w-32 h-40 bg-white border-4 border-gray-300 rounded-t-2xl shadow-xl flex flex-col items-center pt-4 relative">
             <div className="w-12 h-1 bg-gray-300 rounded-full mb-3"></div>
             <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center flex-col">
               <div className="text-xs text-gray-400">Calories</div>
               <div className="font-bold text-[#1A1A1A] leading-none">2164</div>
             </div>
             <div className="absolute bottom-4 bg-[#EB0000] text-white text-[8px] px-3 py-1 rounded-full">+ Add Meal</div>
           </div>
        </div>
      </div>

      {/* Project 3 - Habit Tracker */}
      <div className="border border-gray-200 p-6 flex flex-col relative bg-white group">
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide">Habit Tracker App</h3>
        <p className="text-sm text-gray-600 mb-4">Responsive Web App & Calendar</p>
        <div className="flex-1 bg-gray-100 p-4 border border-gray-200 rounded-sm">
           <div className="flex justify-between items-center mb-4">
             <div className="font-bold text-sm text-[#1A1A1A]">April 2026</div>
             <div className="text-[#EB0000] text-xs font-bold bg-red-100 px-2 py-1">+ New Habit</div>
           </div>
           <div className="space-y-2">
             <div className="bg-white p-2 text-xs flex justify-between border-l-2 border-green-500 shadow-sm"><span>Meditation</span><span>100%</span></div>
             <div className="bg-white p-2 text-xs flex justify-between border-l-2 border-[#EB0000] shadow-sm"><span>Gym</span><span>0%</span></div>
           </div>
        </div>
      </div>

      {/* Project 4 - DevOps */}
      <div className="border border-gray-200 p-6 flex flex-col relative bg-white group">
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide">Infrastructure Bot</h3>
        <p className="text-sm text-gray-600 mb-4">Production DevOps Slack Automation</p>
        <div className="flex-1 bg-gray-900 p-4 rounded-sm font-mono text-[10px] text-green-400 overflow-hidden flex flex-col justify-end">
           <div className="mb-2 text-gray-400">&gt; @bot deploy myservice v2.5.0</div>
           <div className="mb-2 text-yellow-400">[WARN] Approval required</div>
           <div className="mb-2 text-gray-400">&gt; @bot approve</div>
           <div className="text-white">✓ Task completed successfully. 1 succeeded. ID: 679b56fc</div>
        </div>
      </div>

    </div>
    
    <div className="mt-8 text-center bg-[#1A1A1A] text-white py-3 inline-block mx-auto px-6 shadow-md rounded-sm">
      <span className="font-bold text-lg">Two of these are in fitness and coaching. I'm not a tourist.</span>
    </div>
  </div>
);

const Slide11 = () => (
  <div className="flex-1 flex flex-col p-16 h-full bg-white">
    <h1 className="text-5xl font-bold text-[#1A1A1A] mb-12 tracking-tight">Why partner with me, not buy software</h1>
    
    <div className="flex-1 w-full bg-white border border-gray-200 shadow-xl overflow-hidden rounded-lg flex flex-col">
      {/* Table Header */}
      <div className="flex bg-[#1A1A1A] text-white font-bold text-lg">
        <div className="w-1/5 p-6 border-r border-gray-700 uppercase tracking-widest text-sm text-gray-400 flex items-center">Model</div>
        <div className="w-1/5 p-6 border-r border-gray-700 text-center">Off-the-shelf SaaS</div>
        <div className="w-1/5 p-6 border-r border-gray-700 text-center">Agency build</div>
        <div className="w-1/5 p-6 border-r border-gray-700 text-center">In-house build</div>
        <div className="w-1/5 p-6 bg-[#EB0000] text-center shadow-[0_0_20px_rgba(235,0,0,0.5)] z-10 flex flex-col justify-center">
          Code Agent<br/><span className="text-xs font-normal opacity-80 uppercase tracking-wider mt-1">Partnership</span>
        </div>
      </div>

      {/* Rows */}
      {[
        { label: "Vertical Depth", v1: "Generic (Real Estate/Ecom)", v2: "Variable (Depends on assigned junior)", v3: "High (But takes 12 months)", v4: "Deep Fitness & Engineering DNA" },
        { label: "Skin in the game", v1: "None (Monthly flat fee)", v2: "None (Paid hourly regardless)", v3: "Employee salary", v4: "Total (Success-based)" },
        { label: "Time to launch", v1: "Days (But heavily constrained)", v2: "4-6 Months", v3: "9-12 Months + Hiring", v4: "60 Days" },
        { label: "IP Ownership", v1: "None (Rented)", v2: "Yours (But buggy)", v3: "Yours", v4: "Shared / Negotiable" },
        { label: "Total upfront cost", v1: "Low", v2: "Extremely High (€50k-150k)", v3: "High (€100k+ headcount)", v4: "Zero to Low (Rev-share)" },
      ].map((row, idx) => (
        <div key={idx} className={`flex border-b border-gray-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="w-1/5 p-6 border-r border-gray-200 font-bold text-[#1A1A1A] bg-white z-0">{row.label}</div>
          <div className="w-1/5 p-6 border-r border-gray-200 text-center text-gray-600 flex items-center justify-center">{row.v1}</div>
          <div className="w-1/5 p-6 border-r border-gray-200 text-center text-gray-600 flex items-center justify-center">{row.v2}</div>
          <div className="w-1/5 p-6 border-r border-gray-200 text-center text-gray-600 flex items-center justify-center">{row.v3}</div>
          <div className="w-1/5 p-6 border-x-4 border-[#EB0000] text-center font-bold text-[#1A1A1A] bg-red-50 flex items-center justify-center relative z-10">
            {row.v4}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Slide12 = () => (
  <div className="flex-1 flex flex-col p-16 h-full bg-[#1A1A1A] text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EB0000] rounded-full blur-[150px] opacity-10"></div>
    <h1 className="text-5xl font-bold mb-16 tracking-tight z-10">Aligned partnership — structure designed together</h1>
    
    <div className="flex flex-1 items-center z-10">
      <div className="w-1/2 pr-12 relative">
        <div className="flex flex-col gap-12 relative h-full justify-center">
           
           <div className="bg-gray-800 p-6 border-l-4 border-gray-400 relative z-10 shadow-lg ml-0 transition-all w-[80%]">
             <div className="text-sm text-gray-400 font-bold tracking-widest uppercase mb-1">I Invest</div>
             <div className="text-xl font-bold">Tech IP, Build Time, Maintenance</div>
           </div>

           <div className="bg-gray-800 p-6 border-l-4 border-[#EB0000] relative z-10 shadow-lg ml-0 transition-all w-[80%]">
             <div className="text-sm text-[#EB0000] font-bold tracking-widest uppercase mb-1">You Invest</div>
             <div className="text-xl font-bold">Studios, Member Data, Feedback</div>
           </div>

           {/* Converging visuals */}
           <svg className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 w-[200px] h-[300px]" style={{ zIndex: 0 }}>
             <path d="M 0 50 Q 150 50 150 150" fill="transparent" stroke="#EB0000" strokeWidth="4" />
             <path d="M 0 250 Q 150 250 150 150" fill="transparent" stroke="#EB0000" strokeWidth="4" />
             <polygon points="140,140 160,150 140,160" fill="#EB0000" />
           </svg>
        </div>
      </div>
      
      <div className="w-1/2 pl-12 border-l border-gray-700">
        <div className="bg-[#EB0000] text-white p-6 font-bold text-3xl mb-12 shadow-xl inline-block uppercase tracking-wider">
          ALIGNED
        </div>
        <ul className="space-y-8">
          <li className="flex items-start gap-4">
            <CheckCircle2 color="#EB0000" size={32} className="flex-shrink-0" />
            <span className="text-2xl font-medium">Equity OR revenue-share — not a vendor invoice</span>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle2 color="#EB0000" size={32} className="flex-shrink-0" />
            <span className="text-2xl font-medium">Exact structure designed together after project alignment</span>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle2 color="#EB0000" size={32} className="flex-shrink-0" />
            <span className="text-2xl font-medium">First milestone: 1 pilot studio, 60 days, agreed KPIs</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const Slide13 = () => (
  <div className="flex-1 flex flex-col p-12 h-full bg-white">
    <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4 tracking-tight">This is not a chatbot.</h1>
    <h2 className="text-3xl text-[#EB0000] font-bold mb-12 tracking-tight">This is a tech transformation for Clever Fit.</h2>
    
    <div className="flex flex-1 gap-8">
      <div className="w-3/4 relative flex flex-col justify-end gap-2 pr-12 pb-4">
        
        {/* Step 4 */}
        <div className="flex w-full ml-[15%]">
           <div className="w-1/3 text-right pr-4 pt-2 font-bold text-[#EB0000]">Phase 4</div>
           <div className="flex-1 bg-[#1A1A1A] text-white p-5 rounded-sm shadow-xl relative transform -translate-y-6">
             <div className="absolute -left-3 top-1/2 w-3 h-1 bg-[#EB0000]"></div>
             <h3 className="font-bold text-xl mb-2">AI Upsell Engine</h3>
             <p className="text-sm text-gray-300">AI-curated personalized bundles (PT + supplements + nutrition) per member, sold automatically via WhatsApp + App. The margin engine.</p>
           </div>
        </div>

        {/* Step 3 */}
        <div className="flex w-full ml-[10%]">
           <div className="w-1/3 text-right pr-4 pt-2 font-bold text-[#EB0000]">Phase 3</div>
           <div className="flex-1 bg-[#EB0000] text-white p-5 rounded-sm shadow-xl relative transform -translate-y-4">
             <div className="absolute -left-3 top-1/2 w-3 h-1 bg-[#1A1A1A]"></div>
             <h3 className="font-bold text-xl mb-2">Branded Mobile App</h3>
             <p className="text-sm text-red-100">Members book classes, track workouts, order supplements. Clever Fit becomes THE tech-forward brand in German fitness.</p>
           </div>
        </div>

        {/* Step 2 */}
        <div className="flex w-full ml-[5%]">
           <div className="w-1/3 text-right pr-4 pt-2 font-bold text-[#EB0000]">Phase 2</div>
           <div className="flex-1 bg-[#EB0000]/70 text-white p-5 rounded-sm shadow-xl relative transform -translate-y-2">
             <div className="absolute -left-3 top-1/2 w-3 h-1 bg-[#1A1A1A]"></div>
             <h3 className="font-bold text-xl mb-2">Deep Personalization</h3>
             <p className="text-sm text-gray-100">Bot knows training history, goals, attendance. Talks like a personal trainer who remembers everything.</p>
           </div>
        </div>

        {/* Step 1 */}
        <div className="flex w-full ml-0">
           <div className="w-1/3 text-right pr-4 pt-2 font-bold text-[#EB0000] uppercase tracking-wider">Now</div>
           <div className="flex-1 bg-[#EB0000]/40 text-[#1A1A1A] p-5 rounded-sm shadow-xl relative border border-[#EB0000]/50">
             <h3 className="font-bold text-xl mb-2">WhatsApp AI Bot</h3>
             <p className="text-sm font-medium">Closes the gaps. Lead capture, member routing, automated FAQ, escalation.</p>
           </div>
        </div>
        
        {/* Up arrow graphic */}
        <div className="absolute left-[35%] bottom-0 w-1 h-[90%] bg-gradient-to-t from-gray-200 to-[#EB0000] -z-10"></div>

      </div>

      <div className="w-1/4 bg-gray-50 border border-gray-200 p-8 flex flex-col justify-center items-center text-center shadow-inner relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#1A1A1A]"></div>
        <Users size={48} color="#1A1A1A" className="mb-6"/>
        <h3 className="font-bold text-[#1A1A1A] text-xl mb-4">Dedicated Tech Arm</h3>
        <p className="text-gray-600">As we grow, the tech team grows — backend, mobile, data engineers. Clever Fit gets a dedicated innovation team, not generic agency hours.</p>
      </div>
    </div>
  </div>
);

const Slide14 = () => (
  <div className="flex-1 flex flex-col p-16 h-full bg-[#1A1A1A] text-white">
    <h1 className="text-5xl font-bold mb-20 tracking-tight">From handshake to numbers in 90 days</h1>
    
    <div className="flex flex-col flex-1 relative justify-center">
      {/* Timeline Bar */}
      <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-800 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-0 w-2/3 h-2 bg-[#EB0000] transform -translate-y-1/2 z-0 relative">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-4 border-[#EB0000] rounded-full"></div>
      </div>

      <div className="grid grid-cols-3 gap-8 relative z-10">
        
        {/* Day 1-30 */}
        <div className="bg-[#1A1A1A] border-2 border-[#EB0000] p-6 shadow-2xl rounded-sm transform -translate-y-8">
          <div className="text-[#EB0000] font-bold text-3xl mb-2">Days 1-30</div>
          <div className="text-white font-bold text-xl uppercase tracking-widest mb-4 pb-2 border-b border-gray-700">Pilot Integration</div>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="flex items-start gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0 text-[#EB0000]"/> Connect CRM API</li>
            <li className="flex items-start gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0 text-[#EB0000]"/> Build strictly German templates</li>
            <li className="flex items-start gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0 text-[#EB0000]"/> Train AI specifically on Clever Fit FAQs & tone</li>
          </ul>
        </div>

        {/* Day 31-60 */}
        <div className="bg-[#333] border-2 border-gray-600 p-6 shadow-xl rounded-sm transform translate-y-8">
          <div className="text-white font-bold text-3xl mb-2">Days 31-60</div>
          <div className="text-white font-bold text-xl uppercase tracking-widest mb-4 pb-2 border-b border-gray-600">Live with Members</div>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="flex items-start gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0 text-white"/> Measure conversion rates</li>
            <li className="flex items-start gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0 text-white"/> Track upsell attachment</li>
            <li className="flex items-start gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0 text-white"/> Monitor FAQ deflection %</li>
          </ul>
        </div>

        {/* Day 61-90 */}
        <div className="bg-[#333] border-2 border-gray-600 p-6 shadow-xl rounded-sm transform -translate-y-8">
          <div className="text-white font-bold text-3xl mb-2">Days 61-90</div>
          <div className="text-white font-bold text-xl uppercase tracking-widest mb-4 pb-2 border-b border-gray-600">Review & Scale</div>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="flex items-start gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0 text-white"/> Transparent numbers review</li>
            <li className="flex items-start gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0 text-white"/> If KPIs hit: Structure formal partnership</li>
            <li className="flex items-start gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0 text-white"/> Plan multi-studio rollout</li>
          </ul>
        </div>

      </div>
    </div>
    
    <div className="text-center mt-auto border-t border-gray-800 pt-6">
      <p className="text-xl font-medium text-gray-400">If the numbers don't move, we walk away as friends. <span className="text-white font-bold">If they move, we expand.</span></p>
    </div>
  </div>
);

const Slide15 = () => {
  const [leads, setLeads] = useState(800);
  const [convRate, setConvRate] = useState(12);
  const [fee, setFee] = useState(30);
  const [studios, setStudios] = useState(1);
  
  // Hardcoded +6% absolute lift assumption for the model
  const liftRate = 6; 
  const newMembersPerMo = Math.round(leads * (liftRate / 100));
  const annualRevPerStudio = newMembersPerMo * fee * 12;
  const totalAnnualRev = annualRevPerStudio * studios;

  return (
    <div className="flex-1 flex flex-col p-12 h-full bg-white">
      <h1 className="text-4xl font-bold text-[#1A1A1A] mb-8 tracking-tight border-b-4 border-[#EB0000] pb-2 inline-block self-start">
        Let's calculate what this is worth to Clever Fit
      </h1>
      
      <div className="flex flex-1 gap-12">
        {/* Interactive Left Side */}
        <div className="w-1/2 flex flex-col justify-center bg-gray-50 p-10 rounded-xl shadow-inner border border-gray-200">
          <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-gray-300 pb-2">
              <label className="text-lg font-bold text-[#1A1A1A] w-2/3">Average leads / month / studio:</label>
              <input 
                type="number" 
                value={leads} 
                onChange={e => setLeads(Number(e.target.value))}
                className="w-1/3 bg-transparent text-2xl font-bold text-[#EB0000] text-right focus:outline-none focus:border-b-2 focus:border-[#EB0000]"
              />
            </div>
            
            <div className="flex justify-between items-end border-b border-gray-300 pb-2">
              <label className="text-lg font-bold text-[#1A1A1A] w-2/3">Current lead → member conversion %:</label>
              <div className="flex items-center justify-end w-1/3">
                <input 
                  type="number" 
                  value={convRate} 
                  onChange={e => setConvRate(Number(e.target.value))}
                  className="w-1/2 bg-transparent text-2xl font-bold text-[#EB0000] text-right focus:outline-none"
                />
                <span className="text-2xl font-bold text-[#EB0000] ml-1">%</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-b border-gray-300 pb-2">
              <label className="text-lg font-bold text-[#1A1A1A] w-2/3">Average monthly membership fee:</label>
              <div className="flex items-center justify-end w-1/3">
                <span className="text-2xl font-bold text-[#EB0000] mr-1">€</span>
                <input 
                  type="number" 
                  value={fee} 
                  onChange={e => setFee(Number(e.target.value))}
                  className="w-1/2 bg-transparent text-2xl font-bold text-[#EB0000] text-right focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-end border-b border-gray-300 pb-2">
              <label className="text-lg font-bold text-[#1A1A1A] w-2/3">Number of studios scaling to:</label>
              <input 
                type="number" 
                value={studios} 
                onChange={e => setStudios(Number(e.target.value))}
                className="w-1/3 bg-transparent text-2xl font-bold text-[#EB0000] text-right focus:outline-none"
              />
            </div>

            <div className="pt-6 mt-4">
              <div className="flex justify-between items-center bg-[#1A1A1A] p-6 rounded-md shadow-xl text-white">
                <span className="text-xl font-bold uppercase tracking-wider">Incremental Annual Revenue:</span>
                <span className="text-3xl font-bold text-[#EB0000]">€ {totalAnnualRev.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Static Right Side */}
        <div className="w-1/2 flex flex-col justify-between">
          
          <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 bg-[#EB0000] opacity-20 w-40 h-40 rounded-full blur-2xl"></div>
            <h3 className="text-[#EB0000] font-bold uppercase tracking-widest text-sm mb-6 border-b border-gray-700 pb-2">Conservative Baseline</h3>
            
            <div className="text-white text-xl leading-relaxed font-light">
              <span className="font-bold">800</span> leads/mo<br/>
              <span className="text-gray-500">×</span> <span className="font-bold text-[#EB0000]">12% → 18%</span> conversion lift<br/>
              <span className="text-gray-500">=</span> <span className="font-bold">+48</span> new members/mo per studio<br/>
              <span className="text-gray-500">×</span> €60 average yield (membership + upsell)<br/>
              <span className="text-gray-500">×</span> 12 mo retention
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
               <div className="text-3xl font-bold text-white">= +€34,560 <span className="text-sm text-gray-400 font-normal">/year per studio</span></div>
            </div>
          </div>

          <div>
             <p className="text-xs text-gray-400 mb-6 font-medium">Source: EuropeActive 2024 Fitness Report + Twilio Conversational Commerce Benchmarks</p>
             <button className="w-full bg-[#EB0000] hover:bg-red-700 text-white font-bold text-2xl py-6 rounded-md shadow-[0_10px_20px_rgba(235,0,0,0.3)] transition-all uppercase tracking-widest flex justify-center items-center gap-3 group">
               Pilot Studio #1 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

const Slide16 = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-16 h-full bg-[#1A1A1A]">
    <h1 className="text-4xl font-bold text-white mb-12 tracking-tight">Proof of Execution: codeagent.live/de</h1>
    
    {/* Browser mockup of the translated site */}
    <div className="w-[800px] h-[450px] bg-white rounded-t-xl rounded-b-md shadow-2xl flex flex-col overflow-hidden border border-gray-700">
      <div className="h-10 bg-gray-200 flex items-center px-4 gap-2 border-b border-gray-300">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-4 bg-white text-xs text-gray-500 px-3 py-1 rounded-sm w-64 flex items-center gap-2">
          <ShieldCheck size={12}/> codeagent.live/de
        </div>
      </div>
      
      <div className="flex-1 bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-10 relative">
         <div className="text-[#00ff00] font-mono text-xl mb-6 flex items-center gap-2">
           <Zap size={24}/> CODE AGENT
         </div>
         <h2 className="text-white text-4xl font-bold mb-4">Skalieren Sie mit KI-Automatisierung</h2>
         <p className="text-gray-400 text-lg mb-8 max-w-lg">Wir bauen maßgeschneiderte KI-Agenten und Web-Apps für Ihr Unternehmen.</p>
         <button className="bg-[#00ff00] text-black font-bold px-8 py-3 rounded-sm">Projekt Starten</button>
         
         {/* Small overlay to note this is a mockup */}
         <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded border border-gray-700">Live Demo Screenshot</div>
      </div>
    </div>
  </div>
);

// --- Main Application Component ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [presenterMode, setPresenterMode] = useState(false);

  const totalSlides = slidesData.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlideData = slidesData.find(s => s.id === currentSlide);
  const SlideContent = currentSlideData.content;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col font-sans overflow-hidden">
      
      {/* Top Controls Bar */}
      <div className="h-12 bg-black border-b border-gray-800 flex items-center justify-between px-6 text-gray-400 z-50">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white tracking-wider uppercase text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-[#EB0000] rounded-full"></div> Clever Fit Pitch
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <button 
            onClick={() => setPresenterMode(!presenterMode)}
            className={`flex items-center gap-2 px-3 py-1 rounded transition-colors ${presenterMode ? 'bg-[#EB0000] text-white' : 'hover:text-white bg-gray-800'}`}
          >
            <MonitorPlay size={16} /> Notes
          </button>
          <span>{currentSlide} / {totalSlides}</span>
        </div>
      </div>

      {/* Main Presentation Area */}
      <div className="flex-1 flex flex-row overflow-hidden">
        
        {/* Presenter Notes Sidebar */}
        {presenterMode && (
          <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col p-6 overflow-y-auto">
            <h3 className="text-[#EB0000] font-bold uppercase tracking-wider text-sm mb-4">Speaker Notes (Slide {currentSlide})</h3>
            <div className="text-white text-lg leading-relaxed bg-gray-900 p-4 rounded border border-gray-700 shadow-inner min-h-[200px]">
              {currentSlideData.notes}
            </div>
            
            <div className="mt-8">
              <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-2">Next Slide</h3>
              <div className="bg-gray-900 p-3 rounded text-gray-500 text-sm truncate opacity-70 border border-gray-700">
                {currentSlide < totalSlides ? slidesData.find(s => s.id === currentSlide + 1).notes : "End of deck"}
              </div>
            </div>
          </div>
        )}

        {/* Slide Canvas Wrapper - 16:9 Aspect Ratio Maintainer */}
        <div className="flex-1 bg-black flex items-center justify-center p-4 relative">
          <div 
            className="bg-white relative shadow-2xl flex flex-col overflow-hidden outline-none"
            style={{ 
              aspectRatio: '16/9',
              width: '100%',
              maxWidth: '1280px', // Restrict max size for extreme ultrawides
              maxHeight: '100%'
            }}
          >
            <SlideContent />
            
            {/* Global Slide Footer */}
            <div className="absolute bottom-0 left-0 w-full h-12 flex justify-between items-center px-8 text-xs font-bold uppercase tracking-widest z-50">
               <div className={currentSlide === 1 || currentSlide === 16 ? "text-gray-500" : "text-gray-400"}>
                 Code Agent <span className="mx-2 opacity-50">|</span> <span className={currentSlide === 1 || currentSlide === 16 ? "text-gray-400" : "text-[#EB0000]"}>codeagent.live/de</span>
               </div>
               <div className={currentSlide === 1 || currentSlide === 16 ? "text-gray-500" : "text-gray-400"}>
                 {currentSlide}
               </div>
            </div>
          </div>
          
          {/* Overlay Navigation Buttons */}
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="absolute left-8 w-12 h-12 bg-black/50 hover:bg-[#EB0000] text-white rounded-full flex items-center justify-center transition-all disabled:opacity-0 z-50"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="absolute right-8 w-12 h-12 bg-black/50 hover:bg-[#EB0000] text-white rounded-full flex items-center justify-center transition-all disabled:opacity-0 z-50"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-gray-900 w-full relative z-50">
        <div 
          className="h-full bg-[#EB0000] transition-all duration-300 ease-out"
          style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
        ></div>
      </div>

    </div>
  );
}