export type ExperienceType = "work" | "freelance" | "education";
export type LocationType = "hybrid" | "remote" | "office";

export interface IExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  techStack: string[];
  type: ExperienceType;
  location: LocationType;
}

export interface IExperienceDocument {
  _id?: string;
  experiences: IExperience[];
  createdAt?: string;
  updatedAt?: string;
}
