import {Component, EventEmitter, Input, Output} from '@angular/core';
import {takeWhile, timer} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css']
})
export class CountdownClockComponent {

  @Input() seconds = 0;
  @Output() timeComplete: EventEmitter<Boolean> = new EventEmitter();

  timeRemaining$ = timer(0, 1000).pipe(
      map(n => (this.seconds - n) * 1000),
      takeWhile(n => {
        if(n===0) {
          this.timeComplete.emit(true);
        }
        return n >= 0;
      }),
  );

}
