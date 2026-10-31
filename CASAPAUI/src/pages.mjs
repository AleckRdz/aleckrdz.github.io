import { layout } from './components.mjs';
import { frontCover, manifesto, servicePlan } from './lookbook.mjs';
import { spacesSection, materialsSection, contactSection, collectionBody } from './sections.mjs';

export function homepage() {
  return layout(
    'Casa PPaui | Cocinas, closets y muebles a medida en Monterrey',
    'Diseñando espacios, construyendo historias. Cocinas, vestidores, baños y muebles a medida en Monterrey, con herrajes Blum y más de 10 años de experiencia.',
    `${frontCover()}${manifesto()}${servicePlan()}${spacesSection()}${materialsSection()}${contactSection()}`,
    { home: true },
  );
}

export function collectionPage() {
  return layout(
    'Vanities Collection | Muebles de baño listos para llevar | Casa PPaui',
    'Vanities de 80 cm en encino sólido o MDF, con lavabo incluido y herrajes Blum. Entrega en Monterrey.',
    collectionBody(),
    { current: 'collection' },
  );
}
