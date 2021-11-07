export default class Joueur {
    static JOUEUR0 = 0;
    static JOUEUR1 = 1;
    static _id = 0;

    constructor(name, roi = null) {
        this.id = Joueur._id++;
        this.name = name;
        this.roi = roi;
        this.nbPiece = 16;
        this.listPiece = new Array;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setRoi(roi) {
        this.roi = roi;
    }

    addPiece(p) {
        this.listPiece.push(p);
    }

    removePiece(p) {
        this.listPiece = this.listPiece.filter((e) => !p.equals(e))
    }

    equals(o) {
        if (o === null)
            return false;

        if (!(o instanceof Joueur))
            return false;
        return o.roi.equals(this.roi);
    }

    isLose() {
        return this.roi.isDead();
    }

    getListPiece() {
        return this.listPiece;
    }
}