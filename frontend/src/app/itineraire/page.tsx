
'use client';
import { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';

export default function Itineraire() {
  const [result, setResult] = useState<any>(null);
  const [budget, setBudget] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('resultatQuiz');
    if (data) {
      setResult(JSON.parse(data));
    }
    const budgetData = localStorage.getItem('budget');
    if (budgetData) {
      setBudget(JSON.parse(budgetData));
    }
  }, []);

  const handleDownloadPDF = () => {
    const element = document.getElementById('carnet-pdf');
    if (!element) return;
    html2pdf().from(element).save('MonCarnetDeVoyage.pdf');
  };

  const handleActivityChange = (index: number, newActivity: string) => {
    if (!result) return;
    const updatedItineraire = [...result.itineraire];
    updatedItineraire[index].activité = newActivity;
    const updatedResult = { ...result, itineraire: updatedItineraire };
    setResult(updatedResult);
    localStorage.setItem('resultatQuiz', JSON.stringify(updatedResult));
  };

  const handleDeleteDay = (index: number) => {
    if (!result) return;
    const updatedItineraire = result.itineraire.filter((_: any, i: number) => i !== index);
    const updatedResult = { ...result, itineraire: updatedItineraire };
    setResult(updatedResult);
    localStorage.setItem('resultatQuiz', JSON.stringify(updatedResult));
  };

  if (!result) {
    return <p>Aucun itinéraire généré. Faites le quiz.</p>;
  }

  return (
    <main>
      <button onClick={handleDownloadPDF} style={{ marginBottom: '20px' }}>
        📄 Télécharger mon carnet PDF complet
      </button>

      <h1>Itinéraire personnalisé</h1>
      <h2>Destination : {result.destination}</h2>
      <h3>Durée : {result.durée}</h3>

      {result.itineraire.map((jour: any, index: number) => (
        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <strong>Jour {jour.jour} :</strong>
          <input
            type="text"
            value={jour.activité}
            onChange={(e) => handleActivityChange(index, e.target.value)}
            style={{ width: '80%', marginLeft: '10px' }}
          />
          <button
            style={{ marginLeft: '10px', backgroundColor: '#f44336', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            onClick={() => handleDeleteDay(index)}
          >
            Supprimer
          </button>
        </div>
      ))}

      {/* Carnet PDF stylé caché */}
      <div id="carnet-pdf" style={{ visibility: 'hidden', position: 'absolute', left: '-9999px', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#fff' }}>
        <style>
          {`
            #carnet-pdf h1, h2 {
              text-align: center;
            }
            #carnet-pdf h1 {
              color: #FF6F61;
              margin-top: 50px;
            }
            #carnet-pdf h2 {
              color: #4A90E2;
              margin-top: 30px;
            }
            #carnet-pdf .page {
              page-break-before: always;
            }
            #carnet-pdf table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            #carnet-pdf table, #carnet-pdf th, #carnet-pdf td {
              border: 1px solid #ddd;
            }
            #carnet-pdf th, #carnet-pdf td {
              padding: 8px;
              text-align: left;
            }
            #carnet-pdf tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            #carnet-pdf p {
              margin: 10px 0;
            }
          `}
        </style>

        {/* Page de couverture */}
        <div>
          <h1>🌍 Mon Carnet de Voyage</h1>
          <h2>{result.destination}</h2>
          <p style={{ textAlign: 'center', marginTop: '50px' }}><em>"Le monde est un livre et ceux qui ne voyagent pas n'en lisent qu'une page."</em></p>
        </div>

        {/* Sommaire interactif */}
        <div className="page">
          <h1>📖 Sommaire</h1>
          <p><a href="#itineraire">1. Itinéraire</a></p>
          <p><a href="#conseils">2. Conseils pratiques</a></p>
          <p><a href="#checklist">3. Checklist</a></p>
          <p><a href="#vocabulaire">4. Lexique utile</a></p>
          <p><a href="#budget">5. Budget prévisionnel</a></p>
        </div>

        {/* Itinéraire */}
        <div className="page" id="itineraire">
          <h1>🗺️ Itinéraire</h1>
          {result.itineraire.map((jour: any, index: number) => (
            <div key={index}>
              <strong>Jour {jour.jour} :</strong> {jour.activité}
            </div>
          ))}
        </div>

        {/* Conseils */}
        <div className="page" id="conseils">
          <h1>💡 Conseils pratiques</h1>
          {result.conseils.map((conseil: string, index: number) => (
            <p key={index}>- {conseil}</p>
          ))}
        </div>

        {/* Checklist */}
        <div className="page" id="checklist">
          <h1>✅ Checklist</h1>
          {result.checklist.map((item: string, index: number) => (
            <p key={index}>- {item}</p>
          ))}
        </div>

        {/* Vocabulaire */}
        <div className="page" id="vocabulaire">
          <h1>📚 Lexique utile</h1>
          {result.vocabulaire.map((mot: string, index: number) => (
            <p key={index}>- {mot}</p>
          ))}
        </div>

        {/* Budget */}
        <div className="page" id="budget">
          <h1>💰 Budget prévisionnel</h1>
          {budget.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Catégorie</th>
                    <th>Montant (€)</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {budget.map((item, index) => (
                    <tr key={index}>
                      <td>{item.categorie}</td>
                      <td>{item.montant} €</td>
                      <td>{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Total : {budget.reduce((acc, item) => acc + item.montant, 0)} €</h3>
            </>
          ) : (
            <p>Aucun budget défini.</p>
          )}
        </div>
      </div>
    </main>
  );
}
