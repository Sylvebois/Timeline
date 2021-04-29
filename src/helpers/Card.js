export class Card {
  constructor(scene){
    this.scene = scene;
  }

  render(x, y, imgNb, additionalData) {
    let card = this.scene.add.sprite(x, y, 'cards', imgNb).setScale(0.75);
    card.cardData = additionalData;
    return card;
  }
}

export const cardsData = [
  { id: 0, name: 'Début de la construction de Notre-Dame de Paris', date: 1163 },
  { id: 1, name: 'Premier recueil des Fables de La Fontaine', date: 1668 },
  { id: 2, name: 'Siège de Gergovie et d’Alésia', date: -52 },
  { id: 3, name: 'Attila, le roi des Huns, envahit la Gaule', date: 451 },
  { id: 4, name: 'Début du règne de Charlemagne', date: 768 },
  { id: 5, name: 'Première apparition de Sherlock Holmes', date: 1887 },
  { id: 6, name: 'Sortie du film La Guerre des Etoiles', date: 1977 },
  { id: 7, name: 'Création de Facebook', date: 2004 },
  { id: 8, name: 'Invention de la carte à jouer', date: 900 },
  { id: 9, name: 'Création de la NBA', date: 1946 },
  { id: 10, name: 'Apparition du croissant', date: 1683 },
  { id: 11, name: 'Invention de l’ampoule électrique', date: 1879 },
  { id: 12, name: 'Invention du cinématographe', date: 1895 },
  { id: 13, name: 'Théorie de la relativité', date: 1915 },
  { id: 14, name: 'Premier ordinateur portable', date: 1981 },
  { id: 15, name: 'Apparition des abeilles', date: -100000000 },
  { id: 16, name: 'Invention du dé', date: -3000 },
  { id: 17, name: 'Début de la construction du phare d\'Alexandrie', date: -297 },
  { id: 18, name: 'Cléopâtre est couronnée reine d\'Egypte', date: -51 },
];
/*
export  const cardsData = [
  { id: 1, name: 'Le Parthénon', date: -447 },
  { id: 2, name: 'Notre-Dame de Paris', date: 1162 },
  { id: 3, name: 'Le mont Saint-Michel', date: 708 },
  { id: 4, name: 'La pyramide de Khéops', date: -2560 },
  { id: 5, name: 'Le Colisée', date: 70 },
  { id: 6, name: 'La tour Eiffel', date: 1887 },
  { id: 7, name: 'La tour de Pise', date: 1172 },
  { id: 8, name: 'Le Palais idéal', date: 1879 },
  { id: 9, name: 'La statue de la Liberté', date: 1886 },
  { id: 10, name: 'Le Taj Mahal', date: 1621 },
  { id: 11, name: 'Le cercle de Stonehenge', date: -2800 },
  { id: 12, name: 'Les alignements de Carnac', date: -5000 }
];
*/