import {mkdir, writeFile} from "node:fs/promises";

const sampleRate = 48000;
const duration = 25;
const samples = sampleRate * duration;
const data = Buffer.alloc(samples * 2);

for (let i = 0; i < samples; i++) {
  const t = i / sampleRate;
  const beat = t % 0.75;
  const pulse = Math.exp(-beat * 7) * Math.sin(2 * Math.PI * 110 * t);
  const pad = Math.sin(2 * Math.PI * 146.83 * t) * 0.16 + Math.sin(2 * Math.PI * 220 * t) * 0.08;
  const shimmer = Math.sin(2 * Math.PI * 440 * t) * Math.max(0, Math.sin(Math.PI * t / duration)) * 0.025;
  const fade = Math.min(1, t / 1.2, (duration - t) / 1.6);
  const value = Math.max(-1, Math.min(1, (pulse * 0.18 + pad + shimmer) * fade));
  data.writeInt16LE(Math.round(value * 32767), i * 2);
}

const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + data.length, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(sampleRate, 24);
header.writeUInt32LE(sampleRate * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(data.length, 40);

await mkdir("campaigns/intro/working/audio", {recursive: true});
await writeFile("campaigns/intro/working/audio/original-warm-pulse-v01.wav", Buffer.concat([header, data]));
