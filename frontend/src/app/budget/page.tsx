'use client';
import { useEffect, useState } from 'react';

interface BudgetItem {
  categorie: string;
  montant: number;
  note: string;
}

export default function Budget() {
  const [budget, setBudget] = useState<BudgetItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem('budget');
    if (data) {
      setBudget(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const totalCalc = budget.reduce((acc, item) => acc + item.montant, 0);
    setTotal(totalCalc);
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const handleChange = (index: number, field: keyof BudgetItem, value: string) => {
    const updated = [...budget];
    if (field === 'montant') {
      updated[index][field] = parseFloat(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setBudget(updated);
  };

  const handleAdd = () => {
    setBudget([...budget, { categorie: '', montant: 0, note: '' }]);
  };

  const handleDelete = (index: number) => {
    setBudget(budget.filter((_, i) => i !== index));
  };

  return (
    <main>
      <h1>Budget prévisionnel</h1>
      <button onClick={handleAdd}>➕ Ajouter une ligne</button>
      <table style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Montant (€)</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budget.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.categorie}
                  onChange={(e) => handleChange(index, 'categorie', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.montant}
                  onChange={(e) => handleChange(index, 'montant', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.note}
                  onChange={(e) => handleChange(index, 'note', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>❌ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total : {total} €</h2>
    </main>
  );
}
