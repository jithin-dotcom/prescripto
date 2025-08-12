"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecentroHeaders = void 0;
const getDecentroHeaders = () => ({
    "client_id": process.env.DECENTRO_CLIENT_ID,
    "client_secret": process.env.DECENTRO_CLIENT_SECRET,
    "module_secret": process.env.DECENTRO_MODULE_SECRET,
    "Content-Type": "application/json"
});
exports.getDecentroHeaders = getDecentroHeaders;
