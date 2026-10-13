/**
 * ========================================================
 * MOTEUR DE RENDU DOM
 * ========================================================
 */

// Fonction pour ouvrir/fermer l'accordéon des jobs
window.toggleJob = function (element) {
  const card = element.closest('.job-card');
  card.classList.toggle('active');
};

function initApp() {
  renderSidebar();
  renderHeader();
  renderPages();
  initThemeToggle();
  initVeilleLayout();
  attachNavigation();
}

// 1. Sidebar
function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  let html = `
        <div class="brand">
            <div class="brand-copy">
                <h1>${portfolioData.profile.name}</h1>
                <span class="mobile-current-section" aria-live="polite">${portfolioData.navigation[0].label}</span>
            </div>
            <button class="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="sidebar-panel" aria-label="Ouvrir le menu">
                <span></span><span></span><span></span>
            </button>
        </div>
        <div id="sidebar-panel" class="sidebar-panel">
        <ul class="nav-menu">
    `;

  portfolioData.navigation.forEach((nav, index) => {
    const activeClass = index === 0 ? 'active' : '';
    html += `    <li class="nav-item ${activeClass}" data-target="${nav.id}" role="button" tabindex="0" aria-current="${index === 0 ? 'page' : 'false'}">
                    <span class="nav-index">0${index + 1}</span>
                    <span>${nav.label}</span>
                 </li>`;
  });
  html += `</ul>`;

  // Regroupe les actions avant le footer.
  html += `
        <div class="sidebar-actions">
            <button class="sidebar-action sidebar-action-primary" onclick="openContactModal()">Me contacter</button>
            <a href="assets/pdf/CV_Haytham_Clement.pdf" download="CV_Haytham_Clement.pdf" class="sidebar-action cv-btn-elite">
                Télécharger mon CV
            </a>
        </div>
        <div class="sidebar-footer">
            <div class="location-status">
                <span class="status-dot"></span> ${portfolioData.profile.location}
            </div>
            ${portfolioData.profile.socials.map(s => `
                <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands ${s.icon}" aria-hidden="true"></i>
                    <span>${s.name}</span>
                </a>
            `).join('')}
            <div class="sidebar-theme-control">
                <button id="theme-toggle" class="theme-toggle" type="button" aria-pressed="false">
                    <span class="theme-toggle-icon" aria-hidden="true">
                        <i class="fa-solid fa-moon" data-theme-icon></i>
                    </span>
                    <span class="theme-toggle-copy">
                        <span class="theme-toggle-caption">Apparence</span>
                        <span class="theme-toggle-state" data-theme-label>Mode nuit</span>
                    </span>
                    <span class="theme-toggle-indicator" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    `;

  html += `</div>`;
  sidebar.innerHTML = html;
}

// 2. Header Profil
function renderHeader() {
  const header = document.getElementById('profile-header');
  header.innerHTML = `
        <div class="avatar">
            <img src="${portfolioData.profile.photo}" alt="Photo de ${portfolioData.profile.name}" onerror="this.remove(); this.parentElement.textContent='${portfolioData.profile.initials}'">
        </div>
        <div class="profile-info">
            <h2>${portfolioData.profile.name}</h2>
            <h3>${portfolioData.profile.role}</h3>
            <p>${portfolioData.profile.bio}</p>
        </div>
    `;
}

// 3. Pages Content
function renderPages() {
  const container = document.getElementById('pages-container');
  let html = '';

  // Page: Parcours (Arbre + Branches avec Accordéons)
// Page: Parcours
    html += `
    <div id="parcours" class="page-section active">
        <h3 class="section-title">Mon Parcours</h3>
        <div class="timeline">
            ${portfolioData.parcours.map(node => `
                <div class="timeline-node">
                    <div class="node-dot"></div>
                    
                    <!-- PARTIE ÉCOLE/FORMATION -->
                    <div class="node-content">
                        <!-- Modification ici : Logo placé à gauche et centré avec le texte -->
                        <div class="parcours-header-flex" style="align-items: center; justify-content: flex-start;">
                            ${node.logo ? `<img src="${node.logo}" alt="Logo ${node.location}" class="parcours-logo" loading="lazy">` : ''}
                            <div>
                                <span class="node-date" style="display: block; margin-bottom: 2px;">${node.date}</span>
                                <h4 class="node-title" style="margin: 0 0 2px 0;">${node.title}</h4>
                                <span class="node-subtitle">${node.location}</span>
                            </div>
                        </div>
                    </div>
                    
                    ${node.branch ? `
                    <!-- PARTIE ENTREPRISE/ALTERNANCE -->
                    <div class="timeline-branch">
                        <div class="job-card">
                            <div class="job-header" onclick="toggleJob(this)">
                                <div class="job-header-top">
                                    <div class="parcours-header-flex" style="align-items: center; justify-content: flex-start;">
                                        ${node.branch.logo ? `<img src="${node.branch.logo}" alt="Logo ${node.branch.company}" class="parcours-logo" loading="lazy">` : ''}
                                        <div>
                                            <div class="job-company">${node.branch.company}</div>
                                            <div class="job-role">${node.branch.title}</div>
                                        </div>
                                    </div>
                                    <div class="job-chevron" aria-hidden="true"></div>
                                </div>
                                <div class="job-meta">
                                    <span>${node.branch.date}</span>
                                    <span style="color: var(--border);">|</span>
                                    <span>${node.branch.location}</span>
                                </div>
                            </div>
                            
                            <div class="job-body">
                                <ul class="job-tasks">
                                    ${node.branch.tasks.map(task => `<li>${task}</li>`).join('')}
                                </ul>
                                <div class="job-techs">
                                    ${node.branch.techs.map(tech => `<span class="job-tech-pill">${tech}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>` : ''}
                </div>
            `).join('')}
        </div>
    </div>`;

  // Page: Certifications
  html += `
    <div id="certifications" class="page-section">
        <h3 class="section-title">Diplômes & Certifications</h3>
        <div class="cert-grid">
            ${portfolioData.certifications.map(cert => `
                <div class="cert-card">
                    <div class="cert-header">
                        ${cert.image
      ? `<img src="${cert.image}" alt="Logo ${cert.title}" class="cert-logo" onerror="this.outerHTML='<div class=\\'cert-icon\\'>${cert.title.charAt(0)}</div>'" loading="lazy">`
      : `<div class="cert-icon">${cert.title.charAt(0)}</div>`
    }
                        <span class="cert-badge">${cert.badge}</span>
                    </div>
                    <h4 class="cert-title">${cert.title}</h4>
                    <p class="cert-desc">${cert.desc}</p>
                    
                    <!-- Affichage conditionnel du bouton -->
                    ${cert.action === 'modal'
      ? `<button class="cert-btn" onclick="openModal('${cert.title}', '${cert.link}')">
                               ${cert.btnText}
                           </button>`
      : cert.action === 'link'
        ? `<a href="${cert.link}" target="_blank" class="cert-btn" style="text-decoration: none;">
                               ${cert.btnText}
                           </a>`
        : '' /* Si aucune action n'est précisée, on n'affiche rien */
    }
                </div>
            `).join('')}
        </div>
    </div>`;

  // Page: Projets
  html += `
    <div id="projets" class="page-section">
        <h3 class="section-title">Projets & Labs</h3>
        
        <!-- Terminal de présentation des projets -->
        <div id="terminal-lock" class="terminal-container">
            <div class="terminal-header">
                <div class="term-dots">
                    <div class="term-dot red"></div>
                    <div class="term-dot yellow"></div>
                    <div class="term-dot green"></div>
                </div>
                <div class="term-title">root@haytham-srv:~</div>
            </div>
            <div class="terminal-body">
                <div class="term-line"><span class="term-prompt">root@haytham</span>:<span class="term-path">~/infra</span># <span class="term-command">./load_infrastructure.sh --decrypt</span></div>
                <div class="term-line"><span class="term-status">[ OK ]</span> <span class="term-info">Initialisation du réseau sécurisé...</span></div>
                <div class="term-line"><span class="term-status">[ OK ]</span> <span class="term-info">Vérification des configurations Cisco...</span></div>
                <div class="term-line"><span class="term-status">[ OK ]</span> <span class="term-info">Connexion à la base de données GLPI...</span></div>
                <div class="term-line"><span class="term-status">[ OK ]</span> <span class="term-info">Déchiffrement des archives de projets...</span></div>
                
                <div class="term-line"><span class="term-prompt">root@haytham</span>:<span class="term-path">~/infra/projects</span># <span class="term-command">ls -la</span></div>
                <div class="term-line"><span class="term-info">drwxr-xr-x  admin  web   4096</span>  <span class="term-dir">eeBiscus/</span></div>
                <div class="term-line"><span class="term-info">drwxr-xr-x  admin  net   4096</span>  <span class="term-dir">OraLink/</span></div>
                <div class="term-line"><span class="term-info">drwx------  admin  sec   4096</span>  <span class="term-dir">OpenVPN_Lab/</span></div>
                
                <div class="term-line prompt-line">
                    <span class="term-ready-message">SYSTEM READY</span>
                    <button class="terminal-unlock" type="button" aria-controls="projects-grid-container" aria-expanded="false" onclick="unlockProjects()">
                        Afficher les projets
                        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- LA GRILLE DES PROJETS (Cachée au départ par la classe 'hidden-projects') -->
        <div id="projects-grid-container" class="hidden-projects">
            <div class="projects-grid">
                ${portfolioData.projets.map(proj => `
                    <div class="project-card">
                        <img class="project-image" src="${proj.image}" alt="Aperçu du projet ${proj.title}" loading="lazy">
                        <div class="project-body">
                            <h4 class="proj-title">${proj.title}</h4>
                            <p class="proj-desc">${proj.desc}</p>
                            <div class="proj-techs">
                                ${proj.tech.map(t => `<span class="proj-tech">${t}</span>`).join('')}
                            </div>
                            <button class="proj-btn" type="button">
                                Voir le document technique
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;

// Page: Veille Technologique
    html += `
    <div id="veille" class="page-section">
        
        <div class="veille-layout">
            <!-- COLONNE GAUCHE (Statique - Le cours DevOps exact) -->
            <div class="veille-content">
                <div class="veille-article">
                    
                    <h3 class="veille-title text-cyan">
                        Qu'est-ce que le DevOps ?
                    </h3>
                    
                    <p>Le <strong>DevOps</strong> est une philosophie culturelle et technique qui unifie le développement logiciel (Dev) et l'administration des infrastructures (Ops). L'objectif est d'automatiser et de surveiller toutes les étapes (CI/CD) pour des déploiements plus rapides, itératifs et fiables. Cela repose sur deux piliers majeurs :</p>
                    
                    <h4 class="veille-subtitle text-cyan">
                        Continuous Integration (CI)
                    </h4>
                    
                    <ul class="veille-list">
                        <li><span class="text-purple">Planification :</span> Recueillir et documenter les exigences en écoutant les besoins de l'entreprise.</li>
                        <li><span class="text-purple">Code :</span> Programmation et ingénierie logicielles (écriture de code).</li>
                        <li><span class="text-purple">Construction :</span> Compilation du code sur un serveur CI dédié plutôt qu'en local.</li>
                        <li><span class="text-purple">Test :</span> Vérification de la qualité du code et traduction des exigences commerciales en spécifications techniques.</li>
                        <li><span class="text-purple">Publication :</span> Déploiement sur un serveur de <em>staging</em> pour valider le code avant la production.</li>
                    </ul>

                    <h4 class="veille-subtitle text-cyan">
                        Continuous Delivery (CD)
                    </h4>
                    
                    <ul class="veille-list">
                        <li><span class="text-purple">Déploiement (Deploy) :</span> Déploiement sur serveurs de production ou infrastructure cloud (ex: AWS, Azure, GCP) via des pipelines automatisés.</li>
                        <li><span class="text-purple">Exploitation (Operate) :</span> L'application est déployée et exécutée en production.</li>
                        <li><span class="text-purple">Surveillance (Monitor) :</span> Mesure des performances, de la disponibilité et d'autres métriques pour identifier tout problème en production.</li>
                    </ul>

                    <img 
                        src="assets/veille/DevOps.png" 
                        alt="Schéma DevOps CI/CD" 
                        class="veille-image" 
                        onclick="openModal('Architecture CI/CD', 'assets/veille/DevOps.png')"
                        title="Cliquez pour agrandir"
                    >

                </div>
                <!-- DEUXIÈME BLOC : DEVSECOPS -->
                <div class="veille-article">
                    
                    <h3 class="veille-title text-cyan">
                        L'évolution : le DevSecOps
                    </h3>
                    
                    <p>Aujourd'hui, face à la multiplication des cybermenaces, le standard évolue vers le <strong>DevSecOps</strong>. Il s'agit d'intégrer la sécurité (Sec) de manière automatisée dès le début du cycle de développement (approche <em>"Shift-Left"</em>). La sécurité n'est plus une validation finale, mais une responsabilité continue.</p>
                    
                    <h4 class="veille-subtitle text-orange">
                        Une Approche Préventive
                    </h4>
                    
                    <p>Plutôt que de traiter la cybersécurité comme une simple étape finale, on adopte une approche préventive dès le lancement du projet. L'objectif est d'identifier les vulnérabilités le plus tôt possible en intégrant divers tests automatisés tout au long du cycle de développement :</p>
                    
                    <ul class="veille-list">
                        <li><span class="text-purple">SAST (Static Application Security Testing) :</span> Un robot analyse le code source (Java, Python, PHP...) pendant l'écriture pour repérer des erreurs bêtes (ex: mot de passe en clair).</li>
                        <li><span class="text-purple">SCA (Software Composition Analysis) :</span> Le robot vérifie si les bibliothèques/frameworks importés (via npm, pip...) n'ont pas de failles connues.</li>
                        <li><span class="text-purple">DAST (Dynamic Application Security Testing) :</span> Une fois l'application lancée, un scanner simule une attaque de hacker pour tester sa résistance.</li>
                    </ul>

                    <!-- L'IMAGE DU DEVSECOPS QUI S'AGRANDIT AU CLIC -->
                    <img 
                        src="assets/veille/DevSecOps.png" 
                        alt="Schéma DevSecOps" 
                        class="veille-image" 
                        onclick="openModal('Architecture DevSecOps', 'assets/veille/DevSecOps.png')"
                        title="Cliquez pour agrandir"
                    >

                </div> <!-- Fin du 2ème article -->

                <!-- TROISIÈME BLOC : JIRA & AGILE -->
                <div class="veille-article">
                    
                    <h3 class="veille-title text-cyan">
                        Jira & Méthodologies Agiles
                    </h3>
                    
                    <p>Dans un écosystème DevOps, l'outillage technique ne suffit pas : l'organisation est vitale. <strong>Jira</strong> s'impose comme le standard de l'industrie pour orchestrer le travail en équipe, en s'appuyant sur les frameworks agiles :</p>
                    
                    <ul class="veille-list">
                        <li><span class="text-purple">Scrum :</span> Approche itérative basée sur des cycles courts appelés <em>Sprints</em> (généralement 2 à 4 semaines). Elle intègre des cérémonies clés (Daily meeting, Sprint Planning, Rétrospective) pour garantir une livraison continue et une adaptation rapide aux changements.</li>
                    </ul>

                    <!-- L'IMAGE SCRUM QUI S'AGRANDIT AU CLIC -->
                    <img 
                        src="assets/veille/Scrum1.png" 
                        alt="Schéma Méthodologie Scrum" 
                        class="veille-image" 
                        onclick="openModal('Méthodologie Scrum', 'assets/veille/Scrum1.png')"
                        title="Cliquez pour agrandir"
                    >

                    <ul class="veille-list" style="margin-top: 1rem;">
                        <li><span class="text-purple">Le cycle de vie d'une itération :</span> De la spécification à la validation, chaque sprint est une boucle complète impliquant le client et aboutissant à un produit ou un incrément.</li>
                    </ul>

                    <!-- DEUXIÈME IMAGE DU BLOC (CYCLE DE VIE) QUI S'AGRANDIT AU CLIC -->
                    <img 
                        src="assets/veille/Scrum2.png" 
                        alt="Schéma Cycle de vie d'une itération" 
                        class="veille-image" 
                        onclick="openModal(&quot;Cycle de vie d'une itération&quot;, 'assets/veille/Scrum2.png')"
                        title="Cliquez pour agrandir"
                    >

                    <p style="margin-top: 1.5rem;">En contexte DevOps, Jira fait le lien parfait : il connecte les tickets (features, bugs, incidents) directement aux pipelines CI/CD (commits Git, déploiements), offrant une traçabilité totale de l'idée jusqu'à la mise en production. Aujourd'hui, oui, on utilise des outils comme <strong>Jira</strong> ou <strong>Trello</strong> boostés à l'IA pour estimer le temps de travail.</p>

                </div> <!-- Fin du 3ème article -->
            </div>

            <!-- COLONNE DROITE (Flux RSS en attente pour l'étape 3) -->
            <div class="veille-sidebar">
                <div class="news-header">
                    <h3>Actualités DevOps & Agile</h3>
                    <span class="live-badge"><div class="live-dot"></div> En direct</span>
                </div>
                <div id="rss-feed-container">
                    <p style="color: var(--text-secondary); text-align: center;">Chargement du flux...</p>
                </div>
            </div>
            
        </div>
        
    </div>`;

  container.innerHTML = html;

  container.querySelectorAll('.proj-btn').forEach((button, index) => {
    const project = portfolioData.projets[index];
    button.addEventListener('click', () => window.openModal(project.title, project.pdf));
  });
}
