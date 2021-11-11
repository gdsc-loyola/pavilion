import create from "zustand";
import { persist } from "zustand/middleware";

export const useOrgFormStore = create(
  persist(
    (set) => ({
      orgForm: {
        name: "",
        shortName: "",
        description: "",
        orgBody: "",
        logo: "",
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
        website: "",
      },
      setOrgForm: (orgForm) => set((state) => ({ orgForm })),
    }),
    {
      name: "orgForm",
    }
  )
);
