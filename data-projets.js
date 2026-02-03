const listeProjets = {
    "affiche": {
        title: "Affiche Typographique",
        category: "Branding • 2024",
        lead: "Dans le cadre des cours en initiation de design graphique, nous avons eu la chance de faire une affiche en travaillant la typographie avec notre phrase dite \"mantra\".  La mienne qui est, \"BE THE MAIN CHARACTER OF YOUR LIFE\", une phrase pour moi qui est pleine de sens et qui me motive au quotidien.",
        description: "Ici j'ai mis en avant un côté \"diva\" et \"raffiné\" en choisissant mes typographies et en jouant avec.",
        mainImg: "Images/Typo_Rendu.png",
        tools: "InDesign, Photoshop",
        role: "Graphic Design",
        gallery: ["Images/Moodboard_Typo.png", "Images/Logo_Solina_Cheam.jpg"]
    },
    "ecowork": {
        title: "EcoWork",
        category: "Identité • 2024",
        lead: "Plateforme de coworking écologique.",
        description: "Ce projet explore l'alliance entre nature et productivité...",
        mainImg: "Images/EcoWork.png",
        tools: "Figma, Illustrator",
        role: "Direction Artistique",
        gallery: ["Images/EcoWork.png", "Images/Logo_Solina_Cheam.jpg"]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projetId = urlParams.get('id');
    const projet = listeProjets[projetId];

    if (projet) {
        // --- REMPLISSAGE DES TEXTES ---
        document.querySelector('.project-hero h1').innerText = projet.title;
        document.querySelector('.category-tag').innerText = projet.category;
        document.querySelector('.project-lead').innerText = projet.lead;
        document.querySelector('.project-description p').innerText = projet.description;
        
        // On cible plus précisément les métas pour éviter les erreurs
        const metaPs = document.querySelectorAll('.project-meta p');
        if(metaPs.length >= 2) {
            metaPs[0].innerText = projet.tools;
            metaPs[1].innerText = projet.role;
        }
        
        // --- IMAGE ET GALERIE ---
        document.querySelector('.project-main-image img').src = projet.mainImg;

        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = ''; 
        projet.gallery.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = "Détail du rendu";
            galleryGrid.appendChild(img);
        });

        // --- LOGIQUE BOUTONS PRÉCÉDENT / SUIVANT ---
        const keys = Object.keys(listeProjets); 
        const currentIndex = keys.indexOf(projetId);

        const prevBtn = document.querySelector('.btn-prev');
        const nextBtn = document.querySelector('.btn-next');

        if (prevBtn && nextBtn) { // On vérifie que les boutons existent bien dans le HTML
            
            // 1. Logique PRÉCÉDENT (Index 0 = premier projet)
            if (currentIndex > 0) {
                const prevId = keys[currentIndex - 1];
                prevBtn.href = `details.html?id=${prevId}`;
                prevBtn.style.opacity = "1";
                prevBtn.style.pointerEvents = "auto";
            } else {
                // C'est le premier projet : on désactive
                prevBtn.href = "#";
                prevBtn.style.opacity = "0.2";
                prevBtn.style.pointerEvents = "none";
            }

            // 2. Logique SUIVANT (Index length-1 = dernier projet)
            if (currentIndex < keys.length - 1) {
                const nextId = keys[currentIndex + 1];
                nextBtn.href = `details.html?id=${nextId}`;
                nextBtn.style.opacity = "1";
                nextBtn.style.pointerEvents = "auto";
            } else {
                // C'est le dernier projet : on désactive
                nextBtn.href = "#";
                nextBtn.style.opacity = "0.2";
                nextBtn.style.pointerEvents = "none";
            }
        }
    } else {
        // Redirection si l'ID est faux pour ne pas rester sur une page vide
        window.location.href = 'projets.html';
    }
});