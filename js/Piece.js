import Cord from "./Cord.js"
import Joueur from "./Joueur.js";
export class Piece {
    constructor(name, value, joueur, ca, move) {
        this.dead = false;
        this.joueur = joueur;
        this.name = name;
        this.move = move;
        this.case = ca;
        this.value = document.createElement("div");
        this.value.innerHTML = value;
        this.value.classList.add("piece");
        this.value.classList.add(this.joueur.getId() === Joueur.JOUEUR1 ? "piecen" : "pieceb");
        // this.value.addEventListener("mouseover", (e) => { e.stopPropagation(); });
        this.joueur.addPiece(this);
    }

    equals(o) {
        if (o === null)
            return false;

        if (!(o instanceof Piece))
            return false;
        return o.getCord().equals(this.getCord());
    }

    tryMove(tableEch) {
        let bool;
        let res = [];
        let c, j, ca;

        for (let index = 1; index < this.move.length; index++) {
            const cord = this.move[index];
            c = this.getCord();
            j = 0;
            bool = true;
            while (bool && j < this.move[0]) {
                j++;
                c = Cord.add(c, cord);
                // console.log(this.getCord(), c)
                if (!c.valide())
                    break;
                ca = tableEch.getCase(c);
                if (ca.isEmpty()) {
                    res.push(ca);
                    // tableEch.colorSelect(c);
                } else {
                    if (tableEch.caseAdv(c) && !(this instanceof Pion)) {
                        res.push(ca);
                        // tableEch.colorDead(c);
                        break;
                    } else {
                        bool = false;
                    }
                }
            }
        }
        return res;
    }

    movePiece(c2, dead = false) {
        let position1 = this.case.getValue().getBoundingClientRect();
        let position2 = c2.getValue().getBoundingClientRect();

        if (this instanceof Pion) {
            this.move[0] = 1;
        }

        let x = position2.left - position1.left;
        let y = position2.top - position1.top;
        // console.log(this, this.getValue().getBoundingClientRect().left + x, this.getValue().getBoundingClientRect().top + y);
        // console.log(x, y);
        // console.log(this.case.getValue().getBoundingClientRect(), c2.getValue().getBoundingClientRect());

        if (dead)
            this.getValue().style.opacity = "0";
        this.getValue().style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        setTimeout(() => {
            this.getValue().style.transform = "";
        }, 1000);

    }

    getValue() {
        return this.value;
    }

    getCord() {
        return this.case.getCord();
    }

    getJoueur() {
        return this.joueur;
    }

    setCase(ca) {
        this.case = ca;
    }

    getCase() {
        return this.case;
    }

    setMove(tab) {
        this.move = tab;
    }

    setDead() {
        this.dead = true;
        this.joueur.removePiece(this);
    }

    removeCase() {
        this.case = null;
    }

    isDead() {
        return this.dead;
    }

    shake() {
        this.value.classList.add("shake");
        setTimeout(() => {
            this.disableShake();
        }, 1000);
    }

    swelling() {
        this.value.classList.toggle("swelling");
    }

    disableSwelling() {
        this.value.classList.remove("swelling");
    }

    disableShake() {
        this.value.classList.remove("shake");
    }
}

export class Pion extends Piece {
    constructor(ca, joueur) {
        super("Pion", "&#9823;", joueur, ca, []);
        let tab = [2];

        tab.push(new Cord(0, joueur.getId() === Joueur.JOUEUR1 ? -1 : 1));
        this.move = tab;
    }
    tryMove(tableEch) {
        let res = super.tryMove(tableEch);
        let fact = this.joueur.getId() === Joueur.JOUEUR1 ? -1 : 1;
        let tab = [new Cord(-fact, fact), new Cord(fact, fact)];
        // console.log(tab)
        let c;
        for (let index = 0; index < tab.length; index++) {
            c = Cord.add(this.getCord(), tab[index]);
            // console.log(this.getCord(), c)
            if (!c.valide())
                break;
            if (c.valide() && tableEch.caseAdv(c)) {
                res.push(tableEch.getCase(c));
                // tableEch.colorDead(c);
            }
        }
        return res;
    }
}

export class Tour extends Piece {
    constructor(ca, joueur) {
        super("Tour", "&#9820;", joueur, ca, []);
        let tab = [7];

        tab.push(new Cord(0, 1));
        tab.push(new Cord(0, -1));
        tab.push(new Cord(1, 0));
        tab.push(new Cord(-1, 0));

        this.move = tab;
    }
}

export class Cavaliers extends Piece {
    constructor(ca, joueur) {
        super("Cavaliers", "&#9822;", joueur, ca, []);
        let tab = [1];

        tab.push(new Cord(2, 1));
        tab.push(new Cord(2, -1));
        tab.push(new Cord(1, 2));
        tab.push(new Cord(-1, 2));
        tab.push(new Cord(-2, 1));
        tab.push(new Cord(-2, -1));
        tab.push(new Cord(1, -2));
        tab.push(new Cord(-1, -2));

        this.move = tab;
    }

    droit() {
        this.value.innerHTML = '<span class="droit">' + this.value.innerHTML + '</span>'
    }
}

export class Fou extends Piece {
    constructor(ca, joueur) {
        super("Fou", "&#9821;", joueur, ca, []);
        let tab = [7];

        tab.push(new Cord(1, 1));
        tab.push(new Cord(1, -1));
        tab.push(new Cord(-1, -1));
        tab.push(new Cord(-1, 1));

        this.move = tab;
    }
}

export class Dame extends Piece {
    constructor(ca, joueur) {
        super("Dame", "&#9819;", joueur, ca, []);
        let tab = [7];

        tab.push(new Cord(0, 1));
        tab.push(new Cord(0, -1));
        tab.push(new Cord(1, 0));
        tab.push(new Cord(-1, 0));
        tab.push(new Cord(1, 1));
        tab.push(new Cord(1, -1));
        tab.push(new Cord(-1, -1));
        tab.push(new Cord(-1, 1));

        this.move = tab;
    }
}

export class Roi extends Piece {
    constructor(ca, joueur) {
        super("Roi", "&#9818;", joueur, ca, []);
        let tab = [1];

        tab.push(new Cord(0, 1));
        tab.push(new Cord(0, -1));
        tab.push(new Cord(1, 0));
        tab.push(new Cord(-1, 0));
        tab.push(new Cord(1, 1));
        tab.push(new Cord(1, -1));
        tab.push(new Cord(-1, -1));
        tab.push(new Cord(-1, 1));

        this.move = tab;

        joueur.setRoi(this);
    }
}