<template>
  <div>
    <el-container>
      <el-main>
        <div style="overflow-x: hidden; height: 100%">
          <transition
            name="custom-classes-transition"
            enter-active-class="animated flipInX"
            mode="out-in"
          >
            <component v-bind:is="view" v-on:side="side"></component>
          </transition>
          <div>
            <div class="wordSwitch_button_container" @click="lastWord()" style="left: 310px">
              <i class="fas fa-chevron-left" style="padding-left: 8px;"></i>
            </div>
            <div class="wordSwitch_button_container" @click="nextWord()" style="right: 310px">
              <i class="fas fa-chevron-right" style="padding-left: 10px;"></i>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div class="footer_container">
          <el-row style="padding-top: 32px">
            <el-col :span="2" :offset="18">
              <div class="start_button" @click="start()">开始测试</div>
            </el-col>
            <el-col :span="2">
              <div class="quit_button" @click="backToLevel()">
                <i class="el-icon-arrow-left"></i>&nbsp;返回词集
              </div>
            </el-col>
          </el-row>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import frontSide from "@/components/volGym/volGymComponents/word";
import backSide from "@/components/volGym/volGymComponents/explaination";

export default {
  name: "volGym_learnFirstly",

  components: {
    "v-frontSide": frontSide,
    "v-backSide": backSide
  },

  data() {
    return {
      currentWordNum: 0,
      difficulty: 0,
      word: "",
      syntacticCategory: "",
      chinese: "",
      englishExplanation: "",
      sampleSentence: "",
      sentenceTranslation: "",
      incorrectCount: 0,
      correctCount: 0,
      unfamiliarCount: 0,
      familiarCount: 0,
      lastStudied: "",
      lastMemorized: "",
      view: "v-frontSide"
    };
  },

  mounted() {
    this.$store.state.currentWordNum = 0;
  },

  methods: {
    side(view) {
      this.view = view;
    },
    lastWord() {
      if (this.$store.state.currentWordNum == 0) {
        this.$message({
          message: "这是第一题哦！",
          type: "warning"
        });
      } else {
        this.$store.state.currentWordNum--;
        this.view = "v-frontSide";
      }
    },
    nextWord() {
      if (
        this.$store.state.currentWordNum ==
        this.$store.state.volcabularyDB.length - 1
      ) {
        this.$message({
          message: "这是最后一题了哦！",
          type: "warning"
        });
      } else {
        this.$store.state.currentWordNum++;
        this.view = "v-frontSide";
      }
    },
    start() {
      this.$router.push("/volGym/memorizeMode");
    },
    backToLevel() {
      this.$router.push("/level");
    }
  }
};
</script>

<style scoped>
.el-main {
  position: absolute;
  width: 100%;
  height: calc(100% - 110px);
  padding: 0 0;
}

.el-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 110px !important;
  padding: 0 0;
}

body > .el-container {
  margin-bottom: 40px;
}

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

.backButton_container .el-button {
  width: 36px;
  height: 36px;
  color: #fff;
  background: #f7cb6b 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 6px #00000029;
  border: 2px solid #ffffff;
  opacity: 1;
}

.nextButton_container .el-button {
  width: 36px;
  height: 36px;
  color: #fff;
  background: #f7cb6b 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 6px #00000029;
  border: 2px solid #ffffff;
  opacity: 1;
}

.footer_container {
  height: 110px;
  background: #fff;
  border-top: 2px solid #e5e5e5;
}

.start_button {
  width: 110px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 16px;
  font-family: "puhui-light";
  color: #fff;
  box-shadow: 0px 3px 0px var(--tussock);
  background: #f7b248 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #be8b3e;
  border-radius: 8px;
  cursor: pointer;
  opacity: 1;
}

.quit_button {
  width: 110px;
  height: 36px;
  line-height: 34px;
  text-align: center;
  font-size: 16px;
  font-family: "puhui-light";
  color: #c0c4cc;
  border-radius: 8px;
  border: 1px solid #c0c4cc;
  box-shadow: 0px 3px 0px #c0c4cc;
  cursor: pointer;
  transition: all 0.2s;
}

.quit_button:hover {
  color: #f7b248;
  border: 1px solid #f7b248;
  border-radius: 8px;
  box-shadow: 0px 3px 0px #be8b3e;
  transition: all 0.2s;
}
</style>