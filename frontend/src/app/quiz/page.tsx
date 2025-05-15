'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormDataType {
  destinationType: string;
  budget: string;
  durée: string;
}

export default function Quiz() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataType>({
    destinationType: '',
    budget: '',
    durée: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const simulatedResult = {
  destination: 'Argentine',
  durée: formData.durée,
  itineraire: [
    { jour: 1, activité: 'Visite de Buenos Aires' },
    { jour: 2, activité: 'Tango et découverte des quartiers historiques' },
    { jour: 3, activité: 'Vol vers El Calafate - glacier Perito Moreno' }
  ],
  conseils: [
    'Prendre une carte SIM locale',
    'Toujours avoir du cash en pesos',
    'Apprendre quelques mots d\'espagnol'
  ],
  checklist: [
    'Passeport',
    'Chaussures de randonnée',
    'Carte bancaire internationale'
  ],
  vocabulaire: [
    'Hola = Bonjour',
    'Gracias = Merci',
    'Por favor = S\'il vous plaît'
  ]
};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('resultatQuiz', JSON.stringify(simulatedResult));
    router.push('/itineraire');
  };

  return (
    <main>
      <h1>Quiz : Personnalise ton voyage</h1>
      <form onSubmit={handleSubmit}>
        <label>Quel type de destination cherches-tu ?
          <select name="destinationType" onChange={handleChange} value={formData.destinationType} required>
            <option value="">Choisir...</option>
            <option value="nature">Nature</option>
            <option value="culture">Culture</option>
            <option value="plage">Plage</option>
          </select>
        </label><br /><br />

        <label>Quel est ton budget ?
          <select name="budget" onChange={handleChange} value={formData.budget} required>
            <option value="">Choisir...</option>
            <option value="petit">Petit budget</option>
            <option value="moyen">Moyen budget</option>
            <option value="gros">Gros budget</option>
          </select>
        </label><br /><br />

        <label>Durée du voyage :
          <input
            name="durée"
            type="text"
            placeholder="ex: 15 jours"
            onChange={handleChange}
            value={formData.durée}
            required
          />
        </label><br /><br />

        <button type="submit">Voir mon itinéraire</button>
      </form>
    </main>
  );
}

