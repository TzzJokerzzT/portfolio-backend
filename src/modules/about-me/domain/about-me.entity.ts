export interface IAboutItem {
  id: string;
  title: string;
  description: string;
}

export interface IAboutMe {
  _id?: string;
  title: string;
  description: string;
  about: IAboutItem[];
  createdAt?: string;
  updatedAt?: string;
}
