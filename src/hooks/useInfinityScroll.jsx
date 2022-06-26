import { useState, useEffect } from "react";

const useInfinityScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetching
      )
        return;
      setIsFetching(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching) {
      callback(setIsFetching);
    }
  }, [isFetching, callback]);

  return [isFetching, setIsFetching];
};

export default useInfinityScroll;
