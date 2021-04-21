import CardsManager from '../helpers/CardsManager';
import ZonesManager from '../helpers/ZonesManager';

import cardsImg from '../assets/timeline-cards.png';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
    this.cardWidth = 128;
    this.cardHeight = 176;
  }

  preload() {
    this.load.spritesheet('cards', cardsImg, { frameWidth: this.cardWidth, frameHeight: this.cardHeight });
  }

  create() {
    let nbPlayers = 2;

    // Intialize the zones
    this.zonesManager = new ZonesManager(this);
    this.dropZone = this.zonesManager.addZone(200 + this.cardWidth*4, this.game.config.height/2, this.cardWidth*8, this.cardHeight + this.cardHeight / 2, 'dropZone');
    this.deckZone = this.zonesManager.addContainer(10, 135, this.cardWidth, this.cardHeight, 'deckZone');
    this.trashZone = this.zonesManager.addContainer(10, 385, this.cardWidth, this.cardHeight, 'trashZone');
    this.playerOneZone = this.zonesManager.addContainer(200, 510, this.cardWidth*4, this.cardHeight, 'playerOneZone');
    this.playerTwoZone = this.zonesManager.addContainer(200, 10, this.cardWidth*4, this.cardHeight, 'playerTwoZone');

    // Initialize the data
    this.cardsManager = new CardsManager(this);
    this.cardsManager.createDeck(this.deckZone);
    this.cardsManager.initialDeal([this.playerOneZone, this.playerTwoZone], this.deckZone, this.dropZone);
    this.input.setDraggable(this.playerOneZone.list);

    // Draw the game
    this.playerOneZone.depth = 1000;
    this.dropZoneOutline = this.zonesManager.renderDropZone(this.dropZone);
    this.deckZoneOutline = this.zonesManager.renderContainer(this.deckZone);
    this.trashZoneOutline = this.zonesManager.renderContainer(this.trashZone);

    // Temporary fixing this value
    this.currentPlayer = this.playerOneZone;

    // Add events
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.setScale(1);
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });

    this.input.on('drop', (pointer, gameObject) => {
      this.currentPlayer.remove(gameObject);

      let cardsPlaced = this.dropZone.getData('cards');
      let placeIndex = this.cardsManager.getDroppedCardIndex(pointer.upX, gameObject, cardsPlaced);

      if (!cardsPlaced.length || placeIndex >= 0) {
        gameObject.cardData.dateText = this.add.text(0, 0, gameObject.cardData.date).setOrigin(0.5, 1);
        this.cardsManager.placeCard(gameObject, placeIndex, this.dropZone);

        if(!this.currentPlayer.list.length) {
          console.log('you win !!!')
        }
      }
      else {
        this.cardsManager.moveToTrash(gameObject, this.trashZone);

        if (!this.deckZone.list.length && this.trashZone.list.length) {
          this.cardsManager.fillDeck(this.deckZone, this.trashZone);
        }

        this.cardsManager.dealCard(this.currentPlayer, this.deckZone);
        this.input.setDraggable(this.currentPlayer.list);
      }
    })

    this.input.on('pointerover', function (pointer, gameObject) {
      if (gameObject[0].parentContainer) {
        gameObject[0].parentContainer.bringToTop(gameObject[0]);
      }
      gameObject[0].setScale(1.5);
    });

    this.input.on('pointerout', function (pointer, gameObject) {
      gameObject[0].setScale(1);
    });
  }

  update() {
    
  }
}