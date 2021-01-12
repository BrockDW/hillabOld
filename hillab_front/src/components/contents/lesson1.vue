<template>
  <div id="content" style="height: 100%; overflow-x: hidden">
    <!-- 已经用 el-scrollbar 取代浏览器原生滚动条 -->
    <el-scrollbar class="scrollbar">
      <!-- 左上角的关闭按钮 -->
      <div class="quit_button_container" @click="$router.push('/level')">
        <i class="fas fa-times"></i>
      </div>

      <!-- 右侧的 nav 组件（仍有待改善，目前不足是当浏览器手动滚动时，无法触发组件圆点激活） -->
      <!-- 标注: 此处是页面唯一使用 ant design 的组件，其余组件均为 element ui -->
      <div>
        <div class="steps_container">
          <a-steps progress-dot :current="current" @change="onChange" direction="vertical">
            <a-step />
            <a-step />
            <a-step />
            <a-step />
            <a-step />
          </a-steps>
        </div>
      </div>

      <div class="canvas">
        <!-- id 用于 smoothscroll 中类 html 滚动 -->
        <div id="page1">
          <div class="subpage_container">
            <div class="unit_title">主语 subject</div>
            <div class="unit_subTitle">事件或状态的主要参与者</div>
          </div>
          <div class="nextPage_button_container" @click="toNextPage()">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>

        <div id="page2">
          <div class="subpage_container">
            <div class="subpage_title">什么是主语？</div>
            <div class="contents">
              当我们对场景进行谈论时，往往都会提及场景中的参与者；「主语」指的就是场景中
              <span class="contents_important">“主要”的参与者。</span>
              <br />我们可以通过下面这几个例子来理解一下这个概念：
            </div>
            <div class="contents_table">
              <el-table border :data="tableData" stripe style="width: 700px">
                <el-table-column prop="sentence" label="句子"></el-table-column>
                <el-table-column prop="sceneType" label="场景类型"></el-table-column>
                <el-table-column prop="participant" label="参与者"></el-table-column>
                <el-table-column prop="subject" label="主语"></el-table-column>
              </el-table>
            </div>
            <div class="contents">
              我们可以看到，「主语」之所以“主要”，是因为它指代的对象
              <br />&nbsp;&nbsp;&nbsp;- 要么是场景中唯一的参与者（没有人和ta竞争主角）
              <br />&nbsp;&nbsp;&nbsp;- 要么是触发事件或是状态的“始作俑者”（没有ta就没有这个场景）*
            </div>
          </div>
          <div class="nextPage_button_small_container" @click="toNextPage()">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>

        <div id="page3">
          <div class="subpage_container">
            <div class="subpage_title">英语中「主语」的特点</div>
            <div class="contents">
              <span class="contents_important">1. 顺序位于动词前</span>：英语和汉语一样，主语出现在对动作或是状态的描述之前，是“你很可爱”而不是“很可爱你”；是“我们是小学生”而不是“是小学生我们”，更不是“是我们小学生”；“他欺负我”和“我欺负他”的意思就完全不一样了
            </div>
            <div class="contents">
              <span class="contents_important">2. 不可省略</span>：在英语中，主语在每个句子里都要被点出来
              <br />- 可以用代表名字的「专有名词」直接点：Sally is cute.
              <br />- 可以用表达种类的「普通名词」说明：A girl is here.
              <br />- 在前文明确指代的情况下，也可以用起代替名字或名词作用的「代词」来指代：She is a student.
              <br />- 在描述没有主语的场景时，也要用一个代词来占位：It rains in the summer.
            </div>
            <div class="contents">
              <span class="contents_important">3. 人称代词的「主格」形式</span>：为了明确主语的主要地位，也为了方便我们在听到句子时快速明确这个句子中的主语，作为主语的人称代词有不同于作为其他句子成分的人称代词的形式，总结如下：
            </div>
            <div class="contents_table">
              <el-table border :data="tableData2" :show-header="false" stripe style="width: 900px">
                <el-table-column prop="col1"></el-table-column>
                <el-table-column prop="col2"></el-table-column>
                <el-table-column prop="col3"></el-table-column>
                <el-table-column prop="col4"></el-table-column>
                <el-table-column prop="col5"></el-table-column>
                <el-table-column prop="col6"></el-table-column>
                <el-table-column prop="col7"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="nextPage_button_small_container" @click="toNextPage()">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>

        <div id="page4">
          <div class="subpage_container page4">
            <div class="subpage_title page4">归纳总结</div>
            <div class="subpage_content_block">
              <div class="subpage_content_id">1</div>
              <div class="contents_page4">
                「主语」指的是场景主要的参与者，往往是
                <span class="contents_important">被描述的主体</span> 或是
                <span class="contents_important">事件的触发者</span>
              </div>
              <div class="contents_sub">“你很可爱”的“你”，“他喜欢我”的“他”，“这让我无话可说”的“这”</div>
            </div>
            <div class="subpage_content_block">
              <div class="subpage_content_id">2</div>
              <div class="contents_page4">「主语」位于动词前，可以是名词或代词，不可省略</div>
              <div class="contents_sub">“小欣很可爱”不是“很可爱小欣”或者“很可爱”，但可以是“她很可爱”</div>
            </div>
            <div class="subpage_content_block">
              <div class="subpage_content_id">3</div>
              <div class="contents_page4">
                用人称代词作「主语」要用人称代词的
                <span class="contents_important">主格</span> 形式
              </div>
              <div class="contents_sub">I, you, he, she, it, we, you (all), they</div>
            </div>
          </div>
          <div class="nextPage_button_small_container" @click="toNextPage()">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>

        <div class="page5" id="page5">
          <div class="contents_page5">
            <span class="contents_important">主语</span> 相关的知识理解了吗？
          </div>
          <div class="divider_page5">
            <el-divider></el-divider>
          </div>

          <!-- 待施工，还未开始 -->
          <div class="button_primary" @click="$router.push('/level')">理解了！</div>
          <div class="button_primary_white">再复习一下</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import smoothscroll from "smoothscroll-polyfill";

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          id: "page1"
        },
        {
          id: "page2"
        },
        {
          id: "page3"
        },
        {
          id: "page4"
        },
        {
          id: "page5"
        }
      ],
      tableData: [
        {
          sentence: "“我们是小学生”",
          sceneType: "介绍身份",
          participant: "“我们”",
          subject: "“我们”"
        },
        {
          sentence: "“你很可爱”",
          sceneType: "描述特点",
          participant: "“你”",
          subject: "“你”"
        },
        {
          sentence: "“我和我父母一起住”",
          sceneType: "描述状态",
          participant: "“我和我父母”",
          subject: "“我和我父母”"
        },
        {
          sentence: "“花儿红了”",
          sceneType: "描述变化",
          participant: "“花儿”",
          subject: "“花儿”"
        },
        {
          sentence: "“他欺负我”",
          sceneType: "叙述事件",
          participant: "“他”&“我”",
          subject: "“他”"
        },
        {
          sentence: "“这让我很生气”",
          sceneType: "叙述因果关系",
          participant: "“这”&“我”",
          subject: "“我”"
        }
      ],
      tableData2: [
        {
          col1: "中文代词",
          col2: "我",
          col3: "你",
          col4: "他/她/它",
          col5: "我们",
          col6: "你们",
          col7: "他们/她们/它们"
        },
        {
          col1: "英文主格代词",
          col2: "I",
          col3: "you",
          col4: "he/she/it",
          col5: "we",
          col6: "you",
          col7: "they"
        },
        {
          col1: "人称",
          col2: "第一人称单数",
          col3: "第二人称单数",
          col4: "第三人称单数",
          col5: "第一人称单数",
          col6: "第二人称单数",
          col7: "第三人称单数"
        }
      ]
    };
  },

  methods: {
    toNextPage() {
      this.current++;
      document
        .querySelector("#page" + (this.current + 1))
        .scrollIntoView({ behavior: "smooth" });
    },
    onChange(current) {
      this.current = current;
      document
        .querySelector("#" + this.steps[current].id)
        .scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>

<style scoped>
#content {
  margin: 0;
  padding: 0;
}

.quit_button_container {
  position: fixed;
  top: 40px;
  left: 80px;
  font-size: 46px;
  color: #e5e5e5;
  cursor: pointer;
  transition: all 0.2s;
}

.nextPage_button_container {
  width: 50px;
  height: 50px;
  font-size: 30px;
  color: #fff;
  text-align: center;
  background: #f7b248 0% 0% no-repeat padding-box;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;

  margin: 0 auto;
  padding-top: 4px;
  margin-top: -75px;
  margin-bottom: 50px;

  opacity: 1;
  cursor: pointer;
}

.nextPage_button_small_container {
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  background: var(--casablanca) 0% 0% no-repeat padding-box;
  background: #f7b248 0% 0% no-repeat padding-box;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;

  margin: 0 auto;
  padding-top: 2px;
  margin-top: -35px;
  margin-bottom: 20px;

  opacity: 1;
  cursor: pointer;
}

.unit_title {
  text-align: center;
  padding-top: 40px;
  font-size: 48px;
  font-weight: bold;
  color: #f7b248;
}

.unit_subTitle {
  text-align: center;
  padding-top: 40px;
  font-size: 24px;
  color: #f7b248;
}

.canvas {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subpage_container {
  /* vertically centers content */
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 1100px;
  height: 660px;
  opacity: 1;
  padding: 0 80px;

  /* space between container and down arrow */
  margin-top: 45px;
}

.subpage_title {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #ff9a00;
  opacity: 1;

  align-self: flex-start;
}

.contents {
  margin-top: 20px;
  text-align: left;
  font-size: 18px;
  line-height: 36px;
  letter-spacing: 0.25px;
  color: #3c3c3c;
}

.contents_table {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.contents_sub {
  padding-left: 110px;
  font-size: 16px;
  font-family: "puhui-light";
  color: #707070;
}

.contents_important {
  color: #ff9a00;
  font-weight: bold;
}

.subpage_title.page4 {
  font-size: 38px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.page5 {
  height: 780px;
  text-align: center;
  padding-top: 280px;
}

.contents_page4 {
  padding-top: 10px;
  padding-left: 110px;
  text-align: left;
  font-size: 20px;
  line-height: 48px;
  color: #3c3c3c;
}

.contents_page5 {
  font-size: 24px;
  line-height: 50px;
  letter-spacing: 0.25px;
  color: #3c3c3c;
}

.divider_page5 {
  width: 680px;
  margin: 0 auto;
  margin-top: 50px;
}

.button_primary {
  width: 116px;
  height: 36px;
  text-align: center;
  background: #f7b248 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 0px #be8b3e;
  border-radius: 10px;
  opacity: 1;

  font-size: 16px;
  font-family: "puhui-light";
  letter-spacing: 0px;
  color: #ffffff;

  padding-top: 6px;
  margin: 0 auto;
  margin-top: 60px;
  cursor: pointer;
}

.button_primary_white {
  width: 116px;
  height: 36px;
  text-align: center;
  box-shadow: 0px 2px 0px #f7b248;
  border: 2px solid #f7b248;
  border-radius: 10px;
  opacity: 1;

  font-size: 16px;
  font-family: "puhui-light";
  letter-spacing: 0px;
  color: #f7b248;

  padding-top: 4px;
  margin: 0 auto;
  margin-top: 30px;
  cursor: pointer;
}

.subpage_content_id {
  float: left;
  width: 64px;
  height: 64px;
  font-size: 38px;
  font-weight: bold;
  font-family: "puhui";
  text-align: center;
  color: #f7b248;
  background: #fff7e6 0% 0% no-repeat padding-box;
  border-radius: 16px;
  opacity: 1;
  padding-top: 4px;
  margin-top: 18px;
  margin-left: 18px;
}

.subpage_content_block {
  margin: 0 auto;
  margin-top: 50px;
  width: 820px;
  height: 100px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 16px;
  opacity: 1;
}

.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}

.steps_container {
  position: fixed;
  right: 7%;
  top: 38%;
}

.steps_container >>> .ant-steps-dot .ant-steps-item-content,
.ant-steps-dot.ant-steps-small .ant-steps-item-content {
  width: 0px;
}

.scrollbar {
  height: 100%;
  overflow-x: hidden;
}

.scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-table >>> .cell {
  line-height: 13px;
}
</style>