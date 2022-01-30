import create from 'zustand';
import { persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';

/**
 * @typedef OrgForm
 * @property {string} name
 * @property {string} name
 * @property {string} description
 * @property {string} orgBody
 * @property {string} logo
 * @property {string} facebook
 * @property {string} twitter
 * @property {string} instagram
 * @property {string} linkedin
 * @property {string} website
 * @property {number} step
 */

export const useOrgFormStore = create(
  persist(
    (set) => ({
      orgForm: {
        name: '',
        shortName: '',
        description: '',
        orgBody: '',
        logo: '',
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        website: '',
        step: 1,
      },
      /**
       *
       * @param {Partial<OrgForm>} orgForm
       * @returns
       */
      setOrgForm: (orgForm) =>
        set((state) => ({
          orgForm: {
            ...state.orgForm,
            ...orgForm,
          },
        })),
    }),
    {
      name: 'orgForm',
      partialize: (state) => ({
        ...state,
        orgForm: {
          ...state.orgForm,
          logo: '',
        },
      }),
    }
  )
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Event Creation', useOrgFormStore);
}
