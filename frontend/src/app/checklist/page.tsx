'use client';
import { useEffect, useState } from 'react';

export default function Checklist() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('resultatQuiz');
    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  const handleChange = (index: number, newItem: string) => {
    if (!result) return;
    const updatedChecklist = [...result.checklist];
    updatedChecklist[index] = newItem;
    const updatedResult = { ...result, checklist: updatedChecklist };
    setResult(updatedResult);
    localStorage.setItem('resultatQuiz', JSON.stringify(updatedResult));
  };

  if (!result) {
    return <p>Aucune checklist disponible. Faites le quiz.</p>;
  }

  return (
    <main>
      <h1>Checklist pour {result.destination}</h1>
      {result.checklist.map((item: string, index: number) => (
        <div key={index}>
          <input
            type="text"
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
            style={{ width: '80%', margin: '5px 0' }}
          />
        </div>
      ))}
    </main>
  );
}
