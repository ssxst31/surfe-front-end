export interface ChatMessage {
  nickname: string;
  createdAt: string;
  id: number;
  senderId: number;
  message: string;
  profileImage: string;
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
  id: number;
  userId: number;
  profile: null | string;
  loginId: string;
  lat: string | null;
  lng: string | null;
  nickname: string;
  interestList: string[];
  mbti: string;
  statusMessage: string;
  profileImage: string;
}

export interface Profile extends User {
  statusMessage: string;
  mbti: string;
  interestList: string[];
  profileImage: string;
}
