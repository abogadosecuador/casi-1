import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Window } from './components/Window';
import { ExplorerApp, LegalWebApp, SettingsApp, BrowserApp, CalculatorApp, CalendarApp, GamesApp } from './components/Apps';
import { UserSession, WindowState, AppDefinition, AppId } from './types';
import { 
  Scale, 
  Settings, 
  Calendar as CalendarIcon, 
  LayoutGrid, 
  Wifi, 
  Battery,
  Power,
  Globe,
  Folder,
  Calculator,
  Gamepad2,
  Briefcase
} from 'lucide-react';

// --- APP REGISTRY ---
const APPS: Record<AppId, AppDefinition> = {
  'explorer': { 
    id: 'explorer', 
    title: 'Archivos', 
    icon: <Folder size={24} className="text-blue-500 fill-blue-500/20" />, 
    component: <ExplorerApp /> 
  },
  'browser': { 
    id: 'browser', 
    title: 'Aurora Web', 
    icon: <Globe size={24} className="text-blue-400" />, 
    component: <BrowserApp /> 
  },
  'legal-web': { 
    id: 'legal-web', 
    title: 'Abg. Wilson Ipiales', 
    icon: <Scale size={24} className="text-indigo-600 dark:text-indigo-400" />, 
    component: <LegalWebApp /> 
  },
  'settings': { 
    id: 'settings', 
    title: 'Ajustes', 
    icon: <Settings size={24} className="text-gray-500" />, 
    component: null 
  }, 
  'calendar': { 
    id: 'calendar', 
    title: 'Calendario', 
    icon: <CalendarIcon size={24} className="text-red-500" />, 
    component: <CalendarApp /> 
  },
  'calculator': {
    id: 'calculator',
    title: 'Calculadora', 
    icon: <Calculator size={24} className="text-orange-500" />,
    component: <CalculatorApp />
  },
  'games': {
    id: 'games',
    title: 'Juegos',
    icon: <Gamepad2 size={24} className="text-purple-500" />,
    component: <GamesApp />
  }
};

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  // Auto-open Welcome App on login
  useEffect(() => {
    if (session && windows.length === 0) {
       openApp('legal-web');
    }
  }, [session]);

  const openApp = (appId: AppId) => {
    const existing = windows.find(w => w.appId === appId && appId !== 'browser'); 
    
    // Dock Interaction Logic
    if (existing) {
      if (existing.isMinimized) {
        handleMinimizeWindow(existing.id); // Restore
        handleFocusWindow(existing.id);
      } else if (activeWindowId === existing.id) {
        handleMinimizeWindow(existing.id); // Minimize if already active
      } else {
        handleFocusWindow(existing.id); // Bring to front
      }
      setStartMenuOpen(false);
      return;
    }

    // Determine initial size/position
    const isMobile = window.innerWidth < 768;
    
    let defaultWidth = 900;
    let defaultHeight = 600;

    if (appId === 'calculator') {
        defaultWidth = 320;
        defaultHeight = 500;
    } else if (appId === 'games') {
        defaultWidth = 600;
        defaultHeight = 450;
    }

    // Centering logic
    const startX = isMobile ? 0 : Math.max(0, (window.innerWidth - defaultWidth) / 2) + (windows.length * 20);
    const startY = isMobile ? 0 : Math.max(0, (window.innerHeight - defaultHeight) / 2) + (windows.length * 20);

    const newWindow: WindowState = {
      id: Math.random().toString(36).substr(2, 9),
      appId,
      title: APPS[appId].title,
      x: startX,
      y: startY,
      width: defaultWidth,
      height: defaultHeight,
      isMinimized: false,
      // Start maximized on mobile, but user can toggle it off now
      isMaximized: isMobile, 
      zIndex: windows.length + 1,
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleFocusWindow = (id: string) => {
    setActiveWindowId(id);
    // Move to top of stack
    setWindows(prev => {
        const maxZ = Math.max(0, ...prev.map(w => w.zIndex));
        return prev.map(w => ({
            ...w,
            zIndex: w.id === id ? maxZ + 1 : w.zIndex
        }));
    });
  };

  const handleMoveWindow = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  };

  const handleResizeWindow = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, width, height } : w));
  };

  const handleMinimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMaximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    handleFocusWindow(id);
  };

  if (!session) {
    return <Login onLogin={setSession} />;
  }

  return (
    <div className="h-[100dvh] w-screen overflow-hidden text-sm select-none font-sans relative transition-colors duration-500 bg-gray-200 dark:bg-black">
       {/* Wallpaper */}
       <div className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105 ${theme === 'dark' ? 'bg-wallpaper-dark opacity-40 grayscale' : 'bg-wallpaper-light opacity-80 grayscale'}`} />
       
       {/* Desktop Area */}
       <main className="absolute inset-0 pb-20 pt-10 px-4" onPointerDown={() => { setStartMenuOpen(false); }}>
          
          {/* Top Bar */}
          <div className="fixed top-0 left-0 right-0 h-8 bg-white/60 dark:bg-black/60 backdrop-blur-xl flex items-center justify-between px-4 text-black dark:text-white z-[60] border-b border-white/10 shadow-sm">
            <div className="flex items-center gap-4 font-bold text-xs tracking-wide">
              <span className="flex items-center gap-2 opacity-90 cursor-default">
                 <LayoutGrid size={14}/> Abogados OS
              </span>
              <button className="hidden sm:inline font-normal opacity-70 hover:opacity-100">Archivo</button>
              <button className="hidden sm:inline font-normal opacity-70 hover:opacity-100">Edición</button>
              <button className="hidden sm:inline font-normal opacity-70 hover:opacity-100">Ver</button>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium opacity-80">
              <div className="hidden sm:flex items-center gap-1"><Wifi size={12} /></div>
              <div className="flex items-center gap-1"><Battery size={12} /> 100%</div>
              <div>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>

          {/* Desktop Shortcuts */}
          <div className="absolute top-14 left-4 flex flex-col gap-6 z-10 hidden md:flex">
            {[
              { id: 'legal-web', name: 'Portafolio', icon: <Scale className="text-indigo-500 drop-shadow-md" size={32} /> },
              { id: 'explorer', name: 'Archivos', icon: <Folder className="text-blue-300 drop-shadow-md fill-blue-300/50" size={32} /> },
              { id: 'browser', name: 'Internet', icon: <Globe className="text-blue-400 drop-shadow-md" size={32} /> }
            ].map(shortcut => (
              <button key={shortcut.id} onDoubleClick={() => openApp(shortcut.id as AppId)} className="group flex flex-col items-center gap-1 w-24 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white/5 rounded-xl border border-white/5 shadow-inner">
                  {shortcut.icon}
                </div>
                <span className="text-[12px] font-medium text-white shadow-black drop-shadow-md text-center leading-tight">{shortcut.name}</span>
              </button>
            ))}
          </div>

          {/* Windows Layer */}
          {windows.map(win => (
            <Window
              key={win.id}
              window={win}
              isActive={activeWindowId === win.id}
              onClose={closeWindow}
              onFocus={handleFocusWindow}
              onMove={handleMoveWindow}
              onResize={handleResizeWindow}
              onMinimize={handleMinimizeWindow}
              onMaximize={handleMaximizeWindow}
            >
              {win.appId === 'settings' 
                ? <SettingsApp theme={theme} toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
                : APPS[win.appId].component}
            </Window>
          ))}
       </main>

       {/* Start Menu */}
       {startMenuOpen && (
         <div className="fixed bottom-20 left-4 w-72 md:w-80 glass-panel rounded-xl p-4 flex flex-col gap-4 animate-[slideUp_0.2s_ease-out] z-[70] shadow-2xl origin-bottom-left border border-white/20">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-400/10">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {session.name.charAt(0)}
              </div>
              <div>
                <div className="text-gray-900 dark:text-white font-bold text-sm">{session.name}</div>
                <div className="text-gray-500 dark:text-white/50 text-xs">Abogados OS Usuario</div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 py-2">
              {Object.values(APPS).map(app => (
                <button 
                  key={app.id} 
                  onClick={() => openApp(app.id)}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition active:scale-95"
                >
                  <div className="p-2 rounded bg-transparent">{app.icon}</div>
                  <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300 truncate w-full text-center">{app.title}</span>
                </button>
              ))}
            </div>

            <div className="mt-2 pt-3 border-t border-gray-400/10 flex justify-between">
              <button onClick={() => openApp('settings')} className="px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300 transition">
                <Settings size={14} /> Ajustes
              </button>
              <button onClick={() => setSession(null)} className="px-3 py-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-300 rounded-lg flex items-center gap-2 text-xs font-medium transition">
                <Power size={14} /> Salir
              </button>
            </div>
         </div>
       )}

       {/* Dock */}
       <div className="fixed bottom-4 left-1/2 -translate-x-1/2 h-16 bg-white/40 dark:bg-black/50 backdrop-blur-2xl rounded-2xl border border-white/20 px-4 flex items-center gap-2 shadow-2xl z-[70]">
         <button 
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`p-2 rounded-xl transition-all duration-300 active:scale-90 hover:bg-white/20`}
         >
           <LayoutGrid size={24} className="text-gray-800 dark:text-white opacity-80" />
         </button>
         
         <div className="w-px h-8 bg-gray-400/20 mx-1" />
         
         {['legal-web', 'explorer', 'browser', 'calendar', 'calculator', 'games'].map(id => {
           const appId = id as AppId;
           const isOpen = windows.some(w => w.appId === appId && !w.isMinimized);
           const isMinimized = windows.some(w => w.appId === appId && w.isMinimized);
           const isActive = activeWindowId === windows.find(w => w.appId === appId)?.id;

           return (
             <button
               key={id}
               onClick={() => openApp(appId)}
               className="relative group p-2 transition-all duration-200"
               title={APPS[appId].title}
             >
               <div className={`
                 transition-all duration-300 transform p-2 rounded-xl
                 ${isActive ? '-translate-y-2 scale-110 bg-white/10' : 'hover:-translate-y-1 hover:scale-105 hover:bg-white/5'}
               `}>
                 {APPS[appId].icon}
               </div>
               
               {/* Dot Indicator */}
               {(isOpen || isMinimized) && (
                 <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-500'}`} />
               )}
             </button>
           );
         })}
       </div>
    </div>
  );
}