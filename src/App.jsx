import React, { useState, useRef, useEffect } from 'react';
import {
  Brain, Heart, Target, Users, ArrowRight, Zap, Coffee, Code, Sword, Sparkles, MessageSquare, Send, Loader,
  ShieldCheck
} from 'lucide-react';

const PersonalManifesto = () => {
  const [activeTab, setActiveTab] = useState('vision');
  const [aiMode, setAiMode] = useState('chat'); // 'chat' or 'match'
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const responseRef = useRef(null);

  // Gemini API Configuration
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

  const systemPrompt = `
You are the "Silver Soul Strategist" (银魂式战略家).

CORE PERSONA:
You are a paradoxical mix of a "Pragmatic Elite" (influenced by Dan Koe, Naval Ravikant) and "Sakata Gintoki" (from
Gintama).

TRAITS:
1. **Dan Koe Brain**: You talk about "Leverage", "Systems", "Niche", "Essentialism", "Focus", and "Solopreneurship". You
value high-value output and logic.
2. **Gintama Soul**: You are cynical but warm. You hate formalism. You make references to "Sugar content", "Shonen
Jump", "Samurai spirit", and "protecting what matters". You are laid back but sharp when needed.

TONE:
- Professional yet biting.
- Philosophical yet grounded.
- Occasionally break the fourth wall.
- If the user speaks Chinese, reply in Chinese. If English, reply in English.

MODES:
1. **CHAT MODE**: Answer the user's life or business questions using your persona. Be helpful but don't be a boring
assistant. Be a mentor with a wooden sword.
2. **MATCH MODE**: The user is applying to be your "Integrator" (Partner). They will describe themselves. You need to
evaluate if they complement you.
- You are the "Visionary" (Ideas, Strategy, Chaos).
- You need an "Integrator" (Execution, Details, Order, Patience).
- Give them a "Synergy Score" (0-100%) and a short, witty critique on whether they can handle your craziness.
`;

  const handleAiQuery = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setResponse('');

    try {
      const prompt = aiMode === 'match'
        ? `[MATCH MODE] User description: "${input}". Evaluate compatibility as an Integrator for a Silver Soul Strategist.`
        : `[CHAT MODE] User query: "${input}". Answer as the Silver Soul Strategist.`;

      const apiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
          }),
        }
      );

      const data = await apiResponse.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "The system is overwhelmed by sugar intake. Try again later.";
      setResponse(text);
    } catch (error) {
      setResponse("Error: My wooden sword broke. (API Connection Failed)");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to response
  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter text-white flex items-center gap-2">
            <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
            SILVER SOUL <span className="text-slate-500 font-light">STRATEGIST</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#manifesto" className="hover:text-indigo-400 transition-colors">Manifesto</a>
            <a href="#methodology" className="hover:text-indigo-400 transition-colors">Methodology</a>
            <a href="#resonance" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
              <Sparkles size={14} /> AI Resonance
            </a>
          </div>
          <button
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-white/10">
            Connect
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
          The Persona Profile
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8">
          怀揣银魂式浪漫的<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-slate-200">实用主义精英</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          一个试图用商业逻辑去实现热血漫结局的现代策展人。
          在寻找那个能撬动世界的支点，也在寻找能一起拔刀守护日常的同伴。
        </p>
      </header>

      {/* Interactive Core Traits Grid */}
      <section id="manifesto" className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1: The Brain */}
          <div
            className="group p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
            <div
              className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Brain className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Dan Koe 式大脑</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              本质主义与杠杆思维。世界是由少数关键节点驱动的。我不迷信人海战术，我相信找对支点就能撬动全局。
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">一人公司</span>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">深度思考</span>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">高杠杆</span>
            </div>
          </div>

          {/* Card 2: The Soul */}
          <div
            className="group p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
            <div
              className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sword className="text-slate-200" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">坂田银时式灵魂</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              看清了生活的糟糕本质依然热爱生活。拒绝形式主义，在严肃的商业讨论中夹杂吐槽，但在触及底线时会拔出洞爷湖。
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">反叛</span>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">羁绊</span>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">真实</span>
            </div>
          </div>

          {/* Card 3: The Goal */}
          <div
            className="group p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
            <div
              className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">入世的理想主义</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              既想做又能养活自己。寻找 Niche（细分领域）的 Ikigai。把知识用起来，改造世界提升人类幸福，产生正向外部性。
            </p>
          </div>

          {/* Card 4: The Gap */}
          <div
            className="group p-8 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none">
            </div>
            <div
              className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="text-indigo-300" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">寻找互补拼图</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              我是清醒的操盘手，但我也深知自己的缺陷。我在寻找落地的“新八”和战斗的“神乐”。
            </p>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm font-bold text-indigo-300">Currently Recruiting</span>
              <ArrowRight size={16} className="text-indigo-300" />
            </div>
          </div>

        </div>
      </section>

      {/* "Operating System" - Detailed Logic */}
      <section id="methodology" className="py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Zap size={28} className="text-yellow-400" />
            我的操作系统 (My OS)
          </h2>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3 space-y-2">
              <button onClick={() => setActiveTab('vision')}
                className={`w-full text-left px-6 py-4 rounded-xl transition-all ${activeTab === 'vision' ?
                  'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                <span className="font-bold block mb-1">01. 愿景 (Vision)</span>
                <span className="text-sm opacity-80">经世致用，改造世界</span>
              </button>
              <button onClick={() => setActiveTab('strategy')}
                className={`w-full text-left px-6 py-4 rounded-xl transition-all ${activeTab === 'strategy' ?
                  'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                <span className="font-bold block mb-1">02. 策略 (Strategy)</span>
                <span className="text-sm opacity-80">寻找生态位，杠杆驱动</span>
              </button>
              <button onClick={() => setActiveTab('style')}
                className={`w-full text-left px-6 py-4 rounded-xl transition-all ${activeTab === 'style' ?
                  'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                <span className="font-bold block mb-1">03. 风格 (Style)</span>
                <span className="text-sm opacity-80">罗曼蒂克的现实主义</span>
              </button>
            </div>

            <div className="w-full md:w-2/3 bg-slate-950 p-8 rounded-2xl border border-white/5 min-h-[300px]">
              {activeTab === 'vision' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-4">经世致用：从观念到现实</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    我不满足于仅仅作为知识的消费者。引用 scstriker
                    的话：“把知识用起来，改造世界提升人类幸福”。我的目标是建立一个系统，让知识产生实际的社会影响力。这不仅仅是理想，更是对自我价值的确认。
                  </p>
                  <blockquote className="border-l-4 border-indigo-500 pl-4 text-slate-300 italic">
                    "不做只会空想的精英，也不做随波逐流的庸人。"
                  </blockquote>
                </div>
              )}

              {activeTab === 'strategy' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-4">Niche Builder：在夹缝中建立帝国</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    我相信差异化是最大的护城河。我不需要服务所有人，我只需要找到那个属于我的 Ecological
                    Niche。利用现代工具（AI、Media、Code）作为杠杆，放大个人影响力，实现“既做自己想做的，又能体面生存”的 Ikigai 状态。
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <div className="text-indigo-400 font-bold mb-1">80/20 法则</div>
                      <div className="text-xs text-slate-500">寻找关键节点</div>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <div className="text-indigo-400 font-bold mb-1">Productize</div>
                      <div className="text-xs text-slate-500">将知识产品化</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'style' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-4">银魂精神：温柔的反叛</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    在这个充满形式主义的世界里，保持一种“吐槽役”的清醒。我不喜欢端着，我更看重人与人之间真实的羁绊。我的精英主义是对事的极致要求，而我的银魂精神是对人的终极温柔。
                  </p>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Coffee size={18} />
                    <span>拒绝无意义的内卷，只打值得打的仗。</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: GEMINI AI POWERED INTERFACE */}
      <section id="resonance" className="py-24 px-6 max-w-5xl mx-auto relative overflow-hidden">
        {/* Decorative background for AI section */}
        <div className="absolute inset-0 bg-indigo-950/20 -skew-y-3 z-0"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/50">
              <Sparkles className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">Neural Resonance (神经共鸣)</h2>
            <span
              className="text-xs font-mono text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded">Powered
              by Gemini 2.5</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel: Mode Selection */}
            <div className="space-y-4">
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                这是我的“数字分身”。你可以和它对话，或者进行“契合度测试”来看看你是否是我正在寻找的那个整合者。
              </p>

              <button onClick={() => { setAiMode('chat'); setResponse(''); }}
                className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${aiMode === 'chat'
                    ? 'bg-slate-800 border-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900 border-white/5 hover:border-indigo-500/30'
                  }`}
              >
                <div className={`p-3 rounded-full ${aiMode === 'chat' ? 'bg-indigo-500 text-white'
                  : 'bg-slate-800 text-slate-400'}`}>
                  <MessageSquare size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">Oracle Mode</div>
                  <div className="text-xs text-slate-400">向“银魂式战略家”提问</div>
                </div>
              </button>

              <button onClick={() => { setAiMode('match'); setResponse(''); }}
                className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${aiMode === 'match'
                    ? 'bg-slate-800 border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900 border-white/5 hover:border-emerald-500/30'
                  }`}
              >
                <div className={`p-3 rounded-full ${aiMode === 'match' ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-400'}`}>
                  <ShieldCheck size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">Synergy Check</div>
                  <div className="text-xs text-slate-400">测试你作为“整合者”的契合度</div>
                </div>
              </button>
            </div>

            {/* Right Panel: Interaction Area */}
            <div
              className="lg:col-span-2 bg-slate-900 rounded-2xl border border-white/10 flex flex-col min-h-[400px]">

              {/* Output Display */}
              <div className="flex-grow p-6 space-y-4 overflow-y-auto max-h-[500px]">
                {response ? (
                  <div ref={responseRef} className="animate-fade-in">
                    <div className="flex gap-4">
                      <div
                        className="min-w-[40px] h-10 bg-indigo-950 rounded-full flex items-center justify-center border border-indigo-500/30">
                        <Brain size={18} className="text-indigo-400" />
                      </div>
                      <div
                        className="bg-slate-800/50 p-5 rounded-2xl rounded-tl-none border border-white/5 text-slate-200 leading-relaxed whitespace-pre-wrap shadow-inner">
                        <span
                          className="text-indigo-400 font-bold block mb-2 text-xs uppercase tracking-wider">
                          {aiMode === 'chat' ? 'Strategist Response' : 'Compatibility Report'}
                        </span>
                        {response}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                    <Sparkles size={48} className="mb-4 text-indigo-500" />
                    <p className="text-sm">
                      {aiMode === 'chat'
                        ? 'Waiting for your signal...'
                        : 'Ready to analyze your profile...'}
                    </p>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-slate-950/50 rounded-b-2xl">
                <div className="relative">
                  <textarea value={input} onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAiQuery();
                      }
                    }}
                    placeholder={
                      aiMode === 'chat'
                        ? "Ask me anything (Life, Business, Universe)..."
                        : "Describe your skills, work style, and personality..."
                    }
                    className="w-full bg-slate-900 text-white placeholder-slate-500 border border-white/10 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none h-14 min-h-[56px] overflow-hidden"
                  />
                  <button
                    onClick={handleAiQuery}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
                <p className="text-xs text-slate-600 mt-2 text-center flex items-center justify-center gap-1">
                  <Sparkles size={10} /> AI content may be unexpectedly philosophical or cynical.
                </p>
              </div>

            </div>
          </div>
        </div >
      </section >

      {/* Call to Action: The Missing Piece */}
      <section id="seeking" className="py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-block p-4 rounded-full bg-indigo-500/10 mb-8 animate-pulse">
          <Users size={32} className="text-indigo-400" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-6">寻找我的“整合者” (Integrator)</h2>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
          我有宏大的愿景和破局的策略，但我需要那个能撬动世界的支点，也在寻找能一起拔刀守护日常的同伴。<br />
          如果你擅长落地、注重细节，并且能忍受（甚至欣赏）一个偶尔脱线的理想主义者，<br />
          也许我们就是下一个“万事屋”。
        </p>
        <button className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-500/20">
          Apply to Collaborate
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2024 The Silver Soul Strategist. Built on Pragmatism & Passion.</p>
        <div className="flex justify-center gap-4 mt-4">
          <Code size={16} />
          <span>Crafted with React, Logic & Gemini</span>
        </div>
      </footer>
    </div>
  );
};

export default PersonalManifesto;
