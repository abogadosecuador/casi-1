
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SequenceState } from './types';
import { Scene1Balance } from './components/Scene1Balance';
import { Scene2Tunnel } from './components/Scene2Tunnel';
import { Scene3Hub } from './components/Scene3Hub';
import { Scene4Logo } from './components/Scene4Logo';
import { Scene5Entry } from './components/Scene5Entry';
import { Scene6Outro } from './components/Scene6Outro';
import { GameHubEnhanced } from './components/GameHubEnhanced';
import { Play } from 'lucide-react';
import { initAudio, playRetroSound } from './utils/audio';

const App: React.FC = () => {
  const [sequenceState, setSequenceState] = useState<SequenceState>(SequenceState.IDLE);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is authenticated from localStorage (synced from main app)
  useEffect(() => {
    const nexusUser = localStorage.getItem('nexuspro_user');
    if (nexusUser) {
      try {
        JSON.parse(nexusUser);
        setIsAuthenticated(true);
        // Auto-start sequence if authenticated
        initAudio();
        playRetroSound('START');
        setSequenceState(SequenceState.SCENE_1_BALANCE);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);
  
  const startSequence = () => {
    initAudio();
    playRetroSound('START'); // Subtle beep
    setSequenceState(SequenceState.SCENE_1_BALANCE);
  };

  useEffect(() => {
    let timer: any;

    if (sequenceState === SequenceState.SCENE_1_BALANCE) {
      // 0-1s: Balance
      // Sound: Gentle chime? Handled in component or just ambient.
      timer = setTimeout(() => setSequenceState(SequenceState.SCENE_2_TUNNEL), 1500); 
    } else if (sequenceState === SequenceState.SCENE_2_TUNNEL) {
      // 1-3s: Tunnel (Duration 2.5s)
      timer = setTimeout(() => setSequenceState(SequenceState.SCENE_3_REVEAL), 2500);
    } else if (sequenceState === SequenceState.SCENE_3_REVEAL) {
      // 3-5s: Hub Reveal (Duration 2s)
      // Sound: Swoosh is good here
      timer = setTimeout(() => setSequenceState(SequenceState.SCENE_4_LOGO), 2000);
    } else if (sequenceState === SequenceState.SCENE_4_LOGO) {
      // 5-7s: Logo Full (Duration 2.5s)
      playRetroSound('POWERON'); // Deep synth
      timer = setTimeout(() => setSequenceState(SequenceState.SCENE_5_ENTRY), 2500);
    } else if (sequenceState === SequenceState.SCENE_5_ENTRY) {
      // 7-9s: Entry (Duration 2.5s)
      timer = setTimeout(() => setSequenceState(SequenceState.SCENE_6_OUTRO), 2500);
    } else if (sequenceState === SequenceState.SCENE_6_OUTRO) {
      // 9-10s: Outro (Duration 1s + fade out)
      playRetroSound('SUCCESS');
      timer = setTimeout(() => setSequenceState(SequenceState.FINISHED), 3000);
    }

    return () => clearTimeout(timer);
  }, [sequenceState]);

  const showHub = sequenceState === SequenceState.SCENE_3_REVEAL || 
                  sequenceState === SequenceState.SCENE_4_LOGO ||
                  sequenceState === SequenceState.SCENE_5_ENTRY;

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden relative font-['Orbitron']">
      
      {/* Background Ambience (Persistent) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80 z-0" />
      
      {/* Main Stage */}
      <AnimatePresence mode="wait">
        {sequenceState === SequenceState.IDLE && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
            onClick={startSequence}
          >
            <div className="group relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
               <button className="relative px-8 py-4 bg-black rounded-lg border border-cyan-500/50 text-cyan-400 flex items-center gap-3 text-xl font-bold tracking-widest uppercase hover:text-white transition-colors">
                  <Play className="w-6 h-6 fill-current" /> Initialize System
               </button>
            </div>
          </motion.div>
        )}

        {sequenceState === SequenceState.SCENE_1_BALANCE && <Scene1Balance key="scene1" />}
        {sequenceState === SequenceState.SCENE_2_TUNNEL && <Scene2Tunnel key="scene2" />}
        
        {showHub && (
            <div className="absolute inset-0 z-10">
               <Scene3Hub showFullLogo={sequenceState === SequenceState.SCENE_4_LOGO || sequenceState === SequenceState.SCENE_5_ENTRY} 
                          enterPortal={sequenceState === SequenceState.SCENE_5_ENTRY} />
               
               {sequenceState === SequenceState.SCENE_4_LOGO && <Scene4Logo />}
               {sequenceState === SequenceState.SCENE_5_ENTRY && <Scene5Entry />}
            </div>
        )}
        
        {sequenceState === SequenceState.SCENE_6_OUTRO && <Scene6Outro key="scene6" />}

        {sequenceState === SequenceState.FINISHED && (
          <motion.div
            key="finished"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <GameHubEnhanced onRestartIntro={() => setSequenceState(SequenceState.IDLE)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Vignette/Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
    </div>
  );
};

export default App;
