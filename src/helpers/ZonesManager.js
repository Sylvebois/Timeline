export default class ZonesManager {
  constructor(scene) {
    this.scene = scene;
  }

  addZone(x, y, w, h, name) {
    let dropZone = this.scene.add.zone(x, y, w, h).setRectangleDropZone(w, h);
    dropZone.name = name;
    return dropZone;
  };

  addContainer(x, y, w, h, name) {
    let container = this.scene.add.container(x, y);
    container.width = w;
    container.height = h;
    container.name = name;
    return container;
  };

  renderDropZone(dropZone) {
    let dropZoneOutline = this.scene.add.graphics();
    dropZoneOutline.lineStyle(4, 0xff69b4);
    dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
  }

  renderContainer(container) {
    let containerOutline = this.scene.add.graphics();
    containerOutline.lineStyle(4, 0xff69b4);
    containerOutline.strokeRect(container.x, container.y, container.width, container.height);
  }
}