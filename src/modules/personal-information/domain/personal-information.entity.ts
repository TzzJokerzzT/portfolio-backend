export interface IBasic {
  name: string;
  label: string;
  image?: string;
  email: string;
  summary: string;
}

export interface ISocial {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface IContact {
  id: string;
  name: string;
  url: string;
  icon?: string;
}

export interface IPersonalExperience {
  id: string;
  title: string;
  description: string;
}

export interface IPersonalInformation {
  _id?: string;
  basic: IBasic;
  social: ISocial;
  personalExperience: IPersonalExperience;
  contact: IContact[];
  createdAt?: string;
  updatedAt?: string;
}
