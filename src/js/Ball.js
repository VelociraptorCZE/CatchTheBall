/**
 * CatchTheBall
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import GameRules from "./GameRules.js";
import RNG from "./RNG.js";
import Texture from "./Texture.js";

export default class Ball extends Texture {
    constructor() {
        super("tex/ball.svg");
        this.catchSound = new Audio("snd/catch.wav");
        this.canvasBounds = GameRules.canvasBounds;
        this.bounds = GameRules.bounds;
        this.canvas = GameRules.canvas;
        this.context = this.canvas.getContext("2d");
        this.score = 0;
        this.initFont();
        this.initBall();
        this.render();
    }

    initFont() {
        this.context.fillStyle = "#fff";
        this.context.font = "15px Impact";
    }

    initBall(speedXCoef = 0, speedYCoef = 0) {
        this.props = {
            speedX: RNG(3.1, 4, 2) + speedXCoef,
            speedY: RNG(3.3, 3.8, 2) + speedYCoef,
            x: RNG(100, 230),
            y: RNG(140, 210)
        };
        if (RNG(0, 1)) {
            this.props.speedX = -this.props.speedX;
            this.props.speedY = -this.props.speedY;
        }
        this.canvas.style.background = `#${parseInt(RNG(0, 16777216)).toString(16)}`;
    }

    render() {
        requestAnimationFrame(() => {
            this.renderCallback();
        });
    }

    renderCallback({ props, context, canvasBounds } = this) {
        context.clearRect(0, 0, canvasBounds.width, canvasBounds.height);
        context.strokeText(...this.scoreToText);
        context.fillText(...this.scoreToText);
        context.drawImage(this.texture, props.x, props.y);
        this.checkCollision();
        this.props.x += props.speedX;
        this.props.y += props.speedY;
        this.render();
    }

    get scoreToText() {
        return [`Score: ${this.score}`, 8, 16];
    }

    checkCollision() {
        this.checkBounds("x", "x1", "width", "speedX");
        this.checkBounds("y", "y1", "height", "speedY");
    }

    checkBounds(axis, low, high, speed, { bounds, props } = this) {
        if (props[axis] < bounds[low] || props[axis] > bounds[high]) {
            let coef = RNG(.03, .08, 3);
            this.props[speed] = -this.props[speed] + (this.props[speed] < 0 ? coef : coef * -1);
        }
    }
}