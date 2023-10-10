

"use strict";

const STAMP_SIZE = 75;

function StampSimDemo() {
    new StampSim();
}

class StampSim extends CodeTrace {
    constructor() {
        super("StampSim")
        let gw = this.installGWindow("StampCanvas");
        gw.addEventListener("mousemove", mousemoveAction);
        gw.addEventListener("click", clickAction);
        this._gw = gw;
        this.reset();

        function mousemoveAction (e) {
            e.stopPropagation();
            let stamp = gw._stamp;
            stamp.setLocation(e.getX()- STAMP_SIZE / 2, e.getY() - STAMP_SIZE / 2)
        }

        function clickAction (e) {
            e.stopPropagation();
            let mx = e.getX();
            let my = e.getY();
            if (Math.random() > 0.5) {
                var shape = GOval(mx - STAMP_SIZE / 2,
                    my - STAMP_SIZE / 2,
                    STAMP_SIZE,
                    STAMP_SIZE);
            } else {
                var shape = GRect(mx - STAMP_SIZE / 2,
                    my - STAMP_SIZE / 2,
                    STAMP_SIZE,
                    STAMP_SIZE);
            }
            shape.setFilled(true);
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            shape.setColor("#" + randomColor);
            gw.add(shape);
            shape.sendBackward();
        }
    }

    reset() {
        let gw = this._gw;
        gw.clear();

        let stamp = GRect(-STAMP_SIZE, -STAMP_SIZE, STAMP_SIZE, STAMP_SIZE);
        stamp.setFilled(true);
        gw.add(stamp);
        console.log("Stamp created");

        gw._stamp = stamp;
        
    }
    
}
