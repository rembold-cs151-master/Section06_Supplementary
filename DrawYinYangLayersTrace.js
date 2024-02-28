/*
 * File: DrawYinYangLayers.js
 * ------------------
 * This program creates a demo of the process for drawing a yin-yang symbol.
 * The shapes appear in a palette to the right of the window; the
 * user's job is to drag them to the correct positions on the window.
 */

"use strict";

const REVEAL_BGCOLOR = "#272822";
const GWINDOW_X = 0;
const GWINDOW_Y = 0;
const GWINDOW_WIDTH = 700;
const GWINDOW_HEIGHT = 700;
const CIRCLE_RADIUS = 200;
const DOT_RADIUS = 5;
const SHAPE_SEP = 40;

function DrawYinYangLayersDemo() {
    new DrawYinYang();
}

class DrawYinYang extends CodeTrace {

    constructor() {
        super("DrawYinYang");
        let gw = this.installGWindow("DrawYinYangCanvas");
        gw.setBackground(REVEAL_BGCOLOR);
        let canvas = gw._getCanvas();
        canvas.style.backgroundColor = REVEAL_BGCOLOR;
        gw.addEventListener("mousedown", mousedownAction);
        gw.addEventListener("mouseup", mouseupAction);
        gw.addEventListener("drag", dragAction);
        gw.addEventListener("click", clickAction);
        this._gw = gw;
        this._gw.objs = [];
        this._gw.dotsToggle = false;
        this.reset();
        console.log(this._gw.objs)

        function mousedownAction(e) {
            e.stopPropagation();
            let obj = gw.getElementAt(e.getX(), e.getY());
            if (obj && obj != gw._consoleArea) {
                obj.sendToFront();
                gw._dragObject = obj;
                gw._lastX = e.getX();
                gw._lastY = e.getY();
                obj.showDot(true);
            } else {
                gw._square.showDot(false);
                gw._dragObject = null;
            }
        }

        function mouseupAction(e) {
            e.stopPropagation();
            if (gw._dragObject !== null) {
                gw._dragObject.showDot(false);
                gw._dragObject = null;
            }
        }

        function dragAction(e) {
            e.stopPropagation();
            if (gw._dragObject !== null) {
                gw._dragObject.move(e.getX() - gw._lastX,
                                      e.getY() - gw._lastY);
                gw._lastX = e.getX();
                gw._lastY = e.getY();
            }
        }

        function clickAction(e) {
            e.stopPropagation();
            let obj = gw.getElementAt(e.getX(), e.getY());
            if (obj === gw._square) {
                obj.showDot(true);
                obj.rotate(obj._rotationAngle);
                obj._rotationAngle *= -1;
            }
        }
    }

    reset() {
        let gw = this._gw;
        gw.clear();
        let consoleArea = GRect(GWINDOW_WIDTH, GWINDOW_HEIGHT);
        consoleArea.setFilled(true);
        consoleArea.setFillColor("White");
        gw.add(consoleArea, GWINDOW_X, GWINDOW_Y);

        let c1 = this.createCircle(CIRCLE_RADIUS, "black", true);
        let c1x = GWINDOW_X + GWINDOW_WIDTH + SHAPE_SEP;
        let c1y = GWINDOW_Y + SHAPE_SEP;
        gw.add(c1, c1x, c1y);
        gw.objs.push(c1);

        let c2 = this.createCircle(CIRCLE_RADIUS, "black", false, 3);
        let c2x = c1x + 2 * CIRCLE_RADIUS + SHAPE_SEP;
        let c2y = c1y;
        gw.add(c2, c2x, c2y);
        gw.objs.push(c2);

        let c3 = this.createCircle(CIRCLE_RADIUS / 2, "black", true);
        let c3x = c1x;
        let c3y = GWINDOW_Y + GWINDOW_HEIGHT - CIRCLE_RADIUS;
        gw.add(c3, c3x, c3y);
        gw.objs.push(c3);

        let c4 = this.createCircle(CIRCLE_RADIUS / 2, "white", true);
        let c4x = c3x + CIRCLE_RADIUS + SHAPE_SEP;
        let c4y = c3y;
        gw.add(c4, c4x, c4y);
        gw.objs.push(c4);

        let c5 = this.createCircle(CIRCLE_RADIUS / 8, "black", true);
        let c5x = c4x + CIRCLE_RADIUS + SHAPE_SEP;
        let c5y = c3y;
        gw.add(c5, c5x, c5y);
        gw.objs.push(c5);

        let c6 = this.createCircle(CIRCLE_RADIUS / 8, "white", true);
        let c6x = c5x + CIRCLE_RADIUS/4 + SHAPE_SEP;
        let c6y = c3y;
        gw.add(c6, c6x, c6y);
        gw.objs.push(c6);

        let r = this.createSquare(1.1 * CIRCLE_RADIUS, 2.1 * CIRCLE_RADIUS, "white");
        let rx = c2x + 2 * CIRCLE_RADIUS + SHAPE_SEP;
        let ry = c2y;
        gw.add(r, rx, ry);
        gw.objs.push(r);

        gw._square = r;
        gw._consoleArea = consoleArea;
        gw._dragObject = null;
    }

    showDots() {
        let gw = this._gw;
        for (let i = 0; i < gw.objs.length; i++) {
            if (!gw.dotsToggle) {
                gw.objs[i].showDot(true);
            } else {
                gw.objs[i].showDot(false);
            }
        }
        gw.dotsToggle = !gw.dotsToggle;
    }

    createCircle(radius, color, filled, linewidth=1) {
        let compound = GCompound();
        let circle = GOval(2 * radius, 2 * radius);
        circle.setFilled(filled);
        circle.setColor(color);
        circle.setLineWidth(linewidth);
        compound.add(circle, 0, 0);
        let dot = GOval(2 * DOT_RADIUS, 2 * DOT_RADIUS);
        dot.setFilled(true);
        dot.setColor("cyan");
        compound.add(dot, -DOT_RADIUS, -DOT_RADIUS);
        compound.showDot = function(flag) {
            dot.setVisible(flag);
        }
        return compound;
    }

    createSquare(width, height, color) {
        let compound = GCompound();
        let square = GRect(width, height);
        square.setFilled(true);
        square.setColor(color);
        compound.add(square);
        let dot = GOval(2 * DOT_RADIUS, 2 * DOT_RADIUS);
        dot.setColor("cyan");
        dot.setFilled(true);
        compound.add(dot, -DOT_RADIUS, -DOT_RADIUS);
        compound.showDot = function(flag) {
            dot.setVisible(flag);
        }
        compound._rotationAngle = 45;
        return compound;
    }

}
