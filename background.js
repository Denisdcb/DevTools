// Obtenez l'élément canvas et son contexte
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Définir la taille du canvas pour qu'il couvre toute la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tableau pour stocker les objets bulles
let bubbles = [];

// Classe pour définir une bulle
class Bubble {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;  // Vitesse horizontale
        this.dy = dy;  // Vitesse verticale
        this.opacity = Math.random() * 0.5 + 0.2;  // Opacité de la bulle
    }

    // Méthode pour dessiner la bulle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 255, ${this.opacity})`;  // Couleur bleue avec opacité
        ctx.fill();
        ctx.closePath();
    }

    // Méthode pour mettre à jour la position de la bulle
    update() {
        if (this.y - this.radius < 0) {
            // Si la bulle sort du haut, la réinitialiser en bas
            this.y = canvas.height + this.radius;
        }

        this.x += this.dx;  // Déplacer horizontalement
        this.y += this.dy;  // Déplacer verticalement

        this.draw();  // Dessiner la bulle à la nouvelle position
    }
}

// Créer des bulles aléatoires
function createBubbles() {
    for (let i = 0; i < 50; i++) {  // Créer 50 bulles
        let radius = Math.random() * 15 + 5;  // Rayon aléatoire entre 5 et 20
        let x = Math.random() * canvas.width;  // Position X aléatoire
        let y = Math.random() * canvas.height + canvas.height;  // Position Y initiale en bas
        let dx = (Math.random() - 0.5) * 2;  // Vitesse horizontale aléatoire
        let dy = -Math.random() * 1 - 1;  // Vitesse verticale négative pour faire monter les bulles

        bubbles.push(new Bubble(x, y, radius, dx, dy));
    }
}

// Animer les bulles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Effacer l'écran (fond noir)

    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();  // Mettre à jour la position de chaque bulle
    }

    requestAnimationFrame(animate);  // Demander au navigateur de redessiner le canvas
}

// Initialiser et animer les bulles
createBubbles();
animate();
