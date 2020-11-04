import React from "react";
import PropTypes from "prop-types";
import VoteCount from "./VoteCount";

const Skill = ({ title, voteCount }) => (
  <li>
    {title}
    <VoteCount count={voteCount} />
  </li>
);

Skill.propTypes = {
  title: PropTypes.string.isRequired,
  voteCount: PropTypes.number.isRequired,
};

export default Skill;
