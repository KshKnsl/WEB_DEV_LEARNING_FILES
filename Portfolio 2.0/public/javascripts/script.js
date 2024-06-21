var adInterval = setInterval(function() 
{
    var allLinks = document.getElementsByTagName('a');
    for (var i = 0; i < allLinks.length; i++) 
        {
        var href = allLinks[i].getAttribute('href');
        if (href && href.startsWith('https://elfsight.com/visitor-counter-widget/?utm_source=websites&utm_medium=clients&utm_content=visitor-counter')) 
        {
            allLinks[i].style.display = 'none';
        }
    }
}, 100);

// Clear the interval after 10 seconds
setTimeout(function() {
    clearInterval(adInterval);
}, 10000); // 10 seconds in milliseconds

const currentTime = new Date();
const currentHour = currentTime.getHours();
let greeting;
if (currentHour < 12) 
    greeting = "Good morning";
else if (currentHour < 18)
    greeting = "Good afternoon";
else 
    greeting = "Good evening";

    const textToSpeak = `${greeting} Welcome to my digital domain, where innovation meets execution and code meets creativity.`;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(textToSpeak));

    function hideLoadingPage() 
    {
        var i = 0;
        var loadString = ["Compiling...", "Interpreting...", "Running...", "Completed..."];
        var elementString = document.querySelector("#loading-items");
        var intervalId = setInterval(() => {
            elementString.innerHTML = loadString[i++];
            console.log(i);
            if (i === 4)
                clearInterval(intervalId);
        }, 100);
        setTimeout(() => {
            document.querySelector("#loading").style.display = "none";
        }, 700);
    }
    hideLoadingPage();
    Notification.requestPermission().then(permission=>{
        new Notification(`${greeting} Welcome to my digital domain, where innovation meets execution and code meets creativity.`);
    });

function heroAreaDesigning()
{
    var textArr = ["Student @JIIT-27' 🎓 "," Java Programmer ♨️ ", " Front End Developer 🌱 "," 2⭐@LeetCode ", " Aspiring Open Source Contributor 💻 ", "Explorer🚀"];
    var colorArr = ["#0A6AD6","#FFAF45", "#A34343","#FF204E", "#19A95B", "#2C2C2C"];
    var cursorBlock = document.querySelector(".ExtraCursor");
    var area = document.querySelector("#Home");
    setInterval(() => {
        var random = Math.floor(Math.random() * textArr.length) ;
        cursorBlock.innerHTML= textArr[random];
        cursorBlock.style.backgroundColor= colorArr[random];
    }, 3000);
    area.addEventListener("click", ()=>{
        var random = Math.floor(Math.random() * textArr.length) ;
        cursorBlock.textContent= textArr[random];
        cursorBlock.style.backgroundColor= colorArr[random];
    });
}
heroAreaDesigning();

const images = document.querySelectorAll('.TechStacks img');
const overlay = document.getElementById('overlayer');
images.forEach(image => 
{
    image.addEventListener('mouseenter', () => {
        overlay.style.display = 'block';
        console.log("Here");
        image.style.zIndex="10";
    });
    
    image.addEventListener('mouseleave', () => {
        setTimeout(() => {
            overlay.style.display = 'none';    
            image.style.zIndex="8";
        }, 50);
    });
});

navigator.getBattery().then(battery=>
{
    setInterval(() => {        
        document.querySelector(".batteryArea p").textContent=Math.floor(battery.level*100)+"%";
        if(battery.charging)
        document.querySelector(".batteryArea img").style.display="block";
        else
        document.querySelector(".batteryArea img").style.display="none";
    }, 1000);
});