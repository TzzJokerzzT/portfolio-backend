export interface ISkill {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface ISkillsDocument {
  _id?: string;
  skills: ISkill[];
  createdAt?: string;
  updatedAt?: string;
}
