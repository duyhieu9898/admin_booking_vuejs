const state = {

};

const getters = {

};

const actions = {

};

const mutations = {
  SET_KYC(state, kyc) {
    state.kyc = kyc;
  },
  SET_KYC_STEP_ONE(state, stepOneState) {
    state.stepOneState = stepOneState;
  },
  SET_KYC_STEP_TWO(state, stepTwoState) {
    state.stepTwoState = stepTwoState;
  },
  SET_KYC_STEP_THREE(state, stepThreeState) {
    state.stepThreeState = stepThreeState;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
