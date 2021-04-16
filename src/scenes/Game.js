import CardsManager from '../helpers/CardsManager';
import cardsImg from '../assets/timeline-cards.png';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    this.load.spritesheet('cards', cardsImg, { frameWidth: 128, frameHeight: 176 });
  }

  create() {
    let nbPlayers = 2;

    // Intialize the data
    let cardsManager = new CardsManager(this);

    let cardsDeck = cardsManager.createDeck();
    let playersHand = cardsManager.initialDeal(nbPlayers, cardsDeck);
    let cardsTrash = [];

    // Draw the game
    cardsDeck.forEach((card, cardIndex) => card.img = cardsManager.render(75 + cardIndex * 2 ,this.game.config.height / 3, 'cards', card.id, false));
   
    let trashZone = this.add.graphics();
    trashZone.lineStyle(4, 0xff0000);
    trashZone.strokeRoundedRect(10, this.game.config.height * 2 / 3, 128, 176, 15);

    playersHand.forEach((player, playerIndex) => {
      player.forEach((card, cardIndex) => {
        if (playerIndex == 0) {
          card.img = cardsManager.render(200 + cardIndex * 140, this.game.config.height - 10, 'cards', card.id).setOrigin(0, 1);
        }
        else if (playerIndex == 1) {
          card.img = cardsManager.render(200 + cardIndex * 140, 10, 'cards', card.id).setOrigin(0, 0);
        }
        card.img.setInteractive();
      });
    })

    // Add events
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on('pointerover', function (pointer, gameObject) {
      gameObject[0].depth = 1000;
      gameObject[0].setScale(1.5);
    });
    this.input.on('pointerout', function (pointer, gameObject) {
      gameObject[0].depth = 0;
      gameObject[0].setScale(1)
    });

   /* 
      let dropZone = this.add.zone(10, this.game.config.height / 3, 128, 176).setInteractive();
      deckZone.on('pointerdown', () => {
        if(!cardsDeck.length) {
          cardsManager.fillDeck(cardsDeck, cardsTrash);
        }
        cardsManager.dealCard(playersHand[0],cardsDeck)
        //card.img.setTexture('cards', imgId);
      });
    */
      /**
       * Change origin when dealing and trashing cards ?
       * Put deck cards into a container ? Idem for players hand ?
       */
  }

  update() {
   
   /* if(!this.cardsDeck.length && this.cardsTrash.length) {
      this.CardsManager.fillDeck(this.cardsDeck, this.cardsTrash);
    }
    */
  }
}