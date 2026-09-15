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
    {
      "published": true,
      "featured": true,
      "period": "",
      "image": "",
      "imageAlt": "",
      "gallery": [],
      "externalLink": null,
      "evidence": [],
      "id": "student-union-urgent-event",
      "priority": 100,
      "title": "Delivering an Urgent Campus Event on a Tight Timeline",
      "organization": "Student Union, Guizhou University",
      "contextLabel": "Project Coordination",
      "summary": "Coordinated people, suppliers and event preparation under a highly compressed timeline.",
      "capabilities": [
        "lead-coordinate",
        "deliver-improve",
        "communicate-influence"
      ],
      "roleRelevance": [
        "project-program",
        "operations",
        "management-trainee"
      ],
      "context": "A university-wide activity was assigned at approximately 20:00, with preparations required before 10:10 the following morning.",
      "challenge": "The preparation window was highly compressed, while procurement, promotional materials, staffing, teacher communication and on-site setup had to progress in parallel.",
      "ownership": [
        "Coordinating available student members",
        "Following up purchasing and materials preparation",
        "Supporting poster and banner preparation",
        "Communicating progress with teachers",
        "Coordinating on-site preparation"
      ],
      "actions": [
        "Used a previously organized member availability schedule to identify available people quickly.",
        "Split urgent tasks across available members and followed up progress.",
        "Coordinated procurement, promotional materials and preparation activities in parallel.",
        "Maintained communication with teachers and team members to keep preparation on schedule."
      ],
      "outcome": "The required preparation was completed within the available time window and the activity proceeded as scheduled."
    },
    {
      "published": true,
      "featured": true,
      "period": "",
      "image": "",
      "imageAlt": "",
      "gallery": [],
      "externalLink": null,
      "evidence": [],
      "id": "zhengda-market-research",
      "priority": 95,
      "title": "Turning a Tourism Trend into a National Award-Winning Market Study",
      "organization": "Zhengda Cup Market Research Competition",
      "contextLabel": "Market Research",
      "summary": "Helped structure and coordinate a market research project that progressed from field research to national recognition.",
      "capabilities": [
        "analyze-decide",
        "lead-coordinate",
        "communicate-influence"
      ],
      "roleRelevance": [
        "strategy-consulting",
        "project-program",
        "management-trainee"
      ],
      "context": "The team developed a market research project around an emerging tourism-related topic and needed to convert a broad idea into a structured study.",
      "challenge": "The project required the team to define a clear research direction, organize field research, coordinate responsibilities and translate collected information into a competition-ready study.",
      "ownership": [
        "Supporting topic and research-direction definition",
        "Coordinating task allocation",
        "Clarifying data and analysis requirements",
        "Coordinating external analytical support",
        "Supporting report and presentation preparation"
      ],
      "actions": [
        "Participated in structuring the research approach and questionnaire requirements.",
        "Coordinated responsibilities across the team.",
        "Helped clarify what evidence and analytical outputs were required.",
        "Coordinated with external analytical support rather than claiming statistical modelling as my own work.",
        "Supported the preparation of the final research output and competition presentation."
      ],
      "outcome": "Collected 649 valid questionnaires and achieved Provincial First Prize and National Third Prize in the competition."
    },
    {
      "published": true,
      "featured": true,
      "period": "",
      "image": "",
      "imageAlt": "",
      "gallery": [],
      "externalLink": null,
      "evidence": [],
      "id": "course-design-excel-workflow",
      "priority": 90,
      "title": "Improving a Team Design Workflow with Excel",
      "organization": "Undergraduate Aerodynamics Pipeline Course Design",
      "contextLabel": "Team Lead · Process Improvement",
      "summary": "Led a team course-design project while improving a calculation-heavy workflow through a reusable Excel formula library.",
      "capabilities": [
        "deliver-improve",
        "lead-coordinate",
        "analyze-decide"
      ],
      "roleRelevance": [
        "operations",
        "project-program",
        "management-trainee"
      ],
      "context": "An undergraduate aerodynamics pipeline course-design project required repeated engineering calculations, 3D modelling and coordinated team delivery.",
      "challenge": "Most team members were simultaneously preparing for postgraduate entrance examinations, while repeated manual calculations made several stages of the design process time-consuming.",
      "ownership": [
        "Team coordination and project progress",
        "Excel calculation workflow improvement",
        "Several time-intensive project tasks",
        "Full 3D modelling of the pipeline in SolidWorks"
      ],
      "actions": [
        "Built a reusable Excel formula library so team members could enter the required input data and obtain calculation results directly.",
        "Used the Excel workflow throughout different stages of the course design to reduce repetitive manual calculation.",
        "Adjusted task allocation around team members' availability and took ownership of several time-intensive tasks.",
        "Independently completed the full 3D SolidWorks model of the pipeline.",
        "Coordinated the team through final course-design delivery."
      ],
      "outcome": "The team completed the course design with a final score of 95/100, corresponding to full grade points for the course."
    }
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
