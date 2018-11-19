export class Oid {
  id: string;

  constructor(id) {
    this.id = id;
  }
}

export class Reward {
  id: Oid;
  rewardName: string;
  rewardWorth: number;
}
