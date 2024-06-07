"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const stripePayment_1 = require("../providers/stripePayment");
class bookingController {
    constructor(bookingusecase, vehicleusecase) {
        this.bookingusecase = bookingusecase;
        this.vehicleusecase = vehicleusecase;
    }
    bookingSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const resData = Object.assign(Object.assign({}, data), { userId: decoded.id });
                    const line_items = [
                        {
                            price_data: {
                                currency: "INR",
                                product_data: {
                                    name: `Taxi booking charge of trip ${data.from.name || data.from.city} TO ${data.to.name || data.to.city}`,
                                },
                                unit_amount: Math.round(Math.round(Math.max(500, 0.3 * data.totalPrice) * 100)),
                            },
                            quantity: 1,
                        },
                    ];
                    const saved = yield this.bookingusecase.saveBooking(resData);
                    const session = yield stripePayment_1.stripe.checkout.sessions.create({
                        payment_method_types: ["card"],
                        line_items: line_items,
                        mode: "payment",
                        success_url: "http://localhost:5173/success",
                        cancel_url: "http://localhost:5173/failure",
                        billing_address_collection: "required",
                        metadata: {
                            userId: JSON.stringify(saved._id)
                        }
                    });
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ session: session.id });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    webhookRouter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hello........................................");
            try {
                const event = req.body;
                const stripeSignature = req.headers['stripe-signature'] || '';
                if (event.type === 'checkout.session.completed') {
                    const session = event.data.object;
                    const userId = session.metadata.userId;
                    console.log(userId, session, 'is this is ok....................................');
                    const bookingData = yield this.bookingusecase.updatePayment(JSON.parse(userId), true);
                    let booking = [];
                    if ((bookingData === null || bookingData === void 0 ? void 0 : bookingData.type) === 'one-way') {
                        const startDate = bookingData.period.date;
                        booking.push(startDate.toISOString().split('T')[0]);
                    }
                    else {
                        const startDate = bookingData === null || bookingData === void 0 ? void 0 : bookingData.period.date;
                        const endDate = bookingData === null || bookingData === void 0 ? void 0 : bookingData.returnDate;
                        if (startDate && startDate === endDate) {
                            booking.push(startDate.toISOString().split('T')[0]);
                        }
                        else {
                            if (startDate && endDate) {
                                const datesBetween = this.getDatesBetween(startDate, endDate);
                                booking = [...booking, ...datesBetween];
                            }
                        }
                    }
                    yield this.vehicleusecase.updateBooking(bookingData === null || bookingData === void 0 ? void 0 : bookingData.vehicle, booking);
                    res.status(200).json({ received: true });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    getDatesBetween(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            dates.push(currentDate.toISOString().split('T')[0]); // Store date in YYYY-MM-DD format
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }
    getBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.bookingusecase.findAll();
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' });
            }
        });
    }
    getBookingByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.slice(7), process.env.JWT_SECRET);
                    const data = yield this.bookingusecase.findByUser(decoded.id);
                    return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: 'success', data });
                }
                return res.status(httpStatusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: 'Please try login again and try again ' });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'sorry we are facing some issues with our server' });
            }
        });
    }
    bookingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, status } = req.body;
                const data = yield this.bookingusecase.bookingStatus(id, status);
                return res.status(httpStatusCodes_1.STATUS_CODES.OK).json({ message: "success", data });
            }
            catch (err) {
                console.log(err);
                return res.status(httpStatusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'sorry we are facing some issues with our server' });
            }
        });
    }
}
exports.bookingController = bookingController;
