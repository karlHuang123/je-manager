import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/team-member',
    alwaysShow: true,
    meta: {
      title: '介绍',
      icon: 'bill-line',
    },
    children: [
      {
        path: 'team-member',
        name: 'TeamMember',
        component: () => import('@/views/introduction/team-member'),
        meta: {
          title: '团队成员',
          icon: 'group-line',
        },
      },
      {
        path: 'college-life',
        name: 'CollegeLife',
        component: () => import('@/views/introduction/college-life'),
        meta: {
          title: '塾内生活',
          icon: 'home-8-line',
        },
      },
      {
        path: 'qualify-score',
        name: 'QualifyScore',
        component: () => import('@/views/introduction/qualify-score'),
        meta: {
          title: '合格实绩',
          icon: 'task-line',
        },
      },
      {
        path: 'qualify-case',
        name: 'QualifyCase',
        component: () => import('@/views/introduction/qualify-case'),
        meta: {
          title: '合格案例',
          icon: 'book-2-line',
        },
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('@/views/introduction/tags'),
        meta: {
          title: '标签管理',
          icon: 'price-tag-3-line',
        },
      },
    ],
  },
  {
    path: '/ateliter',
    component: Layout,
    redirect: '/ateliter/news',
    alwaysShow: true,
    meta: {
      title: '堺工作室',
      icon: 'ancient-pavilion-line',
    },
    children: [
      {
        path: 'news',
        name: 'News',
        component: () => import('@/views/ateliter/news'),
        meta: {
          title: '新闻',
          icon: 'newspaper-line',
        },
      },
      {
        path: 'works',
        name: 'Works',
        component: () => import('@/views/ateliter/works'),
        meta: {
          title: '作品',
          icon: 'brush-line',
        },
      },
      {
        path: 'designer',
        name: 'Designer',
        component: () => import('@/views/ateliter/designer'),
        meta: {
          title: '设计师',
          icon: 'quill-pen-line',
        },
      },
      {
        path: 'reward',
        name: 'Reward',
        component: () => import('@/views/ateliter/reward'),
        meta: {
          title: '获奖情况',
          icon: 'medal-line',
        },
      },
    ],
  },
  {
    path: '/college',
    component: Layout,
    redirect: '/college/career',
    alwaysShow: true,
    meta: {
      title: '堺塾',
      icon: 'building-4-line',
    },
    children: [
      {
        path: 'career',
        name: 'Career',
        component: () => import('@/views/college/career'),
        meta: {
          title: '升学资讯',
          icon: 'upload-line',
        },
      },
      {
        path: 'discipline',
        name: 'Discipline',
        component: () => import('@/views/college/discipline'),
        meta: {
          title: '课程详解',
          icon: 'book-line',
        },
      },
      {
        path: 'qAndA',
        name: 'QAndA',
        component: () => import('@/views/college/qAndA'),
        meta: {
          title: '资料库/Q&A',
          icon: 'question-answer-line',
        },
      },
      {
        path: 'raise',
        name: 'Raise',
        component: () => import('@/views/college/raise'),
        meta: {
          title: '资料库/募集要项',
          icon: 'file-info-line',
        },
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
