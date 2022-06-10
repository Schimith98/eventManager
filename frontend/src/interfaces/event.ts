export interface IEvent {
  id: number;
  type: string;
  title: string;
  description: string;
  date: string;
  time: string;
  place: string;
  imageURL: string;
  tickets: ITicket[];
}

export interface ITicket {
  id: number;
  available: boolean;
}
