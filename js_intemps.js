// MENU BURGER RESPONSIVE
const menuToggle = document.querySelector('.menu-toggle');
const navMobile = document.querySelector('.nav-mobile');
const navLinksMobile = document.querySelectorAll('.nav-list-mobile a');

menuToggle.addEventListener('click', () => {
  navMobile.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', navMobile.classList.contains('active'));
});

// Fermer le menu mobile quand on clique sur un lien
navLinksMobile.forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Fermer le menu mobile si on clique en dehors
document.addEventListener('click', (e) => {
  if (navMobile.classList.contains('active') &&
      !navMobile.contains(e.target) &&
      !menuToggle.contains(e.target)) {
    navMobile.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// GESTION DES QUANTITÉS DE PRODUITS
function changerQuantite(index, delta) {
  const span = document.getElementById('quantite-' + index);
  let quantite = parseInt(span.textContent, 10) || 0;
  quantite = Math.max(0, quantite + delta);
  span.textContent = quantite;
}

// FORMULAIRE DE CONTACT INTERACTIF
const contactForm = document.getElementById('contactForm');
const confirmation = document.getElementById('confirmation');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Ici tu peux ajouter l’envoi AJAX si besoin
    contactForm.style.display = 'none';
    confirmation.style.display = 'block';
    setTimeout(() => {
      confirmation.style.display = 'none';
      contactForm.reset();
      contactForm.style.display = 'flex';
    }, 4000);
  });
}

// ACCESSIBILITÉ : navigation clavier pour le menu burger
menuToggle.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    menuToggle.click();
  }
});
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Ferme toutes les autres questions
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    // Ouvre celle-ci si elle était fermée
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
document.getElementById('impactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const produit = document.getElementById('produit').value;
  const quantite = parseFloat(document.getElementById('quantite').value);
  const achatLocal = document.getElementById('achat-local').checked;

  // Valeurs d'émission de CO₂ par kg (exemple, à ajuster selon tes sources)
  const emissionLocale = 0.2;   // kg CO₂ par kg pour achat local
  const emissionImport = 2.0;   // kg CO₂ par kg pour importation

  const emission = achatLocal ? emissionLocale : emissionImport;
  const total = (quantite * emission).toFixed(2);
  const totalImport = (quantite * emissionImport).toFixed(2);
  const reduction = (totalImport - total).toFixed(2);

  let produitNom = "";
  switch(produit) {
    case "banane": produitNom = "farine de banane plantain"; break;
    case "cacao": produitNom = "farine de cacao"; break;
    case "cafe": produitNom = "café Arabica"; break;
    case "mais": produitNom = "farine de maïs"; break;
    case "manioc": produitNom = "farine de manioc"; break;
  }

  document.getElementById('impactResult').style.display = "block";
  document.getElementById('impactResult').innerHTML =
    `Pour ${quantite} kg de <b>${produitNom}</b>, votre choix ${
      achatLocal ? "<span style='color:green;'>local</span>" : "<span style='color:#d9534f;'>importé</span>"
    } génère <b>${total} kg de CO₂</b>.<br>
    ${
      achatLocal
        ? `Vous évitez <b style="color:var(--vert-fonce);">${reduction} kg de CO₂</b> par rapport à un achat importé.`
        : `Vous pourriez réduire vos émissions de <b style="color:var(--vert-fonce);">${reduction} kg de CO₂</b> en privilégiant l’achat local.`
    }`;
});
// Génère le tableau (exemple)
function renderDashboardTable() {
  const prixMarche = [
    { culture: "Cacao", prix: 1550 },
    { culture: "Banane plantain", prix: 400 },
    { culture: "Café Arabica", prix: 1800 },
    { culture: "Maïs", prix: 250 }
  ];
  const tbody = document.getElementById('dashboard-table-body');
  tbody.innerHTML = '';
  prixMarche.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.culture}</td><td>${item.prix.toLocaleString()} FCFA</td>`;
    tbody.appendChild(tr);
  });
}

// Ouvre la modale
document.getElementById('open-dashboard').addEventListener('click', function(e) {
  renderDashboardTable();
  document.getElementById('dashboard-modal').style.display = 'block';
});

// Ferme la modale
document.getElementById('close-dashboard').addEventListener('click', function(e) {
  document.getElementById('dashboard-modal').style.display = 'none';
});

// Fermer en cliquant à l'extérieur
window.addEventListener('click', function(e) {
  const modal = document.getElementById('dashboard-modal');
  if (e.target === modal) modal.style.display = 'none';
});

