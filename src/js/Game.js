/**
 * CatchTheBall
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import Ball from "./Ball.js";
import GameRules from "./GameRules.js";

export default class Game {
    constructor() {
        this.ball = new Ball();
        this.initListeners();
    }

    initListeners({ ball } = this) {
        const checkClick = (clickCoord, axis) => {
            return clickCoord - ball.props[axis] > -32 && clickCoord - ball.props[axis] < 32;
        };

        ["click", "touchstart"].forEach(listener => {
            GameRules.canvas.addEventListener(listener, e => {
                let xTouch, yTouch;
                try {
                    const r = e.target.getBoundingClientRect();
                    xTouch = e.targetTouches[0].clientX - r.left;
                    yTouch = e.targetTouches[0].clientY - r.top;
                }
                catch {}

                if (checkClick(xTouch || e.offsetX, "x") && checkClick(yTouch || e.offsetY, "y")) {
                    let x = ball.props.speedX;
                    let y = ball.props.speedY;
                    x = x < 0 ? x * -1 : x;
                    y = x < 0 ? y * -1 : y;

                    ball.catchSound.play();
                    ball.score++;
                    ball.initBall(x / 2, y / 2);
                }
            });
        });
    }
}