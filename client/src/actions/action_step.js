const GOTO_STEP = "gotoStep";
const gotoStep = id => {
  return { type: GOTO_STEP, payload: id };
};
export { GOTO_STEP, gotoStep };
