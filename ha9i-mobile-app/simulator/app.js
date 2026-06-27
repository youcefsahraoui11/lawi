// HA9I - Mobile App Simulator Logic

// Translation Database (Matching ar.json, fr.json, en.json)
const translations = {
  ar: {
    "common.app_subtitle": "المساعد القانوني الجزائري",
    "common.loading": "جاري التحميل...",
    "common.save": "حفظ",
    "common.submit": "إرسال",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.back": "رجوع",
    "common.wilaya": "الولاية",
    "common.specialization": "التخصص",
    "common.phone": "رقم الهاتف",
    "common.email": "البريد الإلكتروني",
    "common.password": "كلمة المرور",
    "common.logout": "تسجيل الخروج",
    "common.required": "هذا الحقل مطلوب",
    "common.invalid_email": "بريد إلكتروني غير صالح",
    "common.confirm": "تأكيد",
    "language_select.title": "اختر اللغة",
    "language_select.subtitle": "يرجى اختيار لغة استخدام التطبيق",
    "auth.login_title": "تسجيل الدخول",
    "auth.login_subtitle": "الدخول إلى حساب المواطن الخاص بك",
    "auth.register_title": "إنشاء حساب مواطن",
    "auth.register_subtitle": "سجل للحصول على المساعدة والشكاوى الإلكترونية",
    "auth.first_name": "الاسم الأول",
    "auth.last_name": "اللقب",
    "auth.national_id": "رقم التعريف الوطني (NIN)",
    "auth.passport_number": "رقم جواز السفر",
    "auth.id_type_nin": "رقم التعريف الوطني",
    "auth.id_type_passport": "جواز السفر",
    "auth.dont_have_account": "ليس لديك حساب؟ سجل الآن",
    "auth.already_have_account": "لديك حساب بالفعل؟ سجل دخولك",
    "auth.login_btn": "دخول",
    "auth.register_btn": "تسجيل",
    "home.dashboard_title": "البوابة القانونية للمواطن",
    "home.welcome": "مرحباً بك في تطبيق حقي",
    "home.service_assistant": "المساعد القانوني",
    "home.service_lawyers": "دليل المحامين",
    "home.service_complaints": "شكوى إلكترونية",
    "home.service_resources": "الموارد القانونية",
    "home.service_scanner": "ماسح الإجراءات",
    "assistant.title": "المساعد القانوني",
    "assistant.placeholder": "اكتب سؤالك القانوني هنا...",
    "assistant.welcome_msg": "مرحباً بك في المساعد القانوني. كيف يمكنني مساعدتك في القوانين الجزائرية اليوم؟ (ملاحظة: هذا النظام للمساعدة الإرشادية فقط).",
    "assistant.disclaimer": "إخلاء مسؤولية: هذا النظام استرشادي ولا يغني عن استشارة محامٍ معتمد.",
    "lawyers.title": "دليل المحامين",
    "lawyers.filter_wilaya": "اختر الولاية",
    "lawyers.filter_specialty": "اختر التخصص",
    "lawyers.view_location": "عرض الموقع على الخريطة",
    "lawyers.no_lawyers": "لا يوجد محامون يطابقون خيارات البحث.",
    "lawyers.phone_call": "اتصال",
    "complaints.title": "إيداع شكوى إلكترونية",
    "complaints.tracking_title": "متابعة الشكاوى",
    "complaints.new_complaint": "شكوى جديدة",
    "complaints.status_under_verification": "قيد التحقق",
    "complaints.status_submitted": "تم الإيداع",
    "complaints.status_under_review": "قيد الدراسة",
    "complaints.status_accepted": "مقبولة",
    "complaints.status_contact_citizen": "الاتصال بالمواطن",
    "complaints.status_rejected": "مرفوضة",
    "complaints.sec_complainant": "معلومات الشاكي",
    "complaints.complainant_nature": "طبيعة الشاكي",
    "complaints.complainant_nature_person": "شخص طبيعي",
    "complaints.complainant_nature_moral": "شخص معنوي",
    "complaints.last_name": "اللقب (بالعربية)",
    "complaints.last_name_latin": "اللقب (باللاتينية)",
    "complaints.first_name": "الاسم (بالعربية)",
    "complaints.first_name_latin": "الاسم (باللاتينية)",
    "complaints.gender": "الجنس",
    "complaints.gender_male": "ذكر",
    "complaints.gender_female": "أنثى",
    "complaints.sec_birth": "معلومات الميلاد",
    "complaints.birth_date": "تاريخ الميلاد",
    "complaints.birth_country": "بلد الميلاد",
    "complaints.birth_wilaya": "ولاية الميلاد",
    "complaints.birth_commune": "بلدية الميلاد",
    "complaints.birth_cert_num": "رقم شهادة الميلاد",
    "complaints.sec_family": "معلومات عائلية",
    "complaints.father_name": "اسم الأب كامل",
    "complaints.mother_name": "اسم الأم كامل",
    "complaints.sec_national_id": "الهوية الوطنية",
    "complaints.nin": "رقم التعريف الوطني",
    "complaints.sec_document": "وثيقة إثبات الهوية",
    "complaints.doc_type": "نوع الوثيقة",
    "complaints.doc_number": "رقم الوثيقة",
    "complaints.doc_issue_date": "تاريخ الإصدار",
    "complaints.doc_issued_by": "جهة الإصدار",
    "complaints.sec_residence": "معلومات الإقامة",
    "complaints.residence_address": "عنوان الإقامة",
    "complaints.residence_wilaya": "ولاية الإقامة",
    "complaints.residence_commune": "بلدية الإقامة",
    "complaints.sec_contact": "معلومات الاتصال",
    "complaints.mobile_phone": "رقم الهاتف المحمول",
    "complaints.confirm_mobile_phone": "تأكيد رقم الهاتف المحمول",
    "complaints.confirm_email": "تأكيد البريد الإلكتروني",
    "complaints.success_msg": "تم إيداع شكواك بنجاح وهي الآن قيد التحقق القانوني.",
    "resources.title": "الموارد القانونية",
    "resources.search_placeholder": "ابحث في القوانين والمراسيم...",
    "resources.cat_civil": "القانون المدني",
    "resources.cat_criminal": "قانون العقوبات",
    "resources.cat_family": "قانون الأسرة",
    "resources.cat_admin": "القانون الإداري",
    "resources.cat_labor": "قانون العمل",
    "resources.cat_constitution": "الدستور",
    "resources.cat_official": "الجريدة الرسمية",
    "resources.download_pdf": "تحميل PDF",
    "resources.preview_pdf": "معاينة المستند",
    "scanner.title": "ماسح الإجراءات",
    "scanner.instructions": "قم بتصوير أو تحميل المستند لمعرفة الإجراءات الإدارية والمكاتب المطلوبة.",
    "scanner.upload_btn": "تحميل مستند",
    "scanner.take_photo_btn": "التقاط صورة",
    "scanner.scanning": "جاري فحص المستند واستخراج الإجراءات...",
    "scanner.result_title": "الإجراءات الإدارية المطلوبة",
    "scanner.required_procedures": "الإجراءات المطلوبة",
    "scanner.required_offices": "المكاتب والإدارات المعنية",
    "scanner.required_documents": "الوثائق المرافقة المطلوبة",
    "scanner.example_birth_cert": "شهادة ميلاد رقم 12",
    "profile.title": "الحساب الشخصي",
    "profile.personal_info": "المعلومات الشخصية",
    "profile.settings_language": "لغة التطبيق",
    "profile.complaint_history": "سجل الشكاوى الخاصة بي"
  },
  fr: {
    "common.app_subtitle": "Assistant Juridique Algérien",
    "common.loading": "Chargement...",
    "common.save": "Enregistrer",
    "common.submit": "Soumettre",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.back": "Retour",
    "common.wilaya": "Wilaya",
    "common.specialization": "Spécialité",
    "common.phone": "Téléphone",
    "common.email": "E-mail",
    "common.password": "Mot de passe",
    "common.logout": "Se déconnecter",
    "common.required": "Requis",
    "common.invalid_email": "E-mail invalide",
    "common.confirm": "Confirmer",
    "language_select.title": "Choisir la Langue",
    "language_select.subtitle": "Veuillez choisir la langue d'utilisation",
    "auth.login_title": "Connexion",
    "auth.login_subtitle": "Accédez à votre espace citoyen",
    "auth.register_title": "Créer un Compte Citoyen",
    "auth.register_subtitle": "Enregistrez-vous pour l'assistance",
    "auth.first_name": "Prénom",
    "auth.last_name": "Nom",
    "auth.national_id": "NIN",
    "auth.passport_number": "Numéro de Passeport",
    "auth.id_type_nin": "NIN",
    "auth.id_type_passport": "Passeport",
    "auth.dont_have_account": "Pas de compte ? S'inscrire",
    "auth.already_have_account": "Déjà un compte ? Se connecter",
    "auth.login_btn": "Se connecter",
    "auth.register_btn": "S'inscrire",
    "home.dashboard_title": "Portail Juridique",
    "home.welcome": "Bienvenue sur HA9I",
    "home.service_assistant": "Assistant Juridique",
    "home.service_lawyers": "Annuaire des Avocats",
    "home.service_complaints": "Plainte Électronique",
    "home.service_resources": "Ressources Légales",
    "home.service_scanner": "Scanner de Procédure",
    "assistant.title": "Assistant Juridique",
    "assistant.placeholder": "Posez votre question juridique ici...",
    "assistant.welcome_msg": "Bienvenue sur l'Assistant Juridique. Comment puis-je vous aider concernant la législation algérienne aujourd'hui ? (Note: Ce système est purement indicatif).",
    "assistant.disclaimer": "Clause de non-responsabilité: Ce système est indicatif et ne remplace pas la consultation d'un avocat agréé.",
    "lawyers.title": "Annuaire des Avocats",
    "lawyers.filter_wilaya": "Sélectionner la Wilaya",
    "lawyers.filter_specialty": "Sélectionner la Spécialité",
    "lawyers.view_location": "Voir l'emplacement",
    "lawyers.no_lawyers": "Aucun avocat ne correspond.",
    "lawyers.phone_call": "Appeler",
    "complaints.title": "Dépôt de Plainte",
    "complaints.tracking_title": "Suivi des Plaintes",
    "complaints.new_complaint": "Nouvelle Plainte",
    "complaints.status_under_verification": "En cours de vérification",
    "complaints.status_submitted": "Soumise",
    "complaints.status_under_review": "En cours d'examen",
    "complaints.status_accepted": "Acceptée",
    "complaints.status_contact_citizen": "Contacter le citoyen",
    "complaints.status_rejected": "Rejetée",
    "complaints.sec_complainant": "Informations du Plaignant",
    "complaints.complainant_nature": "Nature du plaignant",
    "complaints.complainant_nature_person": "Personne physique",
    "complaints.complainant_nature_moral": "Personne morale",
    "complaints.last_name": "Nom (Arabe)",
    "complaints.last_name_latin": "Nom (Latin)",
    "complaints.first_name": "Prénom (Arabe)",
    "complaints.first_name_latin": "Prénom (Latin)",
    "complaints.gender": "Genre",
    "complaints.gender_male": "Homme",
    "complaints.gender_female": "Femme",
    "complaints.sec_birth": "Naissance",
    "complaints.birth_date": "Date de naissance",
    "complaints.birth_country": "Pays de naissance",
    "complaints.birth_wilaya": "Wilaya de naissance",
    "complaints.birth_commune": "Commune de naissance",
    "complaints.birth_cert_num": "Numéro d'acte de naissance",
    "complaints.sec_family": "Famille",
    "complaints.father_name": "Nom du père",
    "complaints.mother_name": "Nom de la mère",
    "complaints.sec_national_id": "Identification Nationale",
    "complaints.nin": "Numéro d'Identification National",
    "complaints.sec_document": "Pièce d'Identité",
    "complaints.doc_type": "Type de document",
    "complaints.doc_number": "Numéro du document",
    "complaints.doc_issue_date": "Date de délivrance",
    "complaints.doc_issued_by": "Délivré par",
    "complaints.sec_residence": "Résidence",
    "complaints.residence_address": "Adresse de résidence",
    "complaints.residence_wilaya": "Wilaya de résidence",
    "complaints.residence_commune": "Commune de résidence",
    "complaints.sec_contact": "Coordonnées de Contact",
    "complaints.mobile_phone": "Téléphone portable",
    "complaints.confirm_mobile_phone": "Confirmer le portable",
    "complaints.confirm_email": "Confirmer l'e-mail",
    "complaints.success_msg": "Votre plainte a été déposée avec succès.",
    "resources.title": "Ressources Légales",
    "resources.search_placeholder": "Rechercher dans les codes...",
    "resources.cat_civil": "Droit Civil",
    "resources.cat_criminal": "Droit Pénal",
    "resources.cat_family": "Droit Famille",
    "resources.cat_admin": "Droit Admin",
    "resources.cat_labor": "Droit Travail",
    "resources.cat_constitution": "Constitution",
    "resources.cat_official": "Journal Officiel",
    "resources.download_pdf": "Télécharger PDF",
    "resources.preview_pdf": "Aperçu",
    "scanner.title": "Scanner de Procédure",
    "scanner.instructions": "Chargez un document pour découvrir les démarches.",
    "scanner.upload_btn": "Charger",
    "scanner.take_photo_btn": "Photo",
    "scanner.scanning": "Analyse du document en cours...",
    "scanner.result_title": "Démarches Requises",
    "scanner.required_procedures": "Procédures requises",
    "scanner.required_offices": "Bureaux concernés",
    "scanner.required_documents": "Documents requis",
    "scanner.example_birth_cert": "Acte de naissance",
    "profile.title": "Profil Personnel",
    "profile.personal_info": "Informations Personnelles",
    "profile.settings_language": "Langue",
    "profile.complaint_history": "Mes plaintes"
  },
  en: {
    "common.app_subtitle": "Algerian Legal Assistant",
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.submit": "Submit",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.back": "Back",
    "common.wilaya": "Wilaya",
    "common.specialization": "Specialization",
    "common.phone": "Phone",
    "common.email": "Email",
    "common.password": "Password",
    "common.logout": "Logout",
    "common.required": "Required",
    "common.invalid_email": "Invalid Email",
    "common.confirm": "Confirm",
    "language_select.title": "Select Language",
    "language_select.subtitle": "Please choose your preferred language",
    "auth.login_title": "Login",
    "auth.login_subtitle": "Access your citizen space",
    "auth.register_title": "Create Citizen Account",
    "auth.register_subtitle": "Register for assistance and complaints",
    "auth.first_name": "First Name",
    "auth.last_name": "Last Name",
    "auth.national_id": "NIN",
    "auth.passport_number": "Passport Number",
    "auth.id_type_nin": "NIN",
    "auth.id_type_passport": "Passport",
    "auth.dont_have_account": "Don't have an account? Sign Up",
    "auth.already_have_account": "Already have an account? Login",
    "auth.login_btn": "Login",
    "auth.register_btn": "Register",
    "home.dashboard_title": "Citizen Legal Portal",
    "home.welcome": "Welcome to HA9I",
    "home.service_assistant": "Legal Assistant",
    "home.service_lawyers": "Lawyers Directory",
    "home.service_complaints": "Electronic Complaint",
    "home.service_resources": "Legal Resources",
    "home.service_scanner": "Procedure Scanner",
    "assistant.title": "Legal Assistant",
    "assistant.placeholder": "Type your question here...",
    "assistant.welcome_msg": "Welcome to the Legal Assistant. How can I assist you with Algerian legislation today? (Note: Guidance only).",
    "assistant.disclaimer": "Disclaimer: Guidance only and does not replace a licensed lawyer.",
    "lawyers.title": "Lawyers Directory",
    "lawyers.filter_wilaya": "Select Wilaya",
    "lawyers.filter_specialty": "Select Specialization",
    "lawyers.view_location": "View Location",
    "lawyers.no_lawyers": "No lawyers found.",
    "lawyers.phone_call": "Call",
    "complaints.title": "Submit Complaint",
    "complaints.tracking_title": "Complaint Tracking",
    "complaints.new_complaint": "New Complaint",
    "complaints.status_under_verification": "Under Verification",
    "complaints.status_submitted": "Submitted",
    "complaints.status_under_review": "Under Review",
    "complaints.status_accepted": "Accepted",
    "complaints.status_contact_citizen": "Contact Citizen",
    "complaints.status_rejected": "Rejected",
    "complaints.sec_complainant": "Complainant Info",
    "complaints.complainant_nature": "Nature of complainant",
    "complaints.complainant_nature_person": "Natural Person",
    "complaints.complainant_nature_moral": "Legal Entity",
    "complaints.last_name": "Last Name (Arabic)",
    "complaints.last_name_latin": "Last Name (Latin)",
    "complaints.first_name": "First Name (Arabic)",
    "complaints.first_name_latin": "First Name (Latin)",
    "complaints.gender": "Gender",
    "complaints.gender_male": "Male",
    "complaints.gender_female": "Female",
    "complaints.sec_birth": "Birth info",
    "complaints.birth_date": "Birth Date",
    "complaints.birth_country": "Birth Country",
    "complaints.birth_wilaya": "Birth Wilaya",
    "complaints.birth_commune": "Birth Commune",
    "complaints.birth_cert_num": "Birth Certificate Number",
    "complaints.sec_family": "Family info",
    "complaints.father_name": "Father Name",
    "complaints.mother_name": "Mother Name",
    "complaints.sec_national_id": "National Identification",
    "complaints.nin": "National Identification Number",
    "complaints.sec_document": "Identity Document",
    "complaints.doc_type": "Document Type",
    "complaints.doc_number": "Document Number",
    "complaints.doc_issue_date": "Issue Date",
    "complaints.doc_issued_by": "Issued By",
    "complaints.sec_residence": "Residence info",
    "complaints.residence_address": "Residence Address",
    "complaints.residence_wilaya": "Residence Wilaya",
    "complaints.residence_commune": "Residence Commune",
    "complaints.sec_contact": "Contact Details",
    "complaints.mobile_phone": "Mobile Phone",
    "complaints.confirm_mobile_phone": "Confirm Mobile Phone",
    "complaints.confirm_email": "Confirm Email",
    "complaints.success_msg": "Your complaint was successfully submitted.",
    "resources.title": "Legal Resources",
    "resources.search_placeholder": "Search codes...",
    "resources.cat_civil": "Civil Law",
    "resources.cat_criminal": "Criminal Law",
    "resources.cat_family": "Family Law",
    "resources.cat_admin": "Administrative Law",
    "resources.cat_labor": "Labor Law",
    "resources.cat_constitution": "Constitution",
    "resources.cat_official": "Official Gazette",
    "resources.download_pdf": "Download PDF",
    "resources.preview_pdf": "Preview",
    "scanner.title": "Procedure Scanner",
    "scanner.instructions": "Upload a document to find required administrative procedures.",
    "scanner.upload_btn": "Upload",
    "scanner.take_photo_btn": "Photo",
    "scanner.scanning": "Scanning document in progress...",
    "scanner.result_title": "Required Procedures",
    "scanner.required_procedures": "Procedures",
    "scanner.required_offices": "Relevant Offices",
    "scanner.required_documents": "Accompanying Documents",
    "scanner.example_birth_cert": "Birth Certificate",
    "profile.title": "Personal Profile",
    "profile.personal_info": "Personal Information",
    "profile.settings_language": "Language",
    "profile.complaint_history": "My Complaints"
  }
};

// Global State
let state = {
  language: 'ar',
  isAuthenticated: false,
  activeScreen: 'splash',
  user: null,
  complaints: [
    {
      id: 'COMP-2026-8912',
      submissionDate: '2026-06-15',
      status: 'under_review',
      firstName: 'Youcef',
      lastName: 'Benali',
      residenceWilaya: 'Alger',
      residenceCommune: 'Sidi M\'hamed',
    }
  ],
  chatHistory: [],
  selectedWilayaFilter: 'All',
  selectedSpecFilter: 'All',
  searchQuery: ''
};

// UI Elements
const viewport = document.getElementById('viewport');
const bottomNav = document.getElementById('bottom-nav');
const timeEl = document.getElementById('status-time');

// Update Clock time inside status bar
function updateClock() {
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// Translation Helper
function t(key) {
  const lang = state.language;
  return translations[lang][key] || key;
}

// Router/Navigation dispatcher
function navigateTo(screenName) {
  state.activeScreen = screenName;
  renderScreen();
  
  // Manage Bottom Tab visibility
  const noNavScreens = ['splash', 'lang_select', 'login', 'register', 'assistant', 'complaint_form', 'scanner'];
  if (noNavScreens.includes(screenName) || !state.isAuthenticated) {
    bottomNav.style.display = 'none';
  } else {
    bottomNav.style.display = 'flex';
    updateActiveBottomTab();
  }
}

// Bottom Tab navigation listeners
document.querySelectorAll('.nav-item').forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.getAttribute('data-tab');
    if (tabName === 'home') navigateTo('home');
    else if (tabName === 'lawyers') navigateTo('lawyers');
    else if (tabName === 'complaints') navigateTo('complaints_tracking');
    else if (tabName === 'resources') navigateTo('resources');
    else if (tabName === 'profile') navigateTo('profile');
  });
});

function updateActiveBottomTab() {
  document.querySelectorAll('.nav-item').forEach(button => {
    button.classList.remove('active');
    const tabName = button.getAttribute('data-tab');
    if (state.activeScreen === 'home' && tabName === 'home') button.classList.add('active');
    if (state.activeScreen === 'lawyers' && tabName === 'lawyers') button.classList.add('active');
    if (state.activeScreen === 'complaints_tracking' && tabName === 'complaints') button.classList.add('active');
    if (state.activeScreen === 'resources' && tabName === 'resources') button.classList.add('active');
    if (state.activeScreen === 'profile' && tabName === 'profile') button.classList.add('active');
  });
}

// Initial Launch Router Check
function init() {
  navigateTo('splash');
}

// Render screens dynamically
function renderScreen() {
  // Update HTML Lang Direction classes
  const screenContainer = document.getElementById('app-screen');
  if (state.language === 'ar') {
    screenContainer.setAttribute('dir', 'rtl');
    screenContainer.classList.remove('ltr');
  } else {
    screenContainer.setAttribute('dir', 'ltr');
    screenContainer.classList.add('ltr');
  }

  // Update i18n variables in static bottom navigation elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  const screen = state.activeScreen;
  viewport.innerHTML = ''; // Clear previous viewport

  switch (screen) {
    case 'splash':
      renderSplashScreen();
      break;
    case 'lang_select':
      renderLanguageSelectScreen();
      break;
    case 'login':
      renderLoginScreen();
      break;
    case 'register':
      renderRegisterScreen();
      break;
    case 'home':
      renderHomeScreen();
      break;
    case 'assistant':
      renderAssistantScreen();
      break;
    case 'lawyers':
      renderLawyersScreen();
      break;
    case 'complaint_form':
      renderComplaintFormScreen();
      break;
    case 'complaints_tracking':
      renderComplaintsTrackingScreen();
      break;
    case 'resources':
      renderResourcesScreen();
      break;
    case 'scanner':
      renderScannerScreen();
      break;
    case 'profile':
      renderProfileScreen();
      break;
  }
}

// RENDER HELPER FUNCTIONS

function renderSplashScreen() {
  viewport.innerHTML = `
    <div class="splash-view">
      <div class="splash-seal">
        <span class="seal-text-ar">الجمهورية الجزائرية</span>
        <div class="seal-divider"></div>
        <span class="seal-text-en">HA9I</span>
      </div>
      <div class="splash-title">حقي</div>
      <div class="splash-sub">HA9I</div>
      <div class="splash-tagline">${t('common.app_subtitle')}</div>
      <div class="spinner" style="margin-top: 50px;"></div>
    </div>
  `;
  setTimeout(() => {
    navigateTo('lang_select');
  }, 2000);
}

function renderLanguageSelectScreen() {
  viewport.innerHTML = `
    <div class="lang-view">
      <div class="lang-header">
        <h2>اختر اللغة / Choisir la langue</h2>
        <p>Select your preferred language</p>
      </div>
      <div class="lang-card ${state.language === 'ar' ? 'selected' : ''}" onclick="selectLanguage('ar')">
        <h3>العربية</h3>
        <p>arabe (Par défaut / RTL)</p>
      </div>
      <div class="lang-card ${state.language === 'fr' ? 'selected' : ''}" onclick="selectLanguage('fr')">
        <h3>Français</h3>
        <p>français (LTR)</p>
      </div>
      <div class="lang-card ${state.language === 'en' ? 'selected' : ''}" onclick="selectLanguage('en')">
        <h3>English</h3>
        <p>english (LTR)</p>
      </div>
    </div>
  `;
}

window.selectLanguage = function(lang) {
  state.language = lang;
  navigateTo('login');
};

function renderLoginScreen() {
  viewport.innerHTML = `
    <div class="auth-view">
      <div class="auth-header">
        <h2>${t('auth.login_title')}</h2>
        <p>${t('auth.login_subtitle')}</p>
      </div>
      
      <form id="login-form" onsubmit="handleLoginSubmit(event)">
        <div class="form-group">
          <label>${t('common.email')}</label>
          <input type="email" id="login-email" placeholder="citizen@mail.dz" required>
        </div>
        <div class="form-group">
          <label>${t('common.password')}</label>
          <input type="password" id="login-password" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn-primary">${t('auth.login_btn')}</button>
      </form>

      <div class="auth-switch-link" onclick="navigateTo('register')">
        ${t('auth.dont_have_account')}
      </div>
    </div>
  `;
}

window.handleLoginSubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  state.isAuthenticated = true;
  state.user = {
    firstName: 'Youcef',
    lastName: 'Benali',
    email: email,
    nationalId: '102938475610293847'
  };
  navigateTo('home');
};

function renderRegisterScreen() {
  viewport.innerHTML = `
    <div class="auth-view">
      <div class="auth-header">
        <h2>${t('auth.register_title')}</h2>
        <p>${t('auth.register_subtitle')}</p>
      </div>
      
      <form id="register-form" onsubmit="handleRegisterSubmit(event)">
        <div class="form-group">
          <label>${t('auth.first_name')}</label>
          <input type="text" id="reg-firstname" required>
        </div>
        <div class="form-group">
          <label>${t('auth.last_name')}</label>
          <input type="text" id="reg-lastname" required>
        </div>
        <div class="form-group">
          <label>${t('common.email')}</label>
          <input type="email" id="reg-email" placeholder="citizen@mail.dz" required>
        </div>
        <div class="form-group">
          <label>${t('common.password')}</label>
          <input type="password" id="reg-password" placeholder="••••••••" required>
        </div>

        <div class="form-group">
          <label>${t('complaints.doc_type')}</label>
          <div class="id-tab-bar">
            <button type="button" class="id-tab active" id="tab-nin" onclick="toggleIdType('nin')">${t('auth.id_type_nin')}</button>
            <button type="button" class="id-tab" id="tab-passport" onclick="toggleIdType('passport')">${t('auth.id_type_passport')}</button>
          </div>
        </div>

        <div class="form-group">
          <label id="id-label">${t('auth.national_id')}</label>
          <input type="text" id="reg-idval" required>
          <div class="form-error" id="id-error">${t('auth.invalid_nin')}</div>
        </div>

        <button type="submit" class="btn-primary">${t('auth.register_btn')}</button>
      </form>

      <div class="auth-switch-link" onclick="navigateTo('login')">
        ${t('auth.already_have_account')}
      </div>
    </div>
  `;
}

let activeIdType = 'nin';
window.toggleIdType = function(type) {
  activeIdType = type;
  const tabNin = document.getElementById('tab-nin');
  const tabPassport = document.getElementById('tab-passport');
  const label = document.getElementById('id-label');
  const input = document.getElementById('reg-idval');

  if (type === 'nin') {
    tabNin.classList.add('active');
    tabPassport.classList.remove('active');
    label.textContent = t('auth.national_id');
    input.placeholder = "18 digits NIN";
    input.maxLength = 18;
  } else {
    tabPassport.classList.add('active');
    tabNin.classList.remove('active');
    label.textContent = t('auth.passport_number');
    input.placeholder = "Passport number";
    input.removeAttribute('maxLength');
  }
};

window.handleRegisterSubmit = function(e) {
  e.preventDefault();
  const fName = document.getElementById('reg-firstname').value;
  const lName = document.getElementById('reg-lastname').value;
  const email = document.getElementById('reg-email').value;
  const idval = document.getElementById('reg-idval').value;
  const err = document.getElementById('id-error');

  if (activeIdType === 'nin' && idval.length !== 18) {
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';

  state.isAuthenticated = true;
  state.user = {
    firstName: fName,
    lastName: lName,
    email: email,
    nationalId: activeIdType === 'nin' ? idval : undefined,
    passportNumber: activeIdType === 'passport' ? idval : undefined
  };
  navigateTo('home');
};

function renderHomeScreen() {
  viewport.innerHTML = `
    <!-- Gov banner header -->
    <div class="gov-banner">
      <div class="gov-banner-badge"></div>
      <div class="gov-banner-text">
        <h4>الجمهورية الجزائرية الديمقراطية الشعبية</h4>
        <p>وزارة العدل - البوابة القانونية للمواطن</p>
      </div>
    </div>

    <!-- Welcome section -->
    <div class="welcome-banner">
      <p>${t('home.welcome')}</p>
      <h2>${state.user?.firstName} ${state.user?.lastName}</h2>
    </div>

    <!-- Services Grid -->
    <div class="services-list">
      <div class="service-card" onclick="navigateTo('assistant')">
        <div class="service-icon-box" style="background-color: rgba(11, 94, 215, 0.08);">
          <ion-icon name="chatbubble-ellipses" style="color: var(--primary); font-size: 20px;"></ion-icon>
        </div>
        <div class="service-title">${t('home.service_assistant')}</div>
        <ion-icon name="${state.language === 'ar' ? 'chevron-back' : 'chevron-forward'}" class="service-arrow"></ion-icon>
      </div>

      <div class="service-card" onclick="navigateTo('lawyers')">
        <div class="service-icon-box" style="background-color: rgba(30, 41, 59, 0.08);">
          <ion-icon name="people" style="color: var(--secondary); font-size: 20px;"></ion-icon>
        </div>
        <div class="service-title">${t('home.service_lawyers')}</div>
        <ion-icon name="${state.language === 'ar' ? 'chevron-back' : 'chevron-forward'}" class="service-arrow"></ion-icon>
      </div>

      <div class="service-card" onclick="navigateTo('complaint_form')">
        <div class="service-icon-box" style="background-color: rgba(11, 94, 215, 0.08);">
          <ion-icon name="document-text" style="color: var(--primary); font-size: 20px;"></ion-icon>
        </div>
        <div class="service-title">${t('home.service_complaints')}</div>
        <ion-icon name="${state.language === 'ar' ? 'chevron-back' : 'chevron-forward'}" class="service-arrow"></ion-icon>
      </div>

      <div class="service-card" onclick="navigateTo('resources')">
        <div class="service-icon-box" style="background-color: rgba(30, 41, 59, 0.08);">
          <ion-icon name="library" style="color: var(--secondary); font-size: 20px;"></ion-icon>
        </div>
        <div class="service-title">${t('home.service_resources')}</div>
        <ion-icon name="${state.language === 'ar' ? 'chevron-back' : 'chevron-forward'}" class="service-arrow"></ion-icon>
      </div>

      <div class="service-card" onclick="navigateTo('scanner')">
        <div class="service-icon-box" style="background-color: rgba(11, 94, 215, 0.08);">
          <ion-icon name="scan" style="color: var(--primary); font-size: 20px;"></ion-icon>
        </div>
        <div class="service-title">${t('home.service_scanner')}</div>
        <ion-icon name="${state.language === 'ar' ? 'chevron-back' : 'chevron-forward'}" class="service-arrow"></ion-icon>
      </div>
    </div>

    <!-- Legal board -->
    <div class="notice-board">
      <div class="notice-header">
        <ion-icon name="information-circle"></ion-icon>
        <span>تنبيه هام للمواطن</span>
      </div>
      <p class="notice-text">لقد أطلقت البوابة الرسمية خدمات الشكاوى الرقمية للتسهيل القضائي. تعامل بجدية مع إدخال البيانات الشخصية لتجنب المساءلة القانونية.</p>
    </div>
  `;
}

function renderAssistantScreen() {
  const messagesHtml = state.chatHistory.length > 0
    ? state.chatHistory.map(m => `
        <div class="chat-bubble ${m.sender === 'user' ? 'user' : 'assistant'}">
          ${m.text}
          <span class="bubble-time">${m.time}</span>
        </div>
      `).join('')
    : `
        <div class="chat-bubble assistant">
          ${t('assistant.welcome_msg')}
          <span class="bubble-time">09:41</span>
        </div>
      `;

  viewport.innerHTML = `
    <div class="app-header">
      <button class="header-back-btn" onclick="navigateTo('home')">
        <ion-icon name="${state.language === 'ar' ? 'arrow-forward' : 'arrow-back'}"></ion-icon>
      </button>
      <h2>${t('assistant.title')}</h2>
      <div class="header-placeholder"></div>
    </div>

    <div class="assistant-disclaimer">
      ${t('assistant.disclaimer')}
    </div>

    <div class="chat-history" id="chat-history">
      ${messagesHtml}
    </div>

    <div class="chat-input-tray">
      <input type="text" id="chat-input-field" placeholder="${t('assistant.placeholder')}">
      <button class="chat-send-btn" onclick="sendAssistantMessage()">
        <ion-icon name="paper-plane"></ion-icon>
      </button>
    </div>
  `;
  
  // Auto scroll down chat
  setTimeout(() => {
    const history = document.getElementById('chat-history');
    if (history) history.scrollTop = history.scrollHeight;
  }, 100);
}

window.sendAssistantMessage = async function() {
  const input = document.getElementById('chat-input-field');
  const text = input.value.trim();
  if (!text) return;

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  state.chatHistory.push({ sender: 'user', text, time: now });
  input.value = '';
  renderAssistantScreen();

  const history = document.getElementById('chat-history');
  const typingBubble = document.createElement('div');
  typingBubble.className = "chat-bubble assistant";
  typingBubble.textContent = "...";
  history.appendChild(typingBubble);
  history.scrollTop = history.scrollHeight;

  try {
    const response = await fetch('http://localhost:8001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: text })
    });
    
    if (!response.ok) {
      throw new Error('RAG server returned status ' + response.status);
    }
    
    const data = await response.json();
    typingBubble.remove();
    
    let responseText = data.response || '';
    
    // Convert markdown constructs to HTML elements for display in the simulator
    responseText = responseText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&lt;br&gt;/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background: rgba(0,0,0,0.08); padding: 2px 4px; border-radius: 4px; font-family: monospace; font-size: 11px;">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre style="background: rgba(0,0,0,0.05); padding: 8px; border-radius: 4px; overflow-x: auto; white-space: pre-wrap; font-family: monospace; font-size: 11px; margin: 8px 0; border-left: 3px solid var(--primary);">$1</pre>')
      .replace(/\n/g, '<br>');

    state.chatHistory.push({ sender: 'assistant', text: responseText, time: now });
    renderAssistantScreen();
  } catch (error) {
    console.warn('RAG service connection failed, falling back to mock response:', error);
    setTimeout(() => {
      typingBubble.remove();
      const fallbackResponse = "شكرًا لسؤالك. طبقاً للقوانين الجزائرية الجاري بها العمل، ولا سيما نصوص القانون المدني وقانون الإجراءات المدنية والإدارية، فإن هذا الموضوع يتطلب تقديم المستندات الثبوتية أمام الجهات القضائية المختصة. يرجى مراجعة محامٍ معتمد في ولايتك للحصول على تفاصيل دقيقة تناسب وضعك الخاص.";
      state.chatHistory.push({ sender: 'assistant', text: fallbackResponse, time: now });
      renderAssistantScreen();
    }, 800);
  }
};


// Lawyers Directory Screen
const mockLawyersData = [
  { id: 1, name: "أ. محمد بن أحمد (Mouloud Benahmed)", spec: "civil", wilaya: "Alger", address: "ديدوش مراد، الجزائر الوسطى", phone: "021734567" },
  { id: 2, name: "أ. سميرة بلقاسم (Samira Belkacem)", spec: "criminal", wilaya: "Oran", address: "نهج جيش التحرير، وهران", phone: "041401234" },
  { id: 3, name: "أ. كمال حداد (Kamel Haddad)", spec: "family", wilaya: "Constantine", address: "حي قدور بومدوس، قسنطينة", phone: "031925678" }
];

function renderLawyersScreen() {
  const filtered = mockLawyersData.filter(l => {
    const matchWilaya = state.selectedWilayaFilter === 'All' || l.wilaya === state.selectedWilayaFilter;
    const matchSpec = state.selectedSpecFilter === 'All' || l.spec === state.selectedSpecFilter;
    return matchWilaya && matchSpec;
  });

  const cardsHtml = filtered.length > 0
    ? filtered.map(l => `
        <div class="lawyer-card">
          <h3>${l.name}</h3>
          <div class="lawyer-spec">${t(`resources.cat_${l.spec}`)} - ${l.wilaya}</div>
          <div class="lawyer-detail-line">
            <ion-icon name="location-outline"></ion-icon>
            <span>${l.address}</span>
          </div>
          <div class="lawyer-detail-line">
            <ion-icon name="call-outline"></ion-icon>
            <span>${l.phone}</span>
          </div>
          <div class="lawyer-actions">
            <button class="btn-sm" onclick="showLawyerMap('${l.name}', '${l.address}')">${t('lawyers.view_location')}</button>
            <button class="btn-icon-sm" onclick="window.open('tel:${l.phone}')">
              <ion-icon name="call"></ion-icon>
            </button>
          </div>
        </div>
      `).join('')
    : `<div style="text-align: center; margin-top: 40px; color: var(--text-muted);">${t('lawyers.no_lawyers')}</div>`;

  viewport.innerHTML = `
    <div class="app-header">
      <div class="header-placeholder"></div>
      <h2>${t('lawyers.title')}</h2>
      <div class="header-placeholder"></div>
    </div>

    <!-- Filters Section -->
    <div class="filters-bar">
      <div class="filter-label">${t('common.wilaya')}</div>
      <div class="chips-row">
        <span class="chip ${state.selectedWilayaFilter === 'All' ? 'active' : ''}" onclick="filterWilaya('All')">الكل</span>
        <span class="chip ${state.selectedWilayaFilter === 'Alger' ? 'active' : ''}" onclick="filterWilaya('Alger')">Alger</span>
        <span class="chip ${state.selectedWilayaFilter === 'Oran' ? 'active' : ''}" onclick="filterWilaya('Oran')">Oran</span>
        <span class="chip ${state.selectedWilayaFilter === 'Constantine' ? 'active' : ''}" onclick="filterWilaya('Constantine')">Constantine</span>
      </div>

      <div class="filter-label">${t('common.specialization')}</div>
      <div class="chips-row">
        <span class="chip ${state.selectedSpecFilter === 'All' ? 'active' : ''}" onclick="filterSpec('All')">الكل</span>
        <span class="chip ${state.selectedSpecFilter === 'civil' ? 'active' : ''}" onclick="filterSpec('civil')">${t('resources.cat_civil')}</span>
        <span class="chip ${state.selectedSpecFilter === 'criminal' ? 'active' : ''}" onclick="filterSpec('criminal')">${t('resources.cat_criminal')}</span>
        <span class="chip ${state.selectedSpecFilter === 'family' ? 'active' : ''}" onclick="filterSpec('family')">${t('resources.cat_family')}</span>
      </div>
    </div>

    <div class="lawyers-list">
      ${cardsHtml}
    </div>

    <!-- Map Modal Simulation -->
    <div class="map-modal" id="map-modal">
      <div class="map-content">
        <div class="map-header">
          <h3 id="map-modal-title">${t('lawyers.view_location')}</h3>
          <button class="map-close-btn" onclick="closeMapModal()">
            <ion-icon name="close"></ion-icon>
          </button>
        </div>
        <div class="map-canvas">
          <div class="map-pin"></div>
          <span style="position: absolute; bottom: 8px; right: 12px; background: rgba(0,0,0,0.6); color: white; padding: 2px 6px; border-radius: 4px; font-size: 8px;">OpenStreetMap Mock</span>
        </div>
        <div class="map-address-panel">
          <h4 id="map-lawyer-name">Lawyer Name</h4>
          <p id="map-lawyer-address">Address</p>
        </div>
      </div>
    </div>
  `;
}

window.filterWilaya = function(w) {
  state.selectedWilayaFilter = w;
  renderLawyersScreen();
};

window.filterSpec = function(s) {
  state.selectedSpecFilter = s;
  renderLawyersScreen();
};

window.showLawyerMap = function(name, address) {
  const modal = document.getElementById('map-modal');
  document.getElementById('map-lawyer-name').textContent = name;
  document.getElementById('map-lawyer-address').textContent = address;
  modal.style.display = 'flex';
};

window.closeMapModal = function() {
  document.getElementById('map-modal').style.display = 'none';
};

// Electronic Complaint Form Screen
function renderComplaintFormScreen() {
  viewport.innerHTML = `
    <div class="app-header">
      <button class="header-back-btn" onclick="navigateTo('home')">
        <ion-icon name="${state.language === 'ar' ? 'arrow-forward' : 'arrow-back'}"></ion-icon>
      </button>
      <h2>${t('complaints.title')}</h2>
      <div class="header-placeholder"></div>
    </div>

    <div style="padding: 16px;">
      
      <!-- Section 1 header -->
      <div class="complaint-section-header" onclick="toggleFormSection(0)">
        <h3>1. ${t('complaints.sec_complainant')}</h3>
        <ion-icon name="chevron-down" id="sec-arrow-0"></ion-icon>
      </div>
      <div class="complaint-section-content" id="sec-content-0" style="display: block;">
        <div class="form-group">
          <label>${t('complaints.complainant_nature')}</label>
          <div class="nature-btn-group">
            <button type="button" class="nature-btn active" id="nature-person" onclick="setNature('person')">${t('complaints.complainant_nature_person')}</button>
            <button type="button" class="nature-btn" id="nature-moral" onclick="setNature('moral')">${t('complaints.complainant_nature_moral')}</button>
          </div>
        </div>
        <div class="form-group">
          <label>${t('complaints.last_name')}</label>
          <input type="text" id="comp-lname" value="${state.user?.lastName || ''}" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.last_name_latin')}</label>
          <input type="text" id="comp-lname-lat" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.first_name')}</label>
          <input type="text" id="comp-fname" value="${state.user?.firstName || ''}" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.first_name_latin')}</label>
          <input type="text" id="comp-fname-lat" required>
        </div>
      </div>

      <!-- Section 2 -->
      <div class="complaint-section-header" onclick="toggleFormSection(1)">
        <h3>2. ${t('complaints.sec_birth')}</h3>
        <ion-icon name="chevron-down" id="sec-arrow-1"></ion-icon>
      </div>
      <div class="complaint-section-content" id="sec-content-1">
        <div class="form-group">
          <label>${t('complaints.birth_date')}</label>
          <input type="text" id="comp-bdate" placeholder="YYYY-MM-DD" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.birth_wilaya')}</label>
          <input type="text" id="comp-bwilaya" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.birth_cert_num')}</label>
          <input type="text" id="comp-bcert" required>
        </div>
      </div>

      <!-- Section 3 -->
      <div class="complaint-section-header" onclick="toggleFormSection(2)">
        <h3>3. ${t('complaints.sec_family')}</h3>
        <ion-icon name="chevron-down" id="sec-arrow-2"></ion-icon>
      </div>
      <div class="complaint-section-content" id="sec-content-2">
        <div class="form-group">
          <label>${t('complaints.father_name')}</label>
          <input type="text" id="comp-father">
        </div>
        <div class="form-group">
          <label>${t('complaints.mother_name')}</label>
          <input type="text" id="comp-mother">
        </div>
      </div>

      <!-- Section 4 -->
      <div class="complaint-section-header" onclick="toggleFormSection(3)">
        <h3>4. ${t('complaints.sec_national_id')}</h3>
        <ion-icon name="chevron-down" id="sec-arrow-3"></ion-icon>
      </div>
      <div class="complaint-section-content" id="sec-content-3">
        <div class="form-group">
          <label>${t('complaints.nin')}</label>
          <input type="text" id="comp-nin" value="${state.user?.nationalId || ''}" maxLength="18" required>
        </div>
      </div>

      <!-- Section 5 -->
      <div class="complaint-section-header" onclick="toggleFormSection(4)">
        <h3>5. ${t('complaints.sec_document')}</h3>
        <ion-icon name="chevron-down" id="sec-arrow-4"></ion-icon>
      </div>
      <div class="complaint-section-content" id="sec-content-4">
        <div class="form-group">
          <label>${t('complaints.doc_type')}</label>
          <input type="text" id="comp-doctype" value="National ID Card" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.doc_number')}</label>
          <input type="text" id="comp-docnum" required>
        </div>
      </div>

      <!-- Section 6 -->
      <div class="complaint-section-header" onclick="toggleFormSection(5)">
        <h3>6. ${t('complaints.sec_residence')}</h3>
        <ion-icon name="chevron-down" id="sec-arrow-5"></ion-icon>
      </div>
      <div class="complaint-section-content" id="sec-content-5">
        <div class="form-group">
          <label>${t('complaints.residence_address')}</label>
          <input type="text" id="comp-resaddr" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.residence_wilaya')}</label>
          <input type="text" id="comp-reswilaya" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.residence_commune')}</label>
          <input type="text" id="comp-rescommune" required>
        </div>
      </div>

      <!-- Section 7 -->
      <div class="complaint-section-header" onclick="toggleFormSection(6)">
        <h3>7. ${t('complaints.sec_contact')}</h3>
        <ion-icon name="chevron-down" id="sec-arrow-6"></ion-icon>
      </div>
      <div class="complaint-section-content" id="sec-content-6">
        <div class="form-group">
          <label>${t('complaints.mobile_phone')}</label>
          <input type="text" id="comp-phone" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.confirm_mobile_phone')}</label>
          <input type="text" id="comp-phone-conf" required>
        </div>
        <div class="form-group">
          <label>${t('common.email')}</label>
          <input type="email" id="comp-email" value="${state.user?.email || ''}" required>
        </div>
        <div class="form-group">
          <label>${t('complaints.confirm_email')}</label>
          <input type="email" id="comp-email-conf" required>
        </div>
      </div>

      <button class="btn-primary" style="margin-bottom: 30px;" onclick="submitComplaintForm()">${t('common.submit')}</button>
    </div>
  `;
}

let activeComplaintNature = 'person';
window.setNature = function(nature) {
  activeComplaintNature = nature;
  const btnPerson = document.getElementById('nature-person');
  const btnMoral = document.getElementById('nature-moral');
  if (nature === 'person') {
    btnPerson.classList.add('active');
    btnMoral.classList.remove('active');
  } else {
    btnMoral.classList.add('active');
    btnPerson.classList.remove('active');
  }
};

window.toggleFormSection = function(idx) {
  const content = document.getElementById(`sec-content-${idx}`);
  const arrow = document.getElementById(`sec-arrow-${idx}`);
  const isHidden = content.style.display !== 'block';
  
  // Close all
  for (let i = 0; i <= 6; i++) {
    const c = document.getElementById(`sec-content-${i}`);
    const a = document.getElementById(`sec-arrow-${i}`);
    if (c) c.style.display = 'none';
    if (a) a.setAttribute('name', 'chevron-down');
  }

  if (isHidden) {
    content.style.display = 'block';
    arrow.setAttribute('name', 'chevron-up');
  }
};

window.submitComplaintForm = function() {
  const fName = document.getElementById('comp-fname').value;
  const lName = document.getElementById('comp-lname').value;
  const phone = document.getElementById('comp-phone').value;
  const phoneConf = document.getElementById('comp-phone-conf').value;
  const email = document.getElementById('comp-email').value;
  const emailConf = document.getElementById('comp-email-conf').value;
  const resWilaya = document.getElementById('comp-reswilaya').value;
  const resCommune = document.getElementById('comp-rescommune').value;

  if (!fName || !lName || !phone || !email || !resWilaya || !resCommune) {
    alert("يرجى ملء جميع الحقول الإجبارية.");
    return;
  }

  if (phone !== phoneConf) {
    alert(t('complaints.phone_mismatch'));
    return;
  }

  if (email !== emailConf) {
    alert(t('complaints.email_mismatch'));
    return;
  }

  // Create complaint entry (Backend simulation)
  const newComplaint = {
    id: `COMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    submissionDate: new Date().toISOString().split('T')[0],
    status: 'under_verification',
    firstName: fName,
    lastName: lName,
    residenceWilaya: resWilaya,
    residenceCommune: resCommune
  };

  state.complaints.unshift(newComplaint);
  alert(t('complaints.success_msg'));
  navigateTo('complaints_tracking');
};

// Complaints Tracking List Screen
function renderComplaintsTrackingScreen() {
  const complaintsHtml = state.complaints.map(c => {
    let stepIndex = 0;
    if (c.status === 'under_verification') stepIndex = 1;
    if (c.status === 'under_review') stepIndex = 2;
    if (c.status === 'accepted' || c.status === 'rejected') stepIndex = 3;
    const isRejected = c.status === 'rejected';

    return `
      <div class="tracking-card">
        <div class="tracking-header">
          <span class="tracking-id">${c.id}</span>
          <span class="tracking-date">${c.submissionDate}</span>
        </div>
        <div class="tracking-name">${c.firstName} ${c.lastName}</div>
        <div class="tracking-location">${c.residenceWilaya} - ${c.residenceCommune}</div>
        
        <div class="status-badge-container">
          <span class="status-badge ${c.status}">${t(`complaints.status_${c.status}`)}</span>
        </div>

        <!-- Stepper -->
        <div class="tracker-stepper">
          <div class="tracker-circle active"><ion-icon name="checkmark"></ion-icon></div>
          <div class="tracker-line ${stepIndex >= 1 ? 'active' : ''}"></div>
          
          <div class="tracker-circle ${stepIndex >= 1 ? 'active' : ''}">
            ${stepIndex >= 1 ? '<ion-icon name="checkmark"></ion-icon>' : ''}
          </div>
          <div class="tracker-line ${stepIndex >= 2 ? 'active' : ''}"></div>
          
          <div class="tracker-circle ${stepIndex >= 2 ? 'active' : ''}">
            ${stepIndex >= 2 ? '<ion-icon name="checkmark"></ion-icon>' : ''}
          </div>
          <div class="tracker-line ${stepIndex >= 3 ? 'active' : ''}"></div>
          
          <div class="tracker-circle ${isRejected ? 'rejected' : ''} ${stepIndex >= 3 ? 'active' : ''}">
            ${stepIndex >= 3 ? `<ion-icon name="${isRejected ? 'close' : 'checkmark'}"></ion-icon>` : ''}
          </div>
        </div>
        
        <div class="tracker-labels">
          <span class="tracker-label">مودعة</span>
          <span class="tracker-label">تحقق</span>
          <span class="tracker-label">دراسة</span>
          <span class="tracker-label">${isRejected ? 'مرفوضة' : 'مقبولة'}</span>
        </div>
      </div>
    `;
  }).join('');

  viewport.innerHTML = `
    <div class="app-header">
      <div class="header-placeholder"></div>
      <h2>${t('complaints.tracking_title')}</h2>
      <div class="header-placeholder"></div>
    </div>

    <div class="tracking-top-bar">
      <button class="btn-new-complaint" onclick="navigateTo('complaint_form')">
        <ion-icon name="add-circle"></ion-icon>
        <span>${t('complaints.new_complaint')}</span>
      </button>
    </div>

    <div class="complaints-tracking-list">
      ${complaintsHtml}
    </div>
  `;
}

// Legal Resources Screen
const mockDocs = [
  { id: 'doc-1', title: 'القانون المدني الجزائري (الأمر رقم 75-58)', cat: 'civil', date: '1975-09-26', desc: 'يتضمن القواعد القانونية الأساسية للعقود، الملكية، والالتزامات.' },
  { id: 'doc-2', title: 'قانون العقوبات الجزائري (الأمر رقم 66-156)', cat: 'criminal', date: '1966-06-08', desc: 'يحدد الجرائم والمخالفات المرتكبة والعقوبات المقررة لها.' },
  { id: 'doc-3', title: 'قانون الأسرة الجزائري (القانون رقم 84-11)', cat: 'family', date: '1984-06-09', desc: 'ينظم أحكام الزواج، الطلاق، الولاية، الحضانة، والميراث.' }
];

let activeResourceCat = 'All';
function renderResourcesScreen() {
  const filtered = mockDocs.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchCat = activeResourceCat === 'All' || d.cat === activeResourceCat;
    return matchSearch && matchCat;
  });

  const docsHtml = filtered.map(d => `
    <div class="doc-card">
      <div class="doc-card-header">
        <span class="doc-badge">${t(`resources.cat_${d.cat}`)}</span>
        <span class="doc-date">${d.date}</span>
      </div>
      <h3>${d.title}</h3>
      <p>${d.desc}</p>
      
      <div class="lawyer-actions" style="margin-top: 12px; gap: 8px;">
        <button class="btn-sm" onclick="previewPdf('${d.title}')">${t('resources.preview_pdf')}</button>
        <button class="btn-icon-sm" onclick="downloadPdf('${d.title}')">
          <ion-icon name="download-outline"></ion-icon>
        </button>
      </div>
    </div>
  `).join('');

  viewport.innerHTML = `
    <div class="app-header">
      <div class="header-placeholder"></div>
      <h2>${t('resources.title')}</h2>
      <div class="header-placeholder"></div>
    </div>

    <!-- Search box -->
    <div class="resources-search">
      <div class="resources-search-box">
        <ion-icon name="search"></ion-icon>
        <input type="text" id="res-search-input" value="${state.searchQuery}" placeholder="${t('resources.search_placeholder')}" oninput="searchResources(this.value)">
      </div>
    </div>

    <!-- Category scroll -->
    <div class="filters-bar" style="border: none;">
      <div class="chips-row">
        <span class="chip ${activeResourceCat === 'All' ? 'active' : ''}" onclick="selectResourceCat('All')">الكل</span>
        <span class="chip ${activeResourceCat === 'civil' ? 'active' : ''}" onclick="selectResourceCat('civil')">${t('resources.cat_civil')}</span>
        <span class="chip ${activeResourceCat === 'criminal' ? 'active' : ''}" onclick="selectResourceCat('criminal')">${t('resources.cat_criminal')}</span>
        <span class="chip ${activeResourceCat === 'family' ? 'active' : ''}" onclick="selectResourceCat('family')">${t('resources.cat_family')}</span>
      </div>
    </div>

    <div class="resources-list">
      ${docsHtml}
    </div>

    <!-- PDF Drawer preview mock -->
    <div class="pdf-preview-modal" id="pdf-modal">
      <div class="pdf-preview-content">
        <div class="pdf-preview-header">
          <h4 id="pdf-modal-title">Document Title</h4>
          <button class="map-close-btn" onclick="closePdfModal()">
            <ion-icon name="close"></ion-icon>
          </button>
        </div>
        <div class="pdf-mock-page">
          <ion-icon name="document-text" style="font-size: 48px; color: var(--text-muted); margin-bottom: 12px;"></ion-icon>
          <div class="pdf-line"></div>
          <div class="pdf-line" style="width: 80%;"></div>
          <div class="pdf-line" style="width: 60%;"></div>
        </div>
        <button class="btn-primary" id="pdf-modal-download-btn">${t('resources.download_pdf')}</button>
      </div>
    </div>
  `;
}

window.searchResources = function(val) {
  state.searchQuery = val;
  renderResourcesScreen();
};

window.selectResourceCat = function(cat) {
  activeResourceCat = cat;
  renderResourcesScreen();
};

window.previewPdf = function(title) {
  const modal = document.getElementById('pdf-modal');
  document.getElementById('pdf-modal-title').textContent = title;
  document.getElementById('pdf-modal-download-btn').onclick = () => {
    downloadPdf(title);
    closePdfModal();
  };
  modal.style.display = 'flex';
};

window.closePdfModal = function() {
  document.getElementById('pdf-modal').style.display = 'none';
};

window.downloadPdf = function(title) {
  alert(`جاري تحميل ملف PDF: \n${title}`);
};

// Procedure Scanner Screen (Hackathon Presentation only)
function renderScannerScreen() {
  viewport.innerHTML = `
    <div class="app-header">
      <button class="header-back-btn" onclick="navigateTo('home')">
        <ion-icon name="${state.language === 'ar' ? 'arrow-forward' : 'arrow-back'}"></ion-icon>
      </button>
      <h2>${t('scanner.title')}</h2>
      <div class="header-placeholder"></div>
    </div>

    <!-- Scan request panel -->
    <div class="scanner-upload-area" id="scan-trigger-area">
      <ion-icon name="document-attach-outline" style="font-size: 56px; color: var(--primary);"></ion-icon>
      <p class="scanner-instructions">${t('scanner.instructions')}</p>
      <button class="btn-primary" onclick="startScannerMock()">${t('scanner.take_photo_btn')}</button>
      <button class="btn-primary" style="background-color: var(--secondary); margin-top: 8px;" onclick="startScannerMock()">${t('scanner.upload_btn')}</button>
    </div>

    <!-- Scanning status overlay -->
    <div class="scanner-scanning-overlay" id="scan-loading">
      <div class="spinner"></div>
      <p style="margin-top: 15px; font-size: 12px; color: var(--text-muted);">${t('scanner.scanning')}</p>
    </div>

    <!-- Scan Results Panel -->
    <div class="scanner-result-panel" id="scan-results">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <ion-icon name="checkmark-circle" style="color: var(--success); font-size: 22px;"></ion-icon>
        <span style="font-weight: 700; color: var(--secondary); font-size: 13px;">${t('scanner.result_title')}</span>
      </div>

      <div class="scanner-detected-card">
        <label>المستند المكتشف / Document Détecté</label>
        <h4>${t('scanner.example_birth_cert')} (Acte de naissance N° 12)</h4>
      </div>

      <div class="scanner-list-section">
        <h4>${t('scanner.required_procedures')}</h4>
        <div class="lawyer-card" style="margin-bottom: 8px;">
          <strong style="font-size: 11px; display: block;">1. طلب بطاقة التعريف الوطنية البيومترية</strong>
          <span style="font-size: 10px; color: var(--text-muted); display: block; margin-top: 2px;">تتطلب شهادة الميلاد رقم 12 كوثيقة إجبارية لإيداع ملف طلب الهوية البيومترية.</span>
        </div>
        <div class="lawyer-card">
          <strong style="font-size: 11px; display: block;">2. تجديد جواز السفر البيومتري</strong>
          <span style="font-size: 10px; color: var(--text-muted); display: block; margin-top: 2px;">تستعمل كإثبات للحالة المدنية عند تقديم الطلب عبر البوابة الرقمية لوزارة الداخلية.</span>
        </div>

        <h4>${t('scanner.required_offices')}</h4>
        <div class="lawyer-card" style="padding: 10px;">
          <span style="font-size: 11px; display: block; margin-bottom: 2px;">• بلدية المقر (Commune de résidence)</span>
          <span style="font-size: 11px; display: block;">• الدائرة الإدارية / المقاطعة (Daïra)</span>
        </div>

        <h4>${t('scanner.required_documents')}</h4>
        <div class="lawyer-card" style="padding: 10px;">
          <span style="font-size: 11px; display: block; margin-bottom: 2px;">• عقد ميلاد أصلي للمكلف</span>
          <span style="font-size: 11px; display: block; margin-bottom: 2px;">• بطاقة فصيلة الدم</span>
          <span style="font-size: 11px; display: block;">• شهادة الإقامة الحالية</span>
        </div>
      </div>

      <button class="btn-primary" style="background-color: var(--secondary); margin-top: 20px;" onclick="resetScannerMock()">مسح مستند آخر / Scanner un autre</button>
    </div>
  `;
}

window.startScannerMock = function() {
  document.getElementById('scan-trigger-area').style.display = 'none';
  document.getElementById('scan-loading').style.display = 'flex';
  
  setTimeout(() => {
    document.getElementById('scan-loading').style.display = 'none';
    document.getElementById('scan-results').style.display = 'block';
  }, 2000);
};

window.resetScannerMock = function() {
  renderScannerScreen();
};

// Profile Screen
function renderProfileScreen() {
  viewport.innerHTML = `
    <div class="app-header">
      <div class="header-placeholder"></div>
      <h2>${t('profile.title')}</h2>
      <div class="header-placeholder"></div>
    </div>

    <!-- User Header Card -->
    <div class="profile-user-card">
      <div class="profile-avatar">
        ${state.user?.firstName ? state.user.firstName[0].toUpperCase() : 'C'}
      </div>
      <div class="profile-details">
        <h3>${state.user?.firstName} ${state.user?.lastName}</h3>
        <p>${state.user?.email}</p>
      </div>
    </div>

    <!-- Personal info section -->
    <div class="profile-section-title">${t('profile.personal_info')}</div>
    <div class="profile-info-box">
      <div class="profile-row">
        <label>${t('auth.first_name')}</label>
        <span>${state.user?.firstName}</span>
      </div>
      <div class="profile-row">
        <label>${t('auth.last_name')}</label>
        <span>${state.user?.lastName}</span>
      </div>
      <div class="profile-row">
        <label>${state.user?.nationalId ? t('auth.national_id') : t('auth.passport_number')}</label>
        <span>${state.user?.nationalId || state.user?.passportNumber || 'N/A'}</span>
      </div>
    </div>

    <!-- Settings section -->
    <div class="profile-section-title">الإعدادات / Paramètres</div>
    <div class="profile-info-box">
      <div class="profile-row" style="padding: 0;">
        <button class="profile-setting-clickable" onclick="toggleLanguageInProfile()">
          <label dir="${state.language === 'ar' ? 'rtl' : 'ltr'}">
            <ion-icon name="language-outline" style="font-size: 18px;"></ion-icon>
            <span>${t('profile.settings_language')}</span>
          </label>
          <span style="color: var(--primary); font-weight: 600;">
            ${state.language === 'ar' ? 'العربية' : state.language === 'fr' ? 'Français' : 'English'}
          </span>
          <ion-icon name="${state.language === 'ar' ? 'chevron-back' : 'chevron-forward'}" style="font-size: 14px; color: var(--text-muted);"></ion-icon>
        </button>
      </div>
    </div>

    <!-- Stats section -->
    <div class="profile-section-title">${t('profile.complaint_history')}</div>
    <div class="profile-info-box">
      <div class="profile-row">
        <label>إجمالي الشكاوى المودعة</label>
        <span>${state.complaints.length}</span>
      </div>
    </div>

    <button class="btn-danger" onclick="logoutSession()">${t('common.logout')}</button>
  `;
}

window.toggleLanguageInProfile = function() {
  const current = state.language;
  let next = 'ar';
  if (current === 'ar') next = 'fr';
  else if (current === 'fr') next = 'en';
  
  state.language = next;
  renderProfileScreen();
};

window.logoutSession = function() {
  state.isAuthenticated = false;
  state.user = null;
  state.chatHistory = [];
  navigateTo('login');
};

// Boot App Simulator
init();
