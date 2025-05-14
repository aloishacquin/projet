import csv
from openai import OpenAI
from flask import Flask, render_template

# def lire_csv(fichier_path):
#     try:
#         with open(fichier_path, mode='r', encoding='windows-1252') as fichier:
#             lecteur = csv.reader(fichier, delimiter=';')
#             for ligne in lecteur:
#                 print(ligne)
#     except FileNotFoundError:
#         print(f"Fichier non trouvé : {fichier_path}")
#     except Exception as e:
#         print(f"Erreur lors de la lecture du fichier : {e}")

# # Exemple d'utilisation
# if __name__ == "__main__":
#     chemin_fichier = 'C:/Users/alois/Documents/VS/test/toi.csv'  # Remplace par le chemin de ton fichier CSV
#     lire_csv(chemin_fichier)
#     print("################################################################### \n")
    

# def lire_premiere_ligne_csv(fichier_path):
#     try:
#         with open(fichier_path, mode='r', encoding='windows-1252') as fichier:
#             lecteur = csv.reader(fichier, delimiter=';')
#             next(lecteur, None)
#             seconde_ligne = next(lecteur, None)
#             if seconde_ligne:
#                 print(seconde_ligne)
#             else:
#                 print("Fichier vide.")
#     except FileNotFoundError:
#         print(f"Fichier non trouvé : {fichier_path}")
#     except Exception as e:
#         print(f"Erreur lors de la lecture du fichier : {e}")

# # Exemple d’utilisation
# if __name__ == "__main__":
#     lire_premiere_ligne_csv("C:/Users/alois/Documents/VS/test/toi.csv")
    
    


# def lire_premiere_ligne_csv(fichier_path):
#     try:
#         with open(fichier_path, mode='r', encoding='windows-1252') as fichier:
#             lecteur = csv.reader(fichier, delimiter=';')
#             next(lecteur, None)
#             seconde_ligne = next(lecteur, None)
#             if seconde_ligne:
#                 print(seconde_ligne)
#             else:
#                 print("Fichier vide.")
#     except FileNotFoundError:
#         print(f"Fichier non trouvé : {fichier_path}")
#     except Exception as e:
#         print(f"Erreur lors de la lecture du fichier : {e}")

# # Exemple d’utilisation
# if __name__ == "__main__":
#     lire_premiere_ligne_csv("C:/Users/alois/Documents/VS/test/toi.csv")
    



def lire_tableau_csv(fichier_path):
    try:
        with open(fichier_path, mode='r', encoding='windows-1252') as fichier:
            lecteur = csv.reader(fichier, delimiter=';')
            next(lecteur, None)
            tableau = list(next(lecteur, None))
            print("Tableau complet :", tableau)
            return tableau
    except FileNotFoundError:
        print(f"Fichier non trouvé : {fichier_path}")
    except Exception as e:
        print(f"Erreur : {e}")

# Exemple
if __name__ == "__main__":
    tableau = lire_tableau_csv("./toi.csv")

    
def voyages(fichier_path):
    try:
        tableau = lire_tableau_csv(fichier_path)
    
        tableau = tableau[:-4] if len(tableau) >= 4 else tableau
    
        prompt_base = "Décris moi 2 voyages possible qui suivent ces critères. Je veux une liste détaillé de ce que je pourrais faire, des logements, des transports et du budget"
        criteres = " ".join(tableau)
        prompt_final = f"{prompt_base} :\n{criteres}" 
    
       # client = OpenAI(api_key="sk-f5bd525c87194f618b564a57be771406", base_url="https://api.deepseek.com")

        response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": prompt_final},
        ],
        stream=False
        )
        # Affichage de la réponse
        final =response.choices[0].message.content
        return final
    
    except FileNotFoundError:
        print("Erreur : Fichier introuvable.")
    except Exception as e:
        print(f"Une erreur est survenue : {e}")


app = Flask(__name__)

@app.route('/')
def accueil():
    message = voyages("./toi.csv")
    return render_template('index.html', message=message)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)



def get_message():
    return message


