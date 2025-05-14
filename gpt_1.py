import tkinter as tk
from TEST_CSV import get_message



def afficher_interface(texte):
    fenetre = tk.Tk()
    fenetre.title("Proposition de voyage")
    fenetre.geometry("1000x1000")

    label = tk.Label(fenetre, text=texte, font=("Arial", 1), wraplength=350, justify="left")
    label.pack(padx=5, pady=5)

    fenetre.mainloop()



if __name__ == "__main__":
    message = get_message()
    afficher_interface(message)


