<script setup lang="ts">
import { ref, computed, watch } from 'vue';

definePageMeta({
  alias: ['/mentions-legales', '/privacy']
});

const route = useRoute();
const router = useRouter();

// Determine initial language from path or query param
const initialLang = (route.path.includes('mentions-legales') || route.query.lang === 'fr') ? 'fr' : 'en';
const currentLang = ref<'en' | 'fr'>(initialLang);

const setLang = (lang: 'en' | 'fr') => {
  currentLang.value = lang;
  router.replace({
    query: {
      ...route.query,
      lang: lang === 'en' ? undefined : 'fr'
    }
  });
};

watch(() => route.query.lang, (newLang) => {
  if (newLang === 'fr' && currentLang.value !== 'fr') currentLang.value = 'fr';
  if ((!newLang || newLang === 'en') && currentLang.value !== 'en' && !route.path.includes('mentions-legales')) currentLang.value = 'en';
});

const pageTitle = computed(() =>
  currentLang.value === 'en'
    ? 'Legal Notice & Privacy Policy | Paul Thomas'
    : 'Mentions Légales & Confidentialité | Paul Thomas'
);

const pageDescription = computed(() =>
  currentLang.value === 'en'
    ? 'Legal notice (French LCEN), privacy policy (EU GDPR), cookie policy, and terms of use for pthomas.fr.'
    : 'Mentions légales (LCEN), politique de confidentialité (RGPD), politique de cookies et conditions d’utilisation du site pthomas.fr.'
);

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription }
  ]
});

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  twitterCard: 'summary'
});
</script>

<template>
  <div class="min-h-screen bg-bg text-primary pt-28 pb-36 px-6 md:px-10 selection:bg-accent selection:text-black">
    <article class="max-w-[800px] mx-auto font-sans leading-[1.85] text-[1.02rem] text-secondary/90">
      
      <!-- Top Bar: Back Link & Language Toggle -->
      <div class="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-white/[0.08]">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-secondary/70 hover:text-accent font-mono text-xs tracking-wider uppercase transition-colors duration-200 group no-underline"
        >
          <Icon name="uil:arrow-left" size="14px" class="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>{{ currentLang === 'en' ? 'Back to Home' : 'Retour à l\'accueil' }}</span>
        </NuxtLink>

        <!-- Language Selector -->
        <div class="inline-flex items-center p-1 rounded-md border border-white/[0.1] bg-[#0c0c0c]">
          <button
            type="button"
            @click="setLang('en')"
            class="px-3 py-1 font-mono text-xs rounded transition-all duration-200 cursor-pointer"
            :class="currentLang === 'en' ? 'bg-accent text-black font-bold shadow-sm' : 'text-secondary/70 hover:text-primary'"
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            type="button"
            @click="setLang('fr')"
            class="px-3 py-1 font-mono text-xs rounded transition-all duration-200 cursor-pointer"
            :class="currentLang === 'fr' ? 'bg-accent text-black font-bold shadow-sm' : 'text-secondary/70 hover:text-primary'"
            aria-label="Passer en Français"
          >
            FR
          </button>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- ENGLISH VERSION -->
      <!-- ======================================================== -->
      <div v-if="currentLang === 'en'">
        <!-- Post Meta -->
        <div class="flex items-center gap-3 font-mono text-xs text-secondary/50 mb-3 uppercase tracking-widest">
          <span>Compliance & Legal</span>
          <span>•</span>
          <span>FR / EU Law</span>
        </div>

        <!-- Page Title -->
        <h1 class="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold text-primary tracking-tight leading-[1.1] mb-6">
          Legal Notice & Privacy Policy
        </h1>

        <p class="text-base md:text-lg text-primary/80 font-normal leading-relaxed mb-10 border-l-2 border-accent pl-5">
          Transparency, user privacy, and strict regulatory compliance under French and European law (LCEN Act, EU GDPR, and CNIL standards).
        </p>

        <!-- Table of Contents / Anchors -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 my-8 border border-white/[0.08] bg-[#070707] font-mono text-xs">
          <a href="#en-legal-notice" class="text-secondary/70 hover:text-accent transition-colors flex items-center gap-2 no-underline">
            <span class="text-accent/60">01.</span> Legal Notice (LCEN)
          </a>
          <a href="#en-privacy" class="text-secondary/70 hover:text-accent transition-colors flex items-center gap-2 no-underline">
            <span class="text-accent/60">02.</span> Privacy Policy (GDPR)
          </a>
          <a href="#en-cookies" class="text-secondary/70 hover:text-accent transition-colors flex items-center gap-2 no-underline">
            <span class="text-accent/60">03.</span> Cookies & Tracking
          </a>
          <a href="#en-terms" class="text-secondary/70 hover:text-accent transition-colors flex items-center gap-2 no-underline">
            <span class="text-accent/60">04.</span> Terms of Use
          </a>
        </div>

        <!-- 1. LEGAL NOTICE -->
        <section id="en-legal-notice" class="pt-10 scroll-mt-24">
          <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mb-6 flex items-center gap-3">
            <span class="font-mono text-accent text-lg">01.</span>
            <span>Legal Notice</span>
          </h2>
          <p class="text-sm text-secondary/60 mb-6">
            In accordance with Article 6 of the French Digital Economy Act No. 2004-575 of June 21, 2004 (LCEN).
          </p>

          <div class="space-y-6">
            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">1.1. Website Publisher</h3>
              <ul class="space-y-1.5 font-mono text-xs text-secondary/80">
                <li><strong class="text-primary font-sans text-sm">Full Name:</strong> Paul Thomas</li>
                <li><strong class="text-primary font-sans text-sm">Status:</strong> Individual — CS Engineering Student & Apprentice Researcher</li>
                <li><strong class="text-primary font-sans text-sm">Location:</strong> Strasbourg (67000), France</li>
                <li><strong class="text-primary font-sans text-sm">Contact Email:</strong> <a href="mailto:contact@pthomas.fr" class="text-accent underline">contact@pthomas.fr</a></li>
                <li><strong class="text-primary font-sans text-sm">Official URL:</strong> <a href="https://pthomas.fr" class="text-accent underline">https://pthomas.fr</a></li>
              </ul>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">1.2. Publication Director</h3>
              <p class="text-sm text-secondary/80">
                The publication director and editorial manager of this website is <strong class="text-primary">Paul Thomas</strong> as the site creator and publisher.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">1.3. Hosting Provider</h3>
              <ul class="space-y-1.5 font-mono text-xs text-secondary/80">
                <li><strong class="text-primary font-sans text-sm">Host:</strong> Vercel Inc.</li>
                <li><strong class="text-primary font-sans text-sm">Address:</strong> 440 N Barranca Ave #4133, Covina, CA 91723, United States</li>
                <li><strong class="text-primary font-sans text-sm">Website:</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" class="text-accent underline">https://vercel.com</a></li>
                <li><strong class="text-primary font-sans text-sm">Privacy Contact:</strong> privacy@vercel.com</li>
              </ul>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">1.4. Intellectual Property</h3>
              <p class="text-sm text-secondary/80 mb-3">
                All content published on this website (text, graphics, logos, photographs, interactive animations, custom ASCII engines, and source code) is protected under French and international intellectual property and copyright laws (Articles L. 111-1 et seq. of the French Intellectual Property Code).
              </p>
              <p class="text-sm text-secondary/80">
                Any reproduction, representation, modification, or distribution, whether in whole or in part, without prior written permission from the author is strictly prohibited. Open-source repositories and code referenced on this portfolio remain governed by their respective open-source licenses (accessible on their GitHub repositories).
              </p>
            </div>
          </div>
        </section>

        <!-- 2. PRIVACY POLICY (GDPR) -->
        <section id="en-privacy" class="pt-16 scroll-mt-24">
          <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mb-6 flex items-center gap-3">
            <span class="font-mono text-accent text-lg">02.</span>
            <span>Privacy Policy (GDPR)</span>
          </h2>
          <p class="text-sm text-secondary/60 mb-6">
            Pursuant to Regulation (EU) 2016/679 of the European Parliament and Council of April 27, 2016 (GDPR) and the French Data Protection Act (Loi Informatique et Libertés).
          </p>

          <div class="space-y-6">
            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.1. Data Collection & Minimization</h3>
              <p class="text-sm text-secondary/80 mb-3">
                In accordance with the data minimization principle (Art. 5.1.c GDPR), only strictly necessary information is requested through the contact form:
              </p>
              <ul class="list-disc list-inside space-y-1 font-mono text-xs text-secondary/80 mb-3">
                <li><strong class="font-sans text-primary">Name or alias</strong>: to address your correspondence.</li>
                <li><strong class="font-sans text-primary">Email address</strong>: necessary to send a response.</li>
                <li><strong class="font-sans text-primary">Message content</strong>: the nature of your engineering or research inquiry.</li>
              </ul>
              <p class="text-sm text-secondary/80">
                <strong class="text-primary font-sans">Security & Anti-Abuse:</strong> Client IP addresses are processed transiently in volatile server RAM solely to enforce rate-limiting (anti-bruteforce and DDoS protection). This data is never persisted to any database and is automatically purged after 10 to 15 minutes.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.2. Purpose & Legal Basis</h3>
              <p class="text-sm text-secondary/80">
                Collected information is processed solely to handle and respond to inquiries (internship opportunities, research collaborations, technical questions). The legal basis relies on user consent (Art. 6.1.a GDPR) granted by voluntarily submitting the form, and legitimate interest (Art. 6.1.f GDPR) in professional communication.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.3. Data Recipients & Subprocessors</h3>
              <p class="text-sm text-secondary/80 mb-3">
                Paul Thomas is the sole recipient of submitted messages. Your information is never sold, rented, or distributed to any third parties.
              </p>
              <p class="text-sm text-secondary/80">
                Technical delivery is handled securely via <strong class="text-primary">Resend Inc.</strong> (end-to-end encrypted transactional email infrastructure provider).
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.4. Data Retention</h3>
              <p class="text-sm text-secondary/80">
                Messages and contact details are retained only for the duration required to handle the correspondence. Unless required by ongoing business or legal obligations, records are kept for no longer than 12 months, or permanently deleted upon request.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.5. Your Rights Under GDPR</h3>
              <p class="text-sm text-secondary/80 mb-3">
                Under European privacy regulations, you retain the following statutory rights:
              </p>
              <ul class="list-disc list-inside space-y-1 font-mono text-xs text-secondary/80 mb-4">
                <li>Right of access and copy of your data</li>
                <li>Right to rectification of inaccurate information</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restriction of processing</li>
                <li>Right to object to processing</li>
              </ul>
              <p class="text-sm text-secondary/80">
                To exercise any of these rights, email your request directly to: <a href="mailto:contact@pthomas.fr" class="text-accent underline font-mono text-xs">contact@pthomas.fr</a>.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.6. Supervisory Authority (CNIL)</h3>
              <p class="text-sm text-secondary/80">
                If you believe after contacting us that your data rights are not respected, you may file a complaint with the French national supervisory authority:
                <br>
                <strong class="text-primary">CNIL (Commission Nationale de l'Informatique et des Libertés)</strong>
                <br>
                3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07, France — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" class="text-accent underline">https://www.cnil.fr</a>.
              </p>
            </div>
          </div>
        </section>

        <!-- 3. COOKIES & TRACKING -->
        <section id="en-cookies" class="pt-16 scroll-mt-24">
          <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mb-6 flex items-center gap-3">
            <span class="font-mono text-accent text-lg">03.</span>
            <span>Cookie & Tracker Policy</span>
          </h2>
          <div class="border border-accent/25 bg-accent/[0.02] p-6 mb-6">
            <div class="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider font-semibold mb-2">
              <Icon name="uil:shield-check" size="18px" />
              <span>Consent Banner Exemption (CNIL & ePrivacy)</span>
            </div>
            <p class="text-sm text-primary leading-relaxed">
              This website is <strong>completely free of tracking, advertising, and profiling cookies</strong>. No intrusive cookie banner is displayed because no cookies requiring prior consent are stored on your device.
            </p>
          </div>

          <div class="space-y-6">
            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">3.1. Privacy-Preserving Analytics</h3>
              <p class="text-sm text-secondary/80 mb-3">
                The site utilizes <strong class="text-primary">Vercel Web Analytics</strong> and <strong class="text-primary">Vercel Speed Insights</strong> to monitor technical performance and aggregated visitor metrics.
              </p>
              <p class="text-sm text-secondary/80">
                These solutions operate on a <em>cookieless architecture</em>: no persistent device fingerprints are written, no cross-site advertising IDs are generated, and client IP addresses are immediately anonymized. This implementation strictly adheres to CNIL recommendations (Deliberation No. 2020-091) regarding consent-exempt technical measurements.
              </p>
            </div>
          </div>
        </section>

        <!-- 4. TERMS OF USE -->
        <section id="en-terms" class="pt-16 scroll-mt-24">
          <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mb-6 flex items-center gap-3">
            <span class="font-mono text-accent text-lg">04.</span>
            <span>Terms of Use</span>
          </h2>

          <div class="space-y-6">
            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">4.1. Purpose of the Website</h3>
              <p class="text-sm text-secondary/80">
                The website <a href="https://pthomas.fr" class="text-accent underline">https://pthomas.fr</a> is an engineering and research portfolio intended to showcase the software projects, academic trajectory, and technical competencies of Paul Thomas.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">4.2. Disclaimer & External Links</h3>
              <p class="text-sm text-secondary/80 mb-3">
                Content is provided in good faith for informational purposes. While every effort is made to maintain accuracy, no explicit or implicit warranty is provided.
              </p>
              <p class="text-sm text-secondary/80">
                The website provides hyperlinks directing to external resources (GitHub, LinkedIn, academic laboratories). The publisher has no control over the content or security practices of external sites and disclaims all liability regarding their use.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">4.3. Governing Law & Jurisdiction</h3>
              <p class="text-sm text-secondary/80">
                These terms and legal policies are governed by and construed in accordance with the laws of France. In the event of any dispute regarding their interpretation or execution, the competent courts within the jurisdiction of Strasbourg, France shall have exclusive jurisdiction.
              </p>
            </div>
          </div>
        </section>
      </div>

      <!-- ======================================================== -->
      <!-- FRENCH VERSION -->
      <!-- ======================================================== -->
      <div v-else>
        <!-- Post Meta -->
        <div class="flex items-center gap-3 font-mono text-xs text-secondary/50 mb-3 uppercase tracking-widest">
          <span>Conformité & Juridique</span>
          <span>•</span>
          <span>Droit Français & Européen</span>
        </div>

        <!-- Page Title -->
        <h1 class="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold text-primary tracking-tight leading-[1.1] mb-6">
          Mentions Légales & Confidentialité
        </h1>

        <p class="text-base md:text-lg text-primary/80 font-normal leading-relaxed mb-10 border-l-2 border-accent pl-5">
          Transparence, respect de la vie privée et conformité réglementaire française et européenne (LCEN, RGPD et directives CNIL).
        </p>

        <!-- Table of Contents / Anchors -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 my-8 border border-white/[0.08] bg-[#070707] font-mono text-xs">
          <a href="#fr-mentions-legales" class="text-secondary/70 hover:text-accent transition-colors flex items-center gap-2 no-underline">
            <span class="text-accent/60">01.</span> Mentions Légales (LCEN)
          </a>
          <a href="#fr-privacy" class="text-secondary/70 hover:text-accent transition-colors flex items-center gap-2 no-underline">
            <span class="text-accent/60">02.</span> Confidentialité & RGPD
          </a>
          <a href="#fr-cookies" class="text-secondary/70 hover:text-accent transition-colors flex items-center gap-2 no-underline">
            <span class="text-accent/60">03.</span> Cookies & Traceurs
          </a>
          <a href="#fr-terms" class="text-secondary/70 hover:text-accent transition-colors flex items-center gap-2 no-underline">
            <span class="text-accent/60">04.</span> Conditions d'Utilisation
          </a>
        </div>

        <!-- 1. MENTIONS LÉGALES -->
        <section id="fr-mentions-legales" class="pt-10 scroll-mt-24">
          <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mb-6 flex items-center gap-3">
            <span class="font-mono text-accent text-lg">01.</span>
            <span>Mentions Légales</span>
          </h2>
          <p class="text-sm text-secondary/60 mb-6">
            Conformément aux dispositions de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).
          </p>

          <div class="space-y-6">
            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">1.1. Éditeur du site</h3>
              <ul class="space-y-1.5 font-mono text-xs text-secondary/80">
                <li><strong class="text-primary font-sans text-sm">Nom & Prénom :</strong> Paul Thomas</li>
                <li><strong class="text-primary font-sans text-sm">Statut :</strong> Particulier — Étudiant élève-ingénieur & apprenti chercheur</li>
                <li><strong class="text-primary font-sans text-sm">Localisation :</strong> Strasbourg (67000), France</li>
                <li><strong class="text-primary font-sans text-sm">Contact email :</strong> <a href="mailto:contact@pthomas.fr" class="text-accent underline">contact@pthomas.fr</a></li>
                <li><strong class="text-primary font-sans text-sm">Site internet :</strong> <a href="https://pthomas.fr" class="text-accent underline">https://pthomas.fr</a></li>
              </ul>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">1.2. Directeur de la publication</h3>
              <p class="text-sm text-secondary/80">
                Le directeur de la publication du site est <strong class="text-primary">Paul Thomas</strong> en qualité de créateur et éditeur du site.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">1.3. Hébergeur du site</h3>
              <ul class="space-y-1.5 font-mono text-xs text-secondary/80">
                <li><strong class="text-primary font-sans text-sm">Hébergeur :</strong> Vercel Inc.</li>
                <li><strong class="text-primary font-sans text-sm">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
                <li><strong class="text-primary font-sans text-sm">Site internet :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" class="text-accent underline">https://vercel.com</a></li>
                <li><strong class="text-primary font-sans text-sm">Contact :</strong> privacy@vercel.com</li>
              </ul>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">1.4. Propriété intellectuelle</h3>
              <p class="text-sm text-secondary/80 mb-3">
                L'ensemble du contenu publié sur ce site (textes, graphismes, logos, photographies, animations interactives, moteur ASCII et code source) relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle (articles L. 111-1 et suivants du Code de la propriété intellectuelle).
              </p>
              <p class="text-sm text-secondary/80">
                Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans l'accord préalable écrit de l'auteur est strictement interdite. Les projets open source référencés demeurent régis par leurs licences respectives (disponibles sur leurs dépôts GitHub).
              </p>
            </div>
          </div>
        </section>

        <!-- 2. POLITIQUE DE CONFIDENTIALITÉ (RGPD) -->
        <section id="fr-privacy" class="pt-16 scroll-mt-24">
          <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mb-6 flex items-center gap-3">
            <span class="font-mono text-accent text-lg">02.</span>
            <span>Politique de Confidentialité (RGPD)</span>
          </h2>
          <p class="text-sm text-secondary/60 mb-6">
            En application du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (RGPD) et de la loi n° 78-17 du 6 janvier 2018 relative à l'informatique, aux fichiers et aux libertés modifiée.
          </p>

          <div class="space-y-6">
            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.1. Données collectées & Principe de minimisation</h3>
              <p class="text-sm text-secondary/80 mb-3">
                Seules les informations strictement nécessaires sont collectées via le formulaire de contact :
              </p>
              <ul class="list-disc list-inside space-y-1 font-mono text-xs text-secondary/80 mb-3">
                <li><strong class="font-sans text-primary">Nom ou pseudonyme</strong> : identification de l'interlocuteur.</li>
                <li><strong class="font-sans text-primary">Adresse email</strong> : nécessaire pour formuler une réponse.</li>
                <li><strong class="font-sans text-primary">Message</strong> : teneur de votre échange professionnel.</li>
              </ul>
              <p class="text-sm text-secondary/80">
                <strong class="text-primary font-sans">Sécurité & Anti-abus :</strong> Votre adresse IP est temporairement traitée dans la mémoire vive volatile du serveur pour limiter les requêtes abusives (rate-limiting anti-bruteforce). Cette donnée n'est enregistrée dans aucune base de données permanente et s'efface automatiquement après 10 à 15 minutes.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.2. Finalité & Base légale du traitement</h3>
              <p class="text-sm text-secondary/80">
                Ces données ont pour unique finalité la gestion et le suivi des demandes de contact (opportunités de stage, collaborations de recherche, questions techniques). La base légale de ce traitement repose sur le consentement de l'utilisateur (Art. 6.1.a du RGPD) matérialisé par l'envoi volontaire du formulaire, ainsi que sur l'intérêt légitime mutuel (Art. 6.1.f du RGPD) d'établir une communication professionnelle.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.3. Destinataires & Sous-traitance</h3>
              <p class="text-sm text-secondary/80 mb-3">
                Paul Thomas est l'unique destinataire de vos messages. Aucune donnée n'est commercialisée, louée ou cédée à des tiers.
              </p>
              <p class="text-sm text-secondary/80">
                Pour l'acheminement technique sécurisé des courriels, le site s'appuie sur le prestataire <strong class="text-primary">Resend Inc.</strong> (fournisseur d'API transactionnelle d'emailing chiffrée de bout en bout).
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.4. Durée de conservation</h3>
              <p class="text-sm text-secondary/80">
                Les messages et coordonnées associées sont conservés le temps nécessaire au traitement de la correspondance. En l'absence d'échange actif ou d'obligation légale, ils sont supprimés sous 12 mois maximum ou immédiatement sur simple demande.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.5. Vos droits sur vos données</h3>
              <p class="text-sm text-secondary/80 mb-3">
                Conformément à la réglementation européenne, vous disposez des droits suivants :
              </p>
              <ul class="list-disc list-inside space-y-1 font-mono text-xs text-secondary/80 mb-4">
                <li>Droit d'accès et d'obtention d'une copie de vos données</li>
                <li>Droit de rectification de vos données inexactes</li>
                <li>Droit à l'effacement (« droit à l'oubli »)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
              <p class="text-sm text-secondary/80">
                Pour exercer l'un de ces droits, vous pouvez adresser votre demande accompagnée de tout élément utile à : <a href="mailto:contact@pthomas.fr" class="text-accent underline font-mono text-xs">contact@pthomas.fr</a>.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">2.6. Réclamation auprès de la CNIL</h3>
              <p class="text-sm text-secondary/80">
                Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de l'autorité de contrôle française compétente :
                <br>
                <strong class="text-primary">CNIL (Commission Nationale de l'Informatique et des Libertés)</strong>
                <br>
                3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07 — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" class="text-accent underline">https://www.cnil.fr</a>.
              </p>
            </div>
          </div>
        </section>

        <!-- 3. COOKIES & TRACEURS -->
        <section id="fr-cookies" class="pt-16 scroll-mt-24">
          <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mb-6 flex items-center gap-3">
            <span class="font-mono text-accent text-lg">03.</span>
            <span>Politique de Cookies & Traceurs</span>
          </h2>
          <div class="border border-accent/25 bg-accent/[0.02] p-6 mb-6">
            <div class="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider font-semibold mb-2">
              <Icon name="uil:shield-check" size="18px" />
              <span>Exemption de bandeau de consentement (CNIL)</span>
            </div>
            <p class="text-sm text-primary leading-relaxed">
              Ce site web est <strong>entièrement exempt de cookies traceurs, publicitaires ou de profilage</strong>. Aucun bandeau de consentement n'est affiché car aucun cookie soumis à consentement préalable n'est déposé sur votre terminal.
            </p>
          </div>

          <div class="space-y-6">
            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">3.1. Mesure d'audience respectueuse de la vie privée</h3>
              <p class="text-sm text-secondary/80 mb-3">
                Le site utilise <strong class="text-primary">Vercel Web Analytics</strong> et <strong class="text-primary">Vercel Speed Insights</strong> pour évaluer les performances de chargement et le trafic global.
              </p>
              <p class="text-sm text-secondary/80">
                Ces solutions fonctionnent selon une architecture <em>cookieless</em> : aucune empreinte persistante n'est stockée sur votre navigateur, aucun identifiant publicitaire n'est généré, et les adresses IP sont anonymisées immédiatement. Ce dispositif respecte scrupuleusement les recommandations de la CNIL (délibération n° 2020-091) relatives aux traceurs exemptés de consentement.
              </p>
            </div>
          </div>
        </section>

        <!-- 4. CONDITIONS D'UTILISATION (CGU) -->
        <section id="fr-terms" class="pt-16 scroll-mt-24">
          <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mb-6 flex items-center gap-3">
            <span class="font-mono text-accent text-lg">04.</span>
            <span>Conditions Générales d'Utilisation (CGU)</span>
          </h2>

          <div class="space-y-6">
            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">4.1. Objet du site</h3>
              <p class="text-sm text-secondary/80">
                Le site <a href="https://pthomas.fr" class="text-accent underline">https://pthomas.fr</a> est un portfolio personnel et professionnel visant à présenter les projets, parcours d'ingénierie, travaux de recherche et compétences de Paul Thomas.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">4.2. Responsabilité & Liens externes</h3>
              <p class="text-sm text-secondary/80 mb-3">
                L'éditeur s'efforce de fournir des informations précises et à jour. Toutefois, les contenus sont présentés à titre indicatif sans garantie expresse ou tacite.
              </p>
              <p class="text-sm text-secondary/80">
                Le site contient des liens hypertextes dirigeant vers des ressources extérieures (GitHub, LinkedIn, laboratoires, etc.). L'éditeur n'exerce aucun contrôle sur le contenu ou les pratiques de ces sites tiers et décline toute responsabilité quant à leur utilisation.
              </p>
            </div>

            <div class="border border-white/[0.06] bg-white/[0.015] p-5">
              <h3 class="font-display text-lg font-bold text-primary mb-3">4.3. Droit applicable & Juridiction</h3>
              <p class="text-sm text-secondary/80">
                Les présentes mentions légales et conditions d'utilisation sont régies par le droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes, les tribunaux compétents du ressort de Strasbourg seront seuls compétents.
              </p>
            </div>
          </div>
        </section>
      </div>

      <!-- Date of last update -->
      <div class="mt-16 pt-8 border-t border-white/[0.06] font-mono text-xs text-secondary/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span>{{ currentLang === 'en' ? 'Last updated: October 2026' : 'Dernière mise à jour : Octobre 2026' }}</span>
        <NuxtLink to="/" class="text-accent hover:underline">
          {{ currentLang === 'en' ? '← Back to Portfolio' : '← Retour au portfolio' }}
        </NuxtLink>
      </div>

    </article>
  </div>
</template>
