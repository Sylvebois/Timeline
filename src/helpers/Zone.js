export default class Zone {
  constructor(scene) {
    this.scene = scene
  }
  renderZone() {
    let dropZone = this.scene.add.zone(650, 350, 900, 250).setRectangleDropZone(900, 250);
    dropZone.setData({ cards: 0 });
    return dropZone;
  };
  
  renderOutline(dropZone) {
    let dropZoneOutline = this.scene.add.graphics();
    dropZoneOutline.lineStyle(4, 0xff69b4);
    dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
  }
}