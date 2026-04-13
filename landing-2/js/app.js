// 1. Données dynamiques (Vérifiez bien que les liens sont corrects) 
const dynamicData = {
    fr: {
        imageCover: "https://media.loot.co.za/images/x400/693981483873179215.jpg",
        linkPaiement: "page-fr.html"
    },
    es: {
        imageCover: "https://www.jaicobooks.com/wp-content/uploads/2022/12/j-2573-the-complete-book-of-sex-education-dr-rajan-bhonsle-m-d-and-dr-minnu-bhonsle-ph-d-.jpg",
        linkPaiement: "page-es.html"
    }
};

// 2. Fonction de mise à jour des éléments visuels et des liens [cite: 14, 17]
function updateDynamicAssets(lang) {
    const currentLang = lang.startsWith('es') ? 'es' : 'fr';
    
    // Mise à jour de la couverture du livre
    const imgCover = document.getElementById('dynamic-book-cover');
    if(imgCover) {
        imgCover.src = dynamicData[currentLang].imageCover;
    }

    // Mise à jour de TOUS les boutons (liens dynamiques) [cite: 5, 27, 33]
    const ctaLinks = document.querySelectorAll('.dynamic-link');
    ctaLinks.forEach(link => {
        link.href = dynamicData[currentLang].linkPaiement;
    });
}

// 3. Animation au scroll (Reveal)
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

// 4. Gestion du Menu de Langue et synchronisation
function toggleLangMenu() {
    const menu = document.getElementById('lang-options');
    menu.classList.toggle('open');
}

document.addEventListener('click', function(event) {
    const container = document.querySelector('.lang-menu-container');
    const menu = document.getElementById('lang-options');
    if (menu && !container.contains(event.target)) {
        menu.classList.remove('open');
    }
});

// CRUCIAL : On surcharge la fonction de changement de langue pour inclure les photos/liens
const originalChangeLanguage = window.changeLanguage; 
window.changeLanguage = function(lng) {
    if (typeof originalChangeLanguage === 'function') {
        originalChangeLanguage(lng); // Change les textes (i18n)
    }
    updateDynamicAssets(lng); // Change l'image et les liens
    document.getElementById('lang-options').classList.remove('open');
};



// 5. Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    reveal();

    // On attend que i18next soit prêt pour récupérer la langue détectée
    const checkI18n = setInterval(() => {
        if (window.i18next && window.i18next.isInitialized) {
            clearInterval(checkI18n);
            
            // On récupère la langue résolue par i18next (navigateur ou localStorage)
            const detectedLang = window.i18next.language || 'fr';
            console.log("Langue détectée à l'initialisation :", detectedLang);
            
            // Mise à jour immédiate des photos et des liens
            updateDynamicAssets(detectedLang);
            
            // Mise à jour visuelle du bouton actif dans le menu
            updateActiveButton(detectedLang);
        }
    }, 50); // Vérifie toutes les 50ms
});

// Fonction utilitaire pour synchroniser l'apparence des boutons de langue
function updateActiveButton(lng) {
    const btnFr = document.getElementById('btn-fr');
    const btnEs = document.getElementById('btn-es');
    
    if (btnFr && btnEs) {
        if (lng.startsWith('es')) {
            btnEs.classList.add('active');
            btnFr.classList.remove('active');
        } else {
            btnFr.classList.add('active');
            btnEs.classList.remove('active');
        }
    }
}