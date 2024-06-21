document.addEventListener("DOMContentLoaded", (event) => {
    let currentPage = 1;
    gsap.registerPlugin(ScrollToPlugin);

    const scrollToPage = (page) => {
        const pageIds = ["#First", "#Second", "#Third", "#Fourth"];
        gsap.to(window, { duration: 0.1, scrollTo: { y: pageIds[page - 1], offsetY: 0 } });
        currentPage = page;
    };

    document.getElementById("scrollButton").addEventListener("click", () => {
            scrollToPage(2);
            setTimeout(() => isScrolling = false, 1000); // Reset flag after scroll
    });

});

function cursorDesigning() 
{
    var cursor = document.querySelector(".ExtraCursor");
    var area = document.querySelector("#Home");
    var area2 = document.querySelector("#About");
    var buttonArea = document.querySelector("#boxArea");
    
    area.addEventListener("mousemove", function(details) {
        var rect = area.getBoundingClientRect();
        var offsetX = rect.top;
        var xpos = details.clientX;
        var ypos = details.clientY - offsetX - 15;

        // Check if the mouse is over the buttonArea
        var buttonRect = buttonArea.getBoundingClientRect();
        if (details.clientX >= buttonRect.left && details.clientX <= buttonRect.right && details.clientY >= buttonRect.top && details.clientY <= buttonRect.bottom) 
            gsap.to(cursor, { opacity: 0, duration: 0.2 });
        else 
        {
            gsap.to(cursor, { 
                opacity: 1, 
                x: xpos, 
                y: ypos, 
                duration: 0.1, 
                ease: "power2.out"
            });
        }
    });

    area2.addEventListener("mousemove", function(details) 
    {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
    });
}

cursorDesigning();