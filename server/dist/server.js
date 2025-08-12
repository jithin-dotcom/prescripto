"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const env_config_1 = __importDefault(require("./config/env.config"));
const db_config_1 = __importDefault(require("./config/db.config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const patientProfile_routes_1 = __importDefault(require("./routes/patientProfile.routes"));
const doctorProfile_routes_1 = __importDefault(require("./routes/doctorProfile.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const coudinary_routes_1 = __importDefault(require("./routes/coudinary.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const wallet_routes_1 = __importDefault(require("./routes/wallet.routes"));
const doctorRating_routes_1 = __importDefault(require("./routes/doctorRating.routes"));
const prescription_routes_1 = __importDefault(require("./routes/prescription.routes"));
const concern_routes_1 = __importDefault(require("./routes/concern.routes"));
const requestLogger_middleware_1 = require("./middlewares/requestLogger.middleware");
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const socketAuth_middleware_1 = require("./middlewares/socketAuth.middleware");
const chat_socket_1 = require("./utils/sockets/chat.socket");
const videoCall_socket_1 = require("./utils/sockets/videoCall.socket");
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : [];
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});
const chatNamespace = io.of("/chat");
chatNamespace.use(socketAuth_middleware_1.socketAuthMiddleware);
chatNamespace.on("connection", (socket) => {
    console.log(`Chat socket connected: ${socket.id}`);
    (0, chat_socket_1.chatSocketHandler)(chatNamespace, socket);
});
const videoNamespace = io.of("/video");
videoNamespace.on("connection", (socket) => {
    console.log(` Video socket connected: ${socket.id}`);
    (0, videoCall_socket_1.videoCallSocketHandler)(videoNamespace, socket);
});
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // Allow non-browser requests like Postman, curl
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("CORS policy: This origin is not allowed"), false);
        }
    },
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(requestLogger_middleware_1.requestLogger);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/patient", patientProfile_routes_1.default);
app.use("/api/doctor", doctorProfile_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api", coudinary_routes_1.default);
app.use("/api", appointment_routes_1.default);
app.use("/api/payments", payment_routes_1.default);
app.use("/api", chat_routes_1.default);
app.use("/api", wallet_routes_1.default);
app.use("/api", doctorRating_routes_1.default);
app.use("/api", prescription_routes_1.default);
app.use("/api", concern_routes_1.default);
app.use(notFound_middleware_1.notFound);
app.use(errorHandler_middleware_1.errorHandler);
const PORT = env_config_1.default.PORT || 8000;
(0, db_config_1.default)();
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
