<template>
  <div class="input_container">
    <el-input
      type="text"
      v-select="true"
      v-model="childUserAnswer"
      autocomplete="off"
      checked="checked"
    ></el-input>
  </div>
</template>

<script>
export default {
  directives: {
    select: {
      inserted: function(el, binding) {
        el.querySelector("input").select();
      }
    }
  },

  data() {
    return {
      childUserAnswer: ""
    };
  },

  watch: {
    childUserAnswer(val) {
      this.$emit("childUserAnswer", this.childUserAnswer);
    }
  }
};
</script>

<style scoped>
.input_container {
  width: 370px;
  margin-top: 10px;
}

.input_container .el-input >>> .el-input__inner:focus {
  outline: none;
  border-bottom: 2px solid #f7b248;
  transition: all 0.2s;
}

.input_container .el-input >>> .el-input__inner {
  font-size: 26px;
  border-radius: 0px;
  border: none;
  border-bottom: 2px solid #707070;
  color: #3c3c3c;
  transition: all 0.2s;
}

.input_container .el-input {
  font-size: 20px;
}
</style>