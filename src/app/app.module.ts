import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Routes,RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { DiceComponent } from './dice/dice.component';

import { BoardComponent } from './board/board.component';
import { PlayerComponent } from './player/player.component';
const routes:Routes=[{
  path:'',
  
},
]
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DiceComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }