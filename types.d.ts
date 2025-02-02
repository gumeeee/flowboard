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
