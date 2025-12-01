import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Eventy} from '../../models/eventy';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {EventsService} from '../../shared/data/events.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ CommonModule,RouterModule],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css'
})
export class CardEventComponent {
constructor(private eventService: EventsService) {
  }
  searchValue: string;
  @Input() e:Eventy;
  @Output() notificationLike:EventEmitter<Eventy>
    = new EventEmitter();
  nbrPlaceDecr(e:Eventy){
    e.nbPlaces --
    this.eventService.updateEvent(Number(e.id), e).subscribe()
  }
  //Marwa
  nbrLike(e:Eventy){
    e.nbrLike ++
    this.eventService.updateEvent(Number(e.id), e).subscribe()
  }
}
