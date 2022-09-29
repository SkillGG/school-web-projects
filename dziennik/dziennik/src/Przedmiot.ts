/**
 * Klasa przedmiot
 */
export class Przedmiot {
  name: string;
  notes: number[];
  constructor(name: string) {
    // stworz nowy przedmiot
    this.name = name;
    this.notes = [];
  }
  /**
   * Oblicz srednia
   */
  srednia(): string | number {
    if (this.notes.length === 0) return "Brak";
    return this.notes.reduce((p, n) => p + n, 0) / this.notes.length; // oblicz srednia (suma / liczba)
  }
}
