export class Oid {
  id: string;

  constructor(id) {
    this.id = id;
  }
}

export class User {
  id: Oid;
  email: string;
  userLevel: string;
  password: string;
  pointCount: number;
  token: string;
}

export * from './User';
