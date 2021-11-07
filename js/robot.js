import PartieListPieceDead from "./PartieListPieceDead.js"
import Cord from "./Cord.js"
export default class Robot extends PartieListPieceDead {
    constructor() {
        super();
        this.xhr = new XMLHttpRequest();
        this.caseMove = null;
        this.intToAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    }
    init() {
        this.xhr.open("GET", "http://localhost:9090/LC0?_nP=1");
        this.xhr.send();
        this.xhr.onreadystatechange = () => {
            let res;
            let cordFrom, cordTo;
            if (this.xhr.readyState === 4) {
                if (this.xhr.status === 200) {
                    res = JSON.parse(this.xhr.responseText)
                    console.log(res);
                    if (res.status === "ok" && res._n != undefined) {
                        cordFrom = new Cord(res._n.charCodeAt(0) - 96, Number.parseInt(res._n[1], 10))
                        cordTo = new Cord(res._n.charCodeAt(2) - 96, Number.parseInt(res._n[3], 10))
                            // console.log(cordFrom, cordTo);
                        this.caseFrom = this.getTabEch().getCase(cordFrom);
                        this.caseTo = this.getTabEch().getCase(cordTo);
                        // console.log(this.caseFrom, this.caseTo);
                        super.move();
                        this.setJoueur();
                    } else {
                        setTimeout(() => {
                            // this.robot();
                        }, 5000);
                    }
                }
            }
        }
    }

    start() {
        this.init();
        super.start();
    }


    robot() {
        // setTimeout(() => {
        this.xhr.open("GET", "http://localhost:9090/LC0?_c=" + this.caseMove);
        this.xhr.send();
        // }, 2000);

    }

    move() {
        let cordFrom = this.caseFrom.getCord(),
            cordTo = this.caseTo.getCord();
        this.caseMove = this.intToAlpha[cordFrom.getX() - 1] + cordFrom.getY() + this.intToAlpha[cordTo.getX() - 1] + cordTo.getY();
        // console.log(this.caseMove)
        super.move();
        this.robot();
    }

    setState(state = null) {
        if (state === null)
            this.state = (this.state + 1) % 4;
        else
            this.state = state;
    }
}