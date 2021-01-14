import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import fs from "fs"
// import Cookies from 'js-cookie';
// import SecureLS from "secure-ls";
// const ls = new SecureLS({ isCompression: false });
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    ////////////////////////////////
    // Test Data. For Development //
    ////////////////////////////////

    // Header Information Data
    starCount: 125,
    studyTimeCount: 15,
    avatar: require("@/assets/avatars/default_avatar.svg"),
    token: "",

    //////////////////
    // Profile Data //
    //////////////////

    // LEARNING PROGRESS PAGE TABLE DATA
    tableData: [
      {
        type: "学习",
        unit: "第0关",
        course: "主语",
        time: "2020-09-12 12:38"
      },
      {
        type: "练习",
        unit: "第0关",
        course: "主语",
        time: "2020-09-11 12:38"
      },
      {
        type: "学习",
        unit: "第0关",
        course: "主语",
        time: "2020-09-10 12:38"
      },
      {
        type: "学习",
        unit: "第1关",
        course: "there be 句型",
        time: "2020-09-12 12:38"
      },
      {
        type: "通关",
        unit: "第0关",
        course: "",
        time: "2020-09-12 12:38"
      },
      {
        type: "学习",
        unit: "第1关",
        course: "宾格人称代词",
        time: "2020-09-12 12:38"
      },
      {
        type: "学习",
        unit: "第1关",
        course: "宾格人称代词",
        time: "2020-09-12 12:38"
      },
      {
        type: "学习",
        unit: "第1关",
        course: "宾格人称代词",
        time: "2020-09-12 12:38"
      },
      {
        type: "学习",
        unit: "第1关",
        course: "宾格人称代词",
        time: "2020-09-12 12:38"
      }
    ],

    // LEARNING STATISTICS PAGE DATA
    learnStatistics: {
      studyTimeCount: 367,
      practiceTimeCount: 495,
      knowledgePointsCount: 15,
      pointMasteredCount: 7,
      levelStartedCount: 3,
      levelFinishedCount: 1
    },

    // PERSONAL INFORMATION PAGE DATA
    username: "scholar_hills",
    nickname: "Lluvia",
    topicsConcerned: [
      {
        tagName: "IGCSE",
        tagType: "danger"
      },
      {
        tagName: "ESL",
        tagType: "success"
      },
      {
        tagName: "英国大学",
        tagType: "info"
      }
    ],

    // LEVEL PAGE DATA
    currentLevel: {},
    levels: [
      {
        levelNum: 1,
        unlocked: true,
        grammer_element: [
          {
            unit: "主语",
            percentage: 0,
            proficiency: 0,
            path: "/lesson1"
          },
          {
            unit: "指示代词",
            percentage: 0,
            proficiency: 0,
            path: "/lesson2"
          },
          {
            unit: "系动词be",
            percentage: 0,
            proficiency: 0,
            path: "/lesson3"
          },
          {
            unit: "形容词做表语",
            percentage: 0,
            proficiency: 0,
            path: "/lesson4"
          },
          {
            unit: "名词作表语",
            percentage: 0,
            proficiency: 0,
            path: "/lesson5"
          },
          {
            unit: "名词作表语",
            percentage: 0,
            proficiency: 0,
            path: "/lesson6"
          },
        ],
        sentence_structure: [
          {
            unit: "主语 + be + 表语",
            percentage: 0,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "主谓一致",
            percentage: 0,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "一般现在时",
            percentage: 0,
            proficiency: 0,
            path: "/content"
          }
        ],
        volGym: [
          {
            unit: "场景词汇",
            percentage: 0,
            proficiency: 0,
            path: "/volGymModeChoose"
          }
        ]
      },
      {
        levelNum: 2,
        unlocked: false,
        grammer_element: [
          {
            unit: "主语",
            percentage: 0,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "指示代词",
            percentage: 50,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "系动词be",
            percentage: 67.5,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "形容词做表语",
            percentage: 66.7,
            proficiency: 3,
            path: "/content"
          },
          {
            unit: "名词作表语",
            percentage: 100,
            proficiency: 3,
            path: "/content"
          },
          {
            unit: "名词作表语",
            percentage: 100,
            proficiency: 3,
            path: "/content"
          }
        ],
        sentence_structure: [
          {
            unit: "主语 + be + 表语",
            percentage: 0,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "主谓一致",
            percentage: 66.7,
            proficiency: 1,
            path: "/content"
          },
          {
            unit: "一般现在时",
            percentage: 80,
            proficiency: 1,
            path: "/content"
          }
        ],
        volGym: [
          {
            unit: "场景词汇",
            percentage: 66.7,
            proficiency: 0,
            path: "/volGymModeChoose"
          }
        ]
      }
    ],

    // QB DATA
    qb: [
      {
        id: 0,
        lesson: "主语",
        level: 1,
        quesionType: 1,
        answerType: 1,
        question: "",
        choice: [],
        answer: [],
        difficulty: 0,
      }
    ],

    // Volcabulary Card
    currentWordNum: 0,
    volDB_userRecord: [],
    volcabularyDB: [
      // {
      //   difficulty: 0,
      //   word: "nice",
      //   syntacticCategory: "adj",
      //   chinese: "友好的，可爱的，让人愉快的",
      //   englishExplanation: "",
      //   sampleSentence: "She is really nice.",
      //   sentenceTranslation: "她非常友好。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
      // {
      //   difficulty: 0,
      //   word: "verso",
      //   syntacticCategory: "n",
      //   chinese: "反面；书的左页；[印刷] 封底",
      //   englishExplanation: "",
      //   sampleSentence: "Please note that the verso of the card has to be white.",
      //   sentenceTranslation: "请注意卡的背面必须是白色的。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
      // {
      //   difficulty: 0,
      //   word: "abjure",
      //   syntacticCategory: "v",
      //   chinese: "正式放弃",
      //   englishExplanation: "",
      //   sampleSentence: "They were compelled to abjure their faith.",
      //   sentenceTranslation: "他们被迫发誓放弃自己的信仰。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
      // {
      //   difficulty: 0,
      //   word: "sanguine",
      //   syntacticCategory: "adj",
      //   chinese: "乐观的; 自信的",
      //   englishExplanation: "",
      //   sampleSentence: "He's remarkably sanguine about the problems involved.",
      //   sentenceTranslation: "他对所涉及的问题非常自信。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
      // {
      //   difficulty: 0,
      //   word: "scintillating",
      //   syntacticCategory: "adj",
      //   chinese: "（谈话或表演）生动有趣的",
      //   englishExplanation: "",
      //   sampleSentence: "You can hardly expect scintillating conversation from a kid that age.",
      //   sentenceTranslation: "你几乎很难想象那么小年纪的孩子会说出妙趣横生的话来。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
      // {
      //   difficulty: 0,
      //   word: "vitiate",
      //   syntacticCategory: "v",
      //   chinese: "损害...的效能; 削弱...的效能",
      //   englishExplanation: "",
      //   sampleSentence: "Strategic policy during the War was vitiated because of a sharp division between easterners and westerners.",
      //   sentenceTranslation: "由于“东方人”和“西方人”间的巨大分歧，战争期间的战略方针没有得到切实的执行。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
      // {
      //   difficulty: 0,
      //   word: "innuendo",
      //   syntacticCategory: "n",
      //   chinese: "影射; 暗讽",
      //   englishExplanation: "",
      //   sampleSentence: "The report was based on rumours, speculation, and innuendo.",
      //   sentenceTranslation: "该报告以传言、臆测和影射为基础。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
      // {
      //   difficulty: 0,
      //   word: "vituperation",
      //   syntacticCategory: "n",
      //   chinese: "辱骂",
      //   englishExplanation: "",
      //   sampleSentence: "If two paranoias living in different surroundings meet, then nothing left but quarrel and vituperation.",
      //   sentenceTranslation: "在截然不同的环境下生活的两个偏执的人相遇了，那就只剩下争执和谩骂了。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
      // {
      //   difficulty: 0,
      //   word: "famine",
      //   syntacticCategory: "n",
      //   chinese: "饥荒",
      //   englishExplanation: "",
      //   sampleSentence: "Thousands of refugees are trapped by war, drought and famine.",
      //   sentenceTranslation: "成千上万的难民陷于战争、干旱和饥荒的困境。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
      // {
      //   difficulty: 0,
      //   word: "insubordinate",
      //   syntacticCategory: "adj",
      //   chinese: "不服从的",
      //   englishExplanation: "",
      //   sampleSentence: "In industry, a worker who is grossly insubordinate is threatened with discharge.",
      //   sentenceTranslation: "在企业界，拒不服从指令的工人面临被解雇的威胁。",
      //   incorrectCount: 0,
      //   correctCount: 0,
      //   unfamiliarCount: 0,
      //   familiarCount: 0,
      //   lastStudied: "2020-7-30 12:30:07",
      //   lastMemorized: "2020-7-30 12:30:07",
      //   audioName: null,
      // },
    ]

    /* .. initial state ... */
  },

  plugins: [
    new VuexPersistence({
      key: "vuex",
      storage: window.localStorage // modified here
    }).plugin
  ],
  // plugins: [
  //   createPersistedState({
  //     storage: {
  //       getItem: key => ls.get(key),
  //       setItem: (key, value) => ls.set(key, value),
  //       removeItem: key => ls.remove(key)
  //     }
  //   })
  //   // createPersistedState()
  // ],

  mutations: {
    // reset(state) {
    //   // acquire initial state
    //   console.log("i am resetted state");
    //   const s = initialState();
    //   Object.keys(s).forEach(key => {
    //     state[key] = s[key];
    //   });
    // }
  }
});

export default store;
