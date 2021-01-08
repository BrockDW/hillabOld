<template>
  <div id="app">
    <div class="web_mainBlockBG_container">
      <img src="@/assets/ikon/mainBlockBG.svg" />
    </div>
    <transition name="el-fade-in-linear" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url(../node_modules/@fortawesome/fontawesome-free/css/all.css);

@font-face {
  font-family: "lato";
  src: url("assets/fonts/Lato2OFL/lato-Regular.ttf");
}
@font-face {
  font-family: "lato-Black";
  src: url("assets/fonts/Lato2OFL/lato-Black.ttf");
}
@font-face {
  font-family: "puhui";
  src: url("assets/fonts/PuHui/Alibaba-PuHuiTi-Regular.otf");
}

@font-face {
  font-family: "puhui-light";
  src: url("assets/fonts/PuHui/Alibaba-PuHuiTi-Light.otf");
}

@font-face {
  font-family: "puhui-medium";
  src: url("assets/fonts/PuHui/Alibaba-PuHuiTi-Medium.otf");
}

@font-face {
  font-family: "canela";
  src: url("assets/fonts/Canela/canela-roman-1.otf");
}

body,
html,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "lato", "puhui", "Microsoft Yahei", sans-serif;
}

:focus {
  outline: none;
}

.web_mainBlockBG_container img {
  position: absolute;
  width: 100%;
  z-index: -1;
}
</style>
