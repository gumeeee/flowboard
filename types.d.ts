interface IUserLink {
  id: string;
  label: string;
  url: string;
}

interface IUser {
  id: string;
  email: string;
  name: string;
  description: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  links: IUserLink[];
  provider: "google" | "github" | "email";
}

interface IProject {
  id: string;
  name: string;
  description: string;
  readme: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  closed: boolean;
}

interface ICustomFieldData {
  id: string;
  label?: string;
  color?: string;
  description?: string;
  order: number;
}
