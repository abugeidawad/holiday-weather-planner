
    function createIconUrl(iconcode) {
        return "https://openweathermap.org/img/w/" + iconcode + ".png";

    }
    function searchLocationWeather(lat , lon) {

        const APIKey = "88afaf5d902bd0951e5afcfd34451691";
        
        // current weather forecast URL //
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=88afaf5d902bd0951e5afcfd34451691";
        // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            
            $(".weatherIcon").attr("src", createIconUrl(response.weather[0].icon));
            var desc = response.weather[0].description;
            desc = desc.charAt(0).toUpperCase() + desc.slice(1)
            $(".description").text(desc);
            $(".locationName").text("Location: " + response.name);
            $(".currentDate").html(moment(response.dt_txt).format('dddd Do MMMM YYYY'));  
            $(".humidity").text("Humidity: " + response.main.humidity + " %");
            $(".temp").text("Temperature: " + (response.main.temp-273.15).toFixed(2)+" °C");
        });

    };
  
    
