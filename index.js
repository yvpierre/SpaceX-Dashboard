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
    var nameLatest, typeLatest, successLatest, flightNumberLatest, idLatest, mediaLatest, amountAll, avgShips, totalLandpads, totalLaunchpads, avgSuccessLaunch, avgSuccessLand, latest, all, launchpads, landpads, dataAll, dataLatest, dataLaunchpads, dataLandpads, latestRocket, i, pos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nameLatest = document.querySelector(".lastRocket--name");
                typeLatest = document.querySelector(".lastRocket--type");
                successLatest = document.querySelector(".lastRocket--success");
                flightNumberLatest = document.querySelector(".lastRocket--flightNumber");
                idLatest = document.querySelector(".lastRocket--id");
                mediaLatest = document.querySelector(".lastRocket--media");
                amountAll = document.querySelector(".generalInfos--totalFlights");
                avgShips = document.querySelector(".generalInfos--avgShips");
                totalLandpads = document.querySelector(".generalInfos--landpads");
                totalLaunchpads = document.querySelector(".generalInfos--launchpads");
                avgSuccessLaunch = document.querySelector(".generalInfos--avgSuccessLaunch");
                avgSuccessLand = document.querySelector(".generalInfos--avgSuccessLand");
                return [4 /*yield*/, fetch("https://api.spacexdata.com/v4/launches/latest")];
            case 1:
                latest = _a.sent();
                return [4 /*yield*/, fetch("https://api.spacexdata.com/v4/launches/")];
            case 2:
                all = _a.sent();
                return [4 /*yield*/, fetch("https://api.spacexdata.com/v4/launchpads/")];
            case 3:
                launchpads = _a.sent();
                return [4 /*yield*/, fetch("https://api.spacexdata.com/v4/landpads/")
                    // PARSING WHEN NECESSARY
                ];
            case 4:
                landpads = _a.sent();
                return [4 /*yield*/, all.json()];
            case 5:
                dataAll = _a.sent();
                return [4 /*yield*/, latest.json()];
            case 6:
                dataLatest = _a.sent();
                return [4 /*yield*/, launchpads.json()];
            case 7:
                dataLaunchpads = _a.sent();
                return [4 /*yield*/, landpads.json()];
            case 8:
                dataLandpads = _a.sent();
                latestRocket = new rocket(dataLatest.rocket.toString());
                // PUTTING INTO CONSOLE
                console.log(dataLatest);
                console.log(dataAll);
                console.log(dataLaunchpads);
                console.log(dataLandpads);
                for (i = 0; i < sizeData(dataLaunchpads); i++) {
                    pos = document.createElement("div");
                    pos.innerHTML = "Launchpad n° :" + (i + 1) + "<br>Lattitude : " + dataLaunchpads[i].latitude.toString() + "<br>Longitude : " + dataLaunchpads[i].longitude.toString() + "<br><br>";
                    // @ts-ignore
                }
                // LATEST
                nameLatest.textContent = nameLatest.textContent + dataLatest.name.toString();
                typeLatest.innerHTML = typeLatest.innerHTML + " " + latestRocket.typeR();
                flightNumberLatest.innerHTML = flightNumberLatest.innerHTML + " " + dataLatest.flight_number.toString();
                idLatest.innerHTML = idLatest.innerHTML + " " + dataLatest.id.toString();
                dataLatest.success ? successLatest.innerHTML = successLatest.innerHTML + " SUCCESS" : successLatest.innerHTML = successLatest.innerHTML + " FAILURE";
                // @ts-ignore
                dataLatest.links.youtube_id ? mediaLatest.src = "https://www.youtube.com/embed/" + dataLatest.links.youtube_id : console.log("NO SOURCE FOR THE MEDIA");
                // mediaLatest.src = "https://www.youtube.com/watch?v="+dataLatest.links.youtube_id
                // mapLatest = fillMap(dataLaunchpads[1])
                // GENERAL INFOS
                amountAll.innerHTML = '<div class="generalInfos--elem--stat">' + sizeData(dataAll) + "</div> " + amountAll.innerText;
                avgShips.innerHTML = '<div class="generalInfos--elem--stat">' + calcShips(dataAll) + "</div> " + avgShips.innerText;
                totalLandpads.innerHTML = '<div class="generalInfos--elem--stat">' + sizeData(dataLandpads) + "</div> " + totalLandpads.innerText;
                totalLaunchpads.innerHTML = '<div class="generalInfos--elem--stat">' + sizeData(dataLaunchpads) + "</div> " + totalLaunchpads.innerText;
                avgSuccessLaunch.innerHTML = '<div class="generalInfos--elem--stat">' + calcSuccessLaunch(dataLaunchpads) + "%</div> " + avgSuccessLaunch.innerText;
                avgSuccessLand.innerHTML = '<div class="generalInfos--elem--stat">' + calcSuccessLand(dataLandpads) + "%</div> " + avgSuccessLand.innerText;
                /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
                // @ts-ignore
                particlesJS.load('particles-js', 'particles.json', function () {
                    console.log('callback - particles.js config loaded');
                });
                // @ts-ignore
                fillMapDisplay(dataLaunchpads, dataLandpads);
                return [2 /*return*/];
        }
    });
}); };
function fillMapDisplay(land, launch) {
    // @ts-ignore
    var map = L.map('mapDisplay', {
        center: [0, -60],
        zoom: 2
    });
    console.log("bite");
    // @ts-ignore
    /* WIP
        let p1 = L.point(0,0),
        p2 = map.getSize(),
        // @ts-ignore
        boundsMap = L.bounds(p1,p2);
    console.log(p2)

     */
    map.options.minZoom = 2;
    map.options.maxZoom = 15;
    // @ts-ignore
    L.tileLayer('https://maps.geoapify.com/v1/tile/dark-matter-dark-purple/{z}/{x}/{y}.png?apiKey=08baea174349417a9d921269369a8e4e', {
        id: 'osm-bright'
    }).addTo(map);
    for (var i = 0; i < land.length; i++) {
        console.log("Landpad n" + i + " Coords : " + land[i].latitude + ", " + land[i].longitude);
        // @ts-ignore
        var marker = L.marker(L.latLng([land[i].latitude, land[i].longitude])).addTo(map);
        marker.bindPopup(land[i].details.toString());
    }
    for (var j = 0; j < launch.length; j++) {
        console.log("Launchpad n" + j + " Coords : " + launch[j].latitude + ", " + launch[j].longitude);
        // @ts-ignore
        var marker = L.marker(L.latLng([launch[j].latitude, launch[j].longitude])).addTo(map);
        marker.bindPopup(launch[j].details.toString());
    }
    return map;
}
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
function calcSuccessLaunch(flights) {
    var totalAttempts = 0;
    var totalSuccesses = 0;
    var res = 0;
    for (var i = 0; i < flights.length; i++) {
        if (flights[i].launch_attempts !== 0) {
            totalAttempts += flights[i].launch_attempts;
            totalSuccesses += flights[i].launch_successes;
        }
    }
    res = (totalSuccesses / totalAttempts);
    res = res * 100;
    return res.toFixed(1);
}
function calcSuccessLand(flights) {
    var totalAttempts = 0;
    var totalSuccesses = 0;
    var res = 0;
    for (var i = 0; i < flights.length; i++) {
        if (flights[i].landing_attempts !== 0) {
            totalAttempts += flights[i].landing_attempts;
            totalSuccesses += flights[i].landing_successes;
        }
    }
    res = (totalSuccesses / totalAttempts);
    res = res * 100;
    return res.toFixed(1);
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
    /* console.log("Date: "+date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds());

     */
    console.log(date.getFullYear());
}
