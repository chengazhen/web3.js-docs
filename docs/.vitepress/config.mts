import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/web3.js-docs/',
  title: "web3.js",
  description: "web3.js 文档",
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' }]
  ],
  ignoreDeadLinks: true,
  markdown: {
    toc: {
      level: [2, 3]
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guides/web3_eth/eth' },
    ],

    sidebar: {

      '/guides': [{
        text: 'web3 Eth module（Web3Eth 模块）',
        items: [{
          text: 'Mastering the Web3Eth package(熟练掌握Web3Eth包)',
          link: '/guides/web3_eth/eth'
        },
        {
          text: 'Web3Eth methods（Web3Eth 可以使用的方法)',
          link: '/guides/web3_eth/methods'
        }]
      },]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
