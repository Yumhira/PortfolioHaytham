// 4. Système de Navigation
function attachNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.page-section');
  const profileHeader = document.getElementById('profile-header'); // On cible ton en-tête
  const sidebar = document.getElementById('sidebar');
  const menuToggle = sidebar.querySelector('.mobile-menu-toggle');
  const currentSection = sidebar.querySelector('.mobile-current-section');

  function closeMobileMenu() {
    sidebar.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  navItems.forEach(item => {
    const activatePage = () => {
      // 1. On retire l'état actif partout
      navItems.forEach(nav => {
        nav.classList.remove('active');
        nav.setAttribute('aria-current', 'false');
      });
      sections.forEach(sec => sec.classList.remove('active'));
      
      // 2. On met l'état actif sur l'élément cliqué
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
      const targetId = item.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
      currentSection.textContent = item.querySelector('span:last-child').textContent;
      closeMobileMenu();
      if (targetId === 'veille') {
        syncVeilleLayout();
      }

      // 3. LOGIQUE D'AFFICHAGE DE L'EN-TÊTE
      if (profileHeader) {
          if (targetId === 'parcours') {
              profileHeader.style.display = ''; // Laisse le CSS normal s'appliquer
          } else {
              profileHeader.style.display = 'none'; // Fait disparaître l'en-tête
          }
      }
    };

    item.addEventListener('click', activatePage);
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activatePage();
      }
    });
  });

  document.addEventListener('click', event => {
    if (!sidebar.contains(event.target)) closeMobileMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMobileMenu();
  });
}

function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = savedTheme === 'light' ? 'light' : 'dark';

  function applyTheme(theme) {
    const isLight = theme === 'light';
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', `Passer au mode ${isLight ? 'nuit' : 'jour'}`);
    themeToggle.querySelector('[data-theme-label]').textContent = `Mode ${isLight ? 'jour' : 'nuit'}`;
    themeToggle.querySelector('[data-theme-icon]').className = `fa-solid ${isLight ? 'fa-sun' : 'fa-moon'}`;
  }

  applyTheme(initialTheme);
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', nextTheme);
    applyTheme(nextTheme);
  });
}

// 5. Gestion de la Modale PDF
const modalOverlay = document.getElementById('global-modal');
const modalBody = document.getElementById('modal-body');

// Ouvre un document dans une visionneuse intégrée ou une image en lightbox.
window.openModal = function (title, link) {
  const modalContent = document.querySelector('.modal-content');
  const isImage = /\.(jpeg|jpg|gif|png|webp)$/i.test(link);

  modalContent.classList.remove('contact-style', 'lightbox-mode', 'pdf-modal');
  modalContent.setAttribute('aria-label', isImage ? `Aperçu de ${title}` : `Document : ${title}`);
  modalBody.classList.toggle('pdf-content', !isImage);

  if (isImage) {
    modalContent.classList.add('lightbox-mode');
    modalBody.innerHTML = `<img src="${link}" alt="${title}" class="modal-image">`;
  } else {
    modalContent.classList.add('pdf-modal');
    modalBody.innerHTML = `
      <div class="pdf-toolbar">
        <div class="pdf-heading">
          <span class="pdf-kicker">Document PDF</span>
          <h2 class="pdf-title">${title}</h2>
        </div>
        <a class="pdf-open-link" href="${link}" target="_blank" rel="noopener noreferrer">
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          <span>Ouvrir dans un nouvel onglet</span>
        </a>
      </div>
      <iframe src="${link}#toolbar=1&navpanes=0&view=FitH" class="pdf-viewer" title="${title}"></iframe>
    `;
  }

  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

// Fonction pour ouvrir la modale de Contact
window.openContactModal = function () {
  const modalContent = document.querySelector('.modal-content');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
  modalContent.classList.remove('lightbox-mode', 'pdf-modal');
  modalBody.classList.remove('pdf-content');
  modalContent.classList.add('contact-style');
  modalContent.setAttribute('aria-label', 'Contacter Haytham');

  modalBody.innerHTML = `
    <div class="contact-header">
      <div class="contact-heading">
        <span class="contact-icon" aria-hidden="true"><i class="fa-regular fa-paper-plane"></i></span>
        <div>
          <span class="contact-kicker">Prendre contact</span>
          <h2>Échangeons ensemble</h2>
        </div>
      </div>
      <p>Une opportunité, une question ou simplement envie d'échanger ? Laissez-moi un message.</p>
    </div>

    <form class="contact-form">
      <input type="hidden" name="_subject" value="Nouveau message depuis le portfolio">
      <input type="hidden" name="_template" value="table">
      <div class="contact-honeypot" aria-hidden="true">
        <label for="contact-website">Ne pas remplir</label>
        <input type="text" id="contact-website" name="_honey" tabindex="-1" autocomplete="off">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="name">Nom <span aria-hidden="true">*</span></label>
          <input type="text" id="name" name="name" autocomplete="name" required placeholder="Votre nom">
        </div>
        <div class="form-group">
          <label for="email">Adresse e-mail <span aria-hidden="true">*</span></label>
          <input type="email" id="email" name="email" autocomplete="email" required placeholder="vous@exemple.fr">
        </div>
      </div>
      <div class="form-group">
        <label for="message">Votre message <span aria-hidden="true">*</span></label>
        <textarea id="message" name="message" required rows="4" placeholder="Décrivez brièvement ce dont vous souhaitez discuter..."></textarea>
      </div>
      <div class="contact-form-footer">
        <button type="submit" class="btn-submit">
          Envoyer le message
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
      <p class="contact-feedback" role="alert" hidden></p>
    </form>
  `;
  const contactForm = modalBody.querySelector('.contact-form');
  const submitButton = contactForm.querySelector('.btn-submit');
  const feedback = contactForm.querySelector('.contact-feedback');

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    if (contactForm.elements.namedItem('_honey').value) {
      feedback.textContent = 'Le formulaire n’a pas pu être envoyé. Vérifiez les champs et réessayez.';
      feedback.hidden = false;
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.innerHTML = 'Envoi en cours… <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
    feedback.hidden = true;

    let response;
    try {
      response = await fetch('https://formsubmit.co/ajax/clement.haytham@gmail.com', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
    } catch {
      feedback.textContent = 'Connexion au service impossible. Vérifiez votre connexion puis réessayez.';
      feedback.hidden = false;
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = 'Envoyer le message <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
      return;
    }

    let result;
    try {
      result = await response.json();
    } catch {
      feedback.textContent = 'Le service a renvoyé une réponse inattendue. Réessayez plus tard.';
      feedback.hidden = false;
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = 'Envoyer le message <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
      return;
    }

    if (!response.ok || (result.success !== true && result.success !== 'true')) {
      feedback.textContent = result.message || 'Le message n’a pas pu être envoyé. Réessayez plus tard.';
      feedback.hidden = false;
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = 'Envoyer le message <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
      return;
    }

    contactForm.innerHTML = `
      <div class="contact-success" role="status">
        <span class="contact-success-icon" aria-hidden="true"><i class="fa-solid fa-check"></i></span>
        <h3>Message transmis</h3>
        <p>Le service a accepté votre message. Merci pour votre prise de contact.</p>
        <button type="button" class="btn-submit" onclick="closeModal()">Fermer</button>
      </div>
    `;
  });
  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Fonction utilitaire pour fermer la modale
window.closeModal = function () {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = 'auto';

  setTimeout(() => {
    if (!modalOverlay.classList.contains('hidden')) return;

    document.querySelector('.modal-content').classList.remove('contact-style', 'lightbox-mode', 'pdf-modal');
    modalBody.classList.remove('pdf-content');
    modalBody.replaceChildren();
  }, 300);
}

document.getElementById('close-modal').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', event => {
  if (event.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
    closeModal();
  }
});

// Lancement au chargement
document.addEventListener('DOMContentLoaded', initApp);

// Fonction pour débloquer les projets
window.unlockProjects = function () {
  const terminal = document.getElementById('terminal-lock');
  const projectsGrid = document.getElementById('projects-grid-container');

  if (terminal && projectsGrid) {
    terminal.hidden = true;
    terminal.setAttribute('aria-hidden', 'true');
    terminal.querySelector('.terminal-unlock').setAttribute('aria-expanded', 'true');
    projectsGrid.style.display = 'block';
    projectsGrid.setAttribute('aria-hidden', 'false');
    projectsGrid.setAttribute('tabindex', '-1');
    projectsGrid.focus({ preventScroll: true });
  }
};
