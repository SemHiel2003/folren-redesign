"use client";

// ShaderBackground in de "Silk"-stijl van de 21st.dev Shader Builder (hero anim 1),
// ingekort en omgezet naar het Folren-palet. Eén WebGL-canvas dat zijn ouder vult
// en zacht meedraait met de muis. Zonder WebGL blijft de CSS-achtergrond zichtbaar.
import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;

const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec3 u_colors[5];
uniform vec4 u_scene;   // resolution.xy, time, seed
uniform vec4 u_cursor;  // mouse.xy, presence, radius

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 palette(float x) {
  float f = clamp(x, 0.0, 1.0) * 4.0;
  vec3 col = u_colors[0];
  for (int i = 0; i < 4; i++) {
    col = mix(col, u_colors[i + 1], smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 shade(vec2 p, float t) {
  vec2 q = p * 1.6;
  float amp = 0.25 + 0.55 * 0.85;
  for (float i = 1.0; i < 5.0; i += 1.0) {
    q.x += amp / i * cos(i * 2.4 * q.y + t * 0.8 + u_scene.w);
    q.y += amp / i * cos(i * 1.7 * q.x + t * 0.6);
  }
  return palette(0.5 + 0.5 * sin(q.x + q.y));
}

void main() {
  vec2 res = u_scene.xy;
  float m = min(res.x, res.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * res) / m;

  // Muis: lokale draaikolk.
  if (u_cursor.z > 0.001) {
    vec2 cursor = (0.5 * u_cursor.xy * res) / m;
    vec2 d = p - cursor;
    float mask = u_cursor.z * (1.0 - smoothstep(0.0, u_cursor.w, length(d)));
    float a = mask * 1.3;
    float c = cos(a), s = sin(a);
    p = cursor + mat2(c, -s, s, c) * d;
  }

  p *= 1.35;
  float t = u_scene.z;
  float e = 0.012;
  vec3 col = shade(p, t) * 0.36;
  col += shade(p + vec2(e, 0.0), t) * 0.16;
  col += shade(p - vec2(e, 0.0), t) * 0.16;
  col += shade(p + vec2(0.0, e), t) * 0.16;
  col += shade(p - vec2(0.0, e), t) * 0.16;
  col += (grainHash(gl_FragCoord.xy + vec2(17.0, 31.0)) - 0.5) * 0.04;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const hex = (value: string) => [
  parseInt(value.slice(1, 3), 16) / 255,
  parseInt(value.slice(3, 5), 16) / 255,
  parseInt(value.slice(5, 7), 16) / 255,
];

const DEFAULT_COLORS = ["#07060d", "#0f0c30", "#2a2385", "#5a49c9", "#9a7af0"];

export function ShaderBackground({
  className,
  colors = DEFAULT_COLORS,
  speed = 0.3,
  seed = 1,
}: {
  className?: string;
  colors?: string[];
  speed?: number;
  seed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uColors = gl.getUniformLocation(program, "u_colors");
    const uScene = gl.getUniformLocation(program, "u_scene");
    const uCursor = gl.getUniformLocation(program, "u_cursor");
    gl.uniform3fv(uColors, new Float32Array(colors.slice(0, 5).flatMap(hex)));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let bounds = canvas.getBoundingClientRect();
    let raf = 0;
    let last: number | null = null;
    let inView = true;
    let disposed = false;
    let targetX = 0;
    let targetY = 0;
    let targetPresence = 0;
    let mouseX = 0;
    let mouseY = 0;
    let presence = 0;
    const start = performance.now();

    const resize = () => {
      bounds = canvas.getBoundingClientRect();
      // Halve resolutie is ruim genoeg voor een zachte achtergrond.
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
      const width = Math.max(1, Math.round(bounds.width * scale));
      const height = Math.max(1, Math.round(bounds.height * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const request = () => {
      if (!disposed && inView && !document.hidden && raf === 0) {
        raf = requestAnimationFrame(render);
      }
    };

    function render(now: number) {
      raf = 0;
      if (disposed) return;
      const dt = last === null ? 0 : Math.min((now - last) / 1000, 0.1);
      last = now;
      const follow = 1 - Math.exp(-6 * dt);
      mouseX += (targetX - mouseX) * follow;
      mouseY += (targetY - mouseY) * follow;
      presence += (targetPresence - presence) * follow;
      gl!.uniform4f(uScene, canvas!.width, canvas!.height, ((now - start) / 1000) * speed, seed);
      gl!.uniform4f(uCursor, mouseX, mouseY, presence, 0.5);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      if (!reduce) request();
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      bounds = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
      targetPresence = inside ? 1 : 0;
      if (inside) {
        targetX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        targetY = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      }
    };
    const onVisibility = () => {
      last = null;
      request();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      request();
    });
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      last = null;
      request();
    });
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    request();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
