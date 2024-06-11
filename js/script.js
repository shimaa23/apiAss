
var ForecastDet=[];
var forecastdays=[];
var weatherCondition;
var rain;
var wind;
var dir;
var cityTarget;
var find=document.getElementById("find");
var target2=document.getElementById("target2");
var body=document.getElementById("my-data");


getForecast()

async function getForecast(city){


    var res=await fetch(`https://api.weatherapi.com/v1/forecast.json?q=london&days=3&key=1b701ab5603a4b56ab6201059240806&q=${city}`)
    ForecastDet=await res.json();
    cityTarget=ForecastDet.location.name;
    forecastdays=ForecastDet.forecast.forecastday;
    weatherCondition=ForecastDet.current.condition.text;
    wind=ForecastDet.current.wind_kph;
    dir=ForecastDet.current.wind_dir;
    rain=ForecastDet.current.precip_mm;
    console.log(ForecastDet);

    displayForecast();
   
 
}

function displayForecast(){
      var cartoona=``;
   

    for(var i=0 ; i<forecastdays.length;i++){
        var date=new Date(forecastdays[i].date);
        var day=date.toLocaleString('en-US',{weekday:"long"});
        var month=date.toLocaleString('en-US',{month:"long"});
        var dateOfdaye=date.getDate();
        var tempC=forecastdays[i].day.avgtemp_c;
        var tempF=forecastdays[i].day.avgtemp_f;
    

        if(i== 0){
            cartoona+=`
            <div class="col-md-4">
                  <div class="today forecast">
                    <div class="header d-flex justify-content-between align-items-center px-3">
                           <div class="day">${day}</div>
                           <div class="date">${dateOfdaye} ${month}</div>
                    </div>
                    <div class="content">
                          <div class="location fs-2">${cityTarget}</div>
                          <div class="degree">
                             <div class="ratio-bas">${tempC}C</div>
                             <div class="icon"><img src="images/113.png" alt="" width="90" height="90"></div>
                          </div>
                          <div class="weather-condition text-info fs-5">
                                      ${weatherCondition}
                          </div>
                    </div>
                    <div class="footer d-flex  align-items-center">
                      <span class="me-3"> <img src="images/icon-umberella@2x.png" alt="" width="21" height="21" class="me-2">${rain}%</span>
                      <span class="me-3"> <img src="images/icon-wind@2x.png" alt=""  width="21" height="21" class="me-2">${wind}km/h</span>
                      <span class="me-3"> <img src="images/icon-compass@2x.png" alt=""  width="21" height="21" class="me-2">${dir}</span>
                    </div>

                  </div>

                </div>
      
      
      
      `

        }else{
            cartoona+=`<div class="col-md-4">
                    <div class="today forecast2 text-center">
                      <div class="header2">
                             <div class="day">${day}</div>
                             
                      </div>
                      <div class="content mt-5">
                           
                            <div class="degree">
                              <div class="icon"><img src="images/113.png" alt=""  width="48" height="48"></div>
                               <div class="ratio">${tempC}oC</div>
                               <p>${tempF}</p>
                              
                            </div>
                            <div class="weather-condition text-info">
                              Sunny
                            </div>
                      </div>
                   

                    </div>

                  </div>`

        }
        
        


        
    }
    body.innerHTML=cartoona;
    


}


target2.addEventListener("change",function(e){
    cityTarget=e.target.value;
    console.log(cityTarget);
}) 

find.addEventListener("click",function(){
    getForecast(cityTarget)
})


