export default function HeightWidthRatio(h: number, w: number): number {
  if (h === 0 || w === 0) return 0;
  return h / w;
}
