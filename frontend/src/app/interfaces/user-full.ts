export class History {
  _id: string;
  rewardid: string;
  pointsSpent: number;
  timestamp: number;
  uniqueid: string;
  opgehaald: number;
  name: string;
  worth: number;
  description: string;
  date: string;
}

export class HistoryList {
  name: string;
  description: string;
  worth: number;
  date: string;
  opgehaald: number;
}

export class Challenges {
  challengeid: string;
  challengeStatus: string;
  timestampAdded: string;
  timestampCompleted: string;
  pointsAwarded: number;
  description: string;
  name: string;
  worth: number;
}

export class ChallengeList {
  name: string;
  challengeWorth: number;
  challengeStatus: string;
  timestampAdded: string;
  dateCompleted: string;
  pointsAwarded: number;
  description: string;
}

export class UserFull {
  _id: string;
  email: string;
  userLevel: string;
  password: string;
  pointCount: number;
  token: string;
  history: [History];
  challenges: [Challenges];
}
