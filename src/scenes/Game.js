import CardsManager from '../helpers/CardsManager';
import ZonesManager from '../helpers/ZonesManager';

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
    this.zonesManager = new ZonesManager(this);
    this.dropZone = this.zonesManager.addZone(650, 350, 900, 250, 'dropZone');
    this.trashZone = this.zonesManager.addContainer(10, 385, 130, 180, 'trashZone');

    this.cardsManager = new CardsManager(this);
    this.cardsDeck = this.cardsManager.createDeck();
    this.cardsTrash = [];

    this.playersHand = this.cardsManager.initialDeal(nbPlayers, this.cardsDeck);

    // Draw the game
    this.dropZoneOutline = this.zonesManager.renderDropZone(this.dropZone);
    this.trashZoneOutline = this.zonesManager.renderContainer(this.trashZone);

    this.cardsDeck.forEach((card, cardIndex) => card.img = this.cardsManager.render(75 + cardIndex * 2, this.game.config.height / 3, 'cards', card.id, false));

    this.playersHand.forEach((player, playerIndex) => {
      player.forEach((card, cardIndex) => {
        if (playerIndex == 0) {
          card.img = this.cardsManager.render(200 + cardIndex * 140, this.game.config.height - 10, 'cards', card.id).setOrigin(0, 1);
        }
        else if (playerIndex == 1) {
          card.img = this.cardsManager.render(200 + cardIndex * 140, 10, 'cards', card.id).setOrigin(0, 0);
        }
        card.img.setInteractive();
      });
    })

    // Add events
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.setScale(1);
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on('dragend', (pointer, gameObject, dropped) => {
      if(!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
    this.input.on('drop', (pointer, gameObject, dropZone) => {
        console.log(gameObject)
        gameObject.setOrigin(0,0);
        gameObject.x = this.trashZone.x;
        gameObject.y = this.trashZone.y;
    })

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
    if (!this.cardsDeck.length && this.cardsTrash.length) {
      this.CardsManager.fillDeck(this.cardsDeck, this.cardsTrash);
    }

  }
}