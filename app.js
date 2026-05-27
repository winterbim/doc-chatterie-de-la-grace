/* Chatterie de la Grâce — Outil de contrats
 * Tous les contrats sont déclaratifs : un seul moteur de rendu et d'export.
 */
(() => {
  'use strict';

  // ----- Constantes -----
  const STORAGE_PREFIX = 'cdlg.v1.';
  const LOGO_KEY = STORAGE_PREFIX + 'logo';
  const LAST_DOC_KEY = STORAGE_PREFIX + 'lastDoc';

  const BREEDER = {
    name: 'JIMENEZ Stéphanie',
    address: '16 Allée des Ormes, Appartement 158',
    city: '91100 Corbeil-Essonnes',
    phone: '0651857753',
    email: 'contact@chatteriedelagrace.fr',
    siret: '83485738500019',
    place: 'Corbeil-Essonnes'
  };

  const ROSE = '#ff4da6';
  const ROSE_DEEP = '#d6398a';
  const ROSE_PALE = '#fff5fa';
  const ROSE_BORDER = '#ffd6e9';
  const INK = '#1a1a1a';
  const INK_SOFT = '#475569';

  // ----- Définition des champs réutilisables -----
  const ACQUIRER_FIELDS = [
    { id: 'acq_name', label: 'Nom complet', placeholder: 'Prénom NOM', col: 2 },
    { id: 'acq_addr', label: 'Adresse', placeholder: 'Adresse complète', col: 2 },
    { id: 'acq_zip', label: 'Code postal', placeholder: '75000', col: 1 },
    { id: 'acq_city', label: 'Ville', placeholder: 'Ville', col: 1 },
    { id: 'acq_phone', label: 'Téléphone', placeholder: '06 00 00 00 00', col: 1 },
    { id: 'acq_email', label: 'Email', placeholder: 'nom@exemple.fr', col: 1, type: 'email' }
  ];

  const CAT_FIELDS = [
    { id: 'cat_name', label: 'Nom du chat', placeholder: 'Nom', col: 1 },
    { id: 'cat_breed', label: 'Race', placeholder: 'Maine Coon, British…', col: 1 },
    { id: 'cat_dob', label: 'Date de naissance', placeholder: 'JJ/MM/AAAA', col: 1, type: 'date' },
    { id: 'cat_sex', label: 'Sexe', col: 1, type: 'select', options: ['Mâle', 'Femelle'] },
    { id: 'cat_color', label: 'Couleur / robe', placeholder: 'Ex : black silver tabby', col: 1 },
    { id: 'cat_chip', label: 'N° de puce', placeholder: '15 chiffres', col: 1 },
    { id: 'cat_parents', label: 'Parents (père / mère)', placeholder: 'Père · Mère', col: 2 }
  ];

  // ----- Définition des contrats -----
  const CONTRACTS = {
    cession: {
      title: 'Attestation de cession',
      filename: 'Attestation_cession',
      subtitle: 'Cession avec droits d\'élevage',
      cards: [
        { id: 'acquirer', title: 'Acquéreur', fields: ACQUIRER_FIELDS },
        { id: 'cat', title: 'Informations du chat', fields: CAT_FIELDS },
        {
          id: 'finance', title: 'Modalités financières', fields: [
            { id: 'price', label: 'Prix convenu', placeholder: '€', col: 1 },
            { id: 'deposit', label: 'Arrhes versées', placeholder: '€', col: 1 },
            { id: 'balance', label: 'Solde à régler', placeholder: '€', col: 1 },
            { id: 'payment_mode', label: 'Mode de paiement', placeholder: 'Virement, chèque, espèces…', col: 1 },
            { id: 'handover_date', label: 'Date de prise de possession', placeholder: 'JJ/MM/AAAA', col: 1, type: 'date' },
            { id: 'sign_date', label: 'Date de signature', placeholder: 'JJ/MM/AAAA', col: 1, type: 'date' }
          ]
        },
        {
          id: 'notes', title: 'Conditions particulières', fields: [
            { id: 'notes', label: 'Notes additionnelles', placeholder: 'Conditions spécifiques à ajouter…', col: 2, type: 'textarea' }
          ]
        }
      ],
      sections: [
        {
          h: 'Objet du contrat',
          p: 'Le présent contrat atteste de la cession du chat décrit ci-dessus, destiné à l\'élevage avec transmission des droits de reproduction.'
        },
        {
          h: 'Engagements de l\'éleveur',
          intro: 'L\'éleveur s\'engage à remettre le chat avec :',
          ul: [
            'Son pedigree complet',
            'Son identification par puce électronique',
            'Ses vaccins à jour',
            'Un certificat vétérinaire de bonne santé'
          ]
        },
        {
          h: 'Engagements de l\'acquéreur',
          intro: 'L\'acquéreur s\'engage à :',
          ul: [
            'Respecter les standards de la race lors de la reproduction',
            'Maintenir les vaccins et soins vétérinaires à jour',
            'Déclarer les portées auprès du LOOF',
            'Informer l\'éleveur avant toute cession du chat',
            'Offrir au chat un environnement adapté à l\'élevage'
          ]
        },
        {
          h: 'Garanties de l\'éleveur',
          ul: [
            'La bonne santé du chat à la date de cession',
            'L\'authenticité du pedigree',
            'L\'absence de maladies génétiques connues au jour de la vente'
          ]
        },
        {
          h: 'Clause de retour',
          p: 'En cas d\'impossibilité de garder le chat ou d\'arrêt de l\'activité d\'élevage, l\'acquéreur s\'engage à proposer prioritairement le retour du chat à l\'éleveur.'
        }
      ]
    },

    retraite: {
      title: 'Réservation retraité d\'élevage',
      filename: 'Reservation_retraite',
      subtitle: 'Adoption d\'un chat adulte stérilisé',
      cards: [
        { id: 'acquirer', title: 'Acquéreur', fields: ACQUIRER_FIELDS },
        { id: 'cat', title: 'Informations du chat', fields: CAT_FIELDS.filter(f => f.id !== 'cat_parents') },
        {
          id: 'finance', title: 'Modalités financières', fields: [
            { id: 'price', label: 'Prix convenu', placeholder: '€', col: 1 },
            { id: 'deposit', label: 'Arrhes versées', placeholder: '€', col: 1 },
            { id: 'payment_mode', label: 'Mode de paiement', placeholder: 'Virement, chèque, espèces…', col: 1 },
            { id: 'handover_date', label: 'Date de prise de possession', placeholder: 'JJ/MM/AAAA', col: 1, type: 'date' },
            { id: 'sign_date', label: 'Date de signature', placeholder: 'JJ/MM/AAAA', col: 1, type: 'date' }
          ]
        }
      ],
      sections: [
        {
          h: 'Objet de la réservation',
          p: 'Ce contrat encadre la réservation d\'un chat adulte retraité d\'élevage de la Chatterie de la Grâce. Le chat sera remis à l\'acquéreur une fois toutes les conditions suivantes réunies :',
          ul: [
            'Stérilisation ou castration effectuée',
            'Vaccins et rappels à jour',
            'État de santé validé par certificat vétérinaire'
          ]
        },
        {
          h: 'Engagements de l\'acquéreur',
          ul: [
            'Assurer un foyer aimant et adapté aux besoins du chat',
            'Maintenir les vaccins à jour',
            'Ne pas utiliser le chat à des fins de reproduction',
            'Informer l\'éleveur de tout problème de santé majeur'
          ]
        },
        {
          h: 'Conditions particulières',
          p: 'En cas de décès du chat avant la remise, l\'éleveur s\'engage à rembourser l\'acquéreur ou à proposer un autre chat de valeur équivalente. Passé un délai de deux semaines après la date convenue, la réservation sera réputée abandonnée et les arrhes resteront acquises à l\'éleveur.'
        },
        {
          h: 'Clause de retour',
          p: 'Si l\'acquéreur ne peut plus garder le chat, il contactera en priorité l\'éleveur afin d\'étudier une solution adaptée.'
        }
      ]
    },

    elevage: {
      title: 'Contrat d\'élevage',
      filename: 'Contrat_elevage',
      subtitle: 'Mise à disposition pour reproduction',
      cards: [
        { id: 'acquirer', title: 'Partenaire d\'élevage', fields: ACQUIRER_FIELDS },
        { id: 'cat', title: 'Chat confié à l\'élevage', fields: CAT_FIELDS },
        {
          id: 'finance', title: 'Modalités financières', fields: [
            { id: 'stud_fee', label: 'Frais de saillie', placeholder: '€', col: 1 },
            { id: 'litter_share', label: 'Partage des portées', placeholder: 'Ex : 1 chaton sur 2', col: 1 },
            { id: 'other_fees', label: 'Autres frais', placeholder: 'Frais vétérinaires, déplacements, matériel…', col: 2, type: 'textarea' }
          ]
        },
        {
          id: 'reproduction', title: 'Suivi des reproductions', fields: [
            { id: 'mating_1', label: 'Saillie 1 — date prévue', placeholder: 'JJ/MM/AAAA', col: 1, type: 'date' },
            { id: 'litter_1', label: 'Portée 1 — nombre de chatons', placeholder: '0', col: 1 },
            { id: 'mating_2', label: 'Saillie 2 — date prévue', placeholder: 'JJ/MM/AAAA', col: 1, type: 'date' },
            { id: 'litter_2', label: 'Portée 2 — nombre de chatons', placeholder: '0', col: 1 }
          ]
        },
        {
          id: 'meta', title: 'Lieu et date', fields: [
            { id: 'sign_date', label: 'Date de signature', placeholder: 'JJ/MM/AAAA', col: 1, type: 'date' }
          ]
        }
      ],
      sections: [
        {
          h: 'Objet du contrat',
          p: 'Le présent contrat encadre la mise à disposition du chat à des fins d\'élevage. Il définit les responsabilités de l\'éleveur et du partenaire durant la période d\'activité reproductive.'
        },
        {
          h: 'Responsabilités de l\'éleveur',
          ul: [
            'Assurer les saillies conformément aux standards de la race',
            'Suivre le chat pendant la période de reproduction et garantir son bien-être',
            'Informer le partenaire de toute portée réalisée et des soins effectués',
            'Remettre les justificatifs de déclaration de portée (LOOF ou équivalent)'
          ]
        },
        {
          h: 'Engagements du partenaire',
          ul: [
            'Assurer une collaboration active pour les déplacements et soins nécessaires',
            'Maintenir les vaccins, traitements antiparasitaires et suivis vétérinaires à jour',
            'Respecter les périodes de repos du chat et signaler toute anomalie de santé',
            'Ne pas confier le chat à un tiers sans accord écrit de l\'éleveur'
          ]
        },
        {
          h: 'Durée et résiliation',
          p: 'Le présent contrat prend effet à la date de signature pour une durée initiale de 12 mois, renouvelable par tacite reconduction. Il peut être résilié par l\'une ou l\'autre des parties avec un préavis écrit de 30 jours. En cas de manquement grave aux obligations, la résiliation est immédiate après notification écrite.'
        }
      ]
    }
  };

  // ----- Utilitaires -----
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const e = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v != null && v !== false) el.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null || c === false) return;
      el.append(c.nodeType ? c : document.createTextNode(String(c)));
    });
    return el;
  };

  function toast(message, kind = '') {
    const t = $('#toast');
    t.textContent = message;
    t.className = 'toast show ' + kind;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2400);
  }

  function showOverlay(label = 'Génération du PDF…') {
    $('#overlayLabel').textContent = label;
    $('#overlay').classList.add('show');
  }
  function hideOverlay() { $('#overlay').classList.remove('show'); }

  function formatDateFr(value) {
    if (!value) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split('-');
      return `${d}/${m}/${y}`;
    }
    return value;
  }

  function todayIso() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function sanitize(name) {
    return (name || 'document').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_') || 'document';
  }

  // ----- État + persistance -----
  const state = {
    currentDoc: null,
    data: {},      // { contractId: { fieldId: value } }
    logo: null,    // dataURL
    signatures: {} // { contractId: dataURL }
  };

  function storeKey(contractId) { return STORAGE_PREFIX + 'doc.' + contractId; }
  function sigKey(contractId) { return STORAGE_PREFIX + 'sig.' + contractId; }

  function loadAll() {
    try {
      state.logo = localStorage.getItem(LOGO_KEY) || null;
      Object.keys(CONTRACTS).forEach(id => {
        const raw = localStorage.getItem(storeKey(id));
        state.data[id] = raw ? JSON.parse(raw) : {};
        state.signatures[id] = localStorage.getItem(sigKey(id)) || null;
      });
    } catch (err) { console.warn('load failed', err); }
  }

  let saveTimer = null;
  function markDirty() {
    const s = $('#saveState');
    s.classList.add('dirty');
    $('#saveLabel').textContent = 'Sauvegarde…';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveCurrent, 400);
  }
  function saveCurrent() {
    if (!state.currentDoc) return;
    try {
      localStorage.setItem(storeKey(state.currentDoc), JSON.stringify(state.data[state.currentDoc] || {}));
    } catch (err) { console.warn('save failed', err); }
    const s = $('#saveState');
    s.classList.remove('dirty');
    $('#saveLabel').textContent = 'Tout est sauvegardé';
  }

  // ----- Rendu d'un contrat -----
  function renderField(field, contractId) {
    const value = state.data[contractId]?.[field.id] ?? '';
    let input;
    if (field.type === 'textarea') {
      input = e('textarea', { id: 'f_' + field.id, placeholder: field.placeholder || '', rows: 3 });
      input.value = value;
    } else if (field.type === 'select') {
      input = e('select', { id: 'f_' + field.id });
      input.append(e('option', { value: '' }, '— Sélectionner —'));
      (field.options || []).forEach(opt => {
        const o = e('option', { value: opt }, opt);
        if (opt === value) o.selected = true;
        input.append(o);
      });
    } else {
      input = e('input', {
        id: 'f_' + field.id,
        type: field.type === 'date' ? 'date' : (field.type || 'text'),
        placeholder: field.placeholder || '',
        autocomplete: 'off'
      });
      input.value = value;
    }
    input.addEventListener('input', () => {
      state.data[contractId] = state.data[contractId] || {};
      state.data[contractId][field.id] = input.value;
      markDirty();
    });
    input.addEventListener('change', () => {
      state.data[contractId] = state.data[contractId] || {};
      state.data[contractId][field.id] = input.value;
      markDirty();
    });

    const wrap = e('div', { class: 'field' + (field.col === 2 ? ' grid-full' : '') }, [
      e('label', { for: 'f_' + field.id }, field.label),
      input
    ]);
    return wrap;
  }

  function renderCard(card, contractId) {
    const grid = e('div', { class: 'grid-2' });
    card.fields.forEach(f => grid.append(renderField(f, contractId)));
    return e('div', { class: 'card' }, [
      e('h3', { class: 'section-title', style: 'margin-top:0' }, card.title),
      grid
    ]);
  }

  function renderTextBlock(sections) {
    const block = e('div', { class: 'text-block' });
    sections.forEach(s => {
      if (s.h) block.append(e('h3', {}, s.h));
      if (s.p) block.append(e('p', {}, s.p));
      if (s.intro) block.append(e('p', {}, e('strong', {}, s.intro)));
      if (s.ul) {
        const ul = e('ul');
        s.ul.forEach(li => ul.append(e('li', {}, li)));
        block.append(ul);
      }
    });
    return block;
  }

  function renderBreederCard() {
    return e('div', { class: 'card' }, [
      e('h3', { class: 'section-title', style: 'margin-top:0' }, 'Éleveur'),
      e('div', { class: 'grid-2' }, [
        e('div', { class: 'field' }, [e('label', {}, 'Éleveur'), e('input', { type: 'text', value: BREEDER.name, readonly: 'readonly' })]),
        e('div', { class: 'field' }, [e('label', {}, 'SIRET'), e('input', { type: 'text', value: BREEDER.siret, readonly: 'readonly' })]),
        e('div', { class: 'field grid-full' }, [e('label', {}, 'Adresse'), e('input', { type: 'text', value: BREEDER.address + ', ' + BREEDER.city, readonly: 'readonly' })]),
        e('div', { class: 'field' }, [e('label', {}, 'Téléphone'), e('input', { type: 'text', value: BREEDER.phone, readonly: 'readonly' })]),
        e('div', { class: 'field' }, [e('label', {}, 'Email'), e('input', { type: 'text', value: BREEDER.email, readonly: 'readonly' })])
      ])
    ]);
  }

  function renderSignatureBlock(contractId) {
    const wrap = e('div', { class: 'sig-grid' });

    // Acquéreur
    const padWrap = e('div', { class: 'sig-pad-wrap' + (state.signatures[contractId] ? ' has-sig' : '') });
    const canvas = e('canvas', { class: 'sig-pad', id: 'sigCanvas_' + contractId, width: 600, height: 300 });
    const empty = e('div', { class: 'sig-pad-empty' }, 'Signez ici');
    padWrap.append(canvas, empty);

    setupSignaturePad(canvas, contractId);
    if (state.signatures[contractId]) restoreSignature(canvas, state.signatures[contractId]);

    const sigName = (state.data[contractId]?.['acq_name'] || '');
    const acqCol = e('div', { class: 'sig-col' }, [
      e('h3', {}, 'L\'Acquéreur'),
      padWrap,
      e('div', { class: 'sig-actions' }, [
        e('span', {}, 'Signature manuscrite'),
        e('button', { class: 'sig-clear', type: 'button', onclick: () => clearSignature(canvas, contractId) }, 'Effacer')
      ]),
      e('div', { class: 'sig-name', id: 'sigName_' + contractId }, sigName || 'Nom de l\'acquéreur')
    ]);

    // Éleveur
    const breederCol = e('div', { class: 'sig-col' }, [
      e('h3', {}, 'L\'Éleveur'),
      e('div', { class: 'breeder-sig' }, [
        e('div', { class: 'sig-name-script' }, 'Stéphanie Jimenez')
      ]),
      e('div', { class: 'sig-actions' }, [
        e('span', {}, 'Signature certifiée'),
        e('span', { class: 'pill' }, BREEDER.name)
      ]),
      e('div', { class: 'sig-name' }, BREEDER.name)
    ]);

    wrap.append(acqCol, breederCol);
    return wrap;
  }

  function renderContract(id) {
    const c = CONTRACTS[id];
    if (!c) return;
    state.currentDoc = id;
    localStorage.setItem(LAST_DOC_KEY, id);

    const root = $('#content');
    root.innerHTML = '';

    root.append(
      e('div', { class: 'doc-info' }, [
        e('span', { class: 'pill' }, c.title),
        e('span', { class: 'pill muted' }, 'SIRET ' + BREEDER.siret),
        c.subtitle ? e('span', { class: 'pill muted' }, c.subtitle) : null
      ])
    );

    root.append(renderBreederCard());
    c.cards.forEach(card => root.append(renderCard(card, id)));
    root.append(renderTextBlock(c.sections));
    root.append(renderSignatureBlock(id));

    // Mettre à jour le label de signature quand le nom change
    const nameInput = $('#f_acq_name');
    const nameLabel = $('#sigName_' + id);
    if (nameInput && nameLabel) {
      const sync = () => { nameLabel.textContent = nameInput.value || 'Nom de l\'acquéreur'; };
      nameInput.addEventListener('input', sync);
      sync();
    }
  }

  // ----- Signature Pad (canvas) -----
  function setupSignaturePad(canvas, contractId) {
    const ctx = canvas.getContext('2d');
    // Adapter à la résolution écran
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const cssWidth = canvas.offsetWidth || 600;
    const cssHeight = canvas.offsetHeight || 150;
    canvas.width = cssWidth * ratio;
    canvas.height = cssHeight * ratio;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0f172a';

    let drawing = false;
    let last = null;
    let hasContent = !!state.signatures[contractId];

    function getPos(ev) {
      const rect = canvas.getBoundingClientRect();
      const t = ev.touches ? ev.touches[0] : ev;
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    function start(ev) {
      ev.preventDefault();
      drawing = true;
      last = getPos(ev);
    }
    function move(ev) {
      if (!drawing) return;
      ev.preventDefault();
      const p = getPos(ev);
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
      if (!hasContent) {
        hasContent = true;
        canvas.parentElement.classList.add('has-sig');
      }
    }
    function end() {
      if (!drawing) return;
      drawing = false;
      // sauvegarde
      try {
        const data = canvas.toDataURL('image/png');
        state.signatures[contractId] = data;
        localStorage.setItem(sigKey(contractId), data);
      } catch (err) { console.warn(err); }
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);
  }

  function restoreSignature(canvas, dataUrl) {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      ctx.drawImage(img, 0, 0, canvas.width / ratio, canvas.height / ratio);
    };
    img.src = dataUrl;
  }

  function clearSignature(canvas, contractId) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    state.signatures[contractId] = null;
    localStorage.removeItem(sigKey(contractId));
    canvas.parentElement.classList.remove('has-sig');
  }

  // ----- Logo upload (drag/drop + import) -----
  function setupLogoUpload() {
    const wrap = $('#brandLogo');
    const input = $('#logoInput');

    function applyLogo(dataUrl) {
      state.logo = dataUrl;
      try { localStorage.setItem(LOGO_KEY, dataUrl); } catch (_) {}
      renderLogo();
      toast('Logo enregistré', 'ok');
    }

    function readFile(file) {
      if (!file || !file.type.startsWith('image/')) {
        toast('Format d\'image non supporté', 'err');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast('Image trop volumineuse (5 Mo max)', 'err');
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => applyLogo(ev.target.result);
      reader.readAsDataURL(file);
    }

    wrap.addEventListener('click', () => input.click());
    wrap.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); input.click(); }
    });
    input.addEventListener('change', () => readFile(input.files[0]));

    ['dragenter', 'dragover'].forEach(evt => wrap.addEventListener(evt, ev => {
      ev.preventDefault(); ev.stopPropagation(); wrap.classList.add('dragging');
    }));
    ['dragleave', 'drop'].forEach(evt => wrap.addEventListener(evt, ev => {
      ev.preventDefault(); ev.stopPropagation(); wrap.classList.remove('dragging');
    }));
    wrap.addEventListener('drop', ev => {
      if (ev.dataTransfer?.files?.length) readFile(ev.dataTransfer.files[0]);
    });

    // Drop global (toute la fenêtre)
    ['dragover', 'drop'].forEach(evt => document.addEventListener(evt, ev => ev.preventDefault()));

    // Long press / contextmenu sur le logo = supprimer
    wrap.addEventListener('contextmenu', ev => {
      if (!state.logo) return;
      ev.preventDefault();
      if (confirm('Supprimer le logo ?')) {
        state.logo = null;
        localStorage.removeItem(LOGO_KEY);
        renderLogo();
      }
    });
  }

  function renderLogo() {
    const wrap = $('#brandLogo');
    wrap.classList.toggle('has-logo', !!state.logo);
    wrap.querySelector('img')?.remove();
    if (state.logo) {
      const img = new Image();
      img.src = state.logo;
      img.alt = 'Logo de la chatterie';
      wrap.append(img);
      $('#brandPlaceholder').style.display = 'none';
    } else {
      $('#brandPlaceholder').style.display = '';
    }
  }

  // ----- Reset -----
  function resetCurrent() {
    if (!state.currentDoc) return;
    if (!confirm('Réinitialiser tous les champs de ce contrat ?')) return;
    state.data[state.currentDoc] = {};
    state.signatures[state.currentDoc] = null;
    localStorage.removeItem(storeKey(state.currentDoc));
    localStorage.removeItem(sigKey(state.currentDoc));
    renderContract(state.currentDoc);
    toast('Contrat réinitialisé', 'ok');
  }

  // ----- Génération PDF (pdfmake, vectoriel) -----
  function pdfHeader(contract) {
    const cols = [];

    if (state.logo) {
      cols.push({ image: state.logo, fit: [72, 72], margin: [0, 0, 0, 0] });
    } else {
      cols.push({ text: '', width: 72 });
    }

    cols.push({
      stack: [
        { text: 'CHATTERIE DE LA GRÂCE', style: 'brandTitle' },
        { text: BREEDER.address, style: 'brandLine' },
        { text: BREEDER.city, style: 'brandLine' },
        { text: BREEDER.phone + '  ·  ' + BREEDER.email, style: 'brandLine' },
        { text: 'SIRET ' + BREEDER.siret, style: 'brandLine' }
      ],
      width: '*',
      margin: [12, 4, 0, 0]
    });

    cols.push({
      stack: [
        {
          table: {
            body: [[{ text: contract.title.toUpperCase(), color: 'white', bold: true, fontSize: 8, characterSpacing: 0.8 }]]
          },
          layout: {
            hLineWidth: () => 0, vLineWidth: () => 0,
            fillColor: () => ROSE,
            paddingTop: () => 5, paddingBottom: () => 5,
            paddingLeft: () => 10, paddingRight: () => 10
          }
        },
        { text: 'Établi le ' + formatDateFr(todayIso()), style: 'docDate', alignment: 'right', margin: [0, 4, 0, 0] }
      ],
      width: 'auto',
      alignment: 'right'
    });

    return {
      columns: cols,
      columnGap: 12,
      margin: [0, 0, 0, 16]
    };
  }

  function pdfInfoTable(rows) {
    return {
      table: {
        widths: ['28%', '*'],
        body: rows.map(([label, value]) => ([
          { text: label, style: 'labelCell' },
          { text: value || '—', style: 'valueCell' }
        ]))
      },
      layout: {
        hLineWidth: () => 0.5,
        vLineWidth: () => 0,
        hLineColor: () => '#ffd6e9',
        paddingTop: () => 6,
        paddingBottom: () => 6,
        paddingLeft: () => 10,
        paddingRight: () => 10,
        fillColor: (rowIndex) => rowIndex % 2 === 0 ? '#fff5fa' : null
      },
      margin: [0, 0, 0, 14]
    };
  }

  function pdfSectionTitle(text) {
    return {
      stack: [
        { text: text.toUpperCase(), style: 'sectionTitle' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 50, y2: 0, lineWidth: 2, lineColor: ROSE }] }
      ],
      margin: [0, 12, 0, 8]
    };
  }

  function pdfTextSections(sections) {
    const out = [];
    sections.forEach(s => {
      if (s.h) out.push({ text: s.h, style: 'h3' });
      if (s.p) out.push({ text: s.p, style: 'para' });
      if (s.intro) out.push({ text: s.intro, style: 'paraStrong' });
      if (s.ul) {
        out.push({
          ul: s.ul.map(li => ({ text: li, style: 'liItem' })),
          margin: [4, 4, 0, 8]
        });
      }
    });
    return out;
  }

  function buildPdfDoc(contractId) {
    const c = CONTRACTS[contractId];
    const data = state.data[contractId] || {};
    const sig = state.signatures[contractId];

    const get = id => data[id] || '';
    const getDate = id => formatDateFr(data[id]);

    const content = [];

    // En-tête
    content.push(pdfHeader(c));

    // Titre + sous-titre
    content.push({
      stack: [
        { text: c.title, style: 'pageTitle' },
        c.subtitle ? { text: c.subtitle, style: 'pageSub' } : null
      ].filter(Boolean),
      margin: [0, 4, 0, 14]
    });

    // Bloc parties
    content.push(pdfSectionTitle('Entre les soussignés'));
    content.push({
      columns: [
        {
          width: '*',
          stack: [
            { text: 'L\'ÉLEVEUR', style: 'partyHead' },
            { text: BREEDER.name, style: 'partyName' },
            { text: BREEDER.address, style: 'partyLine' },
            { text: BREEDER.city, style: 'partyLine' },
            { text: BREEDER.phone, style: 'partyLine' },
            { text: BREEDER.email, style: 'partyLine' },
            { text: 'SIRET ' + BREEDER.siret, style: 'partyLine' }
          ]
        },
        { width: 12, text: '' },
        {
          width: '*',
          stack: [
            { text: 'L\'ACQUÉREUR', style: 'partyHead' },
            { text: get('acq_name') || '—', style: 'partyName' },
            { text: get('acq_addr') || '—', style: 'partyLine' },
            { text: ((get('acq_zip') + ' ' + get('acq_city')).trim() || '—'), style: 'partyLine' },
            { text: get('acq_phone') || '—', style: 'partyLine' },
            { text: get('acq_email') || '—', style: 'partyLine' }
          ]
        }
      ],
      margin: [0, 0, 0, 12]
    });

    // Tableau du chat
    content.push(pdfSectionTitle('Animal concerné'));
    const catRows = [];
    if (get('cat_name')) catRows.push(['Nom', get('cat_name')]);
    if (get('cat_breed')) catRows.push(['Race', get('cat_breed')]);
    if (get('cat_dob')) catRows.push(['Date de naissance', getDate('cat_dob')]);
    if (get('cat_sex')) catRows.push(['Sexe', get('cat_sex')]);
    if (get('cat_color')) catRows.push(['Couleur / robe', get('cat_color')]);
    if (get('cat_chip')) catRows.push(['N° d\'identification', get('cat_chip')]);
    if (get('cat_parents')) catRows.push(['Parents', get('cat_parents')]);
    if (!catRows.length) catRows.push(['—', 'À compléter']);
    content.push(pdfInfoTable(catRows));

    // Modalités financières / autres cards
    c.cards.forEach(card => {
      if (card.id === 'acquirer' || card.id === 'cat') return;
      const rows = card.fields.map(f => {
        let v = get(f.id);
        if (f.type === 'date') v = getDate(f.id);
        if (v && f.id !== 'notes' && f.id !== 'other_fees') v = String(v);
        return [f.label, v];
      }).filter(r => r[1]); // afficher seulement les champs renseignés
      if (rows.length) {
        content.push(pdfSectionTitle(card.title));
        content.push(pdfInfoTable(rows));
      }
    });

    // Texte du contrat
    content.push(pdfSectionTitle('Clauses du contrat'));
    content.push(...pdfTextSections(c.sections));

    // Lieu et date
    const signDate = getDate('sign_date') || formatDateFr(todayIso());
    content.push({
      text: `Fait à ${BREEDER.place}, le ${signDate}, en deux exemplaires originaux.`,
      style: 'closing',
      margin: [0, 14, 0, 14]
    });

    // Signatures (2 colonnes)
    const sigStack = [
      { text: 'L\'ACQUÉREUR', style: 'sigHead' },
      { text: get('acq_name') || '________________________', style: 'sigName' }
    ];
    if (sig) {
      sigStack.splice(1, 0, { image: sig, fit: [200, 80], alignment: 'center', margin: [0, 6, 0, 6] });
    } else {
      sigStack.splice(1, 0, {
        canvas: [{ type: 'rect', x: 0, y: 0, w: 200, h: 60, lineColor: '#e5e7eb', lineWidth: 1 }],
        margin: [0, 6, 0, 6]
      });
    }

    const breederSig = {
      stack: [
        { text: 'L\'ÉLEVEUR', style: 'sigHead' },
        // Signature manuscrite "stylée"
        {
          text: 'Stéphanie Jimenez',
          font: 'Roboto',
          italics: true,
          fontSize: 22,
          color: ROSE_DEEP,
          alignment: 'center',
          margin: [0, 14, 0, 14]
        },
        { text: BREEDER.name, style: 'sigName' }
      ]
    };

    content.push({
      columns: [
        { width: '*', stack: sigStack },
        { width: 20, text: '' },
        { width: '*', stack: breederSig.stack }
      ],
      margin: [0, 8, 0, 0]
    });

    return {
      pageSize: 'A4',
      pageMargins: [40, 50, 40, 60],
      info: {
        title: c.title,
        author: BREEDER.name,
        subject: c.title + ' — Chatterie de la Grâce',
        keywords: 'chatterie, contrat, élevage, ' + (get('cat_breed') || ''),
        creator: 'Chatterie de la Grâce',
        producer: 'Chatterie de la Grâce — Outil de contrats'
      },
      footer: (currentPage, pageCount) => ({
        columns: [
          {
            text: 'Chatterie de la Grâce  ·  SIRET ' + BREEDER.siret,
            alignment: 'left',
            style: 'footerText',
            margin: [40, 20, 0, 0]
          },
          {
            text: `Page ${currentPage} / ${pageCount}`,
            alignment: 'right',
            style: 'footerText',
            margin: [0, 20, 40, 0]
          }
        ]
      }),
      background: () => ({
        canvas: [
          { type: 'rect', x: 0, y: 0, w: 595.28, h: 6, color: ROSE }
        ]
      }),
      content,
      styles: {
        brandTitle: { fontSize: 12, bold: true, color: ROSE_DEEP, characterSpacing: 1 },
        brandLine: { fontSize: 8, color: INK_SOFT, margin: [0, 1, 0, 0] },
        docDate: { fontSize: 8, color: INK_SOFT, italics: true },
        pageTitle: { fontSize: 22, bold: true, color: ROSE_DEEP, alignment: 'center' },
        pageSub: { fontSize: 10, color: INK_SOFT, alignment: 'center', italics: true, margin: [0, 4, 0, 0] },
        sectionTitle: { fontSize: 11, bold: true, color: ROSE_DEEP, characterSpacing: 0.8, margin: [0, 0, 0, 4] },
        labelCell: { fontSize: 9, bold: true, color: INK_SOFT },
        valueCell: { fontSize: 10, color: INK },
        partyHead: { fontSize: 9, bold: true, color: ROSE_DEEP, margin: [0, 0, 0, 6] },
        partyName: { fontSize: 12, bold: true, color: INK, margin: [0, 0, 0, 3] },
        partyLine: { fontSize: 9, color: INK_SOFT, margin: [0, 1, 0, 0] },
        h3: { fontSize: 11, bold: true, color: ROSE_DEEP, margin: [0, 10, 0, 4] },
        para: { fontSize: 10, color: INK, alignment: 'justify', lineHeight: 1.4, margin: [0, 2, 0, 4] },
        paraStrong: { fontSize: 10, bold: true, color: INK, margin: [0, 4, 0, 2] },
        liItem: { fontSize: 10, color: INK, lineHeight: 1.35, margin: [0, 1, 0, 1] },
        closing: { fontSize: 10, italics: true, color: INK_SOFT, alignment: 'center' },
        sigHead: { fontSize: 9, bold: true, color: ROSE_DEEP, alignment: 'center' },
        sigName: { fontSize: 10, bold: true, color: INK, alignment: 'center', margin: [0, 4, 0, 0] },
        footerText: { fontSize: 8, color: '#9ca3af' }
      },
      defaultStyle: {
        font: 'Roboto',
        fontSize: 10,
        color: INK,
        lineHeight: 1.4
      }
    };
  }

  function currentPdf() {
    const c = CONTRACTS[state.currentDoc];
    const data = state.data[state.currentDoc] || {};
    const docDef = buildPdfDoc(state.currentDoc);
    const client = sanitize(data.acq_name || 'Client');
    const date = todayIso();
    const filename = `${c.filename}_${client}_${date}.pdf`;
    return { pdf: pdfMake.createPdf(docDef), filename };
  }

  async function exportPdf() {
    if (!state.currentDoc) return;
    if (typeof pdfMake === 'undefined') {
      toast('Module PDF non chargé', 'err');
      return;
    }
    showOverlay('Génération du PDF…');
    try {
      const { pdf, filename } = currentPdf();
      await new Promise(resolve => pdf.download(filename, resolve));
      toast('PDF généré', 'ok');
    } catch (err) {
      console.error(err);
      toast('Erreur PDF : ' + err.message, 'err');
    } finally {
      hideOverlay();
    }
  }

  // Impression : envoie le PDF à l'imprimante (AirPrint, Mopria, locale…).
  // Fonctionne en PWA sur iOS et Android, et sur tous les navigateurs desktop.
  async function printDoc() {
    if (!state.currentDoc) return;
    if (typeof pdfMake === 'undefined') {
      toast('Module d\'impression non chargé', 'err');
      return;
    }
    showOverlay('Préparation de l\'impression…');
    try {
      const { pdf, filename } = currentPdf();

      // iOS Safari/PWA : window.open est souvent bloqué ou ne lance pas le dialog.
      // → on télécharge le PDF, le Files app permettra de l'imprimer via AirPrint.
      const ua = navigator.userAgent || '';
      const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true;

      if (isIOS) {
        // Sur iPhone/iPad : ouvre le PDF dans un nouvel onglet quand c'est possible
        // (Safari déclenche l'impression via Partager → Imprimer / AirPrint).
        // En PWA installée, fallback sur téléchargement.
        if (isStandalone) {
          await new Promise(resolve => pdf.download(filename, resolve));
          toast('PDF prêt — ouvrez Fichiers puis Partager → Imprimer', 'ok');
        } else {
          pdf.getBlob(blob => {
            const url = URL.createObjectURL(blob);
            const win = window.open(url, '_blank');
            if (!win) {
              // popup bloqué → forcer le téléchargement
              const a = document.createElement('a');
              a.href = url; a.download = filename;
              document.body.appendChild(a); a.click(); a.remove();
              toast('PDF prêt — Partager → Imprimer', 'ok');
            } else {
              toast('PDF ouvert — Partager → Imprimer', 'ok');
            }
            setTimeout(() => URL.revokeObjectURL(url), 60000);
          });
        }
      } else {
        // Android, desktop : pdfmake.print() ouvre le PDF dans une fenêtre
        // et lance automatiquement le dialogue d'impression du navigateur,
        // qui propose toutes les imprimantes du système (locale, réseau, AirPrint, Mopria).
        pdf.print({}, window);
        toast('Dialogue d\'impression ouvert', 'ok');
      }
    } catch (err) {
      console.error(err);
      toast('Erreur impression : ' + err.message, 'err');
      // Dernier recours : impression du HTML.
      try { window.print(); } catch (_) {}
    } finally {
      // Petit délai pour laisser le dialogue s'ouvrir avant de masquer l'overlay
      setTimeout(hideOverlay, 600);
    }
  }

  // ----- Install PWA -----
  let deferredPrompt = null;
  function setupInstall() {
    window.addEventListener('beforeinstallprompt', ev => {
      ev.preventDefault();
      deferredPrompt = ev;
      $('#installBanner').classList.add('show');
    });
    $('#installBtn').addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      $('#installBanner').classList.remove('show');
      if (outcome === 'accepted') toast('Application installée', 'ok');
      deferredPrompt = null;
    });
    $('#installDismiss').addEventListener('click', () => {
      $('#installBanner').classList.remove('show');
      sessionStorage.setItem('install.dismissed', '1');
    });
    window.addEventListener('appinstalled', () => {
      $('#installBanner').classList.remove('show');
      toast('Installation terminée', 'ok');
    });
  }

  // ----- Service worker -----
  function setupSW() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => console.warn('SW:', err));
      });
    }
  }

  // ----- Bootstrap -----
  function buildSelect() {
    const sel = $('#docSelect');
    Object.entries(CONTRACTS).forEach(([id, c]) => {
      sel.append(e('option', { value: id }, c.title));
    });
    sel.addEventListener('change', () => renderContract(sel.value));
  }

  function init() {
    loadAll();
    buildSelect();
    setupLogoUpload();
    renderLogo();

    const last = localStorage.getItem(LAST_DOC_KEY);
    const initial = (last && CONTRACTS[last]) ? last : Object.keys(CONTRACTS)[0];
    $('#docSelect').value = initial;
    renderContract(initial);

    $('#btnPrint').addEventListener('click', printDoc);
    $('#btnPdf').addEventListener('click', exportPdf);
    $('#btnReset').addEventListener('click', resetCurrent);

    setupInstall();
    setupSW();

    // Save before unload
    window.addEventListener('beforeunload', saveCurrent);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
