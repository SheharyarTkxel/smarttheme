export interface UserProps {
  firstname: string;
  lastname: string;
  email: string;
}

export interface User {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
}
