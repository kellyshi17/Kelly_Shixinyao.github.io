/* 个人内容编辑指南
 * 1. 只修改引号里的文字；保留英文引号、逗号、方括号和花括号。
 * 2. 数组 [] 中每个 { ... } 是一条记录，两条记录之间用英文逗号分隔。
 * 3. 空数组 [] 会隐藏对应内容；顶部五个 View 导航始终保留；空字符串 "" 会隐藏可选字段。
 * 4. 以下注释模板不会公开显示。复制模板到对应 [] 内，再填写真实内容。
 * 5. 链接填写完整的 https:// 地址，站内资源使用 ./ 开头的相对路径。
 * 请勿填写电话、家庭地址、成绩单或私人文件链接。
 */
const portfolioContent = {
  // 这里修改英文姓名、中文姓名和职业定位。中文姓名留空时自动隐藏。
  name: "SHI XINYAO",
  chineseName: "施昕瑶",
  // 这里修改左上角个人品牌文字；末尾的圆点会自动添加，不必填写。
  wordmark: "KellyShi",
  positioning: "Project Management · Coordination · Problem Solving",
  heroSummary: "Exploring opportunities to bring clarity, coordination and purposeful execution to business teams.",

  // 这里修改个人简介。paragraphs 中每一段文字用英文逗号分隔。
  profile: {
    heading: "A focus on people, projects & progress.",
    paragraphs: ["My career interests span project management, project coordination, operations and management trainee opportunities."],
    // 这是职业兴趣方向，不是已经取得的技能或工作成果。
    focusAreas: ["Project Management", "Project Coordination", "Operations", "Management Trainee"]
  },

  // 能力 ID 用于 Story 匹配；修改显示文字时保持 id 不变。
  capabilities: [
    { id: "lead-coordinate", label: "Lead & Coordinate", description: "Aligning people, priorities and timelines to move work forward." },
    { id: "analyze-decide", label: "Analyze & Decide", description: "Turning complex information into structured insights and decisions." },
    { id: "deliver-improve", label: "Deliver & Improve", description: "Getting things done while finding better ways to work." },
    { id: "communicate-influence", label: "Communicate & Influence", description: "Connecting ideas and people through clear communication." },
    { id: "technical-context", label: "Technical Context", description: "Understanding technical context without losing sight of the bigger picture." }
  ],
  // 源代码是公开的！published 只控制界面，不能保护隐私。
  // 只填写已经确认公开的内容。复制下方模板并去掉每行开头的 // 即可新增。
  // id：唯一英文标识，如 story-01；发布后尽量不改，以免旧链接失效。
  // capabilities：从上方复制 id，主要能力放最前面；可同时填写多个。
  // featured：true 表示 All 状态优先推荐；priority：数字越大，同等条件越靠前。
  // image：相对图片路径；imageAlt：图片说明；没有图片保持空字符串。
  // gallery 每项为 { src: "", alt: "", caption: "" }。
  // evidence 每项为 { label: "", url: "" }，只链接确认公开的证据。
  // roleRelevance 预留岗位视角，本版不筛选。可用 general、project-program、
  // strategy-consulting、operations、energy-sustainability、commercial-client-facing。
  stories: [
    // {
    //   id: "", published: false, title: "", organization: "", contextLabel: "",
    //   period: "", summary: "", capabilities: [], roleRelevance: [],
    //   context: "", challenge: "", ownership: [], actions: [], outcome: "",
    //   image: "", imageAlt: "", gallery: [], externalLink: null, evidence: [],
    //   featured: false, priority: 0
    // }
  ],

  // 这里添加已确认的技能。每组必须填写 name 和至少一个 items 技能。
  skills: [
    // { name: "", items: [""] },
  ],

  // 这里添加真实奖项或亮点。title 必填；不填写未经确认的数字或成果。
  highlights: [
    // { title: "", organization: "", period: "", summary: "", link: { label: "", url: "" } },
  ],

  // 这里添加教育背景，按当前到过去排列。institution 学校名称必填。
  // 复制下面任意一个 { ... } 即可新增学校；两项之间保留英文逗号。
  // 空白模板：{ institution: "", qualification: "", period: "", location: "", details: [], gpa: "" }
  // 不上传或链接成绩单，不填写未确认的成绩。
  education: [
    {
      institution: "The Hong Kong University of Science and Technology", // 这里修改学校名称
      qualification: "Master of Science in Chemical and Energy Engineering", // 这里修改学位
      period: "Sep 2026 – Present", // 这里修改就读时间
      location: "Hong Kong SAR", // 这里填写地点；留空则隐藏
      details: ["QS World University Rankings 2027 · #33"], // 这里添加次级信息；没有内容用 []
      gpa: "" // 以后在这里填写 GPA，例如 "3.49 / 4.00"；留空不显示
    },
    {
      institution: "Guizhou University",
      qualification: "Bachelor of Engineering in Chemical Engineering and Technology",
      period: "Sep 2022 – Jul 2026",
      location: "Guiyang, China",
      details: ["National Double First-Class University · Former Project 211 University"],
      gpa: ""
    },
    {
      institution: "University of North Alabama",
      qualification: "Bachelor of Science in Occupational Health and Safety",
      period: "Sep 2022 – Jul 2026",
      location: "Florence, Alabama, USA",
      details: ["International Dual-Degree Program · English-taught"],
      gpa: ""
    }
  ],

  // 这里添加愿意公开的邮箱或职业主页；至少有一个有效联系方式才显示模块。
  contact: {
    heading: "Let’s connect.",
    description: "",
    email: "",
    // 仅填写确认公开、且不含成绩单的 CV 链接；未提供时不显示。
    cv: null,
    links: [
      // { label: "LinkedIn", url: "" },
    ]
  }
};
