export interface IProject {
  _id?: string;
  title: string;
  position: string;
  description: string[];
  imageUrl: string;
  techStack: string[];
  repoUrl: string;
  liveUrl: string;
  startDate?: Date;
  endDate?: Date;
  createdAt?: string;
  updatedAt?: string;
}
