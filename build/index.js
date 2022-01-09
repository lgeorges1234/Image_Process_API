"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
var port = 3000;
// static files
// app.use(express.static("public"));
// app.use("/css", express.static(path.join(__dirname, 'public/css'));
// app.use("/img", express.static(path.join(__dirname, 'public/image'));
// app.use("/js", express.static(path.join(__dirname, 'public/js'));
app.use('/api', index_1.default, function (req, res) {
    res.send('hello api world');
});
// Listen on port 3000
app.listen(port, function () {
    console.log("listening on port: ".concat(port, ";"));
});
exports.default = app;
