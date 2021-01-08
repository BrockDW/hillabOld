<template>
  <div>
    <div class="course_block">
      <div class="unitNumber_container">
        <div class="unitNumber">Level {{ $store.state.currentLevel.levelNum }}</div>
      </div>
      <div class="levelSwitch_button_container" @click="lastLevel()" style="left: -17px">
        <i class="fas fa-chevron-left" style="padding-left: 8px;"></i>
      </div>
      <div class="levelSwitch_button_container" @click="nextLevel()" style="right: -17px">
        <i class="fas fa-chevron-right" style="padding-left: 10px;"></i>
      </div>
      <el-row>
        <transition mode="out-in">
          <div v-show="unlocked_show" style="margin-top: 50px">
            <el-col :span="8" style="padding-left: 60px">
              <div class="unit_title">
                <i class="fas fa-puzzle-piece" style="font-size: 26px;"></i>&nbsp;&nbsp;语法元素
              </div>
              <el-row class="units_title_container">
                <el-col
                  :span="24"
                  style="margin-bottom: 16px"
                  v-for="(item, index) in $store.state.currentLevel.grammer_element"
                  :key="index"
                >
                  <div v-if="item.proficiency!=3">
                    <span style="vertical-align: middle;">
                      <el-progress
                        type="circle"
                        :width="20"
                        :stroke-width="3"
                        :show-text="false"
                        :percentage="item.percentage"
                        color="#21BA45"
                      ></el-progress>
                      <span class="study_times">{{ item.proficiency }}</span>
                    </span>
                    <span class="units_title" @click="toContent(item.unit)">
                      <span :class="{done: item.percentage==100}">{{ item.unit }}</span>
                    </span>
                  </div>
                  <div v-if="item.proficiency==3">
                    <div class="isProficiency">
                      <i class="fas fa-star"></i>
                      &nbsp;
                      {{ item.unit }}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8" style="padding-left: 20px">
              <div class="unit_title">
                <i class="fas fa-sitemap" style="font-size: 20px"></i>&nbsp;&nbsp;句子结构
              </div>
              <el-row class="units_title_container">
                <el-col
                  :span="24"
                  style="margin-bottom: 14px"
                  v-for="(item, index) in $store.state.currentLevel.sentence_structure"
                  :key="index"
                >
                  <span style="vertical-align:middle;">
                    <el-progress
                      type="circle"
                      :width="20"
                      :stroke-width="3"
                      :show-text="false"
                      :percentage="item.percentage"
                      color="#21BA45"
                    ></el-progress>
                    <span class="study_times">{{ item.proficiency }}</span>
                  </span>
                  <span class="units_title">
                    <span :class="{done: item.percentage==100}">{{ item.unit }}</span>
                  </span>
                </el-col>
              </el-row>
              <div class="unit_title">
                <i class="fas fa-dumbbell" style="font-size: 20px"></i>&nbsp;&nbsp;单词健身房
              </div>
              <el-row class="units_title_container">
                <el-col
                  :span="24"
                  style="margin-bottom: 20px"
                  v-for="(item, index) in $store.state.currentLevel.volGym"
                  :key="index"
                >
                  <span style="vertical-align:middle;">
                    <el-progress
                      type="circle"
                      :width="20"
                      :stroke-width="3"
                      :show-text="false"
                      :percentage="item.percentage"
                      color="#21BA45"
                    ></el-progress>
                    <span class="study_times">{{ item.proficiency }}</span>
                  </span>
                  <span class="units_title">
                    <span :class="{done: item.percentage==100}">{{ item.unit }}</span>
                  </span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <img style="width: 200px; margin-top: 50px" src="@/assets/ikon/allCoursesIkon.svg" />
              <div class="randomExercise_button_container">
                <el-button>
                  <img style="width: 20px" :src="require('@/assets/icon/shuffle.svg')" /> 随机练习
                </el-button>
              </div>
            </el-col>
          </div>
        </transition>
        <transition mode="out-in">
          <div v-show="locked_show" style="margin-top: 50px">
            <el-row>
              <el-col :span="12">
                <div class="unlockedIkon_container">
                  <img style="width: 280px" src="@/assets/ikon/unlockedIkon.svg" />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="unlock_text">本单元内容还未解锁哦</div>
                <div class="unlock_button_container">测试解锁</div>
              </el-col>
            </el-row>
          </div>
        </transition>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  data() {
    return {
      unlocked_show: true,
      locked_show: false,
      currentLevel: 0
    };
  },

  mounted() {
    this.$store.state.currentLevel = this.$store.state.levels[
      this.currentLevel
    ];
  },

  methods: {
    lastLevel() {
      if (this.$store.state.currentLevel == this.$store.state.levels[0]) {
        this.$message({
          message: "前面没有内容了哦w(ﾟДﾟ)w",
          type: "info"
        });
      } else {
        this.currentLevel--;
        this.$store.state.currentLevel = this.$store.state.levels[
          this.currentLevel
        ];
        if (this.$store.state.currentLevel.unlocked == false) {
          this.unlocked_show = false;
          this.locked_show = true;
        } else {
          this.unlocked_show = true;
          this.locked_show = false;
        }
      }
    },
    nextLevel() {
      if (
        this.$store.state.currentLevel ==
        this.$store.state.levels[this.$store.state.levels.length - 1]
      ) {
        this.$message({
          message: "这已经是最后一个Level了哦w(ﾟДﾟ)w",
          type: "info"
        });
      } else {
        this.currentLevel++;
        this.$store.state.currentLevel = this.$store.state.levels[
          this.currentLevel
        ];
        if (this.$store.state.currentLevel.unlocked == false) {
          this.unlocked_show = false;
          this.locked_show = true;
        } else {
          this.unlocked_show = true;
          this.locked_show = false;
        }
      }
    },
    toContent(unit) {
      this.$router.push("/contents");
      // this.$router.push("/consolidate")
    }
  }
};
</script>

<style scoped>
.course_block {
  position: relative;
  width: 880px;
  height: 450px;
  border: 1px solid var(--mercury);
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
  opacity: 1;
  margin: 0 auto;
  margin-top: 6%;
}

.unitNumber_container {
  float: right;
  width: 90px;
  height: 50px;
  background: #fdedcd 0% 0% no-repeat padding-box;
  text-align: center;
  border-radius: 0px 12px;
  opacity: 1;
}

.unitNumber {
  font-size: 18px;
  font-weight: bold;
  line-height: 50px;
  color: #f7b248;
  opacity: 0.5;
}

.unit_title_icon {
  color: #f7b248;
}

.unit_title {
  font-size: 28px;
  font-weight: bold;
  color: #f7b248;
  margin-bottom: 20px;
}

.units_title_container {
  width: 220px;
}

.units_title {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  font-family: "puhui-light";
  color: #3c3c3c;
  cursor: pointer;
  transition: all 0.2s;
}

.units_title:hover {
  color: #f7b248;
  transition: all 0.2s;
}

.units_title i {
  font-size: 18px;
}

.randomExercise_button_container {
  margin-top: 50px;
  margin-left: 40px;
}

.randomExercise_button_container .el-button {
  width: 120px;
  height: 40px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 0px #f7b248;
  border: 2px solid #f7b248;
  border-radius: 10px;
  font-size: 14px;
  letter-spacing: 0px;
  color: #f7b248;
  opacity: 1;
  padding: 0 0;
}

.levelSwitch_button_container {
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
}

.levelSwitch_button_container {
  font-size: 18px;
  color: #fff;
  padding-top: 2px;
  cursor: pointer;
}

.done {
  color: #21ba45;
}

.finished {
  display: none;
}

.right_bottom_button .el-button {
  width: 80px;
  height: 80px;
  color: #fff;
  font-size: 24px;
  background: transparent
    linear-gradient(180deg, var(--casablanca) 0%, var(--casablanca) 100%) 0% 0%
    no-repeat padding-box;
  background: transparent linear-gradient(180deg, #f7b248 0%, #f7b248 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 10px solid #ffffff;
  opacity: 1;
}

.study_times {
  position: absolute;
  left: 6px;
  font-size: 6px;
  font-family: "puhui-light";
  color: #21ba45;
  padding-top: 3px;
}

.isProficiency {
  width: 80%;
  height: 30px;
  color: white;
  font-size: 16px;
  line-height: 30px;
  background: transparent
    linear-gradient(180deg, #f7cd68 0%, #f7c66c 50%, #faab7d 100%) 0% 0%
    no-repeat padding-box;
  border-radius: 4px;
  padding-left: 10px;
  opacity: 1;
  cursor: pointer;
}

.unlockedIkon_container {
  padding: 50px 0px 0px 120px;
}

.unlock_text {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #f7b248;
  opacity: 1;
  margin: 120px 0px 0px 60px;
}

.unlock_button_container {
  width: 120px;
  height: 38px;
  font-size: 16px;
  font-family: "puhui-light";
  line-height: 38px;
  text-align: center;
  color: white;
  background: #f7b248 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 0px #be8b3e;
  border-radius: 8px;
  opacity: 1;
  cursor: pointer;
  margin: 30px 0px 0px 100px;
}
</style>