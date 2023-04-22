export const createProfile = () => {
  if (process.env.NEXT_PUBLIC_ENV === "development") {
    return "http://localhost:3389/uploads/";
  } else {
    return "https://api.surfe.store/uploads/";
  }
};
