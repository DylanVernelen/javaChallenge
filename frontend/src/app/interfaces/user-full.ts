export class History {
  rewardId: string;
  pointsSpent: string;
  timeStamp: string;
  opgehaald: boolean;
}

export class HistoryList{
  name: string;
  description: string;
  worth: number;
  date: string;
  opgehaald: boolean;
}

export class Challenges {
  challengeId: string;
  challengeStatus: string;
  timeStampAdded: string;
  timeStampCompleted: string;
  pointsAwarded: number;
  description: string;
}

export class ChallengeList {
  name: string;
  challengeWorth: number;
  challengeStatus: string;
  dateAdded: string;
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
