let table
let arrTemperatures = []

function preload(){
    table = loadTable('data/zonal-annual-means.csv', 'csv', 'header')
}

function setup(){
    console.log(table)
    console.log(table.rows)

    arrTemperatures = table.rows
    .map(values => {
        return {
            anio: +values.obj.Year, //el + delante del parametro convierte string a numero
            global: +values.obj.Glob 
        }
    })
    console.log(arrTemperatures)
   
    saveJSON({
        arrTemperatures
    }, 'global-annual-means.json')
    
}
