export function formatChatDate(createdAt: any): string {
  const dateObj = new Date(createdAt);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  // 이전에 포맷된 날짜와 현재 포맷된 날짜가 같으면 반환하지 않음
  if (formattedDate !== lastDate) {
    lastDate = formattedDate;
    return lastDate;
  }

  return "";
}

let lastDate = ""; // 이전 포맷된 날짜를 저장할 변수
