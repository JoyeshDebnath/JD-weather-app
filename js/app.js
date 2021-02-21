//class for displaying data 
class displayData {

    constructor() {
            this.results = document.querySelector('.results');
            this.cityName = document.getElementById('cityName');
            this.cityCountry = document.getElementById('cityCountry');
            this.cityIcon = document.getElementById('cityIcon');
            this.cityTemp = document.getElementById('cityTemp');
            this.cityHumidity = document.getElementById('cityHumidity');
        } //constructor 
        //showData()
    show_data(data) {
            // console.log(data);
            const { name, sys: { country }, main: { temp, humidity } } = data;
            const { icon } = data.weather[0];
            this.results.classList.add('showItem');
            this.cityName.textContent = name; //display name of city 
            this.cityCountry.textContent = country;
            this.cityTemp.textContent = temp;
            this.cityHumidity.textContent = humidity;
            this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`; //icon
        }
        //end of show_data()
}
//end of display Data class



class AjaxWeather {
    constructor() {
            this.API_Key = '459114c65df906ad660aa31ba910d995'; //my api key 
        } //construct0r

    async getWeather(city) {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.API_Key}`; //url of the api
            const weatherData = await fetch(url); //fetching data from url
            const weather = await weatherData.json(); //json format weather data 
            return weather; //returning promise 

        } //end of getWeather()

}

//Immediately invoked function 
(function() {
    const form = document.getElementById('wheatherForm');
    const cityInput = document.getElementById('cityInput');
    const feedback = document.querySelector('.feedback');

    //class 
    const ajax = new AjaxWeather(); //calling the AjaxWeather class
    const display = new displayData(); //call displayData class   
    // 

    form.addEventListener('submit', event => {
        event.preventDefault();
        const city = cityInput.value; //taking the city val from the  user to check 
        //if nothing is entered 
        if (city.length === 0) {
            showFeedback('Woops!!No value is being entered !!');
        } else {
            //if city name is a valid one then call the class 
            ajax.getWeather(city).then(data => {
                // console.log(data);
                display.show_data(data);
            }).catch(err => {
                console.log(err);
            });
        }


    }); //event listener for form submit


    //showFeedback function 
    function showFeedback(message) {
        feedback.classList.add("showItem"); //shoe the feedback block 
        feedback.innerHTML = `<p>${message}</p>`; //display the message to user 

        setTimeout(() => {
            feedback.classList.remove("showItem");
        }, 4000);
        //after 4 sec remove the showItem css class 
    }
    // end of showFeedback function 


})();