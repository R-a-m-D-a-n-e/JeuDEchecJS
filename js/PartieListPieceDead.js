import { Case } from "./TabEch.js"
import Joueur from "./Joueur.js"
import PartieOriginal from "./PartieOriginal.js"
class ListPieceDead {
    constructor(joueur) {
        this.joueur = joueur;
        this.name = document.querySelector(joueur.getId() === 1 ? "#j1" : "#j0");
        this.value = document.querySelector(joueur.getId() === 1 ? "#joueur1" : "#joueur0");
        this.name.innerHTML = this.joueur.getName()[0];
        this.list;
        this.firstEmpty = null;
        let cases;

        if (this.value != null) {
            cases = this.value.querySelectorAll(".deadCase");
        }

        this.list = new Array(cases.length)

        for (let i = 0; i < this.list.length; i++) {
            this.list[i] = new Case(cases[i]);
        }
        this.firstEmpty = 0;
    }

    add(p) {
        let c = this.getFirstEmpty();
        p.movePiece(c, true);
        setTimeout(() => {
            c.insertPiece(p);
            // console.log(c.getValue().getBoundingClientRect());
            if (this.hasNext())
                this.next();
            setTimeout(() => { p.getValue().style.opacity = "1"; }, 5);
        }, 1000);
    }

    next() {
        this.firstEmpty += 1;
    }
    hasNext() {
        return this.firstEmpty < this.list.length;
    }
    getName() {
        return this.name;
    }
    getFirstEmpty() {
        return this.list[this.firstEmpty];
    }

    selectJoueur() {
        this.name.classList.toggle("selectJoueur" + this.joueur.getId());
    }

    alight() {

        this.value.classList.toggle("alight");

    }

    alightRev() {

        this.value.classList.toggle("alight-rev");

    }
}

export default class PartieListPieceDead extends PartieOriginal {
    constructor() {
        super();
        let joueurs = this.tabEch.getJoueurs();
        this.mainGamer = document.querySelector("#mainGamer");
        this._slither = 0;
        this.pieceDeadN = new ListPieceDead(joueurs[1]);
        this.pieceDeadB = new ListPieceDead(joueurs[0]);
        this.pieceDeadB.selectJoueur();
        this.pieceDeadB.alight();
        this.pieceDeadN.alightRev();
    }

    setJoueur() {
        super.setJoueur();
        this.pieceDeadN.selectJoueur();
        this.pieceDeadB.selectJoueur();
        if (this._slither === 0) {
            this.pieceDeadB.alight();
            this.pieceDeadN.alightRev();
            setTimeout(() => {
                this.pieceDeadB.alightRev();
                this.pieceDeadN.alight();
                this.slither();
            }, 5);
            this._slither = 1;
        } else {
            this.pieceDeadN.alight();
            this.pieceDeadB.alightRev();
            setTimeout(() => {
                this.pieceDeadN.alightRev();
                this.pieceDeadB.alight();
                this.slither();
            }, 5);
            this._slither = 0;
        }

    }
    slither() {
        this.mainGamer.classList.toggle("slither");
    }
    addPieceDead(p) {
        (() =>
            p.getJoueur().getId() === Joueur.JOUEUR0 ? this.pieceDeadN : this.pieceDeadB
        )().add(p);
    }

    move() {
        let p = super.move();
        // console.log("N", this.pieceDeadN, "B", this.pieceDeadB);
    }
}