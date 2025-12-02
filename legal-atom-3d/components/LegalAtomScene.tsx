import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  Trail, 
  Sparkles,
  Environment,
  Text3D,
  Center,
  Instance,
  Instances
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- Constants & Types ---
const GOLD_COLOR = new THREE.Color("#FFD700");
const ANTIQUE_GOLD = new THREE.Color("#B8860B"); // Darker, richer gold
const PLATINUM_COLOR = new THREE.Color("#E5E4E2");
const BLUE_NEON = new THREE.Color("#00f3ff");
const CYAN_GLOW = new THREE.Color("#22d3ee");
const DEEP_ONYX = new THREE.Color("#0f172a");
const PROFESSIONAL_RED = new THREE.Color("#991b1b"); 

// Professional Serif Font
const FONT_URL = "https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json";

// --- Ultra-Premium Materials ---

const goldMaterial = new THREE.MeshPhysicalMaterial({
  color: GOLD_COLOR,
  metalness: 1.0,
  roughness: 0.15,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  reflectivity: 1,
  emissive: ANTIQUE_GOLD,
  emissiveIntensity: 0.15,
});

const onyxMaterial = new THREE.MeshPhysicalMaterial({
    color: DEEP_ONYX,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 1.0
});

const paperMaterial = new THREE.MeshStandardMaterial({
    color: "#f5f5dc", // Beige parchment
    roughness: 0.9,
    metalness: 0.1
});

const sealMaterial = new THREE.MeshPhysicalMaterial({
    color: PROFESSIONAL_RED,
    roughness: 0.3,
    metalness: 0.2,
    clearcoat: 0.5
});

// --- Components ---

// 1. TYPEWRITER 3D TEXT (Spinning & Typing)
const TypewriterWord = ({ text, radius, speed, yOffset, rotationOffset }: { text: string, radius: number, speed: number, yOffset: number, rotationOffset: number }) => {
    const orbitRef = useRef<THREE.Group>(null);
    const textMeshRef = useRef<THREE.Group>(null);
    const [displayedText, setDisplayedText] = useState("");
    
    // Typing Logic
    useEffect(() => {
        let currentIndex = 0;
        setDisplayedText(""); // Reset on text change
        const intervalId = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 300); 

        return () => clearInterval(intervalId);
    }, [text]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        
        // Orbital Motion
        if(orbitRef.current) {
            const angle = t * speed * 0.5 + rotationOffset;
            orbitRef.current.position.x = Math.cos(angle) * radius;
            orbitRef.current.position.z = Math.sin(angle) * radius;
            // Constant "Face Center" orientation for the group
            orbitRef.current.lookAt(0, yOffset * 0.5, 0);
        }

        // Local Spin (The text itself spins slowly)
        if(textMeshRef.current) {
            textMeshRef.current.rotation.y += 0.02; 
        }
    });

    return (
        <group ref={orbitRef} position={[radius, yOffset, 0]}>
            <group ref={textMeshRef}>
                <Center>
                    {displayedText.length > 0 && (
                        <Text3D 
                            font={FONT_URL}
                            size={0.6}
                            height={0.15}
                            curveSegments={12}
                            bevelEnabled
                            bevelThickness={0.02}
                            bevelSize={0.01}
                            bevelOffset={0}
                            bevelSegments={3}
                        >
                            {displayedText}
                            <meshPhysicalMaterial 
                                color={GOLD_COLOR} 
                                metalness={1} 
                                roughness={0.1} 
                                clearcoat={1}
                                emissive={ANTIQUE_GOLD}
                                emissiveIntensity={0.2}
                            /> 
                            <meshPhysicalMaterial 
                                attach="material-1" 
                                color={DEEP_ONYX} 
                                metalness={0.8} 
                                roughness={0.4} 
                            />
                        </Text3D>
                    )}
                </Center>
            </group>
        </group>
    )
}

// 2. FOUNTAIN PEN
const FountainPen = () => {
    return (
        <group rotation={[Math.PI / 4, 0, -Math.PI / 4]} scale={0.8}>
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
                <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.6} />
            </mesh>
            <mesh position={[0, -0.2, 0]} material={goldMaterial}>
                <torusGeometry args={[0.105, 0.02, 16, 32]} />
            </mesh>
            <mesh position={[0, 1.2, 0]} material={goldMaterial}>
                 <cylinderGeometry args={[0.105, 0.105, 0.1, 32]} />
            </mesh>
            <group position={[0, 1.45, 0]}>
                <mesh material={goldMaterial}>
                    <coneGeometry args={[0.08, 0.4, 32]} />
                </mesh>
                <mesh position={[0, 0.2, 0]} material={new THREE.MeshStandardMaterial({ color: PLATINUM_COLOR, metalness: 1, roughness: 0.1 })}>
                    <sphereGeometry args={[0.02, 16, 16]} />
                </mesh>
            </group>
        </group>
    );
};

// 3. LEGAL SCROLL (Replaces Brain for a classic look)
const LegalScroll = () => {
    return (
        <group rotation={[0, 0, Math.PI / 6]} scale={1.2}>
            {/* Parchment Roll */}
            <mesh castShadow receiveShadow material={paperMaterial}>
                <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} />
            </mesh>
            {/* Inner Spiral Detail (Ends) */}
            <mesh position={[0, 0.601, 0]} rotation={[Math.PI/2, 0, 0]}>
                 <ringGeometry args={[0.02, 0.14, 32]} />
                 <meshStandardMaterial color="#e5e5c0" />
            </mesh>
            
            {/* Ribbon */}
            <mesh rotation={[0, 0, 0]} material={sealMaterial}>
                <torusGeometry args={[0.155, 0.03, 16, 32]} />
            </mesh>
            
            {/* Wax Seal */}
            <group position={[0.12, 0, 0.08]} rotation={[0, 0, -0.2]}>
                <mesh material={sealMaterial}>
                    <cylinderGeometry args={[0.12, 0.14, 0.05, 16]} />
                </mesh>
                {/* Imprint on Seal */}
                <mesh position={[0, 0.03, 0]} material={goldMaterial}>
                     <cylinderGeometry args={[0.05, 0.06, 0.04, 8]} />
                </mesh>
            </group>
        </group>
    )
}

// 4. MICRO CRYSTALS (Floating bits of truth/data)
const MicroCrystals = () => {
    return (
        <Instances range={20}>
            <octahedronGeometry args={[0.08]} />
            <meshStandardMaterial color={GOLD_COLOR} emissive={GOLD_COLOR} emissiveIntensity={0.5} />
            {Array.from({ length: 20 }).map((_, i) => (
                <MicroCrystalInstance key={i} />
            ))}
        </Instances>
    )
}

const MicroCrystalInstance = () => {
    const ref = useRef<any>(null);
    
    // Memoize random values to prevent re-calculation on render
    const { speed, offset, radius } = useMemo(() => ({
        speed: Math.random() * 0.2 + 0.1,
        offset: Math.random() * 100,
        radius: 2.5 + Math.random()
    }), []);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime * speed + offset;
            ref.current.position.x = Math.sin(t) * radius;
            ref.current.position.y = Math.cos(t * 0.7) * (radius * 0.5);
            ref.current.position.z = Math.cos(t) * radius;
            ref.current.rotation.x = t;
            ref.current.rotation.y = t;
        }
    });

    return <Instance ref={ref} />;
}

// 5. SCALES OF JUSTICE (Ultra Detailed Redesign)
const ScalesOfJustice = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
        // Gentle, dignified sway
        group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
    }
  });

  return (
    <group ref={group}>
      {/* --- BASE --- */}
      <group position={[0, 0.2, 0]}>
        {/* Stepped Pedestal */}
        <mesh position={[0, 0, 0]} material={onyxMaterial}>
            <cylinderGeometry args={[0.6, 0.7, 0.2, 32]} />
        </mesh>
        <mesh position={[0, 0.2, 0]} material={goldMaterial}>
            <cylinderGeometry args={[0.5, 0.55, 0.2, 32]} />
        </mesh>
      </group>

      {/* --- COLUMN --- */}
      <group position={[0, 2, 0]}>
        {/* Fluted Shaft */}
        <mesh material={goldMaterial}>
            <cylinderGeometry args={[0.06, 0.08, 3.5, 16]} />
        </mesh>
        {/* Decorative Rings */}
        <mesh position={[0, 1, 0]} material={goldMaterial}>
            <torusGeometry args={[0.07, 0.02, 16, 32]} />
        </mesh>
        <mesh position={[0, -1, 0]} material={goldMaterial}>
            <torusGeometry args={[0.08, 0.02, 16, 32]} />
        </mesh>
      </group>

      {/* --- FULCRUM (The Pivot) --- */}
      <group position={[0, 3.8, 0]}>
          {/* Main Pivot Sphere */}
          <mesh material={goldMaterial}>
            <sphereGeometry args={[0.15, 32, 32]} />
          </mesh>
          {/* Center Diamond */}
          <mesh position={[0, 0, 0.12]}>
            <octahedronGeometry args={[0.08]} />
            <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff" 
                emissiveIntensity={2} 
                toneMapped={false} 
            />
          </mesh>
          {/* Top Finial */}
          <mesh position={[0, 0.25, 0]} material={goldMaterial}>
             <coneGeometry args={[0.05, 0.3, 16]} />
          </mesh>
      </group>

      {/* --- BEAM --- */}
      <group position={[0, 3.8, 0]}>
         {/* Tapered Beam */}
         <mesh rotation={[0, 0, Math.PI / 2]} material={goldMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 3.2, 32]} />
         </mesh>
         
         {/* Ornate Ends */}
         {[-1.6, 1.6].map((x, i) => (
             <group key={i} position={[x, 0, 0]}>
                 <mesh material={goldMaterial}>
                     <sphereGeometry args={[0.09, 16, 16]} />
                 </mesh>
                 <mesh position={[0, -0.1, 0]} material={goldMaterial}>
                     <torusGeometry args={[0.05, 0.01, 16, 32]} />
                 </mesh>
             </group>
         ))}
      </group>

      {/* --- PANS & CHAINS --- */}
      {[-1.6, 1.6].map((x, i) => (
        <group key={i} position={[x, 3.8, 0]}>
            {/* 3-Point Chain Suspension */}
            <group position={[0, -0.1, 0]}>
                 {/* Chain 1 */}
                 <mesh position={[0, -0.6, 0.3]} rotation={[0.4, 0, 0]} material={goldMaterial}>
                    <cylinderGeometry args={[0.005, 0.005, 1.3, 8]} />
                 </mesh>
                 {/* Chain 2 */}
                 <mesh position={[0.25, -0.6, -0.15]} rotation={[0, 0, -0.3]} material={goldMaterial}>
                    <cylinderGeometry args={[0.005, 0.005, 1.3, 8]} />
                 </mesh>
                 {/* Chain 3 */}
                 <mesh position={[-0.25, -0.6, -0.15]} rotation={[0, 0, 0.3]} material={goldMaterial}>
                    <cylinderGeometry args={[0.005, 0.005, 1.3, 8]} />
                 </mesh>
            </group>
            
            {/* The Pan (Bowl) */}
            <group position={[0, -1.3, 0]}>
                <mesh material={goldMaterial}>
                    <sphereGeometry args={[0.65, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
                    <meshStandardMaterial color={GOLD_COLOR} side={THREE.DoubleSide} metalness={0.9} roughness={0.2} />
                </mesh>
                {/* Rim */}
                <mesh position={[0, 0.55, 0]} rotation={[Math.PI/2, 0, 0]} material={goldMaterial}>
                    <torusGeometry args={[0.62, 0.03, 16, 64]} />
                </mesh>
            </group>
        </group>
      ))}
    </group>
  );
};

// 6. LAW BOOK (Professional Red Pattern)
const LawBook = ({ color = PROFESSIONAL_RED }: { color?: THREE.Color }) => {
  return (
    <group rotation={[Math.random(), Math.random(), Math.random()]}>
       {/* Cover - Deep Red */}
       <mesh scale={[1, 1.4, 0.3]} castShadow>
          <boxGeometry />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
       </mesh>
       {/* Pages */}
       <mesh scale={[0.9, 1.3, 0.25]} position={[0.06, 0, 0]}>
           <boxGeometry />
           <meshStandardMaterial color="#fef3c7" roughness={0.8} />
       </mesh>
       {/* Spine Details (Gold Bands) */}
       <mesh position={[-0.51, 0.4, 0]} rotation={[0, Math.PI/2, 0]} material={goldMaterial}>
            <planeGeometry args={[0.32, 0.05]} />
       </mesh>
       <mesh position={[-0.51, -0.4, 0]} rotation={[0, Math.PI/2, 0]} material={goldMaterial}>
            <planeGeometry args={[0.32, 0.05]} />
       </mesh>
    </group>
  );
};

// 7. ORBITER (Physics Movement - Clean trails only)
const Orbiter = ({ radius, speed, offset, children, trailColor = "#00f3ff" }: any) => {
  const ref = useRef<THREE.Group>(null);
  const wrapperRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current && wrapperRef.current) {
      const t = clock.getElapsedTime() * speed + offset;
      
      // Orbit path
      ref.current.position.x = Math.sin(t) * radius;
      ref.current.position.z = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t * 2) * (radius * 0.3);
      ref.current.lookAt(0, 0, 0);

      // Self rotation
      wrapperRef.current.rotation.x += 0.01;
      wrapperRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group>
      <group ref={ref}>
        <Trail
          width={2} 
          length={8} 
          color={trailColor} 
          attenuation={(t) => t * t}
          transparent
          opacity={0.6}
        >
            <mesh visible={false}>
                <sphereGeometry args={[0.1]} />
                <meshBasicMaterial />
            </mesh>
        </Trail>
        <group ref={wrapperRef}>
            {children}
        </group>
      </group>
    </group>
  );
};

export default function LegalAtomScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}
      camera={{ position: [0, 5, 14], fov: 45 }}
    >
      <Suspense fallback={null}>
        {/* Professional Interactive Controls */}
        <OrbitControls 
          makeDefault 
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={5}      
          maxDistance={25}     
          enablePan={false}    
          autoRotate={true}
          autoRotateSpeed={0.5}
          zoomSpeed={0.8}
          rotateSpeed={0.6}
        />

        <Environment preset="city" />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#ffd700" />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#00f3ff" />
        <spotLight 
          position={[0, 15, 0]} 
          angle={0.4} 
          penumbra={1} 
          intensity={3} 
          castShadow 
        />

        {/* MAIN SCENE GROUP - CENTERED AT [0,0,0] */}
        <group position={[0, 0, 0]}>
          {/* Center Nucleus - Ultra Detailed Scales */}
          <Center>
              <group>
                <ScalesOfJustice />
              </group>
          </Center>

          {/* Moved MicroCrystals OUT of Center to prevent bounding box issues */}
          <MicroCrystals />
          
          {/* Orbiting Elements */}
          {/* Law Books with Professional Red Pattern */}
          <Orbiter radius={4} speed={0.8} offset={0} trailColor="#00f3ff">
              <LawBook color={PROFESSIONAL_RED} />
          </Orbiter>
          <Orbiter radius={4} speed={0.8} offset={2} trailColor="#00f3ff">
              <LawBook color={new THREE.Color("#1e3a8a")} />
          </Orbiter>
          
          {/* Fountain Pen */}
          <Orbiter radius={5.5} speed={0.6} offset={4} trailColor="#FFD700">
              <FountainPen />
          </Orbiter>
          
          {/* Classic Legal Scroll */}
          <Orbiter radius={5.5} speed={0.6} offset={1} trailColor="#991b1b">
              <LegalScroll />
          </Orbiter>

          {/* Spinning Spanish Text */}
          <TypewriterWord text="LEX" radius={6.5} speed={0.4} yOffset={2} rotationOffset={0} />
          <TypewriterWord text="VERDAD" radius={6.5} speed={0.4} yOffset={0} rotationOffset={2.1} />
          <TypewriterWord text="JUSTICIA" radius={6.5} speed={0.4} yOffset={-2} rotationOffset={4.2} />

          {/* Ambient Particles */}
          <Sparkles count={50} scale={10} size={3} speed={0.3} opacity={0.5} color="#ffd700" />
        </group>

        {/* Cinematic Post Processing */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.5} radius={0.4} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}