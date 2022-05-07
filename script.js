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
    const amountAll = document.querySelector(".rocket--amount")

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

    for(let i=0; i<sizeData(dataLaunchpads); i++) {
        let pos = document.createElement("div")
        pos.innerHTML = "Launchpad n° :"+(i+1)+"<br>Lattitude : "+ dataLaunchpads[i].latitude.toString()+ "<br>Longitude : "+ dataLaunchpads[i].longitude.toString() + "<br><br>"
        document.querySelector(".launchpads").appendChild(pos)
    }




    nameLatest.textContent = nameLatest.textContent + dataLatest.name.toString()
    typeLatest.innerText = typeLatest.innerText + latestRocket.typeR()
    amountAll.innerText = amountAll.innerText + sizeData(dataAll)
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

function getLaunchYear(date) {
    if(date.charAt(3) === "0"){

    }else {

    }
    let year = date.charAt()
}