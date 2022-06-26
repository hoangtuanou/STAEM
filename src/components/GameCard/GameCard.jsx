import React from "react";

import platformIcon from 'assets/icons/platform.svg';
import "./styles.scss";

function GameCard({ gameInfo }) {
  const { title, image, tags, price, link } = gameInfo;
  const tagsText = tags.join(', ');
  const priceFormatted = new Intl.NumberFormat('en-VN', { style: 'currency', currency: 'USD' }).format(price);

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div className="card-wrapper">
        <img src={image} alt="game-img" className="card-banner"/>
        <div className="card-info">
          <h3>{title}</h3>
          <p>{tagsText}</p>
          <div className="divide"></div>
        </div>
        <div className="price">
          <img src={platformIcon} alt="platform-icon" />
          <h2>{priceFormatted}</h2>
        </div>
      </div>
    </a>
  );
}

export default GameCard;
