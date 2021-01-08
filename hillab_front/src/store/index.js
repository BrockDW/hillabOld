import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import Cookies from 'js-cookie';
// import SecureLS from "secure-ls";
// const ls = new SecureLS({ isCompression: false });
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

function initialState() {
  return {
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
    ]
    /* .. initial state ... */
  };
}


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
            path: "/content"
          },
          {
            unit: "指示代词",
            percentage: 0,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "系动词be",
            percentage: 0,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "形容词做表语",
            percentage: 0,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "名词作表语",
            percentage: 0,
            proficiency: 0,
            path: "/content"
          },
          {
            unit: "名词作表语",
            percentage: 0,
            proficiency: 0,
            path: "/content"
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
            path: "/content"
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
            path: "/content"
          }
        ]
      }
    ],
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