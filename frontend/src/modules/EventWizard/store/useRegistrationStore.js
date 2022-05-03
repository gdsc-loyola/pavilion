import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

/**
 * @typedef registration
 * @property {string} idnumber
 * @property {string} name
 * @property {string} email
 * @property {string} yearlevel
 * @property {string} course
 */

export const useRegistrationStore = create((set) => ({
  registration: {
    idnumber: '',
    name: '',
    email: '',
    yearlevel: null,
    course: null,
  },
  /**
   *
   * @param {Partial<registration>} registration
   * @returns
   */
  setRegistration: (registration) =>
    set((state) => ({
      registration: {
        ...state.registration,
        ...registration,
      },
    })),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('registration', useRegistrationStore);
}
