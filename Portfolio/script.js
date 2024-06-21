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


navigator.getBattery().then(battery=>
{
    // alert("Battery Level: "+Math.floor(battery.level*100)+"%");
    setInterval(() => {        
        document.querySelector("#batteryArea p").textContent=Math.floor(battery.level*100)+"%";
        if(battery.charging)
        document.querySelector("#batteryArea img").style.display="block";
        else
        document.querySelector("#batteryArea img").style.display="none";
    }, 1000);
});



const images = document.querySelectorAll('.TechStacks div');
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

const mode = document.querySelector("#mode");
console.log(mode);
function modechanger()
{
    root= getComputedStyle(document.querySelector(':root'));
    if(root.getPropertyValue('--text-color')=="#fff")//light mode is on
    {
        document.querySelector("#modeChangerimg").src="/Images/dark.png";
        document.documentElement.style.setProperty('--text-color', '#000');
        document.documentElement.style.setProperty('--text-color2', '#fff');
        const patterns = document.querySelectorAll('.pattern');
        patterns.forEach(pattern => {
            pattern.style.backgroundImage = 'none';
        });
        const invert = document.querySelectorAll('.invertme');
        invert.forEach(pattern => {
            pattern.style.filter = 'none';
        });
        document.querySelector("#river").src="none";
    }
    else //dark mode is on
    {
        document.querySelector("#modeChangerimg").src="/Images/light.png";
        document.documentElement.style.setProperty('--text-color', '#fff');
        document.documentElement.style.setProperty('--text-color2', 'rgb(39 39 42)');
        const patterns = document.querySelectorAll('.pattern');
        patterns.forEach(pattern => {
            pattern.style.backgroundImage = "url('/pattern.png')";
        });
        const invert = document.querySelectorAll('.invertme');
        invert.forEach(pattern => {
            pattern.style.filter = 'invert(1)';
        });
        document.querySelector("#river").src="Videos/river.mp4";
    }
}

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

function cursorDesigning()
{
    var cursor = document.querySelector(".ExtraCursor");
    var area = document.querySelector("#Home");

    area.addEventListener("mousemove", function(details) 
    {
        cursor.style.opacity= 0.95;
        var rect = area.getBoundingClientRect(); // Get the dimensions and position of the area
        var offsetX = rect.top; // Calculate the distance between the top of the area and the document top
        var xpos = details.clientX + 20; // Horizontal offset
        var ypos = details.clientY - offsetX; // Vertical offset
        cursor.style.transform = "translate(" + xpos + "px, " + ypos + "px)";
    });
    area.addEventListener("mouseleave", function(details) 
    {
    cursor.style.opacity=0;
    });
}
cursorDesigning();
