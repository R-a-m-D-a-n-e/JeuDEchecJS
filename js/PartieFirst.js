import PartieListPieceDead from "./PartieListPieceDead.js";
export default class PartieFirst extends PartieListPieceDead {
    constructor() {
        super();
        this.firstHelp = document.querySelector("#firsthelp");
        this.invisible = document.querySelector("#invisible");
        this.disableEventListener = false;
        this.listPiece = [];
        // this.start();
    }

    start() {
        super.start();
        this.disableEventBox("mouseover");
        this.invisible.style.zIndex = "100";
        this.firstHelp.style.zIndex = "99";
        this.firstHelp.style.visibility = "visible";
        this.contour();
    }

    fin() {

    }

    find() {
        this.listPiece = [];
        this.joueur.getListPiece().forEach(element => {
            if (element.tryMove(this.tabEch).length != 0)
                this.listPiece.push(element.getCase());
        });
    }

    contour() {
        let i = 0;

        if (this.getState() === 0) {
            this.find();
        }
        if (this.getState() === 1)
            this.listPiece = this.getCaseValide();

        // console.log(this.listPiece)

        this.disableEventBox("click");
        this.disableEventTable("click");
        this.firstHelp.classList.remove("alight-rev");
        setTimeout(() => {
            this.firstHelp.classList.add("alight");
        }, 5);
        this.listPiece.forEach(element => {
            element.getValue().style.zIndex = "100";
            element.getValue().classList.add("white-shadow");
            i++;
            element.contour();
            if (i === this.listPiece.length)
                setTimeout(() => {
                    console.log('active')
                    this.activeEventBox("click");
                    this.activeEventTable("click");
                }, 1300);

        });
    }

    disableContour() {
        let i = 0;
        this.firstHelp.classList.remove("alight");
        setTimeout(() => {
            this.firstHelp.classList.add("alight-rev");
        }, );
        this.listPiece.forEach(element => {
            i++;
            element.contourRev();
            setTimeout(() => {
                if (!element.equals(this.getCaseFrom())) {
                    element.getValue().style.zIndex = "auto";
                    element.getValue().classList.remove("white-shadow");
                } else {
                    element.getValue().style.zIndex = "101";
                }
                element.disableContour();
            }, 2000);
            if (this.getState() === 1 && i === this.listPiece.length) {
                setTimeout(() => {
                    this.contour();
                }, 2000);
            }
        });
    }

    onClickBox(e, box) {
        if (!this.eventBox["click"])
            return
        if (this.getState() == 1 && this.getCaseFrom().equals(box)) {
            box.getPiece().shake();
            return;
        }
        super.onClickBox(e, box);
        this.disableEventBox("click");
        this.disableEventTable("click");
        this.disableContour();
    }

    move() {
        super.move();
        setTimeout(() => {
            this.getCaseFrom().getValue().style.zIndex = "auto";
            this.getCaseFrom().getValue().classList.remove("white-shadow");
            if (this.getState() === 0)
                this.contour();
        }, 2000);
    }

}