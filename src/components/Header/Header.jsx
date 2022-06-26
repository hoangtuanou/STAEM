import "./styles.scss";
import installIcon from "assets/icons/install.svg";

const Header = () => {
  return (
    <div className="header-wrapper">
      <h4>staem</h4>
      <div className="btn-install">
        <img src={installIcon} alt="install" />
        <span>Install</span>
      </div>
    </div>
  );
};

export default Header;
