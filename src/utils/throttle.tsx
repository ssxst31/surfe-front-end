export default function throttle(func: Function, delay: number): Function {
  let lastExecTime = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: any[]) {
    const now = Date.now();

    if (!lastExecTime || now - lastExecTime >= delay) {
      func(...args);
      lastExecTime = now;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay);
    }
  };
}
