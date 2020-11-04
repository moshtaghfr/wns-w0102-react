import React from "react";

import { VoteCount as StyledVoteCount } from "./Styled";

const VoteCount = ({ count }) => (
  <StyledVoteCount count={count}>{count}</StyledVoteCount>
);

export default VoteCount;
