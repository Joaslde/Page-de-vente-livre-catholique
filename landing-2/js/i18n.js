const resources = {
  fr: {
    translation: {
      "hero_eyebrow": "La méthode complète",
      "hero_title_p1": "Devenez le",
      "hero_title_em": "BON COUP",
      "hero_title_p2": "que tout le monde recherche.",
      "hero_sub": "La méthode complète pour maîtriser l'art du plaisir, reprendre confiance en soi et transformer votre vie intime.",
      "pain_label": "Le Problème",
      "pain_title": "Ce qui détruit ton",
      "pain_him_title": "Pour lui",
      "pain_him_text": "La peur de ne pas durer assez longtemps, le stress de la performance et l'impression de ne pas savoir comment s'y prendre techniquement.",
      "pain_her_title": "Pour elle",
      "pain_her_text": "La routine qui s'installe, la difficulté à exprimer ses désirs et l'envie de découvrir de nouvelles sensations sans tabou.",
      "quote_p1": "Ce n'est pas juste un guide, c'est votre nouveau manuel secret.",
      "quote_p2": "Un condensé d'années d'expertise pour vous offrir des techniques concrètes, sans détour et immédiatement applicables.",
      "quote_author": "— L'Art de Baiser",
      "learn_label": "Ce que vous allez apprendre",
      "learn_title": "Les Secrets de la",
      "men_section_title": "Pour les  Hommes : La Maîtrise Totale",
      "men_b1_title": "Contrôle & Endurance",
      "men_b1_desc": "Les secrets pour gérer son énergie et faire durer le plaisir.",
      "men_b2_title": "Expertise Technique",
      "men_b2_desc": "Maîtriser les gestes qui font la différence (Cunni, G-spot).",
      "men_b3_title": "Leadership Intime",
      "men_b3_desc": "Comment prendre les devants avec assurance.",
      "women_section_title": "Pour les Femmes : L'Explosion des Sens",
      "women_b1_title": "L'Art de la Main & de la Bouche",
      "women_b1_desc": "Des techniques avancées pour surprendre et ravir.",
      "women_b2_title": "Exploration Sans Limite",
      "women_b2_desc": "Comprendre son corps et celui de l'autre pour plus de plaisir.",
      "women_b3_title": "Confiance Absolue",
      "women_b3_desc": "Se libérer des blocages pour vivre pleinement chaque instant.",
      "why_title": "Pourquoi choisir",
      "why_1": "Un langage clair et sans tabou.",
      "why_2": "Des techniques qui fonctionnent vraiment.",
      "why_3": "Une approche humaine et décomplexée.",
      "disc_title": "La Discrétion Garantie",
      "disc_1": "Paiement sécurisé.",
      "disc_2": "Apparition discrète sur le relevé bancaire.",
      "disc_3": "Téléchargement instantané (Format PDF, aucun colis physique).",
      "cta_button": "IL ME FAUT<br>CE MANUEL"
    }
  },
  es: {
    translation: {
      "hero_eyebrow": "El método completo",
      "hero_title_p1": "Conviértete en el",
      "hero_title_em": "BUEN AMANTE",
      "hero_title_p2": "que todo el mundo busca.",
      "hero_sub": "El método completo para dominar el arte del placer, recuperar la confianza en ti mismo y transformar tu vida íntima.",
      "pain_label": "El Problema",
      "pain_title": "Lo que destruye tu",
      "pain_him_title": "Para él",
      "pain_him_text": "El miedo a no durar lo suficiente, el estrés por el rendimiento o la sensación de no saber cómo hacerlo técnicamente.",
      "pain_her_title": "Para ella",
      "pain_her_text": "La rutina que se instala, la dificultad para expresar sus deseos o las ganas de descubrir nuevas sensaciones sin tabúes.",
      "quote_p1": "No es solo una guía, es tu nuevo manual secreto.",
      "quote_p2": "Un compendio de años de experiencia para ofrecerte técnicas concretas, directas e inmediatamente aplicables.",
      "quote_author": "— El Arte del Sexo",
      "learn_label": "Lo que vas a aprender",
      "learn_title": "Los Secretos del",
      "men_section_title": "Sección Hombres: Dominio Total",
      "men_b1_title": "Control y Resistencia",
      "men_b1_desc": "Los secretos para gestionar tu energía y alargar el placer.",
      "men_b2_title": "Experiencia Técnica",
      "men_b2_desc": "Dominar los gestos que marcan la diferencia (Cunni, Punto G).",
      "men_b3_title": "Liderazgo Íntimo",
      "men_b3_desc": "Cómo tomar la iniciativa con seguridad.",
      "women_section_title": "Sección Mujeres: La Explosión de los Sentidos",
      "women_b1_title": "El Arte de la Mano y la Boca",
      "women_b1_desc": "Técnicas avanzadas para sorprender y deleitar.",
      "women_b2_title": "Exploración Sin Límites",
      "women_b2_desc": "Comprender tu cuerpo y el del otro para mayor placer.",
      "women_b3_title": "Confianza Absoluta",
      "women_b3_desc": "Liberarse de los bloqueos para vivir plenamente cada instante.",
      "why_title": "¿Por qué elegir",
      "why_1": "Un lenguaje claro y sin tabúes.",
      "why_2": "Técnicas probadas y que funcionan de verdad.",
      "why_3": "Un enfoque humano y desacomplejado.",
      "disc_title": "Discreción Garantizada",
      "disc_1": "Pago seguro.",
      "disc_2": "Aparición discreta en el extracto bancario.",
      "disc_3": "Descarga instantánea (Formato PDF, sin paquete físico).",
      "cta_button": "NECESITO<br>ESTE MANUAL"
    }
  }
};

// Initialisation d'i18next
i18next.init({
  lng: navigator.language.startsWith('es') ? 'es' : 'fr',
  fallbackLng: 'fr',
  resources: resources
}, function(err, t) {
  updateContent();
  updateActiveButton(i18next.language);
});

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    // Utilise innerHTML pour interpréter les balises <br> dans les traductions
    element.innerHTML = i18next.t(key);
  });
  updateDynamicAssets(i18next.language);
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    updateContent();
    updateActiveButton(lng);
  });
}

function updateActiveButton(lng) {
  document.getElementById('btn-fr').classList.remove('active');
  document.getElementById('btn-es').classList.remove('active');
  if(lng.startsWith('es')) {
    document.getElementById('btn-es').classList.add('active');
  } else {
    document.getElementById('btn-fr').classList.add('active');
  }
  document.documentElement.lang = lng;
}