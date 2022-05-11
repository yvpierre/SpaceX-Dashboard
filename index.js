// Author : Pierre Yvenou
// Github : https://github.com/yvpierre
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var rocket = /** @class */ (function () {
    function rocket(type) {
        this.type = type;
    }
    rocket.prototype.typeR = function () {
        return this.type;
    };
    return rocket;
}());
// @ts-ignore
window.onload = function () { return __awaiter(_this, void 0, void 0, function () {
    var nameLatest, typeLatest, amountAll, avgShips, launchpads, all, latest, test, dataAll, dataLatest, dataLaunchpads, dataTest, latestRocket, i, pos, str;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nameLatest = document.querySelector(".lastRocket--name");
                typeLatest = document.querySelector(".lastRocket--type");
                amountAll = document.querySelector(".generalInfos--totalFlights");
                avgShips = document.querySelector(".generalInfos--avgShips");
                return [4 /*yield*/, fetch("https://api.spacexdata.com/v4/launchpads/")];
            case 1:
                launchpads = _a.sent();
                return [4 /*yield*/, fetch("https://api.spacexdata.com/v4/launches/")];
            case 2:
                all = _a.sent();
                return [4 /*yield*/, fetch("https://api.spacexdata.com/v4/launches/latest")];
            case 3:
                latest = _a.sent();
                return [4 /*yield*/, fetch("https://api.spacexdata.com/v4/landpads/")
                    // PARSING WHEN NECESSARY
                ];
            case 4:
                test = _a.sent();
                return [4 /*yield*/, all.json()];
            case 5:
                dataAll = _a.sent();
                return [4 /*yield*/, latest.json()];
            case 6:
                dataLatest = _a.sent();
                return [4 /*yield*/, launchpads.json()];
            case 7:
                dataLaunchpads = _a.sent();
                return [4 /*yield*/, test.json()];
            case 8:
                dataTest = _a.sent();
                latestRocket = new rocket(dataLatest.rocket.toString());
                // PUTTING INTO CONSOLE
                console.log(dataAll);
                console.log(dataLatest);
                console.log(dataLaunchpads);
                console.log(dataTest);
                console.log(dataAll[1].date_utc.toString());
                for (i = 0; i < sizeData(dataLaunchpads); i++) {
                    pos = document.createElement("div");
                    pos.innerHTML = "Launchpad n° :" + (i + 1) + "<br>Lattitude : " + dataLaunchpads[i].latitude.toString() + "<br>Longitude : " + dataLaunchpads[i].longitude.toString() + "<br><br>";
                    // @ts-ignore
                    document.querySelector(".launchpads").appendChild(pos);
                }
                str = "2022-02-39";
                console.log(str.substring(0, 10));
                nameLatest.textContent = nameLatest.textContent + dataLatest.name.toString();
                typeLatest.innerText = typeLatest.innerText + latestRocket.typeR();
                // GENERAL INFOS
                amountAll.innerText = sizeData(dataAll) + " " + amountAll.innerText;
                avgShips.innerText = calcShips(dataAll) + " " + avgShips.innerText;
                /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
                // @ts-ignore
                particlesJS.load('particles-js', 'particles.json', function () {
                    console.log('callback - particles.js config loaded');
                });
                return [2 /*return*/];
        }
    });
}); };
function calcShips(flights) {
    var avg = 0;
    var total = 0;
    for (var i = 0; i < flights.length; i++) {
        for (var j = 0; j < flights[i].ships.length; i++) {
            total++;
        }
    }
    avg = total / flights.length;
    return avg.toFixed(2);
}
function sizeData(item) {
    var fin = false;
    var i = 0;
    while (fin === false) {
        // @ts-ignore
        if (item[i]) {
            i++;
        }
        else {
            fin = true;
        }
    }
    return i;
}
function getLaunchYear(d) {
    var date = new Date(d);
    console.log("Date: " + date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes() +
        ":" + date.getSeconds());
    console.log(date.getFullYear());
}
