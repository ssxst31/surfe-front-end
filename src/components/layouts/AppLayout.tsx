import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Transition, TransitionGroup } from "react-transition-group";
import CSSTransition from "react-transition-group/CSSTransition";
import { useRouter } from "next/router";
interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const [data, setData] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setData(null);
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        setData(null);
      });
    };
  }, []);

  const setHistory = () => {
    const { state } = window.history;
    const newState = {
      ...state,
      direction: "navigate-pop",
    };
    history.pushState(newState, "", "/2");
    if (state && state.direction === "navigate-pop") {
      setData(state);
    }
  };

  const handleRouteChangeStart = () => {
    setHistory();
  };

  useEffect(() => {
    window.addEventListener("popstate", () => {
      handleRouteChangeStart();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        handleRouteChangeStart();
      });
    };
  }, []);

  return (
    <>
      <TransitionGroup className={"transition-wrapper"}>
        <CSSTransition
          key={router.pathname}
          timeout={300}
          classNames={data?.direction ? data?.direction : "navigate-push"}
        >
          {children}
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default AppLayout;
