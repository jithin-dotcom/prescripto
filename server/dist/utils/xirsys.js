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
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const router = express_1.default.Router();
router.get("/ice-servers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyString = JSON.stringify({ format: "urls" });
    const xirsysCred = process.env.XIRSYS_CRED;
    const iceServers = [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" }
    ];
    if (!xirsysCred) {
        console.warn("XIRSYS_CRED not set, returning fallback STUNs only");
        res.json(iceServers);
        return;
    }
    const options = {
        host: "global.xirsys.net",
        path: "/_turn/prescripto",
        headers: {
            "Authorization": "Basic " + Buffer.from(xirsysCred).toString("base64"),
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(bodyString),
        },
    };
    const request = https_1.default.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => {
            var _a;
            try {
                const parsed = JSON.parse(data);
                const xirsysServers = ((_a = parsed.v) === null || _a === void 0 ? void 0 : _a.iceServers)
                    ? (Array.isArray(parsed.v.iceServers) ? parsed.v.iceServers : [parsed.v.iceServers])
                    : [];
                xirsysServers.forEach((server) => {
                    const turnUrls = server.urls.filter((url) => url.startsWith("turn:") || url.startsWith("turns:"));
                    if (turnUrls.length > 0) {
                        iceServers.push({
                            username: server.username,
                            credential: server.credential,
                            urls: turnUrls
                        });
                    }
                });
                res.json(iceServers);
            }
            catch (err) {
                console.error("Failed to parse Xirsys response, returning fallback STUNs:", err);
                res.json(iceServers);
            }
        });
    });
    request.on("error", (err) => {
        console.error("Xirsys request error, returning fallback STUNs:", err);
        res.json(iceServers);
    });
    request.write(bodyString);
    request.end();
}));
exports.default = router;
