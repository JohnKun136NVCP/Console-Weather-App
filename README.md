# 🌦️ NodeJS Weather Console App

A simple Node.js console application to fetch and display weather information using external APIs.

## 🔌 APIs Used
- [OpenWeather](https://openweathermap.org/api)
- [WeatherAPI](https://www.weatherapi.com/)

## 🧭 App Options
- **Search a City** – Returns up to 5 matching results by default  
- **View Search History** – Displays the last 5 searched cities  
- **Exit** – Closes the application

## ✨ Features
- **Persistent Storage** – Saves search history in a local JSON file  
- **Weather Display** – Shows current weather data for selected cities  
- **Language** – English interface

## 🚀 Getting Started
1. Clone the repository  
2. Run `npm install` to install dependencies  
3. Execute the app with `node app.js`

## 📁 Project Structure

```
.
├── db
│   └── database.json
├── helpers
│   └── inquirer.js
├── models
│   └── searches.js
├── .gitignore
├── example.env
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## 📌 Notes
- Make sure to set your API keys in the config file or environment variables.
- Internet connection is required to fetch weather data.