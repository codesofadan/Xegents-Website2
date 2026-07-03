"use client"

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Github, Linkedin, Twitter, X, ChevronLeft, ChevronRight, Target, Shield, Users, Code } from 'lucide-react';

const styles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animate-fade-in-up {
    animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .orbit-container {
    animation: rotate-slow 60s linear infinite;
  }
  .orbit-item {
    animation: rotate-slow 60s linear infinite reverse; 
  }

  /* Scroll Reveal Utilities */
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* 3D Carousel Styles */
  .carousel-scene {
    perspective: 1200px;
    transform-style: preserve-3d;
  }
  .carousel-rotator {
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .carousel-panel {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: opacity 0.8s ease, filter 0.8s ease;
  }
  
  /* Modern Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #090611; }
  ::-webkit-scrollbar-thumb { background: #2a1e4d; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #4a3487; }

  .text-gradient {
    background: linear-gradient(to right, #ffffff, #a881ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .text-gradient-purple {
    background: linear-gradient(135deg, #a78bfa 0%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .progress-bar-fill {
    transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Dr. Alan Turing",
    role: "Chief AI Scientist",
    bio: "Pioneer in theoretical computer science and artificial intelligence. Leading our core AGI research initiatives to push the boundaries of what machines can achieve. Focused on foundational models and ethical alignment.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=500&h=500&q=80",
    social: { linkedin: "#", twitter: "#", github: "#" }
  },
  {
    id: 2,
    name: "Ada Lovelace",
    role: "Head of Algorithms",
    bio: "Visionary mathematician and writer. Designing the complex algorithms that form the analytical engine of our specialized AI models. She brings a deep understanding of mathematical structures to our machine learning pipeline.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=500&h=500&q=80",
    social: { linkedin: "#", twitter: "#", email: "#" }
  },
  {
    id: 3,
    name: "Grace Hopper",
    role: "VP of Engineering",
    bio: "Trailblazer in computer programming. Ensuring our infrastructure is robust, scalable, and that our code compiles flawlessly on the first try. Specializes in distributed systems and high-performance computing.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=500&h=500&q=80",
    social: { linkedin: "#", github: "#" }
  },
  {
    id: 4,
    name: "John von Neumann",
    role: "Systems Architect",
    bio: "Polymath and key figure in computing architecture. Designing the foundational structures that allow our neural networks to process information at unprecedented speeds. Master of optimizing hardware-software integration.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=500&h=500&q=80",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    id: 5,
    name: "Margaret Hamilton",
    role: "Director of Software Reliability",
    bio: "Expert in software engineering. Making sure our AI systems are exceptionally reliable and safe for deployment in mission-critical environments. Her rigorous testing protocols are the backbone of our deployments.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=500&h=500&q=80",
    social: { linkedin: "#", github: "#" }
  },
  {
    id: 6,
    name: "Claude Shannon",
    role: "Information Theory Lead",
    bio: "Father of information theory. Optimizing data transmission and processing to ensure our AI models communicate efficiently and accurately. He minimizes noise and maximizes signal in our complex neural pathways.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=500&h=500&q=80",
    social: { linkedin: "#", twitter: "#", github: "#" }
  }
];

const ACTIVITY_IMAGES = [
  { id: 1, title: "Annual Hackathon 2025", src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=800&q=80" },
  { id: 2, title: "AI Research Symposium", src: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?fit=crop&w=800&q=80" },
  { id: 3, title: "Team Strategy Retreat", src: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?fit=crop&w=800&q=80" },
  { id: 4, title: "Brainstorming Session", src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?fit=crop&w=800&q=80" },
  { id: 5, title: "Product Launch Party", src: "https://images.unsplash.com/photo-1511578314322-379afb476865?fit=crop&w=800&q=80" },
  { id: 6, title: "Deep Learning Workshop", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?fit=crop&w=800&q=80" }
];

// Custom Hook for Scroll Animations
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numItems = ACTIVITY_IMAGES.length;
  const theta = 360 / numItems;

  const handleNext = () => setCurrentIndex(prev => prev + 1);
  const handlePrev = () => setCurrentIndex(prev => prev - 1);

  const getRadius = () => {
    if (typeof window === 'undefined') return 300;
    return window.innerWidth < 768 ? 160 : 350;
  };
  const [radius, setRadius] = useState(350);

  useEffect(() => {
    const handleResize = () => setRadius(getRadius());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 reveal-on-scroll">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Team <span className="text-gradient">Activity Gallery</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Glimpses into our collaborative spaces, hackathons, and moments of breakthrough.</p>
      </div>

      <div className="relative w-full max-w-5xl h-[300px] md:h-[400px] flex items-center justify-center carousel-scene">
        <button onClick={handlePrev} className="absolute left-4 md:left-12 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-500/20 hover:border-purple-500 transition-all backdrop-blur-md">
          <ChevronLeft size={24} />
        </button>

        <div
          className="carousel-rotator w-[250px] h-[180px] md:w-[400px] md:h-[280px] relative"
          style={{ transform: `translateZ(-${radius}px) rotateY(${currentIndex * -theta}deg)` }}
        >
          {ACTIVITY_IMAGES.map((img, index) => {
            let relativeIndex = (index - (currentIndex % numItems) + numItems) % numItems;
            if (relativeIndex > numItems / 2) relativeIndex -= numItems;
            const isFront = Math.abs(relativeIndex) < 0.5;
            return (
              <div
                key={img.id}
                className={`carousel-panel rounded-2xl overflow-hidden border ${isFront ? 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'border-white/10'}`}
                style={{
                  transform: `rotateY(${index * theta}deg) translateZ(${radius}px)`,
                  opacity: isFront ? 1 : 0.4,
                  filter: isFront ? 'blur(0px)' : 'blur(2px)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="text-white font-semibold text-lg tracking-wide">{img.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={handleNext} className="absolute right-4 md:right-12 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-500/20 hover:border-purple-500 transition-all backdrop-blur-md">
          <ChevronRight size={24} />
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-8 tracking-widest uppercase">Use arrows to rotate</p>
    </div>
  );
};

const CorePrinciples = () => (
  <section className="w-full max-w-7xl mx-auto py-24 px-6 reveal-on-scroll">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Operating <span className="text-gradient">Principles</span></h2>
      <p className="text-gray-400 max-w-2xl mx-auto">The foundational values that drive our engineering, research, and collaboration.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
      <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-[#1a103c] to-[#0d071a] p-8 border border-white/10 flex flex-col justify-end relative overflow-hidden group hover:border-purple-500/50 transition-colors">
        <div className="absolute top-8 right-8 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] group-hover:bg-purple-500/40 transition-colors" />
        <Target size={32} className="text-purple-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Precision &amp; ROI</h3>
        <p className="text-gray-400 max-w-md">We build systems designed to create immediate, measurable impact. Technology for technology&apos;s sake is noise; we engineer for precision.</p>
      </div>

      <div className="rounded-3xl bg-[#0f0a1c] p-8 border border-white/10 flex flex-col justify-end group hover:border-indigo-500/50 transition-colors">
        <Shield size={32} className="text-indigo-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Ethical Alignment</h3>
        <p className="text-gray-400 text-sm">Security, privacy, and safe deployment are non-negotiable foundations.</p>
      </div>

      <div className="rounded-3xl bg-[#0f0a1c] p-8 border border-white/10 flex flex-col justify-end group hover:border-pink-500/50 transition-colors">
        <Users size={32} className="text-pink-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Collective Mind</h3>
        <p className="text-gray-400 text-sm">Our strength lies in multidisciplinary collaboration. We win as a team.</p>
      </div>

      <div className="md:col-span-2 rounded-3xl bg-gradient-to-bl from-[#131124] to-[#090611] p-8 border border-white/10 flex flex-col justify-end relative overflow-hidden group hover:border-blue-500/50 transition-colors">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <Code size={32} className="text-blue-400 mb-4 relative z-10" />
        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Relentless Innovation</h3>
        <p className="text-gray-400 max-w-md relative z-10">We constantly push the boundaries of what is possible, staying at the bleeding edge of AI research to deliver tomorrow&apos;s solutions today.</p>
      </div>
    </div>
  </section>
);

// Helper to create a sprite glow texture
function createGlowTexture(color: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, color);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return canvas;
}

const TechCube = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5.5;
    camera.position.y = 1;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const updateSize = () => {
      if (!currentMount) return;
      const size = Math.min(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    currentMount.appendChild(renderer.domElement);

    // --- Premium Texture Generator ---
    const createHighTechTexture = (type: string, color: string) => {
      const canvas = document.createElement('canvas');
      const size = 512;
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#05030a';
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = '#1a103c';
      ctx.lineWidth = 2;
      for (let i = 0; i < size; i += 32) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
      }

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = color;
      ctx.shadowBlur = 30;

      const cx = size / 2, cy = size / 2;

      ctx.beginPath();
      switch (type) {
        case 'cpu':
          ctx.rect(cx - 80, cy - 80, 160, 160);
          for (let i = 0; i < 4; i++) {
            const offset = cx - 50 + (i * 33);
            ctx.moveTo(offset, cy - 80); ctx.lineTo(offset, cy - 130);
            ctx.moveTo(offset, cy + 80); ctx.lineTo(offset, cy + 130);
            ctx.moveTo(cx - 80, offset); ctx.lineTo(cx - 130, offset);
            ctx.moveTo(cx + 80, offset); ctx.lineTo(cx + 130, offset);
          }
          ctx.rect(cx - 30, cy - 30, 60, 60);
          break;
        case 'network':
          const nodes: [number, number][] = [[cx, cy - 100], [cx - 80, cy + 60], [cx + 80, cy + 60], [cx, cy]];
          ctx.moveTo(nodes[3][0], nodes[3][1]); ctx.lineTo(nodes[0][0], nodes[0][1]);
          ctx.moveTo(nodes[3][0], nodes[3][1]); ctx.lineTo(nodes[1][0], nodes[1][1]);
          ctx.moveTo(nodes[3][0], nodes[3][1]); ctx.lineTo(nodes[2][0], nodes[2][1]);
          ctx.moveTo(nodes[0][0], nodes[0][1]); ctx.lineTo(nodes[1][0], nodes[1][1]);
          ctx.moveTo(nodes[1][0], nodes[1][1]); ctx.lineTo(nodes[2][0], nodes[2][1]);
          ctx.moveTo(nodes[2][0], nodes[2][1]); ctx.lineTo(nodes[0][0], nodes[0][1]);
          ctx.stroke();
          nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n[0], n[1], 25, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          });
          ctx.beginPath();
          break;
        case 'ai':
          ctx.arc(cx - 50, cy, 60, 0.5 * Math.PI, 2.5 * Math.PI);
          ctx.arc(cx + 50, cy, 60, 1.5 * Math.PI, 3.5 * Math.PI);
          ctx.moveTo(cx, cy - 80); ctx.lineTo(cx, cy + 80);
          break;
        case 'db':
          for (let i = -1; i <= 1; i++) {
            const y = cy + (i * 70);
            ctx.ellipse(cx, y - 30, 100, 30, 0, 0, Math.PI * 2);
            ctx.moveTo(cx - 100, y - 30); ctx.lineTo(cx - 100, y + 30);
            ctx.moveTo(cx + 100, y - 30); ctx.lineTo(cx + 100, y + 30);
            ctx.ellipse(cx, y + 30, 100, 30, 0, 0, Math.PI * 1);
          }
          break;
        case 'vision':
          ctx.ellipse(cx, cy, 140, 70, 0, 0, Math.PI * 2);
          ctx.stroke(); ctx.beginPath();
          ctx.arc(cx, cy, 50, 0, Math.PI * 2);
          ctx.moveTo(cx, cy - 50); ctx.lineTo(cx, cy - 20);
          ctx.moveTo(cx, cy + 50); ctx.lineTo(cx, cy + 20);
          ctx.moveTo(cx - 50, cy); ctx.lineTo(cx - 20, cy);
          ctx.moveTo(cx + 50, cy); ctx.lineTo(cx + 20, cy);
          break;
        case 'shield':
          ctx.moveTo(cx - 100, cy - 80);
          ctx.lineTo(cx + 100, cy - 80);
          ctx.lineTo(cx + 100, cy + 20);
          ctx.quadraticCurveTo(cx + 100, cy + 120, cx, cy + 160);
          ctx.quadraticCurveTo(cx - 100, cy + 120, cx - 100, cy + 20);
          ctx.closePath();
          ctx.stroke(); ctx.beginPath();
          ctx.moveTo(cx - 40, cy + 10);
          ctx.lineTo(cx - 10, cy + 40);
          ctx.lineTo(cx + 50, cy - 30);
          break;
      }
      ctx.stroke();

      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.strokeRect(20, 20, size - 40, size - 40);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color(color).multiplyScalar(0.5),
        emissiveMap: texture,
        metalness: 0.8,
        roughness: 0.2
      });
    };

    // Core cube with 6 distinct face logos
    const coreGeometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const coreMaterials = [
      createHighTechTexture('cpu', '#a855f7'),
      createHighTechTexture('network', '#3b82f6'),
      createHighTechTexture('db', '#10b981'),
      createHighTechTexture('shield', '#f59e0b'),
      createHighTechTexture('ai', '#ec4899'),
      createHighTechTexture('vision', '#06b6d4'),
    ];
    const coreCube = new THREE.Mesh(coreGeometry, coreMaterials);
    scene.add(coreCube);

    // Glass shell
    const shellGeometry = new THREE.BoxGeometry(1.9, 1.9, 1.9);
    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      thickness: 0.5,
      transparent: true,
      opacity: 1
    });
    const shellCube = new THREE.Mesh(shellGeometry, shellMaterial);
    scene.add(shellCube);

    // Wireframe edges on the glass shell
    const edges = new THREE.EdgesGeometry(shellGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.3 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    shellCube.add(wireframe);

    // Floating data particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 8;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xc084fc,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Orbiting energy sphere
    const orbGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const orbMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    const orbGlowMat = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(createGlowTexture('#3b82f6')),
      color: 0x3b82f6,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const orbGlow = new THREE.Sprite(orbGlowMat);
    orbGlow.scale.set(0.8, 0.8, 1);
    orbMesh.add(orbGlow);

    const orbGroup = new THREE.Group();
    orbGroup.add(orbMesh);
    orbMesh.position.set(2.5, 0, 0);
    scene.add(orbGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 4, 10);
    const pointLight2 = new THREE.PointLight(0x06b6d4, 4, 10);
    scene.add(pointLight1);
    scene.add(pointLight2);

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      coreCube.rotation.x += 0.002;
      coreCube.rotation.y += 0.004;
      shellCube.rotation.x += 0.003;
      shellCube.rotation.y += 0.005;

      orbGroup.rotation.y = elapsedTime * 0.5;
      orbGroup.rotation.z = elapsedTime * 0.2;
      orbMesh.position.y = Math.sin(elapsedTime * 2) * 0.5;

      particlesMesh.rotation.y = elapsedTime * 0.05;

      pointLight1.position.x = Math.sin(elapsedTime) * 3;
      pointLight1.position.z = Math.cos(elapsedTime) * 3;
      pointLight2.position.x = Math.sin(elapsedTime + Math.PI) * 3;
      pointLight2.position.z = Math.cos(elapsedTime + Math.PI) * 3;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateSize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      shellGeometry.dispose();
      particlesGeo.dispose();
      orbGeo.dispose();
      coreMaterials.forEach(m => m.dispose());
      shellMaterial.dispose();
      particlesMat.dispose();
      orbMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default function TeamPage() {
  useScrollReveal();
  const [selectedMember, setSelectedMember] = useState<typeof TEAM_MEMBERS[0] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMemberClick = (member: typeof TEAM_MEMBERS[0]) => {
    if (selectedMember?.id === member.id) {
      setSelectedMember(null);
    } else {
      setSelectedMember(member);
    }
  };

  const closeDetails = () => setSelectedMember(null);

  return (
    <div className="min-h-screen bg-[#0c0817] text-white font-sans overflow-x-hidden selection:bg-purple-500/30 relative">
      <style>{styles}</style>

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#2a1157] rounded-full blur-[150px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#1a1147] rounded-full blur-[150px] opacity-50 mix-blend-screen" />
        <div className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] bg-[#1d0b3b] rounded-full blur-[180px] opacity-30 mix-blend-screen" />
      </div>

      <main className="relative z-10 pt-40 pb-24 min-h-screen flex flex-col items-center justify-start overflow-hidden w-full">

        {/* Intro Section */}
        <section className={`text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3c256e] bg-[#1a0f30]/50 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(60,37,110,0.5)]">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-purple-200 uppercase">The Minds Behind The AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-tight">
            Meet Our <span className="text-gradient">Team</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300/90 leading-relaxed font-light max-w-2xl mx-auto opacity-0 animate-[fade-in-up_1s_ease-out_0.5s_forwards]">
            We are a collective of visionaries, engineers, and researchers dedicated to pushing the boundaries of artificial intelligence. Discover the brilliant minds building systems that create immediate ROI.
          </p>
        </section>

        {/* Interactive 3D / Orbit Section */}
        <section className="relative w-full max-w-[1200px] mx-auto mt-20 flex flex-col items-center justify-center min-h-[600px] px-6">

          {/* LEFT SIDE: Orbit / Cube */}
          <div className={`relative flex items-center justify-center w-full aspect-square max-w-[600px] transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) ${selectedMember ? 'scale-75 opacity-40 blur-[2px] pointer-events-none' : 'scale-100'}`}>
            {/* Center 3D Cube */}
            <div className="z-20 absolute inset-0 m-auto w-[40%] h-[40%] flex items-center justify-center pointer-events-none">
              <div className="w-full h-full animate-float">
                <TechCube />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#7c3aed]/20 rounded-full blur-[60px] -z-10" />
            </div>

            {/* Orbiting Members Ring */}
            <div className="absolute w-[85%] h-[85%] rounded-full border border-white/5 orbit-container">
              {TEAM_MEMBERS.map((member, index) => {
                const angle = (index / TEAM_MEMBERS.length) * Math.PI * 2;
                const left = `${50 + 50 * Math.cos(angle)}%`;
                const top = `${50 + 50 * Math.sin(angle)}%`;
                return (
                  <div
                    key={member.id}
                    className="absolute w-16 h-16 md:w-24 md:h-24 -translate-x-1/2 -translate-y-1/2 group cursor-pointer pointer-events-auto"
                    style={{ left, top }}
                    onClick={(e) => { e.stopPropagation(); handleMemberClick(member); }}
                  >
                    <div className="w-full h-full orbit-item relative">
                      <div className={`w-full h-full rounded-full overflow-hidden border-2 transition-all duration-500 shadow-xl ${selectedMember?.id === member.id ? 'border-purple-400 scale-110 shadow-[0_0_30px_rgba(168,85,247,0.6)]' : 'border-white/10 group-hover:border-purple-500/50 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'}`}>
                        <img
                          src={member.image}
                          alt={member.name}
                          className={`w-full h-full object-cover transition-all duration-500 ${selectedMember?.id === member.id ? 'grayscale-0' : 'grayscale group-hover:grayscale-[50%]'}`}
                        />
                      </div>

                      {/* Hover Tooltip */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[#0f0a1c]/90 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-xl pointer-events-none whitespace-nowrap z-30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 origin-top ${selectedMember ? 'opacity-0 scale-90' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'}`}>
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0f0a1c] border-t border-l border-white/10 rotate-45" />
                        <p className="font-bold text-sm text-white tracking-wide">{member.name}</p>
                        <p className="text-xs text-purple-400 font-medium mt-0.5">{member.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: Member Details Overlay */}
          <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) ${selectedMember ? 'opacity-100 scale-100 pointer-events-auto z-40' : 'opacity-0 scale-95 pointer-events-none z-0'}`}>
            {selectedMember && (
              <div className="bg-[#0f0a1c]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-lg relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-[50px] pointer-events-none" />

                <button
                  onClick={closeDetails}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all z-50 flex items-center justify-center cursor-pointer"
                  aria-label="Close member details"
                >
                  <X size={18} />
                </button>

                <div className="animate-[fade-in-up_0.6s_ease-out_forwards]">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-lg">
                      <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">{selectedMember.name}</h2>
                      <p className="text-lg text-gradient-purple font-medium">{selectedMember.role}</p>
                    </div>
                  </div>

                  <div className="w-16 h-[2px] bg-gradient-to-r from-purple-500 to-transparent mb-6 rounded-full" />

                  <p className="text-gray-300 leading-relaxed mb-8 text-base md:text-lg font-light">
                    {selectedMember.bio}
                  </p>

                  <div className="flex items-center gap-4">
                    {selectedMember.social.linkedin && (
                      <a href={selectedMember.social.linkedin} className="group/btn relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-purple-500 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        <Linkedin size={20} className="text-gray-400 group-hover/btn:text-purple-400 relative z-10 transition-colors" />
                      </a>
                    )}
                    {selectedMember.social.twitter && (
                      <a href={selectedMember.social.twitter} className="group/btn relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-purple-500 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        <Twitter size={20} className="text-gray-400 group-hover/btn:text-purple-400 relative z-10 transition-colors" />
                      </a>
                    )}
                    {selectedMember.social.github && (
                      <a href={selectedMember.social.github} className="group/btn relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-purple-500 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        <Github size={20} className="text-gray-400 group-hover/btn:text-purple-400 relative z-10 transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Additional Sections */}
        <CorePrinciples />
        <TeamCarousel />

      </main>
    </div>
  );
}
