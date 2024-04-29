import {
  getCareersList,
  saveCareer,
  deleteCareer,
  getDataBaseQaList,
  saveDataBaseQa,
  deleteDataBaseQa,
  getRaiseList,
  saveRaise,
  deleteRaise,
  getDisciplineList,
  saveDiscipline,
  deleteDiscipline,
  getDisciplineIntro,
  saveDisciplineIntro,
  getCourseStructure,
  saveCourseStructure,
  getCourseContent,
  saveCourseContent,
  getOnlineList,
  saveOnlineList,
  getTags,
  saveTag,
  deleteTag,
} from '@/api/college'

const state = () => ({
  careersList: null,
  dataBaseQaList: null,
  raiseList: null,
  disciplineList: null,
  onlineList: null,
  tagList: null,
})

const getters = {
  careersList: (state) => state.careersList,
  dataBaseQaList: (state) => state.dataBaseQaList,
  raiseList: (state) => state.raiseList,
  disciplineList: (state) => state.disciplineList,
  onlineList: (state) => state.onlineList,
  tagList: (state) => state.tagList,
}

const mutations = {
  /**
   * @author KarlHuang
   * @description 设置升学资讯列表
   * @param {*} state
   * @param {*} careersList
   */
  setCareerList(state, careersList) {
    state.careersList = careersList
  },
  /**
   * @author KarlHuang
   * @description 设置问答列表
   * @param {*} state
   * @param {*} dataBaseQaList
   */
  setDataBaseQaList(state, dataBaseQaList) {
    state.dataBaseQaList = dataBaseQaList
  },
  /**
   * @author KarlHuang
   * @description 设置募集要项列表
   * @param {*} state
   * @param {*} raiseList
   */
  setRaiseList(state, raiseList) {
    state.raiseList = raiseList
  },
  /**
   * @author KarlHuang
   * @description 设置学科列表
   * @param {*} state
   * @param {*} disciplineList
   */
  setDisciplineList(state, disciplineList) {
    state.disciplineList = disciplineList
  },
  /**
   * @author KarlHuang
   * @description 设置线上试听列表
   * @param {*} state
   * @param {*} onlineList
   */
  setOnlineList(state, onlineList) {
    state.onlineList = onlineList
  },
  /**
   * @author KarlHuang
   * @description 设置标签列表
   * @param {*} state
   * @param {*} tagList
   */
  setTagList(state, tagList) {
    state.tagList = tagList
  },
}

const actions = {
  /**
   * @author KarlHuang
   * @description 获取升学资讯列表
   * @param {*} commit
   */
  async getCareersList({ commit }, body) {
    const res = await getCareersList(body.query)
    if (res && res.code === 0) {
      commit('setCareerList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存升学资讯
   * @param {*} state
   */
  async saveCareer({ state }, body) {
    const res = await saveCareer(body.data)
    if (res && res.code === 0) {
      console.log(state.careersList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 删除升学资讯
   * @param {*} state
   */
  async deleteCareer({ state }, body) {
    const res = await deleteCareer(body.data)
    if (res && res.code === 0) {
      console.log(state.careersList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取问答列表
   * @param {*} commit
   */
  async getDataBaseQaList({ commit }, body) {
    const res = await getDataBaseQaList(body.department)
    if (res && res.code === 0) {
      commit('setDataBaseQaList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存问答
   * @param {*} state
   */
  async saveDataBaseQa({ state }, body) {
    const res = await saveDataBaseQa(body.data)
    if (res && res.code === 0) {
      console.log(state.dataBaseQaList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 删除问答
   * @param {*} state
   */
  async deleteDataBaseQa({ state }, body) {
    const res = await deleteDataBaseQa(body.data)
    if (res && res.code === 0) {
      console.log(state.dataBaseQaList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取募集要项列表
   * @param {*} commit
   */
  async getRaiseList({ commit }, body) {
    const res = await getRaiseList(body)
    if (res && res.code === 0) {
      commit('setRaiseList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存募集要项
   * @param {*} state
   */
  async saveRaise({ state }, body) {
    const res = await saveRaise(body.data)
    if (res && res.code === 0) {
      console.log(state.raiseList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 删除募集要项
   * @param {*} state
   */
  async deleteRaise({ state }, body) {
    const res = await deleteRaise(body.data)
    if (res && res.code === 0) {
      console.log(state.raiseList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取学科列表
   * @param {*} commit
   */
  async getDisciplineList({ commit }, body) {
    const res = await getDisciplineList(body.department)
    if (res && res.code === 0) {
      commit('setDisciplineList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存学科
   * @param {*} state
   */
  async saveDiscipline({ state }, body) {
    const res = await saveDiscipline(body.data)
    if (res && res.code === 0) {
      console.log(state.disciplineList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 删除学科
   * @param {*} state
   */
  async deleteDiscipline({ state }, body) {
    const res = await deleteDiscipline(body.data)
    if (res && res.code === 0) {
      console.log(state.disciplineList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取课程介绍
   * @param {*} state
   */
  async getDisciplineIntro({ state }, body) {
    const res = await getDisciplineIntro(body.query)
    if (res && res.code === 0) {
      console.log(state.disciplineList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存课程介绍
   * @param {*} state
   */
  async saveDisciplineIntro({ state }, body) {
    const res = await saveDisciplineIntro(body.data)
    if (res && res.code === 0) {
      console.log(state.disciplineList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取课程架构
   * @param {*} state
   */
  async getCourseStructure({ state }, body) {
    const res = await getCourseStructure(body.query)
    if (res && res.code === 0) {
      console.log(state.disciplineList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存课程架构
   * @param {*} state
   */
  async saveCourseStructure({ state }, body) {
    const res = await saveCourseStructure(body.data)
    if (res && res.code === 0) {
      console.log(state.disciplineList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取授课内容
   * @param {*} state
   */
  async getCourseContent({ state }, body) {
    const res = await getCourseContent(body.query)
    if (res && res.code === 0) {
      console.log(state.disciplineList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存授课内容
   * @param {*} state
   */
  async saveCourseContent({ state }, body) {
    const res = await saveCourseContent(body.data)
    if (res && res.code === 0) {
      console.log(state.disciplineList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取线上试听
   * @param {*} commit
   */
  async getOnlineList({ commit }, body) {
    const res = await getOnlineList(body.query)
    if (res && res.code === 0) {
      commit('setOnlineList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存线上试听
   * @param {*} state
   */
  async saveOnlineList({ state }, body) {
    const res = await saveOnlineList(body.data)
    if (res && res.code === 0) {
      console.log(state.disciplineList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取设计师标签
   * @param {*} commit
   */
  async getTags({ commit }, body) {
    const res = await getTags(body.department)
    if (res && res.code === 0) {
      commit('setOnlineList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存团队标签
   * @param {*} state
   */
  async saveTag({ state }, body) {
    const res = await saveTag(body.data)
    if (res && res.code === 0) {
      console.log(state.tagList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 删除团队标签
   * @param {*} state
   */
  async deleteTag({ state }, body) {
    const res = await deleteTag(body.data)
    if (res && res.code === 0) {
      console.log(state.tagList)
      body.callback && body.callback(res)
    }
  },
}
export default { state, getters, mutations, actions }
