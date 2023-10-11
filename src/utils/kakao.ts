export const kakaoInit = () => {
  const kakao = (window as any).Kakao;
  if (!kakao.isInitialized()) kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);

  return kakao;
};
