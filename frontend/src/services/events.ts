import api from './api';
import {IEvent} from '../interfaces/event';

export const events = {
  getOne: async id => {
    return api.get(`/events/${id}`);
  },
  getAll: async () => {
    return api.get(`/events`);
  },
  save: async (event: IEvent) => {
    const method: string = event.id ? 'put' : 'post';
    const url: string = event.id ? `/events/${event.id}` : '/events';
    return api[method](url, event);
  },
  delete: async (id: number) => {
    return api.delete(`/events/${id}`);
  },
};
