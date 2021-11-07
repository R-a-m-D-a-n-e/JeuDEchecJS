import { TabEch } from "./TabEch.js"
import Joueur from "./Joueur.js"
export default class Partie {
    constructor() {
        this.joueur = new Joueur("Ramdane");
        this.caseTo = null;
        this.caseFrom = null;
        let joueur2 = new Joueur("Salhi")
        this.tabEch = new TabEch(this.joueur, joueur2);
        this.StateSelectPiece = 0;
        this.StateSelectCase = 1;
        this.StateMove = 2;
        this.state = 0;
        this.caseValide = [];
        this.eventBox = [];
        this.eventTable = [];
    }

    start() {
        this.addEventListenerBox(["click", "mouseover", "mouseleave"], [this.onClickBox, this.onMouseOver, this.onMouseLeave]);
        return;
    }

    getTabEch() {
        return this.tabEch;
    }

    getJoueur() {
        return this.joueur;
    }

    getState() {
        return this.state;
    }

    getCaseFrom() {
        return this.caseFrom;
    }

    setState(state = null) {
        if (state === null)
            this.state = (this.state + 1) % 3;
        else
            this.state = state;
    }

    setJoueur() {
        let id = this.joueur.getId();
        this.joueur = this.tabEch.getJoueurs()[1 - id];
    }

    setCaseFrom(from) {
        this.caseFrom = from;
    }

    setCaseTo(to) {
        this.caseTo = to;
    }

    setCaseValide(cv) {
        this.tabEch.colorPieces(cv);
        this.caseValide = cv;
    }

    getCaseValide() {
        return this.caseValide;
    }

    addPieceDead(p) {
        p.getCase().removePiece(p);
        p.removeCase();
    }

    move() {
        let p = this.tabEch.move(this.caseFrom, this.caseTo);
        // console.log(this.caseFrom, this.caseTo);
        if (p != null) {
            p.setDead();
            if (p.getJoueur().isLose()) {
                this.finPartie();
            }
            this.addPieceDead(p);
        }
        return p;
    }

    clear() {
        for (let index = 0; index < this.caseValide.length; index++) {
            this.caseValide[index].clearCase();
        }
        this.caseValide = [];
    }

    valide(c) {
        return this.caseValide.find((e) => c.equals(e));
    }

    caseValideIsEmpty() {
        return this.caseValide.length === 0;
    }

    finPartie() {
        let fin = document.querySelector("#fin");
        fin.innerHTML = `<h1>${this.joueur.getName()} a Gagne</h1>`;
        fin.classList.add("bgfin");
        fin.classList.add("alight");
    }

    onClickBox(e, box) {
        if (!this.eventBox["click"])
            return
            // console.log(this, e, box);
            // console.log(window.partie.getJoueur());
        console.log(this.state);
        if (this.getState() === 0) {
            if (!box.isEmpty()) {
                if (!box.piece.isDead() && box.piece.getJoueur().equals(this.getJoueur())) {
                    // this.disableHelpen();
                    // this.helpen();
                    this.setCaseValide(box.piece.tryMove(this.getTabEch()));
                    if (this.caseValideIsEmpty()) {
                        box.getPiece().shake();
                    } else {
                        this.setCaseFrom(box);
                        box.colorSelect();
                        this.setState();
                    }
                } else {
                    box.getPiece().shake();
                }
            }
        } else {
            if (this.getState() == this.StateSelectCase) {
                if (this.valide(box)) {
                    this.setCaseTo(box);
                    this.move();
                    this.setJoueur();
                    this.setState();
                } else {
                    this.getTabEch().getCase(this.getCaseFrom().getCord()).getPiece().shake();
                    this.setState(this.StateSelectPiece);
                }
                this.getCaseFrom().clearCase();
                this.clear();
            }
        }

    }

    onMouseOver(e, box) {
        if (this.eventBox["mouseover"])
            box.getValue().classList.add("caseHover");
    }

    onMouseLeave(e, box) {
        if (this.eventBox["mouseleave"])
            box.getValue().classList.remove("caseHover");

    }

    addEventListenerBox(event, f) {
        if (event instanceof Array) {
            for (let index = 0; index < event.length; index++) {
                this.eventBox[event[index]] = true;
                f[index] = f[index].bind(this);
            }
        } else {
            this.eventBox[event] = true;
            f = f.bind(this);
        }
        this.tabEch.addEventListenerBox(event, f);
    }

    addEventListenerTable(event, f) {
        if (event instanceof Array) {
            for (let index = 0; index < event.length; index++) {
                this.eventTable[event[index]] = true;
                f[index] = f[index].bind(this);
            }
        } else {
            this.eventTable[event] = true;
            f = f.bind(this);

        }
        this.tabEch.addEventListenerTable(event, f);
    }

    disableEventBox(event) {
        this.eventBox[event] = false;
    }
    disableEventTable(event) {
        this.eventTable[event] = false;
    }
    activeEventBox(event) {
        this.eventBox[event] = true;
    }
    activeEventTable(event) {
        this.eventTable[event] = true;
    }
}