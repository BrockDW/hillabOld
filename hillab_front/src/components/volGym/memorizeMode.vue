<template>
  <div>
    <el-container>
      <el-main>
        <transition mode="out-in">
          <div>
            <transition name="el-fade-in" mode="out-in">
              <div class="word_card_block">
                <div class="memorize_container">
                  <el-row>
                    <el-col :span="2">
                      <div class="syntacticCategory_container">
                        <div
                          class="adj_container"
                          v-if="word_shuffled_list[0].syntacticCategory == 'adj'"
                        >形容词</div>
                        <div
                          class="n_container"
                          v-if="word_shuffled_list[0].syntacticCategory == 'n'"
                        >名词</div>
                        <div
                          class="v_container"
                          v-if="word_shuffled_list[0].syntacticCategory == 'v'"
                        >动词</div>
                      </div>
                    </el-col>
                    <el-col :span="20" style="padding-left: 10px">
                      <div class="chinese_container">{{ word_shuffled_list[0].chinese }}</div>
                    </el-col>
                  </el-row>
                  <div
                    v-bind:class="{ yourAnswer_text_container1: view == 'v-userInputShow' || view == 'v-correctShow', yourAnswer_text_container2: view == 'v-wrongShow'}"
                  >YOUR ANSWER</div>

                  <transition
                    name="custom-classes-transition"
                    :enter-active-class="animateName"
                    mode="out-in"
                  >
                    <component
                      v-bind:is="view"
                      v-on:childUserAnswer="childUserAnswer"
                      :userAnswer="userAnswer"
                      :word_shuffled_list="word_shuffled_list"
                    ></component>
                  </transition>
                  <transition
                    name="custom-classes-transition"
                    enter-active-class="animated flipInX"
                    mode="out-in"
                  >
                    <div v-if="view == 'v-wrongShow'">
                      <el-row style="margin-top: 30px">
                        <el-col :span="2">
                          <div class="correctAnswer_text_container fontIcon">
                            <i class="fas fa-hand-point-right"></i>
                          </div>
                        </el-col>
                        <el-col :span="22">
                          <div class="correctAnswer_text_container">Correct Answer</div>
                          <div class="correctShow_container">
                            <i class="fas fa-check-circle"></i>
                            &nbsp;{{ word_shuffled_list[0].word }}
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </transition>
                  <div class="wrongShow_container" v-show="wrong_show"></div>

                  <el-row class="user_buttons_group">
                    <transition name="el-fade-in-linear" mode="out-in">
                      <div v-if="view == 'v-userInputShow'" key="standby">
                        <el-col :span="12">
                          <div class="check_button" @click="check()">确认</div>
                        </el-col>
                        <el-col :span="12" style="padding-left: 20px">
                          <div class="skip_button" @click="skip()">不会做</div>
                        </el-col>
                      </div>
                      <div v-else key="next">
                        <el-col :span="12">
                          <div class="check_button" @click="next()">{{ nextButtonName }}</div>
                        </el-col>
                      </div>
                    </transition>
                  </el-row>
                </div>
              </div>
            </transition>
          </div>
        </transition>
      </el-main>
      <el-footer>
        <div class="footer_container">
          <el-progress :show-text="false" :stroke-width="2" :percentage="progressBar_percentage"></el-progress>
          <el-row style="padding-top: 32px;">
            <el-col :span="2" :offset="1">
              <div class="status_container">
                <i class="el-icon-loading"></i>
                &nbsp;待记忆：{{ tag_1.length }}
              </div>
            </el-col>
            <el-col :span="3" style="padding-left: 20px">
              <div class="status_container">
                <i class="far fa-circle"></i>
                &nbsp;初步记忆：{{ tag_2.length }}
              </div>
            </el-col>
            <el-col :span="3">
              <div class="status_container">
                <i class="fas fa-check-circle"></i>
                &nbsp;进阶记忆：{{ tag_3.length }}
              </div>
            </el-col>
            <el-col :span="2" :offset="11">
              <div class="quit_button" @click="quit()">
                <i class="el-icon-arrow-left"></i>&nbsp;放弃测试
              </div>
            </el-col>
          </el-row>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import userInputShow from "@/components/volGym/volGymComponents/userInputShow";
import correctShow from "@/components/volGym/volGymComponents/correctShow";
import wrongShow from "@/components/volGym/volGymComponents/wrongShow";

export default {
  name: "volGym_learnFirstly",

  components: {
    "v-userInputShow": userInputShow,
    "v-correctShow": correctShow,
    "v-wrongShow": wrongShow
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

      animateName: "animated flipInX",
      userAnswer: "",
      nextButtonName: "下一题",
      progressBar_percentage: 0,

      word_shuffled_list: [],
      tag_1: [],
      tag_2: [],
      tag_3: [],

      userInput_show: true,
      correct_show: false,
      wrong_show: false,

      view: "v-userInputShow"
    };
  },

  created() {
    var aData = new Date();
    let hour = aData.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    let minute = aData.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    let second = aData.getSeconds();
    second = second < 10 ? "0" + second : second;
    aData =
      aData.getFullYear() +
      "-" +
      (aData.getMonth() + 1) +
      "-" +
      aData.getDate() +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second;
    this.word_shuffled_list = this.$store.state.volcabularyDB.concat();
    var m = this.word_shuffled_list.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.word_shuffled_list[m];
      this.word_shuffled_list[m] = this.word_shuffled_list[i];
      this.word_shuffled_list[i] = t;
    }

    this.tag_1 = this.word_shuffled_list.concat();

    window.addEventListener("keydown", this.handleKeyDown, true);
  },

  methods: {
    childUserAnswer(userAnswer) {
      this.userAnswer = userAnswer;
    },
    check() {
      var currentWord = this.word_shuffled_list[0];
      var aData = new Date();
      let hour = aData.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let minute = aData.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = aData.getSeconds();
      second = second < 10 ? "0" + second : second;
      aData =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate() +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      if (this.userAnswer == currentWord.word) {
        this.animateName = "animated flipInX";
        this.view = "v-correctShow";
        this.word_shuffled_list[0].correctCount++;
        if (
          this.word_shuffled_list[0].incorrectCount == 0 &&
          this.word_shuffled_list[0].unfamiliarCount <= 1
        ) {
          this.word_shuffled_list[0].lastMemorized = aData;
          this.tag_3.push(this.tag_1[0]);
          this.tag_1.splice(this.tag_1.indexOf(this.word_shuffled_list[0]), 1);
          this.progressBar_percentage =
            (this.tag_3.length / this.$store.state.volcabularyDB.length) * 100;
        } else if (this.tag_1.indexOf(this.word_shuffled_list[0]) > -1) {
          this.tag_1.splice(this.tag_1.indexOf(this.word_shuffled_list[0]), 1);
          this.tag_2.push(this.word_shuffled_list[0]);
        } else if (this.tag_2.indexOf(this.word_shuffled_list[0]) > -1) {
          if (
            this.word_shuffled_list[0].correctCount >
            this.word_shuffled_list[0].incorrectCount
          ) {
            this.word_shuffled_list[0].lastMemorized = aData;
            this.tag_2.splice(
              this.tag_2.indexOf(this.word_shuffled_list[0]),
              1
            );
            this.tag_3.push(this.word_shuffled_list[0]);
            this.progressBar_percentage =
              (this.tag_3.length / this.$store.state.volcabularyDB.length) *
              100;
          }
        }
      } else {
        this.word_shuffled_list[0].incorrectCount++;
        this.animateName = "animated headShake";
        this.nextButtonName = "✔ OK";
        this.view = "v-wrongShow";
      }
    },
    skip() {
      this.word_shuffled_list[0].incorrectCount++;
      this.animateName = "animated headShake";
      this.nextButtonName = "✔ OK";
      this.view = "v-wrongShow";
    },
    next() {
      console.log(this.tag_2);
      console.log(this.word_shuffled_list.concat());
      if (
        this.word_shuffled_list.length == 1 &&
        this.tag_1.length == 0 &&
        this.tag_2.length == 0 &&
        this.tag_3.length == this.$store.state.volcabularyDB.length
      ) {
        this.$router.push("/level");
      } else {
        if (this.userAnswer == this.word_shuffled_list[0].word) {
          if (
            this.word_shuffled_list[0].incorrectCount == 0 &&
            this.word_shuffled_list[0].unfamiliarCount <= 1
          ) {
            this.word_shuffled_list.splice(0, 1);
          } else {
            if (
              this.word_shuffled_list[0].correctCount >
              this.word_shuffled_list[0].incorrectCount
            ) {
              console.log("flag1");
              this.word_shuffled_list.splice(0, 1);
            } else {
              this.word_shuffled_list.push(this.word_shuffled_list[0]);
              this.word_shuffled_list.splice(0, 1);
            }
          }
        } else {
          this.word_shuffled_list.push(this.word_shuffled_list[0]);
          this.word_shuffled_list.splice(0, 1);
        }

        this.animateName = "animated flipInX";
        this.view = "v-userInputShow";
        this.userAnswer = "";
      }
      this.animateName = "animated flipInX";
      this.view = "v-userInputShow";
      this.userAnswer = "";
    },
    quit() {
      this.$router.push("/volGymModeChoose");
    },
    handleKeyDown(e) {
      let key = null;
      if (window.event === undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key === 13) {
        if (this.view == "v-userInputShow") {
          this.check();
        } else if (this.view == "v-correctShow" || this.view == "v-wrongShow") {
          this.next();
        }
      }
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
}

.memorize_container {
  padding: 108px 0px 0px 120px;
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
  font-weight: bold;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
}

.syntacticCategory_container {
  margin-top: 5px;
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

.yourAnswer_text_container1 {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #707070;
  text-transform: uppercase;
  opacity: 1;
  margin-top: 90px;
  transition: margin-top 0.5s;
}

.yourAnswer_text_container2 {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #707070;
  text-transform: uppercase;
  opacity: 1;
  margin-top: 40px;
  transition: margin-top 0.5s;
}

.correctAnswer_text_container {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #707070;
  text-transform: uppercase;
  opacity: 1;
}

.correctAnswer_text_container.fontIcon {
  font-size: 30px;
  line-height: 70px;
  color: #3c3c3c;
  opacity: 1;
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

.input_container {
  width: 370px;
  margin-top: 10px;
}

.input_container .el-input >>> .el-input__inner:focus {
  outline: none;
  border-bottom: 2px solid #f7b248;
  transition: all 0.2s;
}

.input_container .el-input >>> .el-input__inner {
  font-size: 26px;
  border-radius: 0px;
  border: none;
  border-bottom: 2px solid #707070;
  color: #3c3c3c;
  transition: all 0.2s;
}

.input_container .el-input {
  font-size: 20px;
}

.check_button,
.skip_button {
  width: 110px;
  height: 38px;
  font-size: 16px;
  font-family: "puhui-light";
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
}

.user_buttons_group {
  position: absolute;
  bottom: 30px;
  right: 50px;
}

.check_button {
  line-height: 38px;
  color: #fff;
  background: #f7b248 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #be8b3e;
}

.skip_button {
  line-height: 34px;
  color: #c0c4cc;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #c0c4cc;
  border: 2px solid #c0c4cc;
}

.status_container {
  font-size: 15px;
  color: #707070;
}

.status_container i {
  line-height: 40px;
  color: #f7b248;
}

.correctShow_container {
  font-size: 28px;
  letter-spacing: 0px;
  color: #21ba45;
  opacity: 1;
  margin-top: 10px;
}

.wrongShow_container {
  margin-top: 10px;
}
</style>