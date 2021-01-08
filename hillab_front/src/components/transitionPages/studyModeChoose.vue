<template>
  <div>
    <div class="brand_name">
      <span class="logo_container">
        <img class="logo" src="@/assets/logo.png" />
      </span>
      Hillab
    </div>

    <transition
      name="custom-classes-transition"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div class="welcome_text" v-show="welcome_show">英语方面，我是......</div>
    </transition>

    <el-row :gutter="20">
      <transition name="el-fade-in" mode="out-in">
        <el-col :span="4" :offset="8">
          <div class="beginner" v-show="beginner_show" @click="toBeginner()">
            <img src="@/assets/ikon/beginner.svg" />
            <div class="beginner_text">初步学习者</div>
          </div>
        </el-col>
      </transition>

      <transition name="el-fade-in" mode="out-in">
        <el-col :span="4">
          <div class="advanced" v-show="advanced_show" @click="toAdvanced()">
            <img src="@/assets/ikon/advanced.svg" />
            <div class="advanced_text">进阶学习者</div>
          </div>
        </el-col>
      </transition>
    </el-row>

    <transition name="el-fade-in" mode="out-in">
      <div class="beginner_welcome_text" v-show="beginner_welcome_show">
        从第一个知识点
        <span style="color: #3C3C3C">主语</span> 开始学习吧！
      </div>
    </transition>

    <transition name="el-fade-in" mode="out-in">
      <div class="advanced_welcome_text" v-show="advanced_welcome_show">做个 10 分钟的测试来解锁关卡吧！</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      welcome_show: true,
      beginner_show: true,
      advanced_show: true,
      beginner_welcome_show: false,
      advanced_welcome_show: false
    };
  },

  methods: {
    test() {
      this.welcome_show = !this.welcome_show;
      this.beginner_show = !this.beginner_show;
      this.advanced_show = !this.advanced_show;
      this.beginner_welcome_show = !this.beginner_welcome_show;
    },

    toBeginner() {
      this.welcome_show = !this.welcome_show;
      this.beginner_show = !this.beginner_show;
      this.advanced_show = !this.advanced_show;
      this.beginner_welcome_show = !this.beginner_welcome_show;
      var router = this.$router;
      window.setTimeout(function() {
        // router.push("/contents");
      }, 2000);
    },

    toAdvanced() {
      this.welcome_show = !this.welcome_show;
      this.beginner_show = !this.beginner_show;
      this.advanced_show = !this.advanced_show;
      this.advanced_welcome_show = !this.advanced_welcome_show;
      var router = this.$router;
      window.setTimeout(function() {
        // router.push("/test");
      }, 2000);
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.brand_name {
  font-size: 40px;
  font-weight: bold;
  font-family: "puhui";
  color: #f7b248;
  padding: 40px 0px 0px 100px;
}

.brand_name_cn {
  font-size: 40px;
  font-weight: normal;
  color: #f7b248;
}

.logo {
  width: 40px;
}

.logo_container img {
  vertical-align: baseline;
}

.welcome_text {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 0.96px;
  color: #f7b248;
  opacity: 1;
  margin-top: 110px;
}

.beginner,
.advanced {
  width: 100%;
  height: 160px;
  text-align: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #00000029;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
  opacity: 1;
  cursor: pointer;
  margin-top: 60px;
}

.beginner img {
  width: 150px;
  padding-top: 40px;
}

.advanced img {
  width: 150px;
  padding-top: 24px;
}

.beginner_text,
.advanced_text {
  text-align: center;
  font-size: 20px;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
  padding-top: 20px;
}

.beginner_welcome_text,
.advanced_welcome_text {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.96px;
  color: #f7b248;
  margin-top: 15%;
}
</style>