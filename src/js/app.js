/**
 * CatchTheBall
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import Game from "./Game.js";
import GameRules from "./GameRules.js";

if (window.innerWidth > 384) {
    GameRules.canvas.width = 320;
}

new Game();