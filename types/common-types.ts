import { CertificateType } from "./enums";

type Education = {
  degree_type: string;
  institue_name: string;
  degree_status: "currently-enrolled" | "completed";
  start_date: string;
  end_date: string;
  country_id: string;
  state_id: string;
  city_id: string;
};

type Experience = {
  job_title: string;
  company_name: string;
  job_status: boolean;
  start_date: string;
  end_date: string;
  country_id: string;
  state_id: string;
  city_id: string;
  employment_type: string;
};

type Certificate = {
  type: CertificateType;
  name: string;
  certificate_id: string;
  issue_date: string;
  expiration_date: string;
  certificate_url: string;
};

type ProfileFormState = {
  currentStep: number;
  personalInfo: {
    full_name: string;
    email: string;
    profile_picture_url: string;
    country_id: string;
    state_id: string;
    city_id: string;
    language: string[];
    skills: string[];
  };
  education: Education[];
  experience: Experience[];
  certificates: Certificate[];
};

type Country = {
  id: string;
  country: string;
};

type State = {
  id: string;
  state: string;
};

type City = {
  id: string;
  city: string;
};

type DegreeType = {
  id: string;
  name: string;
};

type InstitueNames = {
  id: string;
  name: string;
};

type JobTitle = {
  id: string;
  name: string;
};

type CompanyName = {
  id: string;
  name: string;
};

export {
  Education,
  Experience,
  Certificate,
  ProfileFormState,
  Country,
  State,
  City,
  DegreeType,
  InstitueNames,
  JobTitle,
  CompanyName,
};
