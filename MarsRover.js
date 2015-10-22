var currentCommands = [];
var currentCommandsIndex = 0;
var timerID;
function bindEvents(){
	var btn1 = document.getElementsByName("btn_Go")[0];
	btn1.addEventListener("click", sayHello, false);
}

function sayHello(){
	var tbl = document.getElementsByName('tbl');
	tbl = tbl[0].children[0];
	var matrix = getMatrix(tbl);
	matrix.refreshCurrentStatus();
	
	var txt_Instruction = document.getElementsByName('txt_Instruction')[0];
	currentCommands = txt_Instruction.value.split("");
	currentCommandsIndex = 0;
	
	timerID = setInterval(function(){
		AnimationMove(matrix);
	}, 300);
}

// IntervalLoop function
function AnimationMove(matrix){
	if(currentCommandsIndex <= currentCommands.length - 1){
		if(currentCommands[currentCommandsIndex].toLowerCase() == "l"){
			matrix.moveLeft();
		}else if(currentCommands[currentCommandsIndex].toLowerCase() == "r"){
			matrix.moveRight();
		}else if(currentCommands[currentCommandsIndex].toLowerCase() == "u"){
			matrix.moveUp();
		}else if(currentCommands[currentCommandsIndex].toLowerCase() == "d"){
			matrix.moveDown();
		}else {
			console.log("Invalid command:" + currentCommands[currentCommandsIndex]);
		}
		currentCommandsIndex++;
	}else{
		clearInterval(timerID);
		return;
	}
}

// Get current location
function getMatrix(tbl){
	var matrix = { 
		currentTbl: tbl,
		totalRows: tbl.children.length,
		totalColumns: tbl.children[0].cells.length,
		currentRow: 0,
		currentColumn: 0,
		refreshCurrentStatus: function(){
			for(var trIndex = 0; trIndex < this.currentTbl.children.length; trIndex++){
				for(var tdIndex = 0; tdIndex < this.currentTbl.children[trIndex].children.length; tdIndex++){
					if(this.currentTbl.children[trIndex].cells[tdIndex].className == "active"){
						this.currentRow = trIndex;
						this.currentColumn = tdIndex;
					}
				}
			}
		},
		setActive: function(){
			for(var trIndex = 0; trIndex < this.currentTbl.children.length; trIndex++){
				for(var tdIndex = 0; tdIndex < this.currentTbl.children[trIndex].children.length; tdIndex++){
					var cell = this.currentTbl.children[trIndex].cells[tdIndex];
					if(trIndex == this.currentRow && tdIndex == this.currentColumn){
						cell.setAttribute("class", "active");
					}else{
						cell.setAttribute("class", "");
					}
				}
			}
		},
		moveRight: function(){
			if(this.currentColumn >= this.totalColumns - 1){
				console.log("Warning:" + this.getCurrentLocationStr() + " is on the edge now, can not move right.");
			}else{
				this.currentColumn++;
				this.setActive();
			}
		},
		moveLeft: function(){
			if(this.currentColumn <= 0){
				console.log("Warning:" + this.getCurrentLocationStr() + " is on the edge now, can not move left.");
			}else{
				this.currentColumn--;
				this.setActive();
			}
		},
		moveUp: function(){
			if(this.currentRow <= 0){
				console.log("Warning:" + this.getCurrentLocationStr() + " is on the edge now, can not move up.");
			}else{
				this.currentRow--;
				this.setActive();
			}
		},
		moveDown: function(){
			if(this.currentRow >= this.totalRows - 1){
				console.log("Warning:" + this.getCurrentLocationStr() + " is on the edge now, can not move down.");
			}else{
				this.currentRow++;
				this.setActive();
			}
		},
		
		getCurrentLocationStr(){
			return this.currentRow + "," + this.currentColumn;
		}
	};
	return matrix;
}