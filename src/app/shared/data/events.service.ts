import { Injectable } from '@angular/core';
import {Eventy} from '../../models/eventy';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  urlBackend = 'http://localhost:3000/events/';
  apiUrl = 'http://localhost:3000'; // Define the apiUrl property
  constructor(private http: HttpClient) { }
  public getAllEvents(){
       return this.http.get<Eventy[]>(this.urlBackend)
  }
  // Removed duplicate implementation of getEventById
  addEvent(event:Eventy){
    return this.http.post<Eventy>(this.urlBackend, event)
  }
  deleteEvent(id:number){
    return this.http.delete<Eventy>(this.urlBackend+id)
  }
  updateEvent(id:number, event:Eventy){
    return this.http.put<Eventy>(this.urlBackend+id, event)
  }
// Removed duplicate implementation of getAllEvents

  // ID EST UNE STRING ! PAS DE +id !!!
  getEventById(id: string): Observable<Eventy> {
    return this.http.get<Eventy>(`${this.apiUrl}/events/${id}`);
  }

  searchByLocation(location: string): Observable<Eventy[]> {
    return this.http.get<Eventy[]>(`${this.apiUrl}/events?location=${location}`);
  }


}
