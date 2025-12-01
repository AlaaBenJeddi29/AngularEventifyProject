import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../../shared/data/feedback.service';
import { EventsService } from '../../../shared/data/events.service';
import { Feedback } from '../../../models/feedback';
import { Eventy } from '../../../models/eventy';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  eventId: string = '';
  currentEvent: Eventy | null = null;
  similarEvents: Eventy[] = [];
  feedbacks: Feedback[] = [];

  currentUserId = 1;

  // Form
  isEditing = false;
  editingId: string | null = null;
  currentRate = 0;
  currentContent = '';

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private eventsService: EventsService
  ) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');

    if (!id) {
      console.error('No event ID in URL');
      return;
    }

    this.eventId = id; // ← string, pas de Number(), pas de +id

    // CHARGE L'ÉVÉNEMENT → PAS DE CONVERSION !!!
    this.eventsService.getEventById(this.eventId).subscribe({
      next: (event) => {
        this.currentEvent = event;

        this.eventsService.searchByLocation(event.location).subscribe(events => {
          this.similarEvents = events
            .filter(e => e.id !== this.eventId)
            .slice(0, 6);
        });
      },
      error: (err) => {
        console.error('Event not found:', this.eventId);
        this.currentEvent = null;
      }
    });

    this.loadFeedbacks();
  });
}

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((all: Feedback[]) => {
      this.feedbacks = all.filter(f => f.id_event === this.eventId); // now both strings
    });
  }

  setRate(rate: number) {
    this.currentRate = rate;
  }

  onSubmit() {
    if (this.currentRate === 0 || !this.currentContent.trim()) return;

    const payload: Feedback = {
      id_user: this.currentUserId,
      id_event: this.eventId,        // string
      content: this.currentContent,
      rate: this.currentRate
    };

    if (this.isEditing && this.editingId) {
      payload.id = this.editingId;
      this.feedbackService.updateFeedback(payload).subscribe(() => {
        this.resetForm();
        this.loadFeedbacks();
      });
    } else {
      this.feedbackService.createFeedback(payload).subscribe(() => {
        this.resetForm();
        this.loadFeedbacks();
      });
    }
  }

  startEdit(fb: Feedback) {
    this.isEditing = true;
    this.editingId = fb.id || null;
    this.currentRate = fb.rate;
    this.currentContent = fb.content;
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteFeedback(id: string) {
    if (confirm('Supprimer ce commentaire ?')) {
      this.feedbackService.deleteFeedback(Number(id)).subscribe(() => this.loadFeedbacks());
    }
  }

  private resetForm() {
    this.isEditing = false;
    this.editingId = null;
    this.currentRate = 0;
    this.currentContent = '';
  }

  private loadSimilarEvents(location: string) {
    this.eventsService.searchByLocation(location).subscribe(events => {
      this.similarEvents = events
        .filter(e => e.id !== this.eventId)
        .slice(0, 6);
    });
  }
}