import React, { useEffect, useState, useRef } from "react";
import { useGame } from "../game/GameContext";
import { evaluateHand } from "../game/engine";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const ScreenProjectedMarker = ({
  die,
  cameraRef,
  meshRef,
  rendererRef,
}: any) => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let frameId: number;
    const updatePos = () => {
      if (cameraRef.current && meshRef && rendererRef.current) {
        const rect = rendererRef.current.domElement.getBoundingClientRect();
        const vector = meshRef.position.clone();
        vector.project(cameraRef.current);
        const x = (vector.x * 0.5 + 0.5) * rect.width;
        const y = -(vector.y * 0.5 - 0.5) * rect.height;
        setPos({ x, y });
      }
      frameId = requestAnimationFrame(updatePos);
    };
    updatePos();
    return () => cancelAnimationFrame(frameId);
  }, [cameraRef, meshRef, rendererRef]);

  const isAscended = die.ascended;
  const isHighCorrupt = die.corruption >= 75;
  const isMedCorrupt = die.corruption >= 50 && die.corruption < 75;
  const isHighMultiplier =
    die.modifier === "foil" ||
    die.modifier === "holographic" ||
    die.material === "glass" ||
    die.material === "obsidian" ||
    die.material === "steel";

  // Calculate XP ratio (0 to 1) to intensity for un-ascended
  const xpRatio = !isAscended && die.xp ? Math.min(1, die.xp / 100) : 0;

  if (!isAscended && die.corruption < 50 && xpRatio === 0 && !isHighMultiplier)
    return null;

  return (
    <div
      className="absolute pointer-events-none z-10 mix-blend-screen"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <AnimatePresence>
        {/* Glow Medieval Runic Aura Effect for High Multiplier Dice */}
        {isHighMultiplier && (
          <motion.div
            key="high-multiplier-runic"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.6, 1.0, 0.6],
              scale: [0.95, 1.05, 0.95],
              rotate: [0, 360],
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                ease: "linear",
                duration: 8,
              },
              opacity: { repeat: Infinity, ease: "easeInOut", duration: 2.0 },
              scale: { repeat: Infinity, ease: "easeInOut", duration: 2.0 },
            }}
            className="absolute -inset-14 flex items-center justify-center p-2 rounded-full"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 opacity-80 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]"
            >
              <defs>
                <path
                  id={`rune-path-${die.id}`}
                  d="M 50,50 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
                  fill="none"
                />
              </defs>
              {/* Medieval boundary alignments */}
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#f59e0b"
                strokeWidth="1"
                strokeDasharray="3 3"
                fill="none"
                className="opacity-75"
              />
              <circle
                cx="50"
                cy="50"
                r="28"
                stroke="#ef4444"
                strokeWidth="0.5"
                fill="none"
                className="opacity-40"
              />
              {/* Actual elder Futhark parchment/brass medieval runes along circular path */}
              <text
                fontSize="7"
                fontWeight="bold"
                fill="#ebdcb9"
                className="font-mono tracking-widest fill-amber-300"
              >
                <textPath href={`#rune-path-${die.id}`} startOffset="0%">
                  ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛗᛚᛜᛞᛟ
                </textPath>
              </text>
            </svg>
          </motion.div>
        )}

        {/* XP Glow Effect */}
        {!isAscended && xpRatio > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 + xpRatio * 0.4, scale: 1 + xpRatio * 0.5 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-10 rounded-full flex items-center justify-center p-8 bg-[radial-gradient(circle,rgba(16,185,129,0.5)_0%,transparent_70%)] blur-md"
          />
        )}

        {/* Medium Corruption Effect */}
        {isMedCorrupt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-6 rounded-full flex items-center justify-center p-6 bg-[radial-gradient(circle,rgba(168,85,247,0.3)_0%,transparent_60%)] blur-sm"
          />
        )}

        {/* High Corruption Effect */}
        {isHighCorrupt && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.9,
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-12 rounded-full flex items-center justify-center p-10 bg-[radial-gradient(circle,rgba(255,0,0,0.6)_0%,transparent_60%)] blur-lg"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
          </motion.div>
        )}

        {/* Ascended Perfect Glow Effect */}
        {isAscended && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.4, 1],
              rotate: [0, 90, 180],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-16 rounded-full border border-cyan-300 blur-[2px] flex items-center justify-center p-12 bg-[radial-gradient(circle,rgba(0,255,255,0.6)_0%,transparent_70%)]"
          >
            {/* Inner star shape roughly done with rotation */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t-2 border-r-2 border-cyan-100 opacity-50 rounded-lg scale-75"
            />
          </motion.div>
        )}

        {/* Clear Text Label for Enhancements */}
        {((die.modifier && die.modifier !== "none") ||
          (die.material && die.material !== "normal")) && (
          <div className="absolute top-[45px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/70 backdrop-blur-sm px-2.5 py-0.5 rounded border border-[#ebdcb9]/30 text-[8px] font-black text-[#ebdcb9] uppercase tracking-widest shadow-xl flex items-center justify-center pointer-events-none z-20">
            {[
              die.modifier && die.modifier !== "none" ? die.modifier : null,
              die.material && die.material !== "normal" ? die.material : null,
            ]
              .filter(Boolean)
              .join(" • ")}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ScreenProjectedPopup = ({
  pop,
  cameraRef,
  meshRef,
  rendererRef,
}: any) => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let frameId: number;
    const updatePos = () => {
      if (cameraRef.current && meshRef && rendererRef.current) {
        const rect = rendererRef.current.domElement.getBoundingClientRect();
        const vector = meshRef.position.clone();
        vector.y += 1.0; // keep it a bit tighter to the die
        vector.project(cameraRef.current);
        const x = (vector.x * 0.5 + 0.5) * rect.width;
        const y = -(vector.y * 0.5 - 0.5) * rect.height;
        setPos({ x, y });
      }
      frameId = requestAnimationFrame(updatePos);
    };
    updatePos();
    return () => cancelAnimationFrame(frameId);
  }, [cameraRef, meshRef, rendererRef]);

  const seq = pop.seqIndex || 0;
  const isMatched = pop.isMatched;
  const isAscended = pop.isAscended;

  const isLegendaryCombo = seq >= 4 && isMatched;
  const isHighCombo = seq >= 2 && isMatched;

  // Decide colors based on combo level and match status
  let colorClass = "text-white";
  let glowShadow = "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]";

  if (!isMatched) {
    colorClass = "text-zinc-500 opacity-60";
    glowShadow = "drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]";
  } else if (isAscended) {
    colorClass = "text-cyan-300";
    glowShadow = "drop-shadow-[0_0_20px_rgba(34,211,238,1)]";
  } else if (isLegendaryCombo) {
    colorClass = "text-g-red";
    glowShadow = "drop-shadow-[0_0_30px_rgba(239,68,68,1)]";
  } else if (isHighCombo) {
    colorClass = "text-g-gold";
    glowShadow = "drop-shadow-[0_0_20px_rgba(234,179,8,1)]";
  } else {
    colorClass = "text-zinc-100";
    glowShadow = "drop-shadow-[0_4px_8px_rgba(0,0,0,1)]";
  }

  return (
    <div
      className="absolute pointer-events-none z-[100]"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: isMatched ? 40 : 10, scale: 0.1 }}
        animate={{
          opacity: isMatched ? [0, 1, 1, 0] : [0, 0.8, 0],
          y: isMatched ? -120 : -40,
          scale: isMatched
            ? [0.5, 2.8 + seq * 0.4, 1.5 + seq * 0.1, 0.8]
            : [0.5, 1.0, 0.5],
          rotateZ: isMatched
            ? [0, Math.random() * 30 - 15, Math.random() * -10 + 5, 0]
            : 0,
        }}
        transition={{
          delay: pop.delay / 1000,
          duration: isMatched ? 1.8 : 1.0,
          ease: [0.2, 0.8, 0.2, 1],
        }}
        className={`relative flex flex-col items-center justify-center font-black font-mono text-5xl md:text-6xl ${colorClass} ${glowShadow}`}
        style={{ WebkitTextStroke: isMatched ? "3px #000" : "1px #000" }}
      >
        <span>{pop.text}</span>
        {isAscended && isMatched && (
          <span
            className="text-sm md:text-base tracking-widest uppercase text-cyan-200 mt-1 font-bold"
            style={{ WebkitTextStroke: "0" }}
          >
            Ascendant!
          </span>
        )}
      </motion.div>
    </div>
  );
};
import {
  Target,
  Trophy,
  Skull,
  HelpCircle,
  X,
  Hexagon,
  Eye,
  Scroll,
  Zap,
  Heart,
  Spade,
  Dices,
  Copy,
  Activity,
  Volume2,
  VolumeX,
  Star,
  Gem,
  Crown,
  Magnet,
  Coins,
  Shield,
  Ghost,
  Crosshair,
  Flame,
  Rocket,
  Box,
  Cpu,
  FileCode,
  Wand2,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Hexagon,
  Eye,
  Scroll,
  Zap,
  Heart,
  Spade,
  Dices,
  Copy,
  Activity,
  Skull,
  Star,
  Gem,
  Crown,
  Magnet,
  Coins,
  Shield,
  Ghost,
  Crosshair,
  Flame,
  Rocket,
};
import * as CANNON from "cannon-es";
import * as THREE from "three";
import { RELICS_DB } from "../game/relics";
import { sfx } from "../utils/sound";

const AmbientDust = () => {
  const [particles, setParticles] = useState(
    [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      dur: Math.random() * 10 + 10,
      delay: Math.random() * -20,
      size: Math.random() * 2 + 1,
    })),
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-20 z-0">
      {particles.map((p) => (
        <motion.div
          key={`${p.id}`}
          className="absolute bg-white rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ["0%", "-50%"],
            x: ["0%", `${(Math.random() - 0.5) * 20}%`],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const getComboStyle = (text: string) => {
  if (["Pentad"].includes(text))
    return "text-g-gold drop-shadow-[0_0_10px_rgba(234,179,8,1)]";
  if (["Quad", "Full Chamber", "Sequence"].includes(text))
    return "text-g-red drop-shadow-[0_0_8px_rgba(255,62,62,0.8)]";
  return "text-white";
};

const RulesModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#0d0d11] border border-g-border rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between p-6 border-b border-g-border bg-[#15161c]">
          <h2 className="text-xl font-serif italic tracking-widest text-white uppercase">
            How to Play
          </h2>
          <button
            onClick={onClose}
            className="text-g-muted hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-g-text text-sm">
          <section>
            <h3 className="text-g-gold font-bold uppercase tracking-widest mb-3">
              Objective
            </h3>
            <p className="leading-relaxed">
              Your goal is to reach the <strong>Target Score</strong> every
              round before running out of rolls. The score is calculated using
              distinctive Dice combinations.
            </p>
          </section>

          <section>
            <h3 className="text-g-gold font-bold uppercase tracking-widest mb-3">
              Scoring Engine
            </h3>
            <p className="leading-relaxed mb-4">
              Your score is calculated as:{" "}
              <strong>Base Score × Multiplier = Total Score</strong>. The Base
              Score is the sum of all your dice. The Multiplier depends on your
              Dice Combination:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-[#1a1b21] p-3 rounded border border-g-border">
                <div className="text-white font-bold">Double</div>
                <div className="text-g-red font-mono mt-1">x 1.5</div>
              </div>
              <div className="bg-[#1a1b21] p-3 rounded border border-g-border">
                <div className="text-white font-bold">Two Doubles</div>
                <div className="text-g-red font-mono mt-1">x 2</div>
              </div>
              <div className="bg-[#1a1b21] p-3 rounded border border-g-border">
                <div className="text-white font-bold">Triple</div>
                <div className="text-g-red font-mono mt-1">x 3</div>
              </div>
              <div className="bg-[#1a1b21] p-3 rounded border border-g-border">
                <div className="text-white font-bold">Sequence</div>
                <div className="text-g-red font-mono mt-1">x 4</div>
              </div>
              <div className="bg-[#1a1b21] p-3 rounded border border-g-border">
                <div className="text-white font-bold">Full Chamber</div>
                <div className="text-g-red font-mono mt-1">x 5</div>
              </div>
              <div className="bg-[#1a1b21] p-3 rounded border border-g-border">
                <div className="text-white font-bold">Quad</div>
                <div className="text-g-red font-mono mt-1">x 7</div>
              </div>
              <div className="bg-[#1a1b21] p-3 rounded border border-g-border">
                <div className="text-white font-bold">Pentad</div>
                <div className="text-g-red font-mono mt-1">x 10</div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-g-gold font-bold uppercase tracking-widest mb-3">
              Gameplay
            </h3>
            <ul className="space-y-3 list-disc pl-5 marker:text-g-red">
              <li>
                You have a limited number of rolls per round to build your hand.
              </li>
              <li>
                Click any die to <strong>LOCK</strong> it. Locked dice are
                ignored when you hit the Roll button.
              </li>
              <li>
                When you are satisfied with your hand, press{" "}
                <strong>CROWN THE SCORE</strong> to end the round.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-g-red font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <Skull className="w-4 h-4" /> Corruption
            </h3>
            <p className="leading-relaxed mb-3">
              As you advance through rounds, your dice gain{" "}
              <strong>Corruption</strong>.
            </p>
            <ul className="space-y-3 list-disc pl-5 marker:text-g-red">
              <li>
                <strong>{">"} 50% Corrupt:</strong> Sometimes forced to roll a
                6.
              </li>
              <li>
                <strong>{">"} 75% Unstable:</strong> Will ALWAYS roll a 6.
              </li>
            </ul>
          </section>
        </div>

        <div className="p-6 border-t border-g-border bg-[#15161c]">
          <button
            onClick={onClose}
            className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-g-gold transition-colors"
          >
            Understood
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const rotationMap: Record<number, { rotateX: number; rotateY: number }> = {
  1: { rotateX: 0, rotateY: 0 },
  6: { rotateX: 0, rotateY: 180 },
  2: { rotateX: 0, rotateY: -90 },
  5: { rotateX: 0, rotateY: 90 },
  3: { rotateX: -90, rotateY: 0 },
  4: { rotateX: 90, rotateY: 0 },
};

const getFaceQuaternion = (v: number) => {
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  switch (v) {
    case 1:
      e.set(0, 0, 0);
      break;
    case 6:
      e.set(0, Math.PI, 0);
      break;
    case 2:
      e.set(0, Math.PI / 2, 0);
      break;
    case 5:
      e.set(0, -Math.PI / 2, 0);
      break;
    case 3:
      e.set(Math.PI / 2, 0, 0);
      break;
    case 4:
      e.set(-Math.PI / 2, 0, 0);
      break;
    default:
      e.set(0, 0, 0);
  }
  q.setFromEuler(e);
  return q;
};

const getPhysicalFaceValue = (body: CANNON.Body): number => {
  const localDirections = [
    { value: 1, x: 0, y: 0, z: 1 },
    { value: 6, x: 0, y: 0, z: -1 },
    { value: 5, x: 1, y: 0, z: 0 },
    { value: 2, x: -1, y: 0, z: 0 },
    { value: 3, x: 0, y: 1, z: 0 },
    { value: 4, x: 0, y: -1, z: 0 },
  ];

  const q = new THREE.Quaternion(
    body.quaternion.x,
    body.quaternion.y,
    body.quaternion.z,
    body.quaternion.w,
  );

  let maxZ = -Infinity;
  let bestValue = 1;

  for (const dir of localDirections) {
    const vec = new THREE.Vector3(dir.x, dir.y, dir.z);
    vec.applyQuaternion(q);
    if (vec.z > maxZ) {
      maxZ = vec.z;
      bestValue = dir.value;
    }
  }

  return bestValue;
};

const createVelvetTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Mystic Crimson/Burgundy royal velvet gradient
  const grad = ctx.createRadialGradient(512, 512, 60, 512, 512, 700);
  grad.addColorStop(0, "#4a0404"); // Warm mystical core
  grad.addColorStop(0.5, "#220202"); // Deep blood-crimson velvet
  grad.addColorStop(1, "#070000"); // Shadows at boundaries
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft fuzzy fiber noise
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const rand = (Math.random() - 0.5) * 15;
    data[i] = Math.min(255, Math.max(0, data[i] + rand));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + rand));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + rand));
  }
  ctx.putImageData(imgData, 0, 0);

  // Gilded celestial geometry lines
  ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(512, 512, 410, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(212, 175, 55, 0.22)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(512, 512, 395, 0, Math.PI * 2);
  ctx.setLineDash([14, 16]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Hexagonal astronomical lines connecting circles
  ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
  ctx.lineWidth = 1.5;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
    ctx.beginPath();
    ctx.moveTo(512 + Math.cos(a) * 395, 512 + Math.sin(a) * 395);
    ctx.lineTo(
      1024 - (512 + Math.cos(a + (Math.PI * 2) / 3) * 395),
      1024 - (512 + Math.sin(a + (Math.PI * 2) / 3) * 395),
    );
    ctx.stroke();
  }

  // Golden inner ring
  ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(512, 512, 160, 0, Math.PI * 2);
  ctx.stroke();

  // Draw delicate gold star nodes
  ctx.fillStyle = "rgba(212, 175, 55, 0.75)";
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    const nx = 512 + Math.cos(a) * 395;
    const ny = 512 + Math.sin(a) * 395;
    ctx.beginPath();
    ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Gilded alchemical glyphs/runes
  ctx.font = "bold 20px 'Georgia', serif";
  ctx.fillStyle = "rgba(212, 175, 55, 0.6)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const runes = ["🜁", "🜂", "🜃", "🜄", "🜍", "🝔", "🜚", "🜛", "🜞", "🝢", "🜔", "🜕"];
  runes.forEach((rune, idx) => {
    const angle = (idx * Math.PI * 2) / runes.length;
    const rx = 512 + Math.cos(angle) * 402;
    const ry = 512 + Math.sin(angle) * 402;
    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(rune, 0, 0);
    ctx.restore();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const DiceManager = ({
  onRollComplete,
  pointPops = [],
  triggerExplosionCount = 0,
}: {
  onRollComplete: (hand: ReturnType<typeof evaluateHand>) => void;
  pointPops?: any[];
  triggerExplosionCount?: number;
}) => {
  const { state, dispatch } = useGame();

  // Ref to always hold the freshest dice state and prevent closure stale bugs in the WebGL tick frame loop
  const diceStateRef = useRef(state.dice);
  diceStateRef.current = state.dice;

  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // References to keep track of WebGL/Cannon components across ticks
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const worldRef = useRef<CANNON.World | null>(null);
  const diceMeshesRef = useRef<THREE.Mesh[]>([]);
  const diceBodiesRef = useRef<CANNON.Body[]>([]);
  const diceShakesRef = useRef<
    { startTime: number; duration: number; amp: number }[]
  >([
    { startTime: 0, duration: 0, amp: 0 },
    { startTime: 0, duration: 0, amp: 0 },
    { startTime: 0, duration: 0, amp: 0 },
    { startTime: 0, duration: 0, amp: 0 },
    { startTime: 0, duration: 0, amp: 0 },
  ]);
  const landingPositions = useRef<THREE.Vector3[]>([
    new THREE.Vector3(-7, -1, 1.1),
    new THREE.Vector3(-3.5, 1, 1.1),
    new THREE.Vector3(0, -1.5, 1.1),
    new THREE.Vector3(3.5, 0.5, 1.1),
    new THREE.Vector3(7, -1, 1.1),
  ]);

  const materialsRef = useRef<{
    normal: THREE.MeshStandardMaterial[];
    locked: THREE.MeshStandardMaterial[];
    corrupt: THREE.MeshStandardMaterial[];
  } | null>(null);

  // Status tracker to run actions on status change
  const currentStatusRef = useRef<string>("");
  const rollStartTimeRef = useRef<number>(0);
  const rollEndTimeRef = useRef<number>(0);

  // Trigger physical 3D dice shakes upon receiving scoring point pops with custom delay timings!
  const processedPopsRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!pointPops || pointPops.length === 0) {
      processedPopsRef.current.clear();
      return;
    }
    pointPops.forEach((pop) => {
      if (processedPopsRef.current.has(pop.id)) return;
      processedPopsRef.current.add(pop.id);

      // Trigger shake of pop.ix matching the delay
      setTimeout(() => {
        if (diceShakesRef.current && diceShakesRef.current[pop.ix]) {
          diceShakesRef.current[pop.ix] = {
            startTime: performance.now(),
            duration: pop.isMatched ? 900 : 350,
            amp: pop.isMatched ? 3.2 : 0.45,
          };
        }
      }, pop.delay);
    });
  }, [pointPops]);

  useEffect(() => {
    // 1. Helper function to create face textures
    const createFaceTexture = (
      val: number,
      locked: boolean,
      corrupt: boolean,
    ) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d")!;

      // 1. Antique medieval background gradient
      const grad = ctx.createLinearGradient(0, 0, 256, 256);
      if (locked) {
        // Hammered gold leaf look
        grad.addColorStop(0, "#fff5cc");
        grad.addColorStop(0.4, "#e5b81a");
        grad.addColorStop(1, "#8a6500");
      } else if (corrupt) {
        // Deep abyssal stone red
        grad.addColorStop(0, "#3a0202");
        grad.addColorStop(0.5, "#900c0c");
        grad.addColorStop(1, "#400000");
      } else {
        // Royal ancient parchment / Ivory bone look
        grad.addColorStop(0, "#fffcfa");
        grad.addColorStop(0.6, "#fdf6e7");
        grad.addColorStop(1, "#ebdcb9");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);

      // 2. Beautiful organic cracked veins (aged stone / ivory / gold fractures)
      ctx.strokeStyle = locked
        ? "rgba(255, 255, 255, 0.4)"
        : corrupt
          ? "rgba(255, 100, 100, 0.25)"
          : "rgba(139, 115, 85, 0.16)";
      ctx.lineWidth = 1.8;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        let currentX = Math.random() * 256;
        let currentY = 0;
        ctx.moveTo(currentX, currentY);
        while (currentY < 256) {
          currentX += (Math.random() - 0.5) * 36;
          currentY += Math.random() * 40 + 20;
          ctx.lineTo(currentX, currentY);
        }
        ctx.stroke();
      }

      // 3. Dual layer fine borders with alchemical gold/dark highlights
      ctx.strokeStyle = locked ? "#ffffff" : corrupt ? "#5c0404" : "#b49867";
      ctx.lineWidth = locked ? 12 : 7;
      ctx.strokeRect(12, 12, 232, 232);

      ctx.strokeStyle = locked
        ? "rgba(255, 255, 255, 0.85)"
        : corrupt
          ? "rgba(255, 100, 100, 0.35)"
          : "rgba(180, 152, 103, 0.35)";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(22, 22, 212, 212);

      // 4. Intricate star diamond corners inside borders
      ctx.fillStyle = locked ? "#ffffff" : corrupt ? "#ffa0a0" : "#b49867";
      const drawDiamond = (cx: number, cy: number, size: number) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx + size, cy);
        ctx.lineTo(cx, cy + size);
        ctx.lineTo(cx - size, cy);
        ctx.closePath();
        ctx.fill();
      };

      const o = 22; // outer corner offset
      drawDiamond(o, o, 4.5);
      drawDiamond(256 - o, o, 4.5);
      drawDiamond(o, 256 - o, 4.5);
      drawDiamond(256 - o, 256 - o, 4.5);

      // 5. Stylized Scholastic/Medieval Typography
      ctx.font = "bold 135px 'Georgia', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Fancy magical text shadows and soft glows
      if (locked) {
        ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
        ctx.shadowBlur = 12;
      } else if (corrupt) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
        ctx.shadowBlur = 5;
      } else {
        ctx.shadowColor = "rgba(139, 115, 85, 0.25)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
      }

      ctx.fillStyle = locked ? "#ffffff" : corrupt ? "#ffe3e3" : "#2b1c11";
      ctx.fillText(String(val), 128, 128);

      // Clean shadows
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Classy underline for disambiguating 6 - medieval scroll style with center diamond node
      if (val === 6) {
        ctx.fillStyle = locked ? "#ffffff" : corrupt ? "#ffe3e3" : "#b49867";
        ctx.fillRect(72, 192, 112, 6);
        drawDiamond(128, 195, 5); // elegant central alchemical node under the 6
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    // 2. Prebuild all materials
    const normalMats: THREE.MeshStandardMaterial[] = [];
    const lockedMats: THREE.MeshStandardMaterial[] = [];
    const corruptMats: THREE.MeshStandardMaterial[] = [];

    for (let v = 1; v <= 6; v++) {
      const texN = createFaceTexture(v, false, false);
      const texL = createFaceTexture(v, true, false);
      const texC = createFaceTexture(v, false, true);

      normalMats.push(
        new THREE.MeshStandardMaterial({
          map: texN,
          roughness: 0.12,
          metalness: 0.08,
          emissive: new THREE.Color(0x0c0c0c),
          emissiveIntensity: 1.0,
        }),
      );
      lockedMats.push(
        new THREE.MeshStandardMaterial({
          map: texL,
          roughness: 0.18,
          metalness: 0.85,
          emissive: new THREE.Color(0x3d2b00),
          emissiveIntensity: 0.4,
        }),
      );
      corruptMats.push(
        new THREE.MeshStandardMaterial({
          map: texC,
          roughness: 0.15,
          metalness: 0.4,
          emissive: new THREE.Color(0x5a0300),
          emissiveIntensity: 0.7,
        }),
      );
    }

    materialsRef.current = {
      normal: normalMats,
      locked: lockedMats,
      corrupt: corruptMats,
    };

    // 3. Setup Three.js scene
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const rect = containerRef.current?.getBoundingClientRect() || {
      width: 600,
      height: 450,
    };
    const camera = new THREE.PerspectiveCamera(
      40,
      rect.width / rect.height,
      1,
      1000,
    );
    camera.position.set(0, 0, 35);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(12, -18, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 100;
    const d = 16;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0004;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffddaa, 0.6);
    fillLight.position.set(-15, 15, 10);
    scene.add(fillLight);

    // Glowing professional overhead spotlight with clean shadows
    const spotLight = new THREE.SpotLight(
      0xffffff,
      4.0,
      50,
      Math.PI / 4.5,
      0.4,
      0.8,
    );
    spotLight.position.set(0, -2, 22);
    spotLight.target.position.set(0, 0, 0);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0006;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);
    scene.add(spotLight.target);

    // 4. Setup beautiful wooden tray and felt floor
    const velvetTex = createVelvetTexture();
    const feltFloorGeo = new THREE.BoxGeometry(32, 24, 1);
    const feltFloorMat = new THREE.MeshStandardMaterial({
      map: velvetTex,
      roughness: 0.85,
    });
    const feltFloorMesh = new THREE.Mesh(feltFloorGeo, feltFloorMat);
    feltFloorMesh.position.set(0, 0, -0.5);
    feltFloorMesh.receiveShadow = true;
    scene.add(feltFloorMesh);

    // Golden Tray Divider bar
    const dividerGeo = new THREE.BoxGeometry(32, 0.15, 0.25);
    const dividerMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.1,
    });
    const dividerMesh = new THREE.Mesh(dividerGeo, dividerMat);
    dividerMesh.position.set(0, 6.4, 0.12);
    dividerMesh.receiveShadow = true;
    scene.add(dividerMesh);

    // Wooden border walls
    const borderMat = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      roughness: 0.22,
      metalness: 0.2,
    });

    const leftBorder = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 25.2, 2.5),
      borderMat,
    );
    leftBorder.position.set(-16.6, 0, 0.4);
    leftBorder.castShadow = true;
    leftBorder.receiveShadow = true;
    scene.add(leftBorder);

    const rightBorder = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 25.2, 2.5),
      borderMat,
    );
    rightBorder.position.set(16.6, 0, 0.4);
    rightBorder.castShadow = true;
    rightBorder.receiveShadow = true;
    scene.add(rightBorder);

    const topBorder = new THREE.Mesh(
      new THREE.BoxGeometry(34.4, 1.2, 2.5),
      borderMat,
    );
    topBorder.position.set(0, 12.6, 0.4);
    topBorder.castShadow = true;
    topBorder.receiveShadow = true;
    scene.add(topBorder);

    const bottomBorder = new THREE.Mesh(
      new THREE.BoxGeometry(34.4, 1.2, 2.5),
      borderMat,
    );
    bottomBorder.position.set(0, -12.6, 0.4);
    bottomBorder.castShadow = true;
    bottomBorder.receiveShadow = true;
    scene.add(bottomBorder);

    // Decorative golden metal corners inside the tray
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.15,
    });
    const cornerSize = 1.6;
    const cornerThickness = 0.2;
    const cornerHeight = 2.5;

    const cornerGeomH = new THREE.BoxGeometry(
      cornerSize,
      cornerThickness,
      cornerHeight,
    );
    const cornerGeomV = new THREE.BoxGeometry(
      cornerThickness,
      cornerSize,
      cornerHeight,
    );

    // Top-Left corner
    const tl1 = new THREE.Mesh(cornerGeomH, metalMat);
    tl1.position.set(-15.4, 11.9, 0.45);
    scene.add(tl1);
    const tl2 = new THREE.Mesh(cornerGeomV, metalMat);
    tl2.position.set(-15.9, 11.4, 0.45);
    scene.add(tl2);

    // Top-Right corner
    const tr1 = new THREE.Mesh(cornerGeomH, metalMat);
    tr1.position.set(15.4, 11.9, 0.45);
    scene.add(tr1);
    const tr2 = new THREE.Mesh(cornerGeomV, metalMat);
    tr2.position.set(15.9, 11.4, 0.45);
    scene.add(tr2);

    // Bottom-Left corner
    const bl1 = new THREE.Mesh(cornerGeomH, metalMat);
    bl1.position.set(-15.4, -11.9, 0.45);
    scene.add(bl1);
    const bl2 = new THREE.Mesh(cornerGeomV, metalMat);
    bl2.position.set(-15.9, -11.4, 0.45);
    scene.add(bl2);

    // Bottom-Right corner
    const br1 = new THREE.Mesh(cornerGeomH, metalMat);
    br1.position.set(15.4, -11.9, 0.45);
    scene.add(br1);
    const br2 = new THREE.Mesh(cornerGeomV, metalMat);
    br2.position.set(15.9, -11.4, 0.45);
    scene.add(br2);

    // 5. Setup physical Cannon.js world
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, 0, -260),
    });
    worldRef.current = world;

    const dicePhysMaterial = new CANNON.Material("dice");
    const trayPhysMaterial = new CANNON.Material("tray");
    const contactMat = new CANNON.ContactMaterial(
      dicePhysMaterial,
      trayPhysMaterial,
      {
        friction: 0.5,
        restitution: 0.35,
      },
    );
    const diceDiceContact = new CANNON.ContactMaterial(
      dicePhysMaterial,
      dicePhysMaterial,
      {
        friction: 0.4,
        restitution: 0.25,
      },
    );
    world.addContactMaterial(contactMat);
    world.addContactMaterial(diceDiceContact);

    // Physical boundaries matching wooden frames
    const groundBody = new CANNON.Body({ mass: 0, material: trayPhysMaterial });
    const groundShape = new CANNON.Box(new CANNON.Vec3(16, 12, 1));
    groundBody.addShape(groundShape);
    groundBody.position.set(0, 0, -1);
    world.addBody(groundBody);

    // Left wall
    const wallLeft = new CANNON.Body({ mass: 0, material: trayPhysMaterial });
    wallLeft.addShape(new CANNON.Box(new CANNON.Vec3(10, 20, 20))); // Thicker
    wallLeft.position.set(-26, 0, 5);
    world.addBody(wallLeft);

    // Right wall
    const wallRight = new CANNON.Body({ mass: 0, material: trayPhysMaterial });
    wallRight.addShape(new CANNON.Box(new CANNON.Vec3(10, 20, 20)));
    wallRight.position.set(26, 0, 5);
    world.addBody(wallRight);

    // Top wall
    const wallTop = new CANNON.Body({ mass: 0, material: trayPhysMaterial });
    wallTop.addShape(new CANNON.Box(new CANNON.Vec3(30, 10, 20)));
    wallTop.position.set(0, 22, 5);
    world.addBody(wallTop);

    // Bottom wall
    const wallBottom = new CANNON.Body({ mass: 0, material: trayPhysMaterial });
    wallBottom.addShape(new CANNON.Box(new CANNON.Vec3(30, 10, 20)));
    wallBottom.position.set(0, -22, 5);
    world.addBody(wallBottom);

    // Invisible ceiling so dice can't fly out of the board entirely
    const wallCeil = new CANNON.Body({ mass: 0, material: trayPhysMaterial });
    wallCeil.addShape(new CANNON.Box(new CANNON.Vec3(25, 25, 1)));
    wallCeil.position.set(0, 0, 11);
    world.addBody(wallCeil);

    // Divider wall in active area
    const dividerPhys = new CANNON.Body({
      mass: 0,
      material: trayPhysMaterial,
    });
    dividerPhys.addShape(new CANNON.Box(new CANNON.Vec3(16, 0.1, 4)));
    dividerPhys.position.set(0, 6.4, 2);
    world.addBody(dividerPhys);

    // 6. Build 5 dice meshes and bodies with mathematically rounded/beveled edges
    const createRoundedBoxGeometry = (
      w: number,
      h: number,
      d: number,
      r: number,
      segments: number,
    ) => {
      const geom = new THREE.BoxGeometry(w, h, d, segments, segments, segments);
      const posAttr = geom.attributes.position;

      for (let j = 0; j < posAttr.count; j++) {
        const x = posAttr.getX(j);
        const y = posAttr.getY(j);
        const z = posAttr.getZ(j);

        // Center coordinates of rounding spheres/cylinders inside the box
        const cx = Math.sign(x) * Math.min(Math.abs(x), w / 2 - r);
        const cy = Math.sign(y) * Math.min(Math.abs(y), h / 2 - r);
        const cz = Math.sign(z) * Math.min(Math.abs(z), d / 2 - r);

        // Offset vector from center of rounding sphere to vertex
        const vx = x - cx;
        const vy = y - cy;
        const vz = z - cz;

        const len = Math.sqrt(vx * vx + vy * vy + vz * vz);
        if (len > 0) {
          posAttr.setXYZ(
            j,
            cx + (vx / len) * r,
            cy + (vy / len) * r,
            cz + (vz / len) * r,
          );
        }
      }
      geom.computeVertexNormals();
      return geom;
    };

    const diceGeom = createRoundedBoxGeometry(2.2, 2.2, 2.2, 0.28, 12);
    const diceMeshes: THREE.Mesh[] = [];
    const diceBodies: CANNON.Body[] = [];

    // Map ordered materials matching local indexing
    const buildDiceMaterialsArray = (
      val: number,
      isLocked: boolean,
      corruptRatio: number,
      modifier?: "gold" | "foil" | "holographic" | "polychrome",
      isAscended?: boolean,
    ) => {
      const getSingleMat = (faceVal: number) => {
        let baseMat;
        if (isLocked) {
          baseMat = lockedMats[faceVal - 1];
        } else if (corruptRatio > 0.5) {
          baseMat = corruptMats[faceVal - 1];
        } else {
          baseMat = normalMats[faceVal - 1];
        }

        // Clone for modifications
        const clone = baseMat.clone();

        if (modifier === "gold") {
          clone.color.setHex(0xeab308);
          clone.emissive.setHex(0x3f3100);
        } else if (modifier === "foil") {
          clone.color.setHex(0xcbd5e1);
          clone.emissive.setHex(0x1a1a1a);
          clone.metalness = 0.9;
          clone.roughness = 0.02;
        } else if (modifier === "holographic") {
          clone.color.setHex(0xd8b4fe);
          clone.emissive.setHex(0x31003f);
          clone.metalness = 0.7;
          clone.roughness = 0.05;
        }

        if (isAscended) {
          clone.color.setHex(0x00ffff);
          clone.emissive.setHex(0x004444);
          clone.emissiveIntensity = 2.0;
          clone.metalness = 1.0;
          clone.roughness = 0.1;
        }

        return clone;
      };

      return [
        getSingleMat(5), // +X
        getSingleMat(2), // -X
        getSingleMat(3), // +Y
        getSingleMat(4), // -Y
        getSingleMat(1), // +Z
        getSingleMat(6), // -Z
      ];
    };

    for (let i = 0; i < 5; i++) {
      const d = state.dice[i];
      const initLocked = d?.locked || false;
      const initVal = d?.value || 1;
      const ratio = Math.min(1, Math.max(0, (d?.corruption || 0) / 100));
      const mod = d?.modifier;

      const mesh = new THREE.Mesh(
        diceGeom,
        buildDiceMaterialsArray(initVal, initLocked, ratio, mod),
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = {
        materialKey: `${initVal}_${initLocked}_${ratio > 0.5 ? "C" : "N"}_${mod || "none"}`,
      };
      scene.add(mesh);
      diceMeshes.push(mesh);

      // Cannon body
      const body = new CANNON.Body({
        mass: initLocked ? 0 : 1,
        material: dicePhysMaterial,
        linearDamping: 0.16,
        angularDamping: 0.16,
      });
      body.addShape(new CANNON.Box(new CANNON.Vec3(1.1, 1.1, 1.1)));
      // Default starting positions clustered off-screen at the upper edge before throwing
      body.position.set((i - 2) * 1.5, 18, 8);
      world.addBody(body);
      diceBodies.push(body);
    }

    diceMeshesRef.current = diceMeshes;
    diceBodiesRef.current = diceBodies;

    // Helper functions for Euler Face Quaternion returns
    const getFaceQuaternion = (v: number) => {
      const q = new THREE.Quaternion();
      const e = new THREE.Euler();
      switch (v) {
        case 1:
          e.set(0, 0, 0);
          break;
        case 6:
          e.set(0, Math.PI, 0);
          break;
        case 2:
          e.set(0, Math.PI / 2, 0);
          break;
        case 5:
          e.set(0, -Math.PI / 2, 0);
          break;
        case 3:
          e.set(Math.PI / 2, 0, 0);
          break;
        case 4:
          e.set(-Math.PI / 2, 0, 0);
          break;
        default:
          e.set(0, 0, 0);
      }
      q.setFromEuler(e);
      return q;
    };

    // 7. Core interactive Raycasting and Hover listeners
    const raycaster = new THREE.Raycaster();

    const handlePointerDown = (event: MouseEvent) => {
      if (!canvasRef.current || !rendererRef.current || !cameraRef.current)
        return;
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(
        new THREE.Vector2(mouseX, mouseY),
        cameraRef.current,
      );
      const intersects = raycaster.intersectObjects(diceMeshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const clickedIndex = diceMeshes.indexOf(clickedMesh);
        if (clickedIndex !== -1) {
          if (currentStatusRef.current !== "rolling") {
            const d = diceStateRef.current[clickedIndex];
            if (d) {
              sfx.playLock();
              dispatch({ type: "TOGGLE_LOCK", id: d.id });
            }
          }
        }
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      if (!canvasRef.current || !rendererRef.current || !cameraRef.current)
        return;
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(
        new THREE.Vector2(mouseX, mouseY),
        cameraRef.current,
      );
      const intersects = raycaster.intersectObjects(diceMeshes);

      let hoveringMesh: THREE.Object3D | null = null;
      if (intersects.length > 0 && currentStatusRef.current !== "rolling") {
        hoveringMesh = intersects[0].object;
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }

      diceMeshes.forEach((mesh) => {
        const mats = mesh.material as THREE.MeshStandardMaterial[];
        const key = mesh.userData.materialKey || "";
        const isL = key.includes("_true_");
        const isC = key.includes("_C");
        if (mesh === hoveringMesh) {
          mats.forEach((m) => {
            m.emissive.setHex(0x323a4a);
          });
        } else {
          mats.forEach((m) => {
            if (isL) {
              m.emissive.setHex(0x423101);
            } else if (isC) {
              m.emissive.setHex(0x4a0101);
            } else {
              m.emissive.setHex(0x0a0c12);
            }
          });
        }
      });
    };

    canvasRef.current.addEventListener("pointerdown", handlePointerDown);
    canvasRef.current.addEventListener("pointermove", handlePointerMove);

    // 8. Resize support using container dimensions
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const w = containerRect.width;
      const h = containerRect.height;
      renderer.setSize(w, h);

      const aspect = w / h;
      camera.aspect = aspect;

      // Adjust particle canvas size
      if (particleCanvasRef.current) {
        particleCanvasRef.current.width = w;
        particleCanvasRef.current.height = h;
      }

      // Calculate dynamic top-down Z distance to keep 100% of the 32x24 board tray visible
      // Vertical FOV is 40 degrees
      const fovRad = (40 * Math.PI) / 180;
      const tanHalfFOV = Math.tan(fovRad / 2);

      // Fit floor height (max y = 13.2, total height = 26.4)
      const distHeightRequired = 28.5 / 2 / tanHalfFOV;

      // Fit floor width (max x = 17.2, total width = 34.4)
      const distWidthRequired = 36.5 / 2 / (aspect * tanHalfFOV);

      // Take the larger distance to fit both dimensions safely
      // Give appropriate snug margin depending on screen orientation. Made 20%+ roomier for safety.
      const marginExt = aspect < 1 ? 1.84 : 1.58;
      const finalZDistance =
        Math.max(distHeightRequired, distWidthRequired) * marginExt;

      camera.position.set(0, 0, finalZDistance);
      camera.lookAt(0, 0, 0);

      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    handleResize();

    // 9. Standard continuous Render Tick Loop
    let lastTime = performance.now();
    let frameId: number;

    const tickFrame = () => {
      const time = performance.now();
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const currentStatus = currentStatusRef.current;

      if (currentStatus === "rolling") {
        world.step(1 / 60, Math.min(dt, 0.1), 3);

        const elapsed = (performance.now() - rollStartTimeRef.current) / 1000;

        for (let i = 0; i < 5; i++) {
          const mesh = diceMeshes[i];
          const body = diceBodies[i];
          const d = diceStateRef.current[i];

          if (d && !d.locked && d.forceValue !== undefined && elapsed > 0.9) {
            const targetQuat = getFaceQuaternion(d.forceValue);
            const bodyQ = new THREE.Quaternion(
              body.quaternion.x,
              body.quaternion.y,
              body.quaternion.z,
              body.quaternion.w,
            );
            const t = Math.min(1, (elapsed - 0.9) / 0.5);
            const slerpedQ = bodyQ.slerp(targetQuat, t * 0.15);
            body.quaternion.set(slerpedQ.x, slerpedQ.y, slerpedQ.z, slerpedQ.w);
            body.angularVelocity.scale(1 - t * 0.2, body.angularVelocity);
          }

          if (mesh) {
            mesh.position.copy(body.position);
            mesh.quaternion.copy(body.quaternion);
          }
        }
      } else {
        for (let i = 0; i < 5; i++) {
          const mesh = diceMeshes[i];
          const d = diceStateRef.current[i];
          if (!mesh) continue;

          if (!d) continue;

          const targetPos = new THREE.Vector3();
          let targetQuat = new THREE.Quaternion();

          let wobbleScale = d.locked ? 0.9 : 1.0;
          if (d.locked) {
            targetPos.set((i - 2) * 4.6, 9.2, 1.15);
            targetQuat = getFaceQuaternion(d.value);
          } else {
            if (landingPositions.current[i]) {
              targetPos.copy(landingPositions.current[i]);
              targetPos.x = Math.max(-14.5, Math.min(14.5, targetPos.x));
              targetPos.y = Math.max(-10.5, Math.min(4.8, targetPos.y));
              targetPos.z = 1.1;
            } else {
              targetPos.set((i - 2) * 4.6, -4, 1.1);
            }
            targetQuat = getFaceQuaternion(d.value);

            // Calculate a wobble effect based on time elapsed since the roll ended
            if (rollEndTimeRef.current > 0) {
              const timeSinceEnd =
                (performance.now() - rollEndTimeRef.current) / 1000;
              if (timeSinceEnd > 0 && timeSinceEnd < 0.6) {
                // A damped sine wave for a rubbery bounce/wobble effect
                const damping = Math.exp(-timeSinceEnd * 8);
                const sine = Math.sin(timeSinceEnd * 35);
                wobbleScale = 1 + sine * damping * 0.25;
              }
            }
          }

          // Apply compact physical mini-shake, subtle diagonal rumble, and rapid micro-pulsing
          const shake = diceShakesRef.current[i];
          const shakeOffset = new THREE.Vector3(0, 0, 0);
          let shakeScaleX = 1.0;
          let shakeScaleY = 1.0;
          let shakeScaleZ = 1.0;
          let shakeRotationOffset = new THREE.Euler(0, 0, 0);

          if (shake && shake.startTime > 0) {
            const elapsedShake = (performance.now() - shake.startTime) / 1000;
            const durationSec = shake.duration / 1000;
            if (elapsedShake < durationSec) {
              const t = elapsedShake / durationSec;
              const isMatched = shake.amp > 1.0; // scoring dice have high amplitude (3.2 vs 0.45)

              // Exponential decay for rapid crisp responsiveness
              const damping = Math.sin((1 - t) * Math.PI) * Math.exp(-t * 3.5);

              // 1. Snappy high-frequency micro-rumble (horizontal offset shake)
              const freq = 85;
              const maxAmp = isMatched ? 0.95 : 0.22;
              shakeOffset.x = Math.sin(elapsedShake * freq) * maxAmp * damping;
              shakeOffset.y =
                Math.cos(elapsedShake * freq * 1.2) * maxAmp * damping;

              // 2. Extremely tiny, elegant pop/bounce upward
              shakeOffset.z =
                Math.sin(t * Math.PI) * (isMatched ? 0.75 : 0.22) * damping;

              // 3. Mini rotation shudders
              const rotFreq = 65;
              shakeRotationOffset.x =
                Math.sin(elapsedShake * rotFreq * 0.8) *
                (isMatched ? 0.25 : 0.06) *
                damping;
              shakeRotationOffset.y =
                Math.cos(elapsedShake * rotFreq * 1.1) *
                (isMatched ? 0.25 : 0.06) *
                damping;
              shakeRotationOffset.z =
                Math.sin(elapsedShake * rotFreq * 1.3) *
                (isMatched ? 0.12 : 0.03) *
                damping;

              // 4. Elastic micro scale nudge (slight punchy pop)
              const popFactor =
                Math.sin(t * Math.PI) * (isMatched ? 0.22 : 0.06) * damping;
              shakeScaleX = 1.0 + popFactor;
              shakeScaleY = 1.0 + popFactor;
              shakeScaleZ = 1.0 + popFactor;
            }
          }

          const currentPos = targetPos.clone().add(shakeOffset);
          mesh.position.lerp(currentPos, 0.22); // fast responsiveness

          const currentQuat = targetQuat.clone();
          if (
            shakeRotationOffset.x !== 0 ||
            shakeRotationOffset.y !== 0 ||
            shakeRotationOffset.z !== 0
          ) {
            const rotQuat = new THREE.Quaternion().setFromEuler(
              shakeRotationOffset,
            );
            currentQuat.multiply(rotQuat);
          }
          mesh.quaternion.slerp(currentQuat, 0.22);

          mesh.scale.set(
            wobbleScale * shakeScaleX,
            wobbleScale * shakeScaleY,
            wobbleScale * shakeScaleZ,
          );
        }
      }

      renderer.render(scene, camera);

      // --- Update and Draw 2D canvas particles ---
      const pCanvas = particleCanvasRef.current;
      if (pCanvas) {
        const pCtx = pCanvas.getContext("2d");
        if (pCtx) {
          pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
          const particles = particlesRef.current;
          for (let idx = particles.length - 1; idx >= 0; idx--) {
            const p = particles[idx];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
              particles.splice(idx, 1);
              continue;
            }

            pCtx.fillStyle = p.color;
            pCtx.globalAlpha = p.alpha;

            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            pCtx.fill();

            if (p.glowing) {
              pCtx.fillStyle = "#ffffff";
              pCtx.beginPath();
              pCtx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
              pCtx.fill();
            }
          }
          pCtx.globalAlpha = 1.0;
        }
      }

      frameId = requestAnimationFrame(tickFrame);
    };

    frameId = requestAnimationFrame(tickFrame);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("pointerdown", handlePointerDown);
        canvasRef.current.removeEventListener("pointermove", handlePointerMove);
      }
      normalMats.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      lockedMats.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      corruptMats.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      feltFloorGeo.dispose();
      feltFloorMat.dispose();
      velvetTex.dispose();
      metalMat.dispose();
      cornerGeomH.dispose();
      cornerGeomV.dispose();
      dividerGeo.dispose();
      dividerMat.dispose();
      borderMat.dispose();
      diceGeom.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastRolledStatusRef = useRef<string>("");
  const onRollCompleteRef = useRef(onRollComplete);
  onRollCompleteRef.current = onRollComplete;

  const stateRef = useRef(state);
  stateRef.current = state;

  const dispatchRef = useRef(dispatch);
  dispatchRef.current = dispatch;

  useEffect(() => {
    currentStatusRef.current = state.status;

    if (state.status === "rolling") {
      if (lastRolledStatusRef.current === "rolling") {
        return;
      }
      lastRolledStatusRef.current = "rolling";

      rollStartTimeRef.current = performance.now();
      rollEndTimeRef.current = 0;
      const world = worldRef.current;
      const diceBodies = diceBodiesRef.current;
      const currentDiceState = stateRef.current.dice;

      if (world && diceBodies.length > 0) {
        for (let i = 0; i < 5; i++) {
          const body = diceBodies[i];
          const d = currentDiceState[i];
          if (!d) continue;

          if (d.locked) {
            body.mass = 0;
            body.type = CANNON.Body.STATIC;
            body.position.set((i - 2) * 4.6, 9.2, 1.15);
            body.velocity.set(0, 0, 0);
            body.angularVelocity.set(0, 0, 0);
          } else {
            body.mass = 1;
            body.type = CANNON.Body.DYNAMIC;
            body.updateMassProperties();
            body.force.set(0, 0, 0);
            body.torque.set(0, 0, 0);

            // Space starting positions widely so dice do not start in an overlapping state!
            // Spacing them by 4.4 units ensures at least 4.4 - 1.1*2 = 2.2 units of clearance.
            const startX = (i - 2) * 4.4 + (Math.random() - 0.5) * 0.8;
            // Spawn inside the bottom active region of the board, clear of the Y = -12.0 bottom boundary wall
            const startY = -9.2;
            // Spawn high enough above the ground but below the Z = 10.0 physical ceiling
            const startZ = 5.2 + Math.random() * 1.5;

            body.position.set(startX, startY, startZ);

            // Target the center of the bottom active tray cleanly
            const targetX = (Math.random() - 0.5) * 4.0;
            const targetY = -1.5 + (Math.random() - 0.5) * 2.0;
            const targetZ = 1.1;

            const dirX = targetX - startX;
            const dirY = targetY - startY; // forward direction (positive Y)
            const dirZ = targetZ - startZ; // downward direction (negative Z)

            const len = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
            const speed = 24 + Math.random() * 5;

            // Compute ideal velocities using normalized vector
            const vx = (dirX / len) * speed;
            const vy = (dirY / len) * speed;
            // Add a small upward thrust components so the dice loop up in an arch before falling down
            const vz = (dirZ / len) * speed + (4.0 + Math.random() * 3.0);

            body.velocity.set(vx, vy, vz);

            // Give the dice extreme random rotation and spins
            body.angularVelocity.set(
              (Math.random() - 0.5) * 45,
              (Math.random() - 0.5) * 45,
              (Math.random() - 0.5) * 45,
            );

            const q = new CANNON.Quaternion();
            q.setFromEuler(
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
            );
            body.quaternion.copy(q);
          }
        }
      }

      const timeout = setTimeout(() => {
        const freshDice = stateRef.current.dice;
        const freshRelics = stateRef.current.relics;
        const freshRollsLeft = stateRef.current.rollsLeft;

        const finalResults = freshDice.map((d, i) => {
          if (d.locked) return d.value;
          if (d.forceValue !== undefined) return d.forceValue;

          const body = diceBodies[i];
          if (body) {
            return getPhysicalFaceValue(body);
          }
          return Math.floor(Math.random() * 6) + 1;
        });

        if (diceBodies.length > 0) {
          for (let i = 0; i < 5; i++) {
            const body = diceBodies[i];
            const d = freshDice[i];
            if (d && !d.locked) {
              landingPositions.current[i] = new THREE.Vector3(
                body.position.x,
                body.position.y,
                body.position.z,
              );
            }
          }
        }

        rollEndTimeRef.current = performance.now();
        dispatchRef.current({ type: "SET_ROLL_RESULTS", values: finalResults });

        setTimeout(() => {
          const dummyDice = freshDice.map((d, i) => ({
            ...d,
            value: finalResults[i],
          }));
          onRollCompleteRef.current(
            evaluateHand(
              dummyDice,
              freshRelics,
              freshRollsLeft,
              stateRef.current.handLevels,
              stateRef.current.blind,
              stateRef.current.bossPhase,
            ),
          );
        }, 50);
      }, 1600);

      return () => clearTimeout(timeout);
    } else {
      lastRolledStatusRef.current = state.status;
    }
  }, [state.status]);

  useEffect(() => {
    const diceMeshes = diceMeshesRef.current;
    if (diceMeshes.length > 0 && materialsRef.current) {
      const normalMats = materialsRef.current.normal;
      const lockedMats = materialsRef.current.locked;
      const corruptMats = materialsRef.current.corrupt;

      const getSingleMat = (
        faceVal: number,
        isLocked: boolean,
        corruptRatio: number,
        modifier?: "gold" | "foil" | "holographic" | "polychrome",
        isAscended?: boolean,
        xpRatio?: number,
        materialParam?: string,
      ) => {
        let baseMat;
        if (isLocked) {
          baseMat = lockedMats[faceVal - 1];
        } else if (corruptRatio > 0.5) {
          baseMat = corruptMats[faceVal - 1];
        } else {
          baseMat = normalMats[faceVal - 1];
        }

        const clone = baseMat.clone();
        const xp = xpRatio || 0;

        // Base changes based on specific material enchants
        if (materialParam === "wood") {
          clone.color.setHex(0x5c3a21);
          clone.roughness = 0.9;
          clone.metalness = 0.0;
          clone.emissive.setHex(0x2d1a11);
          clone.emissiveIntensity = 0.3;
        } else if (materialParam === "obsidian") {
          clone.color.setHex(0x0a0a0c);
          clone.roughness = 0.05;
          clone.metalness = 0.6;
          clone.emissive.setHex(0x2a0845);
          clone.emissiveIntensity = 1.8;
        } else if (materialParam === "steel") {
          clone.color.setHex(0x8892b0);
          clone.roughness = 0.4;
          clone.metalness = 0.95;
          clone.emissive.setHex(0x1a1a24);
        } else if (materialParam === "glass") {
          clone.color.setHex(0xe0f2fe);
          clone.roughness = 0.1;
          clone.metalness = 0.2;
          clone.transparent = true;
          clone.opacity = 0.65;
          clone.emissive.setHex(0x00f3ff);
          clone.emissiveIntensity = 0.5;
        } else if (materialParam === "midas" || materialParam === "gold") {
          clone.color.setHex(0xeab308);
          clone.roughness = 0.15;
          clone.metalness = 1.0;
          clone.emissive.setHex(0xda8200);
          clone.emissiveIntensity = 0.8;
        }

        // Apply theme-specific procedural modifications before applying modifiers
        const activeSet = state.selectedDiceSet || "default";
        if (activeSet === "synthwave") {
          // Glossy magenta-purple cyberpunk aesthetic
          clone.color.setHex(0x1a0224);
          clone.roughness = 0.05;
          clone.metalness = 0.55;
          clone.emissive.setHex(0x00f3ff); // glowing electric cyan pips
          clone.emissiveIntensity = isLocked ? 2.4 : 1.4;
        } else if (activeSet === "cyberpunk") {
          // Matte carbon hacking deck aesthetic
          clone.color.setHex(0x0a0c0a);
          clone.roughness = 0.8;
          clone.metalness = 0.9;
          clone.emissive.setHex(0x39ff14); // radioactive lime green pips
          clone.emissiveIntensity = isLocked ? 2.8 : 1.6;
        } else if (activeSet === "alchemist") {
          // High metal copper-brass crucible alloy
          clone.color.setHex(0x401d0c);
          clone.roughness = 0.18;
          clone.metalness = 0.98;
          clone.emissive.setHex(0xff6a00); // fiery amber molten pips
          clone.emissiveIntensity = isLocked ? 3.0 : 1.9;
        } else if (activeSet === "cosmic") {
          // Celestial star nebula
          clone.color.setHex(0x010214);
          clone.roughness = 0.02;
          clone.metalness = 0.8;
          clone.emissive.setHex(0xd946ef); // galaxy magenta-cyan blend
          clone.emissiveIntensity = isLocked ? 2.0 : 1.1;
        }

        // Apply XP experience level visuals: adds progressive golden reflective tech sheen
        if (xp > 0) {
          // Glow and shift towards premium gold/azure tech-grade coloring
          const xpColor = new THREE.Color(0x3b82f6).lerp(
            new THREE.Color(0xfcbd03),
            xp,
          );
          clone.color.lerp(xpColor, xp * 0.65);

          clone.roughness = Math.max(0.04, clone.roughness - xp * 0.08);
          clone.metalness = Math.min(0.95, clone.metalness + xp * 0.45);

          const neonCyan = new THREE.Color(0x06b6d4);
          clone.emissive.lerp(neonCyan, xp * 0.7);
          clone.emissiveIntensity = Math.max(clone.emissiveIntensity, xp * 1.5);
        }

        // Apply Corruption levels: custom violet infection overlay with cybernetic glow intensity
        if (corruptRatio > 0) {
          // As corruption consumes the die, color shifts to deep magenta-red plague hues
          const corruptColor = new THREE.Color(0x7209b7).lerp(
            new THREE.Color(0xef4444),
            corruptRatio,
          );
          clone.color.lerp(corruptColor, corruptRatio * 0.85);

          clone.roughness = Math.min(
            0.7,
            clone.roughness + corruptRatio * 0.25,
          );
          clone.metalness = Math.min(
            0.9,
            clone.metalness + corruptRatio * 0.45,
          );

          const hotPink = new THREE.Color(0xff4444).lerp(
            new THREE.Color(0xec4899),
            corruptRatio,
          );
          clone.emissive.lerp(hotPink, corruptRatio);
          clone.emissiveIntensity = Math.max(
            clone.emissiveIntensity,
            corruptRatio * 2.5,
          );
        }

        if (modifier === "gold") {
          clone.color.setHex(0xeab308);
          clone.emissive.setHex(0x3f3100);
        } else if (modifier === "foil") {
          clone.color.setHex(0xcbd5e1);
          clone.emissive.setHex(0x1a1a1a);
          clone.metalness = 0.9;
          clone.roughness = 0.02;
        } else if (modifier === "holographic") {
          clone.color.setHex(0xd8b4fe);
          clone.emissive.setHex(0x31003f);
          clone.metalness = 0.7;
          clone.roughness = 0.05;
        }

        if (isAscended) {
          clone.color.setHex(0x00ffff);
          clone.emissive.setHex(0x004444);
          clone.emissiveIntensity = 2.0;
          clone.metalness = 1.0;
          clone.roughness = 0.1;
        }

        return clone;
      };

      for (let i = 0; i < 5; i++) {
        const mesh = diceMeshes[i];
        const d = state.dice[i];
        if (!mesh || !d) continue;

        const isLocked = d.locked;
        const isCorrupted = d.corruption > 50;
        const ratio = Math.min(1, Math.max(0, d.corruption / 100));
        const xpRatio = !d.ascended && d.xp ? Math.min(1, d.xp / 100) : 0;

        // Incorporate corruption level, xp, and selectedDiceSet in the key so material is dynamically updated
        const key = `${d.value}_${isLocked}_${isCorrupted ? "C" : "N"}_${d.corruption}_${d.xp || 0}_${d.modifier || "none"}_${d.ascended ? "A" : "N"}_${d.material || "normal"}_${state.selectedDiceSet || "default"}`;
        if (mesh.userData.materialKey !== key) {
          mesh.userData.materialKey = key;
          mesh.material = [
            getSingleMat(
              5,
              isLocked,
              ratio,
              d.modifier,
              d.ascended,
              xpRatio,
              d.material,
            ), // +X
            getSingleMat(
              2,
              isLocked,
              ratio,
              d.modifier,
              d.ascended,
              xpRatio,
              d.material,
            ), // -X
            getSingleMat(
              3,
              isLocked,
              ratio,
              d.modifier,
              d.ascended,
              xpRatio,
              d.material,
            ), // +Y
            getSingleMat(
              4,
              isLocked,
              ratio,
              d.modifier,
              d.ascended,
              xpRatio,
              d.material,
            ), // -Y
            getSingleMat(
              1,
              isLocked,
              ratio,
              d.modifier,
              d.ascended,
              xpRatio,
              d.material,
            ), // +Z
            getSingleMat(
              6,
              isLocked,
              ratio,
              d.modifier,
              d.ascended,
              xpRatio,
              d.material,
            ), // -Z
          ];
        }
      }
    }
  }, [state.dice, state.selectedDiceSet]);

  const triggerParticles = () => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas || !cameraRef.current || !rendererRef.current) return;

    const rect = pCanvas.getBoundingClientRect();
    pCanvas.width = rect.width;
    pCanvas.height = rect.height;

    const activeSet = state.selectedDiceSet || "default";
    let colors = ["#eab308", "#ffef78", "#ff4d4d", "#c084fc", "#60a5fa"];
    let customGravity = 0.15;
    let customDecay = 0.013;
    let particleSizeBase = 2.5;

    if (activeSet === "synthwave") {
      colors = ["#ff007f", "#00f3ff", "#e0aaff", "#ff00d4", "#240046"];
      customGravity = 0.07; // floaty particles!
      customDecay = 0.01;
    } else if (activeSet === "cyberpunk") {
      colors = ["#39ff14", "#00ff87", "#051608", "#10b981", "#123018"];
      customGravity = 0.2;
      customDecay = 0.018; // radioactive matrix rain vanishes faster
    } else if (activeSet === "alchemist") {
      colors = ["#ff4500", "#ffaa00", "#ffea00", "#d4af37", "#b22222"];
      customGravity = 0.28; // heavy sparks falling down like molten hot metal
      customDecay = 0.015;
    } else if (activeSet === "cosmic") {
      colors = [
        "#8a77ff",
        "#2c1efc",
        "#00f2fe",
        "#bc13fe",
        "#ffffff",
        "#001040",
      ];
      customGravity = 0.04; // floating stardust stars
      customDecay = 0.007; // stays on screen much longer!
      particleSizeBase = 3.2; // bigger stardust star shapes
    }

    const particles = particlesRef.current;

    for (let i = 0; i < 5; i++) {
      const mesh = diceMeshesRef.current[i];
      if (!mesh) continue;

      const vector = new THREE.Vector3();
      mesh.getWorldPosition(vector);
      vector.project(cameraRef.current);

      const x = (vector.x * 0.5 + 0.5) * rect.width;
      const y = -(vector.y * 0.5 - 0.5) * rect.height;

      // Spawn 35 firework sparks per die!
      for (let pidx = 0; pidx < 35; pidx++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2.5 + Math.random() * 8.5;
        const col = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - (0.5 + Math.random() * 2),
          color: col,
          size: particleSizeBase + Math.random() * 4,
          alpha: 1.0,
          decay: customDecay + Math.random() * 0.012,
          gravity: customGravity,
          glowing: Math.random() > 0.35,
        });
      }
    }
  };

  useEffect(() => {
    if (triggerExplosionCount > 0) {
      triggerParticles();
    }
  }, [triggerExplosionCount]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#050608] to-[#0a0c10] border-none shadow-[inset_0_4px_50px_rgba(0,0,0,0.8)]"
    >
      <canvas ref={canvasRef} className="w-full h-full block touch-none z-10" />
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 pointer-events-none z-20 w-full h-full"
      />

      {state.dice.map((die, i) => (
        <ScreenProjectedMarker
          key={`marker-${die.id}`}
          die={die}
          cameraRef={cameraRef}
          meshRef={diceMeshesRef.current[i]}
          rendererRef={rendererRef}
        />
      ))}

      {pointPops.map((pop) => (
        <ScreenProjectedPopup
          key={`${pop.id}`}
          pop={pop}
          cameraRef={cameraRef}
          meshRef={diceMeshesRef.current[pop.ix]}
          rendererRef={rendererRef}
        />
      ))}

      {/* Decorative Outer Metal Corners */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-g-border/40 pointer-events-none rounded-tl"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-g-border/40 pointer-events-none rounded-tr"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-g-border/40 pointer-events-none rounded-bl"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-g-border/40 pointer-events-none rounded-br"></div>
    </div>
  );
};

export function GameBoard() {
  const { state, dispatch } = useGame();
  const [showRules, setShowRules] = useState(false);
  const [musicOn, setMusicOn] = useState(sfx.musicEnabled);

  // Initialize and auto-resume audio context/music on mount if it was enabled
  useEffect(() => {
    sfx.init();
    // Sync with saved preference in sound engine
    setMusicOn(sfx.musicEnabled);
  }, []);

  // Scoring Animation State
  const [isScoring, setIsScoring] = useState(false);
  const [displayScore, setDisplayScore] = useState(state.currentRoundScore);
  const flashControls = useAnimation();

  // Keep track of the last processed round score to detect increments
  const lastScoreRef = useRef(state.currentRoundScore);
  const lastRolledRoundRef = useRef<number>(-1);
  const [comboBanner, setComboBanner] = useState<{
    text: string;
    base: number;
    mult: number;
    total: number;
    rarity: "common" | "rare" | "legendary";
    activations: Array<{ name: string; type: "base" | "mult"; value: number }>;
  } | null>(null);

  const [explosionTriggerCount, setExplosionTriggerCount] = useState(0);
  const [boardShake, setBoardShake] = useState<{
    active: boolean;
    intensity: number;
  }>({ active: false, intensity: 1 });
  const [ambientFlash, setAmbientFlash] = useState<
    "none" | "gold" | "red" | "purple"
  >("none");
  const [sidebarTab, setSidebarTab] = useState<
    "talismans" | "combos" | "dice" | "hacks"
  >("talismans");
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [activeHackId, setActiveHackId] = useState<string | null>(null);
  const [hackStep, setHackStep] = useState<
    | "idle"
    | "select_die"
    | "select_value"
    | "select_source"
    | "select_target"
    | "select_hand"
  >("idle");
  const [hackTargetDie, setHackTargetDie] = useState<string | null>(null);
  const [hackSourceDie, setHackSourceDie] = useState<string | null>(null);
  const [pulseBase, setPulseBase] = useState(false);
  const [pulseMult, setPulseMult] = useState(false);
  const [activeActivation, setActiveActivation] = useState<{
    id?: string;
    name: string;
    type: "base" | "mult";
    value: number;
  } | null>(null);
  const [liveScoringHUD, setLiveScoringHUD] = useState<{
    text: string;
    base: number;
    mult: number;
    isScoring: boolean;
  }>({
    text: "Solo Die",
    base: 0,
    mult: 0,
    isScoring: false,
  });
  const [pointPops, setPointPops] = useState<
    Array<{
      id: string;
      text: string;
      ix: number;
      delay: number;
      baseTotal: number;
      multTotal: number;
    }>
  >([]);
  const [fireParticles, setFireParticles] = useState<
    Array<{
      id: string;
      x: number;
      y: number;
      scale: number;
      delay: number;
      color: string;
    }>
  >([]);
  const [particles, setParticles] = useState<
    Array<{
      id: string;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      vRotation: number;
    }>
  >([]);

  const spawnFire = (color: string) => {
    const newFire = Array.from({ length: 45 }).map((_, i) => ({
      id: `fire-${Date.now()}-${Math.random()}-${i}`,
      x: (Math.random() * 2 - 1) * 160,
      y: Math.random() * 80 + 30,
      scale: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 0.25,
      color,
    }));
    setFireParticles((prev) => [...prev, ...newFire]);
    setTimeout(() => setFireParticles([]), 2500);
  };

  const spawnParticles = (intensity = 1) => {
    const newParticles = Array.from({ length: 30 * intensity }).map((_, i) => ({
      id: `particle-${Date.now()}-${Math.random()}-${i}`,
      vx: (Math.random() * 2 - 1) * 320,
      vy: (Math.random() * 2 - 1) * 260 - 90, // slightly upwards
      size: Math.random() * 9 + 5,
      color: ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#a855f7", "#ffffff"][
        Math.floor(Math.random() * 6)
      ],
      rotation: Math.random() * 360,
      vRotation: (Math.random() * 2 - 1) * 180,
    }));
    setParticles(newParticles);
    // Clear particles after animation finishes
    setTimeout(() => setParticles([]), 1400);
  };

  useEffect(() => {
    const prevScore = lastScoreRef.current;
    lastScoreRef.current = state.currentRoundScore;

    // Direct reset (e.g., start of new round)
    if (state.currentRoundScore <= 0 || state.currentRoundScore < prevScore) {
      setDisplayScore(state.currentRoundScore);
      setComboBanner(null);
      setIsScoring(false);
      setPointPops([]);
      setLiveScoringHUD((prev) => ({ ...prev, isScoring: false }));
      setActiveActivation(null);
      return;
    }

    if (state.currentRoundScore > prevScore) {
      const increment = state.currentRoundScore - prevScore;
      setIsScoring(true);

      // Trigger Balatro Combo Satisfying Effects!
      const handText = state.lastHandInfo?.text || "Combo";
      const isRare = ["Quad", "Full Chamber", "Sequence"].includes(handText);
      const isLegendary = ["Pentad"].includes(handText);

      // Initialize the real-time multiplying overlay starting values
      const levelInfo = state.handLevels[handText];
      setLiveScoringHUD({
        text: handText,
        base: levelInfo?.basePoints || 0,
        mult: levelInfo?.baseMult || 1,
        isScoring: true,
      });
      setActiveActivation(null);

      // Create sequence of dice point pops!
      const newPops: any[] = [];
      let baseDelay = 0;

      const involvedIds = state.lastHandInfo?.involvedDiceIds || [];

      state.dice.forEach((d, i) => {
        if (d.destroyed) return;

        let valueStr = `+${d.value}`;
        let gain = d.value;
        // Base modifiers
        if (
          state.relics.includes("magnetic_core") &&
          (d.value === 2 || d.value === 3)
        ) {
          valueStr = `+4`;
          gain = 4;
        }
        if (state.relics.includes("rewritten_law") && d.value === 1) {
          valueStr = `+6`;
          gain = 6;
        }
        if (state.relics.includes("six_shooters") && d.value === 6) {
          valueStr = `+18`;
          gain = 18;
        }

        const isMatched = involvedIds.includes(d.id);
        const currentSeqIndex = newPops.length;

        newPops.push({
          id: `pop-${Date.now()}-${Math.random()}-${i}`,
          text: valueStr,
          ix: i,
          delay: baseDelay,
          seqIndex: currentSeqIndex,
          isAscended: d.ascended,
          isMatched: isMatched,
        });

        // Play small satisfying pop sound for each die, rising pitch!
        const pitch = 700 + currentSeqIndex * 150;
        setTimeout(() => {
          sfx.playScoreTick(pitch);

          // All active dice contribute to the final evaluated base points sum
          setLiveScoringHUD((prev) => ({
            ...prev,
            base: prev.base + gain,
          }));

          // Only matched dice pulse with major base score HUD impact flares
          if (isMatched) {
            setPulseBase(true);
            setTimeout(() => setPulseBase(false), 150);
          }
        }, baseDelay);

        baseDelay += 250; // Quicker sequence for snappy feel!
      });

      setPointPops(newPops);

      // Filter out level info activations from cascade list as they're the pre-initialized starting state
      const levelNamePrefix = "Lvl ";
      const modifierActivations = (
        state.lastHandInfo?.activations || []
      ).filter((a) => {
        return !a.name.startsWith(levelNamePrefix);
      });

      // Position the first activation at least 750ms after the last die starts its pop/900ms shake
      let activationDelay = baseDelay + 750;

      modifierActivations.forEach((act, idx) => {
        setTimeout(() => {
          // Highlights active activation in the persistent HUD overlay
          setActiveActivation({ ...act, id: `act-${Date.now()}-${Math.random()}-${idx}` });

          // Satisfying high pitch feedback
          sfx.playScoreTick(1400 + idx * 180);

          setLiveScoringHUD((prev) => {
            let newBase = prev.base;
            let newMult = prev.mult;

            if (act.type === "base") {
              newBase += act.value;
              setPulseBase(true);
              setTimeout(() => setPulseBase(false), 150);
            } else if (act.type === "mult") {
              const isMultiplicative =
                act.name.includes("xMult") ||
                act.name.includes("x0.") ||
                act.name.includes("Protocol") ||
                act.name.includes("Matrix") ||
                act.name.includes("D20") ||
                act.name.includes("Joker");
              if (isMultiplicative) {
                if (act.name.includes("Sniper Scope (x0.5)")) {
                  newMult = newMult * 0.5;
                } else if (act.name.includes("Ascended Die (xMult)")) {
                  newMult = newMult * 1.5;
                } else {
                  newMult = newMult * act.value;
                }
              } else {
                newMult += act.value;
              }

              setPulseMult(true);
              setTimeout(() => setPulseMult(false), 150);
            }

            return { ...prev, base: newBase, mult: newMult };
          });
        }, activationDelay);

        activationDelay += 550; // Stable readable pace for player comprehension
      });

      // Spawn the combo banner precisely 1200ms after all activations have fully settled
      setTimeout(() => {
        sfx.playScoreTick(2500); // Super high pitch for combo banner spawn!

        setComboBanner({
          text: handText,
          base: state.lastHandInfo?.base || 0,
          mult: state.lastHandInfo?.mult || 1,
          total: state.lastHandInfo?.total || increment,
          rarity: isLegendary ? "legendary" : isRare ? "rare" : "common",
          activations: state.lastHandInfo?.activations || [],
        });

        // Hide individual activation HUD text as focus moves to central scoreboard
        setActiveActivation(null);

        // Particle explosion
        const partsInt = isLegendary ? 4 : isRare ? 2 : 1;
        spawnParticles(partsInt);
        if (isLegendary) {
          spawnFire("#eab308");
          setAmbientFlash("gold");
          setTimeout(() => setAmbientFlash("none"), 1200);
        } else if (isRare) {
          spawnFire("#ef4444");
          setAmbientFlash("red");
          setTimeout(() => setAmbientFlash("none"), 1200);
        } else {
          setAmbientFlash("purple");
          setTimeout(() => setAmbientFlash("none"), 900);
        }

        // Screen shake
        if (isRare || isLegendary || increment > 0) {
          const intensity = isLegendary ? 3 : isRare ? 2 : 1;
          setBoardShake({ active: true, intensity });
          setTimeout(() => setBoardShake({ active: false, intensity: 1 }), 500);
        }

        // Tick up the main screen score display!
        let current = prevScore;
        const target = state.currentRoundScore;
        const step = Math.max(1, Math.floor(increment / 12));

        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            clearInterval(interval);
            setDisplayScore(target);

            // If this increment got them past the target score, flash gold!
            if (target >= state.targetScore && prevScore < state.targetScore) {
              sfx.playWin();
              flashControls.start({
                opacity: [0, 1, 0],
                transition: { duration: 0.8 },
              });
            }

            // Let the banner shine before fading, then reset HUD to zero!
            setTimeout(
              () => {
                setIsScoring(false);
                setComboBanner(null);
                setPointPops([]);
                setLiveScoringHUD({
                  text: "",
                  base: 0,
                  mult: 0,
                  isScoring: false,
                });
              },
              3000 + (state.lastHandInfo?.activations.length || 0) * 300,
            );
          } else {
            setDisplayScore(current);
            const ratio = (current - prevScore) / increment;
            sfx.playScoreTick(350 + ratio * 450); // climb pitch
          }
        }, 40);
      }, activationDelay + 1200);
    }
  }, [
    state.currentRoundScore,
    state.lastHandInfo,
    state.targetScore,
    state.dice,
    state.relics,
    flashControls,
  ]);

  const handleRoll = () => {
    sfx.playRoll();
    dispatch({ type: "ROLL" });
  };

  useEffect(() => {
    if (
      state.status === "playing" &&
      lastRolledRoundRef.current !== state.round
    ) {
      lastRolledRoundRef.current = state.round;
      // Do not auto-roll; wait for player to manually press throw/roll
    }
  }, [state.status, state.round]);

  const handleRollComplete = (hand: ReturnType<typeof evaluateHand>) => {
    // Play impact sound based on rarity
    if (hand.total > 150) {
      sfx.playUnstable();
    } else {
      // small clack simulate
      sfx.playLock();
    }
  };

  const handleSubmit = () => {
    if (isScoring) return;
    sfx.playClick();
    setIsScoring(true);

    // Trigger canvas particle explosion if hand is high scoring (>= 50) or is a special poker hand!
    if (
      currentHand.total >= 50 ||
      (currentHand.text !== "Solo Die" && currentHand.text !== "Double")
    ) {
      setExplosionTriggerCount((prev) => prev + 1);
    }

    if (state.currentRoundScore >= state.targetScore) {
      sfx.playWin();
    }

    setTimeout(() => {
      setIsScoring(false);
      dispatch({ type: "SUBMIT_SCORE" });
    }, 600);
  };

  const handleSaveAndQuit = () => {
    sfx.playPowerup();
    dispatch({ type: "SAVE_AND_QUIT" });
  };

  // Live evaluation of current hand
  const currentHand = evaluateHand(
    state.dice,
    state.relics,
    state.rollsLeft,
    state.handLevels,
    state.blind,
    state.bossPhase,
  );

  const handIsLegendary = currentHand.text === "Pentad";

  // Calculate a visual intensity (0-1) based on the maximum corruption of any die
  const maxCorruption =
    state.dice.length > 0
      ? Math.max(...state.dice.map((d) => d.corruption))
      : 0;
  const intensity = Math.min(1, maxCorruption / 100);

  return (
    <div className="flex flex-col h-full w-full bg-g-bg text-g-text font-sans overflow-hidden border-x-[8px] sm:border-x-[16px] border-black/50 relative">
      <motion.div
        animate={flashControls}
        initial={{ opacity: 0 }}
        className="absolute inset-0 bg-g-gold mix-blend-overlay z-50 pointer-events-none"
      />

      <AnimatePresence>
        {showRules && <RulesModal key="rules-modal" onClose={() => setShowRules(false)} />}
      </AnimatePresence>

      {/* Top HUD */}
      <header className="h-auto md:h-24 border-b border-g-border/60 bg-[#07070b]/90 backdrop-blur-md flex flex-row items-center justify-between p-2 md:px-10 gap-2 shadow-2xl relative z-20">
        <div className="flex flex-wrap items-center gap-1.5 md:gap-4 w-auto">
          {/* TOTAL SCORE MONITOR */}
          <div className="bg-zinc-950/70 border border-zinc-800/60 rounded-lg md:rounded-xl px-2 py-1 md:px-5 md:py-2.5 flex flex-col min-w-[50px] md:min-w-[130px] relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-emerald-500/80"></div>
            <span className="text-[6px] md:text-[9.5px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-black text-zinc-500 mb-0.5 md:mb-0.5 leading-none mt-0.5">
              Score
            </span>
            <span className="text-[10px] md:text-xl font-black text-emerald-400 font-mono tracking-tight leading-none drop-shadow-[0_0_8px_rgba(52,211,153,0.25)] pb-0.5">
              {state.totalScore}
            </span>
          </div>

          <div className="bg-zinc-950/70 border border-zinc-800/60 rounded-lg md:rounded-xl px-2 py-1 md:px-5 md:py-2.5 flex flex-col min-w-[60px] md:min-w-[135px] relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-blue-500/80"></div>
            <span className="text-[6px] md:text-[9.5px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-black text-zinc-500 mb-0.5 leading-none mt-0.5">
              Sector / R{state.round || 1}
            </span>
            <span
              className={`text-[9px] md:text-base font-black tracking-wider leading-none uppercase ${
                state.blind === 3
                  ? "text-g-red animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                  : "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.2)]"
              }`}
            >
              {state.blind === 3 ? "BOSS" : `B.${state.blind}`}
            </span>
          </div>

          <div className="bg-zinc-950/70 border border-zinc-800/60 rounded-lg md:rounded-xl px-1.5 py-0.5 md:px-5 md:py-2.5 flex flex-col min-w-[45px] md:min-w-[120px] relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-g-gold/80"></div>
            <span className="text-[6px] md:text-[9.5px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-black text-zinc-500 mb-0.5 leading-none mt-0.5">
              Gold Shards
            </span>
            <span className="text-[10px] md:text-xl font-black text-g-gold font-mono tracking-tight leading-none drop-shadow-[0_0_8px_rgba(212,175,55,0.35)] pb-0.5">
              ${state.gold}
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 text-center hidden md:flex flex-col items-center">
          <motion.h1
            animate={{
              textShadow: [
                "0 0 10px rgba(212,175,55,0.2)",
                "0 0 25px rgba(212,175,55,0.7)",
                "0 0 10px rgba(212,175,55,0.2)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-2xl font-serif font-black tracking-[0.3em] text-g-gold uppercase drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]"
          >
            VOIDFORGE
          </motion.h1>
          <div className="flex justify-center gap-1.5 mt-1 opacity-80">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.1 }}
              className="h-0.5 w-6 bg-g-red"
            ></motion.div>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
              className="h-0.5 w-6 bg-g-gold"
            ></motion.div>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              className="h-0.5 w-6 bg-[#4e3b30]"
            ></motion.div>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
              className="h-0.5 w-6 bg-g-red"
            ></motion.div>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
              className="h-0.5 w-6 bg-g-gold"
            ></motion.div>
          </div>
        </div>

        <div className="text-right flex flex-col items-end gap-0 md:gap-1">
          <div className="flex flex-col items-end">
            <span className="text-[7.5px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-g-muted">
              Target Score
            </span>
            <div className="flex items-center justify-end gap-1.5 md:gap-2">
              <motion.span
                key={`str-${displayScore}`}
                initial={{ scale: 1.25, color: "#fff" }}
                animate={{
                  scale: 1,
                  color:
                    displayScore >= state.targetScore ? "#4ade80" : "#d4af37",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className={`text-[11px] md:text-xl font-mono font-bold drop-shadow-[0_0_12px_rgba(212,175,55,0.2)] inline-block`}
                style={{ originX: 1 }}
              >
                {displayScore}
              </motion.span>
              <span
                className={`text-[11px] md:text-xl font-mono font-bold ${displayScore >= state.targetScore ? "text-[#4ade80]" : "text-g-gold"} drop-shadow-[0_0_12px_rgba(212,175,55,0.2)]`}
              >
                <span className="text-zinc-500 font-sans text-[8px] md:text-xs">
                  /
                </span>{" "}
                {state.targetScore}
              </span>
            </div>
            {/* Glowing Battery Progress Bar */}
            <div className="w-24 md:w-44 h-1 md:h-1.5 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden mt-0.5 relative shadow-inner">
              <motion.div
                className={`h-full rounded-full ${displayScore >= state.targetScore ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-g-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"}`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (displayScore / state.targetScore) * 100)}%`,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
          {state.blind === 3 && (
            <div className="mt-0.5 px-1.5 py-0.5 md:px-2 md:py-1 bg-g-red/20 border border-g-red rounded text-[8px] md:text-[11px] text-g-red uppercase tracking-wide font-bold">
              {state.bossPhase === "the_void"
                ? "Boss: 1s sub pts"
                : state.bossPhase === "the_wall"
                  ? "Boss: Max 2 rolls"
                  : "Boss: No locs"}
            </div>
          )}
          
          {state.activeDirective && (
            <div className={`mt-2 py-1 px-2 md:px-2.5  md:py-1.5 text-right bg-[#050508]/80 backdrop-blur-md rounded-lg shadow-lg flex flex-col items-end gap-0.5 border ${state.activeDirective.completed ? 'border-emerald-500/30' : 'border-blue-500/20'}`}>
              <span className={`text-[6px] md:text-[7.5px] uppercase tracking-[0.2em] font-black ${state.activeDirective.completed ? 'text-emerald-400' : 'text-blue-400'}`}>
                {state.activeDirective.completed ? '✓ DIRETRIZ CONCLUÍDA' : 'DIRETRIZ DE SISTEMA'}
              </span>
              <span className={`text-[8px] md:text-[10px] uppercase font-mono tracking-tight ${state.activeDirective.completed ? 'text-zinc-600 line-through' : 'text-zinc-200'}`}>
                {state.activeDirective.text}
              </span>
              <span className="text-[6.5px] md:text-[8px] uppercase tracking-wider font-bold text-g-gold mt-0.5 opacity-80">
                RECOMPENSA: +{state.activeDirective.rewardValue} {state.activeDirective.rewardType === 'gold' ? 'OURO' : 'FRAGMENTOS'}
              </span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 md:gap-3 mt-1.5 md:mt-2">
            <button
              onMouseEnter={() => sfx.playHover()}
              onClick={() => {
                sfx.playPowerup();
                const enabled = sfx.toggleMusic();
                setMusicOn(enabled);
              }}
              className="flex items-center gap-1.5 text-[8px] md:text-[10px] uppercase tracking-widest text-g-muted hover:text-white transition-colors cursor-pointer"
            >
              {musicOn ? (
                <>
                  <Volume2 className="w-2.5 h-2.5 md:w-3 md:h-3 text-g-gold animate-pulse" />{" "}
                  On
                </>
              ) : (
                <>
                  <VolumeX className="w-2.5 h-2.5 md:w-3 md:h-3 text-g-muted/60" />{" "}
                  Off
                </>
              )}
            </button>
            <span className="text-zinc-700 text-[8px] md:text-[10px] select-none">
              |
            </span>
            <button
              onMouseEnter={() => sfx.playHover()}
              onClick={() => {
                sfx.playClick();
                setShowRules(true);
              }}
              className="flex items-center gap-1 text-[8px] md:text-[10px] uppercase tracking-widest text-g-muted hover:text-white transition-colors cursor-pointer"
            >
              <HelpCircle className="w-2.5 h-2.5 md:w-3 md:h-3" /> Info
            </button>
          </div>
        </div>
      </header>

      {/* Main Play Area */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        <aside
          className={`w-full md:w-64 border-b md:border-b-0 md:border-r border-g-border bg-[#0a0b0e] flex flex-col shrink-0 shadow-2xl transition-all duration-300 md:h-full overflow-hidden ${
            isSidebarOpenMobile
              ? "absolute inset-y-0 left-0 w-72 max-w-[85vw] h-full z-40 border-r shadow-[0_0_50px_rgba(0,0,0,0.9)] !block"
              : "h-0 md:h-full hidden md:flex"
          }`}
        >
          {/* Cybernetic High-Tech Sidebar Tab Bar */}
          <div className="flex border-b border-g-border bg-black/40 shrink-0">
            <button
              onMouseEnter={() => sfx.playHover()}
              onClick={() => {
                sfx.playClick();
                setSidebarTab("talismans");
              }}
              className={`flex-1 py-1.5 md:py-3 text-[9px] md:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 md:gap-1.5 border-b-2 transition-all cursor-pointer ${
                sidebarTab === "talismans"
                  ? "border-g-gold text-white bg-white/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Scroll className="w-3 h-3 md:w-3.5 md:h-3.5 hidden sm:inline" />
              <span>Talismans</span>
            </button>
            <button
              onMouseEnter={() => sfx.playHover()}
              onClick={() => {
                sfx.playClick();
                setSidebarTab("combos");
              }}
              className={`flex-1 py-1.5 md:py-3 text-[9px] md:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 md:gap-1.5 border-b-2 transition-all cursor-pointer ${
                sidebarTab === "combos"
                  ? "border-g-gold text-white bg-white/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Dices className="w-3 h-3 md:w-3.5 md:h-3.5 hidden sm:inline" />
              <span>Combos</span>
            </button>
            <button
              onMouseEnter={() => sfx.playHover()}
              onClick={() => {
                sfx.playClick();
                setSidebarTab("dice");
              }}
              className={`flex-1 py-1.5 md:py-3 text-[9px] md:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 md:gap-1.5 border-b-2 transition-all cursor-pointer ${
                sidebarTab === "dice"
                  ? "border-g-gold text-white bg-white/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Box className="w-3 h-3 md:w-3.5 md:h-3.5 hidden sm:inline" />
              <span>Dice XP</span>
            </button>
            <button
              onMouseEnter={() => sfx.playHover()}
              onClick={() => {
                sfx.playClick();
                setSidebarTab("hacks");
                setActiveHackId(null);
                setHackStep("idle");
              }}
              className={`flex-1 py-1.5 md:py-3 text-[9px] md:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 md:gap-1.5 border-b-2 transition-all cursor-pointer ${
                sidebarTab === "hacks"
                  ? "border-g-gold text-white bg-white/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Cpu className="w-3 h-3 md:w-3.5 md:h-3.5 hidden sm:inline" />
              <span>Hacks</span>
            </button>
          </div>

          <div className="p-2 md:p-5 overflow-x-auto md:overflow-y-auto flex flex-row md:flex-col gap-2 md:gap-3 flex-grow no-scrollbar w-full h-full items-start">
            {sidebarTab === "talismans" ? (
              state.relics.length === 0 ? (
                <div className="flex flex-row md:flex-col items-center justify-center p-3 md:p-6 border border-dashed border-white/10 rounded-xl bg-black/20 text-center gap-2 w-full">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/5 flex items-center justify-center text-g-muted/50 mb-1">
                    <HelpCircle className="w-3 md:w-4 h-3 md:h-4" />
                  </div>
                  <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-[#ffffff30]">
                    No Talismans
                  </span>
                </div>
              ) : (
                state.relics.map((relicId, i) => {
                  const def = RELICS_DB.find((r) => r.id === relicId);
                  if (!def) return null;
                  const Icon = ICON_MAP[def.icon] || Hexagon;

                  const rarityStyle =
                    def.rarity === "legendary"
                      ? "border-yellow-600/40 bg-gradient-to-br from-yellow-950/20 to-black/60 hover:border-yellow-400 text-g-gold shadow-[0_0_15px_rgba(234,179,8,0.12)]"
                      : def.rarity === "epic"
                        ? "border-purple-600/40 bg-gradient-to-br from-purple-950/20 to-black/60 hover:border-purple-400 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.12)]"
                        : def.rarity === "rare"
                          ? "border-blue-600/40 bg-gradient-to-br from-blue-950/20 to-black/60 hover:border-blue-400 text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.12)]"
                          : "border-zinc-800 bg-gradient-to-br from-zinc-900/30 to-black/65 hover:border-zinc-600 text-zinc-300 shadow-md";

                  return (
                    <motion.div
                      key={`${relicId}-${i}`}
                      whileHover={{ y: -3, scale: 1.015 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                      }}
                      className={`flex items-center md:items-start gap-3 p-3 md:p-4 border rounded-xl group relative overflow-hidden transition-all duration-300 shrink-0 w-52 md:w-full ${rarityStyle}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                      <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 flex items-center justify-center bg-black/60 border border-inherit rounded-lg overflow-hidden shadow-inner">
                        <Icon className="w-4.5 h-4.5 md:w-5 md:h-5 drop-shadow-[0_0_6px_currentColor] animate-pulse" />
                      </div>
                      <div className="flex flex-col w-full min-w-0">
                        <div className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider truncate mb-0.5 md:mb-1">
                          {def.name}
                        </div>
                        <div className="text-[8px] md:text-[9px] text-zinc-400 leading-relaxed font-sans line-clamp-1 md:line-clamp-3">
                          {def.description}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )
            ) : sidebarTab === "combos" ? (
              // Combos levels database view
              [
                "Pentad",
                "Quad",
                "Full Chamber",
                "Sequence",
                "Triple",
                "Two Doubles",
                "Double",
                "Solo Die",
              ].map((handName, idx) => {
                const info = state.handLevels[handName];
                if (!info) return null;
                const handIsActive = currentHand.text === handName;
                const activeStyle = handIsActive
                  ? "border-[#4ade80]/60 bg-gradient-to-r from-zinc-900 via-[#14532d]/25 to-black shadow-[0_0_15px_rgba(74,222,128,0.1)]"
                  : "border-zinc-900 bg-[#0d0d11]/80 hover:border-zinc-700 hover:bg-zinc-950/40";

                return (
                  <motion.div
                    key={`str-${handName}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`flex items-center justify-between p-3 border rounded-xl shrink-0 w-44 md:w-full transition-all duration-350 select-none ${activeStyle}`}
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span
                        className={`text-[10px] md:text-xs font-black uppercase tracking-wider truncate transition-colors ${
                          handIsActive ? "text-[#4ade80]" : "text-white"
                        }`}
                      >
                        {handName}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[8px] md:text-[9px] text-zinc-500 font-mono tracking-widest leading-none">
                          LVL {info.level}
                        </span>
                        <span className="w-1 h-3 border-r border-zinc-800" />
                        <span className="text-[8px] text-purple-400 font-mono tracking-widest leading-none">
                          ODDS{" "}
                          {handName === "Solo Die"
                            ? "100%"
                            : handName === "Double"
                              ? "92.8%"
                              : handName === "Two Doubles"
                                ? "46.3%"
                                : handName === "Triple"
                                  ? "30.7%"
                                  : handName === "Sequence"
                                    ? "15.4%"
                                    : handName === "Full Chamber"
                                      ? "12.9%"
                                      : handName === "Quad"
                                        ? "1.9%"
                                        : "0.1%"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-mono text-[10px] md:text-xs font-bold leading-none bg-zinc-950/80 px-2 py-1.5 rounded-lg border border-zinc-800">
                      <span className="text-blue-400">{info.basePoints}</span>
                      <span className="text-zinc-600 font-sans text-[8px]">
                        ×
                      </span>
                      <span className="text-g-red">{info.baseMult}</span>
                    </div>
                  </motion.div>
                );
              })
            ) : sidebarTab === "dice" ? (
              // Dice levels database view
              state.dice.map((d, idx) => {
                const isAscended = d.ascended;
                const xpRatio = isAscended ? 100 : d.xp || 0;

                return (
                  <motion.div
                    key={`${d.id}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`flex flex-col p-3 border rounded-xl shrink-0 w-44 md:w-full transition-all duration-350 select-none relative overflow-hidden ${
                      isAscended
                        ? "border-cyan-500/50 bg-[#0d2230]/80 shadow-[0_0_15px_rgba(0,255,255,0.15)]"
                        : "border-zinc-900 bg-[#0d0d11]/80"
                    }`}
                  >
                    {isAscended && (
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors ${isAscended ? "text-cyan-400" : "text-zinc-400"}`}
                      >
                        Die Beta-{idx + 1}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono tracking-widest leading-none">
                        {isAscended ? "ASCENDED" : `XP ${xpRatio}/100`}
                      </span>
                    </div>
                    {/* XP Progress Bar */}
                    <div className="w-full h-1 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden relative shadow-inner">
                      <motion.div
                        className={`h-full rounded-full ${isAscended ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]" : "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"}`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.max(0, Math.min(100, xpRatio))}%`,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              /* Hacks tab content displaying active downloads desk */
              <div className="flex flex-col gap-3.5 w-full text-white font-sans shrink-0 md:shrink">
                <div className="text-[10px] text-g-gold uppercase tracking-widest font-serif border-b border-g-border/30 pb-2 flex justify-between items-center font-bold">
                  <span>Mesa Rúnica de Alquimia</span>
                  <span className="w-2 h-2 rounded-full bg-g-gold animate-ping"></span>
                </div>

                {!state.consumables || state.consumables.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-g-border/60 rounded-xl bg-black/10">
                    <p className="text-g-muted text-[10px] font-serif uppercase tracking-wider mb-2">
                      Nenhum Feitiço Listado
                    </p>
                    <p className="text-[9px] text-g-muted leading-relaxed px-4 font-serif">
                      Adquira pergaminhos arcanos e runas do Bazar Alquímico
                      para transmutar e manipular as faces dos dados!
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {/* Active Hack Execution States */}
                    {activeHackId && (
                      <div className="p-3 bg-amber-950/20 border border-g-gold/20 rounded-xl text-xs flex flex-col gap-2.5">
                        <div className="flex items-center gap-2 text-g-gold font-extrabold font-serif uppercase tracking-wider text-[10px]">
                          <Wand2 className="w-3.5 h-3.5 animate-pulse" />{" "}
                          {activeHackId === "hack_rewrite.exe"
                            ? "PERGAMINHO DE TRANSMUTAÇÃO"
                            : activeHackId === "clone_val.bak"
                              ? "RUNA DE REPLICAÇÃO"
                              : "POÇÃO DE SOBRECARGA"}
                        </div>

                        {/* STEP TEXTS */}
                        {hackStep === "select_die" && (
                          <p className="text-g-text/90 font-serif text-[10px]">
                            Escolha um dado abaixo para fundir e alterar sua
                            face:
                          </p>
                        )}
                        {hackStep === "select_value" && (
                          <p className="text-g-text/90 font-serif text-[10px]">
                            Defina o valor da nova face para o dado{" "}
                            {state.dice.findIndex(
                              (d) => d.id === hackTargetDie,
                            ) + 1}
                            :
                          </p>
                        )}
                        {hackStep === "select_source" && (
                          <p className="text-g-text/90 font-serif text-[10px]">
                            Selecione o dado de ORIGEM para extrair o valor:
                          </p>
                        )}
                        {hackStep === "select_target" && (
                          <p className="text-g-text/90 font-serif text-[10px]">
                            Selecione um dado adjacente de DESTINO para fundir e
                            copiar o valor:
                          </p>
                        )}
                        {hackStep === "select_hand" && (
                          <p className="text-g-text/90 font-serif text-[10px]">
                            Selecione qual combinação rúnica deseja
                            sobrecarregar (+1 LVL):
                          </p>
                        )}

                        {/* SELECT VALUE ROW */}
                        {hackStep === "select_value" && (
                          <div className="grid grid-cols-6 gap-1 mt-1">
                            {[1, 2, 3, 4, 5, 6].map((v) => (
                              <button
                                key={`num-${v}`}
                                onClick={() => {
                                  if (hackTargetDie) {
                                    dispatch({
                                      type: "USE_CONSUMABLE",
                                      id: "hack_rewrite.exe",
                                      targetDieId: hackTargetDie,
                                      chosenValue: v,
                                    });
                                    sfx.playPowerup();
                                    setActiveHackId(null);
                                    setHackStep("idle");
                                    setHackTargetDie(null);
                                  }
                                }}
                                className="py-1 bg-blue-500 text-black font-extrabold font-mono text-center rounded hover:bg-white transition-colors cursor-pointer text-xs"
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* SELECT HAND ROW */}
                        {hackStep === "select_hand" && (
                          <div className="flex flex-col gap-1 max-h-32 overflow-y-auto no-scrollbar">
                            {Object.keys(state.handLevels).map((hName) => (
                              <button
                                key={hName}
                                onClick={() => {
                                  dispatch({
                                    type: "USE_CONSUMABLE",
                                    id: "overclock.sys",
                                    targetDieId: hName,
                                  });
                                  sfx.playPowerup();
                                  setActiveHackId(null);
                                  setHackStep("idle");
                                }}
                                className="py-1 text-[9px] text-zinc-300 font-extrabold uppercase bg-zinc-950 border border-zinc-800 rounded hover:border-zinc-400 hover:text-white transition-colors text-left px-2 cursor-pointer"
                              >
                                {hName} (LVL {state.handLevels[hName].level})
                              </button>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => {
                            setActiveHackId(null);
                            setHackStep("idle");
                            setHackTargetDie(null);
                            setHackSourceDie(null);
                          }}
                          className="w-full mt-1.5 py-1 text-center font-bold text-[8px] uppercase border border-red-900 bg-red-950/25 text-[#ef4444] rounded hover:bg-[#ef4444] hover:text-black transition-colors cursor-pointer"
                        >
                          Cancel Operations
                        </button>
                      </div>
                    )}

                    {/* REWRITE.EXE / CLONE.BAK list of hacks remaining */}
                    {state.consumables.map((id, index) => {
                      const name =
                        id === "hack_rewrite.exe"
                          ? "PERGAMINHO DE TRANSMUTAÇÃO"
                          : id === "clone_val.bak"
                            ? "RUNA DE REPLICAÇÃO"
                            : "POÇÃO DE SOBRECARGA";
                      const color =
                        id === "hack_rewrite.exe"
                          ? "text-amber-300 border-g-gold/50 bg-amber-950/20 hover:border-g-gold/80 text-left"
                          : id === "clone_val.bak"
                            ? "text-emerald-400 border-emerald-900 bg-emerald-950/25 hover:border-emerald-500 text-left"
                            : "text-rose-400 border-g-red/50 bg-red-950/20 hover:border-g-red text-left";
                      const IconComponent =
                        id === "hack_rewrite.exe"
                          ? Scroll
                          : id === "clone_val.bak"
                            ? Wand2
                            : Flame;

                      return (
                        <div
                          key={index}
                          className={`p-2.5 border rounded-xl flex items-center justify-between gap-2.5 text-left transition-all ${color}`}
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 shrink-0 animate-pulse" />
                            <span className="font-extrabold text-[9px] md:text-[10px] uppercase tracking-wider font-serif">
                              {name}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              sfx.playClick();
                              setActiveHackId(id);
                              if (id === "hack_rewrite.exe") {
                                setHackStep("select_die");
                              } else if (id === "clone_val.bak") {
                                setHackStep("select_source");
                              } else if (id === "overclock.sys") {
                                setHackStep("select_hand");
                              }
                            }}
                            className="px-2.5 py-1 bg-black/60 border border-inherit text-[8px] rounded font-serif font-black uppercase hover:bg-g-gold hover:text-black transition-colors cursor-pointer shrink-0"
                          >
                            USAR
                          </button>
                        </div>
                      );
                    })}

                    {/* DICE INTERFACE SELECTOR row for cell clicks fallback */}
                    {(hackStep === "select_die" ||
                      hackStep === "select_source" ||
                      hackStep === "select_target") && (
                      <div className="flex flex-col gap-1.5 mt-1 bg-black/40 p-2.5 border border-zinc-850 rounded-xl">
                        <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest block mb-0.5">
                          {hackStep === "select_source"
                            ? "SELECT SOURCE CELL:"
                            : hackStep === "select_target"
                              ? "SELECT TARGET CELL:"
                              : "SELECT DIE CELL:"}
                        </span>
                        <div className="grid grid-cols-5 gap-1">
                          {state.dice.map((d, index) => {
                            const isSelected =
                              d.id === hackTargetDie || d.id === hackSourceDie;
                            return (
                              <button
                                key={`${d.id}`}
                                disabled={d.destroyed}
                                onClick={() => {
                                  sfx.playClick();
                                  if (hackStep === "select_die") {
                                    setHackTargetDie(d.id);
                                    setHackStep("select_value");
                                  } else if (hackStep === "select_source") {
                                    setHackSourceDie(d.id);
                                    setHackStep("select_target");
                                  } else if (hackStep === "select_target") {
                                    if (hackSourceDie) {
                                      dispatch({
                                        type: "USE_CONSUMABLE",
                                        id: "clone_val.bak",
                                        targetDieId: hackSourceDie,
                                        targetDieId2: d.id,
                                      });
                                      sfx.playPowerup();
                                      setActiveHackId(null);
                                      setHackStep("idle");
                                      setHackSourceDie(null);
                                    }
                                  }
                                }}
                                className={`py-1 rounded border font-mono font-black text-center text-[10px] transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-blue-500 border-white text-black animate-pulse"
                                    : "bg-zinc-950 border-zinc-800 text-zinc-450 hover:border-zinc-500 hover:text-white"
                                }`}
                              >
                                {d.destroyed ? "✖" : d.value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        <motion.section
          animate={
            boardShake.active
              ? {
                  x: [
                    -6 * boardShake.intensity,
                    6 * boardShake.intensity,
                    -6 * boardShake.intensity,
                    6 * boardShake.intensity,
                    -3 * boardShake.intensity,
                    3 * boardShake.intensity,
                    0,
                  ],
                  y: [
                    -4 * boardShake.intensity,
                    4 * boardShake.intensity,
                    -4 * boardShake.intensity,
                    4 * boardShake.intensity,
                    -2 * boardShake.intensity,
                    2 * boardShake.intensity,
                    0,
                  ],
                  transition: { duration: 0.4 },
                }
              : {}
          }
          className="flex-1 relative flex flex-col items-center justify-start md:justify-center overflow-hidden p-0 transition-colors duration-1000 shadow-[inset_0_0_100px_rgba(0,0,0,1)]"
          style={{
            background: `radial-gradient(circle, rgb(${12 + intensity * 80}, ${55 - intensity * 35}, ${30 - intensity * 15}) 0%, rgb(${4 + intensity * 20}, ${12 - intensity * 6}, ${8 - intensity * 4}) 100%)`,
            perspective: "1000px",
          }}
        >
          {/* Backdrop layer to click and close Mobile Console Drawer */}
          {isSidebarOpenMobile && (
            <div
              onClick={() => setIsSidebarOpenMobile(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-[3px] z-35 md:hidden cursor-pointer"
            />
          )}

          {/* FLOATING CYBER-DECK TOGGLE BUTTON */}
          <button
            onClick={() => {
              sfx.playClick();
              setIsSidebarOpenMobile(!isSidebarOpenMobile);
            }}
            className="absolute left-3.5 top-3.5 z-45 md:hidden bg-[#120a06]/95 border border-g-gold/45 hover:border-g-gold text-g-gold px-3.5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-serif font-black uppercase text-[10px] tracking-wider shadow-[0_4px_25px_rgba(0,0,0,0.85)] active:scale-95 cursor-pointer"
          >
            <Scroll className="w-4 h-4 text-g-gold animate-bounce" />
            <span>
              {isSidebarOpenMobile
                ? "Fechar Painel"
                : "Alquimia (Feitiços/Mão)"}
            </span>
          </button>
          {/* Table texture overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] mix-blend-overlay pointer-events-none"></div>

          {/* Ancient golden grid overlay */}
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.025)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0 opacity-50 origin-bottom"
            style={{
              transform:
                "perspective(1000px) rotateX(60deg) scale(2) translateY(-20%)",
            }}
          ></div>
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-0"></div>

          <AmbientDust />

          {/* Ambient Glow Flash Overlay */}
          <AnimatePresence>
            {ambientFlash !== "none" && (
              <motion.div
                key="ambient-flash"
                initial={{ opacity: 0.75 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    ambientFlash === "gold"
                      ? "radial-gradient(circle at center, rgba(212,175,55,0.45) 0%, rgba(212,175,55,0.05) 50%, rgba(0,0,0,0) 90%)"
                      : ambientFlash === "red"
                        ? "radial-gradient(circle at center, rgba(255,62,62,0.45) 0%, rgba(255,62,62,0.05) 50%, rgba(0,0,0,0) 90%)"
                        : "radial-gradient(circle at center, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0.05) 50%, rgba(0,0,0,0) 90%)",
                  mixBlendMode: "screen",
                }}
              />
            )}
          </AnimatePresence>

          {/* 3D Table Plane */}
          <div
            className="absolute inset-0"
            style={{
              transform: "rotateX(10deg) scale(1.1)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute -inset-22 border-[24px] border-[#0c0d12]/95 rounded-[120px] shadow-[inset_0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(6,182,212,0.18)] pointer-events-none"></div>
          </div>

          {/* Floating Stars Particle System */}
          {particles.map((p) => (
            <motion.div
              key={`${p.id}`}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={{
                x: p.vx,
                y: p.vy,
                opacity: 0,
                scale: 0.2,
                rotate: p.rotation + p.vRotation,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute z-40 pointer-events-none rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 10px ${p.color}`,
                left: "50%",
                top: "55%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {fireParticles.map((fp) => (
            <motion.div
              key={`${fp.id}`}
              initial={{ x: fp.x, y: 100, opacity: 0, scale: 0 }}
              animate={{
                y: [-50, -250],
                opacity: [0, 0.8, 0],
                scale: [fp.scale, fp.scale * 1.5, 0],
                rotate: [0, (Math.random() - 0.5) * 180],
              }}
              transition={{ duration: 1.5, delay: fp.delay, ease: "easeOut" }}
              className="absolute z-30 pointer-events-none mix-blend-screen"
              style={{
                width: 60,
                height: 60,
                background: `radial-gradient(circle, ${fp.color} 0%, transparent 70%)`,
                left: "50%",
                bottom: "10%",
                marginLeft: -30,
              }}
            />
          ))}

          {/* Persistent Interactive Combo Multiplier and Real-time Scoring HUD Overlay */}
          <AnimatePresence>
            {isScoring && (
              <motion.div
                key="scoring-hud"
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="absolute top-2 md:top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center select-none w-[95%] max-w-sm md:max-w-md px-1 md:px-4 scale-75 md:scale-100 origin-top"
              >
                {(() => {
                  const currentBase = liveScoringHUD.base;
                  const currentMult = liveScoringHUD.mult;
                  const currentText =
                    liveScoringHUD.text || "Calculando Rito...";
                  const currentTotal = Math.round(
                    liveScoringHUD.base * liveScoringHUD.mult,
                  );

                  const isRare = ["Quad", "Full Chamber", "Sequence"].includes(
                    currentText,
                  );
                  const isLegendary = ["Pentad"].includes(currentText);
                  const rarityLabel = isLegendary
                    ? "Lendário"
                    : isRare
                      ? "Raro"
                      : "Comum";

                  return (
                    <div className="flex flex-col items-center gap-0 w-full rounded-2xl">
                      <div className="relative overflow-visible rounded-3xl border border-white/5 shadow-2xl bg-black/40 backdrop-blur-3xl px-8 py-4 transition-all duration-300">
                        {/* Glow backlights */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-red-500/5 mix-blend-screen pointer-events-none rounded-3xl" />

                        <div className="flex flex-col items-center gap-1 min-w-[280px]">
                          {/* Top Row: Rito Title & Activations */}
                          <div className="flex items-center gap-2 mb-2 justify-center min-h-[32px]">
                            <AnimatePresence mode="wait">
                              {activeActivation ? (
                                <motion.span
                                  key={activeActivation.id || `act-${activeActivation.name}`}
                                  initial={{ scale: 0.5, opacity: 0, y: 10 }}
                                  animate={{ scale: 1, opacity: 1, y: 0 }}
                                  exit={{ scale: 0.5, opacity: 0, y: -10 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 20,
                                  }}
                                  className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md flex items-center gap-1 ${
                                    activeActivation.type === "mult"
                                      ? "bg-red-500/20 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)] text-red-50"
                                      : "bg-blue-500/20 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.4)] text-blue-50"
                                  }`}
                                >
                                  {activeActivation.name}{" "}
                                  <span
                                    className={
                                      activeActivation.type === "mult"
                                        ? "text-red-400 font-mono tracking-tighter"
                                        : "text-blue-400 font-mono tracking-tighter"
                                    }
                                  >
                                    {activeActivation.type === "mult"
                                      ? `×${activeActivation.value}`
                                      : `+${activeActivation.value}`}
                                  </span>
                                </motion.span>
                              ) : (
                                <motion.span
                                  key={`str-${currentText}`}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`text-sm md:text-base font-black tracking-[0.2em] uppercase font-mono ${
                                    isLegendary
                                      ? "text-g-gold drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]"
                                      : isRare
                                        ? "text-g-red drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                                        : "text-white/80"
                                  }`}
                                >
                                  {currentText}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Middle Row: Base x Mult */}
                          <div className="flex items-center justify-center gap-6 py-2 w-full">
                            {/* Base Score */}
                            <motion.div
                              animate={{
                                scale: pulseBase ? 1.5 : 1,
                                y: pulseBase ? -10 : 0,
                                rotateZ: pulseBase ? -3 : 0,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 10,
                              }}
                              className="flex-1 flex justify-end relative"
                            >
                              <span
                                className={`font-mono text-5xl md:text-6xl font-black tabular-nums tracking-tighter transition-colors ${pulseBase ? "text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.9)]" : "text-blue-200"}`}
                              >
                                {currentBase}
                              </span>
                            </motion.div>

                            <div className="text-white/30 font-black text-2xl font-mono -mt-2 animate-pulse">
                              ×
                            </div>

                            {/* Multiplier */}
                            <motion.div
                              animate={{
                                scale: pulseMult ? 1.5 : 1,
                                y: pulseMult ? -10 : 0,
                                rotateZ: pulseMult ? 4 : 0,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 10,
                              }}
                              className="flex-1 flex justify-start relative"
                            >
                              <span
                                className={`font-mono text-5xl md:text-6xl font-black tabular-nums tracking-tighter transition-colors inline-block ${pulseMult ? "text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,1)]" : "text-red-400"}`}
                              >
                                {currentMult}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Total Score Impact Text */}
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", damping: 12 }}
                        className="flex items-center justify-center z-10 pointer-events-none"
                      >
                        <div className="bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border border-g-gold/50 shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex items-end gap-1">
                          <span className="text-3xl md:text-4xl font-mono font-black tabular-nums text-g-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] leading-none">
                            +{currentTotal}
                          </span>
                          <span className="text-xs text-g-gold/80 font-black mb-1">
                            PTS
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-center z-10 w-full flex-1 justify-center relative">
            <DiceManager
              onRollComplete={handleRollComplete}
              pointPops={pointPops}
              triggerExplosionCount={explosionTriggerCount}
            />

            {/* Glowing manual start/throw overlay */}
            {state.status === "playing" && state.lastHandInfo === null && (
              <div
                id="initial-throw-overlay"
                className="absolute inset-0 bg-black/60 backdrop-blur-[6px] flex items-center justify-center z-30 rounded-xl"
              >
                <motion.button
                  key="initial-throw-btn"
                  onMouseEnter={() => sfx.playHover()}
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: [0.96, 1.04, 0.96], opacity: 1 }}
                  transition={{
                    scale: {
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "easeInOut",
                    },
                    opacity: { duration: 0.3 },
                  }}
                  onClick={handleRoll}
                  className="px-6 py-4 md:px-8 md:py-5 bg-white text-black font-black text-base md:text-xl rounded-xl md:rounded-2xl uppercase tracking-widest shadow-[0_0_50px_rgba(255,255,255,0.45)] hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-1 cursor-pointer pointer-events-auto border-2 border-white"
                >
                  <span className="text-[10px] md:text-xs font-bold text-zinc-500 font-mono tracking-widest">
                    RODADA {state.round}
                  </span>
                  <span className="flex items-center gap-2">
                    ARREMESSAR DADOS 🎲
                  </span>
                </motion.button>
              </div>
            )}

            {state.round === 1 && state.lastHandInfo !== null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-g-muted text-xs font-mono uppercase tracking-widest mt-8"
              >
                Click dice to Lock / Unlock before rolling.
              </motion.p>
            )}
          </div>

          {/* Overlay Border Effects */}
          <div className="absolute inset-0 pointer-events-none border-[12px] border-g-red/5 mix-blend-overlay"></div>
        </motion.section>
      </main>

      {/* Footer Actions */}
      <footer className="h-auto min-h-[72px] md:min-h-[140px] border-t border-g-border bg-gradient-to-b from-[#0a0a0f] to-[#040407] flex items-center justify-center gap-2 md:gap-8 p-2 md:p-6 shadow-[0_-15px_40px_rgba(0,0,0,0.6)] relative z-20 overflow-hidden shrink-0">
        {/* Subtle grid pattern for modern touch */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-cyan-500/50 via-g-gold/50 to-g-red/50 opacity-80" />

        <button
          onMouseEnter={() => sfx.playHover()}
          onClick={handleRoll}
          disabled={
            state.rollsLeft <= 0 || state.status === "rolling" || isScoring
          }
          className="h-10 sm:h-16 md:h-18 px-4 sm:px-10 md:px-18 bg-gradient-to-r from-white to-zinc-100 text-black rounded-lg md:rounded-2xl font-black text-xs sm:text-lg md:text-xl uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-95 transition-all group flex items-center gap-2 md:gap-4 disabled:opacity-30 disabled:hover:scale-100 cursor-pointer border-t border-white"
        >
          <span>ROLL DICE</span>
          <span className="w-5 h-5 sm:w-8 sm:h-8 bg-black/10 rounded-lg flex items-center justify-center font-mono text-[10px] sm:text-sm border border-black/10">
            {state.rollsLeft}
          </span>
        </button>

        <button
          onMouseEnter={() => sfx.playHover()}
          onClick={handleSaveAndQuit}
          disabled={state.status === "rolling" || isScoring}
          className="h-10 sm:h-14 md:h-16 px-3 sm:px-7 md:px-10 border border-zinc-700/50 hover:border-amber-400 bg-zinc-950/60 text-zinc-400 hover:text-amber-400 rounded-lg sm:rounded-xl font-serif font-black uppercase tracking-widest text-[9px] sm:text-xs md:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-30"
        >
          <span>SALVAR E SAIR 💾</span>
        </button>

        <button
          onMouseEnter={() => sfx.playHover()}
          onClick={handleSubmit}
          disabled={
            state.status === "rolling" ||
            isScoring ||
            (state.currentRoundScore < state.targetScore && state.rollsLeft > 0)
          }
          className={`h-10 sm:h-14 md:h-16 px-3 sm:px-7 md:px-12 border rounded-lg sm:rounded-xl font-black uppercase tracking-widest text-[9px] sm:text-xs md:text-sm shadow-xl transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 ${
            state.currentRoundScore >= state.targetScore
              ? "bg-gradient-to-r from-g-gold to-yellow-500 text-black border-g-gold hover:from-white hover:to-zinc-100 hover:border-white shadow-[0_0_35px_rgba(234,179,8,0.45)] animate-pulse hover:scale-105"
              : state.rollsLeft <= 0
                ? "bg-g-red/20 border-g-red/60 text-g-red hover:bg-g-red hover:text-white shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:scale-105"
                : "bg-black/40 border-white/10 text-zinc-600 cursor-not-allowed font-medium"
          }`}
        >
          {state.currentRoundScore >= state.targetScore
            ? "CLAIM VICTORY"
            : state.rollsLeft <= 0
              ? "SUBMIT RESULTS"
              : "REACH THE GOAL"}
        </button>
      </footer>
    </div>
  );
}

const DiceComponent: React.FC<any> = () => {
  return null;
};

/*
const DiceComponentDeprecated: React.FC<any> = () => {
  useEffect(() => {
    if (state.status === "rolling" && !dice.locked) {
      // Sync strictly to physical rotation & elevation
      rotRef.current.x = targetScatter.rx;
      rotRef.current.y = targetScatter.ry;
      rotRef.current.z = targetScatter.rz;

      controls.set({
        z: targetScatter.z,
        rotateX: targetScatter.rx,
        rotateY: targetScatter.ry,
        rotateZ: targetScatter.rz,
        scale: 1.0 + targetScatter.z / 800, // Grows dynamically based on Z height (pseudo perspective via scale too, or just rely on actual Z)
      });
    } else if (state.status === "playing") {
      const target = rotationMap[dice.value] || { rotateX: 0, rotateY: 0 };

      if (dice.locked) {
        controls.set({
          rotateX: target.rotateX,
          rotateY: target.rotateY,
          rotateZ: 0,
          z: 0,
          scale: 0.85,
        });
        rotRef.current = { x: target.rotateX, y: target.rotateY, z: 0 };
      } else {
        // Snap to target modulo 360 to continue seamlessly
        const remX = ((rotRef.current.x % 360) + 360) % 360;
        const remY = ((rotRef.current.y % 360) + 360) % 360;
        const remZ = ((rotRef.current.z % 360) + 360) % 360;

        const baseX = rotRef.current.x - remX;
        const baseY = rotRef.current.y - remY;
        const baseZ = rotRef.current.z - remZ;

        let finalX = baseX + target.rotateX;
        let finalY = baseY + target.rotateY;
        let finalZ = baseZ + 0;

        if (finalX - rotRef.current.x > 180) finalX -= 360;
        if (finalX - rotRef.current.x < -180) finalX += 360;

        if (finalY - rotRef.current.y > 180) finalY -= 360;
        if (finalY - rotRef.current.y < -180) finalY += 360;

        if (finalZ - rotRef.current.z > 180) finalZ -= 360;
        if (finalZ - rotRef.current.z < -180) finalZ += 360;

        rotRef.current.x = finalX;
        rotRef.current.y = finalY;
        rotRef.current.z = finalZ;

        controls.start({
          rotateX: finalX,
          rotateY: finalY,
          rotateZ: finalZ,
          z: 0,
          scale: 0.85,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        });
      }
    }
  }, [state.status, dice.locked, dice.value, controls, targetScatter]);

  return "motion.div";
        initial={false}
        animate={
          state.status === "rolling" && !dice.locked
            ? {
                scale: [1, 0.3, 1, 0.6, 1, 0.8, 1, 0.9, 1],
                opacity: [0.8, 0.1, 0.8, 0.4, 0.8, 0.6, 0.8, 0.7, 0.8],
              }
            : { scale: 1, opacity: 0.8 }
        }
        transition={{
          duration: 1.6,
          times: [0, 0.2, 0.45, 0.65, 0.8, 0.9, 0.95, 0.98, 1],
          ease: [
            "easeOut",
            "easeIn",
            "easeOut",
            "easeIn",
            "easeOut",
            "easeIn",
            "easeOut",
            "easeIn",
          ],
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-6 sm:h-8 bg-black blur-[12px] rounded-[100%] z-0"
      />

      <motion.div
        layout
        animate={controls}
        onClick={() => {
          if (state.status !== "rolling") {
            sfx.playLock();
            dispatch({ type: "TOGGLE_LOCK", id: dice.id });
          }
        }}
        whileHover={
          dice.locked || state.status === "rolling"
            ? {}
            : { scale: 1.05, y: -10 }
        }
        whileTap={
          dice.locked || state.status === "rolling" ? {} : { scale: 0.95, y: 0 }
        }
        className={`dice-cube cursor-pointer transition-shadow z-10 ${isUnstable ? "animate-pulse shadow-[0_0_40px_rgba(255,62,62,0.4)] rounded-2xl" : ""}`}
      >
        {[1, 2, 3, 4, 5, 6].map((val) => (
          <div
            key={`num-${val}`}
            style={{
              boxShadow: dice.locked
                ? lockedShadows
                : corruptRatio > 0
                  ? corruptShadows
                  : baseShadows,
            }}
            className={`dice-face face-${val} text-5xl sm:text-6xl font-black font-mono ${faceClasses}`}
          >
            <span
              className={`flex flex-col items-center justify-center bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,1)] ${dice.locked ? "bg-g-gold" : "bg-gradient-to-b from-white to-gray-400"}`}
            >
              {val}
              {val === 6 && (
                <div
                  className="w-8 h-[4px] bg-current rounded-full mt-[-8px] opacity-70"
                  style={{ color: dice.locked ? "#d4af37" : "#e0e0e0" }}
                />
              )}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};
*/
