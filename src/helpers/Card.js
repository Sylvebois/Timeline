export class Card extends Phaser.GameObjects.Container {
  constructor(scene, x, y, imgNb, additionalData) {
    super(scene);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.cardData = additionalData;

    const cardBack = this.scene.add.sprite(0, 0, 'cardBackground').setOrigin(0, 0);
    const cardImg = this.scene.add.sprite(16, 15, 'cardImg', imgNb).setOrigin(0, 0);
    const cardTxt = this.scene.add.text(18, 157, this.cardData.name, { fill: '#000', fontSize: '12px', wordWrap: { width: 125 } }).setOrigin(0, 0);
    const cardDate = this.scene.add.text(80, 210, this.cardData.date, { fontStyle: 'bold' }).setOrigin(0.5, 0).setVisible(false);

    this.setSize(160, 240);
    this.setScale(0.75);
    this.add([cardBack, cardImg, cardTxt, cardDate]);
    this.setInteractive(new Phaser.Geom.Rectangle(this.width / 2, this.height / 2, this.width, this.height), Phaser.Geom.Rectangle.Contains);

    this.on('pointerover', () => {
      if (this.parentContainer) {
        this.parentContainer.bringToTop(this);
      }
      this.setScale(1);
    });

    this.on('pointerout', () => this.setScale(0.75));

    this.scene.add.existing(this);
  }

}

export const cardsData = [
  { id: 0, name: 'Début de la construction de Notre-Dame de Paris', creator: '', collection: 'France', date: 1163 },
  { id: 1, name: 'Premier recueil des Fables de La Fontaine', creator: '', collection: 'France', date: 1668 },
  { id: 2, name: 'Siège de Gergovie et d’Alésia', creator: '', collection: 'France', date: -52 },
  { id: 3, name: 'Attila, le roi des Huns, envahit la Gaule', creator: '', collection: 'France', date: 451 },
  { id: 4, name: 'Début du règne de Charlemagne', creator: '', collection: 'France', date: 768 },
  { id: 5, name: 'Première apparition de Sherlock Holmes', creator: 'Arthur Conan Doyle', collection: 'General', date: 1887 },
  { id: 6, name: 'Sortie du film La Guerre des Etoiles', creator: 'Georges Lucas', collection: 'General', date: 1977 },
  { id: 7, name: 'Création de Facebook', creator: 'Mark Zuckerberg', collection: 'General', date: 2004 },
  { id: 8, name: 'Invention de la carte à jouer', creator: '', collection: 'General', date: 900 },
  { id: 9, name: 'Création de la NBA', creator: '', collection: 'General', date: 1946 },
  { id: 10, name: 'Apparition du croissant', creator: '', collection: 'General', date: 1683 },
  { id: 11, name: 'Invention de l’ampoule électrique', creator: 'Thomas Edison', collection: 'Invention', date: 1879 },
  { id: 12, name: 'Invention du cinématographe', creator: 'Auguste et Louis Lumière', collection: 'Invention', date: 1895 },
  { id: 13, name: 'Théorie de la relativité', creator: 'Albert Einstein', collection: 'Invention', date: 1915 },
  { id: 14, name: 'Premier ordinateur portable', creator: 'Adam Osborne', collection: 'Invention', date: 1981 },
  { id: 15, name: 'Apparition des abeilles', creator: '', collection: 'General', date: -100000000 },
  { id: 16, name: 'Invention du dé', creator: '', collection: 'General', date: -3000 },
  { id: 17, name: 'Début de la construction du phare d\'Alexandrie', creator: '', collection: 'General', date: -297 },
  { id: 18, name: 'Cléopâtre est couronnée reine d\'Egypte', creator: '', collection: 'General', date: -51 },
  { id: 19, name: 'Domestication du feu', creator: '', collection: 'Invention', date: -600000 },
  { id: 20, name: 'Débuts de l\'écriture', creator: '', collection: 'Invention', date: -3400 },
  { id: 21, name: 'Invention de la brosse à dents', creator: '', collection: 'Invention', date: 1498 },
  { id: 22, name: 'Invention du microscope', creator: 'Zacharias Jansen', collection: 'Invention', date: 1590 },
  { id: 23, name: 'Invention du thermomètre', creator: 'Galilée', collection: 'Invention', date: 1612 },
  { id: 24, name: 'Invention du code morse', creator: 'Samuel Finley Morse', collection: 'Invention', date: 1838 },
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

  render(x, y, imgNb, additionalData) {
    let card = this.scene.add.sprite(x, y, 'cards', imgNb).setScale(0.75);
    card.cardData = additionalData;
    return card;
  }
*/