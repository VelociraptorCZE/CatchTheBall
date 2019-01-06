/**
 * CatchTheBall
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default class GameRules {
    static get bounds() {
        const bounds = GameRules.canvasBounds;
        Object.keys(bounds).forEach(bound => {
            bounds[bound] = bounds[bound] - 32;
        });

        return {
            x1: 0,
            y1: 0,
            ...bounds
        }
    }

    static get canvas() {
        return document.getElementById("js-game") || document.querySelector("canvas");
    }

    static get canvasBounds() {
        const c = GameRules.canvas;
        return {
            width: parseInt(c.width),
            height: parseInt(c.height)
        }
    }
}