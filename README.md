# Full Stack Restaurant & Menu App (Admin + Customer)


Valmis branch on tailwind

Tämä projekti on full-stack web-sovellus, jossa on roolipohjainen käyttöliittymä. Sovellus on rakennettu seuraavilla teknologioilla:

### 🔧 Teknologiat:
- **Backend**: Node.js + Express + TypeScript + MariaDB
- **Frontend**: React + TypeScript + Vite

---

## 🏠 Home Page
- Selittää käyttäjälle miten sivusto toimii ja mitä rooleja siinä on (Admin / Customer)
- Linkit: `Sign Up`, `Sign In`, `Reset Password`

---

## 🔐 Käyttäjäominaisuudet

### **1) Sign Up**
- Luo käyttäjätili
- Kentät: `Name`, `Email`, `Password`, `Confirm Password`

### **2) Sign In**
- Kirjautuminen sähköpostilla ja salasanalla

### **3) Reset Password**
- Jos salasana unohtuu, käyttäjä voi pyytää sähköpostiinsa linkin, jolla salasanan voi vaihtaa.

### **4) Profiili**
- Kun käyttäjä kirjautuu sisään, näkyy: `Name + Email`

---

## 👑 Admin-rooli
Admin-käyttäjälle on omat hallintatyökalut:

- Lisää, muokkaa ja poista:
  - 🍽️ Ravintolat (`Restaurant`)
  - 📋 Menut (`Menu`)
  - 💬 Palautteet (`Feedback`)
- Admin voi hallita kaikkia tietoja CRUD-toiminnallisuuksilla.

---

## 🙋‍♂️ Customer-rooli
Tavalliselle käyttäjälle (Customer) näkyy:

- Näytä kaikki ravintolat ja niiden menut
- Katso ja lisää palautteita
- Katso muiden käyttäjien palautteet ja näe ravintolan keskiarvoinen ⭐ rating
- Tykkää menuista ❤️

---

## 🔗 Linkit
- `/register` ➡ Luo uusi käyttäjä
- `/login` ➡ Kirjaudu sisään
- `/reset-password` ➡ Salasanan palautus
- `/profile` ➡ Käyttäjäprofiili
- `/admin` ➡ Admin dashboard (vain admin)
- `/restaurants` ➡ Ravintolat (Customer näkymä)

---

## 🧩 Roolipohjainen näkymä:
| Rooli     | Restaurant | Menu      | Feedback      | Like Menu |
|-----------|------------|-----------|---------------|-----------|
| **Admin**     | Add, Get, Delete, Update | Add, Get, Delete, Update | Add, Get, Delete, Update |  käytössä |
| **Customer**  | Get        | Get       | Add, Get     | Like      |

---

## 🔒 Turvallisuus
- JWT token-pohjainen autentikointi
- Sähköpostivahvistus salasanan palautuksessa
- Roolipohjaiset middlewaret (Admin / Customer)



