const listeProjets = {
    "ecowork": {
        title: "EcoWork",
        category: "Identité • 2024",
        lead: "Plateforme de coworking écologique.",
        description: "Ce projet explore l'alliance entre nature et productivité...",
        mainImg: "Images/EcoWork.png",
        tools: "Figma, Illustrator",
        role: "Direction Artistique",
        gallery: ["Images/EcoWork.png", "Images/Logo_Solina_Cheam.png"]
    },
    "branding": {
        title: "Be The Main Character",
        category: "Branding • 2024",
        lead: "Une approche minimaliste des formes.",
        description: "Travail sur la typographie et le vide...",
        mainImg: "Images/Main_Character.png",
        tools: "InDesign, Photoshop",
        role: "Graphic Design",
        gallery: ["Images/Main_Character.png", "Images/Logo_Solina_Cheam.jpg"]
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

        // --- LOGIQUE BOUTON SUIVANT ---
        const keys = Object.keys(listeProjets); // ["ecowork", "branding"]
        const currentIndex = keys.indexOf(projetId);
        // On prend l'index suivant, ou 0 si on est à la fin
        const nextIndex = (currentIndex + 1) % keys.length;
        const nextId = keys[nextIndex];

        const nextBtn = document.querySelector('.project-footer .btn:last-child');
        nextBtn.href = `projet-detail.html?id=${nextId}`;
        
        document.title = projet.title + " | Solina Cheam";

    } else {
        // Redirection si l'ID est faux pour ne pas rester sur une page vide
        window.location.href = 'projets.html';
    }
});