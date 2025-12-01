import { Component } from '@angular/core';
import { Eventy } from '../../models/eventy';
import { EventsService } from '../../shared/data/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  list: Eventy[] = [];           // initialize as empty array
  top3Events: Eventy[] = [];     // ← new: only the 3 most liked

  constructor(private service: EventsService) {}

  ngOnInit(): void {
    this.service.getAllEvents().subscribe(
      (events: Eventy[]) => {
        this.list = events;  // keep full list if needed elsewhere

        // Sort by nbrLike (descending) and take top 3
        this.top3Events = events
          .sort((a, b) => b.nbrLike - a.nbrLike)  // highest likes first
          .slice(0, 3);                           // only first 3
      }
    );
  }
}