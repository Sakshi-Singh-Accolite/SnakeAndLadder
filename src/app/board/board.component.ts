import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit{

  players:any[]=[];
  currentPlayerIndex=0;
  diceValue:number | null=null;
  // board:number[]= Array.from({length:100},(_,i)=>i+1);

  board:number[]=[];
  constructor(){
    let startValue=0;
    let row=1;
    for (let i = 0; i < 100; i++) {
      if (i <= 9) {
        this.board[i] = i + 1;
      } else {
        if (i % 10 == 0) {
          startValue = row % 2 == 1 ? 10 * (row + 1) : 10 * row + 1;
          row++;
        }
        if (row % 2 == 1) {
          this.board[i] = startValue++;
        } else {
          this.board[i] = startValue--;
        }
      }
    }
  }

  snakePositions:{start:number, end:number}[]=[
    {start:16, end:6},
    {start:45, end:20},
    {start:80, end:4},
    {start:66, end:33}
  ];
  ladderPositions:{start:number,end:number}[]=[
    {start:82, end:98},
    {start:26, end:56},
    {start:11, end:25},
    {start:1, end:16},
    {start:5, end:86}
  ];
  ngOnInit(){
    this.initializePlayers(2); //default 1
  }

  initializePlayers(numPlayers: number){
    this.players=Array.from({length:numPlayers},(_,i)=>({ name:`Player ${i+1}`,position:1}));

  }
  currentPlayer= this.players[this.currentPlayerIndex];

  rollDice(){
    if(this.diceValue !==null){
      return;
    }
    this.diceValue=Math.floor(Math.random()*6)+1;
    this.currentPlayer =this.players[this.currentPlayerIndex];
    const newPosition = this.currentPlayer.position + this.diceValue;

    if(newPosition <= this.board.length){
      this.currentPlayer.position = newPosition;
      this.checkForSnake(this.currentPlayer);
      this.checkForLadder(this.currentPlayer);
    }

    if(this.currentPlayer.position === this.board.length){
      alert(`${this.currentPlayer.name} won!`);
    }else{
      this.currentPlayerIndex = (this.currentPlayerIndex +1)% this.players.length;
      this.diceValue = null;
    }

   
    // currentPlayer.position +=this.diceValue;
    // this.checkForSnake(currentPlayer);
    // this.checkForLadder(currentPlayer);
    // this.currentPlayerIndex=(this.currentPlayerIndex+1) % this.players.length;

  }

  showDice(): boolean{
    return this.diceValue != null && !!this.currentPlayer;
  }

  checkForSnake(player:any){
    const snake=this.snakePositions.find(pos=> pos.start === player.position);
    if(snake){
      player.position = snake.end;
    }
  }

  checkForLadder(player:any){
    const ladder=this.ladderPositions.find(pos=> pos.start === player.position);
    if(ladder){
      player.position = ladder.end;
    }
  }

  isPlayerOnCell(cellNumber : number):boolean{
    return this.players.some(player=> player.position === cellNumber);
  }

  isSnake(cellNumber : number):boolean{
    return this.snakePositions.some(snake=> snake.start === cellNumber);
  }

  isLadder(cellNumber : number): boolean{
    return this.ladderPositions.some(ladder=> ladder.start === cellNumber)
  }
  
  
}
