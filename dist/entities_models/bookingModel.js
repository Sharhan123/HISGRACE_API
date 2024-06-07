"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const locationFrom_1 = require("./subSchema/locationFrom");
const pickupDetails_1 = require("./subSchema/pickupDetails");
const bookingModel = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    from: locationFrom_1.locationFrom,
    to: locationFrom_1.locationFrom,
    vehicle: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'vehicles',
        required: true,
    },
    distance: {
        type: Number,
        required: true
    },
    totalKm: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    driver: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'drivers',
        required: true
    },
    payment: {
        type: Boolean,
        default: false,
        required: true
    },
    pickupDetails: pickupDetails_1.pickupDetails,
    period: {
        time: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    returnDate: {
        type: Date
    },
    person: {
        adult: {
            type: Number,
            required: true
        },
        child: {
            type: Number,
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    },
    type: {
        type: String,
        required: true,
    }
});
const bookingSchema = mongoose_1.default.model('bookings', bookingModel);
exports.default = bookingSchema;
