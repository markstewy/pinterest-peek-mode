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
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'rel-2',
    title: 'Organic Texture Linen Couch Styling',
    category: 'Home Decor',
    author: 'Soft Spaces',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'rel-3',
    title: 'Handcrafted Japanese Tea Set',
    category: 'Art & Craft',
    author: 'Kyoto Crafts',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80',
    aspect: 'aspect-[1/1]'
  },
  {
    id: 'rel-4',
    title: 'Subtle Earth Tone Architectural Wallpapers',
    category: 'Home Decor',
    author: 'Design Studio',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'rel-5',
    title: 'Minimalist Concrete Planter Stand',
    category: 'Home Decor',
    author: 'Raw Living',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'rel-6',
    title: 'Vintage Brass Desk Lamp & Decor',
    category: 'Tech & Architecture',
    author: 'Retro Foundry',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80',
    aspect: 'aspect-[2/3]'
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
    description: 'Toggle Peek Mode ON to isolate all standard clicks automatically without polluting your home feed recommendations.',
    actionHint: 'Toggles platform-wide insulation'
  },
  {
    step: 3,
    targetId: 'tour-telemetry-panel',
    title: '3. Real-Time Telemetry Log',
    icon: BarChart3,
    position: 'left-center',
    description: 'Watch your feed protection statistics and live event stream update in real time with an independent scroll window.',
    actionHint: 'Tracks feed pollution prevented'
  },
  {
    step: 4,
    targetId: 'tour-commit-actions',
    title: '4. Exit Peek vs. Train Feed Control',
    icon: Target,
    position: 'top-center',
    description: 'Inside Peek Mode, you choose: "Train Feed" updates your algorithm, or "Exit Peek" closes out without affecting your recommendations.',
    actionHint: 'Explicit user control over feed algorithm'
  }
];

export default function App() {
  const [globalPeekMode, setGlobalPeekMode] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [activeModalMode, setActiveModalMode] = useState(null); // 'standard' | 'peek'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [showTelemetry, setShowTelemetry] = useState(true);
  const [isTelemetryCollapsed, setIsTelemetryCollapsed] = useState(false);

  // Guided Tour State
  const [showTour, setShowTour] = useState(true);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, text: 'System initialized. Feed protection active.', type: 'system', timestamp: '10:00 AM' }
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
    addLog(`STANDARD TAP: Indexed "${pin.category}" into feed algorithm.`, 'standard');
  };

  const handlePeekClick = (pin) => {
    setSelectedPin(pin);
    setActiveModalMode('peek');
    setPeekSessionCount(prev => prev + 1);
    addLog(`PEEK SESSION: Opened "${pin.title}". Isolated from feed.`, 'peek');

    if (showTour && (tourStepIndex === 0 || tourStepIndex === 1)) {
      setTourStepIndex(3);
    }
  };

  // Unified Single Click Handler for Full Card (Image + Text)
  const handleCardSingleClick = (pin, e) => {
    if (isHoldCompletedRef.current) {
      isHoldCompletedRef.current = false;
      return;
    }

    if (globalPeekMode) {
      handlePeekClick(pin);
    } else {
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

  const handleTrainFeed = () => {
    if (!selectedPin) return;
    addLog(`TRAINED FEED: User trained algorithm with "${selectedPin.category}".`, 'commit');
    closeModal();
  };

  const handleExitPeek = () => {
    if (!selectedPin) return;
    setPreventedDistortions(prev => prev + 1);
    addLog(`EXIT PEEK: Session ignored. Feed algorithm protected.`, 'discard');
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-red-100 selection:text-red-600 select-none relative pb-16 md:pb-0 overflow-x-hidden">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-2 sm:px-4 py-2.5 flex items-center justify-between gap-1.5 sm:gap-3 shadow-sm w-full box-border">
        
        {/* Logo & Guided Tour Launcher */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md shadow-red-500/20 shrink-0">
            P
          </div>
          <span className="text-[10px] sm:text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full border border-slate-200 whitespace-nowrap">
            Peek POC
          </span>

          <button
            onClick={() => {
              setTourStepIndex(0);
              setShowTour(true);
            }}
            className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full border border-red-200 transition-all shadow-sm shrink-0"
          >
            <Compass className="w-3 h-3" />
            <span className="hidden xs:inline">Tour</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-[180px] sm:max-w-xs relative min-w-[80px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 focus:bg-white text-slate-800 text-xs pl-8 pr-2.5 py-1.5 rounded-full transition-all outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 border border-transparent"
          />
        </div>

        {/* Peek Mode Switcher & Telemetry Panel Toggle */}
        <div className="flex items-center gap-1 shrink-0">
          <div id="tour-header-toggle" className="relative">
            <button
              onClick={() => {
                const nextState = !globalPeekMode;
                setGlobalPeekMode(nextState);
                addLog(`GLOBAL PEEK MODE: ${nextState ? 'ENABLED (Single clicks open Peek Sessions)' : 'DISABLED (Single clicks open Standard Views)'}`, nextState ? 'peek' : 'system');
              }}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-full font-medium text-[11px] sm:text-xs transition-all shadow-sm ${
                globalPeekMode 
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20 ring-2 ring-emerald-500/30' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Shield className={`w-3.5 h-3.5 ${globalPeekMode ? 'animate-pulse' : 'text-slate-500'}`} />
              <span className="font-bold">{globalPeekMode ? 'ON' : 'OFF'}</span>
            </button>

            {showTour && tourStepIndex === 1 && (
              <span className="absolute -inset-1 rounded-full border-2 border-emerald-500 animate-ping pointer-events-none" />
            )}
          </div>

          <button
            onClick={() => setShowTelemetry(!showTelemetry)}
            className={`p-2 rounded-full transition-all shrink-0 ${
              showTelemetry ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Toggle Live Telemetry Console"
          >
            <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
      <div className="flex-1 flex overflow-hidden relative pb-12 md:pb-0">
        
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
                  onTouchEnd={(e) => {
                    cancelHoldGesture();
                  }}
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
                      <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-white pointer-events-none">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between pointer-events-none md:pointer-events-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                          {pin.category}
                        </span>

                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePeekClick(pin);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-1 text-[11px] font-semibold px-2.5 cursor-pointer pointer-events-auto"
                          title="Open in isolated Peek Session"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Peek</span>
                        </div>
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
            className={`fixed bottom-0 left-0 right-0 z-30 md:relative md:bottom-auto md:left-auto md:right-auto md:w-80 lg:w-96 bg-white border-t md:border-t-0 md:border-l border-slate-200 flex flex-col shadow-2xl md:shadow-xl transition-all duration-300 ${
              isTelemetryCollapsed ? 'max-h-12 overflow-hidden' : 'max-h-[60vh] md:max-h-none'
            } ${
              showTour && tourStepIndex === 2 ? 'ring-4 ring-purple-500/80 z-40' : ''
            }`}
          >
            {/* Panel Header */}
            <div 
              className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white cursor-pointer md:cursor-default select-none"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsTelemetryCollapsed(!isTelemetryCollapsed);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-xs tracking-wide">Algorithm Protection Log</h3>
                <span className="text-[10px] bg-slate-800 text-emerald-300 px-2 py-0.5 rounded-full font-mono md:hidden">
                  {isTelemetryCollapsed ? '▲ Tap to Expand' : '▼ Tap to Minimize'}
                </span>
              </div>
              <div className="flex items-center">
                <span 
                  onClick={() => setIsTelemetryCollapsed(!isTelemetryCollapsed)}
                  className="text-xs font-semibold px-2 text-slate-300 hover:text-white md:hidden cursor-pointer"
                >
                  {isTelemetryCollapsed ? 'Expand' : 'Collapse'}
                </span>
              </div>
            </div>

            {/* Collapsible Body Wrapper */}
            <div className={`flex-1 flex flex-col overflow-hidden transition-all ${isTelemetryCollapsed ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-3 border-b border-slate-100 bg-slate-50 grid grid-cols-2 gap-2">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Peek Sessions</span>
                  <p className="text-lg font-black text-emerald-600">{peekSessionCount}</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Distortions Blocked</span>
                  <p className="text-lg font-black text-indigo-600">{preventedDistortions}</p>
                </div>
              </div>

              {/* Independent Scroll Console Log Container */}
              <div className="p-3 bg-slate-900 text-slate-200 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Live Activity Stream
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">Independent Scroll</span>
                </div>

                <div 
                  ref={eventLogContainerRef}
                  className="max-h-40 md:max-h-56 h-40 md:h-56 overflow-y-auto space-y-1.5 pr-1 font-mono text-[10px] no-scrollbar scroll-smooth"
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
              tourStepIndex === 2 ? 'bottom-24 left-1/2 -translate-x-1/2 md:left-auto md:right-80 lg:right-96 md:bottom-20' :
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

      {/* Expanded Immersive Peek Modal ("Exit Peek" & "Train Feed") */}
      {selectedPin && activeModalMode === 'peek' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-6xl w-full h-[94vh] overflow-hidden flex flex-col shadow-2xl border-4 border-emerald-500 relative">
            
            {/* Modal Top Floating Header Bar */}
            <div className="px-4 sm:px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-600 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  PEEK SESSION • ISOLATED
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline">• Browse related ideas before deciding</span>
              </div>
              
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                title="Close Peek"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Pane Modal Body */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-slate-50 relative pb-20 md:pb-0">
              
              {/* Left Pane: Main Peeked Pin View */}
              <div className="md:w-5/12 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 bg-white">
                <div>
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-lg mb-4 max-h-[40vh] md:max-h-[50vh] flex items-center justify-center">
                    <img
                      src={selectedPin.image}
                      alt={selectedPin.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    {selectedPin.category}
                  </span>

                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2 mb-1 leading-snug">
                    {selectedPin.title}
                  </h2>
                  <p className="text-xs text-slate-500 mb-3">By {selectedPin.author}</p>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-4 hidden md:block">
                    <div className="flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Feed Protected</h4>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          Browsing these recommendations won't change your home feed unless you train your feed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exit Peek & Train Feed Controls (Desktop & Tablet normal flow) */}
                <div 
                  id="tour-commit-actions"
                  className={`pt-4 border-t border-slate-200 space-y-2 hidden md:block ${
                    showTour && tourStepIndex === 3 ? 'ring-4 ring-emerald-500 rounded-2xl p-2 bg-white' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExitPeek}
                      className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-3 px-3 rounded-full transition-all flex items-center justify-center gap-1.5"
                    >
                      <X className="w-4 h-4 text-slate-600" />
                      Exit Peek
                    </button>

                    <button
                      onClick={handleTrainFeed}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 px-3 rounded-full shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      Train Feed
                    </button>
                  </div>
                  <p className="text-[9px] text-center text-slate-400">
                    "Exit Peek" keeps your home feed clean.
                  </p>
                </div>
              </div>

              {/* Right Pane: Recommended "More Like This" Grid */}
              <div className="md:w-7/12 p-4 sm:p-6 overflow-y-auto bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    More Like This (Isolated Stream)
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">6 Related Pins</span>
                </div>

                {/* Masonry Grid of Recommended Pins */}
                <div className="columns-2 gap-3 space-y-3 pb-6">
                  {RELATED_PINS_POOL.map(rel => (
                    <div 
                      key={rel.id} 
                      onClick={() => addLog(`PEEK INTERACTION: Viewed related recommendation "${rel.title}". Session remains isolated.`, 'peek')}
                      className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className={`relative w-full ${rel.aspect} bg-slate-200 overflow-hidden`}>
                        <img 
                          src={rel.image} 
                          alt={rel.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex items-end">
                          <p className="text-[10px] text-white font-medium leading-tight line-clamp-2">{rel.title}</p>
                        </div>
                      </div>
                      <div className="p-2.5">
                        <h4 className="font-bold text-slate-900 text-[11px] leading-snug line-clamp-1">{rel.title}</h4>
                        <p className="text-[9px] text-slate-500">By {rel.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Mobile Sticky Bottom Action Bar ("Exit Peek" & "Train Feed") */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl z-30 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExitPeek}
                  className="flex-1 bg-slate-200 text-slate-800 text-xs font-bold py-3 px-3 rounded-full flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4 text-slate-600" />
                  Exit Peek
                </button>

                <button
                  onClick={handleTrainFeed}
                  className="flex-1 bg-red-600 text-white text-xs font-bold py-3 px-3 rounded-full shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Train Feed
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Expanded Immersive Standard View Modal */}
      {selectedPin && activeModalMode === 'standard' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-6xl w-full h-[94vh] overflow-hidden flex flex-col shadow-2xl relative">
            
            {/* Modal Top Floating Header Bar */}
            <div className="px-4 sm:px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-amber-600 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  STANDARD VIEW • ADDED TO ALGORITHM
                </div>
              </div>
              
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Pane Modal Body */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-slate-50 relative pb-20 md:pb-0">
              
              {/* Left Pane: Main Pin View */}
              <div className="md:w-5/12 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 bg-white">
                <div>
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-lg mb-4 max-h-[40vh] md:max-h-[50vh] flex items-center justify-center">
                    <img
                      src={selectedPin.image}
                      alt={selectedPin.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                    {selectedPin.category}
                  </span>

                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2 mb-1 leading-snug">
                    {selectedPin.title}
                  </h2>
                  <p className="text-xs text-slate-500 mb-3">By {selectedPin.author}</p>

                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mb-4">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-amber-900">Algorithm Trained</h4>
                        <p className="text-[11px] text-amber-700 leading-snug">
                          This standard view updated your home feed recommendations for "{selectedPin.category}".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button (Desktop) */}
                <div className="pt-4 border-t border-slate-200 hidden md:block">
                  <button
                    onClick={closeModal}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 px-3 rounded-full shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    Close & Continue Browsing
                  </button>
                </div>
              </div>

              {/* Right Pane: Recommended "More Like This" Grid */}
              <div className="md:w-7/12 p-4 sm:p-6 overflow-y-auto bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-red-600" />
                    Recommended Recommendations
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">6 Related Pins</span>
                </div>

                {/* Masonry Grid */}
                <div className="columns-2 gap-3 space-y-3 pb-6">
                  {RELATED_PINS_POOL.map(rel => (
                    <div 
                      key={rel.id} 
                      className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm"
                    >
                      <div className={`relative w-full ${rel.aspect} bg-slate-200 overflow-hidden`}>
                        <img 
                          src={rel.image} 
                          alt={rel.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="p-2.5">
                        <h4 className="font-bold text-slate-900 text-[11px] leading-snug line-clamp-1">{rel.title}</h4>
                        <p className="text-[9px] text-slate-500">By {rel.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Mobile Sticky Bottom Action Bar */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl z-30">
              <button
                onClick={closeModal}
                className="w-full bg-slate-900 text-white text-xs font-bold py-3 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-lg"
              >
                Close & Continue Browsing
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}