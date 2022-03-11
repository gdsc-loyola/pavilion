import create from 'zustand';
import { persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';

/**
 * @typedef EventDetails
 * @property {string} name
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} location
 * @property {string} description
 * @property {File} coverphoto
 * @property {File} eventphoto1
 * @property {File} eventphoto2
 * @property {File} eventphoto3
 * @property {File} eventphoto4
 * @property {string} responsesSheet
 * @property {string} formDescription
 * @property {string} status
 * @property {Boolean} acceptingRepsonses
 * @property {Boolean} is_past_event
 */

export const useEventDetailsStore = create(
  persist(
    (set) => ({
      details: {
        name: null,
        startDate: null,
        endDate: null,
        location: null,
        description: null,
        coverphoto: null,
        eventphoto1: null,
        eventphoto2: null,
        eventphoto3: null,
        eventphoto4: null,
        responsesSheet: '',
        formDescription: '',
        status: '',
        acceptingResponses: false,
        is_past_event: false,
      },
      /**
       *
       * @param {Partial<eventDetails>} eventDetails
       * @returns
       */
      setDetails: (details) =>
        set((state) => ({
          details: {
            ...state.details,
            ...details,
          },
        })),
    }),
    {
      name: 'details',
      partialize: (state) => ({
        ...state,
        details: {
          ...state.details,
        },
      }),
    }
  )
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Details', useEventDetailsStore);
}
