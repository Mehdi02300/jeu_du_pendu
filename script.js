let mots = [
    "Chat", "Chien", "Elephant", "Girafe", "Kangourou", "Lion", "Tigre", "Rhinoceros", "Zebre", "Dauphin", "Ordinateur",
    "Telephone", "Clavier", "Souris", "Imprimante", "Voiture", "Velo", "Televiseur", "Bouteille", "Stylo", "Rouge", "Bleu",
    "Vert", "Jaune", "Violet", "Orange", "Marron", "Noir", "Blanc", "Gris", "Pomme", "Banane", "Orange", "Fraise", "Ananas",
    "Carotte", "Tomate", "Brocoli", "Poire", "Raisin", "France", "Espagne", "Italie", "Allemagne", "Portugal", "Japon",
    "Chine", "Canada", "Australie", "Bresil","Docteur", "Professeur", "Ingenieur", "Avocat", "Mecanicien", "Cuisinier",
    "Pilote", "Architecte", "Journaliste", "Infirmier"
];

const lettres = document.querySelector('.lettres');
const imagePendu = document.querySelector('.image');
const motCache = document.querySelector('.motCache');
const message = document.querySelector('.message');
const canvas = document.querySelector('.confetti');
const valider = document.querySelector('#valider');
const choix = document.querySelector('#choix');
const mauvaiseReponseMax = 6;
let mauvaiseReponse = 0;
let motATrouver = mots[Math.floor(Math.random() * mots.length)].toUpperCase();
let lettresDevinees = [];

// Initialisation de l'affichage du mot caché
afficherMot();

// Création des lettres de l'alphabet
for(let i = 65; i <= 90; i++) {
    const lettre = String.fromCharCode(i);
    const button = document.createElement('button');
    button.textContent = lettre;
    button.classList.add('button');

    // Evenement lorsque l'utilisateur clique sur une lettre
    button.addEventListener('click', function() {
        devine(lettre);
        button.disabled = true;
    });
    lettres.appendChild(button);
}

// Evenement lorsque l'utilisateur valider le mot entier
valider.addEventListener('click', () => {
    if(choix.value.toUpperCase() === motATrouver) {
        message.textContent = 'Félicitations ! Vous avez trouvé le mot.';
        message.classList.add('gagne');
        confettis();
        desactiverBoutons();
    } else {
        message.textContent = `Désolé, vous avez perdu. Le mot était ${motATrouver}.`;
        message.classList.add('perdu');
        desactiverBoutons();
    }
});

// Fonction qui permet de voir si le mot contient la lettre ou non
function devine(lettre) {
    if(motATrouver.includes(lettre)) {
        lettresDevinees.push(lettre);
    } else {
        mauvaiseReponse++;
        imagePendu.src = `images/pendu${mauvaiseReponse}.png`;
    }
    let motAffiche = afficherMot();
    verifierEtatJeu(motAffiche);
}

// Fonction qui permet d'afficher la lettre si elle est trouvée
function afficherMot() {
    let affichage = motATrouver.split('').map(lettre => lettresDevinees.includes(lettre) ? lettre : '_').join(' ');
    motCache.textContent = affichage;
    return affichage;
}

// Fonction qui permet de vérifier si la partie est terminée ou non
function verifierEtatJeu(motAffiche) {
    if(motAffiche.indexOf('_') === -1) {
        message.textContent = 'Félicitations ! Vous avez trouvé le mot.';
        message.classList.add('gagne');
        confettis();
        desactiverBoutons(); 
    } else if(mauvaiseReponse >= mauvaiseReponseMax) {
        message.textContent = `Désolé, vous avez perdu. Le mot était ${motATrouver}.`;
        message.classList.add('perdu');
        desactiverBoutons();
    }
}

// Fonction qui permet de désactiver les boutons une fois la partie terminée 
function desactiverBoutons() {
    const buttons = lettres.querySelectorAll('button');
    for(let button of buttons) {
        button.disabled = true;
    }
}

// Fonction qui permet d'ajouter des confettis
function confettis() {
    var myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });
    myConfetti({
        particleCount: 100,
        spread: 160
    });
}