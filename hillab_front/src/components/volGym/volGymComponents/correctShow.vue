<template>
  <div class="correctShow_container">
    <i class="fas fa-check-circle"></i>
    &nbsp;{{ $store.state.volcabularyDB[$store.state.currentWordNum].word }}
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.correctShow_container {
  font-size: 28px;
  letter-spacing: 0px;
  color: #21ba45;
  opacity: 1;
  margin-top: 10px;
}
</style>