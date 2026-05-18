export interface ViralScene {
  id: string;
  sender: string;
  receiver: string;
  original: string;
  heardAs: string;
  actuallyMeans: string;
  roast: string;
}

export const viralScenes: ViralScene[] = [
  {
    id: "scene-1",
    sender: "INTJ",
    receiver: "ENFP",
    original: "这个方案逻辑不完整。",
    heardAs: "你是不是又在否定我🥲",
    actuallyMeans: "我其实是认真在帮你查漏洞。",
    roast: "INTJ在查bug，ENFP在查爱不爱。",
  },
  {
    id: "scene-2",
    sender: "ENFP",
    receiver: "INTJ",
    original: "我就是觉得我们最近没有以前那种感觉了。",
    heardAs: "所以你到底想解决什么问题？",
    actuallyMeans: "我想重新感受到你在乎我。",
    roast: "ENFP在要情绪连接，INTJ在等需求文档。",
  },
  {
    id: "scene-3",
    sender: "ENTP",
    receiver: "ISTJ",
    original: "要不我们别按原计划了，我突然想到一个更有意思的方向。",
    heardAs: "你是不是又要临时搞事？",
    actuallyMeans: "我发现了一个可能更好的机会。",
    roast: "ENTP在开脑洞，ISTJ在保血压。",
  },
  {
    id: "scene-4",
    sender: "ISTJ",
    receiver: "ENTP",
    original: "最好还是按原计划执行。",
    heardAs: "你的人生是不是没有一点即兴发挥？",
    actuallyMeans: "我想降低不必要的风险。",
    roast: "ISTJ在保稳定，ENTP在找彩蛋。",
  },
  {
    id: "scene-5",
    sender: "ENTJ",
    receiver: "ISFP",
    original: "这个任务本周必须推进，你尽快给我结果。",
    heardAs: "你是不是只把我当工具人？",
    actuallyMeans: "我需要明确进度，避免整体卡住。",
    roast: "ENTJ在推项目，ISFP在感受压迫感。",
  },
  {
    id: "scene-6",
    sender: "INFP",
    receiver: "ESTJ",
    original: "这个安排让我有点不舒服，但我说不清哪里不对。",
    heardAs: "所以到底哪里需要改？",
    actuallyMeans: "我需要一点时间确认自己的感受和边界。",
    roast: "INFP在听内心，ESTJ在等表格。",
  },
  {
    id: "scene-7",
    sender: "INFJ",
    receiver: "ESTP",
    original: "我觉得这件事背后可能有更深层的问题。",
    heardAs: "能不能先说人话？",
    actuallyMeans: "我在担心这个问题会影响我们后面的关系。",
    roast: "INFJ在读潜台词，ESTP已经准备直接开干。",
  },
  {
    id: "scene-8",
    sender: "ISFJ",
    receiver: "ESTP",
    original: "我不是不想去，只是觉得安排再稳定一点我会更安心。",
    heardAs: "你是不是想太多了？",
    actuallyMeans: "我需要确定感才容易放松参与。",
    roast: "ISFJ在求安心，ESTP在查路线。",
  },
];
