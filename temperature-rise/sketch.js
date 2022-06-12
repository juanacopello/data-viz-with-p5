//https://www.youtube.com/watch?v=bhfpVl1OWCo

let data
let barWidth
let barHeight
let allDataTemp
let b1
let b2
let b3
let b4
let maxElement
let minElement

function preload(){
    data = loadJSON('data/global-annual-means.json')
}

function setup(){
    createCanvas(windowWidth, windowHeight)
    // for(let i = 0; i < data.arrTemperatures.length; i++){
    // }
    
    allDataTemp = data.arrTemperatures.map(d => {
        return d.global
    })
    console.log(allDataTemp)
    maxElement = max(allDataTemp)
    minElement = min(allDataTemp)

    b1 = color(0, 255, 255)
    b2 = color(0, 0, 255)
    b3 = color(123,24,24)
    b4 = color(247,0,0)
}

function draw(){
    background(220)
    for(let i = 0; i < data.arrTemperatures.length; i++){
    barWidth =  width / data.arrTemperatures.length
    barHeight = height
    let x = barWidth * i
    let y = 0
  
    let cant = map(allDataTemp[i], minElement, maxElement, 0, 1)

     if (allDataTemp[i] > 0){
        let colorRed = lerpColor(b3, color(255, 255, 0), cant)
        fill(colorRed)
        // colorHotTemp = lerpColor(color(255), color(255, 0, 0,), all)
        
    } else {
        let colorBlue = lerpColor(b2, b1, cant) 

        fill(colorBlue)
        // let coldTempAlpha = map(allDataTemp[i], -1, 0, 50, 255)
        // let colorBlue = (0, 0, 255, coldTempAlpha)
        // fill(colorBlue)
    }
    noStroke()
    rect(x, y, barWidth, barHeight)
    }
}
