const grid = document.querySelector('.grid');


function createSquareGrid (gridLength) {

    for(let blockNum = 0; blockNum < 9; blockNum++) {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('block');

        let blockLength = gridLength / 3;

        blockDiv.setAttribute("style", "width: " + blockLength + "px; height: " + blockLength + 
                                    "px; display: flex; flex-wrap: wrap; outline: 3px solid black;");

        for(let cellNum = 0; cellNum < 9; cellNum++) {
            const cellDiv = document.createElement('input');

            cellDiv.classList.add('cell');
            cellDiv.id = currCellID;
            currCellID = (Number(currCellID) + 1).toString();

            let cellLength = blockLength / 3;

            cellDiv.setAttribute("style", "width: " + cellLength + "px; height: " + cellLength +
                                        "px; outline: 1px solid gray; font-size: 40px; text-align: center;" +
                                        "color: blue;");

            cellDiv.setAttribute("maxlength", "1");
            blockDiv.appendChild(cellDiv);
        }

        grid.appendChild(blockDiv);
    }

    //Call a function that sets up the pre-filled cells
    prefillGrid();
}


//used to get a random block or cell within a block
function rollRandom () {
    return Math.floor(Math.random() * (9));
}


//From sudoku.com easy puzzles, 35 of 81 cells are pre-filled
function prefillGrid () {
    let lackingConditions;
    let cellID;
    let cellSet = new Set(); //to not pre-fill the same cell multiple times
    let alreadyPrefilled;
    let cell;
    let num;
    let block;

    for (let i = 0; i < 35; i++) {
        lackingConditions = true;
        alreadyPrefilled = true;
        do {
            do {
                cell = rollRandom();
                num = (rollRandom() + 1).toString(); // "1"-"9"
                block = rollRandom();

                if(i <= 8){ //ensure all blocks have at least 1 pre-filled cell (7 max)
                    cellID = ((9 * i) + cell).toString();
                } else {
                    cellID = ((9 * block) + cell).toString();
                }

                if (cellSet.has(cellID)) {
                    alreadyPrefilled = true;
                } else {
                    alreadyPrefilled = false;
                }
            } while(alreadyPrefilled);

            const affectedCell = document.getElementById(cellID);
            affectedCell.setAttribute("value", num);
            affectedCell.style.color = 'black';
            affectedCell.readOnly = true;

            if (checkRow(cellID, num) && checkCol(cellID, num) && checkBlock(cellID, num)) {
                lackingConditions = false;
                cellSet.add(cellID);
            } else { //turn back into normal input cell
                affectedCell.setAttribute("value", "");
                affectedCell.style.color = 'blue';
                affectedCell.readOnly = false;
            }
            
        } while(lackingConditions);
        
    }

}


function findArray (cellID, config) {
    for (let subArray = 0; subArray < config.length; subArray++) {

        for (let i = 0; i < config[subArray].length; i++) {
            if (config[subArray][i] === cellID) {
                return config[subArray];
            }
        }       
    }
}


function checkArray (cellID, arr, num) {
    for (let i = 0; i < arr.length; i++) {

        if(arr[i] != cellID) {
            const neighborCell = document.getElementById(arr[i]);
            if (neighborCell.value === num) {
                return false;
            }
        }
    }
    return true;
}


//Check no duplicate numbers in block
function checkBlock (cellID, num) {
    let arr = findArray(cellID, blockIDs);
    return checkArray(cellID, arr, num)
}


//Check no duplicate numbers in row
function checkRow (cellID, num) {
    let arr = findArray(cellID, rowIDs);
    return checkArray(cellID, arr, num);
}


//Check no duplicate numbers in col
function checkCol (cellID, num) {
    let arr = findArray(cellID, colIDs);
    return checkArray(cellID, arr, num)
}

//when click new game/grid reset currCellID to "1" before calling createSquareGrid()
let currCellID = "0";

let rowIDs = [["0","1","2","9","10","11","18","19","20"],
             ["3","4","5","12","13","14","21","22","23"],
             ["6","7","8","15","16","17","24","25","26"],
             ["27","28","29","36","37","38","45","46","47"],
             ["30","31","32","39","40","41","48","49","50"],
             ["33","34","35","42","43","44","51","52","53"],
             ["54","55","56","63","64","65","72","73","74"],
             ["57","58","59","66","67","68","75","76","77"],
             ["60","61","62","69","70","71","78","79","80"],]
        
let colIDs =[["0","3","6","27","30","33","54","57","60"],
             ["1","4","7","28","31","34","55","58","61"],
             ["2","5","8","29","32","35","56","59","62"],
             ["9","12","15","36","39","42","63","66","69"],
             ["10","13","16","37","40","43","64","67","70"],
             ["11","14","17","38","41","44","65","68","71"],
             ["18","21","24","45","48","51","72","75","78"],
             ["19","22","25","46","49","52","73","76","79"],
             ["20","23","26","47","50","53","74","77","80"],]

let blockIDs = [["0","1","2","3","4","5","6","7","8"],
             ["9","10","11","12","13","14","15","16","17"],
             ["18","19","20","21","22","23","24","25","26"],
             ["27","28","29","30","31","32","33","34","35"],
             ["36","37","38","39","40","41","42","43","44"],
             ["45","46","47","48","49","50","51","52","53"],
             ["54","55","56","57","58","59","60","61","62"],
             ["63","64","65","66","67","68","69","70","71"],
             ["72","73","74","75","76","77","78","79","80"],]

createSquareGrid(grid.offsetWidth);