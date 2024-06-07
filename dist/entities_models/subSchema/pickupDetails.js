"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickupDetails = void 0;
const mongoose_1 = require("mongoose");
exports.pickupDetails = new mongoose_1.Schema({
    bookingName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: [true, 'state is required']
    },
    postCode: {
        type: String,
        required: [true, 'pincode is required']
    }
});
