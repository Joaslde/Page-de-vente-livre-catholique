// Données dynamiques selon la langue (Images & Liens)
const dynamicData = {
    fr: {
        imageCover: "https://media.loot.co.za/images/x400/693981483873179215.jpg",
        linkPaiement: "landing-2/page-fr.html"
    },
    es: {
        imageCover: "https://www.jaicobooks.com/wp-content/uploads/2022/12/j-2573-the-complete-book-of-sex-education-dr-rajan-bhonsle-m-d-and-dr-minnu-bhonsle-ph-d-.jpg",
        linkPaiement: "landing-2/page-es.html"
    }
};

// Fonction de mise à jour des assets
function updateDynamicAssets(lang) {
    const currentLang = lang.startsWith('es') ? 'es' : 'fr';
    
    // Mise à jour de l'image
    const imgCover = document.getElementById('dynamic-book-cover');
    if(imgCover) {
        imgCover.src = dynamicData[currentLang].imageCover;
    }

    // Mise à jour de tous les liens CTA
    const ctaLinks = document.querySelectorAll('.dynamic-link');
    ctaLinks.forEach(link => {
        link.href = dynamicData[currentLang].linkPaiement;
    });
}

// Animation au scroll (Reveal)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("visible");
        }
    }
}

window.addEventListener("scroll", reveal);
document.addEventListener("DOMContentLoaded", reveal); // Trigger on load






// Fonction pour ouvrir/fermer le menu de langue
function toggleLangMenu() {
    const menu = document.getElementById('lang-options');
    menu.classList.toggle('open');
}

// Fermer le menu si on clique ailleurs sur la page
document.addEventListener('click', function(event) {
    const container = document.querySelector('.lang-menu-container');
    const menu = document.getElementById('lang-options');
    if (!container.contains(event.target)) {
        menu.classList.remove('open');
    }
});

// Modifier la fonction changeLanguage existante dans i18n.js ou app.js pour fermer le menu
const originalChangeLanguage = changeLanguage;
changeLanguage = function(lng) {
    originalChangeLanguage(lng);
    document.getElementById('lang-options').classList.remove('open');
};