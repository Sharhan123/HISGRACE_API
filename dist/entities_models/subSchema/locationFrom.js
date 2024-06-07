"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationFrom = void 0;
const mongoose_1 = require("mongoose");
exports.locationFrom = new mongoose_1.Schema({
    name: {
        type: String,
    },
    city: {
        type: String,
    },
    county: {
        type: String,
    },
    address_line1: {
        type: String,
    },
    address_line2: {
        type: String,
    },
    country_code: {
        type: String,
    },
    formatted: {
        type: String,
    },
    place_id: {
        type: String,
    },
    state_code: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lon: {
        type: Number,
    },
    country: {
        type: String,
        required: [true, 'country is required']
    },
    state: {
        type: String,
        required: [true, 'state is required']
    },
    postcode: {
        type: String,
    }
});
