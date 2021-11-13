export enum UserRole {
  USER = 0,
  ADMIN = 1,
}

export interface User {
  isBlocked: boolean;
  _id: string;
  name: string;
  surname: string;
  email: string;
  initials: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
