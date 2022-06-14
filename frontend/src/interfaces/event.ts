export interface IEvent {
  id: number | null;
  type: string;
  title: string;
  description: string;
  date: string;
  hour: string;
  place: string;
  imageURL: string;
  tickets: ITicket[];
}

export interface ITicket {
  id: number;
  available: boolean;
  price: number;
  buyerEmail: string | undefined;
}
