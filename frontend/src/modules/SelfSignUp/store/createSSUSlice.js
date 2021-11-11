export const createSSUSlice = (set, get) => ({
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
});
