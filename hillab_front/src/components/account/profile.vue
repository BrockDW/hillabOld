<template>
  <div class="center_block">
    <el-row>
      <el-col :span="5">
        <div class="center_block_left_bar">
          <div
            v-bind:class="{
              tab_active: firstTab_show,
              tabs_name: !firstTab_show
            }"
            @click="showFirstTab()"
          >学习记录</div>
          <div
            v-bind:class="{
              tab_active: secondTab_show,
              tabs_name: !secondTab_show
            }"
            @click="showSecondTab()"
          >数据统计</div>
          <div
            v-bind:class="{
              tab_active: thirdTab_show || editInfo_show,
              tabs_name: !thirdTab_show
            }"
            @click="showThirdTab()"
          >个人信息</div>
          <div
            v-bind:class="{
              tab_active: forthTab_show,
              tabs_name: !forthTab_show
            }"
            @click="showForthTab()"
          >帮助</div>
          <div class="tabs_name" @click="handleLogout()">登出</div>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="vertical_divider"></div>
      </el-col>

      <el-col :span="18">
        <div class="tabs_content">
          <div v-show="firstTab_show">
            <el-row>
              <el-col :span="16">
                <div class="tabs_content_title">
                  学习记录
                  <span class="tabs_content_title_en">LEARNING PROGRESS</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="toAllCourse_button" @click="$router.push('/allCourses')">
                  <div>
                    查看所有课程&nbsp;
                    <i class="fas fa-chevron-right"></i>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider class="tabs_content_divider"></el-divider>
            <div>
              <el-table
                :data="$store.state.tableData"
                height="370px"
                style="width: 700px;"
                :default-sort="{ prop: 'date', order: 'descending' }"
              >
                <el-table-column
                  prop="type"
                  label="类型"
                  width="180"
                  :filters="[
                    { text: '学习', value: '学习' },
                    { text: '通关', value: '通关' },
                    { text: '练习', value: '练习' }
                  ]"
                  :filter-method="filterTag"
                  filter-placement="bottom-end"
                >
                  <template slot-scope="scope">
                    <div
                      v-bind:class="{
                        danger: scope.row.type == '学习',
                        primary: scope.row.type == '练习',
                        success: scope.row.type == '通关'
                      }"
                    >{{ scope.row.type }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="unit" label="关卡" width="180" sortable></el-table-column>
                <el-table-column prop="course" label="课程"></el-table-column>
                <el-table-column prop="time" label="时间" sortable></el-table-column>
              </el-table>
            </div>
          </div>
          <div v-show="secondTab_show">
            <el-row>
              <el-col :span="16">
                <div class="tabs_content_title">
                  数据统计
                  <span class="tabs_content_title_en">LEARNING STATISTICS</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="toAllCourse_button" @click="$router.push('/allCourses')">
                  <div>
                    查看所有课程&nbsp;
                    <i class="fas fa-chevron-right"></i>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-divider class="tabs_content_divider"></el-divider>
            <div style="margin-left: 40px">
              <el-row style="margin-bottom: 48px">
                <el-col :span="12">
                  <div class="tabs2_content_data_title">
                    <i class="fas fa-clock"></i>&nbsp;&nbsp;学习时长
                  </div>
                  <div class="tabs2_content_data">
                    6
                    <span style="font-size: 20px">h</span>
                    7
                    <span style="font-size: 20px">m</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="tabs2_content_data_title">
                    <i class="fas fa-clock"></i>&nbsp;&nbsp;练习时长
                  </div>
                  <div class="tabs2_content_data">
                    8
                    <span style="font-size: 20px">h</span>
                    15
                    <span style="font-size: 20px">m</span>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 48px">
                <el-col :span="12">
                  <div class="tabs2_content_data_title">
                    <i class="fas fa-star"></i>&nbsp;&nbsp;认识知识点
                  </div>
                  <div class="tabs2_content_data">
                    15
                    <span style="font-size: 20px">个</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="tabs2_content_data_title">
                    <i class="fas fa-star"></i>&nbsp;&nbsp;掌握知识点
                  </div>
                  <div class="tabs2_content_data">
                    7
                    <span style="font-size: 20px">个</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="tabs2_content_data_title">
                    <i class="fas fa-torii-gate"></i>&nbsp;&nbsp;开启关卡
                  </div>
                  <div class="tabs2_content_data">
                    3
                    <span style="font-size: 20px">个</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="tabs2_content_data_title">
                    <i class="fas fa-torii-gate"></i>&nbsp;&nbsp;完成关卡
                  </div>
                  <div class="tabs2_content_data">
                    1
                    <span style="font-size: 20px">个</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-show="thirdTab_show">
            <el-row>
              <el-col :span="16">
                <div class="tabs_content_title">
                  个人信息
                  <span class="tabs_content_title_en">PERSONAL INFOMATION</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="toAllCourse_button" @click="toEditInfo()">
                  <i class="fas fa-pen"></i>&nbsp;编辑
                </div>
              </el-col>
            </el-row>
            <el-divider class="tabs_content_divider"></el-divider>
            <div style="width:800px;">
              <el-row :gutter="25">
                <el-col :span="6">
                  <div class="avatar_container">
                    <el-avatar :size="110" :src="$store.state.avatar"></el-avatar>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="tabs2_content_data_title" style="margin: 0px 0px 6px 0px">用户名</div>
                  <div
                    class="tabs2_content_data"
                    style="font-size: 18px"
                  >{{ $store.state.username }}</div>
                  <div class="tabs2_content_data_title" style="margin: 50px 0px 6px 0px">昵称</div>
                  <div
                    class="tabs2_content_data"
                    style="font-size: 18px"
                  >{{ $store.state.nickname }}</div>
                  <div class="tabs2_content_data_title" style="margin: 50px 0px 6px 0px">关注话题</div>
                  <div class="tabs2_content_data" style="font-size: 18px;">
                    <el-tag
                      v-for="(topic, index) in $store.state.topicsConcerned"
                      :key="index"
                      style="margin-right: 10px"
                      :type="topic.tagType"
                    >{{ topic.tagName }}</el-tag>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-show="editInfo_show">
            <el-row>
              <el-col :span="16">
                <div class="tabs_content_title">
                  个人信息
                  <span class="tabs_content_title_en">LEARNING PROGRESS</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="toAllCourse_button" @click="saveInfo()">
                  <i class="fas fa-save"></i>&nbsp;保存
                </div>
              </el-col>
            </el-row>
            <el-divider class="tabs_content_divider"></el-divider>
            <div style="width:800px;">
              <el-row :gutter="25">
                <el-col :span="6">
                  <div class="avatar_container">
                    <el-avatar :size="110" :src="$store.state.avatar"></el-avatar>
                  </div>

                  <div class="editButton_container">
                    <el-popover placement="right" width="400" trigger="click">
                      <div style="height: 100px">
                        <div :key="key" v-for="(img, key) in allImage">
                          <img :src="img" class height="50%" width="50%" @click="changeImg(key)" />
                        </div>
                      </div>
                      <el-button slot="reference">修改头像</el-button>
                    </el-popover>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="tabs2_content_data_title" style="margin: 0px 0px 6px 0px">用户名</div>
                  <div class="tabs2_content_data" style="font-size: 18px">
                    <el-input v-model="newUsername" :placeholder="$store.state.username"></el-input>
                  </div>
                  <div class="tabs2_content_data_title" style="margin: 50px 0px 6px 0px">昵称</div>
                  <div class="tabs2_content_data" style="font-size: 18px">
                    <el-input v-model="newNickname" :placeholder="$store.state.nickname"></el-input>
                  </div>
                  <div class="tabs2_content_data_title" style="margin: 50px 0px 6px 0px">关注话题</div>
                  <div class="tabs2_content_data" style="font-size: 18px;">
                    <el-select
                      v-model="value"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder
                    >
                      <el-option
                        v-for="item in tagTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-show="forthTab_show">
            <el-row>
              <el-col :span="16">
                <div class="tabs_content_title">
                  帮助
                  <span class="tabs_content_title_en">INFORMATION</span>
                </div>
              </el-col>
            </el-row>
            <el-divider class="tabs_content_divider"></el-divider>
            <div style="width: 700px;">
              <el-collapse v-model="activeNames" accordion>
                <el-collapse-item title="Hillab 是什么？" name="1">
                  <div>
                    Hillab是厦门吸铁石教育科技有限公司研发的在线学习平台，主要从英语、学科、文化
                    三个方面为国际学校和双语学校的学生提供知识、技能与思维上的补充与提升。
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Hillab的创立者是谁？" name="2">
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="在Hillab上完整的学习流程包括哪些环节？" name="3">
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                  <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="怎么给Hillab反馈意见和建议？" name="4">
                  <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                  <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from "element-ui";
import functionList from "../../assets/utility";
export default {
  data() {
    return {
      firstTab_show: true,
      secondTab_show: false,
      thirdTab_show: false,
      editInfo_show: false,
      forthTab_show: false,
      newUsername: "",
      newNickname: "",
      value: [],
      tagTypeList: [
        {
          value: "IGCSE",
          label: "IGCSE",
          type: "danger"
        },
        {
          value: "ESL",
          label: "ESL",
          type: "success"
        },
        {
          value: "英国大学",
          label: "英国大学",
          type: "info"
        },
        {
          value: "A-LEVEL",
          label: "A-LEVEL",
          type: "primary"
        }
      ],
      activeNames: ["1"],
      imageDir: "@/assets/avatars",
      allImage: {},
      curImageKey: ""
    };
  },

  mounted() {
    console.log("this is my token", localStorage.getItem("token"));

    var allImgSource = require.context(
      "./../../assets/avatars/",
      true,
      /\.svg$/
    );
    allImgSource.keys().forEach(key => {
      // console.log(key);
      // console.log(allImgSource(key));
      this.allImage[key] = allImgSource(key);
      // cache[key] = allImgSource(key)
    });
    console.log(allImgSource);

    functionList.fetchToBackEndAxios(
      "GET",
      "users/getProfile",
      result => {
        console.log(result);
        this.$store.state.username = result.profile.username;
        this.$store.state.nickname = result.profile.nickname;
        this.$store.state.avatar = require("@/assets/avatars/" +
          result.profile.profileImg);
      },
      nr => {
        Message.warning({
          message: nr.message
        });
      },
      false,
      localStorage.getItem("token")
    );
    for (var i = 0; i < this.$store.state.topicsConcerned.length; i++) {
      this.value.push(this.$store.state.topicsConcerned[i].tagName);
    }
  },

  methods: {
    showFirstTab() {
      this.firstTab_show = true;
      this.secondTab_show = false;
      this.thirdTab_show = false;
      this.editInfo_show = false;
      this.forthTab_show = false;
    },
    showSecondTab() {
      this.firstTab_show = false;
      this.secondTab_show = true;
      this.thirdTab_show = false;
      this.editInfo_show = false;
      this.forthTab_show = false;
    },
    showThirdTab() {
      this.firstTab_show = false;
      this.secondTab_show = false;
      this.thirdTab_show = true;
      this.editInfo_show = false;
      this.forthTab_show = false;
    },
    toEditInfo() {
      this.firstTab_show = false;
      this.secondTab_show = false;
      this.thirdTab_show = false;
      this.editInfo_show = true;
      this.forthTab_show = false;
    },
    saveInfo() {
      functionList.fetchToBackEndAxios(
        "POST",
        "users/updateProfile",
        result => {
          Message.success({ message: result.message });
          this.$store.state.nickname = this.newNickname;
        },
        nr => {
          Message.warning({
            message: nr.message
          });
        },
        { nickname: this.newNickname, profileImg: this.curImageKey },
        localStorage.getItem("token")
      );
      this.firstTab_show = false;
      this.secondTab_show = false;
      this.thirdTab_show = true;
      this.editInfo_show = false;
      this.forthTab_show = false;
    },
    showForthTab() {
      this.firstTab_show = false;
      this.secondTab_show = false;
      this.thirdTab_show = false;
      this.editInfo_show = false;
      this.forthTab_show = true;
    },
    filterTag(value, row) {
      return row.type === value;
    },
    handleChange(val) {
      console.log(val);
    },
    changeImg(key) {
      console.log(key);
      this.$store.state.avatar = require("@/assets/avatars/" + key.substr(2));
      this.curImageKey = key.substr(2);
    },
    handleLogout() {
      // this.$store.commit("reset", this.$store.state);
      localStorage.setItem("token", "");
      Message.success({
        message: "已登出"
      });
      this.$router.push("/");
      console.log("I am logged out");
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.center_block {
  width: 1000px;
  height: 540px;
  border: 1px solid var(--mercury);
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
  opacity: 1;
  margin: 0 auto;
  margin-top: 50px;
}

.center_block_left_bar {
  line-height: 48px;
  float: left;
  margin-top: 30px;
  margin-left: 70px;
}

.tabs_name {
  font-size: 18px;
  color: #3c3c3c;
  cursor: pointer;
  transition: all 0.2s;
}

.tabs_name:hover {
  color: #f7b248;
  transition: all 0.2s;
}

.tab_active {
  font-size: 22px;
  color: #f7b248;
  cursor: pointer;
  transition: all 0.2s;
}

.vertical_divider {
  width: 1px;
  height: 510px;
  background-image: linear-gradient(
    to bottom,
    #e5e5e5 0%,
    #e5e5e5 50%,
    transparent 50%
  );
  background-size: 1px 20px;
  background-repeat: repeat-y;
  margin-top: 16px;
}

.tabs_content {
  margin-top: 36px;
}

.tabs_content_title {
  float: left;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #3c3c3c;
}

.tabs_content_title_en {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #707070;
}

.toAllCourse_button {
  font-size: 20px;
  text-align: right;
  color: #707070;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;
  margin-right: 50px;
}

.toAllCourse_button:hover {
  color: #f7b248;
  transition: all 0.2s;
}

.tabs_content_divider {
  width: 700px;
}

.el-table {
  color: #3c3c3c;
  font-size: 16px;
  font-family: "puhui-light";
}

.el-table >>> thead {
  color: #3c3c3c;
  font-size: 16px;
  font-weight: bold;
  font-family: "puhui";
}

.el-tag {
  font-size: 16px;
  font-weight: bold;
}

.danger {
  width: 60px;
  height: 30px;
  background: #fcc9c9 0% 0% no-repeat padding-box;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0px;
  line-height: 30px;
  color: #f77879;
  opacity: 1;
}

.success {
  width: 60px;
  height: 30px;
  background: #afddcb 0% 0% no-repeat padding-box;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0px;
  line-height: 30px;
  color: #38aa7d;
  opacity: 1;
}

.primary {
  width: 60px;
  height: 30px;
  background: #b5d1fc 0% 0% no-repeat padding-box;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0px;
  line-height: 30px;
  color: #488df7;
  opacity: 1;
}

.tabs2_content_data_title {
  font-size: 16px;
  font-weight: bold;
  color: #3c3c3c;
}

.tabs2_content_data {
  font-size: 40px;
  font-weight: bold;
  font-family: "puhui";
  color: #f7b248;
}

.el-avatar {
  background: #f7b248;
}

.avatar_container {
  text-align: center;
}

.el-collapse >>> .el-collapse-item__content {
  font-size: 16px;
  font-family: "puhui-light";
}

.el-collapse >>> .el-collapse-item__header {
  font-size: 16px;
  color: #3c3c3c;
}

.editButton_container {
  text-align: center;
  margin-top: 20px;
}

.editButton_container .el-button {
  width: 100px;
  height: 30px;
  line-height: 0px;
  color: #f7b248;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #f7b248;
  border: 2px solid #f7b248;
  border-radius: 12px;
  opacity: 1;
}

.tabs2_content_data .el-input >>> .el-input__inner {
  width: 200px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid #707070;
  color: #f7b248;
}

.tabs2_content_data .el-input >>> .el-input__inner::placeholder {
  color: #e5e5e5;
}

.el-select {
  width: 400px !important;
}
</style>
