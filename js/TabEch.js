import Cord from "./Cord.js"
import { Piece, Pion, Tour, Fou, Cavaliers, Dame, Roi } from "./Piece.js";

export class Case {
    constructor(value, p = null) {
        let id;

        id = Number.parseInt(value.id, 10);
        this.cord = new Cord(Math.trunc(id / 10), id % 10);

        this.value = value;

        this.piece = p;
        if (this.piece instanceof Piece) {
            this.value.appendChild(p.getValue());
        }

        // this.addEventListener();
    }

    getX() {
        return this.cord.getX();
    }

    getY() {
        return this.cord.getY();
    }

    getPiece() {
        return this.piece;
    }

    isEmpty() {
        return this.piece === null;
    }

    getValue() {
        return this.value;
    }

    getCord() {
        return this.cord;
    }

    setPiece(p) {
        this.piece = p;
    }

    equals(o) {
        if (o === null)
            return false;

        if (!(o instanceof Case))
            return false;
        return o.getCord().equals(this.getCord());
    }

    insertPiece(p) {
        this.setPiece(p);
        if (p instanceof Piece) {
            this.piece.setCase(this);
            this.value.appendChild(p.getValue());
        }
    }

    removePiece(p = null) {
        if (p != null) {
            this.value.removeChild(p.getValue());
            this.piece = null;
            return;
        }
        if (this.piece != null) {
            this.piece.removeCase();
            this.value.removeChild(this.piece.getValue());
            this.piece = null;
        }
    }

    colorSelect() {
        this.value.classList.add("selectCase");
    }

    colorDead() {
        this.value.classList.add("pieceDead");
    }

    clearCase() {
        this.value.classList.remove("pieceDead");
        this.value.classList.remove("selectCase");
    }
    contour() {
        let span;

        this._contour = document.createElement("div");
        this._contour.classList.add("contour");

        span = document.createElement("span");
        span.classList.add("wcontour");
        span.classList.add("s0");
        this._contour.appendChild(span);

        span = document.createElement("span");
        span.classList.add("hcontour");
        span.classList.add("s40");
        this._contour.appendChild(span);

        span = document.createElement("span");
        span.classList.add("wcontour");
        span.classList.add("s80");
        this._contour.appendChild(span);

        span = document.createElement("span");
        span.classList.add("hcontour");
        span.classList.add("s120");
        this._contour.appendChild(span);

        this.value.appendChild(this._contour);
    }

    contourRev() {
        this.disableContour();

        let span;

        this._contour = document.createElement("div");
        this._contour.classList.add("contour");

        span = document.createElement("span");
        span.classList.add("wcontour-rev");
        span.classList.add("s120");
        this._contour.appendChild(span);

        span = document.createElement("span");
        span.classList.add("hcontour-rev");
        span.classList.add("s80");
        this._contour.appendChild(span);

        span = document.createElement("span");
        span.classList.add("wcontour-rev");
        span.classList.add("s40");
        this._contour.appendChild(span);

        span = document.createElement("span");
        span.classList.add("hcontour-rev");
        span.classList.add("s0");
        this._contour.appendChild(span);

        this.value.appendChild(this._contour);
    }

    disableContour() {
        if (this._contour != undefined) {
            this.value.removeChild(this._contour);
            this._contour = undefined;
        }
    }


    addEventListener(event, f) {
        this.value.addEventListener(event, (e) => { f(e, this) });
    }
}
export class TabEch {
    constructor(joueur1, joueur2) {
        let tab;

        this.joueur = [joueur1, joueur2];
        this.values = document.querySelector("#tablechec");
        this.tabEch = new Array(8);

        for (let index = 0; index < this.tabEch.length; index++) {
            this.tabEch[index] = new Array(8);
        }

        tab = this.values.querySelectorAll(".case");

        for (let index = 0; index < tab.length; index++) {
            const element = tab[index];
            let c = new Case(element);
            this.tabEch[c.getX() - 1][c.getY() - 1] = c;
        }
        this.init();
    }

    getCase({ x, y }) {
        return this.tabEch[x - 1][y - 1];
    }

    getJoueurs() {
        return this.joueur;
    }

    init() {
        for (let i = 0; i < 8; i++) {
            let element = this.tabEch[i][6];
            element.insertPiece(new Pion(element, this.joueur[1]));

            element = this.tabEch[i][1];
            element.insertPiece(new Pion(element, this.joueur[0]));
        }

        this.tabEch[0][0].insertPiece(new Tour(this.tabEch[0][0], this.joueur[0]));
        this.tabEch[7][0].insertPiece(new Tour(this.tabEch[7][0], this.joueur[0]));
        this.tabEch[0][7].insertPiece(new Tour(this.tabEch[0][7], this.joueur[1]));
        this.tabEch[7][7].insertPiece(new Tour(this.tabEch[7][7], this.joueur[1]));

        let cavalier = new Cavaliers(this.tabEch[1][0], this.joueur[0]);
        cavalier.droit();
        this.tabEch[1][0].insertPiece(cavalier);
        this.tabEch[6][0].insertPiece(new Cavaliers(this.tabEch[6][0], this.joueur[0]));
        cavalier = new Cavaliers(this.tabEch[1][7], this.joueur[1]);
        cavalier.droit();
        this.tabEch[1][7].insertPiece(cavalier);
        this.tabEch[6][7].insertPiece(new Cavaliers(this.tabEch[6][7], this.joueur[1]));

        this.tabEch[2][0].insertPiece(new Fou(this.tabEch[2][0], this.joueur[0]));
        this.tabEch[5][0].insertPiece(new Fou(this.tabEch[5][0], this.joueur[0]));
        this.tabEch[2][7].insertPiece(new Fou(this.tabEch[2][7], this.joueur[1]));
        this.tabEch[5][7].insertPiece(new Fou(this.tabEch[5][7], this.joueur[1]));

        this.tabEch[3][0].insertPiece(new Dame(this.tabEch[3][0], this.joueur[0]));
        this.tabEch[4][0].insertPiece(new Roi(this.tabEch[4][0], this.joueur[0]));
        this.tabEch[3][7].insertPiece(new Dame(this.tabEch[3][7], this.joueur[1]));
        this.tabEch[4][7].insertPiece(new Roi(this.tabEch[4][7], this.joueur[1]));

    }

    caseEmpty({ x, y }) {
        return this.tabEch[x - 1][y - 1].isEmpty();
    }

    caseAdv({ x, y }) {
        if (this.tabEch[x - 1][y - 1].getPiece() === null)
            return false;
        return !this.tabEch[x - 1][y - 1].getPiece().getJoueur().equals(window.partie.getJoueur());
    }

    colorSelect(c) {
        c.colorSelect();
    }

    colorDead(c) {
        c.colorDead();
    }


    colorPieces(list) {
        list.forEach(element => {
            if (element.isEmpty())
                this.colorSelect(element);
            else
                this.colorDead(element);
        });
    }

    move(c1, c2) {
        let p1 = c1.getPiece();
        let p2 = c2.getPiece();
        p1.movePiece(c2);

        setTimeout(() => {
            c1.removePiece();
            c2.insertPiece(p1);
            // c1.setPiece(null);
            window.partie.setState();
        }, 1000);

        return p2;
    }

    clearCase({ x, y }) {
        this.tabEch[x - 1][y - 1].clearCase();
    }

    addEventListenerBox(event, f) {
        let g;
        if (event instanceof Array) {
            g = (e) => {
                for (let index = 0; index < event.length; index++) {
                    e.addEventListener(event[index], f[index]);
                }
            }
        } else {
            g = (e) => {
                e.addEventListener(event, f);

            }
        }
        this.tabEch.map((l) => {
            l.map(g)
        });
    }

    addEventListenerTable(event, f) {
        let g;
        if (event instanceof Array) {
            for (let index = 0; index < event.length; index++) {
                this.values.addEventListener(event[index], f[index]);
            }
        } else {
            this.values.addEventListener(event, f);
        }
    }
}