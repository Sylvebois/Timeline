/*
 * Create a group of radio buttons.
 * The default position of all the buttons is 0,0 and the user has to place them where he wants.
 *
 * @param {Phaser.Scene} scene - The scene where the radio buttons will be created.
 * @param {number} x - The x position of the group.
 * @param {number} y - The y position of the group.
 * @param {boolean} isVertical - If true, the buttons will be placed vertically.
 * @param {string} key1 - The image used for an unselected radio button.
 * @param {string} key2 - The image used for a selected radio button.
 * @param {array} labels - The labels of the radio buttons.
 */

export default class RadioButtonGroup extends Phaser.GameObjects.Container {
  constructor(scene, x, y, isVertical, key1, key2, labels) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.isVertical = isVertical;

    let prevPos = null;

    for (let i = 0; i < labels.length; i++) {
      if (this.isVertical) {
        let pos = prevPos === null ? 0 : prevPos.y + prevPos.height + 25;
        prevPos = this.addRadioButton(0, pos, key1, key2, labels[i]);
      }
      else {
        let pos = prevPos === null ? 0 : prevPos.x + prevPos.width + 25;
        prevPos = this.addRadioButton(pos, 0, key1, key2, labels[i]);
      }
    }

    this.scene.add.existing(this);
  }
  addRadioButton(x, y, key1, key2, label) {
    let button = this.scene.add.sprite(x, y, this.list.length > 0 ? key1 : key2).setInteractive();
    button.name = `radioButton ${label}`;
    let text = this.scene.add.text(x, y, label, { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.To.RightCenter(text, button);

    button.on('pointerdown', function () {
      button.setTexture(key2);
      let checkedIndex = this.list.findIndex(item => item.name !== button.name && item.texture.key === key2);

      if (checkedIndex !== -1) {
        this.list[checkedIndex].setTexture(key1);
      }
    }.bind(this));

    this.add(button);
    this.add(text);

    return { x: text.x, y: text.y, width: text.width, heigh: text.height };
  }
}