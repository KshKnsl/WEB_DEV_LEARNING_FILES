
var rows = 3;
var columns = 4;

var currTile;
var otherTile;
var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3", "11", "10", "12"];

window.onload = reload();
function reload() 
{
    for (let r=0; r < rows; r++) 
    {
        for (let c=0; c < columns; c++) 
        {
            //<img id="0-0" src="1.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "PuzzlePieces/" +imgOrder.shift() + ".png";
            tile.classList.add("Piece");

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles
            document.getElementById("piece-container").append(tile);
        }
    }
}
function dragStart() 
{
    currTile = this; //this refers to the img tile being dragged
}
function dragOver(e) 
{
     e.preventDefault();
}
function dragDrop() {
     otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() 
{
    if (!otherTile.src.includes("PuzzlePieces/4.png"))
    {
    //    return;
    }
    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);
    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    //check if moving left, right, up, down is allowed or not
    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;
    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    //if(isAdjacent) 
    {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        turns++;
    }
    checkWinner();
}
function checkWinner()
{
    let count=1,win=true;
    for (let r=0; r < rows; r++) 
    {
        for (let c=0; c < columns; c++) 
        {
            let id = r.toString() + "-" + c.toString();
            let src = "PuzzlePieces/" +count + ".png";
            console.log(src);
            let tile= document.getElementById(id);
            console.log(tile.src);
            if(!tile.src.includes(src)) win=false;
            count++;
        }   
    }
    if(win)
    {
        winner_screen();
        setTimeout(() => {  location.reload(); }, 8000);
    }
    else if(turns==20)
    {
        losser_screen();
        setTimeout(() => {  location.reload(); }, 8000);
    }
}
function winner_screen()
{
    let div = document.getElementById("run_on_victory");
    div.classList.add("winner");
    div.innerHTML = '<img id="Ben" src="Assets/Victory.gif"><p id="Winner-text">Winner</p>';       
}
function losser_screen()
{
    let div = document.getElementById("run_on_victory");
    div.classList.add("winner");
    div.innerHTML = '<img id="Ben" src="Assets/Lose.gif"><p id="Winner-text">Losser</p>';       
}