// Author : Pierre Yvenou
// Github : https://github.com/yvpierre

class rocket {

    private type:number;

    constructor(type) {
        this.type = type;
    }

    typeR() {
        return this.type
    }
}

// @ts-ignore
window.onload = async () => {

    // CONST AND VARIABLE DECLARATION
    const nameLatest = document.querySelector(".lastRocket--name")
    const typeLatest:HTMLElement = document.querySelector(".lastRocket--type")
    const amountAll:HTMLElement = document.querySelector(".generalInfos--totalFlights")


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

    console.log("Launch year : "+ getLaunchYear("20120239"))

    for(let i=0; i<sizeData(dataLaunchpads); i++) {
        let pos = document.createElement("div")
        pos.innerHTML = "Launchpad n° :"+(i+1)+"<br>Lattitude : "+ dataLaunchpads[i].latitude.toString()+ "<br>Longitude : "+ dataLaunchpads[i].longitude.toString() + "<br><br>"
        document.querySelector(".launchpads").appendChild(pos)
    }


    nameLatest.textContent = nameLatest.textContent + dataLatest.name.toString()
    typeLatest.innerText = typeLatest.innerText + latestRocket.typeR()

    // GENERAL INFOS
    amountAll.innerText = sizeData(dataAll) + " " + amountAll.innerText


    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    // @ts-ignore
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });


}

function sizeData(item) {
    let fin = false
    let i = 0

    while(fin === false){
        if(item[i]){
            i++
        }else {
            fin = true
        }
    }
    return i
}

function setCharAt(str, index, chg) {
    if(index > str.length-1) return str;

    return str.substring(0, index) + chg + str.substring(index+1)

}

function convertDate(da){
    var date = new Date(da * 1000);
// Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2);

    console.log(formattedTime);
}

convertDate(1607271420)

function getLaunchYear(date) {
    let year = "2000"
    console.log("3 : "+date.charAt(3))
    if(date.charAt(2) === "0"){
        setCharAt(year, 2, "0")
        for(let i=0; i<10; i++){
            if(i.toString() === date.charAt(3)){
                console.log(i)
                setCharAt(year, 3, i.toString())
            }
        }
    }else if(date.charAt(2) === "1"){
        console.log(year.charAt(2))
        setCharAt(year, 2, 1)
        console.log(year.charAt(2))
        for(let i=0; i<10; i++){
            if(i.toString() === date.charAt(3)){
                setCharAt(year, 3, i.toString())
            }
        }
    }else if(date.charAt(2) === "2") {
        setCharAt(year, 2, "2")
        console.log(year.charAt(2))
        for(let i=0; i<10; i++){
            if(i.toString() === date.charAt(3)){
                setCharAt(year, 3, i.toString())
            }
        }
    }else {
        console.log("this year is still yet to come")
    }

    return year
}
