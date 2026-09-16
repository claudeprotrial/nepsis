import path from 'node:path';
import sharp from 'sharp';

export type Dimensiuni = { w: number; h: number };

const cache = new Map<string, Dimensiuni | null>();

/**
 * Lățimea și înălțimea unei imagini din public/, citite la build. Cu ele fiecare
 * fotografie își rezervă locul exact înainte să se încarce, fără salt de layout,
 * și se poate afișa la proporțiile ei reale, netăiată.
 *
 * Întoarce null dacă fișierul lipsește: o cale greșită scrisă de un editor nu
 * trebuie să oprească tot build-ul, doar să apară ca avertisment.
 */
export async function dimensiuni(src: string): Promise<Dimensiuni | null> {
  if (cache.has(src)) return cache.get(src)!;
  let rezultat: Dimensiuni | null = null;
  try {
    const m = await sharp(path.resolve('public', src.replace(/^\/+/, ''))).metadata();
    if (m.width && m.height) {
      // Orientările EXIF 5–8 înseamnă rotire cu 90°: browserul o afișează cu laturile inversate.
      const rotita = (m.orientation ?? 1) >= 5;
      rezultat = rotita ? { w: m.height, h: m.width } : { w: m.width, h: m.height };
    }
  } catch {
    console.warn(`[imagini] nu pot citi public${src}`);
  }
  cache.set(src, rezultat);
  return rezultat;
}
