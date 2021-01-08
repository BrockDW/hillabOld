<template>
  <div class="form_container">
    <div class="welcome_text_container">
      欢迎来到
      <span class="logo_container">
        <img class="logo" src="@/assets/logo.png" />
      </span>
      <span>Hillab</span>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <div class="input_container">
          <el-input type="text" placeholder="用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="pass">
        <div class="input_container">
          <el-input type="password" placeholder="密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="login_button_container">
          <el-button type="primary" @click="login('ruleForm')">登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script scoped>
import axios from "axios";
import functionList from "./../../assets/utility";
import { Message } from "element-ui";

export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    login(formName) {
      functionList.fetchToBackEndAxios(
        "POST",
        "users/login",
        result => {
          console.log(result);
          Message.success({
            message: result.message
          });
          this.$router.push("/level");
        },
        nr => {
          Message.warning({
            message: nr.message
          });
          console.log(nr);
        },
        { username: this.ruleForm.username, password: this.ruleForm.pass }
      );
    }
  }
};
</script>

<style scoped>
.form_container {
  margin: 0 auto;
  position: relative;
  top: 50%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
  opacity: 1;
}

.welcome_text_container {
  text-align: center;
  font-weight: bold;
  font-family: "puhui";
  letter-spacing: 2px;
  color: #f7b248;
  opacity: 1;
}

.logo_container img {
  vertical-align: baseline;
}

.input_container {
  margin: 0 auto;
}

.input_container .el-input >>> .el-input__inner {
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid #707070;
  color: #f7b248;
}

.input_container .el-input >>> .el-input__inner::placeholder {
  color: #e5e5e5;
}

.login_button_container {
  text-align: center;
  margin-top: 50px;
}

.login_button_container .el-button {
  background: #f7b248 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #be8b3e;
  border-radius: 12px;
  opacity: 1;
}

@media screen and (max-width: 1920px) {
  .form_container {
    width: 1270px;
    height: 630px;
    margin-top: -315px;
  }

  .welcome_text_container {
    font-size: 48px;
    margin-top: 85px;
  }

  .logo {
    width: 48px;
  }

  .login_button_container .el-button {
    width: 200px;
    height: 64px;
    font-size: 32px;
  }

  .input_container {
    width: 400px;
    margin-top: 60px;
  }

  .input_container .el-input {
    font-size: 24px;
  }

  .el-form-item >>> .el-form-item__error {
    font-size: 18px;
    left: 435px;
  }
}

@media screen and (max-width: 1600px) {
  .form_container {
    width: 1060px;
    height: 525px;
    margin-top: -262.5px;
  }

  .welcome_text_container {
    font-size: 40px;
    margin-top: 65px;
  }

  .logo {
    width: 40px;
  }

  .login_button_container .el-button {
    width: 165px;
    height: 55px;
    font-size: 24px;
  }

  .input_container {
    width: 330px;
    margin-top: 40px;
  }

  .input_container .el-input {
    font-size: 20px;
  }

  .el-form-item >>> .el-form-item__error {
    font-size: 16px;
    left: 365px;
  }
}
</style>