// Author : Pierre Yvenou
// Github : https://github.com/yvpierre

class rocket {

    private type:number;

    constructor(type:number) {
        this.type = type;
    }

    typeR() {
        return this.type
    }
}

// @ts-ignore
window.onload = async () => {

    // CONST AND VARIABLE DECLARATION

    // LATEST ROCKET
    // @ts-ignore
    const nameLatest:HTMLElement = document.querySelector(".lastRocket--name")
    // @ts-ignore
    const typeLatest:HTMLElement = document.querySelector(".lastRocket--type")
    // @ts-ignore
    const successLatest:HTMLElement = document.querySelector(".lastRocket--success")
    // @ts-ignore
    const flightNumberLatest:HTMLElement = document.querySelector(".lastRocket--flightNumber")
    // @ts-ignore
    const idLatest:HTMLElement = document.querySelector(".lastRocket--id")
    // @ts-ignore
    let mediaLatest:HTMLElement = document.querySelector(".lastRocket--media")


    // GENERAL INFO
    // @ts-ignore
    const amountAll:HTMLElement = document.querySelector(".generalInfos--totalFlights")
    // @ts-ignore
    const avgShips:HTMLElement = document.querySelector(".generalInfos--avgShips")
    // @ts-ignore
    const totalLandpads:HTMLElement = document.querySelector(".generalInfos--landpads")
    // @ts-ignore
    const totalLaunchpads:HTMLElement = document.querySelector(".generalInfos--launchpads")
    // @ts-ignore
    const avgSuccessLaunch:HTMLElement = document.querySelector(".generalInfos--avgSuccessLaunch")
    // @ts-ignore
    const avgSuccessLand:HTMLElement = document.querySelector(".generalInfos--avgSuccessLand")

    // FETCH REQUESTS
    let latest = await fetch("https://api.spacexdata.com/v4/launches/latest")
    let all  = await fetch("https://api.spacexdata.com/v4/launches/")
    let launchpads  = await fetch("https://api.spacexdata.com/v4/launchpads/")
    let landpads = await fetch("https://api.spacexdata.com/v4/landpads/")

    // PARSING WHEN NECESSARY
    let dataAll = await all.json()
    let dataLatest = await latest.json()
    let dataLaunchpads = await launchpads.json()
    let dataLandpads = await landpads.json()

    let latestRocket = new rocket(dataLatest.rocket.toString());

    // PUTTING INTO CONSOLE
    console.log(dataLatest)
    console.log(dataAll)
    console.log(dataLaunchpads)
    console.log(dataLandpads)

    for(let i=0; i<sizeData(dataLaunchpads); i++) {
        let pos = document.createElement("div")
        pos.innerHTML = "Launchpad n° :"+(i+1)+"<br>Lattitude : "+ dataLaunchpads[i].latitude.toString()+ "<br>Longitude : "+ dataLaunchpads[i].longitude.toString() + "<br><br>"
        // @ts-ignore
    }


    // LATEST
    nameLatest.textContent = nameLatest.textContent + dataLatest.name.toString()
    typeLatest.innerHTML = typeLatest.innerHTML + " " + latestRocket.typeR()
    flightNumberLatest.innerHTML = flightNumberLatest.innerHTML + " " +dataLatest.flight_number.toString()
    idLatest.innerHTML = idLatest.innerHTML + " " + dataLatest.id.toString()
    dataLatest.success ? successLatest.innerHTML = successLatest.innerHTML + " SUCCESS" : successLatest.innerHTML = successLatest.innerHTML + " FAILURE"
    // @ts-ignore
    dataLatest.links.youtube_id ? mediaLatest.src = "https://www.youtube.com/embed/"+dataLatest.links.youtube_id : console.log("NO SOURCE FOR THE MEDIA")

    // mediaLatest.src = "https://www.youtube.com/watch?v="+dataLatest.links.youtube_id

    // mapLatest = fillMap(dataLaunchpads[1])





    // GENERAL INFOS
    amountAll.innerHTML ='<div class="generalInfos--elem--stat">'+sizeData(dataAll) + "</div> " + amountAll.innerText
    avgShips.innerHTML = '<div class="generalInfos--elem--stat">'+calcShips(dataAll) + "</div> "+ avgShips.innerText
    totalLandpads.innerHTML = '<div class="generalInfos--elem--stat">'+sizeData(dataLandpads) + "</div> " + totalLandpads.innerText
    totalLaunchpads.innerHTML = '<div class="generalInfos--elem--stat">'+sizeData(dataLaunchpads) + "</div> " + totalLaunchpads.innerText
    avgSuccessLaunch.innerHTML = '<div class="generalInfos--elem--stat">'+calcSuccessLaunch(dataLaunchpads) + "%</div> " + avgSuccessLaunch.innerText
    avgSuccessLand.innerHTML = '<div class="generalInfos--elem--stat">'+calcSuccessLand(dataLandpads) + "%</div> " + avgSuccessLand.innerText

    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    // @ts-ignore
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

    // @ts-ignore

     fillMapDisplay(dataLaunchpads, dataLandpads)
}

function fillMapDisplay(land:Array<any>, launch:Array<any>) {

    // @ts-ignore
    let map = L.map('mapDisplay', {
        center: [0, -60],
        zoom: 2
    });
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
        id: 'osm-bright',
        // @ts-ignore
        // WIP bounds: boundsMap
    }).addTo(map);


    for(let i:number = 0; i<land.length; i++) {
        console.log("Landpad n"+i+" Coords : "+land[i].latitude+", "+land[i].longitude)
        // @ts-ignore
        let marker = L.marker(L.latLng([land[i].latitude, land[i].longitude])).addTo(map);
        marker.bindPopup(land[i].details.toString())
    }

    for(let j:number = 0; j<launch.length; j++) {
        console.log("Launchpad n"+j+" Coords : "+launch[j].latitude+", "+launch[j].longitude)
        // @ts-ignore
        let marker = L.marker(L.latLng([launch[j].latitude, launch[j].longitude])).addTo(map);
        marker.bindPopup(launch[j].details.toString())
    }
    return map
}

function calcShips(flights:Array<any>){
    let avg:number = 0;
    let total:number = 0;
    for(let i:number = 0; i<flights.length; i++){
        for(let j:number = 0; j<flights[i].ships.length; i++){
            total++;
        }
    }
    avg = total / flights.length;
    return avg.toFixed(2)

}

function calcSuccessLaunch(flights:Array<any>){
    let totalAttempts:number = 0;
    let totalSuccesses:number = 0;
    let res:number = 0;
    for(let i:number = 0; i<flights.length; i++){
        if(flights[i].launch_attempts !== 0){
            totalAttempts+= flights[i].launch_attempts
            totalSuccesses+= flights[i].launch_successes
        }
    }

    res = (totalSuccesses / totalAttempts)
    res = res * 100
    return res.toFixed(1)
}

function calcSuccessLand(flights:Array<any>){
    let totalAttempts:number = 0;
    let totalSuccesses:number = 0;
    let res:number = 0;
    for(let i:number = 0; i<flights.length; i++){
        if(flights[i].landing_attempts !== 0){
            totalAttempts+= flights[i].landing_attempts
            totalSuccesses+= flights[i].landing_successes
        }
    }

    res = (totalSuccesses / totalAttempts)
    res = res * 100
    return res.toFixed(1)
}

function sizeData(item:number) {
    let fin:boolean = false
    let i:number = 0

    while(fin === false){
        // @ts-ignore
        if(item[i]){
            i++
        }else {
            fin = true
        }
    }
    return i
}

function getLaunchYear(d:number){
    var date = new Date(d);

    /* console.log("Date: "+date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds());

     */
    console.log(date.getFullYear())
}


