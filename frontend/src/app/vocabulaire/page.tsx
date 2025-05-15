'use client';
import { useEffect, useState } from 'react';

export default function Vocabulaire() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('resultatQuiz');
    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  const handleChange = (index: number, newMot: string) => {
    if (!result) return;
    const updatedVocabulaire = [...result.vocabulaire];
    updatedVocabulaire[index] = newMot;
    const updatedResult = { ...result, vocabulaire: updatedVocabulaire };
    setResult(updatedResult);
    localStorage.setItem('resultatQuiz', JSON.stringify(updatedResult));
  };

  if (!result) {
    return <p>Aucun vocabulaire disponible. Faites le quiz.</p>;
  }

  return (
    <main>
      <h1>Lexique utile pour {result.destination}</h1>
      {result.vocabulaire.map((mot: string, index: number) => (
        <div key={index}>
          <input
            type="text"
            value={mot}
            onChange={(e) => handleChange(index, e.target.value)}
            style={{ width: '80%', margin: '5px 0' }}
          />
        </div>
      ))}
    </main>
  );
}
