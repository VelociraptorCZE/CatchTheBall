/**
 * CatchTheBall
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default function RNG(low = 0, high = Number.MAX_SAFE_INTEGER, decimals = 0) {
    return parseFloat((low + (Math.random() * (high - low))).toFixed(decimals));
}