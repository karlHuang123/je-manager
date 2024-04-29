import {
  getMemberList,
  saveMember,
  deleteMember,
  getLifeList,
  saveLife,
  deleteLife,
  getQualifyScoreList,
  saveQualifyScore,
  deleteQualifyScore,
  getQualifyCaseList,
  saveQualifyCase,
  deleteQualifyCase,
} from '@/api/introduction'
// import { message, notification } from 'ant-design-vue'

const state = () => ({
  memberList: null,
  lifeList: null,
  qualifyList: null,
  qualifyCaseList: null,
})
const getters = {
  memberList: (state) => state.memberList,
  lifeList: (state) => state.lifeList,
  qualifyList: (state) => state.qualifyList,
  qualifCaseyList: (state) => state.qualifCaseyList,
}
const mutations = {
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 设置成员列表
   * @param {*} state
   * @param {*} memberList
   */
  setMemberList(state, memberList) {
    state.memberList = memberList
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 设置生活列表
   * @param {*} state
   * @param {*} lifeList
   */
  setLifeList(state, lifeList) {
    state.lifeList = lifeList
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 设置合格实绩列表
   * @param {*} state
   * @param {*} qualifyList
   */
  setQualifyList(state, qualifyList) {
    state.qualifyList = qualifyList
  },
}
const actions = {
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 获取团队成员列表
   * @param {*} { commit }
   */
  async getMemberList({ commit }, body) {
    const res = await getMemberList(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      commit('setMemberList', res.data)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 保存团队成员
   * @param {*} { state }
   */
  async saveMember({ state }, body) {
    const res = await saveMember(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state.memberList)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 删除团队成员
   * @param {*} { state }
   */
  async deleteMember({ state }, body) {
    const res = await deleteMember(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state.memberList)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 获取生活列表
   * @param {*} { commit }
   */
  async getLifeList({ commit }, body) {
    const res = await getLifeList(body.department)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      commit('setLifeList', res.data)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 保存生活
   * @param {*} { state }
   */
  async saveLife({ state }, body) {
    const res = await saveLife(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state.lifeList)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 删除生活
   * @param {*} { state }
   */
  async deleteLife({ state }, body) {
    const res = await deleteLife(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state.lifeList)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 获取合格实绩列表
   * @param {*} { commit }
   */
  async getQualifyScoreList({ commit }, body) {
    const res = await getQualifyScoreList(body.department)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      commit('setQualifyList', res.data)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 保存合格实绩
   * @param {*} { state }
   */
  async saveQualifyScore({ state }, body) {
    const res = await saveQualifyScore(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state.qualifyList)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 删除合格实绩
   * @param {*} { state }
   */
  async deleteQualifyScore({ state }, body) {
    const res = await deleteQualifyScore(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state.qualifyList)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 获取合格案例列表
   * @param {*} { commit }
   */
  async getQualifyCaseList({ commit }, body) {
    const res = await getQualifyCaseList(body.department, body.tag)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      commit('setQualifyList', res.data)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 保存合格案例
   * @param {*} { state }
   */
  async saveQualifyCase({ state }, body) {
    const res = await saveQualifyCase(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state.qualifyCaseList)
    }
  },
  /**
   * @author KarlHuang karlhuang123@gmail.com
   * @description 删除合格案例
   * @param {*} { state }
   */
  async deleteQualifyCase({ state }, body) {
    const res = await deleteQualifyCase(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state.qualifyCaseList)
    }
  },
}
export default { state, getters, mutations, actions }
