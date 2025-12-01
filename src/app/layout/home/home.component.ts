import { Component } from '@angular/core';
import { Eventy } from '../../models/eventy';
import { EventsService } from '../../shared/data/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
list:Eventy[];
constructor(private service:EventsService){}
ngOnInit(): void {
this.service.getAllEvents().subscribe(
  (events:Eventy[])=>{
  this.list=events;
  }
);

}
}