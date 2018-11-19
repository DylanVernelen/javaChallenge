export class Oid {
  id: string;

  constructor(id) {
    this.id = id;
  }
}

export class RewardCategory {
  id: Oid;
  categoryName: string;
}
