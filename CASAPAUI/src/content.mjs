// Casa PPaui — contenido del sitio.
// Sustituye la URL de Formspree por la de tu formulario antes de publicar.
export const settings = { year: 2026, formEndpoint: 'https://formspree.io/f/XXXXXXXX' };

export const contact = {
  whatsapp: '811 031 8238',
  instagram: '@casappaui',
  instagramHref: 'https://instagram.com/casappaui',
  office: 'Monterrey, con cita',
  email: 'casappaui@gmail.com',
};

export const links = {
  general: 'https://wa.me/528110318238?text=Hola%20Casa%20PPaui%2C%20quiero%20cotizar%20un%20proyecto',
  lino: 'https://wa.me/528110318238?text=Hola%2C%20me%20interesa%20el%20vanity%20Lino',
  rovere: 'https://wa.me/528110318238?text=Hola%2C%20me%20interesa%20el%20vanity%20Rovere',
};

export const featured = [
  { label: 'Cocina', title: 'Cocina en encino', line: 'Calidez de madera, detalles en latón.', image: 'cocina-despues.jpg.jpeg', alt: 'Cocina de encino con cubierta de piedra en Monterrey' },
  { label: 'Vestidor', title: 'Walk-in closet en encino', line: 'Cada cosa en su lugar.', image: 'closet-general.jpg.jpeg', alt: 'Vestidor walk-in de encino con cajoneras en Monterrey' },
  { label: 'Cocina', title: 'Cocina contemporánea', line: 'Tono nogal, de piso a techo.', image: 'cocina-nogal.jpg.jpeg', alt: 'Cocina contemporánea en tono nogal de piso a techo' },
];

// Los títulos aparecen en el plano y en el acordeón del proceso.
export const steps = [
  {
    room: 'Inspiración',
    title: 'Inspiración para tu remodelación.',
    text: 'Platicamos de cómo vives, lo que te gusta y lo que tu espacio necesita. Reunimos ideas, referencias y medidas.',
    cta: 'Empieza tu proyecto',
    href: links.general,
  },
  {
    room: 'Proyecto y propuesta',
    title: 'Tu proyecto y propuesta económica.',
    text: 'Definimos diseño, materiales y alcance, y te entregamos una propuesta económica clara antes de empezar.',
    cta: 'Solicita tu propuesta',
    href: links.general,
  },
  {
    room: 'Bienvenido a casa',
    title: 'Bienvenido a tu <span class="dynamic-word" id="palabra-cambiante">nuevo hogar</span>.',
    text: 'Ejecutamos, instalamos y entregamos tu espacio listo para estrenar.',
    cta: 'Cotiza tu proyecto',
    href: links.general,
  },
];

export const words = ['nuevo hogar', 'nueva cocina', 'nuevo closet', 'nuevo baño', 'nuevo espacio'];

export const process = [
  { title: 'Tu perspectiva.', text: 'Escuchamos lo que importa: los grandes planes y los pequeños rituales de cada día.' },
  { title: 'Una imagen clara.', text: 'Diseño, materiales y presupuesto definidos desde el inicio. Sabes exactamente qué vas a recibir.' },
  { title: 'Espacio para lo que sigue.', text: 'Te acompañamos de la primera visita a la entrega, con comunicación clara en cada paso.' },
];

export const materials = [
  { code: 'M / 01', title: 'Tableros Arauco', text: 'Superficie uniforme para acabados lisos y perfectos.' },
  { code: 'M / 02', title: 'Madera sólida', text: 'Encino y maderas finas de Maderería Torres.' },
  { code: 'M / 03', title: 'Herrajes 100% Blum', text: 'Cierre suave BLUMOTION y bisagras probadas en 200,000 aperturas.' },
];

export const spaces = [
  {
    code: 'CP / 01', category: 'Cocinas', title: 'Cocinas',
    phrase: 'El corazón de la casa, hecho a tu medida.',
    details: 'Gabinetes · Cubiertas · Salpicaderos · Iluminación',
    image: 'cocina-esquinero.jpg.jpeg', alt: 'Cocina con esquinero y gabinetes a medida en Monterrey',
    href: links.general,
  },
  {
    code: 'CP / 02', category: 'Vestidores', title: 'Vestidores y closets',
    phrase: 'Cada cosa en su lugar, todos los días.',
    details: 'Walk-in closets · Cajoneras · Entrepaños · Colgadores',
    image: 'closet-cajonera.jpg.jpeg', alt: 'Closet con cajonera y entrepaños en Monterrey',
    href: links.general,
  },
  {
    code: 'CP / 03', category: 'Baños', title: 'Baños',
    phrase: 'Tu rutina de cada mañana, más ligera.',
    details: 'Gabinetes · Cubiertas · Pisos · Muros · Iluminación',
    image: 'bano.jpg.jpeg', alt: 'Baño con mueble y acabados a medida en Monterrey',
    href: links.general,
  },
  {
    code: 'CP / 04', category: 'Empotrados', title: 'Muebles empotrados',
    phrase: 'Libreros y muebles que se integran a tu casa.',
    details: 'Recámaras · Estancias · Estudios · Escritorios',
    image: 'recamara-oscura.jpg.jpeg', alt: 'Recámara con muebles empotrados en tono oscuro',
    href: links.general,
  },
  {
    code: 'CP / 05', category: 'Collection', title: 'Vanities Collection',
    phrase: 'Piezas de diseño, listas para llevar.',
    details: 'Lino · Rovere · 80 × 50 cm · Lavabo incluido · Herrajes Blum',
    image: 'bano-detalle.jpg.jpeg', alt: 'Detalle de baño con mueble y lavabo en Monterrey',
    href: links.general,
  },
];

export const vanities = [
  {
    code: 'CL / 01', name: 'Lino', price: '$9,500 MXN',
    image: 'bano-detalle.jpg.jpeg', alt: 'Mueble de baño con lavabo integrado (foto de referencia)',
    specs: [['Mueble', 'MDF en tono beige'], ['Lavabo', 'Blanco integrado'], ['Medidas', '80 × 50 cm'], ['Versiones', 'Flotado o a piso'], ['Herrajes', 'Blum']],
    href: links.lino,
  },
  {
    code: 'CL / 02', name: 'Rovere', price: '$13,900 MXN',
    image: 'bano.jpg.jpeg', alt: 'Mueble de baño en tono madera con lavabo (foto de referencia)',
    specs: [['Mueble', 'Encino sólido'], ['Lavabo', 'Cuarzo'], ['Medidas', '80 × 50 cm'], ['Versiones', 'Flotado o a piso'], ['Herrajes', 'Blum']],
    href: links.rovere,
  },
];

export const interests = [
  'Cocina', 'Vestidor o closet', 'Baño', 'Mueble empotrado', 'Vanity Collection', 'Otro',
];
