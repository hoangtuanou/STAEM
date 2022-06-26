import { useState, useRef, useEffect } from "react";

import useWindowSize from "hooks/useWindowSize";

import "./styles.scss";

export function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

const Slider = (props) => {
  const { list } = props;
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef(null);
  const { width } = useWindowSize();
  const currentSlide = useRef(0);
  const sliderInnerRef = useRef(null);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationRef = useRef(null);
  const dragging = useRef(null);
  const startPos = useRef(0);
  const itemWidth = width >= 1008 ? 822 : 340;

  const setPositionByIndex = () => {
    currentTranslate.current = currentSlide.current * -itemWidth
    prevTranslate.current = currentTranslate.current
    setSliderPosition()
  };

  const handleClickSliderDot = (sliderIdx) => {
    currentSlide.current = sliderIdx;
    setCurrentIndex(sliderIdx)
    setPositionByIndex();
  };

  const setSliderPosition = () => {
    sliderInnerRef.current.style.transform = `translate(${currentTranslate.current}px)`;
  };

  const animation = () => {
    setSliderPosition();
    if (dragging.current) requestAnimationFrame(animation);
  };

  const handleTouchStart = (event) => {
    animationRef.current = requestAnimationFrame(animation);
    dragging.current = true;
    startPos.current = getPositionX(event);
  };

  const handleTouchMove = (event) => {
    if (dragging.current) {
      const currentPosition = getPositionX(event);
      currentTranslate.current =
        prevTranslate.current + currentPosition - startPos.current;
    }
  };

  const handleTouchEnd = () => {
    const threshHold = 100
    const movedBy = currentTranslate.current - prevTranslate.current

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -threshHold && currentSlide.current < list.length - 1)
      currentSlide.current += 1

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > threshHold && currentSlide.current > 0)
      currentSlide.current -= 1

    setCurrentIndex(currentSlide.current)
    setPositionByIndex();
    dragging.current = false;
    cancelAnimationFrame(animationRef.current)
  };

  return (
    <div
      className="slider-wrapper"
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <div className="slider-list">
        <div className="slider-inner" ref={sliderInnerRef}>
          {list.length
            ? list.map((item, idx) => (
                <div key={item.id} className={`slider-item ${currentIndex === idx ? "active" : ""}`}>
                  <img src={item.image} alt="game-img" />
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="slider-dot-section">
        {list.length
          ? list.map((item, idx) => (
              <span
                key={item.id}
                className={`slider-dot ${
                  currentIndex === idx ? "active" : ""
                }`}
                onClick={() => handleClickSliderDot(idx)}
              ></span>
            ))
          : null}
      </div>
    </div>
  );
};

export default Slider;
