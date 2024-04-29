<template>
  <div class="card-container" v-if="courseStructureDetailCard">
    <div class="card-text">
      <div class="card-input">
        <div style="width: 109px">课程名称：</div>
        <a-input
          v-model:value="courseStructureDetailCard.course_name"
        ></a-input>
      </div>
      <div class="card-input">
        <div style="width: 95px">权重：</div>
        <a-input-number
          v-model:value="courseStructureDetailCard.weight"
        ></a-input-number>
      </div>
      <div
        class="card-input"
        v-for="(item, index) in courseStructureDetailCard.items"
        v-bind:key="index"
      >
        <div style="width: 119px">专业课{{ index + 1 }}:</div>
        <a-input v-model:value="item.majorCourse"></a-input>
        <div style="margin-left: 10px">
          <a-button type="danger" @click="deleteMajor(index)">
            <CloseOutlined />
          </a-button>
        </div>
      </div>
      <div style="text-align: right">
        <a-button type="primary" @click="addMajor">
          <PlusOutlined />
          添加专业课
        </a-button>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <a-button
      style="margin-right: 10px"
      @click="saveCourseStructure(cardIndex)"
      type="primary"
    >
      保存课程
    </a-button>
    <a-popconfirm
      title="确定删除吗？"
      @confirm="() => deleteCourseStructure(cardIndex)"
    >
      <a-button type="danger">删除课程</a-button>
    </a-popconfirm>
  </div>
</template>

<script>
  import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue'
  export default {
    name: 'RowCardStructure',
    props: {
      courseStructureDetail: {
        type: Object,
      },
      cardIndex: {
        type: Number,
      },
    },
    components: { CloseOutlined, PlusOutlined },
    data() {
      return {
        courseStructureDetailCard: {
          course_name: '',
          weight: 0,
          items: [
            {
              majorCourse: '',
            },
          ],
        },
      }
    },
    methods: {
      saveCourseStructure(cardIndex) {
        this.$emit('callSave', {
          cardIndex: cardIndex,
          courseItem: this.courseStructureDetailCard,
        })
      },
      deleteCourseStructure(cardIndex) {
        this.$emit('callSave', { cardIndex: cardIndex })
      },
      addMajor() {
        const ele = {
          majorCourse: '',
        }
        this.courseStructureDetailCard.items.push(ele)
      },
      deleteMajor(index) {
        if (this.courseStructureDetailCard.items.length === 1) {
          this.$message.error('至少保留一门专业课。')
        } else {
          this.courseStructureDetailCard.items.splice(index, 1)
        }
      },
    },
    watch: {
      courseStructureDetail: {
        handler(newVal) {
          if (newVal) {
            this.courseStructureDetailCard = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.courseStructureDetailCard = JSON.parse(
        JSON.stringify(this.courseStructureDetail)
      )
    },
  }
</script>
<style lang="less" scoped>
  .card-container {
    display: flex;
    align-items: center;
    .card-image {
      width: 120px;
    }
    .card-text {
      flex: 1;
      margin-left: auto;
      .card-input {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
    }
  }
  .btn-group {
    margin-top: 20px;
    margin-left: 110px;
  }
</style>
