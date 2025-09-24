require('dotenv').config({quiet:true})
const  {inquirerMenu,pause, readInput, listPlaces   
} = require('./helpers/inquirer');
const Searches = require('./models/searches');


const main = async()=>{
    let opt;
    const search = new Searches();
    do{        
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                // Show message
                const searchTerm = await readInput("City: ");
                
                // Search a place(s)
                const places =  await search.city(searchTerm);
                const selectedId = await listPlaces(places);
                if (selectedId === '0')continue;

                
                // Select a option
                const selectedPlace = places.find(p => p.id === selectedId); 
                //Save DB
                const placeFullName = `${selectedPlace.name}, ${selectedPlace.region}, ${selectedPlace.country}`
                search.addHistory(placeFullName);
               // Wether
               const weather = await search.wetherCity(selectedPlace.lat,selectedPlace.lon)
               // Show information
               console.clear();
               console.log('\n City information\n'.green);
               console.log("City: ",selectedPlace.name.green,",",selectedPlace.region.green,",",selectedPlace.country.green);
               console.log("Latitude: ",selectedPlace.lat);
               console.log("Longitude: ",selectedPlace.lon);
               console.log("Temperature: ",weather.temp);
               console.log("Min: ",weather.min);
               console.log("Max: ",weather.max);
               console.log("Status: ",weather.description.green);

               break;


            case 2:
                search.historyCapital.forEach((place,i) =>{
                    const idx = `${i + 1}.`.green;
                    console.log(`${ idx } ${place} `);
                })
                break;
            default:
                break;
        }
        

        
        if (opt!== 0) await pause();
    
    }while(opt!==0);

}
main();