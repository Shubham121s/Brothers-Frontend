import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { APP_NAME } from "../../constants/app.constant";

const LOGO_SRC_PATH = "/img/logo/logo.png";

const Logo = (props) => {
  const { gutter, className, imgClass, style, logoWidth } = props;

  return (
    <div
      className={classNames("logo", className, gutter)}
      style={{
        ...style,
        ...{ width: logoWidth },
      }}
    >
      <img src={LOGO_SRC_PATH} />
      {/* <h2>Brothers</h2> */}
    </div>
  );
};

Logo.defaultProps = {
  mode: "light",
  type: "full",
  logoWidth: "auto",
};

Logo.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]),
  type: PropTypes.oneOf(["full", "streamline"]),
  gutter: PropTypes.string,
  imgClass: PropTypes.string,
  logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Logo;
