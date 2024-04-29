import {
  getNewsList,
  saveNews,
  deleteNews,
  getWorksList,
  saveWorks,
  deleteWorks,
  getDesignerList,
  saveDesigner,
  deleteDesigner,
  getRewardList,
  saveReward,
  deleteReward,
} from '@/api/ateliter'

const state = () => ({
  newsList: null,
  worksList: null,
  designerList: null,
})

const getters = {
  newsList: (state) => state.newsList,
  worksList: (state) => state.worksList,
  designerList: (state) => state.designerList,
  rewardList: (state) => state.rewardList,
}

const mutations = {
  /**
   * @author KarlHuang
   * @description 设置新闻列表
   * @param {*} state
   * @param {*} newsList
   */
  setNewsList(state, newsList) {
    state.newsList = newsList
  },
  /**
   * @author KarlHuang
   * @description 设置作品列表
   * @param {*} state
   * @param {*} worksList
   */
  setWorksList(state, worksList) {
    state.worksList = worksList
  },
  /**
   * @author KarlHuang
   * @description 设置作品列表
   * @param {*} state
   * @param {*} designerList
   */
  setDesignerList(state, designerList) {
    state.designerList = designerList
  },
  setRewardList(state, designerList) {
    state.designerList = designerList
  },
}

const actions = {
  /**
   * @author KarlHuang
   * @description 获取新闻列表
   * @param {*} commit
   */
  async getNewsList({ commit }, body) {
    const res = await getNewsList()
    if (res && res.code === 0) {
      commit('setNewsList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存新闻
   * @param {*} state
   */
  async saveNews({ state }, body) {
    const res = await saveNews(body.data)
    if (res && res.code === 0) {
      console.log(state.newsList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 删除新闻
   * @param {*} state
   */
  async deleteNews({ state }, body) {
    const res = await deleteNews(body.data)
    if (res && res.code === 0) {
      console.log(state.newsList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取作品列表
   * @param {*} commit
   */
  async getWorksList({ commit }, body) {
    const res = await getWorksList(body.category)
    if (res && res.code === 0) {
      commit('setWorksList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存作品
   * @param {*} state
   */
  async saveWorks({ state }, body) {
    const res = await saveWorks(body.data)
    if (res && res.code === 0) {
      console.log(state.worksList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 删除作品
   * @param {*} state
   */
  async deleteWorks({ state }, body) {
    const res = await deleteWorks(body.data)
    if (res && res.code === 0) {
      console.log(state.worksList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取设计师列表
   * @param {*} commit
   */
  async getDesignerList({ commit }, body) {
    const res = await getDesignerList()
    if (res && res.code === 0) {
      commit('setDesignerList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存设计师
   * @param {*} state
   */
  async saveDesigner({ state }, body) {
    const res = await saveDesigner(body.data)
    if (res && res.code === 0) {
      console.log(state.designerList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 删除设计师
   * @param {*} state
   */
  async deleteDesigner({ state }, body) {
    const res = await deleteDesigner(body.data)
    if (res && res.code === 0) {
      console.log(state.worksList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 获取获奖列表
   * @param {*} commit
   */
  async getRewardList({ commit }, body) {
    const res = await getRewardList()
    if (res && res.code === 0) {
      commit('setRewardList', res.data)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 保存奖项
   * @param {*} state
   */
  async saveReward({ state }, body) {
    const res = await saveReward(body.data)
    if (res && res.code === 0) {
      console.log(state.designerList)
      body.callback && body.callback(res)
    }
  },
  /**
   * @author KarlHuang
   * @description 删除奖项
   * @param {*} state
   */
  async deleteReward({ state }, body) {
    const res = await deleteReward(body.data)
    if (res && res.code === 0) {
      console.log(state.worksList)
      body.callback && body.callback(res)
    }
  },
}
export default { state, getters, mutations, actions }
