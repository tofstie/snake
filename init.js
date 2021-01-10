function startGame(){// Setting varibles, to change gridSize you can change the gridSize varible. Will always start in the middle\
    let gridSize = 16;
    let startX = Math.floor(gridSize / 2);
    let startY = Math.floor(gridSize / 2);
    let velX = 0;
    let velY = 1;
    //gets the grid element to add the template for the gridsize
    let grid = document.getElementById('grid');
    grid.style.gridTemplateAreas = `${'auto'.repeat(gridSize)}`

    //This four loops adds every div for each square, including the classname to show its location
    //x-1 y-1 is the top left corner and x-gridsize y-gridsize is the bottom right corner
    for(y=1;y<gridSize+1;y++){
        for(x=1;x<gridSize+1;x++){
            let newGridElement = document.createElement('div');

            newGridElement.classList.add('x-'+x.toString(10));
            newGridElement.classList.add('y-'+y.toString(10));
            newGridElement.style.gridArea = y.toString(10) + ' / ' + x.toString(10) + ' / span 1 / span 1';
            newGridElement.style.backgroundColor = 'white';
            grid.appendChild(newGridElement);
        }
    }

    //making a node, this is used to have the snake. 
    //The past is currently to make sure that I white out the areas that I leave.
    class Node {
        constructor(value){
            this._value = value;
            this._link = null;
            this._past = [null, null];
        }

        get value() {
            return this._value;
        }

        get nextNode(){
            return this._link;
        }

        get past(){
            return this._past;
        }

        set setLink(nextNode) {
            this._link = nextNode;
        }

        set value(newValue) {
            this._value = newValue;
        }

        set past(pastLocation) {
            this._past = pastLocation;
        }
    }
    //sets the head for starting
    let Head = new Node([startX, startY]);

    //Adding event listeners
    document.addEventListener('keydown', event => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }

        if(event.keyCode === 38){
            velY = -1;
            velX = 0;
        } else if(event.keyCode === 40){
            velY = 1;
            velX = 0;
        } else if(event.keyCode === 39){
            velY = 0;
            velX = 1;
        } else if(event.keyCode === 37){
            velY = 0;
            velX = -1;
        }
    });

    let generatePoint = () => {
        point = [Math.floor(Math.random()*gridSize),Math.floor(Math.random()*gridSize)];
        return point;
    };

    let scorePoint = generatePoint()

    let interval = setInterval(function () {
        let currentPosition = Head.value;
        let currentx = currentPosition[0];
        let currenty = currentPosition[1];

        if(currentx >= 17 || currenty >= 17 || currentx <= 0 || currenty <=0){
            clearInterval(interval);
            return false;
        }

        /*if(currentPosition === scorePoint){
            newNode = new Node(currentPosition);
            newNode.setLink = 
        }*/ //WIP

        let pastPosition = Head.past;
        let pastx = pastPosition[0];
        let pasty = pastPosition[1];
        let head = document.getElementsByClassName('x-'+currentx.toString(10)+' y-'+currenty.toString(10));
       
        head[0].style.backgroundColor = 'black';
        
        if (!(pastx === null || pasty === null)){
            let pasthead = document.getElementsByClassName('x-'+pastx.toString(10)+' y-'+pasty.toString(10));
            pasthead[0].style.backgroundColor = 'white';
        }
        


        

        Head.value = [currentx + velX, currenty + velY];
        Head.past = [currentx, currenty];
        

        
    }, 1000/5);
}
