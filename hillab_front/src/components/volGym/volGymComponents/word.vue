<template>
  <div>
    <div class="word_card_block" @click="toExplaination()">
      <div class="wordNum_container">
        <div class="wordNum">
          <span class="currentWordNum">{{ $store.state.currentWordNum + 1 }}</span>
          /{{ $store.state.volcabularyDB.length }}
        </div>
      </div>
      <transition name="el-zoom-in-center" mode="out-in">
        <div
          class="word_container"
        >{{ $store.state.volcabularyDB[$store.state.currentWordNum].word }}</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      side: "v-backSide"
    };
  },

  methods: {
    toExplaination() {
      this.$emit("side", this.side);
    }
  }
};
</script>

<style scoped>
.word_card_block {
  position: relative;
  width: 800px;
  height: 450px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 5px 10px 30px #0000004d;
  border-radius: 10px;
  opacity: 1;
  margin: 0 auto;
  margin-top: 100px;
  cursor: pointer;
}

.wordNum_container {
  float: right;
  width: 80px;
  height: 80px;
  background: #fce3b0a1 0% 0% no-repeat padding-box;
  border-radius: 0px 0px 0px 100px;
}

.wordNum {
  font-size: 16px;
  font-weight: bold;
  color: #f7b248;
  opacity: 0.5;
  padding: 10px 0px 0px 24px;
}

.currentWordNum {
  font-size: 30px;
}

.answerButton_container {
  position: absolute;
  top: 272px;
  left: 91px;
}

.answerButton_container .el-button {
  width: 29px;
  height: 29px;
  font-size: 19px;
  color: white;
}

.answerButton_container .el-button.is-circle {
  padding: 0px;
}

.word_container {
  position: absolute;
  top: 50%;
  left: 120px;
  margin-top: -36px;
  font-size: 36px;
  font-weight: bold;
  color: #3c3c3c;
}

.wordSwitch_button_container {
  position: absolute;
  top: calc(50% - 17px);
  width: 34px;
  height: 34px;
  background: var(--cherokee) 0% 0% no-repeat padding-box;
  background: #f7cb6b 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 6px #00000029;
  border: 2px solid #ffffff;
  border-radius: 50%;
  opacity: 1;
  z-index: 999;
  font-size: 18px;
  color: #fff;
  padding-top: 2px;
  cursor: pointer;
}
</style>