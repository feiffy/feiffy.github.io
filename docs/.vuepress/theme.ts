import { path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
  //主题选项
  //https://vuepress-theme-hope.github.io/v2/zh/config/theme/layout.html
  hostname: "https://newzone.top",

  author: {
    name: "清顺",
    url: "https://newzone.top",
  },

  iconAssets: "iconfont",
  logo: "/logo.svg",
  
  //是否全局启用路径导航
  breadcrumb: false,

  //页面元数据：贡献者，最后修改时间，编辑链接
  contributors: false,
  lastUpdated: false,
  editLink: false,

  //深色模式配置
  //darkmode: "disable",
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },
  fullscreen: true,

  // 默认为 GitHub. 同时也可以是一个完整的 URL
  repo: "feiffy/LearnData",
  // 自定义仓库链接文字。默认从 `repo` 中自动推断为 "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
  repoLabel: "GitHub",
  // 是否在导航栏内显示仓库链接，默认为 `true`
  repoDisplay: true,

  // docsDir: "demo/src",

  // navbar
  navbar: navbar,
  //导航栏布局
  navbarLayout: {
	left: ["Brand"],
	center: ["Links"],
	right: ["Repo", "Outlook", "Search"],
  },
  //是否在向下滚动时自动隐藏导航栏
  //navbarAutoHide: "always",


  //侧边栏排序规则
  //sidebarSorter: ['readme', 'order', 'title'],
  // sidebar
  sidebar: sidebar,

  // footer: "默认页脚",

  // displayFooter: true,
  pageInfo: ["Category", "Tag", "Word", "ReadingTime", "PageView"],
  //https://vuepress-theme-hope.github.io/v2/zh/config/frontmatter/layout.html#pageinfo
  // pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word", "ReadingTime"],

  //https://vuepress-theme-hope.github.io/v2/zh/config/theme/feature.html
  blog: {
    articleInfo: ["Date", "Category", "Tag", "ReadingTime", "PageView"],
    name: "FEIFFY",
    avatar: "/avatar_self.webp",
    description: "",
    intro: "/intro.html",
    roundAvatar: true,
    medias: {
      GitHub: "https://github.com/feiffy",
      Zhihu: "",
      Weibo: "",
      Wechat: "",
      少数派: [
        "",
        path.resolve(__dirname, "icons/sspai.svg"),
      ],
      RSS: "",
    },
  },

  plugins: {

    blog: {
      // 自动摘要
      autoExcerpt: true,
    },

    //评论配置（仅做样例，记得更换）
    comment: {
      //部署 Waline：https://waline.js.org/guide/get-started.html
      provider: "",
      serverURL: "",
      pageview: true,
      //Waline 等级标签
      walineLocales: {
        '/': {
          admin: '盛年不重来，一日难再晨',
          level0: '锻体',
          level1: '炼气',
          level2: '筑基',
          level3: '金丹',
          level4: '元婴',
          level5: '化神',
        },
      },
      //Giscus 备用配置
      //provider: "Giscus",
      //repo: "rockbenben/LearnData",
      //repoId: "R_kgDOHdfk6Q",
      //category: "Comments",
      //categoryId: "DIC_kwDOHdfk6c4CQYNn",
    },

    // 禁用不需要的配置
    mdEnhance: {
      footnote: true,
      tasklist: true,
      align: true,
      attrs: true,
      container: true,
      gfm: true,
      imageSize: true,
      include: true,
      lazyLoad: true,
      mark: true,
      sub: true,
      sup: true,
      //vpre: true,
    },
  },
});
