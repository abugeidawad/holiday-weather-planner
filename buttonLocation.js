 
$(document).ready(function () {

     var resultDiv= document.getElementById("results");
      var introDiv= document.getElementById("intro")
     resultDiv.style.display = "none";

   var where = ""

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


     function success(pos) {
        var crd = pos.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        where = crd.latitude + "," + crd.longitude + ";r=30000";
        console.log(where);
        searchLocationWeather(crd.latitude, crd.longitude)
    }
     
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        $('.modal').modal();
        $('#modal1').modal('open');
        event.preventDefault();
        
    }
    $("#agreebtn").click(function(){
        window.location.reload();
    });
    
    navigator.geolocation.getCurrentPosition(success, error, options);


         function requestData(what, where) {
        $.ajax({
            url: 'https://places.ls.hereapi.com/places/v1/discover/explore',
            type: 'GET',
            data: {
                at: where,
                cat: what,
                apiKey: '-svaY28TziQvERQtErWdRG4N5KBUlJ4npN36uBx92V0'
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
            },
            success: function (data) {
                console.log(data);
                populateResults(data);
            }
        });
    }


    function populateResults(data) {
        // var placeID = data.results.items[0].id;
        // var html = "";
        $("#results").empty()
        data.results.items.slice(0, 10).forEach(element => {
            var placeID = element.id;
            var anchorLink = $("<a>");
            anchorLink.text(element.title);
             anchorLink.append($("<br>"));
            anchorLink.append($("<br>"));
            $("#results").append(anchorLink);
             
        });
         
           
        
    }

     $(".filterBtn").on("click", function () {
         introDiv.style.display = "intro";
        var what = this.textContent;
        console.log(what, where);
        requestData(what, where);
        if (resultDiv.style.display === "none") {
            resultDiv.style.display = "block";}
    });


})

 