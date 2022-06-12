let latitude = 56.26392//medida en grados
let longitude = 9.501785

let centerLatitude = 0 //las posiciones en Y
let centerLongitude = 0 // las posiciones en X

let mapImage
let zoom = 1

function preload(){
    mapImage = loadImage("images/world-map.png")
    
}

/*Funciones para transformar las coordenadas en el X y el Y del Canvas
Se utilizó la fórmula de https://en.wikipedia.org/wiki/Web_Mercator_projection*/

function mercX(lon){
    lon = radians(lon) //convierte los grados en radianes para la cuenta
    let a = (128 / PI) * pow(2, zoom)
    let b = lon * PI
    return a * b

}

function mercY(lat){
    lat = radians(lat) //convierte los grados en radianes para la cuenta
    let a = (128 / PI) * pow(2, zoom)
    let b = tan(PI/4 + lat/2)
    let c = PI - log(b)
    return a * c
    
}

function setup(){
    createCanvas(windowWidth, windowHeight)
    background(0)
    translate(width/2, height/2)
    imageMode(CENTER)
    image(mapImage, 0, 0, mapImage.width, mapImage.height)
    let cx = mercX(centerLongitude)
    let cy = mercY(centerLatitude)
    let x = mercX(longitude) - cx
    let y = mercY(latitude) - cy

    fill(255, 0, 255, 200)
    ellipse(x, y, 10)
}

function draw(){

}