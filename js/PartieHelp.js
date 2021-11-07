import Partie from "./PartieOriginal.js"

export default class PartieHelp extends Partie {
    constructor() {
        super();
        this.help = [];
        this.disable = false;
        this.idHelp = undefined;
        this.idSwelling = undefined;
    }

    getHelp() {
        return this.help;
    }

    setJoueur() {
        this.disableHelpen();
        super.setJoueur();
        this.helpen();
    }

    start() {
        super.start();
        this.helpen();
    }

    helpen() {
        if (this.disable)
            return;
        this.help = [];
        this.joueur.getListPiece().forEach(element => {
            if (element.tryMove(this.tabEch).length != 0)
                this.help.push(element.getCase());
        });
        this.idSwelling = setTimeout(() => {
            this.idHelp = setInterval(() => {
                this.help.forEach(element => {
                    element.getPiece().swelling();
                });
            }, 2000);

        }, 10000);
    }

    disableHelpen() {
        // console.log("disableHelpen");
        clearInterval(this.idSwelling);
        clearTimeout(this.idHelp);
        this.help.forEach(element => {
            element.getPiece().disableSwelling();
        });
    }

    disableHelp() {
        this.disable = true;
        this.disableHelpen();
    }

    activateHelp() {
        this.disable = false;
        this.helpen();
    }

    onClickBox(e, box) {
        if (this.getState() === 0) {
            if (!box.isEmpty()) {
                if (!box.piece.isDead() && box.piece.getJoueur().equals(this.getJoueur())) {
                    this.disableHelpen();
                    this.helpen();
                }
            }
        }
        super.onClickBox(e, box);
    }
}