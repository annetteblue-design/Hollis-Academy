
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DetectiveLab from './components/DetectiveLab';
import { View, Mission, Rank } from './types';
import { MISSIONS, INVESTIGATOR_CODE } from './constants';
// Added Shield and Fingerprint to the lucide-react imports to fix missing icon errors
import { ArrowRight, Lock, CheckCircle2, Star, BookOpen, Tool, Layout, Award, Search, Info, Shield, Fingerprint } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HOME);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [completedMissions, setCompletedMissions] = useState<number[]>(() => {
    const saved = localStorage.getItem('pi-academy-progress');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pi-academy-progress', JSON.stringify(completedMissions));
  }, [completedMissions]);

  const getRank = (): Rank => {
    const count = completedMissions.length;
    if (count >= 4) return Rank.CHIEF_ANALYST;
    if (count >= 3) return Rank.SENIOR_INVESTIGATOR;
    if (count >= 2) return Rank.FIELD_AGENT;
    return Rank.ROOKIE;
  };

  const handleMissionComplete = (id: number) => {
    if (!completedMissions.includes(id)) {
      setCompletedMissions(prev => [...prev, id]);
    }
    setView(View.MISSIONS);
    setActiveMission(null);
  };

  const startMission = (mission: Mission) => {
    setActiveMission(mission);
    setView(View.LAB);
  };

  const statsData = [
    { name: 'Critical Thinking', value: completedMissions.length * 25 },
    { name: 'Verification', value: completedMissions.includes(2) ? 100 : 30 },
    { name: 'Privacy Security', value: completedMissions.includes(3) ? 100 : 20 },
    { name: 'Ethics Logic', value: completedMissions.includes(4) ? 100 : 40 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <Header currentView={view} setView={setView} rank={getRank()} />

      <main className="max-w-7xl mx-auto">
        {/* HOME VIEW */}
        {view === View.HOME && (
          <div className="space-y-12 animate-in fade-in duration-1000">
            <section className="relative overflow-hidden glass rounded-[2.5rem] p-8 md:p-16 border border-yellow-500/10">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]"></div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-yellow-500/20">
                  <Star size={14} fill="currentColor" />
                  Elite Training Program
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                  Train to Think.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Verify. Protect.</span>
                </h1>
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                  Artificial Intelligence is the ultimate investigative tool—but only in the hands of a disciplined human. Master the PI Academy curriculum to outsmart bias, detect hallucinations, and safeguard digital truth.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setView(View.MISSIONS)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                  >
                    Enter Command Center <ArrowRight size={20} />
                  </button>
                  <button 
                    onClick={() => setView(View.CODE)}
                    className="glass border border-white/10 hover:border-white/30 text-white px-8 py-4 rounded-2xl font-bold transition-all"
                  >
                    View Investigator Code
                  </button>
                </div>
              </div>
            </section>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-3xl border-white/5 group hover:border-yellow-500/30 transition-all">
                <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Verification Operations</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Learn to cross-reference AI 'facts' with authoritative sources to catch hallucinations before they compromise your case.</p>
              </div>
              <div className="glass p-8 rounded-3xl border-white/5 group hover:border-yellow-500/30 transition-all">
                <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Bias Detection</h3>
                <p className="text-slate-400 text-sm leading-relaxed">AI systems reflect their training data. We train you to spot stereotyping and unbalanced summaries instantly.</p>
              </div>
              <div className="glass p-8 rounded-3xl border-white/5 group hover:border-yellow-500/30 transition-all">
                <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Data Sovereignty</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Your data is your fingerprint. Master the protocols for interacting with AI without compromising personal security.</p>
              </div>
            </div>
          </div>
        )}

        {/* MISSIONS VIEW */}
        {view === View.MISSIONS && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-bold mb-2">Active Assignments</h2>
                <p className="text-slate-400">Complete missions to unlock higher clearance and advanced tools.</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Progress Tracker</div>
                  <div className="text-sm font-bold">{completedMissions.length} / {MISSIONS.length} Missions Clear</div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-yellow-500"
                    style={{ clipPath: `inset(0 ${100 - (completedMissions.length / MISSIONS.length * 100)}% 0 0)` }}
                  ></div>
                  <Award className="text-yellow-500" size={20} />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {MISSIONS.map((mission, idx) => {
                const isLocked = idx > 0 && !completedMissions.includes(MISSIONS[idx - 1].id);
                const isComplete = completedMissions.includes(mission.id);

                return (
                  <div 
                    key={mission.id}
                    className={`relative glass rounded-3xl p-8 border border-white/5 transition-all group overflow-hidden ${
                      isLocked ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:border-yellow-500/50 cursor-pointer active:scale-[0.98]'
                    }`}
                    onClick={() => !isLocked && startMission(mission)}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center text-yellow-500 font-mono font-bold">
                        {idx + 1}
                      </div>
                      {isComplete ? (
                        <CheckCircle2 className="text-green-500" size={24} />
                      ) : isLocked ? (
                        <Lock className="text-slate-600" size={24} />
                      ) : (
                        <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full">Available</div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold mb-3">{mission.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2">{mission.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center overflow-hidden">
                             <img src={`https://picsum.photos/seed/${mission.id * i}/40/40`} alt="Agent" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Agents in field: {8 + idx}</span>
                    </div>

                    {!isLocked && (
                      <div className="absolute bottom-8 right-8 bg-yellow-500 p-3 rounded-xl text-black translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-xl shadow-yellow-500/20">
                        <ArrowRight size={20} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LAB VIEW (Gemini Interaction) */}
        {view === View.LAB && activeMission && (
          <DetectiveLab 
            mission={activeMission} 
            onComplete={() => handleMissionComplete(activeMission.id)}
            onExit={() => setView(View.MISSIONS)}
          />
        )}

        {/* CODE VIEW */}
        {view === View.CODE && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">Investigator Code of Conduct</h2>
              <p className="text-slate-400 mb-8">Every Hollis Agent swears by these principles. They are the barrier between meaningful insight and digital misinformation.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INVESTIGATOR_CODE.map((rule, idx) => (
                <div key={idx} className="glass p-8 rounded-3xl border-white/5 group hover:bg-white/5 transition-all">
                  <div className="mb-6 group-hover:scale-110 transition-transform">{rule.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{rule.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{rule.description}</p>
                </div>
              ))}
            </div>

            <div className="glass p-12 rounded-[2.5rem] border-white/5 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-6 text-black shadow-xl shadow-yellow-500/20">
                <Shield size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">I pledge to use AI as a tool for truth, never for deception.</h3>
              <p className="text-slate-500 text-sm max-w-lg mb-8">Signed: {getRank()} Hollis Agent</p>
              <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl text-sm font-bold border border-white/10">Download Code PDF</button>
            </div>
          </div>
        )}

        {/* TOOLKIT VIEW */}
        {view === View.TOOLKIT && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">Agent Dashboard</h2>
                  <p className="text-slate-400">Your analytical metrics and specialized verification tools.</p>
                </div>

                <div className="glass p-8 rounded-3xl border-white/5 h-[400px]">
                   <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                     <Layout size={20} className="text-yellow-500" />
                     Skill Profiler
                   </h3>
                   <div className="w-full h-full pb-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statsData} layout="vertical" margin={{ left: 20, right: 30 }}>
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={120} />
                        <Tooltip 
                          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(250, 204, 21, 0.2)', borderRadius: '12px' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {statsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.value >= 100 ? '#eab308' : '#334155'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass p-8 rounded-3xl border-white/5">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Info size={20} className="text-blue-500" />
                    Agent Clearance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Current Level</span>
                      <span className="text-yellow-500 font-bold">{getRank()}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 transition-all duration-1000" 
                        style={{ width: `${(completedMissions.length / MISSIONS.length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500">Complete {MISSIONS.length - completedMissions.length} more missions to advance your clearance.</p>
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl border-white/5">
                  <h3 className="text-lg font-bold mb-4">Quick Verify</h3>
                  <div className="bg-black/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex gap-4 mb-4">
                      <input 
                        type="text" 
                        placeholder="Paste AI claim here..." 
                        className="flex-1 bg-transparent border-b border-slate-700 focus:outline-none focus:border-yellow-500 py-2 text-sm"
                      />
                      <button className="bg-slate-800 p-2 rounded-lg text-yellow-500"><Search size={20} /></button>
                    </div>
                    <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">Connects to primary database</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-24 pt-12 border-t border-white/5 text-center">
        <div className="flex justify-center gap-6 mb-8 text-slate-500">
          <Shield size={20} />
          <Award size={20} />
          <Fingerprint size={20} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 mb-2">Designed for Investigators Ages 12–14</p>
        <p className="text-[10px] text-slate-700 mb-6">ZERO DATA RETENTION POLICY • LOCAL PROGRESS STORAGE</p>
        <div className="text-xs text-slate-500">
          © 2026 Hollis Private Investigator Academy. Built by ZenBlue & Inspired by Pursuit.org.
        </div>
      </footer>
    </div>
  );
};

export default App;
