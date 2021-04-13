import cardsImg from '../assets/timeline-cards.png';

export default class Game extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet('cards', cardsImg, { frameWidth: 128, frameHeight: 176 });
  }

  create() {
    const logo = this.add.sprite(100, 100, 'cards', 3)

    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });
  }
}