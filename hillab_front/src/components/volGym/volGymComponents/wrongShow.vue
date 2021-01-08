<template>
  <div class="wrongShow_container">
    <i class="fas fa-times-circle"></i>
    &nbsp;{{ userAnswer }}
  </div>
</template>

<script>
export default {
  props: ["userAnswer"]
};
</script>

<style scoped>
.wrongShow_container {
  font-size: 28px;
  letter-spacing: 0px;
  color: #db2828;
  opacity: 1;
  margin-top: 10px;
}
</style>