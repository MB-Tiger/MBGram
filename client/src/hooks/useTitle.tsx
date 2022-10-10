import { useLayoutEffect } from "react";

const useTitle = (title: string) => {
  useLayoutEffect(() => {
    document.title = title;
  }, []);
};

export default useTitle;
