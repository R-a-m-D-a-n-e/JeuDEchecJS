export default class Cord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static add(cord1, cord2) {
        return new Cord(cord1.x + cord2.x, cord1.y + cord2.y);
    }

    static sub(cord1, cord2) {
        return new Cord(cord1.x - cord2.x, cord1.y - cord2.y);
    }

    equals(o) {
        if (o === null)
            return false;

        if (!(o instanceof Cord))
            return false;
        return o.x === this.x && o.y === this.y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    valide() {
        return this.x < 9 && this.y < 9 && this.x > 0 && this.y > 0;
    }
}