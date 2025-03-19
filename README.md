Tämä on täydellinen full-stack projekti! Tässä on rakenteellinen yhteenveto siitä, mitä sinun pitää rakentaa:

✅ Teknologiat:
Backend: Node.js + Express + TypeScript + MariaDB
Frontend: React + TypeScript + Vite
🏠 Home page:
Selittää miten sivusto toimii
"Rekisteröidy" ja "Kirjaudu sisään" -painikkeet
Linkki "Unohtuiko salasana?" -sivulle
🔐 Authentication:
Sign Up: (Name, Email, Password, Confirm Password)
Sign In: (Email, Password)
Reset Password:
Lähettää sähköpostiin linkin salasanan nollaamiseen (reset-token logiikka)
Form: uusi salasana + vahvistus
👤 Kun kirjautuu sisään:
Näyttää: Profile Name + Email
👑 Admin-käyttäjälle:
Dashboard jossa näkyy:
Add + Get + Delete + Update:
🍽️ Restaurant
📋 Menu
💬 Feedback
Admin voi lisätä uuden Restaurantin ja Menun, ja muokata/poistaa niitä.
🙋‍♂️ Customer-käyttäjälle:
Näyttää vain:
Get: Restaurant + Menu
Get + Add: Feedback
Customer voi:
Katsoa ravintolat + niiden menut 🍕
Antaa ja katsoa muiden käyttäjien feedbackit 💬
Nähdä ravintolan ratingin ⭐
Antaa like Menulle ❤️
✨ Lisäominaisuudet:
Like-järjestelmä Menulle (yksi like per käyttäjä / menu)
Feedback sisältää myös ⭐ tähdillä ratingin
Admin saa näkymään kaikki käyttäjien feedbackit ja voi myös poistaa niitä
📐 Frontend navigointi:
Home | Sign Up | Sign In | Reset Password | Profile | Logout
Adminin puolella lisäksi: Admin Panel (Restaurant, Menu, Feedback CRUD)
Customer puolella: View Restaurants | Menus | Feedback | Like Menu
