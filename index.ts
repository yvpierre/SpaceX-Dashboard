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
    // @ts-ignore
    const nameLatest:HTMLElement = document.querySelector(".lastRocket--name")
    // @ts-ignore
    const typeLatest:HTMLElement = document.querySelector(".lastRocket--type")
    // @ts-ignore
    const amountAll:HTMLElement = document.querySelector(".generalInfos--totalFlights")

    // @ts-ignore
    const avgShips:HTMLElement = document.querySelector(".generalInfos--avgShips")


    // FETCH REQUESTS
    let launchpads  = await fetch("https://api.spacexdata.com/v4/launchpads/")
    let all  = await fetch("https://api.spacexdata.com/v4/launches/")
    let latest = await fetch("https://api.spacexdata.com/v4/launches/latest")
    let test = await fetch("https://api.spacexdata.com/v4/landpads/")

    // PARSING WHEN NECESSARY
    let dataAll = await all.json()
    let dataLatest = await latest.json()
    let dataLaunchpads = await launchpads.json()
    let dataTest = await test.json()

    let latestRocket = new rocket(dataLatest.rocket.toString());

    // PUTTING INTO CONSOLE
    console.log(dataAll)
    console.log(dataLatest)
    console.log(dataLaunchpads)
    console.log(dataTest)

    console.log(dataAll[1].date_utc.toString())

    for(let i=0; i<sizeData(dataLaunchpads); i++) {
        let pos = document.createElement("div")
        pos.innerHTML = "Launchpad n° :"+(i+1)+"<br>Lattitude : "+ dataLaunchpads[i].latitude.toString()+ "<br>Longitude : "+ dataLaunchpads[i].longitude.toString() + "<br><br>"
        // @ts-ignore
        document.querySelector(".launchpads").appendChild(pos)
    }

    let str:string = "2022-02-39"
    console.log(str.substring(0,10))

    nameLatest.textContent = nameLatest.textContent + dataLatest.name.toString()
    typeLatest.innerText = typeLatest.innerText + latestRocket.typeR()

    // GENERAL INFOS
    amountAll.innerText = sizeData(dataAll) + " " + amountAll.innerText
    avgShips.innerText = calcShips(dataAll) + " "+ avgShips.innerText


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


