import { useState, useRef, useEffect, useCallback } from "react";

import { SWIPE_DIRECTION } from 'constants';

function getTouches(evt) {
  return evt.changedTouches;
}

const useTouchEvent = (element) => {
  const [directionSwipe, setDirectionSwipe] = useState("");
  const [distanceMoved, setDistanceMoved] = useState(0)
  const xDown = useRef(null);

  const handleTouchMove = useCallback((evt) => {
    const xMove = evt.changedTouches[0].screenX;
    const xDiff = xMove - xDown.current;

    // if (Math.abs((xDiff)) > 100) {
    //   if (xDiff > 0) {
    //     setDirectionSwipe(SWIPE_DIRECTION.RIGHT);
    //   } else {
    //     setDirectionSwipe(SWIPE_DIRECTION.LEFT);
    //   }
    // }
    setDistanceMoved(xDiff)
  }, []);

  const handleTouchStart = useCallback(
    (evt) => {
      setDirectionSwipe("");
      const firstTouch = getTouches(evt)[0];
      xDown.current = firstTouch.screenX;

      element.current.addEventListener("touchmove", handleTouchMove, false);
    },
    [element, handleTouchMove]
  );

  const handleTouchEnd = useCallback((evt) => {
    if (!xDown.current) {
      return;
    }

    const xUp = evt.changedTouches[0].screenX;
    const xDiff = xDown.current - xUp;

    if (Math.abs(xDiff) > 100) {
      if (xDiff < 0) {
        setDirectionSwipe(SWIPE_DIRECTION.RIGHT);
      } else {
        setDirectionSwipe(SWIPE_DIRECTION.LEFT);
      }
    }

    /* reset values */
    xDown.current = null;
  }, []);

  useEffect(() => {
    if (element) {
      element.current.addEventListener("touchstart", handleTouchStart, false);
      element.current.addEventListener("touchend", handleTouchEnd, false);
    }
  }, [element, handleTouchStart, handleTouchEnd]);

  return [directionSwipe, distanceMoved];
};

export default useTouchEvent;
