
import ZonesManager from '../helpers/ZonesManager';

import logo from '../assets/logo.png';
import timelineLogo from '../assets/timeline-logo.png';

export default class Menu extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.load.image('logo', logo);
    this.load.image('timeline', timelineLogo);
  }

  create() {
    let fontData = { fontFamily: 'Arial, sans-serif', fontSize: '80px', fill: '#fff', fontStyle: 'bold' };
    let zonesManager = new ZonesManager(this);

    this.titleZone = zonesManager.addContainer(0, 0, this.game.config.width, this.game.config.height / 3, 'title');
    this.titleZone.add([
      this.add.image(0, 0, 'timeline').setOrigin(0, 0).setDisplaySize(this.titleZone.width, this.titleZone.height),
      this.add.text(10, 10, 'made by '),
      this.add.image(95, 15, 'logo').setDisplaySize(20, 20)
    ]);

    this.menuZone = zonesManager.addContainer(0, this.game.config.height / 3, this.game.config.width, this.game.config.height * 2 / 3, 'menu');
    this.menuZone.add([
      this.add.text(this.menuZone.width / 2, 10, 'Nouveau', fontData).setOrigin(0.5, 0)
        .setInteractive()
        .on('pointerdown', () => { this.scene.start('Game') }),
      this.add.text(this.menuZone.width / 2, this.menuZone.height / 2, 'Règles', fontData).setOrigin(0.5, 0.5)
        .setInteractive()
        .on('pointerdown', () => { this.scene.start('Game') }),
      this.add.text(this.menuZone.width / 2, this.menuZone.height - 10, 'Crédits', fontData).setOrigin(0.5, 1)
        .setInteractive()
        .on('pointerdown', () => { this.scene.start('Game') }),
    ])

    this.menuZone.list.forEach(menuEntry => {
      menuEntry.on('pointerover', function () { this.setColor('#aaa') });
      menuEntry.on('pointerout', function () { this.setColor('#fff') });
    })
  }
};
