// src/app/models/feedback.ts

export interface Feedback {
  id?: string;
  id_user: number;
  id_event: string;        // ← STRING now (was number)
  content: string;
  rate: number;
  date?: string;
}