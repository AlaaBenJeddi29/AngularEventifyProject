// detail-event.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../shared/data/events.service';
import { Eventy } from '../../../models/eventy';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit {

  currentEvent?: Eventy;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('ID manquant dans l\'URL');
      this.isLoading = false;
      return;
    }

    // ID EST UNE CHAÎNE – ON NE FAIT SURTOUT PAS +id !!!
    this.eventsService.getEventById(id).subscribe({
      next: (event) => {
        this.currentEvent = event;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Événement non trouvé avec l\'ID:', id);
        this.isLoading = false;
        // Tu peux laisser currentEvent undefined → ton template gère le cas
      }
    });
  }
}