const fs = require('node:fs');

const axios = require('axios');

class Searches{
    history = [];
    dbPath = './db/database.json';


    constructor(){
        this.readDB();
    }

    get historyCapital(){
        return this.history.map(place =>{
            let words = place.split(' ');
            words = words.map(w => w[0].toUpperCase() + w.substring(1));
            return words.join(' ');
        })
    }
    async city ( place = ''){
        try {
            const instance = axios.create({
                baseURL:'https://api.weatherapi.com/v1/search.json?',
                params:{
                    'key':process.env.WETHERAPI_TOKEN,
                    'q':`${place}`
                }
            });
            const answer = await instance.get();
            return answer.data.map(place =>({
                id:place.id,
                name:place.name,
                region:place.region,
                country:place.country,
                lon:place.lon,
                lat:place.lat

            }));
            
        } catch (error) {
            return [];
        }

    }

    async wetherCity(lat,lon){
        try{
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params:{
                    'appid':process.env.OPENWETHER_KEY,
                    'units':'metric',
                    'lang':'en'
                }
            })
            const answer = await instance.get();
            const {weather,main} = answer.data;
            return{
                description: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max
            }
        }catch(error){
            console.log(error);
        }
    }
    addHistory(place=''){
        //Duplicated (Not)
        if (this.history.includes(place.toLocaleLowerCase())){
            return;
        }
        this.history = this.history.splice(0,5);
        this.history.unshift(place.toLocaleLowerCase());
        
        //Save on DB
        this.saveDB();
    }
    saveDB(){
        const payload = {
            history: this.history
        };
        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    };

    readDB(){
        if (!fs.existsSync(this.dbPath)){
            return;
        }
        const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'});
        const data = JSON.parse(info);
        this.history = data.history;
    }

}


module.exports = Searches