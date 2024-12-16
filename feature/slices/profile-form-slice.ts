import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateArrayItem } from "./slice-utilities";
import {
  ProfileFormState,
  Education,
  Experience,
  Certificate,
} from "@/types/common-types";
const initialState: ProfileFormState = {
  currentStep: 0,
  personalInfo: {
    full_name: "",
    email: "",
    profile_picture_url: "",
    country_id: "",
    state_id: "",
    city_id: "",
    language: [],
    skills: [],
  },
  education: [],
  experience: [],
  certificates: [],
};

const profileFormSlice = createSlice({
  name: "profileForm",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    setPersonalInfo: (
      state,
      action: PayloadAction<Partial<typeof state.personalInfo>>
    ) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },
    updateEducation: (
      state,
      action: PayloadAction<{ index: number; education: Education }>
    ) => {
      const { index, education } = action.payload;
      state.education = updateArrayItem(state.education, index, education);
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.education.splice(action.payload, 1);
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experience.push(action.payload);
    },
    updateExperience: (
      state,
      action: PayloadAction<{ index: number; experience: Experience }>
    ) => {
      const { index, experience } = action.payload;
      state.experience = updateArrayItem(state.experience, index, experience);
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.experience.splice(action.payload, 1);
    },
    addCertificate: (state, action: PayloadAction<Certificate>) => {
      state.certificates.push(action.payload);
    },
    updateCerificate: (
      state,
      action: PayloadAction<{ index: number; certificate: Certificate }>
    ) => {
      const { index, certificate } = action.payload;
      state.certificates = updateArrayItem(state.certificates, index, certificate);
    },
    removeCertificate: (state, action: PayloadAction<number>) => {
      state.certificates.splice(action.payload, 1);
    },
    resetForm: () => initialState,
  },
});

export const {
  nextStep,
  prevStep,
  setPersonalInfo,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  addCertificate,
  updateCerificate,
  removeCertificate,
  resetForm,
} = profileFormSlice.actions;

export default profileFormSlice.reducer;
