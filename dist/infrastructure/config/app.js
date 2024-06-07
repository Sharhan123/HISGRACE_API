"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const vehicleRoutes_1 = __importDefault(require("../routes/vehicleRoutes"));
const adminRoutes_1 = __importDefault(require("../routes/adminRoutes"));
const packageRoutes_1 = __importDefault(require("../routes/packageRoutes"));
const driverRoutes_1 = __importDefault(require("../routes/driverRoutes"));
const bookingRoutes_1 = __importDefault(require("../routes/bookingRoutes"));
const chatRoutes_1 = __importDefault(require("../routes/chatRoutes"));
const packageBookingRoutes_1 = __importDefault(require("../routes/packageBookingRoutes"));
dotenv_1.default.config();
const createServer = () => {
    try {
        const app = (0, express_1.default)();
        app.use(express_1.default.json({ limit: '50mb' }));
        app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
        app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../../../images')));
        // const corsOptions = {
        //     origin: '*', 
        //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
        //     allowedHeaders: ['Content-Type', 'Authorization'], 
        //     preflightContinue: true,
        //     optionsSuccessStatus: 204
        //   };
        //   app.use(cors(corsOptions));
        //   app.options('*', cors(corsOptions));
        // const allowedOrigins = ['https://dns-manager-ui.vercel.app/'];
        app.use((0, cors_1.default)({
            origin: function (origin, callback) {
                callback(null, true);
            }
        }));
        app.use('/', (req, res) => {
            res.json({ message: 'ok' });
        });
        app.use('/api/user', userRoutes_1.default);
        app.use('/api/vehicle', vehicleRoutes_1.default);
        app.use('/api/admin', adminRoutes_1.default);
        app.use('/api/package', packageRoutes_1.default);
        app.use('/api/driver', driverRoutes_1.default);
        app.use('/api/bookings', bookingRoutes_1.default);
        app.use('/api/chat', chatRoutes_1.default);
        app.use('/api/packageBooking', packageBookingRoutes_1.default);
        return app;
    }
    catch (err) {
        console.log('error logging from createServer, from app.ts');
        console.error('error caught from app');
        console.log(err.message);
    }
};
exports.createServer = createServer;
