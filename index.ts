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
        document.querySelector(".launchpads").appendChild(pos)
    }


    // LATEST
    nameLatest.textContent = nameLatest.textContent + dataLatest.name.toString()
    typeLatest.innerHTML = typeLatest.innerHTML + " " + latestRocket.typeR()
    flightNumberLatest.innerHTML = flightNumberLatest.innerHTML + " " +dataLatest.flight_number.toString()
    idLatest.innerHTML = idLatest.innerHTML + " " + dataLatest.id.toString()
    dataLatest.success ? successLatest.innerHTML = successLatest.innerHTML + " SUCCESS" : successLatest.innerHTML = successLatest.innerHTML + " FAILURE"


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
            console.log(flights[i].launch_attempts)
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
            console.log(flights[i])
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

    console.log("Date: "+date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds());

    console.log(date.getFullYear())
}


