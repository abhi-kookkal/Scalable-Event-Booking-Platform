export interface Event {
  id: number;
  title: string;
  venue: string;
  description: string;
  availableTickets: number;
}

export interface Booking {
  id: number;
  quantity: number;
}

export interface TopEvent {
  id: number;
  title: string;
  totalBookings: number;
}
