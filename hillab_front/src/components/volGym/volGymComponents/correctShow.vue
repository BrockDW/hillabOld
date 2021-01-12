<template>
  <div class="correctShow_container">
    <i class="fas fa-check-circle"></i>
    &nbsp;{{ word_shuffled_list[0].word }}
  </div>
</template>

<script>
export default {
  props: ["word_shuffled_list"]
};
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