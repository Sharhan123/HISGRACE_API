"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AddressSchema = new mongoose_1.Schema({
    country: {
        type: String,
        required: [true, 'country is required']
    },
    state: {
        type: String,
        required: [true, 'state is required']
    },
    city: {
        type: String,
        required: [true, 'city is required']
    },
    pincode: {
        type: Number,
        required: [true, 'pincode is required']
    }
});
