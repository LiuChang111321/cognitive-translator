import type { MbtiCode, MbtiProfile } from "./types";

const profiles: Record<MbtiCode, MbtiProfile> = {
  INTJ: {
    code: "INTJ",
    name: "INTJ",
    shortLabel: "战略型 / Strategic",
    communicationStyle: "结构化、战略化、长期导向",
    attentionBias: "倾向于先看系统漏洞、长期可行性、逻辑闭环",
    strengthInCommunication: "能快速识别结构性风险和逻辑漏洞，提供系统性思考",
    commonMisreadByOthers: "容易被误读为冷淡、否定、过度挑剔",
    underStressExpression: "在压力下可能更加固执己见、回避情绪沟通",
    preferredInput: "清晰目标、逻辑链、长期意义、边界明确的信息",
    preferredOutput: "结论先行、逻辑严密、结构清晰的表达",
    translationHints: {
      whenSending:
        "注意补充关系意图和情感温度，避免让对方感到被打压或否定",
      whenReceiving:
        "关注对方的核心意图而非表达形式，给予逻辑性回应",
    },
  },
  INTP: {
    code: "INTP",
    name: "INTP",
    shortLabel: "逻辑型 / Logical",
    communicationStyle: "分析型、概念型、原理导向",
    attentionBias: "倾向于拆解定义、检查逻辑一致性、探索理论可能性",
    strengthInCommunication: "能深入分析概念本质，发现逻辑断层和理论盲点",
    commonMisreadByOthers: "容易被误读为疏离、爱抬杠、拖延决策",
    underStressExpression: "在压力下可能过度分析、陷入理论化回避实际问题",
    preferredInput: "精确定义、假设边界、有讨论空间的问题",
    preferredOutput: "逻辑严密、概念清晰、留有探讨余地的表达",
    translationHints: {
      whenSending:
        "注意落地和行动导向，避免过度沉浸在概念分析中而忽略对方的感受和实际需求",
      whenReceiving:
        "理解对方的概念性思考方式，允许质疑和理论探索的空间",
    },
  },
  ENTJ: {
    code: "ENTJ",
    name: "ENTJ",
    shortLabel: "指挥型 / Commander",
    communicationStyle: "目标型、决策型、效率导向",
    attentionBias: "倾向于关注结果、资源配置、执行路径和责任归属",
    strengthInCommunication: "能快速明确目标、分配资源、推动执行",
    commonMisreadByOthers: "容易被误读为强势、控制欲强、压迫感强",
    underStressExpression: "在压力下可能更加独断专行、忽略他人感受",
    preferredInput: "结论先行、行动方案、优先级、明确的责任人",
    preferredOutput: "目标明确、路径清晰、时间线具体的指令式表达",
    translationHints: {
      whenSending:
        "注意放慢节奏，补充决策的理由和对人的考虑，避免命令式语气",
      whenReceiving:
        "理解对方的目标导向，直接回应核心诉求而非纠缠于细节",
    },
  },
  ENTP: {
    code: "ENTP",
    name: "ENTP",
    shortLabel: "辩论型 / Debater",
    communicationStyle: "发散型、辩论型、机会导向",
    attentionBias: "倾向于探索可能性、挑战假设、快速联想",
    strengthInCommunication: "能快速产生新想法、发现问题预设、灵活应变",
    commonMisreadByOthers: "容易被误读为不稳定、爱反驳、不认真",
    underStressExpression: "在压力下可能过度辩论、显得好斗或不专注",
    preferredInput: "开放讨论、新可能性、智力刺激、低约束表达",
    preferredOutput: "富有创意、开放、激发讨论的表达",
    translationHints: {
      whenSending:
        "注意结论导向和落地性，避免因发散让接收者感到困惑或不安全",
      whenReceiving:
        "尊重对方的探索性表达方式，给予挑战和讨论的空间",
    },
  },
  INFJ: {
    code: "INFJ",
    name: "INFJ",
    shortLabel: "倡导型 / Advocate",
    communicationStyle: "意义型、洞察型、关系深度导向",
    attentionBias: "倾向于关注动机、价值一致性、长期关系影响",
    strengthInCommunication: "能洞察深层动机和未言明的需求，提供有深度的视角",
    commonMisreadByOthers: "容易被误读为敏感、复杂、难以直接表达",
    underStressExpression: "在压力下可能过度牺牲自我、回避直接冲突",
    preferredInput: "真诚、深层意图、关系安全感、价值层面的说明",
    preferredOutput: "温和但有深度、兼顾意义和关系的表达",
    translationHints: {
      whenSending:
        "注意补充明确的结论和实际需求，避免过于含蓄让对方猜测",
      whenReceiving:
        "用真诚和深度的回应匹配对方的价值关切，避免表面化沟通",
    },
  },
  INFP: {
    code: "INFP",
    name: "INFP",
    shortLabel: "调停型 / Mediator",
    communicationStyle: "价值型、内在感受型、真实性导向",
    attentionBias: "倾向于关注个人意义、情绪真实性、是否违背内心价值",
    strengthInCommunication: "能敏锐感知情绪真实度和价值冲突，表达有温度的见解",
    commonMisreadByOthers: "容易被误读为情绪化、低效率、难落地",
    underStressExpression: "在压力下可能自我封闭或情绪爆发",
    preferredInput: "尊重感受、保留自主性、温和建议、意义解释",
    preferredOutput: "真实、温和、富有情感色彩的表达",
    translationHints: {
      whenSending:
        "注意补充实际方案和明确需求，避免情绪化表达让对方不知所措",
      whenReceiving:
        "尊重对方的内在价值和感受，用温和的方式回应，避免过度理性分析",
    },
  },
  ENFJ: {
    code: "ENFJ",
    name: "ENFJ",
    shortLabel: "主人公型 / Protagonist",
    communicationStyle: "关系组织型、共情型、群体氛围导向",
    attentionBias: "倾向于关注他人感受、团队凝聚力、共同成长",
    strengthInCommunication: "能有效协调团队氛围，理解多方需求，促进共识",
    commonMisreadByOthers: "容易被误读为过度介入、讨好、道德压力",
    underStressExpression: "在压力下可能过度承担他人情绪、忽视自我需求",
    preferredInput: "情感确认、共同目标、对人的影响、协作路径",
    preferredOutput: "热情、激励、兼顾多方感受的表达",
    translationHints: {
      whenSending:
        "注意留出独立决策空间，避免因过度关心而让对方感到压力",
      whenReceiving:
        "认可对方的共情和协调努力，回应群体的价值和目标",
    },
  },
  ENFP: {
    code: "ENFP",
    name: "ENFP",
    shortLabel: "倡导型 / Campaigner",
    communicationStyle: "可能性型、热情型、意义探索导向",
    attentionBias: "倾向于关注情绪能量、创意可能性、被理解感",
    strengthInCommunication: "能激发他人的热情和创造力，看到多种可能性",
    commonMisreadByOthers: "容易被误读为发散、不稳定、过度理想化",
    underStressExpression: "在压力下可能逃避结构化问题或过度情绪化",
    preferredInput: "情绪承接、共同兴奋感、开放空间、意义感",
    preferredOutput: "热情洋溢、富有感染力和想象力的表达",
    translationHints: {
      whenSending:
        "注意聚焦核心信息和落地可行性，避免因发散让接收者感到困惑",
      whenReceiving:
        "先承接情绪和可能性，再引导转向具体执行，避免直接否定对方的创意",
    },
  },
  ISTJ: {
    code: "ISTJ",
    name: "ISTJ",
    shortLabel: "物流型 / Logistician",
    communicationStyle: "责任型、秩序型、事实经验导向",
    attentionBias: "倾向于关注规则、可靠性、过往经验、责任履行",
    strengthInCommunication: "能确保信息准确、流程规范、承诺可靠",
    commonMisreadByOthers: "容易被误读为保守、僵硬、不够浪漫",
    underStressExpression: "在压力下可能更加固执于规则、抗拒变化",
    preferredInput: "事实依据、明确流程、承诺可靠性、具体步骤",
    preferredOutput: "准确、规范、条理清晰的表达",
    translationHints: {
      whenSending:
        "注意对新想法保持开放态度，避免因过于依赖经验而否定可能性",
      whenReceiving:
        "用事实和具体数据说话，尊重对方的经验和规则意识",
    },
  },
  ISFJ: {
    code: "ISFJ",
    name: "ISFJ",
    shortLabel: "守卫型 / Defender",
    communicationStyle: "照顾型、稳定型、细节责任导向",
    attentionBias: "倾向于关注具体关怀、关系稳定、现实支持",
    strengthInCommunication: "能细致周到地照顾他人需求，创造稳定的沟通氛围",
    commonMisreadByOthers: "容易被误读为不表达需求、过度牺牲、抗拒变化",
    underStressExpression: "在压力下可能过度自我牺牲或默默承受",
    preferredInput: "温和语气、具体感谢、稳定承诺、实际安排",
    preferredOutput: "温和、细致、关怀备至的表达",
    translationHints: {
      whenSending:
        "鼓励表达自己的真实需求，避免过度迎合对方而压抑自我",
      whenReceiving:
        "表达具体的感谢和认可，让对方感到被看见和被重视",
    },
  },
  ESTJ: {
    code: "ESTJ",
    name: "ESTJ",
    shortLabel: "总经理型 / Executive",
    communicationStyle: "管理型、执行型、规则效率导向",
    attentionBias: "倾向于关注效率、标准、流程、责任边界",
    strengthInCommunication: "能有效组织资源、建立规范、推动执行",
    commonMisreadByOthers: "容易被误读为命令式、缺乏共情、只看结果",
    underStressExpression: "在压力下可能更加专断、忽略他人感受",
    preferredInput: "明确目标、标准、时间线、可执行方案",
    preferredOutput: "直接、明确、条理清晰的指令式表达",
    translationHints: {
      whenSending:
        "注意补充对人的关怀和情感温度，避免纯粹的任务导向让对方感到被工具化",
      whenReceiving:
        "直接回应任务和目标，同时用事实和效率来说服对方",
    },
  },
  ESFJ: {
    code: "ESFJ",
    name: "ESFJ",
    shortLabel: "执政官型 / Consul",
    communicationStyle: "协调型、关怀型、社会秩序导向",
    attentionBias: "倾向于关注礼貌、关系和谐、他人反馈、共同规范",
    strengthInCommunication: "能营造和谐氛围，关注每个人的感受和参与度",
    commonMisreadByOthers: "容易被误读为在意评价、过度社交化、管太多",
    underStressExpression: "在压力下可能过度寻求认可或关系紧张",
    preferredInput: "友好语气、关系确认、共同规范、具体关心",
    preferredOutput: "友好、得体、兼顾社交礼仪的表达",
    translationHints: {
      whenSending:
        "注意在表达中留出直接和真实的空间，避免因过度追求和谐而回避问题",
      whenReceiving:
        "用友好和肯定的方式回应，先确认关系再有分歧讨论",
    },
  },
  ISTP: {
    code: "ISTP",
    name: "ISTP",
    shortLabel: "鉴赏家型 / Virtuoso",
    communicationStyle: "工具型、问题解决型、现实操作导向",
    attentionBias: "倾向于关注实际可行、直接解决、低废话、高自主",
    strengthInCommunication: "能快速找到问题的核心并提出实用的解决方案",
    commonMisreadByOthers: "容易被误读为冷漠、不解释、不投入",
    underStressExpression: "在压力下可能更加回避沟通、独自行事",
    preferredInput: "简洁信息、实际问题、操作空间、少情绪压力",
    preferredOutput: "简洁、直接、聚焦于解决问题本身的表达",
    translationHints: {
      whenSending:
        "注意补充必要的关系维护和情感表达，避免因过于简洁而显得冷漠",
      whenReceiving:
        "直奔主题，减少情绪铺垫，尊重对方的独立操作空间",
    },
  },
  ISFP: {
    code: "ISFP",
    name: "ISFP",
    shortLabel: "探险家型 / Adventurer",
    communicationStyle: "体验型、审美型、个人边界导向",
    attentionBias: "倾向于关注当下感受、个人节奏、真实体验、审美舒适度",
    strengthInCommunication: "能细腻地表达感受和审美判断，创造舒适的个人空间",
    commonMisreadByOthers: "容易被误读为被动、难规划、回避冲突",
    underStressExpression: "在压力下可能退缩到个人空间或拒绝沟通",
    preferredInput: "温柔表达、尊重选择、低压建议、具体体验",
    preferredOutput: "温和、有美感、尊重个人边界的表达",
    translationHints: {
      whenSending:
        "鼓励表达自己的真实想法和需求，避免因回避冲突而沉默",
      whenReceiving:
        "用温柔和尊重的方式沟通，给对方足够的空间和时间回应",
    },
  },
  ESTP: {
    code: "ESTP",
    name: "ESTP",
    shortLabel: "企业家型 / Entrepreneur",
    communicationStyle: "行动型、现实刺激型、即时反馈导向",
    attentionBias: "倾向于关注当下机会、直接行动、现实收益、互动刺激",
    strengthInCommunication: "能快速抓住机会、推动行动、活跃氛围",
    commonMisreadByOthers: "容易被误读为冲动、不长远、不够细腻",
    underStressExpression: "在压力下可能更加冒险或忽视长期后果",
    preferredInput: "简短直接、现实好处、即时反馈、可马上行动",
    preferredOutput: "直接、有力、行动导向的表达",
    translationHints: {
      whenSending:
        "注意补充长期考量和细节规划，避免因过于追求即刻效果而忽略风险",
      whenReceiving:
        "用简洁直接的方式沟通，强调现实利益和行动价值",
    },
  },
  ESFP: {
    code: "ESFP",
    name: "ESFP",
    shortLabel: "表演者型 / Entertainer",
    communicationStyle: "表达型、体验型、氛围驱动导向",
    attentionBias: "倾向于关注当下快乐、情绪感染、人际互动、具体体验",
    strengthInCommunication: "能营造愉悦氛围，用热情感染他人，带动互动",
    commonMisreadByOthers: "容易被误读为不严肃、逃避规划、注意力分散",
    underStressExpression: "在压力下可能过度娱乐化或回避严肃话题",
    preferredInput: "积极反馈、轻松语气、具体体验、情绪共振",
    preferredOutput: "热情、生动、富有感染力的表达",
    translationHints: {
      whenSending:
        "注意在轻松表达中补充实质内容和承诺，避免显得不够认真",
      whenReceiving:
        "用积极和热情的方式回应，先共鸣再引导到深度话题",
    },
  },
};

export function getMbtiProfile(code: MbtiCode): MbtiProfile {
  return profiles[code];
}

export function getMbtiShortLabel(code: MbtiCode): string {
  return profiles[code].shortLabel;
}

export { profiles };
