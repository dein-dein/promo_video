#!/usr/bin/env python3

from collections import deque
from pathlib import Path
import shutil

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OFFICIAL = ROOT / "dein-new-logo.png"
ARCHIVE = ROOT / "assets/archive/dein-new-logo-opaque-original.png"

FLOOD_DISTANCE = 190
TRANSPARENT_DISTANCE = 3
OPAQUE_DISTANCE = 180
SHADOW_COLOR = (30, 23, 55)


def smoothstep(value: float) -> float:
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def main() -> None:
    ARCHIVE.parent.mkdir(parents=True, exist_ok=True)
    if not ARCHIVE.exists():
        shutil.copyfile(OFFICIAL, ARCHIVE)

    image = Image.open(ARCHIVE).convert("RGB")
    width, height = image.size
    pixels = image.load()
    corners = [
        pixels[0, 0],
        pixels[width - 1, 0],
        pixels[0, height - 1],
        pixels[width - 1, height - 1],
    ]
    background = tuple(round(sum(color[channel] for color in corners) / 4) for channel in range(3))

    connected = bytearray(width * height)
    queue = deque()

    def distance(color: tuple[int, int, int]) -> int:
        return max(abs(color[channel] - background[channel]) for channel in range(3))

    def enqueue(x: int, y: int) -> None:
        index = y * width + x
        if connected[index] or distance(pixels[x, y]) > FLOOD_DISTANCE:
            return
        connected[index] = 1
        queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        if x > 0:
            enqueue(x - 1, y)
        if x + 1 < width:
            enqueue(x + 1, y)
        if y > 0:
            enqueue(x, y - 1)
        if y + 1 < height:
            enqueue(x, y + 1)

    output = Image.new("RGBA", image.size)
    output_pixels = output.load()

    for y in range(height):
        for x in range(width):
            color = pixels[x, y]
            if not connected[y * width + x]:
                output_pixels[x, y] = (*color, 255)
                continue

            delta = distance(color)
            alpha_progress = smoothstep(
                (delta - TRANSPARENT_DISTANCE)
                / (OPAQUE_DISTANCE - TRANSPARENT_DISTANCE)
            )
            alpha = round(alpha_progress * 255)
            if alpha == 0:
                output_pixels[x, y] = (0, 0, 0, 0)
                continue

            output_pixels[x, y] = (*SHADOW_COLOR, alpha)

    output.save(OFFICIAL, format="PNG", optimize=True)


if __name__ == "__main__":
    main()
