import {
  uploadFile,
  saveCarousel,
  deleteCarousel,
  getCarousel,
} from '@/api/general'

const state = () => ({
  fileUrl: null,
})

const getters = {
  fileUrl: (state) => state.fileUrl,
}

const mutations = {
  /**
   * @author KarlHuang
   * @description 设置url
   * @param {*} state
   * @param {*} fileUrl
   */
  setFileUrl(state, fileUrl) {
    state.fileUrl = fileUrl
  },
}

const actions = {
  // 合同文件上传
  async uploadFile({ commit }, body) {
    const res = await uploadFile(body.data)
    if (res && res.code === 0) {
      commit('setFileUrl', res.data)
      body.callback && body.callback(res)
    } else {
      this.$message.error('上传失败，请稍后重试')
    }
  },
  async saveCarousel({ state }, body) {
    const res = await saveCarousel(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state)
    }
  },
  async deleteCarousel({ state }, body) {
    const res = await deleteCarousel(body.data)
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state)
    }
  },
  async getCarousel({ state }, body) {
    const res = await getCarousel()
    if (res && res.code === 0) {
      body.callback && body.callback(res)
      console.log(state)
    }
  },
}
export default { state, getters, mutations, actions }
