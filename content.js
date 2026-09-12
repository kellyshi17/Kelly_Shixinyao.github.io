/* 个人内容编辑指南
 * 1. 只修改引号里的文字；保留英文引号、逗号、方括号和花括号。
 * 2. 数组 [] 中每个 { ... } 是一条记录，两条记录之间用英文逗号分隔。
 * 3. 空数组 [] 会隐藏整个模块和导航；空字符串 "" 会隐藏可选字段。
 * 4. 以下注释模板不会公开显示。复制模板到对应 [] 内，再填写真实内容。
 * 5. 链接填写完整的 https:// 地址，站内资源使用 ./ 开头的相对路径。
 * 请勿填写电话、家庭地址、成绩单或私人文件链接。
 */
const portfolioContent = {
  // 这里修改姓名、职业定位；initials 是左上角的姓名缩写。
  name: "SHI XINYAO",
  initials: "SX",
  positioning: "Project Management · Coordination · Problem Solving",
  heroSummary: "Exploring opportunities to bring clarity, coordination and purposeful execution to business teams.",

  // 这里修改个人简介。paragraphs 中每一段文字用英文逗号分隔。
  profile: {
    heading: "A focus on people, projects & progress.",
    paragraphs: ["My career interests span project management, project coordination, operations and management trainee opportunities."],
    // 这是职业兴趣方向，不是已经取得的技能或工作成果。
    focusAreas: ["Project Management", "Project Coordination", "Operations", "Management Trainee"]
  },

  // 这里添加经历。title 是必填的职位或经历名称，其他字段可删除或留空。
  experience: [
    // { title: "", organization: "", period: "", summary: "", bullets: [""], tags: [""], link: { label: "", url: "" } },
  ],

  // 这里添加项目。复制这一项即可新增项目，填写 title 后才会显示。
  projects: [
    // { title: "", category: "", period: "", summary: "", role: "", actions: [""], outcome: "", tags: [""], link: { label: "", url: "" } },
  ],

  // 这里添加活动、志愿服务或领导力经历。title 必填。
  activities: [
    // { title: "", organization: "", period: "", summary: "", bullets: [""], tags: [""], link: { label: "", url: "" } },
  ],

  // 这里添加已确认的技能。每组必须填写 name 和至少一个 items 技能。
  skills: [
    // { name: "", items: [""] },
  ],

  // 这里添加真实奖项或亮点。title 必填；不填写未经确认的数字或成果。
  highlights: [
    // { title: "", organization: "", period: "", summary: "", link: { label: "", url: "" } },
  ],

  // 这里添加教育背景。institution 必填，不上传或链接成绩单。
  education: [
    // { institution: "", qualification: "", period: "", description: "" },
  ],

  // 这里添加愿意公开的邮箱或职业主页；至少有一个有效联系方式才显示模块。
  contact: {
    heading: "Let’s connect.",
    description: "",
    email: "",
    links: [
      // { label: "LinkedIn", url: "" },
    ]
  }
};
