var snakeHead = "box0n1n"   // It stores of the Id of the div where the snake's head is placed
var snakeHeadDirection = "right"   // Directions can be left, right, up, down
var snakeTailDirection = "right"
var snakeTail = "box0n0n"  // It stores of the Id of the div where the snake's tail is placed
var snakeLength = 2
var directionChangeSpots = []
var isStart = false // It will store is the game starts or not
var foodLocation = ""
var intervalId = ""


function play()
{   
    document.getElementById("startButtonId").style.display="none";

    intervalId= setInterval(start, 200);
}

function findRowCol(Id) // We can pass the whole id here to get the row and column value
{   
    var arr = []

    // For finding the row
    if(Id.charAt(4) != 'n')
    {
        arr.push(parseInt(Id.substring(3,5)));
    }
    else{
        arr.push(parseInt(Id.charAt(3)));
    }

    // For finding the column
    
    if(Id.charAt(6) != 'n')
    {
        arr.push(parseInt(Id.substring(5,7)));
    }
    else{
        arr.push(parseInt(Id.charAt(5)));
    }

    return arr;

}

function nextTail()
{   
    var newId = ""
    var rowCol = findRowCol(snakeTail)

    if(snakeTailDirection.localeCompare("right") == 0)
    {
        // This is for the row part
        if((""+rowCol[0]).length == 1)
            newId = "box"+rowCol[0]+"n";
        else
            newId = "box"+rowCol[0];
            
        // This is for the column part
        if((""+(rowCol[1]+1)).length == 1)
            newId += (rowCol[1]+1)+"n";
        else
            newId += (rowCol[1]+1);
    }
    else if(snakeTailDirection.localeCompare("left") == 0)
    {
        // This is for the row part
        if((""+rowCol[0]).length == 1)
            newId = "box"+rowCol[0]+"n";
        else
            newId = "box"+rowCol[0];
            
        // This is for the column part
        if((""+(rowCol[1]-1)).length == 1)
            newId += (rowCol[1]-1)+"n";
        else
            newId += (rowCol[1]-1);
    }
    else if(snakeTailDirection.localeCompare("up") == 0)
    {
        // This is for the row part
        if((""+(rowCol[0]-1)).length == 1)
            newId = "box"+(rowCol[0]-1)+"n";
        else
            newId = "box"+(rowCol[0]-1);
            
        // This is for the column part
        if((""+rowCol[1]).length == 1)
            newId += rowCol[1]+"n";
        else
            newId += rowCol[1];
    }
    else if(snakeTailDirection.localeCompare("down") == 0)
    {
         // This is for the row part
         if((""+(rowCol[0]+1)).length == 1)
            newId = "box"+(rowCol[0]+1)+"n";
        else
            newId = "box"+(rowCol[0]+1);
         
        // This is for the column part
        if((""+rowCol[1]).length == 1)
            newId += rowCol[1]+"n";
        else
            newId += rowCol[1];
    }

    return newId
}

function nextHead(Id)
{   
    var newId = ""
    var rowCol = findRowCol(Id)

    if(snakeHeadDirection.localeCompare("right") == 0)
    {   
        // This is for the row part
        if((""+rowCol[0]).length == 1)
            newId = "box"+rowCol[0]+"n";
        else
            newId = "box"+rowCol[0];
            
        // This is for the column part
        if((""+(rowCol[1]+1)).length == 1)
            newId += (rowCol[1]+1)+"n";
        else
            newId += (rowCol[1]+1);
    }
    else if(snakeHeadDirection.localeCompare("left") == 0)
    {
        // This is for the row part
        if((""+rowCol[0]).length == 1)
            newId = "box"+rowCol[0]+"n";
        else
            newId = "box"+rowCol[0];
            
        // This is for the column part
        if((""+(rowCol[1]-1)).length == 1)
            newId += (rowCol[1]-1)+"n";
        else
            newId += (rowCol[1]-1);
    }
    else if(snakeHeadDirection.localeCompare("up") == 0)
    {
        // This is for the row part
        if((""+(rowCol[0]-1)).length == 1)
            newId = "box"+(rowCol[0]-1)+"n";
        else
            newId = "box"+(rowCol[0]-1);
            
        // This is for the column part
        if((""+rowCol[1]).length == 1)
            newId += rowCol[1]+"n";
        else
            newId += rowCol[1];
    }
    else if(snakeHeadDirection.localeCompare("down") == 0)
    {
        // This is for the row part
        if((""+(rowCol[0]+1)).length == 1)
            newId = "box"+(rowCol[0]+1)+"n";
        else
            newId = "box"+(rowCol[0]+1);
            
        // This is for the column part
        if((""+rowCol[1]).length == 1)
            newId += rowCol[1]+"n";
        else
            newId += rowCol[1];
    }

    return newId
}


function foodCreator()
{   
    var headRowCol = findRowCol(snakeHead);
    var tailRowCol = findRowCol(snakeTail);
    var location = "box"

    var row = (Math.floor(Math.random()*16));
    var col = (Math.floor(Math.random()*16));

    
    // for row
    while(((headRowCol[0] > tailRowCol[0]) && (row >= tailRowCol[0] && row <= headRowCol[0])) || ((headRowCol[0] < tailRowCol[0]) && (row <= tailRowCol[0] && row >= headRowCol[0])))
    {
        row = (Math.floor(Math.random()*16));
    }

    if((""+row).length == 1)
    {
        location += row + "n";
    }
    else{
        location += row;
    }


    // for column
    while(((headRowCol[1] > tailRowCol[1]) && (col >= tailRowCol[1] && col <= headRowCol[1])) || ((headRowCol[1] < tailRowCol[1]) && (col <= tailRowCol[1] && col >= headRowCol[1])))
    {
        col = (Math.floor(Math.random()*16));
    }

    if((""+col).length == 1)
    {
        location += col + "n";
    }
    else{
        location += col;
    }


    foodLocation = location;

    document.getElementById(foodLocation).style.backgroundColor="rgb(71, 226, 71)";

}

function start()
{   

    if(isStart == false)
    {
        foodCreator();
        isStart = true;
    }


    // getting the new snake head
    var newSnakeHead = nextHead(snakeHead);


    // checking is the snake going out of the board or not. If it is going out of the board then stop the game
    
    var headRowCol = findRowCol(newSnakeHead);

    if(headRowCol[0] == -1 || headRowCol[0] == 16 || headRowCol[1] == -1 || headRowCol[1] == 16)
    {
        clearInterval(intervalId);
        return
    }



    // checking is the snake eating itself or not. If it is eating it self then stop the game
    
    if(document.getElementById(newSnakeHead).style.backgroundColor.localeCompare("rgba(0, 0, 59, 0.95)") == 0)
    {
        clearInterval(intervalId);
        return
    }

    

    // for the head
    document.getElementById(newSnakeHead).style.backgroundColor="rgba(0, 0, 59, 0.95)";

    if(snakeHeadDirection.localeCompare("right") == 0)
    {
        document.getElementById(newSnakeHead).style.borderTopRightRadius="20px";
        document.getElementById(newSnakeHead).style.borderBottomRightRadius="20px";
    }
    else if(snakeHeadDirection.localeCompare("left") == 0)
    {
        document.getElementById(newSnakeHead).style.borderTopLeftRadius="20px";
        document.getElementById(newSnakeHead).style.borderBottomLeftRadius="20px";
    }
    else if(snakeHeadDirection.localeCompare("up") == 0)
    {
        document.getElementById(newSnakeHead).style.borderTopLeftRadius="20px";
        document.getElementById(newSnakeHead).style.borderTopRightRadius="20px";
    }
    else if(snakeHeadDirection.localeCompare("down") == 0)
    {
        document.getElementById(newSnakeHead).style.borderBottomLeftRadius="20px";
        document.getElementById(newSnakeHead).style.borderBottomRightRadius="20px";
    }


    // for the tail
    document.getElementById(snakeTail).style.backgroundColor="beige";


    // for the previous head
    document.getElementById(snakeHead).style.borderTopRightRadius="0px";
    document.getElementById(snakeHead).style.borderBottomRightRadius="0px";
    document.getElementById(snakeHead).style.borderTopLeftRadius="0px";
    document.getElementById(snakeHead).style.borderBottomLeftRadius="0px";

    snakeHead = newSnakeHead;
    snakeTail = nextTail();

    
    // eating the food by the snake
    if(foodLocation.localeCompare(snakeHead) == 0)
    {   
        snakeLength++;

        document.getElementById(foodLocation).style.backgroundColor="rgba(0, 0, 59, 0.95)";

        var newHead = nextHead(snakeHead);

        console.log(newHead)
        // for the head
        document.getElementById(newHead).style.backgroundColor="rgba(0, 0, 59, 0.95)";
        

        if(snakeHeadDirection.localeCompare("right") == 0)
        {
            document.getElementById(newHead).style.borderTopRightRadius="20px";
            document.getElementById(newHead).style.borderBottomRightRadius="20px";
        }   
        else if(snakeHeadDirection.localeCompare("left") == 0)
        {
            document.getElementById(newHead).style.borderTopLeftRadius="20px";
            document.getElementById(newHead).style.borderBottomLeftRadius="20px";
        }
        else if(snakeHeadDirection.localeCompare("up") == 0)
        {
            document.getElementById(newHead).style.borderTopLeftRadius="20px";
            document.getElementById(newHead).style.borderTopRightRadius="20px";
        }
        else if(snakeHeadDirection.localeCompare("down") == 0)
        {
            document.getElementById(newHead).style.borderBottomLeftRadius="20px";
            document.getElementById(newHead).style.borderBottomRightRadius="20px";
        }

        // for the previous head
        document.getElementById(snakeHead).style.borderTopRightRadius="0px";
        document.getElementById(snakeHead).style.borderBottomRightRadius="0px";
        document.getElementById(snakeHead).style.borderTopLeftRadius="0px";
        document.getElementById(snakeHead).style.borderBottomLeftRadius="0px";

        foodLocation = ""
        snakeHead = newHead;

        foodCreator(); // creating another food
    }

    // This is for the direction changes spots of the snake
    if(directionChangeSpots.length != 0)
    {   

        if(directionChangeSpots[0].localeCompare(snakeTail) == 0)
        {
            snakeTailDirection = directionChangeSpots[1];

            directionChangeSpots.shift();
            directionChangeSpots.shift();
        }

    }

}

// This is when an event will appear like arrow key press
document.onkeydown = checkKey;

function checkKey(e){
    e = e || window.event;

    if(e.keyCode == '38')   // for up arrow
    {
        snakeHeadDirection = "up";
        directionChangeSpots.push(snakeHead);
        directionChangeSpots.push("up");
    }
    else if(e.keyCode == '40')  // for down arrow
    {
        snakeHeadDirection = "down";
        directionChangeSpots.push(snakeHead);
        directionChangeSpots.push("down");
    }
    else if(e.keyCode == '37')  // for left arrow
    {
        snakeHeadDirection = "left";
        directionChangeSpots.push(snakeHead);
        directionChangeSpots.push("left");
    }
    else if(e.keyCode == '39')  // for right arrow
    {
        snakeHeadDirection = "right";
        directionChangeSpots.push(snakeHead);
        directionChangeSpots.push("right");
    }
}