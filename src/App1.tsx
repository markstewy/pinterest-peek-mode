import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Eye, Shield, Sparkles, X, Check, ArrowRight, RefreshCw, 
  Trash2, Heart, Bookmark, Share2, Layers, AlertCircle, HelpCircle, 
  BarChart3, Settings, Info, ExternalLink, SlidersHorizontal, ChevronRight, Zap,
  PlayCircle, Compass, Target, Navigation
} from 'lucide-react';

const INITIAL_PINS = [
  {
    id: 'pin-1',
    title: 'Mid-Century Modern Living Room Aesthetics',
    category: 'Home Decor',
    author: 'Architectural Digest',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[3/4]',
    tags: ['interior', 'furniture', 'modern', 'living room'],
    likes: '12.4k'
  },
  {
    id: 'pin-2',
    title: 'Minimalist Tokyo Streetwear Fits 2026',
    category: 'Fashion',
    author: 'Urban Thread Co',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[2/3]',
    tags: ['streetwear', 'tokyo', 'style', 'fashion'],
    likes: '8.9k'
  },
  {
    id: 'pin-3',
    title: 'Kyoto Bamboo Forest Serenity Walk',
    category: 'Travel',
    author: 'Wanderlust Guides',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[4/5]',
    tags: ['japan', 'travel', 'nature', 'kyoto'],
    likes: '24.1k'
  },
  {
    id: 'pin-4',
    title: 'Artisanal Sourdough & Crusty Loaves',
    category: 'Food & Recipes',
    author: 'The Culinary Lab',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[3/4]',
    tags: ['baking', 'sourdough', 'recipes', 'food'],
    likes: '15.3k'
  },
  {
    id: 'pin-5',
    title: 'Brutalist Concrete Workspace Setup',
    category: 'Tech & Architecture',
    author: 'Minimal Desks',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[1/1]',
    tags: ['workspace', 'setup', 'minimal', 'tech'],
    likes: '6.7k'
  },
  {
    id: 'pin-6',
    title: 'Nordic Ceramic Coffee Mugs & Craft',
    category: 'Art & Craft',
    author: 'Studio Ceramics',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    aspect: 'aspect-[3/4]',
    tags: ['ceramics', 'pottery', 'coffee', 'craft'],
    likes: '9.2k'
  }
];

const RELATED_PINS_POOL = [
  {
    id: 'rel-1',
    title: 'Warm Wooden Accents & Planters',
    category: 'Home Decor',
    author: 'Nordic Habitat',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'rel-2',
    title: 'Organic Texture Linen Couch Styling',
    category: 'Home Decor',
    author: 'Soft Spaces',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'rel-3',
    title: 'Handcrafted Japanese Tea Set',
    category: 'Art & Craft',
    author: 'Kyoto Crafts',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80'
  }
];

const ANCHORED_TOUR_STEPS = [
  {
    step: 1,
    targetId: 'tour-pin-card',
    title: '1. Short Click vs. Long-Press Hold',
    icon: Eye,
    position: 'bottom-right',
    description: 'Click any Pin (image or text) for standard view. When Peek Mode is ON, short clicks open an isolated Peek Session. Or hold 0.5s anytime for radial long-press previewing!',
    actionHint: 'Click card image/text or hold 0.5s'
  },
  {
    step: 2,
    targetId: 'tour-header-toggle',
    title: '2. Global Peek Mode Toggle',
    icon: Shield,
    position: 'bottom-left',
    description: 'Toggle Peek Mode ON to isolate all standard clicks automatically without polluting your Taste Graph recommendations.',
    actionHint: 'Toggles platform-wide insulation'
  },
  {
    step: 3,
    targetId: 'tour-telemetry-panel',
    title: '3. Real-Time Telemetry Log',
    icon: BarChart3,
    position: 'left-center',
    description: 'Watch your Taste Graph affinity scores and live event stream update in real time with an independent scroll window.',
    actionHint: 'Tracks feed pollution prevented'
  },
  {
    step: 4,
    targetId: 'tour-commit-actions',
    title: '4. Commit vs. Discard Control',
    icon: Target,
    position: 'top-center',
    description: 'Inside Peek Mode, you choose: "Add to Taste Graph" updates your feed, or "Discard & Exit" purges all interaction logs.',
    actionHint: 'Explicit user control over taste data'
  }
];

export default function App() {
  const [globalPeekMode, setGlobalPeekMode] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [activeModalMode, setActiveModalMode] = useState(null); // 'standard' | 'peek'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [showTelemetry, setShowTelemetry] = useState(true);

  // Guided Tour State
  const [showTour, setShowTour] = useState(true);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  // Telemetry & Taste Graph State
  const [tasteGraph, setTasteGraph] = useState({
    'Home Decor': 45,
    'Fashion': 30,
    'Travel': 20,
    'Food & Recipes': 15,
    'Tech & Architecture': 10,
    'Art & Craft': 25
  });

  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, text: 'System initialized. Taste Graph baseline active.', type: 'system', timestamp: '10:00 AM' }
  ]);

  const [peekSessionCount, setPeekSessionCount] = useState(0);
  const [preventedDistortions, setPreventedDistortions] = useState(0);

  // Gesture refs & state
  const longPressTimerRef = useRef(null);
  const isHoldCompletedRef = useRef(false);
  const [pressingPinId, setPressingPinId] = useState(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const progressAnimRef = useRef(null);
  const eventLogContainerRef = useRef(null);

  const addLog = (text, type = 'standard') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTelemetryLogs(prev => [
      { id: Date.now(), text, type, timestamp: time },
      ...prev.slice(0, 25)
    ]);
  };

  useEffect(() => {
    if (eventLogContainerRef.current) {
      eventLogContainerRef.current.scrollTop = 0;
    }
  }, [telemetryLogs]);

  const handleStandardClick = (pin) => {
    setSelectedPin(pin);
    setActiveModalMode('standard');

    setTasteGraph(prev => ({
      ...prev,
      [pin.category]: (prev[pin.category] || 0) + 15
    }));

    addLog(`STANDARD TAP: +15 Affinity added to "${pin.category}".`, 'standard');
  };

  const handlePeekClick = (pin) => {
    setSelectedPin(pin);
    setActiveModalMode('peek');
    setPeekSessionCount(prev => prev + 1);

    addLog(`PEEK SESSION: Opened "${pin.title}". Session isolated.`, 'peek');

    if (showTour && (tourStepIndex === 0 || tourStepIndex === 1)) {
      setTourStepIndex(3);
    }
  };

  // Unified Single Click Handler for Full Card (Image + Text)
  const handleCardSingleClick = (pin, e) => {
    // Prevent trigger if a hold gesture was completed
    if (isHoldCompletedRef.current) {
      isHoldCompletedRef.current = false;
      return;
    }

    if (globalPeekMode) {
      // Peek Mode ON -> Single click opens Peek Preview Modal directly
      handlePeekClick(pin);
    } else {
      // Peek Mode OFF -> Single click opens Standard Pin View modal
      handleStandardClick(pin);
    }
  };

  const startHoldGesture = (pin) => {
    isHoldCompletedRef.current = false;
    setPressingPinId(pin.id);
    setHoldProgress(0);

    const startTime = Date.now();
    const duration = 500;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setHoldProgress(pct);

      if (pct < 100) {
        progressAnimRef.current = requestAnimationFrame(updateProgress);
      }
    };

    progressAnimRef.current = requestAnimationFrame(updateProgress);

    longPressTimerRef.current = setTimeout(() => {
      isHoldCompletedRef.current = true;
      handlePeekClick(pin);
      cancelHoldGesture();
    }, duration);
  };

  const cancelHoldGesture = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (progressAnimRef.current) {
      cancelAnimationFrame(progressAnimRef.current);
      progressAnimRef.current = null;
    }
    setPressingPinId(null);
    setHoldProgress(0);
  };

  const handleCommitPeekSession = () => {
    if (!selectedPin) return;
    
    setTasteGraph(prev => ({
      ...prev,
      [selectedPin.category]: (prev[selectedPin.category] || 0) + 20
    }));

    addLog(`COMMITTED: User explicitly approved "${selectedPin.category}" into Taste Graph.`, 'commit');
    closeModal();
  };

  const handleDiscardPeekSession = () => {
    if (!selectedPin) return;

    setPreventedDistortions(prev => prev + 1);
    addLog(`DISCARDED: Session purged. 0 signals saved. Taste Graph protected.`, 'discard');
    closeModal();
  };

  const closeModal = () => {
    setSelectedPin(null);
    setActiveModalMode(null);
  };

  const categories = ['All', 'Home Decor', 'Fashion', 'Travel', 'Food & Recipes', 'Tech & Architecture'];

  const filteredPins = INITIAL_PINS.filter(pin => {
    const matchesCategory = activeTab === 'All' || pin.category === activeTab;
    const matchesSearch = pin.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pin.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const currentTourStep = ANCHORED_TOUR_STEPS[tourStepIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-red-100 selection:text-red-600 select-none relative">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-4 shadow-sm">
        
        {/* Logo & Guided Tour Launcher */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-red-500/20">
            P
          </div>
          <span className="font-extrabold text-xl tracking-tight hidden sm:inline text-slate-900">
            Pinterest
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
            Peek Mode POC
          </span>

          <button
            onClick={() => {
              setTourStepIndex(0);
              setShowTour(true);
            }}
            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full border border-red-200 transition-all shadow-sm ml-2"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Guided Tour</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search ideas, aesthetics, or styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 focus:bg-white text-slate-800 text-sm pl-10 pr-4 py-2 rounded-full transition-all outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 border border-transparent"
          />
        </div>

        {/* Peek Mode Switcher & Telemetry Panel Toggle */}
        <div className="flex items-center gap-2">
          <div id="tour-header-toggle" className="relative">
            <button
              onClick={() => {
                const nextState = !globalPeekMode;
                setGlobalPeekMode(nextState);
                addLog(`GLOBAL PEEK MODE: ${nextState ? 'ENABLED (Single clicks open Peek Sessions)' : 'DISABLED (Single clicks open Standard Views)'}`, nextState ? 'peek' : 'system');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all shadow-sm ${
                globalPeekMode 
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20 ring-2 ring-emerald-500/30' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Shield className={`w-4 h-4 ${globalPeekMode ? 'animate-pulse' : 'text-slate-500'}`} />
              <span className="hidden md:inline">Peek Mode:</span>
              <span className="font-bold">{globalPeekMode ? 'ON' : 'OFF'}</span>
            </button>

            {showTour && tourStepIndex === 1 && (
              <span className="absolute -inset-1 rounded-full border-2 border-emerald-500 animate-ping pointer-events-none" />
            )}
          </div>

          <button
            onClick={() => setShowTelemetry(!showTelemetry)}
            className={`p-2.5 rounded-full transition-all ${
              showTelemetry ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Toggle Live Telemetry Console"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Category Pills Bar */}
      <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === cat 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Body Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {globalPeekMode && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between text-emerald-900 shadow-sm animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold">Peek Mode Active — Single Click Isolation</h3>
                  <p className="text-[11px] text-emerald-700">
                    Single clicks now open Peek Sessions directly. Turn OFF for standard feed indexing.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setGlobalPeekMode(false)}
                className="text-xs font-semibold underline text-emerald-800 hover:text-emerald-950 px-2"
              >
                Turn off
              </button>
            </div>
          )}

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4 max-w-6xl mx-auto">
            {filteredPins.map((pin, idx) => {
              const isPressing = pressingPinId === pin.id;
              const isTourTargetPin = idx === 0;

              return (
                <div
                  key={pin.id}
                  id={isTourTargetPin ? 'tour-pin-card' : undefined}
                  
                  /* Touch & Mouse Hold Gesture Listeners */
                  onTouchStart={() => startHoldGesture(pin)}
                  onTouchEnd={cancelHoldGesture}
                  onTouchCancel={cancelHoldGesture}

                  onMouseDown={(e) => {
                    if (e.button === 0) startHoldGesture(pin);
                  }}
                  onMouseUp={cancelHoldGesture}
                  onMouseLeave={cancelHoldGesture}
                  onContextMenu={(e) => e.preventDefault()}

                  /* Unified Short Click Listener (Triggers on both Image and Text) */
                  onClick={(e) => handleCardSingleClick(pin, e)}

                  className={`group relative break-inside-avoid rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                    isPressing ? 'ring-4 ring-emerald-500/60 scale-[0.98]' : ''
                  } ${
                    showTour && tourStepIndex === 0 && isTourTargetPin ? 'ring-4 ring-red-500 shadow-2xl z-20' : ''
                  }`}
                >
                  <div className={`relative w-full ${pin.aspect} overflow-hidden bg-slate-100`}>
                    <img
                      src={pin.image}
                      alt={pin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Radial Hold Feedback Ring */}
                    {isPressing && (
                      <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-white">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.3)" strokeWidth="4" fill="transparent" />
                            <circle
                              cx="24" cy="24" r="20"
                              stroke="#10b981"
                              strokeWidth="4"
                              strokeDasharray={125}
                              strokeDashoffset={125 - (125 * holdProgress) / 100}
                              strokeLinecap="round"
                              fill="transparent"
                              className="transition-all duration-75"
                            />
                          </svg>
                          <Eye className="w-4 h-4 absolute text-white animate-pulse" />
                        </div>
                        <span className="text-[10px] font-bold mt-1.5 text-emerald-300">Peeking...</span>
                      </div>
                    )}

                    {/* Desktop Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                          {pin.category}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePeekClick(pin);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-1 text-[11px] font-semibold px-2.5"
                          title="Open in isolated Peek Session"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Peek</span>
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-200 font-medium">
                        {globalPeekMode ? 'Single click to Peek Session' : 'Single click to View • Hold 0.5s to Peek'}
                      </p>
                    </div>
                  </div>

                  <div className="p-3">
                    <h4 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">
                      {pin.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {showTelemetry && (
          <aside 
            id="tour-telemetry-panel"
            className={`w-80 lg:w-96 bg-white border-l border-slate-200 flex flex-col shadow-xl z-20 transition-all ${
              showTour && tourStepIndex === 2 ? 'ring-4 ring-purple-500/80 z-30' : ''
            }`}
          >
            <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-xs tracking-wide">Taste Graph Telemetry</h3>
              </div>
              <button onClick={() => setShowTelemetry(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 border-b border-slate-100 bg-slate-50 grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Peek Sessions</span>
                <p className="text-lg font-black text-emerald-600">{peekSessionCount}</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Pollution Prevented</span>
                <p className="text-lg font-black text-indigo-600">{preventedDistortions}</p>
              </div>
            </div>

            <div className="p-3 border-b border-slate-100 max-h-44 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Category Affinity Scores</span>
                <button 
                  onClick={() => {
                    setTasteGraph({
                      'Home Decor': 10, 'Fashion': 10, 'Travel': 10, 
                      'Food & Recipes': 10, 'Tech & Architecture': 10
                    });
                    addLog('Taste Graph reset to baseline.', 'system');
                  }}
                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> Reset
                </button>
              </div>

              <div className="space-y-2">
                {Object.entries(tasteGraph).map(([cat, val]) => (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                      <span>{cat}</span>
                      <span className="font-bold">{val} pts</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(val, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Independent Scroll Console Log Container */}
            <div className="p-3 bg-slate-900 text-slate-200 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Event Stream
                </span>
                <span className="text-[9px] text-slate-500 font-mono">Independent Scroll</span>
              </div>

              <div 
                ref={eventLogContainerRef}
                className="max-h-56 h-56 overflow-y-auto space-y-1.5 pr-1 font-mono text-[10px] no-scrollbar scroll-smooth"
              >
                {telemetryLogs.map(log => (
                  <div 
                    key={log.id} 
                    className={`p-2 rounded-lg border transition-all ${
                      log.type === 'peek' ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300' :
                      log.type === 'commit' ? 'bg-blue-950/60 border-blue-800/60 text-blue-300' :
                      log.type === 'discard' ? 'bg-amber-950/60 border-amber-800/60 text-amber-300' :
                      'bg-slate-800/70 border-slate-700/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[8px] text-slate-400 mb-0.5">
                      <span className="font-bold tracking-wider">{log.type.toUpperCase()}</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <p className="leading-tight">{log.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        )}
      </div>

      {showTour && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] pointer-events-auto" onClick={() => setShowTour(false)} />

          <div 
            className={`pointer-events-auto absolute z-50 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-700 max-w-sm w-80 animate-in fade-in zoom-in-95 duration-200 ${
              tourStepIndex === 0 ? 'top-28 left-6 md:left-24' :
              tourStepIndex === 1 ? 'top-16 right-16' :
              tourStepIndex === 2 ? 'bottom-20 right-80 lg:right-96' :
              'bottom-24 left-1/2 -translate-x-1/2'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {React.createElement(currentTourStep.icon, { className: "w-4 h-4 text-emerald-400" })}
                <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                  Tour Step {tourStepIndex + 1} of {ANCHORED_TOUR_STEPS.length}
                </span>
              </div>
              <button 
                onClick={() => setShowTour(false)}
                className="text-slate-400 hover:text-white p-1"
                title="Exit Tour"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="font-extrabold text-sm text-white mb-1.5">
              {currentTourStep.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {currentTourStep.description}
            </p>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-2 mb-4 text-[11px] text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{currentTourStep.actionHint}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowTour(false)}
                className="text-[11px] text-slate-400 hover:text-slate-200 font-semibold"
              >
                Skip Tour
              </button>

              <div className="flex items-center gap-1.5">
                {tourStepIndex > 0 && (
                  <button
                    onClick={() => setTourStepIndex(prev => prev - 1)}
                    className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Back
                  </button>
                )}

                {tourStepIndex < ANCHORED_TOUR_STEPS.length - 1 ? (
                  <button
                    onClick={() => setTourStepIndex(prev => prev + 1)}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1 shadow-md shadow-red-600/30"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowTour(false)}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 shadow-md shadow-emerald-600/30"
                  >
                    <Check className="w-3 h-3" />
                    <span>Got It</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {selectedPin && activeModalMode === 'peek' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl border-4 border-emerald-500 relative">
            
            <div className="absolute top-4 left-4 z-20 bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              PEEK MODE • SESSION ISOLATED
            </div>

            <div className="md:w-1/2 bg-slate-900 relative flex items-center justify-center min-h-[280px]">
              <img
                src={selectedPin.image}
                alt={selectedPin.title}
                className="w-full h-full object-cover max-h-[70vh]"
              />
            </div>

            <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto bg-slate-50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    {selectedPin.category}
                  </span>
                  <button 
                    onClick={closeModal}
                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 mb-1 leading-tight">
                  {selectedPin.title}
                </h2>
                <p className="text-xs text-slate-500 mb-5">By {selectedPin.author}</p>

                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 mb-5 shadow-sm">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Isolated Session Active</h4>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        Viewing this Pin and recommendations won't alter your Home Feed unless explicitly committed below.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    Isolated "More Like This"
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {RELATED_PINS_POOL.map(rel => (
                      <div key={rel.id} className="group relative rounded-xl overflow-hidden bg-slate-200 aspect-square">
                        <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                          <p className="text-[9px] text-white font-medium line-clamp-2">{rel.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div 
                id="tour-commit-actions"
                className={`mt-6 pt-4 border-t border-slate-200 space-y-2 ${
                  showTour && tourStepIndex === 3 ? 'ring-4 ring-emerald-500 rounded-2xl p-2 bg-white' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCommitPeekSession}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-3 rounded-full shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Add to Taste Graph
                  </button>

                  <button
                    onClick={handleDiscardPeekSession}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-full transition-all flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-600" />
                    Discard & Exit
                  </button>
                </div>
                <p className="text-[9px] text-center text-slate-400">
                  Discarding purges session telemetry permanently.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {selectedPin && activeModalMode === 'standard' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full hover:bg-white text-slate-700 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-1/2 bg-slate-100">
              <img src={selectedPin.image} alt={selectedPin.title} className="w-full h-full object-cover" />
            </div>

            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  {selectedPin.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-3 mb-2">{selectedPin.title}</h2>
                <p className="text-xs text-slate-500 mb-6">By {selectedPin.author}</p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Standard View:</strong> This click immediately added +15 points to your "{selectedPin.category}" Taste Graph profile.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button onClick={closeModal} className="w-full bg-slate-900 text-white font-bold py-3 rounded-full text-xs">
                  Close & Continue Browsing
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}