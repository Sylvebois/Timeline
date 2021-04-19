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

    // Intialize the zones
    this.zonesManager = new ZonesManager(this);
    this.dropZone = this.zonesManager.addZone(650, 350, 900, 250, 'dropZone');
    this.deckZone = this.zonesManager.addContainer(10, 135, 130, 180, 'deckZone');
    this.trashZone = this.zonesManager.addContainer(10, 385, 130, 180, 'trashZone');
    this.playerOneZone = this.zonesManager.addContainer(200, 510, 900, 180, 'playerOneZone');
    this.playerTwoZone = this.zonesManager.addContainer(200, 10, 900, 180, 'playerTwoZone');

    // Initialize the data
    this.cardsManager = new CardsManager(this);
    this.cardsManager.createDeck(this.deckZone);
    this.cardsManager.initialDeal([this.playerOneZone, this.playerTwoZone], this.deckZone);
    this.input.setDraggable(this.playerOneZone.list);

    // Draw the game
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
      if(!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
    this.input.on('drop', (pointer, gameObject, dropZone) => {
        this.currentPlayer.remove(gameObject);
        this.cardsManager.moveToTrash(gameObject, this.trashZone);
        this.cardsManager.dealCard(this.currentPlayer, this.deckZone);
        this.input.setDraggable(this.currentPlayer.list);
    })

    this.input.on('pointerover', function (pointer, gameObject) {
      if(gameObject[0].parentContainer) {
        gameObject[0].parentContainer.bringToTop(gameObject[0]);
      }
      gameObject[0].setScale(1.5);
    });
    this.input.on('pointerout', function (pointer, gameObject) {
      gameObject[0].setScale(1);
    });
  }

  update() {
    if (!this.deckZone.list.length && this.trashZone.list.length) {
      this.cardsManager.fillDeck(this.deckZone, this.trashZone);
    }
  }
}