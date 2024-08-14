import { defineConfig } from 'vitepress'
import markdownItAnchor from 'markdown-it-anchor'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/web3.js-docs/',
  title: "web3.js",
  description: "web3.js 文档",
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' }]
  ],
 
  markdown: {
   
   
  },
  themeConfig: {
    outline: {
      level: [2, 3],
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guides/web3_eth/eth' },
    ],
    sidebar: {
      '/guides': [{
        text: 'Web3Eth 包指南',
        items: [{
          text: '熟练掌握 Web3Eth 包',
          link: '/guides/web3_eth/eth'
        },
        {
          text: '学习 Web3Eth 内部的方法',
          link: '/guides/web3_eth/methods'
        }]
      },]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
