import React, { useEffect, useState } from "react";
import { Przedmiot } from "./Przedmiot";

/**
 * Dziennik
 * @returns {React.FunctionComponent<{}>}
 */
export const Dziennik: React.FunctionComponent<{}> = () => {
  // stworz zmienna dz
  const [dz, setDz] = useState<Przedmiot[]>([]);

  // przy starcie zaladuj dziennik z pamieci
  useEffect(() => {
    const ls = localStorage.getItem("dziennik");
    if (ls) setDz(JSON.parse(ls));
  }, []);

  // po zmianie dziennika zapisz go do pamieci
  useEffect(() => {
    localStorage.setItem("dziennik", JSON.stringify(dz));
  }, [dz]);

  /**
   * Zamien ocene na postac dziennikowa
   * @param n liczba odpowiadajaca ocenie
   * @returns ocene w postaci n lub n+ lub n-
   */
  const toNote = (n: number): string => {
    const isPlus = n % 1 === 0.5;
    const isMinus = n % 1 == 0.75;
    return `${isPlus ? n : n + 1}${isMinus ? "-" : ""}${isPlus ? "+" : ""}`;
  };

  /**
   * Zamien z oceny dziennikowej na liczbe
   * @param n string oceny
   * @returns numer odpowiadajacy ocenie
   */
  const fromNote = (n: string): number => {
    const rx = /^(\d)(?:(\+)|(\-))?$/.exec(n); // sprawdz czy wpisana jest poprawna ocena
    if (!rx) return -1; // niepoprawna liczba
    return parseInt(rx[1]) + (rx[2] ? 0.5 : 0) - (rx[3] ? 0.25 : 0); // zamien na liczbe
  };

  // zwroc HTML
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Przedmiot</th>
            <th>Oceny</th>
            <th>Srednia</th>
          </tr>
        </thead>
        <tbody>
          {dz.map((p) => {
            // mapuj wszystkie przedmioty na HTML
            return (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>
                  {
                    p.notes.reduce(
                      (p, n) => p + toNote(n) + ", ",
                      ""
                    ) /** Zamien na ciag znakow */
                  }
                  <span
                    onClick={() => {
                      // wczytaj ocene od uzytkownika
                      const ocena_str = prompt("Ocena");
                      if (ocena_str) {
                        // sprawdz czy uzytkownik cos wpisal
                        const ocena_int = fromNote(ocena_str); // zamien na numer
                        if (ocena_int > 0) {
                          // jezeli wpisal poprawna ocene
                          p.notes.push(ocena_int); // dodaj do dziennika
                          setDz(Object.assign([], dz)); // zapisz dziennik w pamieci
                        }
                      }
                    }}
                  >
                    [+]
                  </span>
                </td>
                <td>{p.srednia()}</td>
              </tr>
            );
          })}
          <tr>
            <td
              colSpan={3}
              onClick={() => {
                // dodaj przedmiot
                // popros uzytkownika o wpisanie nazwy przemiotu
                const n = prompt("Nazwa");
                if (n) {
                  // jezeli cos wpisal
                  setDz((p) => [...p, new Przedmiot(n)]); // dodaj przedmiot do dziennika
                }
              }}
            >
              Dodaj przedmiot
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
