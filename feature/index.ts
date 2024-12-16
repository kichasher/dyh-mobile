import store from "@/feature/store";
import { AppDispatch, RootState } from "./store";
import {
  nextStep,
  prevStep,
  resetForm,
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
} from "../feature/slices/profile-form-slice";
import { setUser } from "./slices/authSlice";

export {
  setUser,
  store,
  AppDispatch,
  RootState,
  nextStep,
  prevStep,
  resetForm,
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
};
