import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

/**
 * @typedef EventCreationForm
 * @property {string} name
 * @property {string} coverPhoto
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {string} location
 * @property {string} desc
 * @property {string} evenPhoto1
 * @property {string} evenPhoto2
 * @property {string} evenPhoto3
 * @property {string} evenPhoto4
 * @property {Date} lastUpdate
 * @property {'Published' | 'Draft'} status
 *
 */

export const useEventCreationFormStore = create((set) => ({
  eventCreationForm: {
    name: '',
    coverPhoto: '',
    startDate: '',
    endDate: '',
    location: '',
    desc: '',
    evenPhoto1: '',
    evenPhoto2: '',
    evenPhoto3: '',
    evenPhoto4: '',
    lastUpdate: '',
    status: 'Draft',
  },
  /**
   *
   * @param {Partial<EventCreationForm>} eventCreationForm
   * @returns
   */
  setEventCreationForm: (eventCreationForm) =>
    set((state) => ({
      eventCreationForm: {
        ...state.eventCreationForm,
        ...eventCreationForm,
      },
    })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Event Creation', useEventCreationFormStore);
}
