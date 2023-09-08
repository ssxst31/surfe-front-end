import React, { useState, useEffect } from "react";
import throttle from "utils/throttle";

export default function useVisible(element: any) {
  const [visible, setVisible] = useState(false);
  let closed = false;

  const onShow = throttle(() => {
    if (closed) return;
    setVisible(true);
  }, 500);
  const onHide = throttle(() => {
    if (closed) return;
    setVisible(false);
  }, 500);

  useEffect(() => {
    if (!element?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onShow();
          } else {
            onHide();
          }
        }
      },
      {
        threshold: 0.9,
      },
    );

    observer.observe(element.current);

    return () => {
      observer.disconnect();
      closed = true;
    };
  }, [element?.current]);

  return visible;
}
