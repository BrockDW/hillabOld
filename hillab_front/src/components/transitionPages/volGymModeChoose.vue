<template>
  <div>
    <div class="end_button_container" @click="$router.push('/level')">
      <i class="fas fa-times"></i>
    </div>
    <div class="guide">第{{1}}关（{{ $store.state.volcabularyDB.length }}个）</div>

    <el-row style="margin-top: 80px;">
      <el-col :span="8" :offset="4">
        <div class="learnFirstly" @click="toStudyMode()">
          <div class="learnFirstly_ikon_container">
            <img src="@/assets/ikon/learnFirstly.svg" />
          </div>
          <div class="learnFirstly_text">学习模式</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="startTest" @click="toMemorizeMode()">
          <div class="startTest_ikon_container">
            <img src="@/assets/ikon/startTest.svg" />
          </div>
          <div class="startTest_text">记忆模式</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "volGym_start",

  methods: {
    toStudyMode() {
      this.$router.push("/volGym/studyMode");
    },
    toMemorizeMode() {
      this.$router.push("/volGym/memorizeMode");
    }
  }
};
</script>

<style scoped>
.end_button_container {
  position: absolute;
  top: 36px;
  left: 70px;
  font-size: 46px;
  color: #e5e5e5;
  cursor: pointer;
  transition: all 0.2s;
}

.guide {
  text-align: center;
  font-size: 24px;
  color: #3c3c3c;
  padding-top: 120px;
}

.learnFirstly_ikon_container {
  text-align: center;
}

.startTest_ikon_container {
  text-align: center;
}

.learnFirstly_ikon_container img {
  width: 210px;
  margin-top: 40px;
}

.startTest_ikon_container img {
  width: 280px;
  margin-top: 40px;
}

.learnFirstly {
  width: 400px;
  height: 360px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #00000029;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 auto;
}

.startTest {
  width: 400px;
  height: 360px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #00000029;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 auto;
}

.learnFirstly_text,
.startTest_text {
  text-align: center;
  font-size: 22px;
  color: #3c3c3c;
  padding-top: 58px;
}
</style>