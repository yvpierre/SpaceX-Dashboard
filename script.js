class rocket {
    constructor(type) {
        this.type = type;
    }

    typeR() {
        return this.type
    }
}

window.onload = async () => {
    const nameLatest = document.querySelector(".lastRocket--name")
    const typeLatest = document.querySelector(".lastRocket--type")
    const amountAll = document.querySelector(".generalInfos--totalFlights")
    const restMain = document.querySelector(".generalInfos--elem--rest")

    let launchpads  = await fetch("https://api.spacexdata.com/v4/launchpads/")
    let all  = await fetch("https://api.spacexdata.com/v4/launches/")
    let latest = await fetch("https://api.spacexdata.com/v4/launches/latest")

    let dataAll = await all.json()
    let dataLatest = await latest.json()

    let dataLaunchpads = await launchpads.json()
    let latestRocket = new rocket();
    latestRocket.type = dataLatest.rocket.toString()

    console.log(dataAll)
    console.log(dataLatest)
    console.log(dataLaunchpads)

    console.log(dataAll[1].date_utc.toString())

    console.log("Launch year : "+ getLaunchYear("20120239"))

    for(let i=0; i<sizeData(dataLaunchpads); i++) {
        let pos = document.createElement("div")
        pos.innerHTML = "Launchpad n° :"+(i+1)+"<br>Lattitude : "+ dataLaunchpads[i].latitude.toString()+ "<br>Longitude : "+ dataLaunchpads[i].longitude.toString() + "<br><br>"
        document.querySelector(".launchpads").appendChild(pos)
    }



    nameLatest.textContent = nameLatest.textContent + dataLatest.name.toString()
    typeLatest.innerText = typeLatest.innerText + latestRocket.typeR()
    amountAll.innerText = sizeData(dataAll) + amountAll.innerText

    restMain.style.color = "red"
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
