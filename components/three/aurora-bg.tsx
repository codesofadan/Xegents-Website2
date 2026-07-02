"use client"

/**
 * AuroraBackground — a genuine Three.js (WebGL) flowing-aurora shader,
 * tuned to the Xegents brand: deep navy base (#0C0C18) + single purple accent.
 *
 * Design goals (top-1% + professional):
 *  - Calm, premium "operating-system-for-modern-teams" aurora, not a gimmick.
 *  - Brand-locked palette: one purple ramp, no rainbow.
 *  - Keeps the hero headline readable (soft center scrim handled by the parent).
 *
 * Performance / correctness (matters — this is an SEO agency's own site):
 *  - Lazy-mounted client-only (import via next/dynamic with ssr:false in the hero).
 *  - Animation loop is GATED: pauses when the tab is hidden or the hero scrolls
 *    offscreen (IntersectionObserver), so it never burns GPU in the background.
 *  - Honours prefers-reduced-motion: renders a single static frame, no rAF loop.
 *  - Caps devicePixelRatio at 1.5, antialias off (noise is soft) → cheap.
 *  - Graceful fallback: if WebGL is unavailable, renders nothing and the
 *    parent's CSS gradient shows instead.
 *  - Full teardown: disposes geometry/material/renderer, drops the canvas,
 *    removes every listener.
 */

import { useEffect, useRef } from "react"
import * as THREE from "three"

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform vec2  uResolution;
  uniform float uTime;
  uniform vec2  uPointer;     // -0.5 .. 0.5, smoothed
  uniform float uIntensity;   // overall strength

  // Brand ramp (deep navy -> indigo -> brand violet -> light violet)
  const vec3 BASE = vec3(0.047, 0.047, 0.094); // #0C0C18
  const vec3 C1   = vec3(0.145, 0.086, 0.290); // deep indigo-violet
  const vec3 C2   = vec3(0.451, 0.235, 0.870); // #7338DE brand violet
  const vec3 C3   = vec3(0.706, 0.451, 1.000); // #B473FF highlight

  // --- Ashima simplex noise 2D -------------------------------------------
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                             + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float s = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) {   // few octaves -> soft clouds, not sharp veins
      s += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return s;
  }

  // cheap hash for grain
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main(){
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // gentle pointer parallax
    p += uPointer * 0.07;

    float t = uTime * 0.03;

    // low-frequency, domain-warped clouds → soft calm aurora
    float w1 = fbm(p * 0.9 + vec2(t, t * 0.5));
    float w2 = fbm(p * 1.4 + vec2(-t * 0.55, t * 0.3) + w1 * 0.6);
    float field = fbm(p * 1.1 + vec2(w2, w1) * 0.6 + t * 0.3);
    field = field * 0.5 + 0.5;                  // -> 0..1
    field = smoothstep(0.32, 0.90, field);      // low contrast, no hard veins

    // dark, brand-locked ramp — mostly base; violet only in the brightest wisps
    vec3 col = mix(BASE, C1, field);
    col = mix(col, C2, smoothstep(0.55, 1.0, field));
    col = mix(col, C3, smoothstep(0.88, 1.0, field) * 0.35);

    // glow biased to the top; calm & dark behind the headline; melt to base at bottom
    float topGlow    = smoothstep(0.28, 1.0, uv.y);
    float bottomFade = smoothstep(0.0, 0.42, uv.y);
    float mask = topGlow * bottomFade * 0.6;    // overall restraint

    col = mix(BASE, col, mask * uIntensity);

    // vignette
    float vig = smoothstep(1.3, 0.4, length((uv - 0.5) * vec2(aspect, 1.0)));
    col *= 0.72 + 0.28 * vig;

    // subtle grain to kill banding
    float g = hash(uv * uResolution + uTime) - 0.5;
    col += g * 0.01;

    gl_FragColor = vec4(col, 1.0);
  }
`

export function AuroraBackground({
  className,
  intensity = 1.0,
}: {
  className?: string
  intensity?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      })
    } catch {
      // No WebGL → leave the parent's CSS gradient visible.
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement
    Object.assign(canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
    })
    container.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uIntensity: { value: intensity },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      depthTest: false,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const setSize = () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h, false)
      uniforms.uResolution.value.set(w * dpr, h * dpr)
    }
    setSize()

    // smoothed pointer parallax
    const pointerTarget = new THREE.Vector2(0, 0)
    const onPointer = (e: PointerEvent) => {
      pointerTarget.set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5)
    }
    if (!reduceMotion) window.addEventListener("pointermove", onPointer, { passive: true })

    const ro = new ResizeObserver(setSize)
    ro.observe(container)

    // Gate the loop: only run while visible AND on-screen.
    let visible = !document.hidden
    let onScreen = true
    let frameId = 0
    let last = performance.now()

    const renderFrame = () => {
      renderer.render(scene, camera)
    }

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      uniforms.uTime.value += dt
      // ease pointer toward target
      uniforms.uPointer.value.lerp(pointerTarget, 0.04)
      renderFrame()
      frameId = requestAnimationFrame(loop)
    }

    const start = () => {
      if (frameId || reduceMotion) return
      last = performance.now()
      frameId = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (!frameId) return
      cancelAnimationFrame(frameId)
      frameId = 0
    }
    const sync = () => {
      if (visible && onScreen && !reduceMotion) start()
      else stop()
    }

    const onVisibility = () => {
      visible = !document.hidden
      sync()
    }
    document.addEventListener("visibilitychange", onVisibility)

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      { threshold: 0 },
    )
    io.observe(container)

    if (reduceMotion) {
      // single static frame
      renderFrame()
    } else {
      sync()
    }

    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onPointer)
      io.disconnect()
      ro.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [intensity])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      // CSS gradient fallback + guaranteed base colour behind the canvas
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 70% 55% at 50% 15%, rgba(115,56,222,0.16), transparent 70%), #0C0C18",
      }}
    />
  )
}
