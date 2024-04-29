<template>
  <div class="designer-container">
    <div class="designer-list-title">设计师列表</div>
    <div
      class="card-list-container"
      v-for="(item, index) in designerList"
      v-bind:key="index"
    >
      <row-card
        :designerDetail="item"
        :index="index"
        @update="getDesignerListFun"
      ></row-card>
    </div>
    <div class="add-new">
      <a-button style="margin-right: 10px" @click="addNew" type="primary">
        <PlusOutlined />
        添加
      </a-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import RowCard from './component/row-card.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  export default {
    name: 'TeamDesigner',
    components: {
      RowCard,
      PlusOutlined,
    },
    data() {
      return {
        designerList: [],
      }
    },
    methods: {
      ...mapActions({
        getDesignerList: 'ateliter/getDesignerList',
      }),
      initDesignerList() {
        this.designerList = []
        const element = {
          name: '',
          description: '',
          avatar: '',
          weight: 0,
        }
        this.designerList.push(element)
      },
      addNew() {
        const element = {
          name: '',
          description: '',
          avatar: '',
          weight: 0,
        }
        this.designerList.push(element)
      },
      getDesignerListFun(value) {
        if (value) {
          this.designerList.splice(value, 1)
        } else {
          this.getDesignerList({
            callback: (res) => {
              if (
                res.data &&
                typeof res.data.length === 'number' &&
                res.data.length !== 0
              ) {
                this.designerList = res.data
              } else {
                this.initDesignerList()
              }
            },
          })
        }
      },
    },
    mounted() {
      this.initDesignerList()
      this.getDesignerListFun()
    },
  }
</script>
<style lang="less" scoped>
  .designer-container {
    .designer-list-title {
      font-size: 28px;
      font-size: bold;
      margin-bottom: 20px;
    }
    .card-list-container {
      padding: 20px;
    }
  }
  .add-new {
    text-align: center;
  }
</style>
