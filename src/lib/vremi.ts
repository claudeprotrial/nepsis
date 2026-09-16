/**
 * Anul frăției, în șase vremuri de câte două luni: ian–feb hramul, mar–apr
 * privegherile, mai–iun drumurile, iul–aug muntele, sep–oct întoarcerea, nov–dec
 * colindele. Numele stau în i18n sub `vreme.0` … `vreme.5`, în aceeași ordine.
 */
export const VREMI = 6;

export function indiceVreme(data: Date): number {
  return Math.floor(data.getUTCMonth() / 2);
}
