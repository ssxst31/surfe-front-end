export interface ChatMessage {
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
  statusMessage: string;
}

export interface User {
  friendStatus: string;
  id: number;
  nickname: string;
  profile: null | string;
  loginId: any;
}

export interface NearUser {
  friendStatus: string;
  id: number;
  loginId: string;
  nickname: string;
  profileImage: string;
  statusMessage: string;
}

export interface Me {
  id: string;
  user_id: number;
  profile: null | string;
  lat: string | null;
  lng: string | null;
  nickname: string;
  interestList: string[];
  mbti: string;
  statusMessage: string;
}

export interface Profile extends User {
  statusMessage: string;
  mbti: string;
  interestList: string[];
  profileImage: string;
}
