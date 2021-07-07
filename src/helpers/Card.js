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
  { id: 0, name: 'Siège de Gergovie et d’Alésia', creator: '', collection: 'France', date: -52 },
  { id: 1, name: 'Attila, le roi des Huns, envahit la Gaule', creator: '', collection: 'France', date: 451 },
  { id: 2, name: 'Début du règne de Charlemagne', creator: '', collection: 'France', date: 768 },
  { id: 3, name: 'Début de la construction de Notre-Dame de Paris', creator: '', collection: 'France', date: 1163 },            // OK
  { id: 4, name: 'Premier recueil des Fables de La Fontaine', creator: '', collection: 'France', date: 1668 },                  // OK
  { id: 5, name: 'Apparition des abeilles', creator: '', collection: 'General', date: -100000000 },                             // OK
  { id: 6, name: 'Invention du dé', creator: '', collection: 'General', date: -3000 },                                          // OK
  { id: 7, name: 'Début de la construction du phare d\'Alexandrie', creator: '', collection: 'General', date: -297 },           // OK
  { id: 8, name: 'Cléopâtre est couronnée reine d\'Egypte', creator: '', collection: 'General', date: -51 },                    // OK
  { id: 9, name: 'Invention de la carte à jouer', creator: '', collection: 'General', date: 900 },                              // OK
  { id: 10, name: 'Apparition du croissant', creator: '', collection: 'General', date: 1683 },                                  // OK
  { id: 11, name: 'Première apparition de Sherlock Holmes', creator: 'Arthur Conan Doyle', collection: 'General', date: 1887 }, // OK
  { id: 12, name: 'Création de la NBA', creator: '', collection: 'General', date: 1946 },                                       // OK
  { id: 13, name: 'Sortie du film La Guerre des Etoiles', creator: 'Georges Lucas', collection: 'General', date: 1977 },        // OK
  { id: 14, name: 'Création de Facebook', creator: 'Mark Zuckerberg', collection: 'General', date: 2004 },                      // OK
  { id: 15, name: 'Domestication du feu', creator: '', collection: 'Invention', date: -600000 },
  { id: 16, name: 'Débuts de l\'écriture', creator: '', collection: 'Invention', date: -3400 },
  { id: 17, name: 'Invention de la brosse à dents', creator: '', collection: 'Invention', date: 1498 },
  { id: 18, name: 'Invention du microscope', creator: 'Zacharias Jansen', collection: 'Invention', date: 1590 },
  { id: 19, name: 'Invention du thermomètre', creator: 'Galilée', collection: 'Invention', date: 1612 },
  { id: 20, name: 'Invention du code morse', creator: 'Samuel Finley Morse', collection: 'Invention', date: 1838 },
  { id: 21, name: 'Invention de l’ampoule électrique', creator: 'Thomas Edison', collection: 'Invention', date: 1879 },
  { id: 22, name: 'Invention du cinématographe', creator: 'Auguste et Louis Lumière', collection: 'Invention', date: 1895 },
  { id: 23, name: 'Théorie de la relativité', creator: 'Albert Einstein', collection: 'Invention', date: 1915 },
  { id: 24, name: 'Premier ordinateur portable', creator: 'Adam Osborne', collection: 'Invention', date: 1981 },
];