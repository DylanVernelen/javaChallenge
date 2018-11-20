export class User {
  _id: string;
  email: string;
  userLevel: string;
  password: string;
  pointCount: number;
  token: string;
}

export * from './user';
