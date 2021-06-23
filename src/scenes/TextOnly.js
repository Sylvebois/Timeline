export default class Menu extends Phaser.Scene {
    constructor() {
        super('Text');
    }

    init(data) {
        this.textType = data.textType ? data.textType : '';
    }

    create() {
        if (this.textType == 'rules') {
            this.text = 'Chacun son tour, un joueur tente de poser une de ses cartes\ndans le bon intervalle temporel.\n\n'
                + 'Si la carte est bien placée, elle reste.\n\n'
                + 'Si la carte est mal placée, elle est défaussée\net le joueur prend une nouvelle carte.\n\n'
                + 'Le gagnant est le premier joueur qui a placé toutes ses cartes.';
        }
        else if (this.textType == 'credits') {
            this.text = 'Created by :\n'
                + 'Sylvebois\n\n'
                + 'Original game inspiration :\n'
                + 'Timeline by Asmodee';
        }
        else {
            this.text = ``;
        }

        let fontData = { fontFamily: 'Arial, sans-serif', fontSize: '40px', fill: '#fff' };

        let mainTxt = this.add.text(10, 10, this.text, fontData);
        let infoTxt = this.add.text(this.game.config.width / 2, this.game.config.height-10, 'Cliquez pour retouner au menu', {...fontData, fill:'#f55'});
        infoTxt.setOrigin(0.5, 1);

        this.input.on('pointerdown', () => this.scene.start('Title'));
    }
}