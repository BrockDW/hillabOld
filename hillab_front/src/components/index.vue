<template>
  <div>
    <el-container>
      <el-header>
        <normal-header></normal-header>
      </el-header>
      <el-main>
        <transition name="el-fade-in-linear" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import header_normal from "@/components/header/header_normal";

export default {
  name: "container",

  components: {
    "normal-header": header_normal
  }
};
</script>

<style scoped>
.el-header {
  height: 100px !important;
  background: #ffffff;
  border-bottom: 2px solid #e5e5e5;
  padding: 0 0 !important;
}

.el-main {
  position: absolute;
  margin-top: 100px;
  width: 100%;
  height: calc(100% - 100px);
  padding: 0 0;
}
</style>