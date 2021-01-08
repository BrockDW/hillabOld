<template>
  <div>
    <!-- Container Type 1 -->

    <el-row :gutter="25" v-if="container == 0">
      <!-- <el-col :span="11" :offset="1">
        <el-card class="box-card">
          <div class="block" v-if="src">
            <el-image :src="src" lazy></el-image>
      </div>-->

      <!-- 插图 一般用于 Writing Section -->
      <!-- <div v-if="ikon.length > 0" style="padding: 0px 40px; margin-top: 40px;">
            <el-image style="width: 100%; height: auto" :src="ikon[0]" :preview-src-list="ikon"></el-image>
          </div>

          <el-row>
            <el-col :span="20">
              <div v-if="title!=''" class="title" v-html="title"></div>
            </el-col>
            <el-col :span="4">
              <div style="line-heigth: 25px">
                <el-button
                  type="text"
                  @click="handleplay()"
                  v-if="audioName != null && recordingFlag == 0"
                >
                  <i style="color: #707070; font-size: 1.8em" class="fa fa-bullhorn"></i>
                </el-button>
              </div>
            </el-col>
          </el-row>

          <div class="reading_container">
            <el-scrollbar class="scrollbar">
              <div v-html="reading" class="reading"></div>
            </el-scrollbar>
          </div>

          <div>
            <span>
              <i class="el-icon-caret-bottom"></i>
            </span>
          </div>
        </el-card>
      </el-col>-->
      <div class="box-card-question">
        <el-card class="box-card">
          <div class="questionNum_container">
            <span class="questionNum">
              <span style="font-size: 36px">{{ questionNum }}</span>
              /{{ $store.state.currentQB.length }}
            </span>
          </div>
          <div style="height: 375px; display: flex; line-height: 80px;">
            <div style="align-self: center;">
              <div v-if="question!=''" v-html="question" class="question"></div>

              <!-- 单选题 Radio -->
              <div v-if="radioList.length > 0 && radioList.length < 4">
                <el-row v-for="(i, index) in radioList" :key="index">
                  <el-col :span="23">
                    <el-radio
                      v-model="radio"
                      :label="String.fromCharCode(65 + index)"
                      :disabled="disabled"
                    >
                      <!-- <el-row> -->
                      <!-- <el-col :span="2"> -->
                      <!-- <b style="margin-right: 16px">{{ String.fromCharCode(65 + index) }}</b> -->
                      <!-- </el-col> -->
                      <!-- <el-col :span="22"> -->
                      {{ i }}
                      <!-- </el-col> -->
                      <!-- </el-row> -->
                    </el-radio>
                    <!-- <el-radio-group v-model="radio">
                    <el-radio-button :label="String.fromCharCode(65 + index)" :disabled="disabled">
                      <el-row>
                        <el-col :span="2">
                          <b>{{ String.fromCharCode(65 + index) }}</b>
                        </el-col>
                        <el-col :span="22">{{ i }}</el-col>
                      </el-row>
                    </el-radio-button>
                    </el-radio-group>-->
                  </el-col>
                  <el-col :span="1" v-show="showAnswer">
                    <div
                      v-if="String.fromCharCode(65 + index) == radio && String.fromCharCode(65 + index) != answer"
                      class="wrong"
                      style="margin-left: 35px; margin-top: 25px"
                    >
                      <i class="fa fa-times"></i>
                    </div>
                    <div
                      v-else-if="String.fromCharCode(65 + index) == answer"
                      class="correct"
                      style="margin-left: 35px; margin-top: 25px"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- 单选题 Radio -->
              <!-- <div v-if="radioList.length > 0 && radioList.length < 4">
              <el-row v-for="(i, index) in radioList" :key="index">
                <el-col :span="23">
                  <el-radio-group v-model="radio">
                    <el-radio-button :label="String.fromCharCode(65 + index)" :disabled="disabled">
                      <el-row>
                        <el-col :span="2">
                          <b>{{ String.fromCharCode(65 + index) }}</b>
                        </el-col>
                        <el-col :span="22">{{ i }}</el-col>
                      </el-row>
                    </el-radio-button>
                  </el-radio-group>
                </el-col>
                <el-col :span="1" v-show="showAnswer">
                  <div
                    v-if="String.fromCharCode(65 + index) == radio && String.fromCharCode(65 + index) != answer"
                    class="wrong"
                    style="margin-left: 35px; margin-top: 25px"
                  >
                    <i class="fa fa-times"></i>
                  </div>
                  <div
                    v-else-if="String.fromCharCode(65 + index) == answer"
                    class="correct"
                    style="margin-left: 35px; margin-top: 25px"
                  >
                    <i class="fa fa-check"></i>
                  </div>
                </el-col>
              </el-row>
              </div>-->

              <!-- 单选题 Select -->
              <div v-if="radioList.length >= 4">
                <el-row>
                  <el-col :span="23">
                    <el-row style="padding-left: 52px; padding-top: 20px">
                      <el-col :span="4">{{ selectQuestion }}</el-col>
                      <el-col :span="20" style="padding-left: 20px">
                        <el-select v-model="radio" placeholder="Select One" :disabled="disabled">
                          <el-option
                            v-for="item in radioList"
                            :key="item"
                            :label="item"
                            :value="item"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="1" v-show="showAnswer">
                    <div v-if="answer_check == 0" class="wrong" style="margin-top: 45px;">
                      <i class="fa fa-times"></i>
                    </div>
                    <div v-else-if="answer_check == 1" class="correct" style="margin-top: 45px;">
                      <i class="fa fa-check"></i>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- input输入 -->
              <div v-if="radioList.length == 0 && textareaFlag == 0">
                <el-row>
                  <el-col :span="14" class="textInput">
                    <p>Your answer</p>
                    <el-input v-model="textInput" placeholder="Fill in a word" :disabled="disabled"></el-input>
                  </el-col>
                  <el-col :span="1" v-show="showAnswer">
                    <div
                      v-if="answer_check == 0"
                      class="wrong"
                      style="margin-left: 10px; margin-top: 75px;"
                    >
                      <i class="fa fa-times"></i>
                    </div>
                    <div
                      v-else-if="answer_check == 1"
                      class="correct"
                      style="margin-left: 10px; margin-top: 75px;"
                    >
                      <i class="fa fa-check"></i>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- 写作 -->
              <div v-if="textareaFlag == 1">
                <el-input
                  type="textarea"
                  style="width: 400px; margin-left: 30px"
                  :autosize="{ minRows: 14, maxRows: 14}"
                  placeholder="Start typing..."
                  v-model="textarea2"
                ></el-input>
              </div>
            </div>
          </div>

          <!-- 提交按钮 -->
          <!-- <div class="submit_button" v-show="showSubmit" @click="handleSubmit()">
              <i class="fa fa-check"></i>
          </div>-->
          <div class="check_answer_button" @click="checkAnswer()">确认</div>
        </el-card>
      </div>
    </el-row>

    <!-- Container Type 2 -->

    <el-row :gutter="25" style="margin-top: 40px" v-if="container == 1">
      <el-col :span="22" :offset="1" class="box-card-question">
        <!-- <el-card class="box-card"> -->
        <!-- <div class="questionNum_container">
            <span class="questionNum">{{ questionNum }}</span>
        </div>-->
        <el-row style="padding: 60px 120px 0px 60px">
          <el-col :span="23">
            <div
              v-if="question!=''"
              class="question"
              v-html="question"
              style="color: #3e3e3e; font-size: 1.0em"
            ></div>
          </el-col>
          <el-col :span="1">
            <el-button type="text" @click="handleplay()" v-if="audioName != null">
              <i style="color: #707070; font-size: 1.8em" class="fa fa-bullhorn"></i>
            </el-button>
          </el-col>
        </el-row>

        <!-- Speaking -->
        <el-row v-if="recordingFlag == 1">
          <!-- 播放 -->
          <el-col :span="4" class="sound" :offset="6">
            <el-button type="text" icon="fa fa-volume-up" @click="playTapeVisible = true" circle></el-button>
            <el-dialog :visible.sync="playTapeVisible" :show-close="false" top="38vh">
              <div class="player">
                <el-row>
                  <!-- 插图 -->
                  <el-col :span="14">
                    <el-image
                      style="height: 224px;"
                      :src="require('@/assets/ikon/undraw_Contemplating_re_ynec.svg')"
                    ></el-image>
                  </el-col>
                  <!-- 进度条 -->
                  <el-col :span="10" style="padding: 80px 50px 0px 0px">
                    <el-slider
                      v-model="percent"
                      :show-tooltip="false"
                      :max="100"
                      @change="sliderChange"
                    ></el-slider>
                  </el-col>
                  <!-- 操作按钮 -->
                  <el-col :span="10" style="padding: 0px 50px 0px 0px">
                    <el-row>
                      <el-col :span="8" class="playButton">
                        <el-button type="text" @click="fastBack" icon="fa fa-step-backward"></el-button>
                      </el-col>
                      <el-col :span="8" class="playButton">
                        <el-button type="text" v-bind:icon="changePlayStatus" @click="changeStatus"></el-button>
                      </el-col>
                      <el-col :span="8" class="playButton">
                        <el-button type="text" @click="forward" icon="fa fa-step-forward"></el-button>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="4" class="microphone" :offset="5">
            <el-button type="text" icon="fa fa-microphone" @click="recordVisible = true" circle></el-button>
            <el-dialog :visible.sync="recordVisible">
              <recorderTool></recorderTool>
            </el-dialog>
          </el-col>
        </el-row>

        <div v-if="radioList.length > 0">
          <el-row style="padding: 0px 90px 0px 90px" :gutter="20">
            <el-col :span="8" v-for="(i, index) in radioList" :key="index">
              <el-radio-group v-model="radio" class="radioPics">
                <el-radio-button :label="String.fromCharCode(65 + index)" :disabled="disabled">
                  <el-row>
                    <el-col :span="24" style="text-align: center">
                      <el-image :src="i"></el-image>
                    </el-col>
                    <el-col :span="24" style="text-align: center">
                      <b>{{ String.fromCharCode(65 + index) }}</b>
                    </el-col>
                  </el-row>
                </el-radio-button>
              </el-radio-group>
              <div v-show="showAnswer">
                <div
                  v-if="String.fromCharCode(65 + index) == radio && String.fromCharCode(65 + index) != answer"
                  class="wrong"
                  style="margin: 0 auto; margin-top: 15px"
                >
                  <i class="fa fa-times"></i>
                </div>
                <div
                  v-else-if="String.fromCharCode(65 + index) == answer"
                  class="correct"
                  style="margin: 0 auto; margin-top: 15px"
                >
                  <i class="fa fa-check"></i>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="submit_button" v-show="showSubmit" @click="handleSubmit()">
          <i class="fa fa-check"></i>
        </div>
        <!-- </el-card> -->
      </el-col>
    </el-row>
    <!-- <el-row style="margin-top: 50px">
      <el-col :span="24" style="text-align: center">
        <el-pagination
          layout="prev, pager, next"
          :total="$store.state.currentQB.length*10"
          @prev-click="handlePrev"
          @next-click="handleNext"
          @current-change="handleCurrentChange"
          :current-page="questionNum"
        ></el-pagination>
      </el-col>
    </el-row>-->

    <!-- <div class="check_answer_button" @click="checkAnswer()">确认</div> -->
    <!-- <div class="skip_button" @click="skip()">不会做</div> -->

    <div class="test_footer">
      <el-progress :show-text="false" :stroke-width="2" :percentage="percentage"></el-progress>
      <div class="quit_button" @click="$router.push('/allCourses')">
        <i class="el-icon-close"></i> 放弃测试
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      section: "Reading",
      questionNum: 1,
      tag: 0,
      container: 0,
      title: "",
      src: null,
      answer: "",
      user_answer: "",
      radio: "",
      reading: "",
      ikon: [],
      audioName: "",
      isPlaying: false,
      question: "",
      selectQuestion: "",
      radioList: [],
      textareaFlag: 0,
      recordingFlag: 0,
      textarea2: "",
      textInput: "",
      answer_check: "",
      showOverview: false,
      showSubmit: false,
      showAnswer: false,
      playTapeVisible: false,
      recordVisible: false,
      disabled: false,
      changePlayStatus: "fa fa-play",
      percent: 0,
      currentTime: 0,
      percentage: 0
    };
  },
  mounted() {
    if (this.$store.state.currentQB.length == 0) {
      this.$store.state.currentQB = this.$store.state.qcData;
    }
    if (this.$store.state.currentQB == this.$store.state.sampleDataS) {
      this.$nextTick(() => {
        setInterval(this.audioTimeUpdate, 1000);
      });
    }
    if (this.$route.params.questionNum || this.$route.params.questionNum == 0) {
      this.questionNum = this.$route.params.questionNum + 1;
      this.showOverview = true;
      this.showAnswer = true;
      this.disabled = true;
    } else {
      this.questionNum = 1;
    }
    var questionNum = this.questionNum;
    if (questionNum == this.$store.state.currentQB.length) {
      if (this.$route.params.questionNum) {
        this.showSubmit = false;
      } else {
        this.showSubmit = true;
      }
    } else {
      this.showSubmit = false;
    }
    this.container = this.$store.state.currentQB[questionNum - 1].container;
    this.title = this.$store.state.currentQB[questionNum - 1].title;
    this.reading = this.$store.state.currentQB[questionNum - 1].reading;
    this.ikon = this.$store.state.currentQB[questionNum - 1].ikon;
    this.audioName = this.$store.state.currentQB[questionNum - 1].audioName;
    this.question = this.$store.state.currentQB[questionNum - 1].question;
    this.selectQuestion = this.$store.state.currentQB[
      questionNum - 1
    ].selectQuestion;
    this.src = this.$store.state.currentQB[questionNum - 1].src;
    this.radioList = this.$store.state.currentQB[questionNum - 1].radioList;
    this.textareaFlag = this.$store.state.currentQB[
      questionNum - 1
    ].textareaFlag;
    this.recordingFlag = this.$store.state.currentQB[
      questionNum - 1
    ].recordingFlag;
    this.answer = this.$store.state.currentQB[questionNum - 1].answer;
    this.radio = this.$store.state.user_answer_CB[questionNum - 1];
    this.textInput = this.$store.state.user_answer_CB[questionNum - 1];
    this.answer_check = this.$store.state.answer_check[questionNum - 1];
  },
  methods: {
    handleplay() {
      if (this.isPlaying == true) {
        this.audioName.pause();
      } else {
        this.audioName.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    playTape() {},
    record() {},
    handleCurrentChange(val) {
      if (this.radioList.length > 0) {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.radio;
      } else {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.textInput;
      }
      this.questionNum = parseInt(`${val}`);
      var questionNum = this.questionNum;
      if (questionNum == this.$store.state.currentQB.length) {
        if (
          this.$route.params.questionNum ||
          this.$route.params.questionNum == 0
        ) {
          this.showSubmit = false;
        } else {
          this.showSubmit = true;
        }
      } else {
        this.showSubmit = false;
      }
      if (this.$store.state.user_answer_CB[questionNum - 1]) {
        this.radio = this.$store.state.user_answer_CB[questionNum - 1];
        this.textInput = this.$store.state.user_answer_CB[questionNum - 1];
      } else {
        this.radio = "";
        this.textInput = "";
      }
      // if (this.isPlaying == true) {
      //   this.audioName.pause();
      // }
      this.isPlaying = false;
      this.container = this.$store.state.currentQB[questionNum - 1].container;
      this.title = this.$store.state.currentQB[questionNum - 1].title;
      this.reading = this.$store.state.currentQB[questionNum - 1].reading;
      this.ikon = this.$store.state.currentQB[questionNum - 1].ikon;
      this.audioName = this.$store.state.currentQB[questionNum - 1].audioName;
      this.question = this.$store.state.currentQB[questionNum - 1].question;
      this.selectQuestion = this.$store.state.currentQB[
        questionNum - 1
      ].selectQuestion;
      this.src = this.$store.state.currentQB[questionNum - 1].src;
      this.answer = this.$store.state.currentQB[questionNum - 1].answer;
      this.radioList = this.$store.state.currentQB[questionNum - 1].radioList;
      this.textareaFlag = this.$store.state.currentQB[
        questionNum - 1
      ].textareaFlag;
      this.recordingFlag = this.$store.state.currentQB[
        questionNum - 1
      ].recordingFlag;
      this.answer_check = this.$store.state.answer_check[questionNum - 1];
    },
    handlePrev(val) {
      if (this.radioList.length > 0) {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.radio;
      } else {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.textInput;
      }
      this.questionNum--;
      var questionNum = this.questionNum;
      if (this.$store.state.user_answer_CB[questionNum - 1]) {
        this.radio = this.$store.state.user_answer_CB[questionNum - 1];
        this.textInput = this.$store.state.user_answer_CB[questionNum - 1];
      } else {
        this.radio = "";
        this.textInput = "";
      }
      // if (this.isPlaying == true) {
      //   this.audioName.pause();
      // }
      this.isPlaying = false;
      this.container = this.$store.state.currentQB[questionNum - 1].container;
      this.title = this.$store.state.currentQB[questionNum - 1].title;
      this.reading = this.$store.state.currentQB[questionNum - 1].reading;
      this.ikon = this.$store.state.currentQB[questionNum - 1].ikon;
      this.audioName = this.$store.state.currentQB[questionNum - 1].audioName;
      this.question = this.$store.state.currentQB[questionNum - 1].question;
      this.selectQuestion = this.$store.state.currentQB[
        questionNum - 1
      ].selectQuestion;
      this.src = this.$store.state.currentQB[questionNum - 1].src;
      this.answer = this.$store.state.currentQB[questionNum - 1].answer;
      this.radioList = this.$store.state.currentQB[questionNum - 1].radioList;
      this.textareaFlag = this.$store.state.currentQB[
        questionNum - 1
      ].textareaFlag;
      this.recordingFlag = this.$store.state.currentQB[
        questionNum - 1
      ].recordingFlag;
      this.answer_check = this.$store.state.answer_check[questionNum - 1];
    },
    handleNext(val) {
      if (this.radioList.length > 0) {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.radio;
      } else {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.textInput;
      }
      this.questionNum++;
      var questionNum = this.questionNum;
      if (questionNum == this.$store.state.currentQB.length) {
        if (this.$route.params.questionNum) {
          this.showSubmit = false;
        } else {
          this.showSubmit = true;
        }
      } else {
        this.showSubmit = false;
      }
      if (this.$store.state.user_answer_CB[questionNum - 1]) {
        this.radio = this.$store.state.user_answer_CB[questionNum - 1];
        this.textInput = this.$store.state.user_answer_CB[questionNum - 1];
      } else {
        this.radio = "";
        this.textInput = "";
      }
      // if (this.isPlaying == true) {
      //   this.audioName.pause();
      // }
      this.isPlaying = false;
      this.container = this.$store.state.currentQB[questionNum - 1].container;
      this.title = this.$store.state.currentQB[questionNum - 1].title;
      this.reading = this.$store.state.currentQB[questionNum - 1].reading;
      this.ikon = this.$store.state.currentQB[questionNum - 1].ikon;
      this.audioName = this.$store.state.currentQB[questionNum - 1].audioName;
      this.question = this.$store.state.currentQB[questionNum - 1].question;
      this.selectQuestion = this.$store.state.currentQB[
        questionNum - 1
      ].selectQuestion;
      this.src = this.$store.state.currentQB[questionNum - 1].src;
      this.answer = this.$store.state.currentQB[questionNum - 1].answer;
      this.radioList = this.$store.state.currentQB[questionNum - 1].radioList;
      this.textareaFlag = this.$store.state.currentQB[
        questionNum - 1
      ].textareaFlag;
      this.recordingFlag = this.$store.state.currentQB[
        questionNum - 1
      ].recordingFlag;
      this.answer_check = this.$store.state.answer_check[questionNum - 1];
    },
    checkAnswer() {
      if (this.radioList.length > 0) {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.radio;
      } else {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.textInput;
      }
      this.questionNum++;
      var questionNum = this.questionNum;
      this.percentage =
        (questionNum / this.$store.state.currentQB.length) * 100;
      if (questionNum == this.$store.state.currentQB.length) {
        if (this.$route.params.questionNum) {
          this.showSubmit = false;
        } else {
          this.showSubmit = true;
        }
      } else {
        this.showSubmit = false;
      }
      if (this.$store.state.user_answer_CB[questionNum - 1]) {
        this.radio = this.$store.state.user_answer_CB[questionNum - 1];
        this.textInput = this.$store.state.user_answer_CB[questionNum - 1];
      } else {
        this.radio = "";
        this.textInput = "";
      }
      // if (this.isPlaying == true) {
      //   this.audioName.pause();
      // }
      this.isPlaying = false;
      this.container = this.$store.state.currentQB[questionNum - 1].container;
      this.title = this.$store.state.currentQB[questionNum - 1].title;
      this.reading = this.$store.state.currentQB[questionNum - 1].reading;
      this.ikon = this.$store.state.currentQB[questionNum - 1].ikon;
      this.audioName = this.$store.state.currentQB[questionNum - 1].audioName;
      this.question = this.$store.state.currentQB[questionNum - 1].question;
      this.selectQuestion = this.$store.state.currentQB[
        questionNum - 1
      ].selectQuestion;
      this.src = this.$store.state.currentQB[questionNum - 1].src;
      this.answer = this.$store.state.currentQB[questionNum - 1].answer;
      this.radioList = this.$store.state.currentQB[questionNum - 1].radioList;
      this.textareaFlag = this.$store.state.currentQB[
        questionNum - 1
      ].textareaFlag;
      this.recordingFlag = this.$store.state.currentQB[
        questionNum - 1
      ].recordingFlag;
      this.answer_check = this.$store.state.answer_check[questionNum - 1];
    },
    skip() {
      if (this.radioList.length > 0) {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.radio;
      } else {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.textInput;
      }
      this.questionNum++;
      var questionNum = this.questionNum;
      this.percentage =
        (questionNum / this.$store.state.currentQB.length) * 100;
      if (questionNum == this.$store.state.currentQB.length) {
        if (this.$route.params.questionNum) {
          this.showSubmit = false;
        } else {
          this.showSubmit = true;
        }
      } else {
        this.showSubmit = false;
      }
      if (this.$store.state.user_answer_CB[questionNum - 1]) {
        this.radio = this.$store.state.user_answer_CB[questionNum - 1];
        this.textInput = this.$store.state.user_answer_CB[questionNum - 1];
      } else {
        this.radio = "";
        this.textInput = "";
      }
      // if (this.isPlaying == true) {
      //   this.audioName.pause();
      // }
      this.isPlaying = false;
      this.container = this.$store.state.currentQB[questionNum - 1].container;
      this.title = this.$store.state.currentQB[questionNum - 1].title;
      this.reading = this.$store.state.currentQB[questionNum - 1].reading;
      this.ikon = this.$store.state.currentQB[questionNum - 1].ikon;
      this.audioName = this.$store.state.currentQB[questionNum - 1].audioName;
      this.question = this.$store.state.currentQB[questionNum - 1].question;
      this.selectQuestion = this.$store.state.currentQB[
        questionNum - 1
      ].selectQuestion;
      this.src = this.$store.state.currentQB[questionNum - 1].src;
      this.answer = this.$store.state.currentQB[questionNum - 1].answer;
      this.radioList = this.$store.state.currentQB[questionNum - 1].radioList;
      this.textareaFlag = this.$store.state.currentQB[
        questionNum - 1
      ].textareaFlag;
      this.recordingFlag = this.$store.state.currentQB[
        questionNum - 1
      ].recordingFlag;
      this.answer_check = this.$store.state.answer_check[questionNum - 1];
    },
    handleSubmit() {
      if (this.radioList.length > 0 && this.radioList.length < 4) {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.radio;
      } else if (this.radioList.length >= 4) {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.radio;
      } else {
        this.$store.state.user_answer_CB[this.questionNum - 1] = this.textInput;
      }
      for (var i = 0; i < this.$store.state.currentQB.length; i++) {
        if (
          this.$store.state.user_answer_CB[i] &&
          this.$store.state.currentQB[i].answer.includes(
            this.$store.state.user_answer_CB[i]
          )
        ) {
          this.$store.state.answer_check.push(1);
        } else {
          this.$store.state.answer_check.push(0);
        }
      }
      this.$router.push("/QB/result");
    },
    sliderChange(val) {
      this.audioName.currentTime =
        (this.percent / 100) * this.audioName.duration;
    },
    //后退
    fastBack() {
      this.percent--;
      this.audioName.currentTime =
        (this.percent / 100) * this.audioName.duration;
    },
    //改变播放状态
    changeStatus() {
      if (this.isPlaying == true) {
        this.audioName.pause();
        this.changePlayStatus = "fa fa-play";
      } else {
        this.audioName.play();
        this.changePlayStatus = "fa fa-pause";
      }
      this.isPlaying = !this.isPlaying;
    },
    //快进
    forward() {
      this.percent++;
      this.audioName.currentTime =
        (this.percent / 100) * this.audioName.duration;
    },
    // 进度条更新
    audioTimeUpdate(val, oldVal) {
      this.percent =
        (this.audioName.currentTime / this.audioName.duration) * 100;
    },
    //播放结束 修改播放状态
    audioEnd() {
      this.playing = false;
    }
    //点击进度条
  }
};
</script>

<style scoped>
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.el-button {
  font-size: 1em;
}

.box-card {
  height: 420px;
  border: none;
  box-shadow: 4px 4px 10px #00000029;
}

.block {
  max-width: 350px;
  height: 375px;
  margin-left: 400px;
  display: flex;
}

.block .el-image {
  max-width: 300px;
  margin: 0 auto;
  align-self: center;
}

.title {
  padding: 0px 40px;
  padding-top: 10px;
  font-size: 1.1em;
  font-weight: bold;
  font-family: "Lato";
  line-height: 25px;
}

.reading_container {
  height: 290px;
  margin: 0 auto;
  margin-top: 20px;
}

.reading {
  line-height: 20px;
  text-align: justify;
  padding: 0px 40px;
  font-size: 0.9em;
  font-family: "Lato";
  color: #3e3e3e;
}

.question {
  font-family: "Lato";
  color: #3e3e3e;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  padding-top: 155px;
  padding-left: 103px;
  padding-bottom: 32px;
  line-height: 18px;
}

.textInput {
  line-height: 10px;
  margin-top: 40px;
  padding-left: 52px;
}

.textInput .el-input >>> .el-input__inner {
  border: none;
  border-bottom: 2px solid #dcdfe6;
  border-radius: 0px;
  padding: 0px;
  padding-left: 5px;
  height: 25px;
}

.textInput >>> .el-input.is-disabled .el-input__inner {
  background-color: white;
}

.textInput .el-input >>> .el-input__inner:focus {
  border: none;
  border-bottom: 2px solid #f7b248;
}

.sound {
  margin-top: 40px;
}

.sound .el-button {
  font-size: 6em;
}

.sound >>> .el-dialog__wrapper {
  left: 120px !important;
}

.sound >>> .el-dialog {
  height: 240px;
  border: 10px solid #f7b248;
  border-radius: 5px;
}

.sound >>> .el-dialog__header {
  padding: 0px 0px;
}

.sound >>> .el-dialog__body {
  padding: 0px 0px;
}

.microphone {
  padding-top: 50px;
}

.microphone .el-button {
  border: 6px solid#f7b248;
  font-size: 3em;
  height: 100px;
  width: 100px;
}

.playButton {
  text-align: center;
  font-size: 0.3em;
}

/* .microphone .el-dialog__body {
} */

.el-pagination >>> button:disabled {
  color: #fce3b0;
}

.el-pagination >>> .btn-next,
.btn-prev {
  color: #f7b248;
}

.el-pagination >>> .btn-prev {
  color: #f7b248;
}

.el-pagination >>> .el-pager li {
  color: #f7b248;
  line-height: 28px;
  font-size: 20px;
  font-family: "Lato";
}

.el-pagination >>> .el-pager li:hover {
  color: #b98636;
}

.el-pagination >>> .el-pager li.active {
  background: #fce3b0;
  border-radius: 25px;
  height: 28px;
  min-width: 28px;
}

.box-card-question {
  width: 653px;
  height: 815px;
  margin: 0 auto;
  margin-top: 88px;
}

.box-card-question .box-card {
  height: 540px;
}

.box-card-question .box-card >>> .el-card__body {
  padding: 0px 0px;
}

.el-card {
  border-radius: 12px;
}

.questionNum_container {
  width: 100px;
  height: 100px;
  background: #fce3b0a1 0% 0% no-repeat padding-box;
  /* padding: 0px 0px; */
  border-radius: 0px 0px 0px 100px;
  float: right;
  text-align: center;
  padding: 15px 0px 0px 7px;
}

.questionNum {
  font-family: "Lato";
  color: rgb(250, 206, 137);
  font-weight: bold;
  font-size: 20px;
}

.el-radio {
  margin-left: 103px;
}

.el-radio >>> .el-radio__label {
  font-size: 20px;
  color: #3c3c3c;
  padding-left: 21px;
}

.el-radio >>> .el-radio__input {
  line-height: 20px;
}

.el-radio >>> .el-radio__inner {
  width: 20px;
  height: 20px;
}

.el-radio >>> .el-radio__inner::after {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #f7b248;
}

.el-radio >>> .el-radio__input.is-checked .el-radio__inner {
  border-color: #f7b248;
  background: white;
}

.el-radio-button.is-active {
  box-shadow: 4px 4px 10px #00000029;
  background: #fce3b0;
  /* border-radius: 0px 25px 25px 0px; */
}

.el-radio-button >>> .el-radio-button__inner {
  font-family: "Microsoft Yahei";
  font-weight: 400;
  border: none;
  color: #3e3e3e;
  font-size: 20px;
  white-space: normal;
  text-align: left;
  width: 600px;
  /* line-height: 20px; */
}

/* .el-radio-button.is-active:before {
  content: "";
  border: 20px solid transparent;
  border-left-color: #fce3b0;
  position: absolute;
  left: 100%;
  height: 4px;
} */

.el-radio-button:first-child:last-child >>> .el-radio-button__inner {
  border-radius: 0;
  /* border-radius: 0px 25px 25px 0px; */
}

.el-radio-button
  >>> .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  background-color: #fce3b0;
  transition: 0.2s;
  border-left: 10px solid #f7b248;
  /* border-radius: 0px 25px 25px 0px; */
}

.radioPics
  .el-radio-button
  >>> .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  background-color: #fce3b0;
  transition: 0.2s;
  border-left: none;
  border-top: 10px solid #f7b248;
  /* border-radius: 0px 25px 25px 0px; */
}

.radioPics .el-radio-button >>> .el-radio-button__inner {
  font-family: "Microsoft Yahei";
  font-weight: 400;
  border: none;
  color: #3e3e3e;
  font-size: 15px;
  white-space: normal;
  text-align: left;
  width: 100%;
  line-height: 20px;
}

.submit_button {
  position: absolute;
  right: 0;
  bottom: -60px;
  border-radius: 75px;
  width: 130px;
  height: 130px;
  background: #f7b248;
  cursor: pointer;
  transition: all 0.2s linear;
}

.submit_button:hover {
  border: 3px solid #fce3b0;
  transition: all 0.2s linear;
}

.submit_button i {
  font-size: 5em;
  position: absolute;
  right: 25px;
  bottom: 25px;
  color: white;
}

.correct {
  background: #21ba45;
  width: 30px;
  height: 30px;
  color: white;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  font-size: 1.4em;
}
.wrong {
  background: #db2828;
  width: 30px;
  height: 30px;
  color: white;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
  font-size: 1.4em;
}

.scrollbar {
  height: 100%;
}

.scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}

.check_answer_button {
  position: absolute;
  top: 538px;
  left: 890px;
  width: 140px;
  height: 45px;
  font-size: 18px;
  font-family: "puhui-light";
  text-align: center;
  color: white;
  background: #f7b248 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #be8b3e;
  border-radius: 12px;
  padding-top: 8px;
  cursor: pointer;
  opacity: 1;
}

.skip_button {
  position: absolute;
  top: 666px;
  left: 984px;
  width: 140px;
  height: 45px;
  font-size: 18px;
  font-family: "puhui-light";
  text-align: center;
  color: #c0c4cc;
  box-shadow: 0px 3px 0px #c0c4cc;
  border: 2px solid #c0c4cc;
  border-radius: 12px;
  padding-top: 6px;
  cursor: pointer;
  opacity: 1;
}

.test_footer {
  position: absolute;
  bottom: 0;
  width: 1920px;
  height: 135px;
  background: white;
  z-index: 999;
}

.quit_button {
  position: absolute;
  top: 45px;
  right: 143px;
  width: 140px;
  height: 45px;
  font-size: 18px;
  font-family: "puhui-light";
  text-align: center;
  letter-spacing: 0px;
  color: #c0c4cc;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #c0c4cc;
  border: 2px solid #c0c4cc;
  border-radius: 12px;
  padding-top: 6px;
  cursor: pointer;
  opacity: 1;
}
</style>