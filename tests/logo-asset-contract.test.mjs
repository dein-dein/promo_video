import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFile} from "node:fs/promises";
import test from "node:test";
import {PNG} from "pngjs";

const officialPath = "dein-new-logo.png";
const archivePath = "assets/archive/dein-new-logo-opaque-original.png";
const originalChecksum =
  "3bc9252de76daa6bc0f2aa600f2e1f10ead350a979c1d4fa438e46ba521c863f";

const checksum = (buffer) => createHash("sha256").update(buffer).digest("hex");
const pixel = (png, x, y) => {
  const offset = (png.width * y + x) << 2;
  return Array.from(png.data.subarray(offset, offset + 4));
};

test("opaque original logo is archived byte-identically", async () => {
  const archived = await readFile(archivePath);

  assert.equal(checksum(archived), originalChecksum);
});

test("official logo is a transparent 1254 square with opaque mark and soft shadow", async () => {
  const logo = PNG.sync.read(await readFile(officialPath));

  assert.equal(logo.width, 1254);
  assert.equal(logo.height, 1254);
  assert.equal(logo.alpha, true);

  for (const [x, y] of [
    [0, 0],
    [1253, 0],
    [0, 1253],
    [1253, 1253],
  ]) {
    assert.equal(pixel(logo, x, y)[3], 0);
  }

  assert.equal(pixel(logo, 627, 627)[3], 255);
  assert.ok(
    logo.data.some((value, index) => index % 4 === 3 && value > 0 && value < 255),
  );
});
