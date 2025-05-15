'use client';
import { useEffect, useState } from 'react';

export default function Conseils() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('resultatQuiz');
    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  const handleChange = (index: number, newConseil: string) => {
    if (!result) return;
    const updatedConseils = [...result.conseils];
    updatedConseils[index] = newConseil;
    const updatedResult = { ...result, conseils: updatedConseils };
    setResult(updatedResult);
    localStorage.setItem('resultatQuiz', JSON.stringify(updatedResult));
  };

  if (!result) {
    return <p>Aucun conseil disponible. Faites le quiz.</p>;
  }

  return (
    <main>
      <h1>Conseils pratiques pour {result.destination}</h1>
      {result.conseils.map((conseil: string, index: number) => (
        <div key={index}>
          <input
            type="text"
            value={conseil}
            onChange={(e) => handleChange(index, e.target.value)}
            style={{ width: '80%', margin: '5px 0' }}
          />
        </div>
      ))}
    </main>
  );
}
