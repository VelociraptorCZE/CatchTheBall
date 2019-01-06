/**
 * CatchTheBall
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default class Texture {
    constructor(src) {
        this.texture = new Image();
        this.texture.src = src;
    }
}