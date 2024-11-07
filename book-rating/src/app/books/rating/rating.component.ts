import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  value = input.required<number>();

  starsArray = computed(() => new Array(Math.max(this.value(), 0)));

  numToArray(num: number) {
    return new Array(Math.max(num, 0));
  }


}
