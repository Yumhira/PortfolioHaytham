const portfolioData = {
  profile: {
    name: "Haytham Clément",
    initials: "HC",
    photo: "assets/Haytham.png",
    role: "Technicien Support & Infrastructure",
    bio: "Étudiant en 2ème année de BTS SIO (SISR) à l'Institut F2I, je poursuis mon cursus avec pour objectif de devenir consultant en cybersécurité.",
    location: "Gentilly, France",
    socials: [
      { name: "LinkedIn", icon: "fa-linkedin-in", url: "https://www.linkedin.com/in/haythamclement" },
      { name: "GitHub", icon: "fa-github", url: "https://github.com/Yumhira" }
    ]
  },
  navigation: [
    { id: "parcours", label: "Mon Parcours" },
    { id: "projets", label: "Projets" },
    { id: "certifications", label: "Certifications" },
    { id: "veille", label: "Veille" }
  ],
  parcours: [
    {
      date: "2026 - 2027",
      title: "2ème année BTS SIO (Spécialité SISR)",
      location: "Institut F2I",
      logo: "assets/logo/F2I.jpg",
      branch: {
        date: "Sept. 2026 ➔ En cours",
        title: "Alternant Assistant Informatique",
        company: "McDonald's Champs-Élysées",
        location: "Paris",
        logo: "assets/logo/McdoSAVCHAMPS.png",
        tasks: [
          "Diagnostiquer et résoudre les incidents matériels, logiciels et réseau rencontrés par les utilisateurs.",
          "Assurer l’assistance et l’accompagnement des utilisateurs dans l’utilisation des outils informatiques.",
          "Créer, qualifier et suivre les tickets d’incident via l’outil de ticketing.",
          "Escalader et suivre les incidents nécessitant l’intervention de l’infogérance Helpline.",
          "Installer, préparer et configurer les postes informatiques, écrans, imprimantes et autres périphériques.",
          "Installer et configurer les équipements réseau : routeurs, switchs, points d’accès Wi-Fi et autres équipements d’infrastructure.",
          "Participer à la maintenance préventive et corrective du parc informatique.",
          "Participer à la gestion et au suivi du parc informatique : inventaire, affectation, renouvellement et suivi des équipements.",
          "Participer au déploiement et à la mise à jour des systèmes d’exploitation et logiciels.",
          "Participer à la supervision des équipements, services et infrastructures informatiques.",
          "Concevoir et faire évoluer des infrastructures réseau : étude des besoins, recherche de solutions, choix des équipements, chiffrage, configuration, déploiement et tests.",
          "Développer des outils internes.",
          "Participer à différents projets d’évolution du système d’information, de l’analyse du besoin jusqu’au déploiement de la solution."
        ],
        techs: ["Support N1/N2", "Réseau & Infrastructure", "Équipements Réseau", "Systèmes & Déploiement", "Supervision"]
      }
    },
    {
      date: "2025 - 2026",
      title: "1ère année BTS SIO (Spécialité SISR)",
      location: "EPB",
      logo: "assets/logo/EPB.png",
      branch: {
        date: "05/2026 ➔ 07/2026",
        title: "Stagiaire Développeur & Réseau",
        company: "McDonald's Champs-Élysées",
        location: "Paris",
        logo: "assets/logo/McdoSAVCHAMPS.png",
        tasks: [
          "Création d'une application PHP de cartes dématérialisées, incluant la conception de l'interface client et du dashboard administrateur.",
          "Migration de la baie informatique : transfert physique des équipements et réalisation du brassage réseau.",
          "Support de proximité : assistance technique directe aux utilisateurs sur les environnements matériels et logiciels."
        ],
        techs: ["PHP", "Baie Informatique", "Brassage Réseau", "Support Utilisateur"]
      }
    },
    {
      date: "2023 - 2025",
      title: "Bachelor Développement Web",
      location: "ESIEA",
      logo: "assets/logo/ESIEA.png",
      branch: {
        date: "11/2024 ➔ 12/2024",
        title: "Alternant Développeur Fullstack",
        company: "Wineriz",
        location: "Paris 75",
        logo: "assets/logo/Wineriz.jpg",
        tasks: [
          "Développement complet d'une solution métier dédiée aux vignerons en utilisant la stack Vue.js, Nest.js et MongoDB.",
          "Gestion de l'architecture Cloud avec configuration du stockage et des redirections via les Buckets AWS S3.",
          "Intégration de l'API Brevo incluant la mise en place d'un système de suivi dynamique de la taille des emails."
        ],
        techs: ["Vue.js", "Nest.js", "MongoDB", "AWS S3", "API Brevo"]
      }
    }
  ],
  certifications: [
    {
      // Lien vers un logo (à remplacer par tes propres images dans un dossier /img si tu préfères)
      image: "assets/logo/educationNational.jpg",
      badge: "Diplôme Obtenu",
      title: "Baccalauréat STMG",
      desc: "Lycée de l'Arc — Mention Assez-Bien.",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/TOEIC_Logo.svg/1200px-TOEIC_Logo.svg.png",
      badge: "Score : 605",
      title: "TOEIC Listening & Reading",
      desc: "Évaluation internationale du niveau d'anglais professionnel.",
      btnText: "Consulter le score",
      link: "/assets/pdf/Toeic_Result.pdf",
      action: "modal"
    },
    {
      image: "assets/logo/Cisco_Computer_Hardware_Basics.png",
      badge: "Badge Obtenu",
      title: "Computer Hardware Basics",
      desc: "Cisco Networking Academy : Fondamentaux du matériel, montage, réparation et dépannage.",
      btnText: "Voir le badge Credly",
      link: "https://www.credly.com/badges/e53cee06-1fb1-413c-bf10-9c67c0471ce7/linked_in_profile",
      action: "link"
    },
  ],
  projets: [
    {
      title: "OraLink",
      image: "assets/logo/ORALINK.jpg",
      desc: "Architecture réseau multi-sites et ITSM pour un cabinet d'audit.",
      tech: ["Cisco", "GLPI", "VLAN"],
      pdf: "assets/projets/OraLink.pdf"
    },
    {
      title: "Lab Sécurité OpenVPN",
      image: "assets/logo/OpenVPN.jpg",
      desc: "Tunnel sécurisé entre un hôte Windows et un serveur Ubuntu virtualisé.",
      tech: ["OpenVPN", "UFW", "Certificats"],
      pdf: "assets/projets/LabOpenVPN.pdf"
    },
    {
      title: "eeBiscus",
      image: "assets/logo/eeBiscus.png",
      desc: "Plateforme e-commerce fonctionnelle développée en équipe pour le client Neoherba.",
      tech: ["Angular", "Java API"],
      pdf: "docs/eebiscus.pdf"
    },
    {
      title: "Stage McDonald's Champs-Élysées",
      image: "assets/logo/mcdoSAVCHAMP.jpg",
      desc: "Support informatique de proximité, migration baie de serveurs et développement d'une application web (Carte Entreprise).",
      tech: ["Support IT", "Infrastructure / Réseau", "PHP / MySQL"],
      pdf: "assets/projets/Stage_SAVCHAMP.pdf"
    },
  ]
};
