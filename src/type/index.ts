export interface Chat {
  content: string;
  nickname: string;
  createAt: string;
  profile: null | string;
  userId: number;
  id: number;
}

export interface Friend {
  introduce: string;
  mbti: string;
  nickname: string;
  profile: null | string;
  userId: number;
}

export interface User {
  friendStatus: string;
  id: number;
  nickname: string;
  profile: null | string;
}

export interface Me {
  email: string;
  user_id: number;
  profile: null | string;
  lat: string | null;
  lng: string | null;
  nickname: string;
  interestList: string[];
  mbti: string;
  introduce: string;
}

export interface Profile extends User {
  introduce: string;
  mbti: string;
  interestList: string[];
}
