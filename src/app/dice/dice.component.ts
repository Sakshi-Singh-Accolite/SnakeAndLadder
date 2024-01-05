import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {
  @Input() value: number | null | undefined;
}
