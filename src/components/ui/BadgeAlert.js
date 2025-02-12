import React from "react";
import "./css/BadgeAlert.css";

const BadgeAlert = ({ type, text }) => {
  if (!text) return null;

  return <div className={`profile-msg profile-msg-${type}`}>{text}</div>;
};

export default BadgeAlert;
