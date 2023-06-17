const wrapper =document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = wrapper.querySelector(".weather-part img"),
arrowBtn = wrapper.querySelector("header img");

let api;
var result;

inputField.addEventListener("keyup",e =>{
    //if user pressed btn and input value not zero
    if(e.key == "Enter" && inputField.value != ""){
        reqeustApi(inputField.value);
        //console.log(inputField.value);     
    }else if(e.key == "Enter" && inputField.value == ""){
        infoTxt.innerText ="please enter city name";
        infoTxt.classList.add("error")
    }

});

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("Your browser doesn't support or allow geolocation");
    }
})

function onSuccess(position){
    const {latitude,longitude}=position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid={apikey}`
    fetchData();
}
function onError(error){
    infoTxt.innerText= error.message;
    infoTxt.classList.add("error");
    window.alert("Location access Denied")
}

function reqeustApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={apikey}`;
   fetchData();
}

async function fetchData(){
    infoTxt.innerText ="Getting weather details..";
    infoTxt.classList.add("pending");
    await fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

 function weatherDetails(info){
    console.log("aaa",info);
    if(info.cod == "404"){
        infoTxt.innerText=info.message; 
        infoTxt.classList.replace("pending","error");
    }
    else{
        //get required values from api
        const city= info.name;
        console.log("city=",city);
        const country= info.sys.country;
        console.log("country=",country);
        const {description, id} = info.weather[0];
        console.log(description, id);
        const {feels_like, humidity, temp} = info.main;

        //changing images
        if(id==800){
            wIcon.src="clear.svg";
        }else if(id>800){
            wIcon.src="cloud.svg";
        }else if(id>=701 && id <=781){
            wIcon.src="haze.svg";
        }else if(id>=500 && id <=531){
            wIcon.src="rain.svg";
        }else if(id>=600 && id <=622){
            wIcon.src="snow.svg";
        }else if((id>=200 && id <=232) || (id>=300 && id<=321)){
            wIcon.src="storm.svg";
        }

        //passing values to particular Html
        wrapper.querySelector(".temp .numb").innerText= Math.floor(temp);
        wrapper.querySelector(".weather").innerText= description;
        wrapper.querySelector(".location span").innerText= `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText= Math.floor(feels_like);
        wrapper.querySelector(".Humidity .details .numb-3").innerText= `${humidity}%`;

        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active");
       
    }
}

arrowBtn.addEventListener("click",()=>{
    wrapper.classList.remove("active");
});







// function myfun(){
//     if(inputField.value!= ""){
//     url=`https://openweathermap.org/find?utf8=%E2%9C%93&q=${inputField.value}`;
//     location.replace(url);
//     }
// }