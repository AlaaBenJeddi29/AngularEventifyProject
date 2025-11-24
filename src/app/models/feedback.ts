export interface Feedback {
  id?: number;
  id_user: number;     // You can set this to current logged user later
  id_event: number;
  content: string;
  rate: number;        // 1 to 5
  date?: string;       // json-server will auto-add if not sent
}