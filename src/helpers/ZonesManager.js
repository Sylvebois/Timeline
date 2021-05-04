export default class ZonesManager {
  constructor(scene) {
    this.scene = scene;
  }

  addZone(x, y, w, h, name) {
    let dropZone = this.scene.add.zone(x, y, w, h).setRectangleDropZone(w, h);
    dropZone.name = name;
    dropZone.setData({ cards: [] });
    return dropZone;
  };

  addContainer(x, y, w, h, name) {
    let container = this.scene.add.container(x, y);
    container.setSize(w, h);
    container.name = name;
    return container;
  };

  renderDropZone(dropZone) {
    let dropZoneOutline = this.scene.add.graphics();
    dropZoneOutline.lineStyle(2, 0x000000);
    dropZoneOutline.strokeRect(dropZone.x - dropZone.width / 2, dropZone.y - dropZone.height / 2, dropZone.width, dropZone.height);
    return dropZoneOutline;
  }

  renderContainer(container) {
    let containerOutline = this.scene.add.graphics();
    containerOutline.lineStyle(4, 0xff69b4);
    containerOutline.strokeRect(container.x, container.y, container.width, container.height);
    return containerOutline;
  }

  renderBackground(imgName) {
    let background = this.scene.add.image(0,0,imgName).setOrigin(0,0);
    console.log(this.scene.game.config)
    background.setDisplaySize(this.scene.game.config.width, this.scene.game.config.height);
    return background;
  }
}