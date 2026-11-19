export type ExtraGuideSlug = 'sculpture-facts' | 'place-des-nations-walk';

type GuideContent = {
  title: string;
  subtitle: string;
  description: string;
  intro: string;
  quickFacts: { label: string; value: string }[];
  sections: { title: string; paragraphs: string[] }[];
  steps: { title: string; description: string; map?: string }[];
  faqs: { question: string; answer: string }[];
};

export const extraGuides: Record<ExtraGuideSlug, Record<'en' | 'zh', GuideContent>> = {
  'sculpture-facts': {
    en: {
      title: 'Broken Chair Geneva: Sculpture, Artist & Meaning',
      subtitle: 'A closer look at the giant three-legged chair opposite the United Nations',
      description: 'Who made Geneva’s Broken Chair, how big is it and why does it have a broken leg? Explore the sculpture’s design, symbolism and 1997 origins.',
      intro: 'The Broken Chair is a public artwork with a deliberately missing piece. Seen from across Place des Nations, the enormous wooden chair appears to stand despite the loss of one leg. That simple visual contradiction carries its humanitarian message.',
      quickFacts: [
        { label: 'Artist', value: 'Daniel Berset' },
        { label: 'Commissioned by', value: 'Handicap International (Humanity & Inclusion)' },
        { label: 'Year installed', value: '1997' },
        { label: 'Height', value: '12 metres' },
        { label: 'Material / weight', value: 'Wood, approximately 5.5 tonnes' },
        { label: 'Location', value: 'Place des Nations, Geneva, Switzerland' },
      ],
      sections: [
        { title: 'Why does the chair have only three legs?', paragraphs: [
          'Its fourth leg is visibly shattered. The damaged leg evokes the injuries and loss caused by anti-personnel landmines. The chair still stands, making the human cost of these weapons impossible to overlook.',
          'The chair faces the Palais des Nations, where international diplomacy takes place. Its position turns a public sculpture into a direct appeal to decision-makers.',
        ] },
        { title: 'Who created the Broken Chair?', paragraphs: [
          'Swiss artist Daniel Berset designed the sculpture at the request of Handicap International. Geneva Tourism describes the work as a 12-metre installation made from 5.5 tonnes of wood, present on the square since 1997.',
          'The humanitarian organization is now also known internationally as Humanity & Inclusion. The work is associated with its campaign against anti-personnel landmines and with advocacy for those affected by explosive weapons.',
        ] },
        { title: 'What to observe in the sculpture', paragraphs: [
          'Look at the irregular fractured end rather than only the overall silhouette. From the side, the difference between the three supporting legs and the missing fourth leg becomes clearer.',
          'Step back towards the edge of the square to frame the whole chair against the Palais des Nations. The monumental scale is part of the work: a familiar household object becomes an unsettling public statement.',
        ] },
        { title: 'Can you see it without a ticket?', paragraphs: [
          'Yes. Broken Chair stands in the publicly accessible Place des Nations rather than inside the UN compound. You can view it independently, but the square may be affected by events or temporary works.',
          'A visit to the interior of the Palais des Nations is a separate activity with its own booking and security procedures.',
        ] },
      ],
      steps: [
        { title: 'Start at Nations tram stop', description: 'Walk into Place des Nations and look at the chair from a distance to appreciate its full scale.' },
        { title: 'Inspect the fractured leg', description: 'Move around the sculpture where public access allows; compare the broken leg with the three standing legs.' },
        { title: 'Frame the UN backdrop', description: 'Photograph the work with the Palais des Nations behind it and continue into the international district.' },
      ],
      faqs: [
        { question: 'Is Broken Chair a memorial or a sculpture?', answer: 'It is both: a monumental public sculpture that conveys a humanitarian message about anti-personnel landmines and their victims.' },
        { question: 'Is it part of the United Nations?', answer: 'No. It is an artwork commissioned by Handicap International and placed opposite the UN at Place des Nations.' },
        { question: 'How long should I allow?', answer: 'Around 15–30 minutes is a practical estimate for viewing the sculpture and taking photographs; a nearby museum or UN tour requires more time.' },
      ],
    },
    zh: {
      title: '日内瓦断椅：雕塑设计、作者与象征意义',
      subtitle: '从作品细节理解联合国万国宫对面的巨型三脚木椅',
      description: '日内瓦断椅是谁创作的？为什么只有三条完整的椅腿？介绍1997年落成的作品尺寸、设计细节与反地雷象征。',
      intro: '断椅是一件刻意保留缺口的公共艺术作品。从万国广场远望，巨大的木椅失去一条椅腿却仍然屹立。这个看似简单的视觉反差，正是作品传达的人道主义讯息。',
      quickFacts: [
        { label: '艺术家', value: 'Daniel Berset（丹尼尔·贝尔塞）' },
        { label: '委托机构', value: 'Handicap International（国际残障组织，现亦称 Humanity & Inclusion）' },
        { label: '设立年份', value: '1997年' },
        { label: '高度', value: '12米' },
        { label: '材料与重量', value: '木材，约5.5吨' },
        { label: '位置', value: '瑞士日内瓦万国广场（Place des Nations）' },
      ],
      sections: [
        { title: '为什么断椅只有三条完整的腿？', paragraphs: [
          '第四条椅腿呈明显的断裂状态，象征反步兵地雷造成的伤害与肢体损失。即使受损，椅子仍然站立，提醒人们关注爆炸性武器的长期人道代价。',
          '作品面对联合国日内瓦办事处所在的万国宫，将广场上的艺术表达转化为对国际决策者的公开呼吁。',
        ] },
        { title: '断椅是谁创作的？', paragraphs: [
          '瑞士艺术家 Daniel Berset 应 Handicap International 邀请设计了这件作品。日内瓦旅游局记载，作品高12米、使用约5.5吨木材，自1997年起矗立于广场。',
          '委托机构如今也使用 Humanity & Inclusion 名称。断椅与反步兵地雷倡议，以及关注爆炸性武器伤害者的行动密切相关。',
        ] },
        { title: '现场值得观察的细节', paragraphs: [
          '除了拍摄整座椅子，不妨仔细观察断腿末端不规则的木质裂面。从侧面看，支撑作品的三条椅腿与缺失的一条腿之间的反差更加明显。',
          '从广场边缘后退几步，可以将木椅与万国宫同框。日常家具被放大到纪念碑尺度，正是这件作品引人注目的原因之一。',
        ] },
        { title: '参观是否需要门票？', paragraphs: [
          '断椅位于公共广场，并非联合国院区内部，可自行前往观赏。大型活动或临时工程期间，请遵循现场安排。',
          '若希望进入万国宫参观，则属于另一项活动，需要按照联合国公布的预约与安检程序办理。',
        ] },
      ],
      steps: [
        { title: '从 Nations 电车站出发', description: '走入万国广场，先从远处观察作品整体高度和轮廓。' },
        { title: '观察断裂的椅腿', description: '在允许通行的范围内换角度观看，比较断腿与其余三条支撑腿。' },
        { title: '拍摄万国宫背景', description: '将断椅与万国宫一同取景，再继续探索国际组织区。' },
      ],
      faqs: [
        { question: '断椅是雕塑还是纪念碑？', answer: '两者皆是：它是一件大型公共艺术作品，也通过断裂的椅腿表达反地雷的人道主义诉求。' },
        { question: '断椅属于联合国吗？', answer: '不是。它由 Handicap International 委托制作，设置在联合国万国宫对面的万国广场。' },
        { question: '参观需要多长时间？', answer: '单独欣赏和拍照可预留约15至30分钟；若加上博物馆或联合国导览，应另行安排时间。' },
      ],
    },
  },
  'place-des-nations-walk': {
    en: {
      title: 'Place des Nations Walking Guide',
      subtitle: 'A self-guided walk from Broken Chair to the UN and Red Cross Museum',
      description: 'Plan a short walk around Place des Nations in Geneva: Broken Chair, Palais des Nations, Pregny Gate and the Red Cross Museum, with visit and photo tips.',
      intro: 'Place des Nations is an easy starting point for exploring International Geneva on foot. Broken Chair is the landmark in the square; the nearby Palais des Nations and Red Cross Museum explain the diplomatic and humanitarian setting around it.',
      quickFacts: [
        { label: 'Start', value: 'Nations tram and bus stop' },
        { label: 'Main landmark', value: 'Broken Chair, Place des Nations' },
        { label: 'Suggested outdoor walk', value: 'Approximately 30–60 minutes, excluding indoor visits' },
        { label: 'UN guided-tour entrance', value: 'Pregny Gate, 14 Avenue de la Paix' },
        { label: 'Booking', value: 'The outdoor square is free; indoor visits have separate arrangements' },
      ],
      sections: [
        { title: 'What makes this square important?', paragraphs: [
          'The chair faces the Palais des Nations, the United Nations Office at Geneva. The setting gives the artwork a direct relationship to diplomacy, international law and the humanitarian campaigns it represents.',
          'The square is a public place and is distinct from the secured UN grounds. Enjoying the artwork from outside does not grant access to UN buildings.',
        ] },
        { title: 'Transport and the correct UN entrance', paragraphs: [
          'Tram 15 and bus 5 serve the Nations stop according to UN Geneva visitor information. Check the current timetable before leaving, particularly if you are travelling from elsewhere in the city.',
          'The United Nations states that guided-tour visitors enter through Pregny Gate at 14 Avenue de la Paix, opposite the Red Cross Museum. Do not assume the gates facing Broken Chair are the entrance for your booked tour.',
        ] },
        { title: 'Photography and accessibility', paragraphs: [
          'For a wide composition, step back to include the full chair and the UN complex. For a more interpretive detail, focus on the missing leg and the textured wood.',
          'The itinerary is based on public streets and pavements. Crossing points, gradients, construction and access to indoor attractions can change, so follow street signage and consult each venue’s current accessibility guidance.',
        ] },
        { title: 'How to fit the walk into a day in Geneva', paragraphs: [
          'If you have one day in Geneva, treat this as a compact international-district stop rather than a city-wide itinerary. Allow extra time only if you have booked a UN tour or museum visit.',
          'From here, continue towards the lake or central Geneva using public transport; consult live transit information instead of relying on fixed journey times.',
        ] },
      ],
      steps: [
        { title: 'Nations stop and Broken Chair', description: 'Begin at the square, examine the fractured leg and photograph the sculpture with the Palais des Nations behind it.', map: 'https://maps.app.goo.gl/ox5EXQDdKs4Yc7Nb7' },
        { title: 'Palais des Nations exterior', description: 'View the UN buildings from the public side of the square. Internal access is restricted and requires appropriate arrangements.', map: 'https://www.google.com/maps/search/?api=1&query=Palais+des+Nations+Geneva' },
        { title: 'Pregny Gate and Red Cross Museum', description: 'Continue towards Avenue de la Paix. Confirm the entrance and booked time if joining a UN tour; the museum is a separate visitor attraction.', map: 'https://www.google.com/maps/search/?api=1&query=International+Red+Cross+and+Red+Crescent+Museum+Geneva' },
      ],
      faqs: [
        { question: 'Can I walk around the Palais des Nations grounds?', answer: 'Not freely as an external visitor. UN Geneva requires suitable access arrangements for guided tours and entry.' },
        { question: 'Where do UN guided tours begin?', answer: 'UN Geneva directs guided-tour visitors to Pregny Gate, 14 Avenue de la Paix, rather than the main square-facing gates.' },
        { question: 'Is this route suitable for a short stop?', answer: 'Yes. The outdoor landmarks can be appreciated in roughly 30–60 minutes; add separate time for any booked indoor activity.' },
      ],
    },
    zh: {
      title: '日内瓦万国广场步行指南',
      subtitle: '从断椅前往万国宫与国际红十字博物馆的自助路线',
      description: '规划日内瓦万国广场短途步行路线：断椅、万国宫、Pregny 访客入口与国际红十字博物馆，附交通、拍照和预约建议。',
      intro: '万国广场适合作为步行探索“国际日内瓦”的起点。广场中央的断椅是最醒目的地标，邻近的万国宫与国际红十字博物馆，则补充了外交与人道主义的城市背景。',
      quickFacts: [
        { label: '起点', value: 'Nations 电车及公交站' },
        { label: '主要地标', value: '万国广场上的断椅' },
        { label: '建议户外步行时间', value: '约30至60分钟，不含室内参观' },
        { label: '联合国导览入口', value: 'Pregny Gate，Avenue de la Paix 14号' },
        { label: '门票与预约', value: '公共广场免费；室内参观需依各机构规定办理' },
      ],
      sections: [
        { title: '为什么万国广场值得停留？', paragraphs: [
          '断椅面对联合国日内瓦办事处所在的万国宫，这个空间关系让艺术作品与国际外交、国际法及人道主义倡议直接联系起来。',
          '广场为公共空间，与实行安全管制的联合国院区不同。在外部欣赏断椅，并不意味着可以自由进入联合国建筑。',
        ] },
        { title: '公共交通与正确的联合国入口', paragraphs: [
          '联合国日内瓦办事处的访客信息提及电车15路及公交5路可抵达 Nations 站。实际班次可能变化，请出发前查询最新时刻表。',
          '联合国说明，参加导览的访客需前往 Avenue de la Paix 14号的 Pregny Gate，入口位于红十字博物馆对面。不要把断椅正对的广场大门误认为导览入口。',
        ] },
        { title: '拍照与无障碍注意事项', paragraphs: [
          '想拍整座雕塑，可在广场边缘取景，让木椅与万国宫同框；若想突出作品意义，则可聚焦断裂的椅腿与木质纹理。',
          '路线主要沿公共街道与人行道。过街点、坡度、施工及室内场馆的通行安排可能变化，应以现场标示和各场馆无障碍信息为准。',
        ] },
        { title: '如何安排在日内瓦一日游中？', paragraphs: [
          '如果只有一天时间，可以将这里视为国际组织区的短暂停留，而不是覆盖全城的完整行程。若已预约联合国导览或博物馆，再额外预留相应时间。',
          '结束后可乘公共交通继续前往湖畔或市中心；实际车程请依实时交通信息安排。',
        ] },
      ],
      steps: [
        { title: 'Nations 站与断椅', description: '从广场开始，观察断腿细节，并尝试拍摄断椅与万国宫同框的照片。', map: 'https://maps.app.goo.gl/ox5EXQDdKs4Yc7Nb7' },
        { title: '万国宫外观', description: '在公共广场一侧观看联合国建筑。院区内部实行出入管理，须按规定预约或取得许可。', map: 'https://www.google.com/maps/search/?api=1&query=Palais+des+Nations+Geneva' },
        { title: 'Pregny 入口与红十字博物馆', description: '沿 Avenue de la Paix 方向步行。参加联合国导览者应核对预约和入口；博物馆属于另一项参观活动。', map: 'https://www.google.com/maps/search/?api=1&query=International+Red+Cross+and+Red+Crescent+Museum+Geneva' },
      ],
      faqs: [
        { question: '可以自由进入万国宫院区吗？', answer: '一般外部游客不可自由游览院区。联合国导览与入内参观需要符合相关出入规定。' },
        { question: '联合国导览从哪里进入？', answer: '联合国公布的导览访客入口为 Avenue de la Paix 14号 Pregny Gate，而非万国广场正面的入口。' },
        { question: '适合短暂停留吗？', answer: '适合。户外地标可预留约30至60分钟；若要参加室内导览，应另加时间。' },
      ],
    },
  },
};
