import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../../shared/data/feedback.service';
import { Feedback } from '../../../models/feedback';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  eventId!: number;
  feedbacks: Feedback[] = [];
  currentUserId = 1;               // ← change later with real auth

  // Form state
  isEditing = false;
  editingId: number | null = null;
  currentRate = 0;
  currentContent = '';

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((all: Feedback[]) => {
      this.feedbacks = all.filter(f => f.id_event === this.eventId);
    });
  }

  setRate(rate: number) {
    this.currentRate = rate;
  }

  onSubmit() {
    if (this.currentRate === 0) return;

    const payload: Feedback = {
      id_user: this.currentUserId,
      id_event: this.eventId,
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
    this.editingId = fb.id!;
    this.currentRate = fb.rate;
    this.currentContent = fb.content;
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteFeedback(id: number) {
    if (confirm('Supprimer ce commentaire ?')) {
      this.feedbackService.deleteFeedback(id).subscribe(() => {
        this.loadFeedbacks();
      });
    }
  }

  private resetForm() {
    this.isEditing = false;
    this.editingId = null;
    this.currentRate = 0;
    this.currentContent = '';
  }
}