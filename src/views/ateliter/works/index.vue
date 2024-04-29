<template>
  <div>
    <div class="department-select">
      <div class="department-title">类别选择：</div>
      <a-select
        default-value="空间"
        style="width: 120px"
        @change="handleCategoryChange"
      >
        <a-select-option
          v-for="(item, index) in categoryList"
          v-bind:key="index"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
    <div class="news-container" v-if="worksList && worksList.length !== 0">
      <div class="news-nav">
        <div class="main-title">作品列表</div>
        <div
          class="side-element"
          v-bind:class="{ active: this.tempKey === index }"
          v-for="(ele, index) in worksList"
          v-bind:key="ele ? ele._id : index"
        >
          <div class="news-title" @click="changeItem(index)">
            {{ ele.title_cn }}
          </div>
          <a-popconfirm
            title="确定删除吗？"
            @confirm="deleteWorksFun(ele._id, index)"
          >
            <a-button style="margin-right: 10px" type="danger">删除</a-button>
          </a-popconfirm>
        </div>
        <div>
          <a-button type="primary" @click="addWorks">
            <PlusOutlined />
            添加新闻
          </a-button>
        </div>
      </div>
      <div class="news-side">
        <div class="main-title">作品详情</div>
        <div class="news-main-input">
          <div style="width: 120px">中文标题：</div>
          <a-input v-model:value="worksList[tempKey].title_cn"></a-input>
        </div>
        <div class="news-main-input">
          <div style="width: 120px">英文标题：</div>
          <a-input v-model:value="worksList[tempKey].title_en"></a-input>
        </div>
        <div class="news-main-input">
          <div style="width: 120px">内容：</div>
          <a-textarea
            v-model:value="worksList[tempKey].body"
            size="large"
          ></a-textarea>
        </div>
        <div class="news-main-input">
          <div style="width: 120px">项目信息：</div>
          <a-textarea
            v-model:value="worksList[tempKey].project_info"
            size="large"
          ></a-textarea>
        </div>
        <div class="news-main-input">
          <div style="width: 120px">权重：</div>
          <a-input-number
            v-model:value="worksList[tempKey].weight"
          ></a-input-number>
        </div>
        <div class="news-main-input">
          <div style="width: 120px">时间：</div>
          <div v-if="worksList[tempKey].created_at">
            {{ formatDate(worksList[tempKey].created_at) }}
            <span class="delete-date" @click="deleteDate">
              <DeleteOutlined />
            </span>
          </div>
          <a-date-picker v-else @change="createDateChange" />
        </div>
        <div class="image-title">作品图片集（第一张图片为首图）</div>
        <div
          class="news-card-list-container"
          v-for="(item, index) in worksList[tempKey].images"
          v-bind:key="index"
        >
          <row-card
            :newsDetail="item"
            :index="index"
            @changed="newsDetailChanged"
            @updateImage="handleImageUpdated"
          ></row-card>
        </div>
        <div class="add-new">
          <a-button
            style="margin-right: 10px"
            @click="addNewImage"
            type="primary"
          >
            <PlusOutlined />
            添加作品图片
          </a-button>
        </div>
        <div class="add-news">
          <a-button
            style="margin-right: 10px"
            @click="submitWorks"
            type="primary"
          >
            提交
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import RowCard from './component/row-card.vue'
  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
  import Moment from 'moment'
  export default {
    name: 'Works',
    components: {
      RowCard,
      PlusOutlined,
      DeleteOutlined,
    },
    data() {
      return {
        show: false,
        worksList: [],
        tempKey: 0,
        tempObject: {
          title_cn: '默认标题',
          title_en: 'default title',
          body: '',
          project_info: '',
          weight: 0,
          category: 'space',
          created_at: '',
          images: [
            {
              url: '',
              comment: '',
            },
          ],
        },
        categoryList: [
          {
            label: '空间',
            value: 'space',
          },
          {
            label: '平面',
            value: 'graphic',
          },
          {
            label: '产品',
            value: 'product',
          },
        ],
        category: 'space',
      }
    },
    methods: {
      ...mapActions({
        getWorksList: 'ateliter/getWorksList',
        saveWorks: 'ateliter/saveWorks',
        deleteWorks: 'ateliter/deleteWorks',
      }),
      initWorksList() {
        this.worksList = []
        const element = {
          title_cn: '默认标题',
          title_en: 'default title',
          body: '',
          project_info: '',
          weight: 0,
          category: this.category,
          created_at: '',
          images: [
            {
              url: '',
              comment: '',
            },
          ],
        }
        this.worksList.push(element)
        this.tempObject = this.worksList[0]
      },
      formatDate(date) {
        return Moment(date).format('YYYY-MM-DD')
      },
      changeItem(index) {
        this.tempKey = index
        this.tempObject = this.worksList[index]
      },
      handleCategoryChange(value) {
        this.category = this.categoryList[value].value
        this.getWorksListFun(this.value)
      },
      newsDetailChanged(value) {
        this.worksList[this.tempKey].images[value.index] = value.image
        this.tempObject = this.worksList[this.tempKey]
      },
      createDateChange(date, dateString) {
        this.worksList[this.tempKey].created_at = dateString
      },
      handleImageUpdated(value) {
        this.worksList[this.tempKey].images.splice(value, 1)
      },
      deleteDate() {
        this.worksList[this.tempKey].created_at = ''
      },
      deleteWorksFun(id, index) {
        if (id) {
          this.deleteWorks({
            data: {
              _id: id,
            },
            callback: (res) => {
              if (res) {
                this.getWorksListFun()
              }
            },
          })
        } else {
          this.tempKey = index > 0 ? index - 1 : index + 1
          this.worksList.splice(index, 1)
        }
      },
      addWorks() {
        const element = {
          title_cn: '默认标题',
          title_en: 'default title',
          body: '',
          project_info: '',
          weight: 0,
          category: this.category,
          created_at: '',
          images: [
            {
              url: '',
              comment: '',
            },
          ],
        }
        this.worksList.push(element)
        this.tempKey = this.worksList.length - 1
      },
      addNewImage() {
        const element = {
          url: '',
          comment: '',
        }
        this.worksList[this.tempKey].images.push(element)
      },
      submitWorks() {
        this.saveWorks({
          data: this.worksList[this.tempKey],
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.getWorksListFun()
            }
          },
        })
      },
      getWorksListFun() {
        this.getWorksList({
          category: this.category,
          callback: (res) => {
            if (
              res.data &&
              typeof res.data.length === 'number' &&
              res.data.length !== 0
            ) {
              this.worksList = res.data
              this.tempKey = 0
              this.tempObject = this.worksList[this.tempKey]
            } else {
              this.initWorksList()
            }
          },
        })
      },
    },
    mounted() {
      this.initWorksList()
      this.getWorksListFun()
    },
  }
</script>
<style lang="less" scoped>
  .department-select {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
  }
  .news-container {
    display: flex;
    .news-nav {
      width: 300px;
      .side-element {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 24px;
        padding: 5px;
        .news-title {
          width: 250px;
          padding-right: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        .news-title:hover {
          color: #1890ff;
        }
      }
    }
    .news-side {
      padding: 0 30px;
      flex: 1;
      .news-main-input {
        margin-bottom: 40px;
        font-size: 18px;
        div {
          margin-bottom: 10px;
        }
      }
      .image-title {
        font-size: 26px;
        font-weight: bold;
      }
    }
    .news-card-list-container {
      margin-top: 50px;
    }
  }
  .add-new {
    text-align: center;
  }
  .delete-date {
    margin-left: 20px;
    cursor: pointer;
  }
  .active {
    box-shadow: 4px 5px 10px 0 lightgrey;
  }
  .main-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
