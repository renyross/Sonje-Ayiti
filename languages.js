// Traductions locales de l’interface ; le français reste le texte source.
(() => {
  const entries = [
    ['Accueil','Home','Inicio'],['À propos','About us','Quiénes somos'],['Programmes','Programs','Programas'],['Parrainer un étudiant','Sponsor a student','Apadrinar a un estudiante'],
    ['Faire un don','Donate','Donar'],['Faites un don maintenant','Donate now','Dona ahora'],['FAITES UN DON MAINTENANT','DONATE NOW','DONA AHORA'],['Blog et actualités','Blog and news','Blog y noticias'],['Écrivez-nous','Contact us','Escríbenos'],['Nous contacter','Contact us','Contáctanos'],
    ['Découvrir nos actions','Explore our work','Descubre nuestras acciones'],['Soutenir Sonje Ayiti','Support Sonje Ayiti','Apoya a Sonje Ayiti'],['NOTRE CONVICTION','OUR BELIEF','NUESTRA CONVICCIÓN'],['Qu’est-ce que','What is','¿Qué es'],['Sonje Ayiti ?','Sonje Ayiti?','Sonje Ayiti?'],
    ['En savoir plus sur Sonje Ayiti','Learn more about Sonje Ayiti','Más información sobre Sonje Ayiti'],['NOS 4 DOMAINES D’INTERVENTION','OUR FOUR AREAS OF WORK','NUESTRAS CUATRO ÁREAS DE ACCIÓN'],['Quatre axes.','Four areas.','Cuatro áreas.'],['Une même ambition.','One shared ambition.','Una misma ambición.'],
    ['Santé','Health','Salud'],['Éducation','Education','Educación'],['Développement économique','Economic development','Desarrollo económico'],['Agriculture','Agriculture','Agricultura'],['Notre approche communautaire','Our community approach','Nuestro enfoque comunitario'],['Explorer nos programmes','Explore our programs','Explora nuestros programas'],
    ['NOS ZONES D’INTERVENTION','WHERE WE WORK','DÓNDE TRABAJAMOS'],['Ancrés dans le Nord.','Rooted in the North.','Arraigados en el Norte.'],['Engagés dans le','Committed to','Comprometidos con el'],['Nord-Est d’Haïti.','Northeast Haiti.','Noreste de Haití.'],['Zones d’intervention','Areas of intervention','Zonas de intervención'],['Axes complémentaires','Complementary areas','Áreas complementarias'],
    ['UNE PRÉSENCE DE PROXIMITÉ','A LOCAL PRESENCE','UNA PRESENCIA CERCANA'],['Au cœur des communautés.','At the heart of communities.','En el corazón de las comunidades.'],['Toutes les zones (6)','All areas (6)','Todas las zonas (6)'],['Nord (4)','North (4)','Norte (4)'],['Nord-Est (2)','Northeast (2)','Noreste (2)'],
    ['MESURE & ÉVALUATION','MEASUREMENT & EVALUATION','MEDICIÓN Y EVALUACIÓN'],['Notre impact','Our impact','Nuestro impacto'],['en chiffres.','in numbers.','en cifras.'],['ÉDUCATION','EDUCATION','EDUCACIÓN'],['FORMATION','TRAINING','FORMACIÓN'],['ÉCONOMIE','ECONOMY','ECONOMÍA'],['COMMUNAUTÉ','COMMUNITY','COMUNIDAD'],['RÉSEAU','NETWORK','RED'],
    ['enfants accompagnés vers l’école','children supported in education','niños apoyados en su educación'],['jeunes formés à un métier','young people trained for a profession','jóvenes formados para una profesión'],['entrepreneurs et micro-activités soutenus','entrepreneurs and small businesses supported','emprendedores y pequeños negocios apoyados'],['projets communautaires réalisés','community projects completed','proyectos comunitarios realizados'],['partenaires et écoles mobilisés','partners and schools involved','socios y escuelas involucrados'],
    ['MÉTHODOLOGIE PARTICIPATIVE','PARTICIPATORY APPROACH','METODOLOGÍA PARTICIPATIVA'],['Écouter & évaluer','Listen & assess','Escuchar y evaluar'],['Éduquer & rééduquer','Educate & relearn','Educar y reaprender'],['Créer & mettre en œuvre','Create & implement','Crear e implementar'],
    ['SOUTENIR UN PARCOURS D’AVENIR','SUPPORT A PATH TO THE FUTURE','APOYAR UN CAMINO HACIA EL FUTURO'],['Parrainer','Sponsor','Apadrinar'],['un étudiant.','a student.','a un estudiante.'],['Découvrir le parrainage','Explore student sponsorship','Descubre el apadrinamiento'],
    ['SOUTENIR SONJE AYITI','SUPPORT SONJE AYITI','APOYA A SONJE AYITI'],['Faire un don.','Make a donation.','Haz una donación.'],['Soutenir notre mission.','Support our mission.','Apoya nuestra misión.'],['Je fais un don','Make a donation','Quiero donar'],['VOTRE GÉNÉROSITÉ, VOTRE CHOIX','YOUR GENEROSITY, YOUR CHOICE','TU GENEROSIDAD, TU ELECCIÓN'],['Don ponctuel','One-time donation','Donación única'],['Don régulier','Recurring donation','Donación periódica'],['01 · Votre rythme','01 · Frequency','01 · Frecuencia'],['02 · Votre montant','02 · Amount','02 · Importe'],['03 · Votre moyen de paiement','03 · Payment method','03 · Método de pago'],['Processeur de paiement :','Payment provider:','Proveedor de pago:'],['Autre montant','Other amount','Otro importe'],['La cause qui vous tient à cœur','The cause you care about','La causa que te importa'],
    ['LES DERNIÈRES NOUVELLES','LATEST NEWS','ÚLTIMAS NOTICIAS'],['RESTONS CONNECTÉS','STAY CONNECTED','SIGAMOS EN CONTACTO'],['S’informer,','Stay informed,','Informarse,'],['c’est déjà agir.','start making a difference.','ya es actuar.'],['Recevez les actualités de Sonje Ayiti, les avancées de nos projets et les témoignages du terrain.','Receive news from Sonje Ayiti, project updates and stories from the field.','Recibe noticias de Sonje Ayiti, avances de nuestros proyectos y testimonios del terreno.'],['Votre prénom','Your first name','Tu nombre'],['Votre adresse email','Your email address','Tu correo electrónico'],['Je m’inscris','Sign up','Suscribirme'],['Synthèse mensuelle de nos actions','Monthly updates on our work','Resumen mensual de nuestras acciones'],['Reportages et témoignages exclusifs','Exclusive stories and testimonials','Reportajes y testimonios exclusivos'],['Aucun spam · Désinscription en 1 clic','No spam · Unsubscribe in one click','Sin spam · Cancela con un clic'],
    ['L’organisation','The organization','La organización'],['Nos actions','Our work','Nuestras acciones'],['Restons en contact','Get in touch','Mantengamos el contacto'],['Notre approche','Our approach','Nuestro enfoque'],['Où nous agissons','Where we work','Dónde trabajamos'],['Actualités','News','Noticias'],['Confidentialité','Privacy','Privacidad'],['Mentions légales','Legal notice','Aviso legal'],['Retour en haut ↑','Back to top ↑','Volver arriba ↑'],['PHOTOGRAPHIES D’ILLUSTRATION','ILLUSTRATIVE PHOTOGRAPHS','FOTOGRAFÍAS ILUSTRATIVAS']
  ];
  const dictionary = new Map(entries.map(row => [row[0], row]));
  const normalize = value => value.replace(/\s+/g, ' ').trim();
  const records = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script,style,#site-language')) continue;
    const row = dictionary.get(normalize(node.textContent));
    if (row) records.push({ node, original: node.textContent, row });
  }
  const attributes = [];
  document.querySelectorAll('[placeholder],[aria-label]').forEach(element => {
    for (const name of ['placeholder', 'aria-label']) {
      const original = element.getAttribute(name);
      const row = original && dictionary.get(normalize(original));
      if (row) attributes.push({ element, name, original, row });
    }
  });
  const select = document.querySelector('#site-language');
  function apply(lang) {
    const index = {fr:0,en:1,es:2}[lang] ?? 0;
    records.forEach(({node,original,row}) => { node.textContent = index ? original.replace(original.trim(), row[index]) : original; });
    attributes.forEach(({element,name,original,row}) => element.setAttribute(name, index ? row[index] : original));
    select.value = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem('sonje-language', lang); } catch {}
  }
  select.addEventListener('change', () => apply(select.value));
  let saved = 'fr';
  try { saved = localStorage.getItem('sonje-language') || 'fr'; } catch {}
  apply(['fr','en','es'].includes(saved) ? saved : 'fr');
})();
