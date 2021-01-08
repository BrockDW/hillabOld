<template>
  <el-row>
    <el-col :span="4">
      <div style="cursor: pointer;" @click="$router.push('/index')">
        <div class="brand_logo">
          <img src="@/assets/logo.png" />
        </div>
        <div class="brand_name">Hillab</div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="userInfo_block">
        <div class="starIcon_container">
          <i class="fas fa-star" />
        </div>
        <div class="starCount_userData">{{ $store.state.starCount }}</div>
        <div class="timeIcon_container">
          <i class="fas fa-clock" />
        </div>
        <div class="timeCount_userData">{{ $store.state.studyTimeCount }} hr</div>
        <div class="avatar_container" @click="$router.push('/profile')">
          <el-avatar :size="48" :src="$store.state.avatar"></el-avatar>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "header_normal",

  data() {
    return {};
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.brand_logo {
  position: absolute;
  top: 40px;
  left: 160px;
}

.brand_logo img {
  width: 28px;
}

.brand_name {
  position: absolute;
  top: 32px;
  left: 200px;
  font-size: 26px;
  font-weight: bold;
  font-family: "puhui";
  color: #f7b248;
  letter-spacing: 1px;
}

.starIcon_container {
  position: absolute;
  top: 38px;
  right: 425px;
}

.timeIcon_container {
  position: absolute;
  top: 38px;
  right: 320px;
}

.starIcon_container i {
  font-size: 26px;
  color: #f7b248;
}

.timeIcon_container i {
  font-size: 26px;
  color: #f7b248;
}

.avatar_container {
  position: absolute;
  top: 28px;
  right: 160px;
  cursor: pointer;
}

.starCount_userData {
  position: absolute;
  top: 36px;
  right: 380px;
  font-size: 20px;
  font-weight: 600;
}

.timeCount_userData {
  position: absolute;
  top: 36px;
  right: 260px;
  font-size: 20px;
  font-weight: 600;
}

.el-avatar {
  background: #f7b248;
}
</style>