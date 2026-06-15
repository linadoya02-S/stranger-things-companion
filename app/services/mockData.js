// =============================================================
// API simulada - Stranger Things Companion
// Simula respuestas de json-server corriendo en http://localhost:3000
// =============================================================

const BASE_URL = "http://localhost:3000";

// ── Datos de muestra (fallback si la API no está activa) ──────
export const MOCK_CHARACTERS = [
  {
    id: 1,
    name: "Eleven",
    realName: "Jane Hopper",
    actor: "Millie Bobby Brown",
    season: 1,
    status: "Alive",
    affiliation: "Party",
    description:
      "Chica con poderes telequinéticos criada en el Laboratorio Nacional de Hawkins. Tiene la capacidad de mover objetos con la mente y abrir portales al Mundo del Revés.",
    powers: ["Telequinesis", "Telepatía", "Habilidades psíquicas"],
    image: "eleven",
    favorite: false,
  },
  {
    id: 2,
    name: "Mike Wheeler",
    realName: "Mike Wheeler",
    actor: "Finn Wolfhard",
    season: 1,
    status: "Alive",
    affiliation: "Party",
    description:
      "Líder del grupo de amigos. Es quien organiza al Party y tiene un papel central en la búsqueda de Will Byers en la primera temporada.",
    powers: [],
    image: "mike",
    favorite: false,
  },
  {
    id: 3,
    name: "Dustin Henderson",
    realName: "Dustin Henderson",
    actor: "Gaten Matarazzo",
    season: 1,
    status: "Alive",
    affiliation: "Party",
    description:
      "El cerebro del grupo, experto en tecnología y ciencias. Crea el sistema de comunicación Cerebro y es quien descubre a Dart.",
    powers: [],
    image: "dustin",
    favorite: false,
  },
  {
    id: 4,
    name: "Lucas Sinclair",
    realName: "Lucas Sinclair",
    actor: "Caleb McLaughlin",
    season: 1,
    status: "Alive",
    affiliation: "Party",
    description:
      "Miembro pragmático del Party. Siempre lleva su honda y binoculares. Es el más escéptico del grupo pero también el más valiente.",
    powers: [],
    image: "lucas",
    favorite: false,
  },
  {
    id: 5,
    name: "Will Byers",
    realName: "Will Byers",
    actor: "Noah Schnapp",
    season: 1,
    status: "Alive",
    affiliation: "Party",
    description:
      "El chico cuya desaparición desencadena los eventos de la primera temporada. Tras su rescate del Mundo del Revés, sigue siendo vulnerable a sus efectos.",
    powers: ["Conexión con el Mundo del Revés"],
    image: "will",
    favorite: false,
  },
  {
    id: 6,
    name: "Jim Hopper",
    realName: "Jim Hopper",
    actor: "David Harbour",
    season: 1,
    status: "Alive",
    affiliation: "Hawkins PD",
    description:
      "Jefe de la policía de Hawkins e hijo adoptivo de Eleven. Veterano de Vietnam marcado por la muerte de su hija Sara.",
    powers: [],
    image: "hopper",
    favorite: false,
  },
  {
    id: 7,
    name: "Joyce Byers",
    realName: "Joyce Byers",
    actor: "Winona Ryder",
    season: 1,
    status: "Alive",
    affiliation: "Civilians",
    description:
      "Madre de Will y Jonathan. Incansable en su búsqueda de la verdad sobre la desaparición de su hijo, incluso cuando nadie la cree.",
    powers: [],
    image: "joyce",
    favorite: false,
  },
  {
    id: 8,
    name: "Max Mayfield",
    realName: "Max Mayfield",
    actor: "Sadie Sink",
    season: 2,
    status: "Recovering",
    affiliation: "Party",
    description:
      "Chica nueva en Hawkins desde California. Patinadora experta y jugadora de videojuegos. Se une al Party en la segunda temporada.",
    powers: [],
    image: "max",
    favorite: false,
  },
];

export const MOCK_CREATURES = [
  {
    id: 1,
    name: "Demogorgon",
    season: 1,
    origin: "Upside Down",
    threat: "Extreme",
    description:
      "Criatura sin rostro con una cabeza que se abre como una flor carnívora. Puede crear portales entre dimensiones y es atraído por la sangre.",
    weaknesses: ["Fuego", "Luz intensa"],
    firstAppearance: "Temporada 1, Episodio 1",
    image: "demogorgon",
  },
  {
    id: 2,
    name: "Mind Flayer",
    season: 2,
    origin: "Upside Down",
    threat: "Extreme",
    description:
      "Entidad de la Dimensión Oscura con forma de tormenta masiva. Capaz de controlar mentes y crear un ejército de huéspedes poseídos.",
    weaknesses: ["Fuego", "Separación de su huésped"],
    firstAppearance: "Temporada 2, Episodio 1",
    image: "mindflaer",
  },
  {
    id: 3,
    name: "Demodogs",
    season: 2,
    origin: "Upside Down",
    threat: "High",
    description:
      "Forma adulta del Demogorgon que se desplaza en grupos. Son rápidos y coordinados, actuando como un enjambre controlado por el Mind Flayer.",
    weaknesses: ["Fuego", "Separarse del Mind Flayer"],
    firstAppearance: "Temporada 2, Episodio 6",
    image: "demodogs",
  },
  {
    id: 4,
    name: "Vecna",
    season: 4,
    origin: "Upside Down",
    threat: "Extreme",
    description:
      "Conocido en la realidad como Henry Creel/001. Fue el primer sujeto del Dr. Brenner y es el verdadero controlador del Mundo del Revés.",
    weaknesses: ["Música", "Luz"],
    firstAppearance: "Temporada 4, Episodio 1",
    image: "vecna",
  },
];

export const MOCK_LOCATIONS = [
  {
    id: 1,
    name: "Hawkins, Indiana",
    type: "Town",
    season: 1,
    description:
      "Ciudad ficticia en Indiana donde se desarrolla la mayor parte de la historia. Sede del Laboratorio Nacional de Hawkins.",
    notableFor: ["Hogar del Party", "Laboratorio Hawkins", "Lago Lover's"],
    image: "hawkins",
  },
  {
    id: 2,
    name: "El Mundo del Revés",
    type: "Alternate Dimension",
    season: 1,
    description:
      "Dimensión paralela oscura y desolada que es un reflejo siniestro del mundo real. Está plagado de criaturas y cubierto de partículas oscuras.",
    notableFor: ["Hogar del Demogorgon", "Prisión de Will", "Origen del Mind Flayer"],
    image: "upside_down",
  },
  {
    id: 3,
    name: "Laboratorio Hawkins",
    type: "Government Facility",
    season: 1,
    description:
      "Instalación del gobierno donde el Dr. Brenner realizaba experimentos con niños con habilidades psíquicas, incluyendo a Eleven.",
    notableFor: ["Origen de Eleven", "Portal al Mundo del Revés", "Proyecto MKUltra"],
    image: "lab",
  },
  {
    id: 4,
    name: "Starcourt Mall",
    type: "Shopping Mall",
    season: 3,
    description:
      "Centro comercial de Hawkins que esconde una base rusa secreta en su sótano, donde los soviéticos intentan reabrir el portal al Mundo del Revés.",
    notableFor: ["Base rusa secreta", "Batalla de Starcourt", "Scoop Troop"],
    image: "starcourt",
  },
];

export const MOCK_SEASONS = [
  {
    id: 1,
    title: "Temporada 1",
    year: 2016,
    episodes: 8,
    synopsis:
      "Will Byers desaparece misteriosamente en Hawkins, Indiana. Sus amigos Mike, Dustin y Lucas conocen a una chica con poderes extraños llamada Eleven mientras buscan a su amigo.",
    mainEnemy: "Demogorgon",
    rating: 8.8,
  },
  {
    id: 2,
    title: "Temporada 2",
    year: 2017,
    episodes: 9,
    synopsis:
      "Will ha regresado pero algo oscuro lo persigue. El Mind Flayer amenaza Hawkins mientras Eleven busca sus orígenes en una peligrosa misión solitaria.",
    mainEnemy: "Mind Flayer",
    rating: 8.7,
  },
  {
    id: 3,
    title: "Temporada 3",
    year: 2019,
    episodes: 8,
    synopsis:
      "Un nuevo centro comercial llega a Hawkins ocultando una conspiración rusa. El grupo debe enfrentarse a una nueva versión del Mind Flayer.",
    mainEnemy: "Mind Flayer (físico)",
    rating: 8.6,
  },
  {
    id: 4,
    title: "Temporada 4",
    year: 2022,
    episodes: 9,
    synopsis:
      "El grupo está separado por el mundo. Un nuevo y aterrador mal llamado Vecna amenaza Hawkins y sus oscuros secretos revelan el verdadero origen del Mundo del Revés.",
    mainEnemy: "Vecna",
    rating: 9.0,
  },
];

// ── Funciones de acceso a API ─────────────────────────────────

async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch {
    // Fallback a datos mock si la API no está disponible
    return null;
  }
}

export const api = {
  getCharacters: async () => {
    const data = await fetchFromAPI("/characters");
    return data ?? MOCK_CHARACTERS;
  },
  getCharacter: async (id) => {
    const data = await fetchFromAPI(`/characters/${id}`);
    return data ?? MOCK_CHARACTERS.find((c) => c.id === parseInt(id));
  },
  getCreatures: async () => {
    const data = await fetchFromAPI("/creatures");
    return data ?? MOCK_CREATURES;
  },
  getCreature: async (id) => {
    const data = await fetchFromAPI(`/creatures/${id}`);
    return data ?? MOCK_CREATURES.find((c) => c.id === parseInt(id));
  },
  getLocations: async () => {
    const data = await fetchFromAPI("/locations");
    return data ?? MOCK_LOCATIONS;
  },
  getSeasons: async () => {
    const data = await fetchFromAPI("/seasons");
    return data ?? MOCK_SEASONS;
  },
  searchAll: async (query) => {
    const [chars, creatures, locations] = await Promise.all([
      api.getCharacters(),
      api.getCreatures(),
      api.getLocations(),
    ]);
    const q = query.toLowerCase();
    return {
      characters: chars.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      ),
      creatures: creatures.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      ),
      locations: locations.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      ),
    };
  },
};
