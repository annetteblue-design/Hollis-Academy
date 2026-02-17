
import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react';
import { Mission, Message } from '../types';
import { gemini } from '../services/geminiService';

interface DetectiveLabProps {
  mission: Mission;
  onComplete: () => void;
  onExit: () => void;
}

const DetectiveLab: React.FC<DetectiveLabProps> = ({ mission, onComplete, onExit }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: `[COMM LINK ESTABLISHED] Mission: ${mission.title}` },
    { role: 'assistant', content: `Agent, I'm ready. ${mission.description} Here is your objective: ${mission.objective}` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.filter(m => m.role !== 'system');
      const response = await gemini.generateResponse(mission.systemPrompt, input, history);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "[ERROR] Signal lost. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={onExit}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Return to Missions
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Briefing */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6 rounded-2xl border-l-4 border-yellow-500 yellow-glow">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Terminal size={20} className="text-yellow-500" />
              Mission Briefing
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {mission.objective}
            </p>
            <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl">
              <p className="text-xs font-bold text-yellow-500 uppercase mb-2">Current Challenge</p>
              <p className="text-sm italic text-slate-200">"{mission.challenge}"</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-l-4 border-blue-500">
             <h3 className="text-sm font-bold text-blue-400 uppercase mb-4 flex items-center gap-2">
               <AlertCircle size={16} />
               Investigator Tips
             </h3>
             <ul className="text-xs space-y-3 text-slate-400">
               <li>• Look for absolute statements (always, never, everyone).</li>
               <li>• Watch for "loaded" adjectives that trigger emotions.</li>
               <li>• Verify names and dates against known facts.</li>
             </ul>
          </div>

          <button 
            onClick={onComplete}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20"
          >
            <CheckCircle size={20} />
            Mission Complete
          </button>
        </div>

        {/* Right Column: Interactive Console */}
        <div className="lg:col-span-2 flex flex-col h-[600px] glass rounded-2xl overflow-hidden border border-white/5 relative scanline-container">
          <div className="bg-slate-900/50 px-6 py-3 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Interactive Lab v3.1</span>
            </div>
            <span className="text-[10px] font-mono text-slate-600">ENCRYPTION: AES-256</span>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                    msg.role === 'system' 
                      ? 'bg-transparent text-yellow-500 font-mono border border-yellow-500/20 w-full text-center'
                      : msg.role === 'user'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-slate-800 text-slate-200 border border-white/5'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Incoming Signal</div>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-white/5 px-4 py-3 rounded-2xl text-sm">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900/50 border-t border-white/5">
            <div className="relative group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your response or analysis..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-slate-600 font-mono"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-700 text-black px-4 rounded-lg flex items-center justify-center transition-all group-hover:scale-105 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectiveLab;
