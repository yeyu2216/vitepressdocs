import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/py-js-c/',
  lang: 'zh-CN',
  title: "java面试文档",
  description: "简单的Java面试文档",
  themeConfig: {
    siteTitle: 'Java面试文档',
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: '笔记',
        items: [
          { text: 'Java常见面试题', link: '/markdown-examples' },
          { text: 'spring必背', link: '/api-examples' },
          { text: 'springMvc必背', link: '/spring-mvc'}
        ]
      }
      
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
