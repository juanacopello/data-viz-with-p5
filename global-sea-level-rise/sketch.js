let seaLevelData
let numberRows, numberColumns
//Create Arrays of String because the table.get() function only returns strings
let arrDateString = []
let arrGsmlString = []
//Create Arrays of Numbers to save values when they are parsed
let arrDateNumber = []
let arrGsmlNumber = []

//Max and Min variables
let minGsml
let maxGsml

let positionX 
let positionY 

function preload(){
    seaLevelData = loadTable('assets/sea_level_data.csv')
}

function setup(){
    createCanvas(windowWidth, windowHeight)
    console.log(seaLevelData)
    //Getting row and column count of .csv file
    numberRows = seaLevelData.getRowCount()
    numberColumns = seaLevelData.getColumnCount()
    console.log("Rows: " + numberRows + " Columns: " + numberColumns)

    for(let r = 1; r < seaLevelData.getRowCount(); r++){
        let allDates = seaLevelData.get(r, 0)
        let allGsml = seaLevelData.get(r, 1)
        arrDateString.push(allDates)
        arrGsmlString.push(allGsml)       
    }

    //Convert strings to numbers and create new arrays of numbers
    arrDateString.forEach(values => {
        arrDateNumber.push(parseFloat(values))
    })
    arrGsmlString.forEach(values => {
        arrGsmlNumber.push(parseFloat(values))
    })
   
    
    //Get maximum and mininum values of GSML from the new array of numbers 
    minGsml = min(arrGsmlNumber)
    maxGsml = max(arrGsmlNumber) 
   
      
}

function draw(){
    background(220)
    let size = [] //Create array for numbers of map() function (p5.js)
    positionX = width/2
    positionY = height/2
    let radius = width/5 - 100
    let angle = 360 / numberRows
    let r = 3
    chartInfo()
    for(let i = 0; i < seaLevelData.getRowCount(); i++){
        size[i] = map(arrGsmlNumber[i], minGsml, maxGsml, 0, 200) //mapping (p5 function) the GSML values for length of line
        let pointsX = (size[i] + radius) * cos(radians(angle * i)) + positionX
        let pointsY = (size[i] + radius) * sin(radians(angle * i)) + positionY

        let circX = radius * cos(radians(angle * i)) + positionX
        let circY = radius * sin(radians(angle * i)) + positionY

        //draw line from internal circle to external circle
        //color blue the january values

        if(i % 12 == 0){
            strokeWeight(0.5)
            stroke(0, 0, 139)
        } else{
            strokeWeight(0.1)
            stroke(0)
        }
        line(circX, circY, pointsX, pointsY)
        //draw external circle
        //paint red when hovering in circle and show data
        let d = dist(mouseX, mouseY, pointsX, pointsY)
        if(d < r){
            fill(0)
            textAlign(CENTER)
            textSize(20)
            text(arrDateString[i], positionX, positionY - 20)
            text(arrGsmlNumber[i], positionX, positionY)
            fill(255, 0, 0)
        } else{
            fill(0, 0, 139)
        }
        noStroke()
        ellipse(pointsX, pointsY, r * 2)
    }
}

function chartInfo(){
    textFont('Helvetica');
    fill(0)
    textAlign(LEFT)
    //title
    textStyle(BOLD);
    textSize(30)
    text("Global Average Absolute Sea Level Change, 1880-2014", width/15, height/5, 250)
     //description 
     textSize(16)
     textStyle(NORMAL);
     text("This data contains “cumulative changes in sea level for the world’s oceans since 1880, based on a combination of long-term tide gauge measurements and recent satellite measurements. It shows average absolute sea level change, which refers to the height of the ocean surface, regardless of whether nearby land is rising or falling. Satellite data are based solely on measured sea level, while the long-term tide gauge data include a small correction factor because the size and shape of the oceans are changing slowly over time. (On average, the ocean floor has been gradually sinking since the last Ice Age peak, 20,000 years ago.", width/15, height/5 + 150, 250)
}