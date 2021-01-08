<template>
  <div>
    <div class="word_card_block" @click="toWord()">
      <div class="wordNum_container">
        <div class="wordNum">
          <span class="currentWordNum">{{ $store.state.currentWordNum + 1 }}</span>
          /{{ $store.state.volcabularyDB.length }}
        </div>
      </div>
      <div class="explaination_container">
        <div
          class="word_container"
        >{{ $store.state.volcabularyDB[$store.state.currentWordNum].word }}</div>
        <div>
          <el-button
            type="text"
            @click="handleplay()"
            v-if="$store.state.volcabularyDB[$store.state.currentWordNum].audioName != null"
          >
            <i style="color: #707070; font-size: 1.8em" class="fa fa-bullhorn"></i>
          </el-button>
        </div>
        <div class="syntacticCategory_container">
          <div
            class="adj_container"
            v-if="$store.state.volcabularyDB[$store.state.currentWordNum].syntacticCategory == 'adj'"
          >形容词</div>
          <div
            class="n_container"
            v-if="$store.state.volcabularyDB[$store.state.currentWordNum].syntacticCategory == 'n'"
          >名词</div>
          <div
            class="v_container"
            v-if="$store.state.volcabularyDB[$store.state.currentWordNum].syntacticCategory == 'v'"
          >动词</div>
        </div>
        <div
          class="chinese_container"
        >{{ $store.state.volcabularyDB[$store.state.currentWordNum].chinese }}</div>
        <el-row class="sentence_container">
          <el-col :span="1">例：</el-col>
          <el-col :span="22" style="padding-left: 18px">
            <div
              class="sampleSentence_container"
            >{{ $store.state.volcabularyDB[$store.state.currentWordNum].sampleSentence }}</div>
            <div
              class="sentenceTranslation_container"
            >{{ $store.state.volcabularyDB[$store.state.currentWordNum].sentenceTranslation }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      side: "v-frontSide"
    };
  },

  methods: {
    toWord() {
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

.explaination_container {
  padding: 75px 0px 0px 120px;
}

.word_container {
  font-size: 36px;
  font-weight: bold;
  font-family: "lato";
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
}

.syntacticCategory_container {
  margin-top: 30px;
}

.adj_container {
  width: 48px;
  height: 24px;
  line-height: 24px;
  background: #fcc9c9 0% 0% no-repeat padding-box;
  border-radius: 2px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0px;
  color: #f77879;
  opacity: 1;
}

.n_container {
  width: 48px;
  height: 24px;
  line-height: 24px;
  background: #f0f9eb 0% 0% no-repeat padding-box;
  border-radius: 2px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0px;
  color: #7cc26b;
  opacity: 1;
}

.v_container {
  width: 48px;
  height: 24px;
  line-height: 24px;
  background: #fdf6ec 0% 0% no-repeat padding-box;
  border-radius: 2px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0px;
  color: #eeb43c;
  opacity: 1;
}

.chinese_container {
  font-size: 22px;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
  margin-top: 10px;
}

.sentence_container {
  font-size: 22px;
  letter-spacing: 0px;
  color: #707070;
  margin-top: 40px;
}
</style>