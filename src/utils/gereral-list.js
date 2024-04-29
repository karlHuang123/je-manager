const listData = {
  departmentList: [
    {
      label: '建筑大类',
      value: 'architecture',
    },
    {
      label: '理工大类',
      value: 'engineering',
    },
    {
      label: '艺术大类',
      value: 'art',
    },
  ],
  commentHeaderList: [
    {
      label: '各类申请',
      value: 'apply',
    },
    {
      label: '研究计划书',
      value: 'plan',
    },
    {
      label: '笔试课程',
      value: 'exam',
    },
    {
      label: '面试辅导',
      value: 'interview',
    },
    {
      label: '专项辅导',
      value: 'subject',
    },
  ],
  commentHeaderListArt: [
    {
      label: '各类申请',
      value: 'apply',
    },
    {
      label: '研究计划书',
      value: 'plan',
    },
    {
      label: '作品集',
      value: 'essay',
    },
    {
      label: '实技',
      value: 'skills',
    },
    {
      label: '面试辅导',
      value: 'interview',
    },
    {
      label: '小论文',
      value: 'article',
    },
    {
      label: '专项辅导',
      value: 'subject',
    },
  ],
  listColumns: [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      fixed: 'left',
      width: 200,
    },
    {
      title: '主讲老师',
      dataIndex: 'presenter',
      key: 'presenter',
      fixed: 'left',
    },
    {
      title: '更多操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 300,
      fixed: 'right',
      slots: { customRender: 'operation' },
    },
  ],
}

export { listData }
