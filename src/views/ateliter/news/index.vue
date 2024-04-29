<template>
  <div class="news-container" v-if="newsList && newsList.length !== 0">
    <div class="news-nav">
      <div class="main-title">新闻列表</div>
      <div
        class="side-element"
        v-bind:class="{ active: this.tempKey === index }"
        v-for="(ele, index) in newsList"
        v-bind:key="ele ? ele._id : index"
      >
        <div class="news-title" @click="changeItem(index)">{{ ele.title }}</div>
        <a-popconfirm
          title="确定删除吗？"
          @confirm="deleteNewsFun(ele._id, index)"
        >
          <a-button style="margin-right: 10px" type="danger">删除</a-button>
        </a-popconfirm>
      </div>
      <div>
        <a-button type="primary" @click="addNews">
          <PlusOutlined />
          添加新闻
        </a-button>
      </div>
    </div>
    <div class="news-side">
      <div class="main-title">新闻详情</div>
      <div class="news-main-input">
        <div style="width: 120px">标题：</div>
        <a-input v-model:value="newsList[tempKey].title"></a-input>
      </div>
      <div class="news-main-input">
        <div style="width: 120px">内容：</div>
        <a-textarea
          v-model:value="newsList[tempKey].body"
          size="large"
        ></a-textarea>
      </div>
      <div class="news-main-input">
        <div style="width: 120px">项目信息：</div>
        <a-textarea
          v-model:value="newsList[tempKey].project_info"
          size="large"
        ></a-textarea>
      </div>
      <div class="news-main-input">
        <div style="width: 120px">跳转链接：</div>
        <a-input
          v-model:value="newsList[tempKey].link"
          size="large"
        ></a-input>
      </div>
      <div class="news-main-input">
        <div style="width: 120px">时间：</div>
        <div v-if="newsList[tempKey].created_at">
          {{ formatDate(newsList[tempKey].created_at) }}
          <span class="delete-date" @click="deleteDate">
            <DeleteOutlined />
          </span>
        </div>
        <a-date-picker v-else @change="createDateChange" />
      </div>
      <div class="image-title">新闻图片集（第一张图片为首图）</div>
      <div
        class="news-card-list-container"
        v-for="(item, index) in newsList[tempKey].images"
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
          添加新闻图片
        </a-button>
      </div>
      <div class="add-news">
        <a-button style="margin-right: 10px" @click="submitNews" type="primary">
          提交
        </a-button>
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
    name: 'News',
    components: {
      RowCard,
      PlusOutlined,
      DeleteOutlined,
    },
    data() {
      return {
        newsList: [],
        tempKey: 0,
        tempObject: {
          title: '默认标题',
          body: '',
          project_info: '',
          link:'',
          created_at: '',
          images: [
            {
              url: '',
              comment: '',
            },
          ],
        },
      }
    },
    methods: {
      ...mapActions({
        getNewsList: 'ateliter/getNewsList',
        saveNews: 'ateliter/saveNews',
        deleteNews: 'ateliter/deleteNews',
      }),
      initMemberList() {
        this.newsList = []
        const element = {
          title: '默认标题',
          body: '',
          project_info: '',
          link: '',
          created_at: '',
          images: [
            {
              url: '',
              comment: '',
            },
          ],
        }
        this.newsList.push(element)
        this.tempObject = this.newsList[0]
      },
      formatDate(date) {
        return Moment(date).format('YYYY-MM-DD')
      },
      changeItem(index) {
        this.tempKey = index
        this.tempObject = this.newsList[index]
      },
      newsDetailChanged(value) {
        this.newsList[this.tempKey].images[value.index] = value.image
        this.tempObject = this.newsList[this.tempKey]
      },
      createDateChange(date, dateString) {
        console.log(date)
        this.newsList[this.tempKey].created_at = dateString
      },
      handleImageUpdated(value) {
        this.newsList[this.tempKey].images.splice(value, 1)
      },
      deleteDate() {
        this.newsList[this.tempKey].created_at = ''
      },
      deleteNewsFun(id, index) {
        if (id) {
          this.deleteNews({
            data: {
              _id: id,
            },
            callback: (res) => {
              if (res) {
                this.getNewsListFun()
              }
            },
          })
        } else {
          this.tempKey = index > 0 ? index - 1 : index + 1
          this.newsList.splice(index, 1)
        }
      },
      addNews() {
        const element = {
          title: '默认标题',
          body: '',
          created_at: '',
          project_info: '',
          link: '',
          images: [
            {
              url: '',
              comment: '',
            },
          ],
        }
        this.newsList.push(element)
        this.tempKey = this.newsList.length - 1
      },
      addNewImage() {
        const element = {
          url: '',
          comment: '',
        }
        this.newsList[this.tempKey].images.push(element)
      },
      submitNews() {
        this.saveNews({
          data: this.newsList[this.tempKey],
          callback: (res) => {
            if (res) {
              this.$message.success('提交成功。')
              this.getNewsListFun()
            }
          },
        })
      },
      getNewsListFun() {
        this.getNewsList({
          callback: (res) => {
            if (
              res.data &&
              typeof res.data.length === 'number' &&
              res.data.length !== 0
            ) {
              this.newsList = res.data
              this.tempKey = 0
              this.tempObject = this.newsList[this.tempKey]
            } else {
              this.initMemberList()
            }
          },
        })
      },
    },
    mounted() {
      this.initMemberList()
      this.getNewsListFun()
    },
  }
</script>
<style lang="less" scoped>
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
