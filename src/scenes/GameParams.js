import ZonesManager from "../helpers/ZonesManager";
import RadioButtonGroup from "../helpers/RadioButton";

import radioButton from '../assets/UI/radio_button_yellow.png';
import radioButtonChecked from '../assets/UI/radio_button_checked_yellow.png';

export default class GameParams extends Phaser.Scene {
    constructor() {
        super('GameParams');
    }

    preload() {
        this.load.image('radioButton', radioButton);
        this.load.image('radioButtonChecked', radioButtonChecked);
    }

    create() {
        const fontData = { fontFamily: 'Arial, sans-serif', fontSizeInt: 60, fontSize: '60px', fill: '#fff', fontStyle: 'bold' };
        const zonePadding = 50;

        let zonesManager = new ZonesManager(this);

        this.titleZone = zonesManager.addContainer(0, 0, this.game.config.width, this.game.config.height / 4, 'title');
        this.titleZone.add(this.add.text(10, 10, 'Game prameters'));

        let themeText = this.add.text(zonePadding, 10, 'Thème : ', fontData).setOrigin(0, 0);
        let themeRadioButtons = new RadioButtonGroup(this, themeText.x + themeText.width + 10, themeText.y + themeText.height / 2, false, 'radioButton', 'radioButtonChecked', ['All', 'General', 'Inventions', 'France']);
        let nbHumanText = this.add.text(zonePadding, themeText.y + themeText.height + 10, 'Humains : ', fontData).setOrigin(0, 0);
        let nbHumanRadioButtons = new RadioButtonGroup(this, nbHumanText.x + nbHumanText.width + 10, nbHumanText.y + nbHumanText.height / 2, false, 'radioButton', 'radioButtonChecked', ['0', '1', '2', '3']);
        let nbAIText = this.add.text(zonePadding, nbHumanText.y + nbHumanText.height + 10, 'Ordinateurs : ', fontData).setOrigin(0, 0);
        let nbAIRadioButtons = new RadioButtonGroup(this, nbAIText.x + nbAIText.width + 10, nbAIText.y + nbAIText.height / 2, false, 'radioButton', 'radioButtonChecked', ['0', '1', '2', '3']);

        this.menuZone = zonesManager.addContainer(0, this.titleZone.height, this.game.config.width, this.game.config.height - this.titleZone.height, 'menu');
        this.menuZone.add([themeText, themeRadioButtons, nbHumanText, nbHumanRadioButtons, nbAIText, nbAIRadioButtons]);

        console.log(this.menuZone);
    }
};
