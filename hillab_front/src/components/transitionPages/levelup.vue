<template>
  <div>
    <div class="levelup_ikon_container">
      <img style="width: 500px;" src="@/assets/ikon/levelup.svg" />
    </div>
    <div class="unlock_text">UNLOCK LEVEL {{ $store.state.currentLevel.levelNum }}</div>
    <div class="start_button_container">开始</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.levelup_ikon_container {
  text-align: center;
  padding-top: 270px;
}

.unlock_text {
  text-align: center;
  color: #3c3c3c;
  font-size: 16px;
  letter-spacing: 6px;
}

.start_button_container {
  width: 110px;
  height: 36px;
  font-size: 14px;
  font-family: "puhui-light";
  line-height: 36px;
  color: white;
  text-align: center;
  background: #f7b248 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #be8b3e;
  border-radius: 8px;
  opacity: 1;
  margin: 0 auto;
  margin-top: 40px;
  cursor: pointer;
}
</style>