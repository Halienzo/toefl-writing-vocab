// Task 1: Build a Sentence - Data file
// Will be expanded to 60 words x 10 sentences in next phase
(function(){

var patterns = [
  {formula:"Wh- + aux + S + V + O?",
   examples:[
     {en:"<em>What</em> responsibilities <em>do</em> volunteers usually <em>have</em> there?",cn:"志愿者通常在那里有什么职责？"},
     {en:"<em>Which</em> store <em>has</em> the best deals?",cn:"哪家店有最好的优惠？"},
     {en:"<em>What</em> subjects <em>do</em> you <em>have</em> assignments in?",cn:"你在哪些科目有作业？"}
   ]},
  {formula:"S + will/would + V + if + S + V",
   examples:[
     {en:"I <em>will</em> <em>if</em> I finish the lab report that's due today.",cn:"如果我完成今天到期的实验报告我就会（去）。"},
     {en:"I <em>would</em> join you <em>if</em> I didn't have a meeting.",cn:"如果我没有会议我就会加入你们。"}
   ]},
  {formula:"Didn't + S + V + (that) + clause?",
   examples:[
     {en:"<em>Didn't</em> you <em>hear</em> the library is closed for renovations?",cn:"你没听说图书馆因翻新关闭了吗？"},
     {en:"<em>Didn't</em> she <em>mention</em> the deadline was extended?",cn:"她没提到截止日期延长了吗？"}
   ]},
  {formula:"S + be + not sure + wh- + S + V",
   examples:[
     {en:"I'm <em>not sure</em> <em>why</em> you don't have access.",cn:"我不确定你为什么没有访问权限。"},
     {en:"I'm <em>not sure</em> <em>when</em> the results will be posted.",cn:"我不确定成绩什么时候公布。"}
   ]},
  {formula:"S + V + with + N + that/who + V",
   examples:[
     {en:"I went last week <em>with</em> my friends <em>from</em> the hiking club.",cn:"上周我和登山俱乐部的朋友们去了。"},
     {en:"I'm learning <em>with</em> an app <em>that</em> uses AI to simulate conversations.",cn:"我在用一个利用AI模拟对话的应用学习。"}
   ]},
  {formula:"Have + S + V(past participle) + O?",
   examples:[
     {en:"<em>Have</em> you <em>finished</em> creating your slides?",cn:"你做完幻灯片了吗？"},
     {en:"<em>Have</em> you <em>signed up</em> for the workshop yet?",cn:"你报名参加研讨会了吗？"}
   ]}
];

var distractors = [
  {sentence:"Didn't you hear the library is closed for renovations? (Extra: <em>not</em>)",extra:"not"},
  {sentence:"I'm not sure why you don't have access. (Extra: <em>because</em>)",extra:"because"},
  {sentence:"I went last week with my friends from the hiking club. (Extra: <em>try</em>)",extra:"try"},
  {sentence:"I'm actually learning on my own with an app that uses AI. (Extra: <em>how</em>)",extra:"how"},
  {sentence:"What a coincidence — I'm doing the same for my roommate. (Extra: <em>as</em>)",extra:"as"},
  {sentence:"I will support the event for the children's hospital. (Extra: <em>organize</em>/<em>hear</em>)",extra:"organize / hear"}
];

var words = [
{w:"what",ph:"/wɒt/",pos:"interr",cn:"什么",stars:1,ss:[
["dialog","<em>What</em> responsibilities do volunteers usually have there?","interr. 疑问代词作定语修饰 responsibilities",M+" What responsibilities + do volunteers usually have there?","志愿者通常在那里有什么职责？"],
["dialog","<em>What</em> a coincidence — I'm doing the same for my roommate.","interr. 感叹句 What + a + n.",M+" What a coincidence — I'm doing the same for my roommate","多巧啊——我也在为室友做同样的事。"],
["dialog","<em>What</em> subjects do you have assignments in?","interr. 疑问代词修饰 subjects",M+" What subjects + do you have + assignments in?","你在哪些科目有作业？"],
["grammar","<em>What</em> makes this response a high-level response?","interr. 作主语（主语疑问句，无需助动词倒装）",M+" What(S) + makes(V) + this response(O) + a high-level response(OC)?","是什么使这个回答成为高分回答？"],
["grammar","<em>What</em> style are you considering for your dorm room?","interr. 修饰 style",M+" What style + are you considering + prep.phrase(for your dorm room)?","你在考虑什么风格的宿舍装修？"],
["grammar","I'm not sure <em>what</em> time the meeting starts.","interr. 引导名词性从句（间接疑问句）",M+" I'm not sure + "+OBJ+" what time the meeting starts","我不确定会议几点开始。"],
["trap","<em>What</em> was the highlight of your trip? (Note: 'were' is a distractor in the original)","interr. 作主语 + was(单数谓语)",M+" What(S) + was(V) + the highlight(C) + prep.phrase(of your trip)?","你旅行的亮点是什么？（注意：were是干扰词）"],
["trap","<em>What</em> concerns me about required volunteering is that it may produce resentment.","interr. 引导主语从句",SUBJ+" What concerns me about required volunteering + "+M+" is + "+OBJ+" that it may produce resentment","关于强制志愿服务让我担忧的是它可能产生怨恨。"],
["output","<em>What</em> I want to emphasize is that time management is crucial for self-employed workers.","interr. 引导主语从句（强调结构）",SUBJ+" What I want to emphasize + "+M+" is + "+OBJ+" that time management is crucial","我想强调的是时间管理对自雇者至关重要。"],
["output","<em>What</em> matters most is not whether service is mandatory but whether students genuinely contribute.","interr. 引导主语从句",SUBJ+" What matters most + "+M+" is + not...but...(并列结构)","最重要的不是服务是否强制而是学生是否真正贡献。"]
]},

{w:"which",ph:"/wɪtʃ/",pos:"interr",cn:"哪一个",stars:1,ss:[
["dialog","<em>Which</em> store has the best deals?","interr. 作定语修饰 store",M+" Which store(S) + has(V) + the best deals(O)?","哪家店有最好的优惠？"],
["dialog","<em>Which</em> bus do you usually take to campus?","interr. 修饰 bus",M+" Which bus + do you usually take + prep.phrase(to campus)?","你通常坐哪路公交去校园？"],
["dialog","<em>Which</em> of these topics are you most interested in?","interr. Which of + 名词",M+" Which of these topics + are you most interested in?","你对这些话题中的哪个最感兴趣？"],
["grammar","I'm not sure <em>which</em> option is better for my schedule.","interr. 引导宾语从句",M+" I'm not sure + "+OBJ+" which option is better for my schedule","我不确定哪个选项更适合我的日程。"],
["grammar","The course <em>which</em> I signed up for has been cancelled.","pron. 引导定语从句修饰 course",M+" The course + "+ATTR+" which I signed up for + has been cancelled","我报名的课程被取消了。"],
["grammar","<em>Which</em> view do you agree with — Claire's or Andrew's?","interr. 修饰 view",M+" Which view + do you agree with — Claire's or Andrew's?","你同意哪个观点——Claire的还是Andrew的？"],
["trap","The professor asked <em>which</em> student would present first. (Watch: 'who' could be a distractor)","interr. 引导宾语从句",M+" The professor asked + "+OBJ+" which student would present first","教授问哪个学生先做报告。"],
["trap","I'm deciding <em>which</em> club to join — the hiking club or the debate club.","interr. which + noun + to do",M+" I'm deciding + "+OBJ+" which club to join","我在决定加入哪个俱乐部。"],
["output","<em>Which</em> approach is more effective depends on individual circumstances.","interr. 引导主语从句",SUBJ+" Which approach is more effective + "+M+" depends on individual circumstances","哪种方法更有效取决于个人情况。"],
["output","Students should consider <em>which</em> volunteer opportunities align with their interests.","interr. 引导宾语从句",M+" Students should consider + "+OBJ+" which volunteer opportunities align with their interests","学生应考虑哪些志愿机会与兴趣一致。"]
]},

{w:"how",ph:"/haʊ/",pos:"interr",cn:"如何；怎样",stars:1,ss:[
["dialog","<em>How</em> did your presentation in history class go?","interr. 疑问副词修饰动词 go，询问方式/状况",M+" How + did your presentation in history class go?","你历史课的报告进行得怎么样？"],
["dialog","<em>How</em> long does it usually take you to walk from the dorm to the library?","interr. How long 询问时间长度",M+" How long + does it usually take you + to walk from the dorm to the library?","你从宿舍走到图书馆通常要多久？"],
["dialog","<em>How</em> about we grab lunch at the dining hall after class?","interr. How about + 从句，提出建议",M+" How about + we grab lunch at the dining hall after class?","下课后我们去食堂吃午饭怎么样？"],
["grammar","<em>How</em> many credits are you taking this semester?","interr. How many + 可数名词复数",M+" How many credits + are you taking + this semester?","你这学期修多少学分？"],
["grammar","She explained <em>how</em> the grading system works.","interr. 引导宾语从句（间接疑问句）",M+" She explained + "+OBJ+" how the grading system works","她解释了评分系统是如何运作的。"],
["grammar","<em>How</em> effectively you manage your time determines your academic success.","interr. 引导主语从句",SUBJ+" How effectively you manage your time + "+M+" determines your academic success","你多有效地管理时间决定了你的学业成绩。"],
["trap","<em>How</em> come you didn't sign up for the study group? (Note: 'why' is a distractor)","interr. How come + 陈述语序（不倒装）",M+" How come + you didn't sign up for the study group?","你怎么没有报名参加学习小组？（注意：why是干扰词）"],
["trap","I don't know <em>how</em> to access the online portal. (Note: 'what' is a distractor)","interr. how to do 不定式结构",M+" I don't know + "+OBJ+" how to access the online portal","我不知道怎样登录在线平台。（注意：what是干扰词）"],
["output","<em>How</em> students spend their free time can significantly shape their personal growth.","interr. 引导主语从句",SUBJ+" How students spend their free time + "+M+" can significantly shape their personal growth","学生如何利用空闲时间能显著影响他们的个人成长。"],
["output","The key question is <em>how</em> universities can balance academic rigor with student well-being.","interr. 引导表语从句",M+" The key question is + "+OBJ+" how universities can balance academic rigor with student well-being","关键问题是大学如何在学术严谨和学生幸福之间取得平衡。"]
]},

{w:"why",ph:"/waɪ/",pos:"interr",cn:"为什么",stars:1,ss:[
["dialog","<em>Why</em> didn't you come to the club meeting last night?","interr. 疑问副词询问原因",M+" Why + didn't you come + to the club meeting last night?","你昨晚为什么没来参加社团会议？"],
["dialog","<em>Why</em> don't we study together for the midterm exam?","interr. Why don't we... 提出建议",M+" Why don't we + study together + for the midterm exam?","我们何不一起复习期中考试呢？"],
["dialog","Do you know <em>why</em> the professor cancelled today's lecture?","interr. 引导宾语从句",M+" Do you know + "+OBJ+" why the professor cancelled today's lecture?","你知道教授为什么取消了今天的课吗？"],
["grammar","<em>Why</em> she chose that topic for her research paper remains a mystery.","interr. 引导主语从句",SUBJ+" Why she chose that topic for her research paper + "+M+" remains a mystery","她为什么选那个课题做论文仍然是个谜。"],
["grammar","That is <em>why</em> I decided to switch my major to biology.","interr. 引导表语从句",M+" That is + "+OBJ+" why I decided to switch my major to biology","那就是我决定转专业到生物学的原因。"],
["grammar","The reason <em>why</em> many students prefer group projects is the collaborative experience.","interr. 引导定语从句修饰 reason",M+" The reason + "+ATTR+" why many students prefer group projects + is the collaborative experience","许多学生更喜欢小组项目的原因是合作体验。"],
["trap","I wonder <em>why</em> the dining hall closes so early on weekends. (Note: 'when' is a distractor)","interr. 引导宾语从句（陈述语序）",M+" I wonder + "+OBJ+" why the dining hall closes so early on weekends","我想知道食堂为什么周末关得这么早。（注意：when是干扰词）"],
["trap","<em>Why</em> is it that freshmen are required to live on campus? (Note: 'how' is a distractor)","interr. Why is it that... 强调结构",M+" Why is it + "+OBJ+" that freshmen are required to live on campus?","为什么大一新生必须住校？（注意：how是干扰词）"],
["output","This is precisely <em>why</em> mandatory community service can be counterproductive.","interr. 引导表语从句",M+" This is precisely + "+OBJ+" why mandatory community service can be counterproductive","这正是为什么强制社区服务可能适得其反。"],
["output","<em>Why</em> self-discipline matters becomes clear when students face real-world challenges.","interr. 引导主语从句",SUBJ+" Why self-discipline matters + "+M+" becomes clear + "+TIM+" when students face real-world challenges","当学生面对现实挑战时，自律为何重要变得显而易见。"]
]},

{w:"where",ph:"/weə(r)/",pos:"interr",cn:"在哪里",stars:1,ss:[
["dialog","<em>Where</em> did you find that secondhand textbook?","interr. 疑问副词询问地点",M+" Where + did you find + that secondhand textbook?","你在哪里找到的那本二手教材？"],
["dialog","<em>Where</em> should we meet before the campus tour?","interr. 疑问副词 + should",M+" Where + should we meet + before the campus tour?","校园参观之前我们在哪里集合？"],
["dialog","Do you remember <em>where</em> the registrar's office is?","interr. 引导宾语从句",M+" Do you remember + "+OBJ+" where the registrar's office is?","你记得教务处在哪里吗？"],
["grammar","<em>Where</em> you choose to sit in a lecture hall can affect how well you focus.","interr. 引导主语从句",SUBJ+" Where you choose to sit in a lecture hall + "+M+" can affect + "+OBJ+" how well you focus","你选择在阶梯教室坐哪里会影响你的专注程度。"],
["grammar","The library is <em>where</em> I do most of my serious studying.","interr. 引导表语从句",M+" The library is + "+OBJ+" where I do most of my serious studying","图书馆是我进行大部分认真学习的地方。"],
["grammar","I need a quiet place <em>where</em> I can prepare for my finals.","interr. 引导定语从句修饰 place",M+" I need a quiet place + "+ATTR+" where I can prepare for my finals","我需要一个能备考期末的安静地方。"],
["trap","<em>Where</em> exactly is the new student lounge located? (Note: 'when' is a distractor)","interr. 疑问副词 + exactly 加强语气",M+" Where exactly + is the new student lounge located?","新的学生休息室到底在哪里？（注意：when是干扰词）"],
["trap","I'm not sure <em>where</em> to submit the assignment — online or in person. (Note: 'how' is a distractor)","interr. where + to do 不定式",M+" I'm not sure + "+OBJ+" where to submit the assignment","我不确定在哪里提交作业。（注意：how是干扰词）"],
["output","<em>Where</em> there is effective time management, there is academic success.","interr. Where 引导地点状语从句（倒装句式）",CAU+" Where there is effective time management, + "+M+" there is academic success","哪里有有效的时间管理，哪里就有学业成功。"],
["output","The campus café is <em>where</em> many productive study sessions take place.","interr. 引导表语从句",M+" The campus café is + "+OBJ+" where many productive study sessions take place","校园咖啡馆是许多高效学习活动发生的地方。"]
]},

{w:"when",ph:"/wen/",pos:"interr/conj",cn:"什么时候；当...时",stars:1,ss:[
["dialog","<em>When</em> is the deadline for the scholarship application?","interr. 疑问副词询问时间",M+" When + is the deadline + for the scholarship application?","奖学金申请的截止日期是什么时候？"],
["dialog","Do you know <em>when</em> the dining hall opens on Sundays?","interr. 引导宾语从句",M+" Do you know + "+OBJ+" when the dining hall opens on Sundays?","你知道食堂周日几点开门吗？"],
["dialog","<em>When</em> you finish your lab report, can you help me with mine?","conj. 引导时间状语从句",TIM+" When you finish your lab report, + "+M+" can you help me with mine?","你做完实验报告后能帮我看看我的吗？"],
["grammar","I'll text you <em>when</em> I arrive at the student center.","conj. 引导时间状语从句",M+" I'll text you + "+TIM+" when I arrive at the student center","我到学生中心时给你发短信。"],
["grammar","<em>When</em> she transferred here last fall, she didn't know anyone on campus.","conj. 引导时间状语从句置于句首",TIM+" When she transferred here last fall, + "+M+" she didn't know anyone on campus","去年秋天她转学来这里时，校园里一个人都不认识。"],
["grammar","There are times <em>when</em> the computer lab gets extremely crowded.","conj. 引导定语从句修饰 times",M+" There are times + "+ATTR+" when the computer lab gets extremely crowded","有些时候电脑室会非常拥挤。"],
["trap","<em>When</em> did you realize the assignment was due today? (Note: 'where' is a distractor)","interr. 疑问副词（注意时间 vs 地点）",M+" When + did you realize + "+OBJ+" the assignment was due today?","你什么时候意识到作业今天截止的？（注意：where是干扰词）"],
["trap","I'm not sure <em>when</em> the results will be posted. (Note: 'if' is a distractor)","interr. 引导宾语从句（间接疑问句）",M+" I'm not sure + "+OBJ+" when the results will be posted","我不确定结果什么时候公布。（注意：if是干扰词）"],
["output","<em>When</em> students are given the freedom to choose, they tend to be more motivated.","conj. 引导时间状语从句",TIM+" When students are given the freedom to choose, + "+M+" they tend to be more motivated","当学生被赋予选择自由时，他们往往更有动力。"],
["output","It is <em>when</em> people step outside their comfort zones that true learning occurs.","conj. 强调句 It is when... that...",M+" It is + "+TIM+" when people step outside their comfort zones + that true learning occurs","正是当人们走出舒适区时，真正的学习才会发生。"]
]},

{w:"who",ph:"/huː/",pos:"pron",cn:"谁；(引导定语从句)",stars:1,ss:[
["dialog","<em>Who</em> is your academic advisor this year?","pron. 疑问代词作主语",M+" Who(S) + is(V) + your academic advisor this year?","你今年的学术导师是谁？"],
["dialog","<em>Who</em> wants to come with me to the campus bookstore?","pron. 疑问代词作主语",M+" Who(S) + wants to come + with me + to the campus bookstore?","谁想和我一起去校园书店？"],
["dialog","The student <em>who</em> sits next to me in chemistry is really helpful.","pron. 引导定语从句修饰 student",M+" The student + "+ATTR+" who sits next to me in chemistry + is really helpful","化学课坐我旁边的同学真的很有帮助。"],
["grammar","<em>Who</em> did you partner with for the group project?","pron. 疑问代词作介词 with 的宾语",M+" Who + did you partner with + for the group project?","小组项目你和谁搭档的？"],
["grammar","Students <em>who</em> participate in extracurricular activities often develop better social skills.","pron. 引导定语从句修饰 students",M+" Students + "+ATTR+" who participate in extracurricular activities + often develop better social skills","参加课外活动的学生往往社交能力更强。"],
["grammar","I need to find someone <em>who</em> can tutor me in calculus.","pron. 引导定语从句修饰 someone",M+" I need to find someone + "+ATTR+" who can tutor me in calculus","我需要找一个能辅导我微积分的人。"],
["trap","<em>Who</em> do you think will win the student council election? (Note: 'whom' is a distractor)","pron. 插入语 do you think 不影响 who 作主语",M+" Who + do you think + will win the student council election?","你觉得谁会赢得学生会选举？（注意：whom是干扰词）"],
["trap","The roommate <em>who</em> I share the kitchen with is very tidy. (Note: 'whom' is more formal)","pron. 引导定语从句（口语中 who 代替 whom 作宾语）",M+" The roommate + "+ATTR+" who I share the kitchen with + is very tidy","和我共用厨房的室友非常爱整洁。（注意：whom更正式）"],
["output","People <em>who</em> volunteer regularly tend to develop a stronger sense of community.","pron. 引导定语从句修饰 people",M+" People + "+ATTR+" who volunteer regularly + tend to develop a stronger sense of community","经常做志愿者的人往往有更强的社区意识。"],
["output","It is the students <em>who</em> take initiative that benefit the most from internship programs.","pron. 强调句中引导定语从句",M+" It is the students + "+ATTR+" who take initiative + that benefit the most from internship programs","正是那些主动出击的学生从实习项目中受益最多。"]
]},

{w:"do/did",ph:"/duː/ /dɪd/",pos:"aux",cn:"(构成疑问/否定)",stars:1,ss:[
["dialog","<em>Do</em> you have any plans for the weekend?","aux. 构成一般现在时疑问句",M+" Do + you have + any plans for the weekend?","你周末有什么计划吗？"],
["dialog","<em>Did</em> you finish the reading assignment for tomorrow's class?","aux. 构成一般过去时疑问句",M+" Did + you finish + the reading assignment for tomorrow's class?","你完成明天课的阅读作业了吗？"],
["dialog","I <em>do</em> appreciate you lending me your notes — thanks so much!","aux. 强调谓语动词（强调肯定）",M+" I do appreciate + you lending me your notes","我真的很感谢你借我笔记——太谢谢了！"],
["grammar","She <em>did</em> not realize the library closes early on Fridays.","aux. 构成一般过去时否定句",M+" She did not realize + "+OBJ+" the library closes early on Fridays","她没意识到图书馆周五提前关门。"],
["grammar","Not only <em>did</em> he pass the exam, but he also got the highest score.","aux. 否定词前置引起部分倒装",M+" Not only did he pass the exam, + but he also got the highest score","他不仅通过了考试，而且还得了最高分。"],
["grammar","<em>Do</em> remember to bring your student ID to the event.","aux. 祈使句中 do 加强语气",M+" Do remember + to bring your student ID to the event","一定要记得带学生证去参加活动。"],
["trap","<em>Did</em> you go to the orientation, or <em>did</em> you skip it? (Note: 'were' is a distractor)","aux. 一般过去时选择疑问句（不用 were）",M+" Did you go to the orientation, + or did you skip it?","你去参加了迎新活动还是跳过了？（注意：were是干扰词）"],
["trap","I <em>did</em> submit the form — I just <em>did</em> it five minutes ago. (Note: 'have' is a distractor)","aux. did 强调已完成（非现在完成时）",M+" I did submit the form — + I just did it five minutes ago","我确实提交了表格——五分钟前刚交的。（注意：have是干扰词）"],
["output","Mandatory volunteering <em>does</em> expose students to new perspectives, but it may lack genuine motivation.","aux. does 强调肯定（让步表达）",M+" Mandatory volunteering does expose students to new perspectives, + but it may lack genuine motivation","强制志愿服务确实让学生接触新视角，但可能缺乏真正的动力。"],
["output","What the university <em>did</em> was create a mentorship program that paired freshmen with seniors.","aux. 强调句 What...did was + V",SUBJ+" What the university did + "+M+" was create a mentorship program + "+ATTR+" that paired freshmen with seniors","大学所做的是创建了一个让大一新生与大四学生结对的导师项目。"]
]},

{w:"have",ph:"/hæv/",pos:"aux",cn:"已经(完成时)；拥有",stars:1,ss:[
["dialog","<em>Have</em> you signed up for the workshop yet?","aux. 构成现在完成时疑问句",M+" Have + you signed up + for the workshop yet?","你报名参加研讨会了吗？"],
["dialog","I <em>have</em> already submitted my essay to the online portal.","aux. 现在完成时（already 强调已完成）",M+" I have already submitted + my essay + to the online portal","我已经把论文提交到在线平台了。"],
["dialog","<em>Have</em> you ever been to the new fitness center on campus?","aux. Have you ever + 过去分词（经历）",M+" Have + you ever been + to the new fitness center on campus?","你去过校园里新的健身中心吗？"],
["grammar","She <em>has</em> been working on her thesis since last September.","aux. 现在完成进行时",M+" She has been working + on her thesis + "+TIM+" since last September","她从去年九月起就一直在写论文。"],
["grammar","If I <em>had</em> known about the deadline, I would have applied earlier.","aux. 过去完成时用于虚拟条件句",COND+" If I had known about the deadline, + "+M+" I would have applied earlier","如果我当时知道截止日期，我就会早点申请。"],
["grammar","By the time the semester ends, we will <em>have</em> completed five major projects.","aux. 将来完成时",M+" By the time + "+TIM+" the semester ends, + we will have completed + five major projects","到学期结束时，我们将完成五个大项目。"],
["trap","I <em>have</em> to finish this assignment before midnight. (Note: 'must' is a distractor)","v. have to 表示不得不（非完成时）",M+" I have to finish + this assignment + before midnight","我必须在午夜前完成这个作业。（注意：must是干扰词）"],
["trap","<em>Have</em> you finished creating your slides? (Note: 'did' is a distractor — different tense)","aux. 现在完成时（强调结果）vs 一般过去时",M+" Have + you finished + creating your slides?","你做完幻灯片了吗？（注意：did是干扰词——时态不同）"],
["output","Research <em>has</em> shown that students who engage in group study perform better on exams.","aux. 现在完成时表示研究结论",M+" Research has shown + "+OBJ+" that students + "+ATTR+" who engage in group study + perform better on exams","研究表明参与小组学习的学生考试表现更好。"],
["output","Many universities <em>have</em> recognized the importance of providing mental health resources to students.","aux. 现在完成时表示已发生变化",M+" Many universities have recognized + the importance of providing mental health resources to students","许多大学已经认识到为学生提供心理健康资源的重要性。"]
]},

{w:"will",ph:"/wɪl/",pos:"aux",cn:"将要(将来时)",stars:1,ss:[
["dialog","I <em>will</em> meet you at the library entrance at three o'clock.","aux. 一般将来时",M+" I will meet you + at the library entrance + at three o'clock","我三点在图书馆入口和你碰面。"],
["dialog","<em>Will</em> you be attending the career fair next Friday?","aux. 将来进行时疑问句",M+" Will + you be attending + the career fair next Friday?","你下周五会参加招聘会吗？"],
["dialog","The professor said the grades <em>will</em> be posted by the end of the week.","aux. 一般将来时（转述）",M+" The professor said + "+OBJ+" the grades will be posted + by the end of the week","教授说成绩将在本周末前公布。"],
["grammar","If you register early, you <em>will</em> get a better chance of enrolling in popular courses.","aux. 主将从现（条件句主句用 will）",COND+" If you register early, + "+M+" you will get a better chance of enrolling in popular courses","如果你早点注册，你会有更好的机会选到热门课程。"],
["grammar","Students who study abroad <em>will</em> likely develop stronger cross-cultural communication skills.","aux. will + likely 表示可能性预测",M+" Students + "+ATTR+" who study abroad + will likely develop + stronger cross-cultural communication skills","留学的学生可能会培养更强的跨文化沟通能力。"],
["grammar","The university <em>will</em> have completed the new dormitory by next August.","aux. 将来完成时",M+" The university will have completed + the new dormitory + by next August","大学将在明年八月前完成新宿舍楼。"],
["trap","I <em>will</em> help you move in tomorrow — I promise. (Note: 'would' is a distractor)","aux. will 表示承诺/意愿（非虚拟）",M+" I will help you + move in tomorrow","我明天会帮你搬进来的——我保证。（注意：would是干扰词）"],
["trap","The shuttle <em>will</em> leave at 7:00 a.m. sharp. (Note: 'would' is a distractor — different mood)","aux. will 表示确定的将来（非推测语气）",M+" The shuttle will leave + at 7:00 a.m. sharp","班车将在早上七点整发车。（注意：would是干扰词——语气不同）"],
["output","This experience <em>will</em> undoubtedly prepare students for the challenges they face after graduation.","aux. will + undoubtedly 加强预测",M+" This experience will undoubtedly prepare students + for the challenges + "+ATTR+" they face after graduation","这段经历无疑会为学生应对毕业后的挑战做好准备。"],
["output","Implementing a peer tutoring system <em>will</em> benefit both tutors and tutees in the long run.","aux. 一般将来时",M+" Implementing a peer tutoring system(S) + will benefit + both tutors and tutees + in the long run","实施同伴辅导制度从长远来看会使辅导者和被辅导者都受益。"]
]},

{w:"would",ph:"/wʊd/",pos:"aux",cn:"会(虚拟/礼貌)",stars:2,ss:[
["dialog","<em>Would</em> you mind sharing your notes from yesterday's lecture?","aux. Would you mind... 礼貌请求",M+" Would you mind + sharing your notes from yesterday's lecture?","你介意分享一下昨天课的笔记吗？"],
["dialog","I <em>would</em> love to join the hiking trip, but I have a deadline on Friday.","aux. would love to 表示意愿（礼貌/委婉）",M+" I would love to join the hiking trip, + "+CON+" but I have a deadline on Friday","我很想参加徒步旅行，但我周五有截止日期。"],
["dialog","<em>Would</em> it be okay if I borrowed your calculator for the exam?","aux. Would it be okay if... 委婉征求许可",M+" Would it be okay + "+COND+" if I borrowed your calculator for the exam?","我借你的计算器考试可以吗？"],
["grammar","If I <em>would</em> — wait, actually: If I were you, I <em>would</em> talk to the professor directly.","aux. 虚拟语气主句用 would",COND+" If I were you, + "+M+" I would talk to the professor directly","如果我是你，我会直接和教授谈。"],
["grammar","She said she <em>would</em> reserve a study room for us in the library.","aux. 过去将来时（间接引语）",M+" She said + "+OBJ+" she would reserve a study room for us in the library","她说她会在图书馆帮我们预留一间自习室。"],
["grammar","I <em>would</em> rather study alone than work in a noisy group.","aux. would rather... than... 宁愿",M+" I would rather study alone + than work in a noisy group","我宁愿独自学习也不愿在嘈杂的小组里学。"],
["trap","I <em>would</em> have attended the seminar if I had known about it. (Note: 'will' is a distractor)","aux. would have + 过去分词（与过去事实相反的虚拟）",M+" I would have attended the seminar + "+COND+" if I had known about it","如果我知道的话我就参加那个讲座了。（注意：will是干扰词）"],
["trap","He <em>would</em> always study in the same corner of the library. (Note: 'will' is a distractor — different tense)","aux. would 表示过去的习惯",M+" He would always study + in the same corner of the library","他总是在图书馆同一个角落学习。（注意：will是干扰词——时态不同）"],
["output","It <em>would</em> be more beneficial for students to choose their own volunteer projects.","aux. would 委婉表达观点",M+" It would be more beneficial + for students + to choose their own volunteer projects","让学生自己选择志愿项目会更有益。"],
["output","Without proper time management, students <em>would</em> struggle to balance academics and extracurricular activities.","aux. 含蓄虚拟条件（without 代替 if）",M+" Without proper time management, + students would struggle + to balance academics and extracurricular activities","没有适当的时间管理，学生将难以平衡学业和课外活动。"]
]},

{w:"can/could",ph:"/kæn/ /kʊd/",pos:"aux",cn:"能够/可以",stars:1,ss:[
["dialog","<em>Can</em> you show me how to use the printer in the computer lab?","aux. can 表示请求",M+" Can + you show me + "+OBJ+" how to use the printer in the computer lab?","你能教我怎么用电脑室的打印机吗？"],
["dialog","You <em>can</em> borrow my bike if you need to get to class faster.","aux. can 表示许可",M+" You can borrow my bike + "+COND+" if you need to get to class faster","如果你需要更快到教室的话可以借我的自行车。"],
["dialog","<em>Could</em> you tell me where the financial aid office is?","aux. could 礼貌请求",M+" Could + you tell me + "+OBJ+" where the financial aid office is?","你能告诉我助学金办公室在哪里吗？"],
["grammar","Students <em>can</em> access the online database from any campus computer.","aux. can 表示能力/可行性",M+" Students can access + the online database + from any campus computer","学生可以从任何校园电脑访问在线数据库。"],
["grammar","If we <em>could</em> extend the library hours, more students would benefit.","aux. could 用于虚拟条件句",COND+" If we could extend the library hours, + "+M+" more students would benefit","如果我们能延长图书馆开放时间，更多学生会受益。"],
["grammar","She <em>could</em> have finished the paper on time if she had started earlier.","aux. could have + 过去分词（与过去事实相反）",M+" She could have finished the paper on time + "+COND+" if she had started earlier","如果她早点开始的话本可以按时完成论文。"],
["trap","You <em>can</em> register for classes starting Monday. (Note: 'could' is a distractor — 非虚拟)","aux. can 表示事实许可（非虚拟）",M+" You can register for classes + starting Monday","你周一开始可以注册选课。（注意：could是干扰词——非虚拟语气）"],
["trap","I <em>could</em> barely hear the professor because the room was so noisy. (Note: 'can' is a distractor — past tense)","aux. could 表示过去能力",M+" I could barely hear the professor + "+CAU+" because the room was so noisy","我几乎听不到教授说话因为教室太吵了。（注意：can是干扰词——过去时）"],
["output","Universities <em>can</em> foster a stronger sense of belonging by creating inclusive campus events.","aux. can 表示可行性建议",M+" Universities can foster + a stronger sense of belonging + "+PART+" by creating inclusive campus events","大学可以通过举办包容性的校园活动来培养更强的归属感。"],
["output","Allowing students to design their own schedules <em>could</em> significantly improve their academic performance.","aux. could 委婉建议/可能性",M+" Allowing students to design their own schedules(S) + could significantly improve + their academic performance","允许学生自己设计课表可能会显著提高他们的学业表现。"]
]},

{w:"should",ph:"/ʃʊd/",pos:"aux",cn:"应该",stars:1,ss:[
["dialog","You <em>should</em> definitely check out the new café near the science building.","aux. should 提出建议",M+" You should definitely check out + the new café near the science building","你一定要去看看理科楼旁边的新咖啡馆。"],
["dialog","<em>Should</em> I email the professor about the extension, or go to office hours?","aux. should 征求意见",M+" Should I email the professor about the extension, + or go to office hours?","我应该给教授发邮件问延期的事还是去办公时间找他？"],
["dialog","We <em>should</em> probably start working on the group presentation soon.","aux. should + probably 委婉建议",M+" We should probably start working + on the group presentation + soon","我们大概应该尽快开始做小组报告了。"],
["grammar","Students <em>should</em> be aware of the academic integrity policy before submitting any work.","aux. should 表示义务/建议",M+" Students should be aware of + the academic integrity policy + "+TIM+" before submitting any work","学生在提交任何作业前应了解学术诚信政策。"],
["grammar","If you <em>should</em> have any questions, feel free to contact the teaching assistant.","aux. should 用于条件句表示万一",COND+" If you should have any questions, + "+M+" feel free to contact the teaching assistant","万一你有任何问题，随时联系助教。"],
["grammar","It is important that every student <em>should</em> participate in the orientation.","aux. should 用于虚拟语气（主语从句）",M+" It is important + "+SUBJ+" that every student should participate in the orientation","每个学生都应参加迎新活动，这很重要。"],
["trap","I <em>should</em> have started the research paper last week. (Note: 'must' is a distractor)","aux. should have + 过去分词（本应做而未做）",M+" I should have started + the research paper + last week","我上周就应该开始写研究论文了。（注意：must是干扰词）"],
["trap","You <em>should</em> talk to your advisor before dropping the course. (Note: 'could' is a distractor — weaker suggestion)","aux. should 给出较强建议",M+" You should talk to your advisor + "+TIM+" before dropping the course","你退课之前应该和导师谈谈。（注意：could是干扰词——语气较弱）"],
["output","Universities <em>should</em> invest more in mental health resources for their students.","aux. should 表达应然观点",M+" Universities should invest more + in mental health resources for their students","大学应该在学生心理健康资源方面加大投入。"],
["output","Students <em>should</em> be encouraged to explore diverse interests rather than focus solely on grades.","aux. should + 被动语态",M+" Students should be encouraged + to explore diverse interests + rather than focus solely on grades","应该鼓励学生探索多样的兴趣，而非只关注成绩。"]
]},

{w:"that",ph:"/ðæt/",pos:"conj/pron",cn:"(引导从句)那个",stars:1,ss:[
["dialog","I heard <em>that</em> the student union is organizing a talent show next month.","conj. 引导宾语从句",M+" I heard + "+OBJ+" that the student union is organizing a talent show next month","我听说学生会下个月要组织才艺表演。"],
["dialog","The problem is <em>that</em> the dorm Wi-Fi keeps dropping out.","conj. 引导表语从句",M+" The problem is + "+OBJ+" that the dorm Wi-Fi keeps dropping out","问题是宿舍Wi-Fi老是掉线。"],
["dialog","Is <em>that</em> the textbook we need for Professor Chen's class?","pron. 指示代词",M+" Is that(S) + the textbook + "+ATTR+" we need for Professor Chen's class?","那是陈教授课上我们需要的教材吗？"],
["grammar","The fact <em>that</em> she passed the exam without studying surprised everyone.","conj. 引导同位语从句",M+" The fact + "+APPO+" that she passed the exam without studying + surprised everyone","她不学习就通过考试的事实让所有人惊讶。"],
["grammar","It is widely believed <em>that</em> regular exercise improves concentration.","conj. 引导主语从句（it 形式主语）",M+" It is widely believed + "+SUBJ+" that regular exercise improves concentration","人们普遍认为经常锻炼可以提高注意力。"],
["grammar","The assignment <em>that</em> the professor gave us is due next Monday.","pron. 引导定语从句修饰 assignment",M+" The assignment + "+ATTR+" that the professor gave us + is due next Monday","教授布置的作业下周一截止。"],
["trap","I'm so tired <em>that</em> I can barely keep my eyes open in class. (Note: 'so...that' 结果状语)","conj. so...that... 引导结果状语从句",M+" I'm so tired + "+CAU+" that I can barely keep my eyes open in class","我太累了以至于上课几乎睁不开眼。（注意：so...that 结果状语）"],
["trap","It was the group discussion <em>that</em> really helped me understand the material. (Note: 强调句 it is...that)","conj. 强调句型 It is/was...that...",M+" It was the group discussion + that really helped me understand the material","正是小组讨论帮我真正理解了材料。（注意：强调句型）"],
["output","It is undeniable <em>that</em> technology has transformed the way students learn.","conj. 引导主语从句（it 形式主语）",M+" It is undeniable + "+SUBJ+" that technology has transformed the way students learn","不可否认技术已经改变了学生的学习方式。"],
["output","The evidence suggests <em>that</em> collaborative learning environments produce better academic outcomes.","conj. 引导宾语从句",M+" The evidence suggests + "+OBJ+" that collaborative learning environments produce better academic outcomes","证据表明协作学习环境能产生更好的学业成果。"]
]},

{w:"if",ph:"/ɪf/",pos:"conj",cn:"如果",stars:1,ss:[
["dialog","<em>If</em> you need help moving into your new dorm room, just let me know.","conj. 引导条件状语从句",COND+" If you need help moving into your new dorm room, + "+M+" just let me know","如果你搬新宿舍需要帮忙就告诉我。"],
["dialog","I'll go to the study session <em>if</em> I finish the lab report on time.","conj. 引导条件状语从句（主将从现）",M+" I'll go to the study session + "+COND+" if I finish the lab report on time","如果我按时完成实验报告就去参加学习会。"],
["dialog","Do you know <em>if</em> the library is open during spring break?","conj. if 引导宾语从句（是否）",M+" Do you know + "+OBJ+" if the library is open during spring break?","你知道图书馆春假期间开不开吗？"],
["grammar","<em>If</em> I were the class president, I would organize more social events.","conj. 引导与现在事实相反的虚拟条件句",COND+" If I were the class president, + "+M+" I would organize more social events","如果我是班长，我会组织更多社交活动。"],
["grammar","<em>If</em> she had taken the earlier bus, she wouldn't have missed the exam.","conj. 引导与过去事实相反的虚拟条件句",COND+" If she had taken the earlier bus, + "+M+" she wouldn't have missed the exam","如果她搭了早一班公交就不会错过考试了。"],
["grammar","I wonder <em>if</em> there are any scholarships available for international students.","conj. if 引导宾语从句（是否）",M+" I wonder + "+OBJ+" if there are any scholarships available for international students","我想知道是否有面向国际学生的奖学金。"],
["trap","<em>If</em> only I had registered for that course earlier! (Note: 无主句，if only 表示遗憾)","conj. If only + 过去完成时（表示对过去的遗憾）",M+" If only I had registered for that course earlier!","要是我早点注册那门课就好了！（注意：if only独立使用）"],
["trap","Let me know <em>if</em> you can come to the party. (Note: 'whether' is a distractor)","conj. if 引导宾语从句（是否），与 whether 可互换",M+" Let me know + "+OBJ+" if you can come to the party","告诉我你能不能来参加聚会。（注意：whether是干扰词）"],
["output","<em>If</em> universities provided more flexible scheduling, students could better manage their workloads.","conj. 引导虚拟条件句",COND+" If universities provided more flexible scheduling, + "+M+" students could better manage their workloads","如果大学提供更灵活的排课，学生可以更好地管理课业负担。"],
["output","Even <em>if</em> mandatory volunteering has some drawbacks, its benefits far outweigh them.","conj. even if 引导让步状语从句",CON+" Even if mandatory volunteering has some drawbacks, + "+M+" its benefits far outweigh them","即使强制志愿服务有一些弊端，其好处也远远超过弊端。"]
]},

{w:"because",ph:"/bɪˈkɒz/",pos:"conj",cn:"因为",stars:1,ss:[
["dialog","I missed the morning lecture <em>because</em> my alarm didn't go off.","conj. 引导原因状语从句",M+" I missed the morning lecture + "+CAU+" because my alarm didn't go off","我错过了早课因为闹钟没响。"],
["dialog","We chose that restaurant <em>because</em> it's close to campus and reasonably priced.","conj. 引导原因状语从句",M+" We chose that restaurant + "+CAU+" because it's close to campus and reasonably priced","我们选了那家餐厅因为它离校园近而且价格合理。"],
["dialog","<em>Because</em> the dorm is being renovated, we have to stay in temporary housing.","conj. 原因状语从句前置",CAU+" Because the dorm is being renovated, + "+M+" we have to stay in temporary housing","因为宿舍在翻新，我们得住临时宿舍。"],
["grammar","The event was cancelled <em>because</em> of the severe weather warning.","prep. because of + 名词短语（非从句）",M+" The event was cancelled + "+CAU+" because of the severe weather warning","活动因为恶劣天气预警被取消了。"],
["grammar","Just <em>because</em> a course is difficult does not mean it is not worthwhile.","conj. Just because... 引导让步（常与 doesn't mean 搭配）",CAU+" Just because a course is difficult + "+M+" does not mean + "+OBJ+" it is not worthwhile","仅仅因为一门课难并不意味着它不值得学。"],
["grammar","The reason he dropped the class is <em>because</em> it conflicted with his work schedule.","conj. The reason is because...（口语常见）",M+" The reason he dropped the class is + "+CAU+" because it conflicted with his work schedule","他退课的原因是与工作时间冲突。"],
["trap","I stayed up late <em>because</em> I had to finish the essay. (Note: 'so' is a distractor — opposite logic direction)","conj. because 表原因（非结果）",M+" I stayed up late + "+CAU+" because I had to finish the essay","我熬夜了因为我必须完成论文。（注意：so是干扰词——逻辑方向相反）"],
["trap","It is not <em>because</em> students are lazy that they fail; it is <em>because</em> they lack proper guidance.","conj. It is not because...that... 强调句否定形式",M+" It is not + "+CAU+" because students are lazy + that they fail; + it is + "+CAU+" because they lack proper guidance","不是因为学生懒惰他们才失败；而是因为他们缺乏正确引导。"],
["output","Students often perform poorly on exams not <em>because</em> they lack ability but <em>because</em> they lack preparation.","conj. not because A but because B 对比原因",M+" Students often perform poorly on exams + not "+CAU+" because they lack ability + but "+CAU+" because they lack preparation","学生考试表现不佳往往不是因为能力不足而是因为准备不够。"],
["output","<em>Because</em> self-directed learning fosters independence, it should be encouraged at the university level.","conj. 原因状语从句前置",CAU+" Because self-directed learning fosters independence, + "+M+" it should be encouraged at the university level","因为自主学习能培养独立性，所以大学阶段应当鼓励。"]
]},

{w:"since",ph:"/sɪns/",pos:"conj",cn:"因为；自从",stars:2,ss:[
["dialog","<em>Since</em> you've already finished your homework, want to grab dinner together?","conj. since 表示原因（既然）",CAU+" Since you've already finished your homework, + "+M+" want to grab dinner together?","既然你已经做完作业了，要不要一起去吃晚饭？"],
["dialog","I haven't been to the gym <em>since</em> the midterm exams started.","conj. since 表示时间（自从），搭配现在完成时",M+" I haven't been to the gym + "+TIM+" since the midterm exams started","自从期中考试开始我就没去过健身房了。"],
["dialog","<em>Since</em> the cafeteria closes early on Fridays, we should eat before our evening class.","conj. since 表示原因（既然）",CAU+" Since the cafeteria closes early on Fridays, + "+M+" we should eat before our evening class","既然食堂周五关得早，我们应该在晚课前吃饭。"],
["grammar","She has made great progress <em>since</em> she joined the writing workshop.","conj. since 引导时间状语从句 + 主句现在完成时",M+" She has made great progress + "+TIM+" since she joined the writing workshop","自从她加入写作工坊以来取得了很大进步。"],
["grammar","<em>Since</em> the assignment requires teamwork, we need to coordinate our schedules.","conj. since 表示原因（=because，语气稍弱）",CAU+" Since the assignment requires teamwork, + "+M+" we need to coordinate our schedules","因为作业需要团队合作，我们需要协调日程。"],
["grammar","It has been three weeks <em>since</em> the semester began.","conj. It has been + 时间段 + since... 句型",M+" It has been three weeks + "+TIM+" since the semester began","开学已经三周了。"],
["trap","<em>Since</em> you are familiar with the campus, could you show me around? (Note: 'because' is a distractor — interchangeable but 'since' fits known info)","conj. since 表示已知原因（听话者已知的事实）",CAU+" Since you are familiar with the campus, + "+M+" could you show me around?","既然你熟悉校园，能带我逛逛吗？（注意：because是干扰词——可互换但since适合已知信息）"],
["trap","I've been studying Japanese <em>since</em> my freshman year. (Note: 'for' is a distractor — since + 时间点 vs for + 时间段)","conj./prep. since + 时间点（非时间段）",M+" I've been studying Japanese + "+TIM+" since my freshman year","我从大一开始就一直在学日语。（注意：for是干扰词——since接时间点，for接时间段）"],
["output","<em>Since</em> time management is a skill that can be learned, schools should teach it explicitly.","conj. since 表示原因",CAU+" Since time management is a skill + "+ATTR+" that can be learned, + "+M+" schools should teach it explicitly","既然时间管理是一种可以学习的技能，学校应该明确教授。"],
["output","<em>Since</em> collaborative projects mirror real-world working conditions, they are invaluable preparation for students.","conj. since 表示原因",CAU+" Since collaborative projects mirror real-world working conditions, + "+M+" they are invaluable preparation for students","因为合作项目模拟了真实的工作环境，它们对学生来说是宝贵的准备。"]
]},

{w:"although",ph:"/ɔːlˈðoʊ/",pos:"conj",cn:"虽然",stars:2,ss:[
["dialog","<em>Although</em> the lecture was long, the professor made it really engaging.","conj. 引导让步状语从句",CON+" Although the lecture was long, + "+M+" the professor made it really engaging","虽然讲座很长，但教授讲得非常引人入胜。"],
["dialog","I decided to take the early class, <em>although</em> I'm not a morning person.","conj. 让步状语从句后置",M+" I decided to take the early class, + "+CON+" although I'm not a morning person","我决定选早课，虽然我不是早起的人。"],
["dialog","<em>Although</em> the dorm room is small, my roommate and I get along really well.","conj. 引导让步状语从句",CON+" Although the dorm room is small, + "+M+" my roommate and I get along really well","虽然宿舍房间很小，但我和室友相处得很好。"],
["grammar","<em>Although</em> she studied hard for the exam, the questions were harder than expected.","conj. 让步状语从句前置",CON+" Although she studied hard for the exam, + "+M+" the questions were harder than expected","虽然她努力复习了考试，但题目比预期的难。"],
["grammar","The campus shuttle is convenient, <em>although</em> it doesn't run after 10 p.m.","conj. 让步状语从句后置（补充说明）",M+" The campus shuttle is convenient, + "+CON+" although it doesn't run after 10 p.m.","校园班车很方便，虽然晚上十点后就不运行了。"],
["grammar","<em>Although</em> initially reluctant, he ended up enjoying the volunteer experience.","conj. 让步状语从句省略主语和 be 动词",CON+" Although initially reluctant, + "+M+" he ended up enjoying the volunteer experience","虽然起初不情愿，他最终还是喜欢上了志愿者经历。"],
["trap","<em>Although</em> the library has extended hours during finals, seats fill up fast. (Note: 'because' is a distractor — opposite logic)","conj. although 表让步（非原因）",CON+" Although the library has extended hours during finals, + "+M+" seats fill up fast","虽然图书馆期末延长了开放时间，但座位还是很快就满了。（注意：because是干扰词——逻辑相反）"],
["trap","<em>Although</em> it rained all day, the outdoor event was not cancelled. (Note: 'because' is a distractor)","conj. although 表让步转折",CON+" Although it rained all day, + "+M+" the outdoor event was not cancelled","虽然下了一整天的雨，户外活动并没有被取消。（注意：because是干扰词）"],
["output","<em>Although</em> mandatory community service may seem restrictive, it exposes students to valuable experiences.","conj. 引导让步状语从句",CON+" Although mandatory community service may seem restrictive, + "+M+" it exposes students to valuable experiences","虽然强制社区服务看起来有限制性，但它让学生接触到宝贵的经历。"],
["output","<em>Although</em> online learning offers flexibility, it cannot fully replace the benefits of face-to-face interaction.","conj. 引导让步状语从句",CON+" Although online learning offers flexibility, + "+M+" it cannot fully replace the benefits of face-to-face interaction","虽然在线学习提供了灵活性，但它无法完全替代面对面互动的好处。"]
]},

{w:"unless",ph:"/ənˈles/",pos:"conj",cn:"除非",stars:2,ss:[
["dialog","You can't borrow books <em>unless</em> you have a valid library card.","conj. unless 引导条件状语从句（= if...not）",M+" You can't borrow books + "+COND+" unless you have a valid library card","除非你有有效的借书证否则不能借书。"],
["dialog","I won't be able to make it to the party <em>unless</em> I finish this paper first.","conj. unless 引导条件状语从句",M+" I won't be able to make it to the party + "+COND+" unless I finish this paper first","除非我先完成这篇论文否则我不能去参加聚会。"],
["dialog","<em>Unless</em> you register by Friday, you'll lose your spot in the workshop.","conj. unless 从句前置表示条件",COND+" Unless you register by Friday, + "+M+" you'll lose your spot in the workshop","除非你周五之前注册否则你会失去研讨会的名额。"],
["grammar","The professor won't grant an extension <em>unless</em> you have a documented emergency.","conj. unless 引导否定条件",M+" The professor won't grant an extension + "+COND+" unless you have a documented emergency","除非你有书面证明的紧急情况否则教授不会给你延期。"],
["grammar","<em>Unless</em> students develop strong study habits early, they may struggle in upper-level courses.","conj. unless 从句前置",COND+" Unless students develop strong study habits early, + "+M+" they may struggle in upper-level courses","除非学生早期养成良好的学习习惯否则高年级课程可能会很吃力。"],
["grammar","I always bring an umbrella <em>unless</em> the forecast says zero chance of rain.","conj. unless 表示唯一例外条件",M+" I always bring an umbrella + "+COND+" unless the forecast says zero chance of rain","我总是带伞除非天气预报说完全没有降雨的可能。"],
["trap","<em>Unless</em> you hurry, we'll miss the bus. (Note: 'if' is a distractor — unless = if...not)","conj. unless = if...not（不能用 if 直接替换）",COND+" Unless you hurry, + "+M+" we'll miss the bus","除非你快点否则我们会错过公交。（注意：if是干扰词——unless = if...not）"],
["trap","Don't open the door <em>unless</em> you know who it is. (Note: 'until' is a distractor — different meaning)","conj. unless 表示条件（非时间）",M+" Don't open the door + "+COND+" unless you know + "+OBJ+" who it is","除非你知道是谁否则别开门。（注意：until是干扰词——意思不同）"],
["output","<em>Unless</em> universities address the root causes of student stress, mental health issues will persist.","conj. unless 引导条件状语从句",COND+" Unless universities address the root causes of student stress, + "+M+" mental health issues will persist","除非大学解决学生压力的根本原因否则心理健康问题将持续存在。"],
["output","Volunteer programs will fail to achieve their goals <em>unless</em> participants are genuinely motivated.","conj. unless 引导条件状语从句",M+" Volunteer programs will fail to achieve their goals + "+COND+" unless participants are genuinely motivated","志愿项目将无法实现其目标除非参与者真正有动力。"]
]},

{w:"while",ph:"/waɪl/",pos:"conj",cn:"当...时；然而",stars:2,ss:[
["dialog","Can you watch my laptop <em>while</em> I go get a coffee from the vending machine?","conj. while 引导时间状语从句（在...期间）",M+" Can you watch my laptop + "+TIM+" while I go get a coffee from the vending machine?","我去自动售货机买咖啡的时候你能帮我看着电脑吗？"],
["dialog","I like to listen to music <em>while</em> I study in the library.","conj. while 引导时间状语从句（同时进行）",M+" I like to listen to music + "+TIM+" while I study in the library","我喜欢在图书馆学习时听音乐。"],
["dialog","<em>While</em> the campus gym is free for students, the yoga classes cost extra.","conj. while 表示对比转折（然而）",CON+" While the campus gym is free for students, + "+M+" the yoga classes cost extra","虽然校园健身房对学生免费，但瑜伽课要额外收费。"],
["grammar","<em>While</em> I was walking to class, I bumped into my high school friend.","conj. while 引导时间状语从句（过去进行时）",TIM+" While I was walking to class, + "+M+" I bumped into my high school friend","我走去上课的路上碰到了高中朋友。"],
["grammar","<em>While</em> some students prefer lectures, others learn better through hands-on activities.","conj. while 表示对比（然而）",CON+" While some students prefer lectures, + "+M+" others learn better through hands-on activities","有些学生喜欢听讲座，然而另一些学生通过动手实践学得更好。"],
["grammar","She managed to maintain high grades <em>while</em> working part-time at the bookstore.","conj. while + 分词短语（省略主语和 be）",M+" She managed to maintain high grades + "+TIM+" while working part-time at the bookstore","她在书店兼职的同时还保持了高分。"],
["trap","<em>While</em> the professor was explaining the concept, a fire alarm went off. (Note: 'when' is a distractor — while 强调持续过程)","conj. while 强调动作持续（vs when 瞬间）",TIM+" While the professor was explaining the concept, + "+M+" a fire alarm went off","教授讲解概念时火警响了。（注意：when是干扰词——while强调持续过程）"],
["trap","<em>While</em> I agree the plan sounds good, I think we need more details. (Note: 'although' is a distractor — interchangeable in concessive use)","conj. while 表示让步（= although）",CON+" While I agree the plan sounds good, + "+M+" I think + "+OBJ+" we need more details","虽然我同意这个计划听起来不错，但我认为我们需要更多细节。（注意：although是干扰词——让步用法可互换）"],
["output","<em>While</em> technology has made communication easier, it has also reduced the quality of face-to-face interactions.","conj. while 表示对比转折",CON+" While technology has made communication easier, + "+M+" it has also reduced the quality of face-to-face interactions","虽然技术使沟通更加便捷，但它也降低了面对面交流的质量。"],
["output","<em>While</em> there are clear advantages to group study, individual reflection remains equally important.","conj. while 表示让步对比",CON+" While there are clear advantages to group study, + "+M+" individual reflection remains equally important","虽然小组学习有明显优势，但个人反思同样重要。"]
]},

{w:"whether",ph:"/ˈweðə(r)/",pos:"conj",cn:"是否",stars:2,ss:[
["dialog","I'm not sure <em>whether</em> I should take the bus or walk to campus.","conj. whether...or... 引导宾语从句",M+" I'm not sure + "+OBJ+" whether I should take the bus or walk to campus","我不确定应该坐公交还是走路去学校。"],
["dialog","Do you know <em>whether</em> the professor has posted the study guide yet?","conj. whether 引导宾语从句（是否）",M+" Do you know + "+OBJ+" whether the professor has posted the study guide yet?","你知道教授有没有发学习指南吗？"],
["dialog","I'm debating <em>whether</em> to take an internship or focus on my courses this summer.","conj. whether to do 不定式结构",M+" I'm debating + "+OBJ+" whether to take an internship or focus on my courses this summer","我在犹豫今年暑假是去实习还是专注于课程。"],
["grammar","<em>Whether</em> you agree or not, the policy applies to all students.","conj. Whether...or not 引导让步状语从句",CON+" Whether you agree or not, + "+M+" the policy applies to all students","不管你同不同意，这个政策适用于所有学生。"],
["grammar","<em>Whether</em> students should be required to do community service is a debatable topic.","conj. whether 引导主语从句",SUBJ+" Whether students should be required to do community service + "+M+" is a debatable topic","学生是否应该被要求做社区服务是一个值得讨论的话题。"],
["grammar","The question of <em>whether</em> to build a new parking lot remains unresolved.","conj. whether 引导同位语从句",M+" The question + "+APPO+" of whether to build a new parking lot + remains unresolved","是否建新停车场的问题仍未解决。"],
["trap","I can't decide <em>whether</em> to join the debate club or the drama club. (Note: 'if' is a distractor — whether...or 更正式)","conj. whether...or（选择性从句中优先用 whether）",M+" I can't decide + "+OBJ+" whether to join the debate club or the drama club","我不能决定是加入辩论社还是戏剧社。（注意：if是干扰词——whether...or更正式）"],
["trap","<em>Whether</em> or not it rains, the outdoor orientation will proceed as planned. (Note: 'if' cannot replace 'whether' here)","conj. Whether or not 前置（if 不能用于句首此结构）",CON+" Whether or not it rains, + "+M+" the outdoor orientation will proceed as planned","不管下不下雨，户外迎新活动将按计划进行。（注意：此处if不能替换whether）"],
["output","<em>Whether</em> community service should be mandatory depends on the specific goals of the institution.","conj. whether 引导主语从句",SUBJ+" Whether community service should be mandatory + "+M+" depends on the specific goals of the institution","社区服务是否应该强制取决于机构的具体目标。"],
["output","Students must evaluate <em>whether</em> the benefits of a particular activity outweigh its time demands.","conj. whether 引导宾语从句",M+" Students must evaluate + "+OBJ+" whether the benefits of a particular activity outweigh its time demands","学生必须评估某项活动的好处是否超过其时间成本。"]
]},

{w:"so",ph:"/soʊ/",pos:"conj/adv",cn:"所以；如此",stars:1,ss:[
["dialog","I forgot to set my alarm, <em>so</em> I was late for class this morning.","conj. so 表示结果（所以）",M+" I forgot to set my alarm, + "+CAU+" so I was late for class this morning","我忘了设闹钟所以今天早上上课迟到了。"],
["dialog","The assignment is due tomorrow, <em>so</em> we'd better start working on it now.","conj. so 表示结果",M+" The assignment is due tomorrow, + "+CAU+" so we'd better start working on it now","作业明天交，所以我们最好现在开始做。"],
["dialog","I'm <em>so</em> glad you reminded me about the club meeting tonight!","adv. so + adj. 加强程度（如此）",M+" I'm so glad + "+OBJ+" you reminded me about the club meeting tonight!","我太高兴你提醒我今晚的社团会议了！"],
["grammar","The exam was <em>so</em> difficult that half the class failed it.","adv. so...that... 引导结果状语从句",M+" The exam was so difficult + "+CAU+" that half the class failed it","考试太难了以至于一半的同学都没及格。"],
["grammar","She studied hard <em>so</em> that she could earn a scholarship.","conj. so that 引导目的状语从句",M+" She studied hard + "+PURP+" so that she could earn a scholarship","她努力学习以便获得奖学金。"],
["grammar","<em>So</em> impressed was the professor that he invited her to join his research team.","adv. So + adj. 前置引起倒装",M+" So impressed was the professor + "+CAU+" that he invited her to join his research team","教授印象深刻以至于邀请她加入他的研究团队。"],
["trap","I was tired, <em>so</em> I went to bed early. (Note: 'because' is a distractor — opposite logic direction)","conj. so 表示结果（不是原因）",M+" I was tired, + "+CAU+" so I went to bed early","我累了所以早早上床睡觉了。（注意：because是干扰词——逻辑方向相反）"],
["trap","She speaks <em>so</em> fast that I can hardly follow her lectures. (Note: 'too' is a distractor — different structure)","adv. so...that...（不是 too...to...）",M+" She speaks so fast + "+CAU+" that I can hardly follow her lectures","她说话太快了以至于我几乎跟不上她的课。（注意：too是干扰词——结构不同）"],
["output","Peer pressure can be <em>so</em> powerful that it influences students' academic choices.","adv. so...that... 引导结果状语从句",M+" Peer pressure can be so powerful + "+CAU+" that it influences students' academic choices","同伴压力可以大到影响学生的学业选择。"],
["output","Effective study groups encourage accountability, <em>so</em> students are more likely to stay on track.","conj. so 连接因果关系",M+" Effective study groups encourage accountability, + "+CAU+" so students are more likely to stay on track","有效的学习小组促进责任感，所以学生更有可能跟上进度。"]
]},

// ---- Words 43–60 (verbs, phrasal verbs, adjectives, noun) ----

{w:"register",ph:"/ˈredʒɪstər/",pos:"v",cn:"注册;登记",stars:2,ss:[
["dialog","Have you <em>registered</em> for the spring semester courses yet?","v. 现在完成时，及物用法",M+" Have you registered + prep.phrase(for the spring semester courses) + yet?","你注册春季学期的课程了吗？"],
["dialog","I need to <em>register</em> for that biology lab before it fills up.","v. 不定式作宾语",M+" I need to register + prep.phrase(for that biology lab) + "+TIM+" before it fills up","我需要在满员之前注册那个生物实验课。"],
["dialog","You can <em>register</em> online through the student portal.","v. 情态动词 + 动词原形",M+" You can register + adv.(online) + prep.phrase(through the student portal)","你可以通过学生门户网站在线注册。"],
["grammar","Students must <em>register</em> for courses before the deadline to secure their spots.","v. must + V 表义务",M+" Students must register + prep.phrase(for courses) + "+TIM+" before the deadline + "+PURP+" to secure their spots","学生必须在截止日期前注册课程以确保名额。"],
["grammar","She <em>registered</em> for three electives and one required course.","v. 过去式，列举宾语",M+" She registered + prep.phrase(for three electives and one required course)","她注册了三门选修课和一门必修课。"],
["grammar","If you haven't <em>registered</em> yet, you may lose your priority selection.","v. 现在完成时用于条件句",COND+" If you haven't registered yet, + "+M+" you may lose your priority selection","如果你还没注册，可能会失去优先选课权。"],
["trap","He <em>registered</em> for the wrong section and had to switch. (Trap: 'registered to' is incorrect; use 'registered for')","v. register for sth（非 register to sth）",M+" He registered + prep.phrase(for the wrong section) + and had to switch","他注册了错误的班级，不得不换。"],
["trap","Only students who have <em>registered</em> in advance can attend the seminar. (Trap: 'registered' not 'registering')","v. 现在完成时用于定语从句",M+" Only students + "+ATTR+" who have registered in advance + can attend the seminar","只有提前注册的学生才能参加研讨会。"],
["output","It is essential that students <em>register</em> early to gain access to high-demand courses.","v. 虚拟语气（It is essential that + S + V原形）",M+" It is essential + "+OBJ+" that students register early + "+PURP+" to gain access to high-demand courses","学生尽早注册以获得热门课程至关重要。"],
["output","Once students <em>register</em> for a course, they become responsible for meeting all requirements.","v. 一般现在时表规律",TIM+" Once students register for a course, + "+M+" they become responsible for meeting all requirements","一旦学生注册了课程，他们就有责任满足所有要求。"]
]},

{w:"sign up",ph:"/saɪn ʌp/",pos:"phrasal v",cn:"报名",stars:1,ss:[
["dialog","Have you <em>signed up</em> for the campus volunteer event this weekend?","phrasal v. 现在完成时",M+" Have you signed up + prep.phrase(for the campus volunteer event) + "+TIM+" this weekend?","你报名参加这周末的校园志愿活动了吗？"],
["dialog","I'm going to <em>sign up</em> for the study group that meets on Thursdays.","phrasal v. be going to + V",M+" I'm going to sign up + prep.phrase(for the study group) + "+ATTR+" that meets on Thursdays","我打算报名参加每周四的学习小组。"],
["dialog","You should <em>sign up</em> early — spots are limited.","phrasal v. should + V 表建议",M+" You should sign up + adv.(early) — spots are limited","你应该早点报名——名额有限。"],
["grammar","Students who <em>sign up</em> before Friday will receive a discount.","phrasal v. 一般现在时用于定语从句",M+" Students + "+ATTR+" who sign up before Friday + will receive a discount","周五前报名的学生可享受折扣。"],
["grammar","She <em>signed up</em> for two workshops and a cooking class.","phrasal v. 过去式",M+" She signed up + prep.phrase(for two workshops and a cooking class)","她报名了两个工作坊和一个烹饪课。"],
["grammar","I forgot to <em>sign up</em>, so now all the sessions are full.","phrasal v. forgot to + V 表遗忘",M+" I forgot to sign up, + "+CAU+" so now all the sessions are full","我忘了报名，所以现在所有场次都满了。"],
["trap","He <em>signed up</em> for the wrong time slot and couldn't change it. (Trap: 'signed up to' vs 'signed up for')","phrasal v. sign up for sth（注意介词搭配）",M+" He signed up + prep.phrase(for the wrong time slot) + and couldn't change it","他报名了错误的时间段，而且无法更改。"],
["trap","Everyone has already <em>signed up</em> except me. (Trap: word order — 'signed up' stays together)","phrasal v. 不可拆分短语动词",M+" Everyone has already signed up + prep.phrase(except me)","除了我所有人都已经报名了。"],
["output","I would strongly encourage students to <em>sign up</em> for extracurricular activities that broaden their perspectives.","phrasal v. 不定式作宾补",M+" I would strongly encourage students + "+PURP+" to sign up for extracurricular activities + "+ATTR+" that broaden their perspectives","我强烈建议学生报名参加能拓宽视野的课外活动。"],
["output","Those who <em>sign up</em> for community projects often develop stronger interpersonal skills.","phrasal v. 一般现在时表规律",M+" Those + "+ATTR+" who sign up for community projects + often develop stronger interpersonal skills","报名参加社区项目的人往往能培养更强的人际交往能力。"]
]},

{w:"pick up",ph:"/pɪk ʌp/",pos:"phrasal v",cn:"拿起;买;接人",stars:1,ss:[
["dialog","Can you <em>pick up</em> my textbook from the library on your way back?","phrasal v. 拿起/取回",M+" Can you pick up + my textbook + prep.phrase(from the library) + "+TIM+" on your way back?","你回来的路上能帮我从图书馆取回课本吗？"],
["dialog","I'll <em>pick up</em> some snacks for our study session tonight.","phrasal v. 买",M+" I'll pick up + some snacks + "+PURP+" for our study session tonight","我会为今晚的学习小组买些零食。"],
["dialog","My mom is coming to <em>pick</em> me <em>up</em> after the concert on campus.","phrasal v. 接人（可分离：pick sb up）",M+" My mom is coming + "+PURP+" to pick me up + "+TIM+" after the concert on campus","我妈妈会在校园音乐会结束后来接我。"],
["grammar","She <em>picked up</em> a few useful phrases during the exchange program.","phrasal v. 学会（引申义）",M+" She picked up + a few useful phrases + "+TIM+" during the exchange program","她在交换项目期间学会了一些实用的短语。"],
["grammar","I need to <em>pick up</em> my student ID from the administration office.","phrasal v. 领取",M+" I need to pick up + my student ID + prep.phrase(from the administration office)","我需要去行政办公室领取学生证。"],
["grammar","He <em>picked</em> the notes <em>up</em> from the floor and put them on the desk.","phrasal v. 拿起（可分离形式）",M+" He picked the notes up + prep.phrase(from the floor) + and put them on the desk","他从地上捡起笔记放到桌上。"],
["trap","She asked me to <em>pick up</em> her assignment, not to drop it off. (Trap: 'pick up' vs 'drop off' — opposite meanings)","phrasal v. pick up ≠ drop off",M+" She asked me + "+PURP+" to pick up her assignment, not to drop it off","她让我去取她的作业，不是去交。"],
["trap","I'll <em>pick</em> you <em>up</em> at the dorm at seven. (Trap: pronoun must go in the middle — 'pick you up', not 'pick up you')","phrasal v. 代词置于中间",M+" I'll pick you up + prep.phrase(at the dorm) + "+TIM+" at seven","我七点到宿舍接你。"],
["output","University students can <em>pick up</em> valuable life skills by participating in group projects.","phrasal v. 学到（引申义）",M+" University students can pick up + valuable life skills + "+CAU+" by participating in group projects","大学生通过参与小组项目可以学到宝贵的生活技能。"],
["output","The ability to <em>pick up</em> new concepts quickly is essential for academic success.","phrasal v. 学会",M+" The ability to pick up new concepts quickly + is essential + prep.phrase(for academic success)","快速掌握新概念的能力对学业成功至关重要。"]
]},

{w:"hand in",ph:"/hænd ɪn/",pos:"phrasal v",cn:"上交",stars:1,ss:[
["dialog","Did you <em>hand in</em> your essay before the deadline?","phrasal v. 过去式疑问",M+" Did you hand in + your essay + "+TIM+" before the deadline?","你在截止日期前交了论文吗？"],
["dialog","I still need to <em>hand in</em> the lab report — it's due tomorrow.","phrasal v. need to + V",M+" I still need to hand in + the lab report — "+CAU+" it's due tomorrow","我还需要交实验报告——明天就到期了。"],
["dialog","Professor Lee said we can <em>hand</em> our papers <em>in</em> electronically this time.","phrasal v. 可分离形式",M+" Professor Lee said + "+OBJ+" we can hand our papers in + adv.(electronically) + "+TIM+" this time","李教授说这次我们可以电子提交论文。"],
["grammar","Students who fail to <em>hand in</em> assignments on time will receive a penalty.","phrasal v. fail to + V",M+" Students + "+ATTR+" who fail to hand in assignments on time + will receive a penalty","未按时上交作业的学生将受到处罚。"],
["grammar","She <em>handed in</em> her thesis two days early and impressed the professor.","phrasal v. 过去式 + 并列句",M+" She handed in + her thesis + "+TIM+" two days early + and impressed the professor","她提前两天交了论文，给教授留下了深刻印象。"],
["grammar","Make sure you <em>hand in</em> the signed form along with the application.","phrasal v. 祈使句",M+" Make sure + "+OBJ+" you hand in the signed form + prep.phrase(along with the application)","确保你连同申请一起交上签好的表格。"],
["trap","I <em>handed</em> my homework <em>in</em> late because I overslept. (Trap: 'handed in late' not 'lately')","phrasal v. late(迟) ≠ lately(最近)",M+" I handed my homework in + adv.(late) + "+CAU+" because I overslept","我因为睡过头所以迟交了作业。"],
["trap","Have you <em>handed in</em> all the required documents? (Trap: 'handed in' not 'handed out' — opposite direction)","phrasal v. hand in(上交) ≠ hand out(分发)",M+" Have you handed in + all the required documents?","你交齐所有要求的文件了吗？"],
["output","Students should <em>hand in</em> their work on time to demonstrate responsibility and academic integrity.","phrasal v. should + V 表建议",M+" Students should hand in + their work + "+TIM+" on time + "+PURP+" to demonstrate responsibility and academic integrity","学生应按时上交作业以展示责任感和学术诚信。"],
["output","Failing to <em>hand in</em> assignments consistently can have a significant impact on one's final grade.","phrasal v. 动名词作主语",M+" Failing to hand in assignments consistently + can have a significant impact + prep.phrase(on one's final grade)","持续不交作业会对期末成绩产生重大影响。"]
]},

{w:"figure out",ph:"/ˈfɪɡjər aʊt/",pos:"phrasal v",cn:"弄清楚",stars:2,ss:[
["dialog","I can't <em>figure out</em> how to use the new library database system.","phrasal v. figure out + 疑问词从句",M+" I can't figure out + "+OBJ+" how to use the new library database system","我弄不清楚怎么使用图书馆的新数据库系统。"],
["dialog","Let's try to <em>figure out</em> a schedule that works for everyone in our study group.","phrasal v. try to + V",M+" Let's try to figure out + a schedule + "+ATTR+" that works for everyone in our study group","我们试着找出一个适合学习小组所有人的时间表吧。"],
["dialog","Have you <em>figured out</em> which dining hall has the best vegetarian options?","phrasal v. 现在完成时",M+" Have you figured out + "+OBJ+" which dining hall has the best vegetarian options?","你弄清楚哪个食堂的素食选择最好了吗？"],
["grammar","It took me a whole week to <em>figure out</em> the solution to that math problem.","phrasal v. It takes + 时间 + to V",M+" It took me a whole week + "+PURP+" to figure out the solution to that math problem","我花了整整一周才弄清楚那道数学题的答案。"],
["grammar","She <em>figured out</em> that the assignment was due a day earlier than she thought.","phrasal v. figure out + that 从句",M+" She figured out + "+OBJ+" that the assignment was due a day earlier than she thought","她发现作业截止日期比她以为的早一天。"],
["grammar","Once you <em>figure out</em> the format, the rest of the paper is easy to write.","phrasal v. once 引导时间状语从句",TIM+" Once you figure out the format, + "+M+" the rest of the paper is easy to write","一旦你弄清楚格式，论文剩下的部分就容易写了。"],
["trap","I finally <em>figured out</em> the answer by myself. (Trap: 'figured out' not 'figured up' — no such phrasal verb)","phrasal v. figure out（非 figure up）",M+" I finally figured out + the answer + prep.phrase(by myself)","我终于自己弄清楚了答案。"],
["trap","Can you help me <em>figure</em> this problem <em>out</em>? (Trap: separable — noun can go in the middle)","phrasal v. 可分离（名词可置中间）",M+" Can you help me + figure this problem out?","你能帮我弄清楚这个问题吗？"],
["output","In order to succeed academically, students must <em>figure out</em> which learning strategies suit them best.","phrasal v. must + V",PURP+" In order to succeed academically, + "+M+" students must figure out + "+OBJ+" which learning strategies suit them best","为了在学业上取得成功，学生必须弄清楚哪些学习策略最适合自己。"],
["output","It is often through trial and error that students <em>figure out</em> how to manage their time effectively.","phrasal v. 强调句型 It is...that",M+" It is often through trial and error + "+ATTR+" that students figure out + "+OBJ+" how to manage their time effectively","学生往往是通过反复试验才弄清楚如何有效管理时间的。"]
]},

{w:"finish",ph:"/ˈfɪnɪʃ/",pos:"v",cn:"完成",stars:1,ss:[
["dialog","Have you <em>finished</em> writing the report for our group project?","v. 现在完成时 + 动名词宾语",M+" Have you finished + "+OBJ+" writing the report for our group project?","你写完我们小组项目的报告了吗？"],
["dialog","I need to <em>finish</em> this chapter before the study group meets at five.","v. need to + V",M+" I need to finish + this chapter + "+TIM+" before the study group meets at five","我需要在五点学习小组开会前读完这一章。"],
["dialog","She <em>finished</em> her meal quickly so she could get to class on time.","v. 过去式 + so 引导目的",M+" She finished + her meal + adv.(quickly) + "+PURP+" so she could get to class on time","她快速吃完饭以便按时上课。"],
["grammar","After <em>finishing</em> the exam, students must remain seated until told otherwise.","v. 动名词作介词宾语",TIM+" After finishing the exam, + "+M+" students must remain seated + "+TIM+" until told otherwise","考试结束后，学生必须留在座位上直到另行通知。"],
["grammar","He <em>finished</em> reading all the assigned chapters and started reviewing his notes.","v. 过去式 + 动名词宾语",M+" He finished reading all the assigned chapters + and started reviewing his notes","他读完所有指定章节后开始复习笔记。"],
["grammar","I won't leave the library until I <em>finish</em> this assignment.","v. until 引导时间状语从句",M+" I won't leave the library + "+TIM+" until I finish this assignment","我不完成这个作业就不离开图书馆。"],
["trap","She <em>finished</em> doing her homework, not 'finished to do'. (Trap: finish + V-ing, not finish + to V)","v. finish + V-ing（非 finish + to V）",M+" She finished + "+OBJ+" doing her homework","她做完了作业。（注意：finish 后接动名词）"],
["trap","I <em>finished</em> the project on time despite the tight schedule. (Trap: 'finished' not 'finished up with')","v. finish + 名词（直接宾语）",M+" I finished + the project + "+TIM+" on time + "+CON+" despite the tight schedule","尽管时间紧张，我还是按时完成了项目。"],
["output","Students who <em>finish</em> their assignments ahead of schedule have more time to revise and improve their work.","v. 一般现在时表规律",M+" Students + "+ATTR+" who finish their assignments ahead of schedule + have more time to revise and improve their work","提前完成作业的学生有更多时间修改和完善他们的作品。"],
["output","<em>Finishing</em> a degree requires not only intelligence but also perseverance and discipline.","v. 动名词作主语",M+" Finishing a degree + requires + not only intelligence but also perseverance and discipline","完成学位不仅需要智力，还需要毅力和自律。"]
]},

{w:"consider",ph:"/kənˈsɪdər/",pos:"v",cn:"考虑",stars:2,ss:[
["dialog","Have you <em>considered</em> joining the debate club this semester?","v. 现在完成时 + 动名词宾语",M+" Have you considered + "+OBJ+" joining the debate club this semester?","你考虑过这学期加入辩论俱乐部吗？"],
["dialog","I'm <em>considering</em> moving to a different dorm next year.","v. 现在进行时 + 动名词宾语",M+" I'm considering + "+OBJ+" moving to a different dorm next year","我在考虑明年换一个宿舍。"],
["dialog","You should <em>consider</em> taking Professor Wang's class — she's an amazing lecturer.","v. should + V + 动名词宾语",M+" You should consider + "+OBJ+" taking Professor Wang's class — "+CAU+" she's an amazing lecturer","你应该考虑选王教授的课——她讲课很棒。"],
["grammar","When <em>considering</em> which elective to take, students should evaluate their career goals.","v. 现在分词作时间状语",TIM+" When considering which elective to take, + "+M+" students should evaluate their career goals","在考虑选哪门选修课时，学生应评估自己的职业目标。"],
["grammar","The committee <em>considered</em> several proposals before making a final decision.","v. 过去式 + 名词宾语",M+" The committee considered + several proposals + "+TIM+" before making a final decision","委员会在做出最终决定前考虑了几个提案。"],
["grammar","She <em>considers</em> the library the best place to study on campus.","v. consider + O + OC（宾语补足语）",M+" She considers + the library + the best place to study on campus(OC)","她认为图书馆是校园里最好的学习场所。"],
["trap","He <em>considered</em> changing his major, not 'considered to change'. (Trap: consider + V-ing, not consider + to V)","v. consider + V-ing（非 consider + to V）",M+" He considered + "+OBJ+" changing his major","他考虑过换专业。（注意：consider 后接动名词）"],
["trap","All things <em>considered</em>, the new dining hall is a great improvement. (Trap: past participle in absolute construction)","v. 独立主格结构（all things considered）",PART+" All things considered, + "+M+" the new dining hall is a great improvement","综合考虑，新食堂是一个很大的改善。"],
["output","Students should carefully <em>consider</em> the long-term benefits of internships before dismissing them.","v. should + adv. + V",M+" Students should carefully consider + the long-term benefits of internships + "+TIM+" before dismissing them","学生应在否定实习之前仔细考虑其长期益处。"],
["output","It is worth <em>considering</em> whether mandatory attendance policies truly enhance learning outcomes.","v. It is worth + V-ing",M+" It is worth considering + "+OBJ+" whether mandatory attendance policies truly enhance learning outcomes","值得考虑强制出勤政策是否真正提升了学习效果。"]
]},

{w:"prepare",ph:"/prɪˈper/",pos:"v",cn:"准备",stars:1,ss:[
["dialog","I need to <em>prepare</em> for my presentation tomorrow morning.","v. prepare for + 名词",M+" I need to prepare + prep.phrase(for my presentation) + "+TIM+" tomorrow morning","我需要为明天上午的演讲做准备。"],
["dialog","Are you <em>prepared</em> for the midterm exam next week?","v. 过去分词作表语",M+" Are you prepared + prep.phrase(for the midterm exam) + "+TIM+" next week?","你为下周的期中考试做好准备了吗？"],
["dialog","Let's <em>prepare</em> some flashcards together for the vocabulary quiz.","v. 祈使句 + 名词宾语",M+" Let's prepare + some flashcards + adv.(together) + "+PURP+" for the vocabulary quiz","我们一起做些单词卡来准备词汇测验吧。"],
["grammar","Students who <em>prepare</em> thoroughly tend to perform better on exams.","v. 一般现在时表规律",M+" Students + "+ATTR+" who prepare thoroughly + tend to perform better on exams","充分准备的学生在考试中表现往往更好。"],
["grammar","She <em>prepared</em> a detailed outline before writing her research paper.","v. 过去式 + 名词宾语",M+" She prepared + a detailed outline + "+TIM+" before writing her research paper","她在写研究论文之前准备了一份详细的提纲。"],
["grammar","Having <em>prepared</em> all the materials in advance, he felt confident during the presentation.","v. 完成分词作原因状语",PART+" Having prepared all the materials in advance, + "+M+" he felt confident during the presentation","由于提前准备好了所有材料，他在演讲中感到很自信。"],
["trap","She <em>prepared</em> for the interview, not 'prepared the interview'. (Trap: prepare for = get ready; prepare sth = make sth)","v. prepare for（为…做准备）≠ prepare sth（准备某物）",M+" She prepared + prep.phrase(for the interview)","她为面试做了准备。（注意介词搭配）"],
["trap","I was well <em>prepared</em>, so the test didn't feel difficult. (Trap: 'prepared' as adj., not 'preparing')","v. well prepared 作表语（非 well preparing）",M+" I was well prepared, + "+CAU+" so the test didn't feel difficult","我准备充分了，所以考试感觉不难。"],
["output","<em>Preparing</em> for exams well in advance allows students to retain information more effectively.","v. 动名词作主语",M+" Preparing for exams well in advance + allows students + "+PURP+" to retain information more effectively","提前充分备考使学生能更有效地记住信息。"],
["output","A student who is adequately <em>prepared</em> is far more likely to succeed in a high-pressure testing environment.","v. 过去分词作表语",M+" A student + "+ATTR+" who is adequately prepared + is far more likely to succeed + prep.phrase(in a high-pressure testing environment)","充分准备的学生在高压考试环境中更有可能成功。"]
]},

{w:"attend",ph:"/əˈtend/",pos:"v",cn:"参加;出席",stars:1,ss:[
["dialog","Are you going to <em>attend</em> the career fair this Friday?","v. be going to + V",M+" Are you going to attend + the career fair + "+TIM+" this Friday?","你打算参加这周五的招聘会吗？"],
["dialog","I couldn't <em>attend</em> the lecture because I had a dentist appointment.","v. couldn't + V",M+" I couldn't attend + the lecture + "+CAU+" because I had a dentist appointment","我没能参加讲座因为我有牙医预约。"],
["dialog","Professor Kim expects all students to <em>attend</em> every class session.","v. expect sb to V",M+" Professor Kim expects + all students + "+PURP+" to attend every class session","金教授期望所有学生出席每一节课。"],
["grammar","Students who regularly <em>attend</em> office hours tend to earn higher grades.","v. 一般现在时表规律",M+" Students + "+ATTR+" who regularly attend office hours + tend to earn higher grades","经常参加答疑时间的学生往往成绩更高。"],
["grammar","She <em>attended</em> every study group session and improved her GPA significantly.","v. 过去式",M+" She attended + every study group session + and improved her GPA significantly","她参加了每一次学习小组会议，显著提高了绩点。"],
["grammar","If you <em>attend</em> the workshop, you will receive a certificate of completion.","v. 条件句（一般现在时）",COND+" If you attend the workshop, + "+M+" you will receive a certificate of completion","如果你参加研讨会，将获得结业证书。"],
["trap","She <em>attended</em> the meeting, not 'attended to the meeting'. (Trap: attend sth 出席; attend to sth 处理/照料)","v. attend sth（出席）≠ attend to sth（处理）",M+" She attended + the meeting","她出席了会议。（注意：attend 直接跟宾语）"],
["trap","He has <em>attended</em> this university for three years. (Trap: attended = been enrolled; not 'joined')","v. attend a university 就读于（非 join a university）",M+" He has attended + this university + "+TIM+" for three years","他在这所大学就读三年了。"],
["output","<em>Attending</em> lectures regularly is one of the most effective ways to stay on track academically.","v. 动名词作主语",M+" Attending lectures regularly + is one of the most effective ways + "+PURP+" to stay on track academically","定期参加讲座是保持学业进度最有效的方法之一。"],
["output","Students who <em>attend</em> extracurricular events often develop a stronger sense of community on campus.","v. 一般现在时表规律",M+" Students + "+ATTR+" who attend extracurricular events + often develop a stronger sense of community on campus","参加课外活动的学生往往在校园中培养出更强的社区归属感。"]
]},

{w:"miss",ph:"/mɪs/",pos:"v",cn:"错过;想念",stars:1,ss:[
["dialog","I <em>missed</em> the sign-up deadline for the campus talent show.","v. 过去式，错过",M+" I missed + the sign-up deadline + prep.phrase(for the campus talent show)","我错过了校园才艺秀的报名截止日期。"],
["dialog","Don't <em>miss</em> the free pizza event at the student center tonight!","v. 祈使句否定",M+" Don't miss + the free pizza event + prep.phrase(at the student center) + "+TIM+" tonight!","别错过今晚学生中心的免费披萨活动！"],
["dialog","I really <em>miss</em> my family — it's been two months since I came to campus.","v. 一般现在时，想念",M+" I really miss + my family — "+CAU+" it's been two months since I came to campus","我真的很想念家人——来校园已经两个月了。"],
["grammar","She <em>missed</em> three classes and fell behind on the coursework.","v. 过去式 + 并列句",M+" She missed + three classes + and fell behind on the coursework","她缺了三节课，课程进度落后了。"],
["grammar","If you <em>miss</em> the review session, you'll have to study the material on your own.","v. 条件句",COND+" If you miss the review session, + "+M+" you'll have to study the material on your own","如果你错过复习课，就得自学那些内容了。"],
["grammar","The lecture was so important that <em>missing</em> it would put students at a disadvantage.","v. 动名词作主语",M+" The lecture was so important + "+OBJ+" that missing it would put students at a disadvantage","那节课太重要了，缺席会让学生处于不利地位。"],
["trap","I <em>missed</em> the bus, not 'I lost the bus'. (Trap: miss = fail to catch; lose = cannot find)","v. miss(错过) ≠ lose(丢失)",M+" I missed + the bus","我错过了公交车。（注意：miss ≠ lose）"],
["trap","She barely <em>missed</em> the passing grade by two points. (Trap: 'missed' here = failed to reach, not 'lost')","v. miss + 名词（未达到）",M+" She barely missed + the passing grade + prep.phrase(by two points)","她差两分就及格了。"],
["output","Students who frequently <em>miss</em> classes often struggle to keep up with their peers.","v. 一般现在时表规律",M+" Students + "+ATTR+" who frequently miss classes + often struggle to keep up with their peers","经常缺课的学生往往很难跟上同学的进度。"],
["output","<em>Missing</em> even a single deadline can have a cascading effect on a student's overall performance.","v. 动名词作主语",M+" Missing even a single deadline + can have a cascading effect + prep.phrase(on a student's overall performance)","即使错过一个截止日期也会对学生的整体表现产生连锁反应。"]
]},

{w:"borrow",ph:"/ˈbɑːroʊ/",pos:"v",cn:"借",stars:1,ss:[
["dialog","Can I <em>borrow</em> your notes from yesterday's history lecture?","v. borrow + 名词（借入）",M+" Can I borrow + your notes + prep.phrase(from yesterday's history lecture)?","我能借你昨天历史课的笔记吗？"],
["dialog","I need to <em>borrow</em> a few books from the library for my research paper.","v. borrow + 名词 + from",M+" I need to borrow + a few books + prep.phrase(from the library) + "+PURP+" for my research paper","我需要从图书馆借几本书来写研究论文。"],
["dialog","She <em>borrowed</em> my laptop charger and forgot to return it.","v. 过去式 + 并列句",M+" She borrowed + my laptop charger + and forgot to return it","她借了我的笔记本充电器然后忘了还。"],
["grammar","Students may <em>borrow</em> up to ten books at a time from the university library.","v. may + V 表许可",M+" Students may borrow + up to ten books + "+TIM+" at a time + prep.phrase(from the university library)","学生每次最多可以从校图书馆借十本书。"],
["grammar","He <em>borrowed</em> the reference book that the professor recommended.","v. 过去式 + 定语从句",M+" He borrowed + the reference book + "+ATTR+" that the professor recommended","他借了教授推荐的参考书。"],
["grammar","If you <em>borrow</em> a book, make sure you return it before the due date.","v. 条件句 + 祈使句",COND+" If you borrow a book, + "+M+" make sure you return it + "+TIM+" before the due date","如果你借了书，务必在到期日之前归还。"],
["trap","I <em>borrowed</em> the book from her, not 'I borrowed the book to her'. (Trap: borrow from ≠ lend to)","v. borrow from（借入）≠ lend to（借出）",M+" I borrowed + the book + prep.phrase(from her)","我从她那里借了这本书。（注意：borrow from ≠ lend to）"],
["trap","You can't <em>borrow</em> that — it's a reference-only copy. (Trap: some library materials cannot be borrowed)","v. borrow 用于否定句",M+" You can't borrow + that — "+CAU+" it's a reference-only copy","你不能借那本——那是仅供参阅的。"],
["output","The ability to <em>borrow</em> resources from the library enables students to access materials they might not otherwise afford.","v. 不定式作定语",M+" The ability to borrow resources from the library + enables students + "+PURP+" to access materials + "+ATTR+" they might not otherwise afford","从图书馆借阅资源的能力使学生能获取他们可能负担不起的材料。"],
["output","Students should <em>borrow</em> materials responsibly and return them on time to ensure fair access for all.","v. should + V",M+" Students should borrow + materials + adv.(responsibly) + and return them on time + "+PURP+" to ensure fair access for all","学生应负责任地借阅材料并按时归还以确保所有人的公平使用。"]
]},

{w:"reschedule",ph:"/ˌriːˈskedʒuːl/",pos:"v",cn:"重新安排",stars:2,ss:[
["dialog","I need to <em>reschedule</em> my advising appointment — something came up.","v. need to + V",M+" I need to reschedule + my advising appointment — "+CAU+" something came up","我需要重新安排我的咨询预约——有事情发生了。"],
["dialog","Can we <em>reschedule</em> our study group to Thursday instead?","v. 情态动词 + V",M+" Can we reschedule + our study group + prep.phrase(to Thursday instead)?","我们能把学习小组改到周四吗？"],
["dialog","The professor agreed to <em>reschedule</em> the quiz because of the fire drill.","v. agree to + V",M+" The professor agreed to reschedule + the quiz + "+CAU+" because of the fire drill","教授同意重新安排测验因为有消防演习。"],
["grammar","If the event is <em>rescheduled</em>, all participants will be notified by email.","v. 被动语态 + 条件句",COND+" If the event is rescheduled, + "+M+" all participants will be notified + prep.phrase(by email)","如果活动重新安排，所有参与者将通过电子邮件收到通知。"],
["grammar","She asked whether the meeting could be <em>rescheduled</em> for a later time.","v. 被动语态 + 宾语从句",M+" She asked + "+OBJ+" whether the meeting could be rescheduled for a later time","她问会议能否改到更晚的时间。"],
["grammar","The lecture was <em>rescheduled</em> to next Monday due to the professor's illness.","v. 被动语态 + due to",M+" The lecture was rescheduled + "+TIM+" to next Monday + "+CAU+" due to the professor's illness","由于教授生病，讲座被改到了下周一。"],
["trap","The exam has been <em>rescheduled</em>, not 'rescheduled again back'. (Trap: reschedule already means 'schedule again')","v. reschedule 本身含 re-（无需加 again）",M+" The exam has been rescheduled","考试已被重新安排。（注意：reschedule 本身含再次之意）"],
["trap","They <em>rescheduled</em> the event for Friday, not 'rescheduled the event on Friday'. (Trap: reschedule for + 新时间)","v. reschedule for + 新时间（非 on）",M+" They rescheduled + the event + prep.phrase(for Friday)","他们把活动重新安排到了周五。"],
["output","Universities should be willing to <em>reschedule</em> exams when unforeseen circumstances arise.","v. be willing to + V",M+" Universities should be willing to reschedule + exams + "+TIM+" when unforeseen circumstances arise","大学在出现不可预见的情况时应愿意重新安排考试。"],
["output","The flexibility to <em>reschedule</em> appointments reflects an institution's commitment to student well-being.","v. 不定式作定语",M+" The flexibility to reschedule appointments + reflects + an institution's commitment to student well-being","重新安排预约的灵活性反映了学校对学生福祉的重视。"]
]},

{w:"recommend",ph:"/ˌrekəˈmend/",pos:"v",cn:"推荐",stars:1,ss:[
["dialog","Can you <em>recommend</em> a good place to study on campus?","v. recommend + 名词",M+" Can you recommend + a good place + "+PURP+" to study on campus?","你能推荐一个校园里学习的好地方吗？"],
["dialog","My roommate <em>recommended</em> the new Thai restaurant near campus.","v. 过去式 + 名词宾语",M+" My roommate recommended + the new Thai restaurant + prep.phrase(near campus)","我室友推荐了校园附近那家新开的泰餐厅。"],
["dialog","I'd <em>recommend</em> signing up for that workshop — it was really helpful.","v. recommend + V-ing",M+" I'd recommend + "+OBJ+" signing up for that workshop — "+CAU+" it was really helpful","我推荐报名那个工作坊——真的很有帮助。"],
["grammar","The professor <em>recommended</em> that students read the articles before the discussion.","v. recommend + that + S + V原形（虚拟语气）",M+" The professor recommended + "+OBJ+" that students read the articles + "+TIM+" before the discussion","教授建议学生在讨论前阅读那些文章。"],
["grammar","This book is highly <em>recommended</em> for anyone interested in environmental science.","v. 被动语态 + for",M+" This book is highly recommended + prep.phrase(for anyone interested in environmental science)","这本书强烈推荐给对环境科学感兴趣的人。"],
["grammar","She <em>recommended</em> him for the research assistant position.","v. recommend sb for sth",M+" She recommended + him + prep.phrase(for the research assistant position)","她推荐他担任研究助理职位。"],
["trap","I <em>recommend</em> taking the early class, not 'recommend to take'. (Trap: recommend + V-ing, not recommend + to V)","v. recommend + V-ing（非 recommend + to V）",M+" I recommend + "+OBJ+" taking the early class","我推荐选早课。（注意：recommend 后接动名词）"],
["trap","The advisor <em>recommended</em> that she take five courses, not 'takes'. (Trap: subjunctive — V原形)","v. 虚拟语气 recommend that + S + V原形",M+" The advisor recommended + "+OBJ+" that she take five courses","导师建议她选五门课。（注意：虚拟语气用动词原形）"],
["output","I would <em>recommend</em> that universities invest more in mental health resources for students.","v. would recommend + that 虚拟语气",M+" I would recommend + "+OBJ+" that universities invest more in mental health resources for students","我建议大学在学生心理健康资源上投入更多。"],
["output","Experts <em>recommend</em> balancing academic obligations with social activities to maintain overall well-being.","v. recommend + V-ing",M+" Experts recommend + "+OBJ+" balancing academic obligations with social activities + "+PURP+" to maintain overall well-being","专家建议平衡学业义务与社交活动以保持整体健康。"]
]},

{w:"appropriate",ph:"/əˈproʊpriət/",pos:"adj",cn:"合适的",stars:2,ss:[
["dialog","Do you think this outfit is <em>appropriate</em> for the campus job interview?","adj. 作表语 + for",M+" Do you think + "+OBJ+" this outfit is appropriate + prep.phrase(for the campus job interview)?","你觉得这套衣服适合校园面试吗？"],
["dialog","Is it <em>appropriate</em> to email the professor about my grade?","adj. It is appropriate to V",M+" Is it appropriate + "+PURP+" to email the professor about my grade?","给教授发邮件问成绩合适吗？"],
["dialog","The librarian said the study room isn't <em>appropriate</em> for group discussions.","adj. 否定表语",M+" The librarian said + "+OBJ+" the study room isn't appropriate + prep.phrase(for group discussions)","图书管理员说自习室不适合小组讨论。"],
["grammar","It is <em>appropriate</em> for students to address professors formally in academic settings.","adj. It is appropriate for sb to V",M+" It is appropriate + prep.phrase(for students) + "+PURP+" to address professors formally + prep.phrase(in academic settings)","在学术场合学生正式称呼教授是合适的。"],
["grammar","Choosing an <em>appropriate</em> topic is the first step in writing a research paper.","adj. 作定语修饰 topic",M+" Choosing an appropriate topic + is the first step + prep.phrase(in writing a research paper)","选择一个合适的题目是写研究论文的第一步。"],
["grammar","The committee will determine whether the proposed changes are <em>appropriate</em>.","adj. 作表语用于宾语从句",M+" The committee will determine + "+OBJ+" whether the proposed changes are appropriate","委员会将确定提议的更改是否合适。"],
["trap","The word '<em>appropriate</em>' is an adjective here, not a verb meaning 'to take'. (Trap: appropriate(adj) /əˈproʊpriət/ vs appropriate(v) /əˈproʊprieɪt/)","adj. 形容词(合适的) ≠ 动词(挪用)，发音不同",M+" This is the appropriate response","这是合适的回应。（注意与动词 appropriate 区分）"],
["trap","That behavior is not <em>appropriate</em> in a library. (Trap: 'appropriate' not 'appropriated' as adj.)","adj. appropriate（非 appropriated）作表语",M+" That behavior is not appropriate + prep.phrase(in a library)","那种行为在图书馆里是不合适的。"],
["output","It is <em>appropriate</em> for educational institutions to establish clear guidelines regarding academic integrity.","adj. It is appropriate for sb to V（正式写作）",M+" It is appropriate + prep.phrase(for educational institutions) + "+PURP+" to establish clear guidelines + prep.phrase(regarding academic integrity)","教育机构制定关于学术诚信的明确准则是合适的。"],
["output","Selecting an <em>appropriate</em> study method is crucial for maximizing learning efficiency.","adj. 作定语",M+" Selecting an appropriate study method + is crucial + "+PURP+" for maximizing learning efficiency","选择合适的学习方法对提高学习效率至关重要。"]
]},

{w:"due",ph:"/djuː/",pos:"adj",cn:"到期的",stars:1,ss:[
["dialog","When is the research paper <em>due</em>?","adj. 作表语，到期的",M+" When is the research paper due?","研究论文什么时候到期？"],
["dialog","The library books are <em>due</em> next Monday — don't forget to return them.","adj. 作表语 + 时间",M+" The library books are due + "+TIM+" next Monday — don't forget to return them","图书馆的书下周一到期——别忘了归还。"],
["dialog","I have three assignments <em>due</em> on the same day — I'm so stressed.","adj. 后置定语",M+" I have three assignments due + "+TIM+" on the same day — I'm so stressed","我有三个作业同一天到期——我压力好大。"],
["grammar","The essay is <em>due</em> by Friday, and late submissions will not be accepted.","adj. due by + 时间（截止到）",M+" The essay is due + "+TIM+" by Friday, + and late submissions will not be accepted","论文周五前交，逾期不接受。"],
["grammar","All <em>due</em> assignments must be submitted through the online portal.","adj. 作前置定语",M+" All due assignments + must be submitted + prep.phrase(through the online portal)","所有到期作业必须通过网络平台提交。"],
["grammar","The project, <em>due</em> at the end of the semester, requires extensive research.","adj. 后置定语（插入语）",M+" The project, + "+APPO+" due at the end of the semester, + requires extensive research","这个项目学期末到期，需要大量研究。"],
["trap","The homework is <em>due</em> tomorrow, not 'due to tomorrow'. (Trap: 'due' as adj. = deadline; 'due to' = because of)","adj. due(到期) ≠ due to(由于)",M+" The homework is due + "+TIM+" tomorrow","作业明天到期。（注意：due ≠ due to）"],
["trap","She didn't receive <em>due</em> credit for her contribution. (Trap: 'due' here means 'deserved', not 'deadline')","adj. due(应得的) — 另一含义",M+" She didn't receive + due credit + prep.phrase(for her contribution)","她没有因自己的贡献获得应得的认可。"],
["output","Assignments that are <em>due</em> at the end of the term often carry more weight in the final grade.","adj. 作表语用于定语从句",M+" Assignments + "+ATTR+" that are due at the end of the term + often carry more weight + prep.phrase(in the final grade)","学期末到期的作业在期末成绩中往往占更大比重。"],
["output","Meeting <em>due</em> dates consistently is a fundamental aspect of academic responsibility.","adj. 作定语修饰 dates",M+" Meeting due dates consistently + is a fundamental aspect + prep.phrase(of academic responsibility)","持续按时完成截止日期是学术责任的基本方面。"]
]},

{w:"specific",ph:"/spəˈsɪfɪk/",pos:"adj",cn:"具体的",stars:2,ss:[
["dialog","Can you be more <em>specific</em> about what the professor wants in the essay?","adj. 作表语",M+" Can you be more specific + prep.phrase(about what the professor wants in the essay)?","你能更具体地说一下教授论文想要什么吗？"],
["dialog","The advisor gave me <em>specific</em> instructions on how to register for classes.","adj. 作定语修饰 instructions",M+" The advisor gave me + specific instructions + prep.phrase(on how to register for classes)","导师给了我关于如何选课的具体指导。"],
["dialog","Is there a <em>specific</em> dining hall that serves breakfast this early?","adj. 作定语修饰 dining hall",M+" Is there a specific dining hall + "+ATTR+" that serves breakfast this early?","有哪个具体的食堂这么早供应早餐吗？"],
["grammar","The professor asked students to focus on a <em>specific</em> chapter for the exam.","adj. 作定语修饰 chapter",M+" The professor asked students + "+PURP+" to focus on a specific chapter + "+PURP+" for the exam","教授要求学生为考试集中复习一个具体章节。"],
["grammar","Each student was assigned a <em>specific</em> role in the group project.","adj. 被动语态中作定语",M+" Each student was assigned + a specific role + prep.phrase(in the group project)","每个学生在小组项目中被分配了一个具体角色。"],
["grammar","She chose that course for a <em>specific</em> reason — it aligns with her career goals.","adj. 作定语 + 破折号解释",M+" She chose that course + prep.phrase(for a specific reason) — "+CAU+" it aligns with her career goals","她选那门课有一个具体原因——它与她的职业目标一致。"],
["trap","Please provide <em>specific</em> examples, not 'specified examples'. (Trap: specific(具体的) ≠ specified(被指定的))","adj. specific(具体的) ≠ specified(被规定的)",M+" Please provide + specific examples","请提供具体例子。（注意：specific ≠ specified）"],
["trap","The rules apply to this <em>specific</em> situation only. (Trap: 'specific' not 'especial' or 'special')","adj. specific(具体的/特定的) ≠ special(特别的)",M+" The rules apply + prep.phrase(to this specific situation) + adv.(only)","这些规则只适用于这种特定情况。"],
["output","Providing <em>specific</em> examples strengthens the persuasiveness of an academic argument.","adj. 作定语",M+" Providing specific examples + strengthens + the persuasiveness of an academic argument","提供具体例子能增强学术论证的说服力。"],
["output","A well-developed essay addresses <em>specific</em> aspects of the topic rather than making vague generalizations.","adj. 作定语修饰 aspects",M+" A well-developed essay + addresses + specific aspects of the topic + "+CON+" rather than making vague generalizations","一篇优秀的文章针对题目的具体方面而非笼统概括。"]
]},

{w:"available",ph:"/əˈveɪləbl/",pos:"adj",cn:"可用的",stars:1,ss:[
["dialog","Is there a study room <em>available</em> in the library right now?","adj. 后置定语",M+" Is there a study room available + prep.phrase(in the library) + "+TIM+" right now?","图书馆现在有自习室可用吗？"],
["dialog","The professor said she's <em>available</em> during office hours if you need help.","adj. 作表语",M+" The professor said + "+OBJ+" she's available + "+TIM+" during office hours + "+COND+" if you need help","教授说如果你需要帮助她在办公时间有空。"],
["dialog","Are there any tutoring services <em>available</em> for freshman students?","adj. 后置定语",M+" Are there any tutoring services available + prep.phrase(for freshman students)?","有面向大一新生的辅导服务吗？"],
["grammar","The scholarship is <em>available</em> to all students who maintain a 3.5 GPA.","adj. available to sb",M+" The scholarship is available + prep.phrase(to all students) + "+ATTR+" who maintain a 3.5 GPA","这项奖学金面向所有保持3.5绩点的学生。"],
["grammar","Several parking spots are <em>available</em> on a first-come, first-served basis.","adj. 作表语",M+" Several parking spots are available + prep.phrase(on a first-come, first-served basis)","几个停车位先到先得。"],
["grammar","Make use of all the resources <em>available</em> to you before the exam.","adj. 后置定语 + to sb",M+" Make use of + all the resources available to you + "+TIM+" before the exam","考试前好好利用所有可用资源。"],
["trap","The room is <em>available</em>, not 'available for use to'. (Trap: available for sth / available to sb — watch preposition)","adj. available for sth / available to sb（介词搭配）",M+" The room is available + prep.phrase(for meetings)","这个房间可供会议使用。（注意介词搭配）"],
["trap","No tickets are <em>available</em> at this time. (Trap: 'available' not 'avail' — 'avail' is a verb)","adj. available(可用的) ≠ avail(v. 有用)",M+" No tickets are available + "+TIM+" at this time","目前没有可用的票。"],
["output","Making academic support services readily <em>available</em> is essential for student success.","adj. 作宾补（make sth available）",M+" Making academic support services readily available + is essential + prep.phrase(for student success)","使学术支持服务随时可用对学生成功至关重要。"],
["output","When resources are easily <em>available</em>, students are better equipped to handle academic challenges.","adj. 作表语",TIM+" When resources are easily available, + "+M+" students are better equipped to handle academic challenges","当资源容易获取时，学生更有能力应对学术挑战。"]
]},

{w:"coincidence",ph:"/koʊˈɪnsɪdəns/",pos:"n",cn:"巧合",stars:2,ss:[
["dialog","What a <em>coincidence</em> — I'm taking that class too!","n. 感叹句 What a + n.",M+" What a coincidence — I'm taking that class too!","真巧——我也在上那门课！"],
["dialog","It's no <em>coincidence</em> that we keep running into each other at the library.","n. It's no coincidence that...",M+" It's no coincidence + "+OBJ+" that we keep running into each other at the library","我们一直在图书馆碰到彼此不是巧合。"],
["dialog","By <em>coincidence</em>, my roommate and I signed up for the same study group.","n. by coincidence 作状语",M+" By coincidence, + my roommate and I signed up + prep.phrase(for the same study group)","巧合的是，我和室友报名了同一个学习小组。"],
["grammar","It was a remarkable <em>coincidence</em> that both students chose identical essay topics.","n. It was a coincidence that... 主语从句",M+" It was a remarkable coincidence + "+OBJ+" that both students chose identical essay topics","两个学生选了完全相同的论文题目，这是一个了不起的巧合。"],
["grammar","The <em>coincidence</em> of their schedules made it easy to form a study group.","n. the coincidence of sth（…的巧合）",M+" The coincidence of their schedules + made it easy + "+PURP+" to form a study group","他们时间表的巧合使得组成学习小组很容易。"],
["grammar","Whether this was a <em>coincidence</em> or a deliberate arrangement remains unclear.","n. 用于 whether...or 结构",SUBJ+" Whether this was a coincidence or a deliberate arrangement + "+M+" remains unclear","这是巧合还是刻意安排仍不清楚。"],
["trap","What a <em>coincidence</em>! (Trap: 不可数时无复数 — 此处用 a coincidence，非 'a coincident')","n. coincidence(n.) ≠ coincident(adj.)",M+" What a coincidence!","真巧！（注意：coincidence 是名词，非形容词 coincident）"],
["trap","It's just a <em>coincidence</em> — don't read too much into it. (Trap: 'coincidence' not 'coincidental' as noun)","n. coincidence(n.) ≠ coincidental(adj.)",M+" It's just a coincidence — don't read too much into it","这只是巧合——别过度解读。"],
["output","It is not merely a <em>coincidence</em> that students who participate actively tend to achieve better results.","n. It is not merely a coincidence that...",M+" It is not merely a coincidence + "+OBJ+" that students who participate actively tend to achieve better results","积极参与的学生往往取得更好的成绩，这绝非巧合。"],
["output","The <em>coincidence</em> between high attendance rates and strong academic performance suggests a causal relationship.","n. the coincidence between A and B",M+" The coincidence between high attendance rates and strong academic performance + suggests + a causal relationship","高出勤率与优异学业表现之间的吻合暗示了因果关系。"]
]},

// ---- Words 23–42 (prepositions, adverbs, nouns) ----

{w:"for",ph:"/fɔːr/",pos:"prep",cn:"为了;对于",stars:1,ss:[
["dialog","I'm buying a gift <em>for</em> my roommate's birthday.","prep. 表示对象/目的",M+" I'm buying a gift + "+PURP+" for my roommate's birthday","我在为室友的生日买礼物。"],
["dialog","Is this textbook <em>for</em> the psychology lecture?","prep. 表示用途/所属",M+" Is this textbook + "+PURP+" for the psychology lecture?","这本教科书是心理学讲座用的吗？"],
["dialog","I signed up <em>for</em> the volunteer workshop on Saturday.","prep. 表示目标活动",M+" I signed up + "+PURP+" for the volunteer workshop + "+TIM+" on Saturday","我报名了周六的志愿者研讨会。"],
["grammar","The deadline <em>for</em> the assignment is next Friday.","prep. 表示所属/关联",M+" The deadline + "+ATTR+" for the assignment + is next Friday","作业的截止日期是下周五。"],
["grammar","She has been studying <em>for</em> three hours in the library.","prep. 表示持续时间（for + 时间段）",M+" She has been studying + "+TIM+" for three hours + in the library","她在图书馆学习了三个小时。"],
["grammar","This scholarship is specifically <em>for</em> students who volunteer regularly.","prep. 表示对象",M+" This scholarship is specifically + "+PURP+" for students + "+ATTR+" who volunteer regularly","这项奖学金专门面向定期做志愿的学生。"],
["trap","I have lived on campus <em>for</em> two semesters. (Note: 'since' is a distractor — since requires a point in time, not a duration)","prep. for + 时间段（非 since）",M+" I have lived on campus + "+TIM+" for two semesters","我在校园住了两个学期。（注意：since是干扰词）"],
["trap","She thanked him <em>for</em> helping with the presentation. (Note: 'to help' is a distractor — thank sb for doing)","prep. thank sb for doing（非 to do）",M+" She thanked him + "+CAU+" for helping with the presentation","她感谢他帮忙做演讲。（注意：to help是干扰词）"],
["output","<em>For</em> many students, balancing academics and volunteering is a significant challenge.","prep. 表示对象（句首状语）",PURP+" For many students, + "+M+" balancing academics and volunteering is a significant challenge","对于许多学生来说，平衡学业和志愿活动是一个重大挑战。"],
["output","Time management skills are essential <em>for</em> meeting deadlines and maintaining good grades.","prep. 表示目的",M+" Time management skills are essential + "+PURP+" for meeting deadlines and maintaining good grades","时间管理技能对于按时完成作业和保持好成绩至关重要。"]
]},

{w:"from",ph:"/frʌm/",pos:"prep",cn:"从;来自",stars:1,ss:[
["dialog","I just got back <em>from</em> the lecture hall.","prep. 表示来源/起点",M+" I just got back + from the lecture hall","我刚从报告厅回来。"],
["dialog","Where are you <em>from</em>? I noticed your accent.","prep. 表示出身/来源",M+" Where are you from?","你从哪里来？我注意到了你的口音。"],
["dialog","The email <em>from</em> the professor says the deadline has changed.","prep. 表示来源（后置定语）",M+" The email + "+ATTR+" from the professor + says + "+OBJ+" the deadline has changed","教授发的邮件说截止日期变了。"],
["grammar","The bookstore is across <em>from</em> the main campus building.","prep. 构成复合介词 across from",M+" The bookstore is + across from the main campus building","书店在主校区大楼对面。"],
["grammar","Students <em>from</em> different departments gathered for the workshop.","prep. 表示来源（后置定语）",M+" Students + "+ATTR+" from different departments + gathered + "+PURP+" for the workshop","来自不同院系的学生聚集参加研讨会。"],
["grammar","I borrowed these notes <em>from</em> a classmate who attended the lecture.","prep. 表示来源",M+" I borrowed these notes + from a classmate + "+ATTR+" who attended the lecture","我从一个参加了讲座的同学那里借了这些笔记。"],
["trap","She has been absent <em>from</em> class since Monday. (Note: 'of' is a distractor — absent from, not absent of)","prep. absent from（非 absent of）",M+" She has been absent + from class + "+TIM+" since Monday","她从周一起就没来上课。（注意：of是干扰词）"],
["trap","The campus is only ten minutes <em>from</em> the grocery store. (Note: 'to' is a distractor — distance from A, not to A in this pattern)","prep. 表示距离起点",M+" The campus is only ten minutes + from the grocery store","校园离杂货店只有十分钟。（注意：to是干扰词）"],
["output","<em>From</em> my perspective, required volunteering helps students develop empathy.","prep. 表示角度/立场（句首状语）",M+" From my perspective, + "+M+" required volunteering helps students develop empathy","从我的角度来看，强制志愿服务帮助学生培养同理心。"],
["output","Drawing <em>from</em> personal experience, working with a roommate on assignments improves collaboration skills.","prep. 表示来源",PART+" Drawing from personal experience, + "+M+" working with a roommate on assignments improves collaboration skills","根据个人经验，和室友一起做作业能提高合作能力。"]
]},

{w:"with",ph:"/wɪð/",pos:"prep",cn:"和;用",stars:1,ss:[
["dialog","Do you want to study <em>with</em> me at the library tonight?","prep. 表示伴随",M+" Do you want to study + with me + "+TIM+" at the library tonight?","你今晚想和我一起在图书馆学习吗？"],
["dialog","I share the apartment <em>with</em> two roommates.","prep. 表示伴随对象",M+" I share the apartment + with two roommates","我和两个室友合住公寓。"],
["dialog","I'm having trouble <em>with</em> this assignment — can you help?","prep. 表示相关事物",M+" I'm having trouble + with this assignment","我这个作业遇到困难了——你能帮忙吗？"],
["grammar","The student <em>with</em> the red backpack is my roommate.","prep. 作后置定语修饰名词",M+" The student + "+ATTR+" with the red backpack + is my roommate","背红色书包的那个学生是我室友。"],
["grammar","She finished the presentation <em>with</em> confidence and received great feedback.","prep. 表示方式",M+" She finished the presentation + with confidence + and received great feedback","她自信地完成了演讲并获得了很好的反馈。"],
["grammar","<em>With</em> the deadline approaching, we need to work faster.","prep. with + n. + doing（独立主格结构）",PART+" With the deadline approaching, + "+M+" we need to work faster","随着截止日期临近，我们需要加快速度。"],
["trap","I agree <em>with</em> the professor's point about campus safety. (Note: 'to' is a distractor — agree with sb/sth, not agree to sb)","prep. agree with（非 agree to + 人）",M+" I agree + with the professor's point + "+ATTR+" about campus safety","我同意教授关于校园安全的观点。（注意：to是干扰词）"],
["trap","She is satisfied <em>with</em> her semester grades. (Note: 'of' is a distractor — satisfied with, not satisfied of)","prep. satisfied with（非 satisfied of）",M+" She is satisfied + with her semester grades","她对这学期的成绩很满意。（注意：of是干扰词）"],
["output","Students who engage <em>with</em> their community through volunteering develop stronger interpersonal skills.","prep. 表示互动对象",M+" Students + "+ATTR+" who engage with their community through volunteering + develop stronger interpersonal skills","通过志愿服务参与社区的学生会发展更强的人际技能。"],
["output","<em>With</em> proper time management, it is possible to balance coursework <em>with</em> extracurricular activities.","prep. with表示条件/伴随",COND+" With proper time management, + "+M+" it is possible to balance coursework with extracurricular activities","通过合理的时间管理，平衡课程作业和课外活动是可能的。"]
]},

{w:"about",ph:"/əˈbaʊt/",pos:"prep",cn:"关于;大约",stars:1,ss:[
["dialog","What is the lecture <em>about</em> today?","prep. 表示关于",M+" What is the lecture + about + today?","今天的讲座是关于什么的？"],
["dialog","I'm worried <em>about</em> the presentation tomorrow.","prep. 表示担忧对象",M+" I'm worried + about the presentation tomorrow","我担心明天的演讲。"],
["dialog","It takes <em>about</em> fifteen minutes to walk across campus.","adv. 表示大约",M+" It takes + about fifteen minutes + "+PURP+" to walk across campus","走过校园大约需要十五分钟。"],
["grammar","The workshop is <em>about</em> developing effective study habits.","prep. 表示主题",M+" The workshop is + about developing effective study habits","研讨会是关于培养有效的学习习惯。"],
["grammar","She is passionate <em>about</em> volunteering at the local shelter.","prep. passionate about（固定搭配）",M+" She is passionate + about volunteering + at the local shelter","她热衷于在当地庇护所做志愿服务。"],
["grammar","There are <em>about</em> thirty students in each lecture section.","adv. 表示大约数量",M+" There are about thirty students + in each lecture section","每个讲座班大约有三十名学生。"],
["trap","I want to talk <em>about</em> changing my assignment topic. (Note: 'of' is a distractor — talk about, not talk of in spoken English)","prep. talk about（非 talk of）",M+" I want to talk + about changing my assignment topic","我想谈谈换作业主题的事。（注意：of是干扰词）"],
["trap","How <em>about</em> we go to the grocery store after class? (Note: 'What about + V-ing' vs 'How about + clause' — mixing them is a common trap)","prep. How about + 从句（提建议）",M+" How about + "+OBJ+" we go to the grocery store + "+TIM+" after class?","下课后我们去杂货店怎么样？"],
["output","This essay is <em>about</em> the advantages of mandatory volunteer programs on campus.","prep. 表示主题",M+" This essay is + about the advantages + "+ATTR+" of mandatory volunteer programs on campus","这篇文章是关于校园强制志愿计划的优势。"],
["output","There is growing concern <em>about</em> whether students have enough time to meet all their deadlines.","prep. 表示关注对象",M+" There is growing concern + about + "+OBJ+" whether students have enough time to meet all their deadlines","人们越来越担忧学生是否有足够时间完成所有截止日期。"]
]},

{w:"during",ph:"/ˈdjʊərɪŋ/",pos:"prep",cn:"在...期间",stars:2,ss:[
["dialog","Did anything interesting happen <em>during</em> the lecture today?","prep. 表示在…期间",M+" Did anything interesting happen + "+TIM+" during the lecture today?","今天讲座期间发生了什么有趣的事吗？"],
["dialog","I usually grab groceries <em>during</em> the weekend.","prep. 表示在…期间",M+" I usually grab groceries + "+TIM+" during the weekend","我通常在周末买杂货。"],
["dialog","My roommate always plays music <em>during</em> my study time.","prep. 表示在…期间",M+" My roommate always plays music + "+TIM+" during my study time","我室友总是在我学习时间放音乐。"],
["grammar","Students are expected to remain silent <em>during</em> the presentation.","prep. 表示在…期间",M+" Students are expected to remain silent + "+TIM+" during the presentation","学生在演讲期间应保持安静。"],
["grammar","<em>During</em> the semester, each student must complete two volunteer assignments.","prep. 表示在…期间（句首状语）",TIM+" During the semester, + "+M+" each student must complete two volunteer assignments","学期期间，每个学生必须完成两项志愿作业。"],
["grammar","The campus bookstore offers discounts <em>during</em> the first week of each semester.","prep. 表示特定时间段",M+" The campus bookstore offers discounts + "+TIM+" during the first week of each semester","校园书店在每学期第一周提供折扣。"],
["trap","<em>During</em> I was walking to class, it started to rain. (Note: should be 'While' — during + noun, not during + clause)","prep. during + 名词（非 during + 从句，应改为 while）",TIM+" During + NOUN (not clause) — use While instead","在我走去上课时，开始下雨了。（注意：during后不能接从句）"],
["trap","She fell asleep <em>during</em> the workshop. (Note: 'while' could be a distractor — during + noun vs while + clause)","prep. during + 名词（非 while + 从句）",M+" She fell asleep + "+TIM+" during the workshop","她在研讨会期间睡着了。（注意：while是干扰词）"],
["output","<em>During</em> the first semester, new students often struggle to manage their assignments and social life.","prep. 句首时间状语",TIM+" During the first semester, + "+M+" new students often struggle to manage their assignments and social life","在第一学期，新生经常难以兼顾作业和社交生活。"],
["output","Volunteering <em>during</em> college provides valuable experience that cannot be gained from lectures alone.","prep. 表示在…期间",M+" Volunteering + "+TIM+" during college + provides valuable experience + "+ATTR+" that cannot be gained from lectures alone","大学期间做志愿提供的宝贵经验是仅靠课程无法获得的。"]
]},

{w:"instead of",ph:"/ɪnˈsted ʌv/",pos:"prep",cn:"而不是",stars:2,ss:[
["dialog","I'm taking an online course <em>instead of</em> attending the lecture in person.","prep. 表示替代",M+" I'm taking an online course + instead of attending the lecture in person","我在上网课而不是亲自去听讲座。"],
["dialog","Let's meet at the café <em>instead of</em> the library today.","prep. 表示替代",M+" Let's meet at the café + instead of the library + "+TIM+" today","我们今天在咖啡馆见面而不是图书馆吧。"],
["dialog","My roommate bought snacks <em>instead of</em> groceries again!","prep. 表示替代",M+" My roommate bought snacks + instead of groceries + again","我室友又买零食而不是日用品了！"],
["grammar","<em>Instead of</em> complaining about the deadline, she started working immediately.","prep. 句首状语（instead of + V-ing）",CON+" Instead of complaining about the deadline, + "+M+" she started working immediately","她没有抱怨截止日期，而是立刻开始工作。"],
["grammar","He chose to volunteer at the hospital <em>instead of</em> the campus bookstore.","prep. 表示替代",M+" He chose to volunteer at the hospital + instead of the campus bookstore","他选择在医院而不是校园书店做志愿。"],
["grammar","The professor assigned a group project <em>instead of</em> an individual assignment.","prep. 表示替代",M+" The professor assigned a group project + instead of an individual assignment","教授布置了小组项目而不是个人作业。"],
["trap","She decided to rest <em>instead of</em> studying for the exam. (Note: 'instead to study' is a distractor — instead of + V-ing, not instead + to V)","prep. instead of + V-ing（非 instead + to V）",M+" She decided to rest + instead of studying + "+PURP+" for the exam","她决定休息而不是复习考试。（注意：instead to study是干扰词）"],
["trap","He went to the workshop <em>instead of</em> his roommate. (Note: ambiguous — could mean 'replacing his roommate' or 'not to his roommate's place')","prep. instead of + 名词（表示替代某人）",M+" He went to the workshop + instead of his roommate","他代替室友去了研讨会。"],
["output","<em>Instead of</em> relying solely on lectures, students should actively participate in workshops and discussions.","prep. 句首让步/对比状语",CON+" Instead of relying solely on lectures, + "+M+" students should actively participate in workshops and discussions","学生不应只依赖讲座，而应积极参加研讨会和讨论。"],
["output","Universities should encourage voluntary service <em>instead of</em> making it a mandatory requirement.","prep. 表示替代",M+" Universities should encourage voluntary service + instead of making it a mandatory requirement","大学应鼓励自愿服务，而不是将其作为强制要求。"]
]},

{w:"across from",ph:"/əˈkrɒs frʌm/",pos:"prep",cn:"在...对面",stars:2,ss:[
["dialog","The dining hall is <em>across from</em> the main library.","prep. 表示在…对面",M+" The dining hall is + across from the main library","食堂在主图书馆对面。"],
["dialog","I'll wait for you <em>across from</em> the campus bookstore.","prep. 表示在…对面",M+" I'll wait for you + across from the campus bookstore","我在校园书店对面等你。"],
["dialog","There's a great coffee shop <em>across from</em> the lecture hall.","prep. 表示在…对面",M+" There's a great coffee shop + across from the lecture hall","报告厅对面有一家很好的咖啡店。"],
["grammar","The new workshop space is located <em>across from</em> the student center.","prep. 表示位置（正对面）",M+" The new workshop space is located + across from the student center","新的研讨会场地在学生活动中心对面。"],
["grammar","The building <em>across from</em> the gym houses the volunteer coordination office.","prep. 作后置定语",M+" The building + "+ATTR+" across from the gym + houses the volunteer coordination office","体育馆对面的大楼是志愿者协调办公室。"],
["grammar","She sat <em>across from</em> her roommate during the presentation.","prep. 表示面对面的位置",M+" She sat + across from her roommate + "+TIM+" during the presentation","演讲期间她坐在室友对面。"],
["trap","The store is <em>across from</em> the bus stop. (Note: 'across of' is a distractor — across from, not across of)","prep. across from（非 across of）",M+" The store is + across from the bus stop","商店在公交站对面。（注意：across of是干扰词）"],
["trap","My apartment is right <em>across from</em> campus. (Note: 'opposite to' may be a distractor — across from is more natural in American English)","prep. across from（美式英语更自然）",M+" My apartment is right + across from campus","我的公寓就在校园正对面。"],
["output","The new dormitory, located <em>across from</em> the science building, offers modern facilities for students.","prep. 作插入定语",M+" The new dormitory, + "+PART+" located across from the science building, + offers modern facilities for students","位于理科大楼对面的新宿舍为学生提供现代化设施。"],
["output","Having essential services <em>across from</em> residential areas makes campus life more convenient for students.","prep. 表示位置关系",M+" Having essential services + across from residential areas + makes campus life more convenient + "+PURP+" for students","在住宅区对面设置基本服务设施使校园生活对学生更加便利。"]
]},

{w:"however",ph:"/haʊˈevər/",pos:"adv",cn:"然而",stars:1,ss:[
["dialog","I wanted to attend the workshop. <em>However</em>, it was already full.","adv. 表示转折",M+" I wanted to attend the workshop. + "+CON+" However, + "+M+" it was already full","我想参加研讨会。然而，已经满了。"],
["dialog","The assignment looks easy. <em>However</em>, it actually requires a lot of research.","adv. 表示转折",M+" The assignment looks easy. + "+CON+" However, + "+M+" it actually requires a lot of research","作业看起来简单。然而，实际上需要大量研究。"],
["dialog","My roommate is usually quiet; <em>however</em>, during exams she gets really stressed.","adv. 表示转折（分号连接）",M+" My roommate is usually quiet; + "+CON+" however, + "+M+" during exams she gets really stressed","我室友通常很安静；然而，考试期间她会非常紧张。"],
["grammar","The lecture was informative; <em>however</em>, many students found it too long.","adv. 连接两个独立分句（分号 + however + 逗号）",M+" The lecture was informative; + "+CON+" however, + "+M+" many students found it too long","讲座内容丰富；然而，很多学生觉得太长了。"],
["grammar","Volunteering is rewarding. <em>However</em>, it can be time-consuming during a busy semester.","adv. 句首转折副词（句号隔开）",M+" Volunteering is rewarding. + "+CON+" However, + "+M+" it can be time-consuming + "+TIM+" during a busy semester","志愿活动很有意义。然而，在繁忙的学期中可能很耗时。"],
["grammar","The campus café is convenient; <em>however</em>, the prices are higher than the grocery store.","adv. 连接对比信息",M+" The campus café is convenient; + "+CON+" however, + "+M+" the prices are higher than the grocery store","校园咖啡馆很方便；然而，价格比杂货店贵。"],
["trap","<em>However</em> the deadline was extended, many students had already submitted. (Note: need a comma or semicolon separation — cannot join two clauses directly)","adv. however不能直接连接两个句子（需标点隔开）",CON+" However + PUNCTUATION needed + "+M+" ...","虽然截止日期延长了，但很多学生已经提交了。（注意：需要标点分隔）"],
["trap","She studied hard; <em>however</em>, she didn't pass. (Note: 'but' cannot replace however with semicolon structure — but uses comma, however uses semicolon)","adv. however用分号（but用逗号连接）",M+" She studied hard; + "+CON+" however, + "+M+" she didn't pass","她努力学习了；然而，她没有通过。"],
["output","Many students prefer group projects. <em>However</em>, individual assignments allow for deeper personal reflection.","adv. 学术写作中表示对比转折",M+" Many students prefer group projects. + "+CON+" However, + "+M+" individual assignments allow for deeper personal reflection","许多学生喜欢小组项目。然而，个人作业允许更深入的个人反思。"],
["output","Mandatory volunteering may build community spirit; <em>however</em>, it risks undermining genuine altruism.","adv. 表达对立观点",M+" Mandatory volunteering may build community spirit; + "+CON+" however, + "+M+" it risks undermining genuine altruism","强制志愿可能培养社区精神；然而，它可能损害真正的利他主义。"]
]},

{w:"actually",ph:"/ˈæktʃuəli/",pos:"adv",cn:"实际上",stars:1,ss:[
["dialog","I <em>actually</em> enjoy the Monday morning lectures.","adv. 表示出乎意料",M+" I actually enjoy + the Monday morning lectures","我其实挺喜欢周一早上的讲座的。"],
["dialog","<em>Actually</em>, the assignment is due tomorrow, not Friday.","adv. 纠正信息（句首）",M+" Actually, + "+M+" the assignment is due tomorrow, not Friday","实际上，作业明天交，不是周五。"],
["dialog","My roommate is <em>actually</em> really good at cooking — she makes groceries last all week.","adv. 表示意外事实",M+" My roommate is actually really good at cooking","我室友其实很擅长做饭——她能让杂货撑一整周。"],
["grammar","The workshop was <em>actually</em> more useful than I expected.","adv. 修饰形容词比较级（置于比较结构前）",M+" The workshop was actually more useful + than I expected","研讨会实际上比我预期的更有用。"],
["grammar","What she <em>actually</em> meant was that the presentation needed more data.","adv. 修饰动词（强调真实意图）",SUBJ+" What she actually meant + "+M+" was + "+OBJ+" that the presentation needed more data","她实际上的意思是演讲需要更多数据。"],
["grammar","He didn't <em>actually</em> volunteer — he was assigned to the project.","adv. 否定句中表示事实纠正",M+" He didn't actually volunteer — he was assigned to the project","他实际上不是志愿的——他是被分配到这个项目的。"],
["trap","<em>Actually</em>, I have <em>already</em> finished the assignment. (Note: 'actual' is a distractor — actually is the adverb, not actual)","adv. actually（非形容词 actual）",M+" Actually, + "+M+" I have already finished the assignment","实际上，我已经完成作业了。（注意：actual是干扰词）"],
["trap","The deadline is <em>actually</em> next week, not this week. (Note: position of actually — it should come before the key information being corrected)","adv. actually置于被纠正信息前",M+" The deadline is actually next week, not this week","截止日期实际上是下周，不是这周。"],
["output","While many assume online lectures are less effective, they <em>actually</em> offer greater flexibility for students.","adv. 表示与假设相反的事实",CON+" While many assume online lectures are less effective, + "+M+" they actually offer greater flexibility for students","虽然许多人认为在线讲座效果差，但它们实际上为学生提供了更大的灵活性。"],
["output","Volunteering <em>actually</em> strengthens academic performance by teaching students discipline and responsibility.","adv. 强调意外因果关系",M+" Volunteering actually strengthens academic performance + by teaching students discipline and responsibility","志愿服务实际上通过教会学生纪律和责任来提高学业表现。"]
]},

{w:"already",ph:"/ɔːlˈredi/",pos:"adv",cn:"已经",stars:1,ss:[
["dialog","I've <em>already</em> submitted my assignment online.","adv. 表示已经完成（现在完成时）",M+" I've already submitted + my assignment online","我已经在线提交了作业。"],
["dialog","Have you <em>already</em> signed up for the volunteer event?","adv. 用于疑问句表示惊讶",M+" Have you already signed up + "+PURP+" for the volunteer event?","你已经报名志愿活动了吗？"],
["dialog","My roommate has <em>already</em> bought the groceries for this week.","adv. 表示提前完成",M+" My roommate has already bought + the groceries + "+TIM+" for this week","我室友已经买好了这周的杂货。"],
["grammar","By the time the lecture started, half the seats were <em>already</em> taken.","adv. 与过去完成时/过去时搭配",TIM+" By the time the lecture started, + "+M+" half the seats were already taken","讲座开始时，一半的座位已经被占了。"],
["grammar","She had <em>already</em> completed the presentation before the deadline.","adv. 与过去完成时搭配（表示更早完成）",M+" She had already completed the presentation + "+TIM+" before the deadline","她在截止日期前就已经完成了演讲。"],
["grammar","The workshop spots are <em>already</em> filled — you should have registered earlier.","adv. 表示已然状态",M+" The workshop spots are already filled — you should have registered earlier","研讨会名额已经满了——你应该早点报名。"],
["trap","I <em>already</em> have eaten lunch. (Note: already goes between have and past participle — 'I have already eaten' is standard)","adv. already的位置（应在have与过去分词之间）",M+" I have already eaten lunch (not: I already have eaten)","我已经吃过午饭了。（注意：already应放在have和eaten之间）"],
["trap","She <em>already</em> finished the semester project. (Note: in formal usage, prefer 'has already finished' with present perfect)","adv. 正式用法中搭配现在完成时",M+" She has already finished the semester project (prefer present perfect)","她已经完成了学期项目。（注意：正式用法中搭配现在完成时）"],
["output","Many universities have <em>already</em> implemented mandatory volunteer programs with positive results.","adv. 现在完成时强调已完成动作",M+" Many universities have already implemented mandatory volunteer programs + with positive results","许多大学已经实施了强制志愿计划并取得了积极成果。"],
["output","Students who have <em>already</em> participated in community service often report higher levels of personal satisfaction.","adv. 定语从句中的完成时",M+" Students + "+ATTR+" who have already participated in community service + often report higher levels of personal satisfaction","已经参加过社区服务的学生通常报告更高的个人满足感。"]
]},

{w:"roommate",ph:"/ˈruːmmeɪt/",pos:"n",cn:"室友",stars:1,ss:[
["dialog","My <em>roommate</em> and I are going to buy groceries after class.","n. 作主语（并列）",M+" My roommate and I + are going to buy groceries + "+TIM+" after class","我和室友打算下课后去买杂货。"],
["dialog","Have you met your new <em>roommate</em> yet?","n. 作宾语",M+" Have you met + your new roommate + yet?","你见过你的新室友了吗？"],
["dialog","My <em>roommate</em> is actually from the same hometown as me.","n. 作主语",M+" My roommate + is actually from the same hometown as me","我室友其实和我来自同一个城市。"],
["grammar","My <em>roommate</em>, who is a volunteer at the hospital, inspired me to join.","n. 作主语 + 非限制性定语从句",M+" My roommate, + "+ATTR+" who is a volunteer at the hospital, + inspired me to join","我室友是医院的志愿者，她激励我加入。"],
["grammar","Living with a <em>roommate</em> requires patience and good communication skills.","n. 作介词宾语（动名词短语作主语）",M+" Living with a roommate + requires patience and good communication skills","和室友一起住需要耐心和良好的沟通能力。"],
["grammar","The <em>roommate</em> agreement we signed covers quiet hours and shared groceries.","n. 作定语修饰 agreement",M+" The roommate agreement + "+ATTR+" we signed + covers quiet hours and shared groceries","我们签的室友协议涵盖了安静时间和共享杂货。"],
["trap","Each <em>roommate</em> have their own shelf in the kitchen. (Note: 'have' is a distractor — each + singular noun takes singular verb 'has')","n. each + 单数名词 + 单数动词（has而非have）",M+" Each roommate has (not have) + their own shelf + in the kitchen","每个室友在厨房有自己的架子。（注意：each后用单数动词has）"],
["trap","Me and my <em>roommate</em> went to the campus event. (Note: should be 'My roommate and I' as subject)","n. 主语位置用 My roommate and I（非 Me and my roommate）",M+" My roommate and I (not Me and my roommate) + went to the campus event","我和室友去了校园活动。（注意：主语应为My roommate and I）"],
["output","A compatible <em>roommate</em> can significantly enhance one's college experience by providing emotional support.","n. 作主语",M+" A compatible roommate + can significantly enhance one's college experience + by providing emotional support","一个合得来的室友能通过提供情感支持大大提升大学体验。"],
["output","Learning to resolve conflicts with a <em>roommate</em> prepares students for future professional relationships.","n. 作介词宾语",M+" Learning to resolve conflicts with a roommate + prepares students + "+PURP+" for future professional relationships","学会与室友解决冲突为学生未来的职业关系做好准备。"]
]},

{w:"lecture",ph:"/ˈlektʃər/",pos:"n",cn:"讲座;课程",stars:1,ss:[
["dialog","Are you going to Professor Smith's <em>lecture</em> this afternoon?","n. 作介词宾语",M+" Are you going to + Professor Smith's lecture + "+TIM+" this afternoon?","你今天下午去史密斯教授的讲座吗？"],
["dialog","I missed the <em>lecture</em> yesterday — can I borrow your notes?","n. 作宾语",M+" I missed the lecture + "+TIM+" yesterday","我昨天错过了讲座——我能借你的笔记吗？"],
["dialog","The <em>lecture</em> was about three hours long — I could barely stay awake.","n. 作主语",M+" The lecture + was about three hours long","讲座大约三个小时长——我几乎撑不住。"],
["grammar","The <em>lecture</em> that Professor Johnson gave on campus safety was very informative.","n. 作主语 + 定语从句修饰",M+" The lecture + "+ATTR+" that Professor Johnson gave on campus safety + was very informative","约翰逊教授关于校园安全的讲座非常有信息量。"],
["grammar","Attending <em>lectures</em> regularly is one of the best ways to prepare for exams.","n. 动名词短语中作宾语",M+" Attending lectures regularly + is one of the best ways + "+PURP+" to prepare for exams","定期参加讲座是备考的最佳方式之一。"],
["grammar","During the <em>lecture</em>, the professor mentioned that the assignment deadline had been extended.","n. 作介词宾语（时间状语）",TIM+" During the lecture, + "+M+" the professor mentioned + "+OBJ+" that the assignment deadline had been extended","讲座期间，教授提到作业截止日期延长了。"],
["trap","I have a <em>lecture</em> in Monday. (Note: 'in' is a distractor — use 'on' with days: on Monday)","n. 搭配介词 on（星期几用on，非in）",M+" I have a lecture + "+TIM+" on Monday (not in Monday)","我周一有一节讲座。（注意：星期几用on）"],
["trap","The <em>lecture</em> was too bored for most students. (Note: 'bored' is a distractor — use 'boring' for things, 'bored' for people)","n. boring修饰物（非bored修饰物）",M+" The lecture was too boring (not bored) + "+PURP+" for most students","这个讲座对大多数学生来说太无聊了。（注意：boring修饰物）"],
["output","Interactive <em>lectures</em> that incorporate group discussions tend to produce better learning outcomes.","n. 作主语（复数）",M+" Interactive lectures + "+ATTR+" that incorporate group discussions + tend to produce better learning outcomes","融入小组讨论的互动讲座往往能产生更好的学习效果。"],
["output","While <em>lectures</em> provide theoretical knowledge, workshops offer hands-on experience that deepens understanding.","n. 作主语（对比论述）",CON+" While lectures provide theoretical knowledge, + "+M+" workshops offer hands-on experience + "+ATTR+" that deepens understanding","虽然讲座提供理论知识，但研讨会提供加深理解的实践经验。"]
]},

{w:"assignment",ph:"/əˈsaɪnmənt/",pos:"n",cn:"作业;任务",stars:1,ss:[
["dialog","Have you started the history <em>assignment</em> yet?","n. 作宾语",M+" Have you started + the history assignment + yet?","你开始写历史作业了吗？"],
["dialog","This <em>assignment</em> is worth 30% of our final grade.","n. 作主语",M+" This assignment + is worth 30% of our final grade","这项作业占期末成绩的30%。"],
["dialog","I need to finish the <em>assignment</em> before the deadline tomorrow.","n. 作宾语",M+" I need to finish + the assignment + "+TIM+" before the deadline tomorrow","我需要在明天截止日期前完成作业。"],
["grammar","The <em>assignment</em> that the professor gave us requires extensive research.","n. 作主语 + 定语从句",M+" The assignment + "+ATTR+" that the professor gave us + requires extensive research","教授布置的作业需要大量研究。"],
["grammar","Completing <em>assignments</em> on time is a skill every student must develop.","n. 动名词短语中作宾语",M+" Completing assignments on time + is a skill + "+ATTR+" every student must develop","按时完成作业是每个学生必须培养的技能。"],
["grammar","She was given an <em>assignment</em> to volunteer at the campus health center.","n. 被动语态中作宾语 + 不定式后置定语",M+" She was given an assignment + "+PURP+" to volunteer at the campus health center","她被分配了一项在校园健康中心做志愿的任务。"],
["trap","I have many <em>assignments</em> to do this weekend. (Note: 'much' is a distractor — assignments is countable, use many, not much)","n. 可数名词用 many（非 much）",M+" I have many (not much) assignments + "+PURP+" to do + "+TIM+" this weekend","这周末我有很多作业要做。（注意：用many不用much）"],
["trap","The professor gave us a lot of <em>assignment</em>. (Note: should be 'assignments' — a lot of + plural countable noun)","n. a lot of + 可数名词复数（assignments）",M+" The professor gave us + a lot of assignments (not assignment)","教授给了我们很多作业。（注意：应用复数assignments）"],
["output","Well-designed <em>assignments</em> encourage critical thinking and help students apply knowledge from lectures.","n. 作主语",M+" Well-designed assignments + encourage critical thinking + and help students apply knowledge from lectures","设计良好的作业鼓励批判性思维并帮助学生运用讲座知识。"],
["output","Group <em>assignments</em> teach collaboration skills; however, they can be challenging when teammates have different schedules.","n. 作主语（复合句）",M+" Group assignments teach collaboration skills; + "+CON+" however, + "+M+" they can be challenging + "+COND+" when teammates have different schedules","小组作业培养合作技能；然而，当队友日程不同时可能很有挑战。"]
]},

{w:"presentation",ph:"/ˌprezənˈteɪʃn/",pos:"n",cn:"演讲;报告",stars:1,ss:[
["dialog","I'm so nervous about my <em>presentation</em> tomorrow.","n. 作介词宾语",M+" I'm so nervous + about my presentation + "+TIM+" tomorrow","我对明天的演讲非常紧张。"],
["dialog","How did your group <em>presentation</em> go?","n. 作主语",M+" How did your group presentation go?","你们的小组演讲怎么样？"],
["dialog","My roommate helped me practice my <em>presentation</em> last night.","n. 作宾语",M+" My roommate helped me practice + my presentation + "+TIM+" last night","我室友昨晚帮我练习了演讲。"],
["grammar","The <em>presentation</em> she delivered during the workshop was impressive.","n. 作主语 + 定语从句",M+" The presentation + "+ATTR+" she delivered during the workshop + was impressive","她在研讨会上做的演讲令人印象深刻。"],
["grammar","Giving a <em>presentation</em> in front of the class builds confidence and public speaking skills.","n. 动名词短语中作宾语",M+" Giving a presentation + in front of the class + builds confidence and public speaking skills","在全班面前做演讲可以建立自信和公众演讲技能。"],
["grammar","His <em>presentation</em> on volunteer programs, which lasted about thirty minutes, received positive feedback.","n. 作主语 + 非限制性定语从句",M+" His presentation + "+ATTR+" on volunteer programs, + "+ATTR+" which lasted about thirty minutes, + received positive feedback","他关于志愿项目的演讲持续了大约三十分钟，获得了积极反馈。"],
["trap","She made a really good <em>presentation</em> about campus life. (Note: 'did' is a distractor — make/give a presentation, not do a presentation)","n. make/give a presentation（非 do a presentation）",M+" She made (not did) a really good presentation + about campus life","她做了一场关于校园生活的精彩演讲。（注意：用make/give，非do）"],
["trap","The <em>presentations</em> is scheduled for Friday. (Note: 'is' is a distractor — presentations is plural, needs 'are')","n. 复数主语用 are（非 is）",M+" The presentations are (not is) scheduled + "+TIM+" for Friday","演讲安排在周五。（注意：复数主语用are）"],
["output","Effective <em>presentations</em> require thorough preparation, clear structure, and confident delivery.","n. 作主语",M+" Effective presentations + require thorough preparation, clear structure, and confident delivery","有效的演讲需要充分的准备、清晰的结构和自信的表达。"],
["output","Through <em>presentations</em>, students develop essential communication skills that benefit them beyond the academic semester.","n. 作介词宾语（句首状语）",M+" Through presentations, + "+M+" students develop essential communication skills + "+ATTR+" that benefit them beyond the academic semester","通过演讲，学生发展出超越学期的基本沟通技能。"]
]},

{w:"campus",ph:"/ˈkæmpəs/",pos:"n",cn:"校园",stars:1,ss:[
["dialog","Is there a good place to eat on <em>campus</em>?","n. 作介词宾语",M+" Is there a good place to eat + on campus?","校园里有好吃的地方吗？"],
["dialog","I love walking around <em>campus</em> in the fall — the trees are beautiful.","n. 作介词宾语",M+" I love walking around campus + "+TIM+" in the fall","我喜欢秋天在校园里散步——树很美。"],
["dialog","The volunteer center is on the east side of <em>campus</em>.","n. 作介词宾语（方位）",M+" The volunteer center is + on the east side of campus","志愿者中心在校园东边。"],
["grammar","Many students who live off <em>campus</em> still spend most of their time there.","n. off campus 作后置定语",M+" Many students + "+ATTR+" who live off campus + still spend most of their time there","许多住在校外的学生仍然大部分时间在校园里。"],
["grammar","The <em>campus</em> library, which was recently renovated, is now open 24 hours.","n. 作定语修饰 library",M+" The campus library, + "+ATTR+" which was recently renovated, + is now open 24 hours","最近翻新的校园图书馆现在24小时开放。"],
["grammar","On <em>campus</em>, there are several workshops available for students each semester.","n. 句首介词短语作地点状语",M+" On campus, + "+M+" there are several workshops available + "+PURP+" for students + "+TIM+" each semester","校园里每学期有几个面向学生的研讨会。"],
["trap","I live in the <em>campus</em>. (Note: 'in' is a distractor — use 'on campus' not 'in the campus')","n. on campus（非 in the campus）",M+" I live on campus (not in the campus)","我住在校园里。（注意：用on campus）"],
["trap","There are two <em>campuses</em> in this university. (Note: 'campuss' is a distractor — plural is campuses)","n. 复数形式 campuses（非 campuss）",M+" There are two campuses (not campuss) + in this university","这所大学有两个校区。（注意：复数为campuses）"],
["output","A well-designed <em>campus</em> promotes student interaction and fosters a sense of community.","n. 作主语",M+" A well-designed campus + promotes student interaction + and fosters a sense of community","设计良好的校园促进学生互动并培养社区意识。"],
["output","Universities should invest in <em>campus</em> facilities that support both academic learning and volunteer activities.","n. 作定语",M+" Universities should invest in campus facilities + "+ATTR+" that support both academic learning and volunteer activities","大学应投资于支持学术学习和志愿活动的校园设施。"]
]},

{w:"semester",ph:"/sɪˈmestər/",pos:"n",cn:"学期",stars:1,ss:[
["dialog","How many courses are you taking this <em>semester</em>?","n. 作时间状语",M+" How many courses are you taking + "+TIM+" this semester?","你这学期选了几门课？"],
["dialog","I had three presentations last <em>semester</em> — it was exhausting.","n. 作时间状语",M+" I had three presentations + "+TIM+" last semester","上学期我做了三次演讲——太累了。"],
["dialog","This <em>semester</em> I'm volunteering at the campus health clinic every Wednesday.","n. 作时间状语（句首）",TIM+" This semester + "+M+" I'm volunteering at the campus health clinic + "+TIM+" every Wednesday","这学期我每周三在校园健康诊所做志愿。"],
["grammar","By the end of the <em>semester</em>, students must have completed all assignments.","n. 作介词宾语（截止时间）",TIM+" By the end of the semester, + "+M+" students must have completed all assignments","到学期末，学生必须完成所有作业。"],
["grammar","The first <em>semester</em> of college is often the most challenging for new students.","n. 作主语（带后置定语）",M+" The first semester + "+ATTR+" of college + is often the most challenging + "+PURP+" for new students","大学第一学期对新生来说通常是最有挑战性的。"],
["grammar","Each <em>semester</em> brings new lectures, assignments, and opportunities to grow.","n. 作主语（each + 单数）",M+" Each semester + brings new lectures, assignments, and opportunities to grow","每个学期都带来新的讲座、作业和成长机会。"],
["trap","I'm going to take five courses next <em>semester</em>. (Note: 'on' is a distractor — no preposition needed before next/last/this semester)","n. next/last/this + semester 前不加介词",M+" I'm going to take five courses + "+TIM+" next semester (no preposition)","我下学期要选五门课。（注意：next semester前不加介词）"],
["trap","The <em>semester</em> begin in September. (Note: 'begin' is a distractor — singular subject needs 'begins')","n. 单数主语 + 单数动词 begins（非 begin）",M+" The semester begins (not begin) + "+TIM+" in September","学期九月开始。（注意：单数主语用begins）"],
["output","A well-structured <em>semester</em> plan helps students balance coursework, volunteering, and personal life.","n. 作定语",M+" A well-structured semester plan + helps students balance coursework, volunteering, and personal life","一个结构合理的学期计划帮助学生平衡课业、志愿和个人生活。"],
["output","Students who set clear goals at the beginning of each <em>semester</em> tend to perform better academically.","n. 作介词宾语",M+" Students + "+ATTR+" who set clear goals + "+TIM+" at the beginning of each semester + tend to perform better academically","在每学期初设定明确目标的学生往往学业表现更好。"]
]},

{w:"deadline",ph:"/ˈdedlaɪn/",pos:"n",cn:"截止日期",stars:1,ss:[
["dialog","When is the <em>deadline</em> for the research paper?","n. 作主语",M+" When is the deadline + "+PURP+" for the research paper?","研究论文的截止日期是什么时候？"],
["dialog","I almost missed the <em>deadline</em> because I was volunteering all weekend.","n. 作宾语",M+" I almost missed the deadline + "+CAU+" because I was volunteering all weekend","我差点错过截止日期因为我整个周末都在做志愿。"],
["dialog","The professor extended the <em>deadline</em> by two days.","n. 作宾语",M+" The professor extended the deadline + by two days","教授把截止日期延长了两天。"],
["grammar","The <em>deadline</em> for submitting the assignment is the end of this semester.","n. 作主语 + for后置定语",M+" The deadline + "+ATTR+" for submitting the assignment + is the end of this semester","提交作业的截止日期是本学期末。"],
["grammar","Students who fail to meet the <em>deadline</em> will receive a lower grade.","n. 作宾语（meet the deadline 固定搭配）",M+" Students + "+ATTR+" who fail to meet the deadline + will receive a lower grade","未能在截止日期前完成的学生将获得较低的成绩。"],
["grammar","With the <em>deadline</em> approaching, many students are spending extra hours in the library.","n. 独立主格结构（with + n. + V-ing）",PART+" With the deadline approaching, + "+M+" many students are spending extra hours in the library","随着截止日期临近，许多学生在图书馆多花了不少时间。"],
["trap","The <em>deadline</em> is on March 15th. (Note: 'in' is a distractor — use 'on' with specific dates)","n. 具体日期用 on（非 in）",M+" The deadline is + "+TIM+" on March 15th (not in March 15th)","截止日期是3月15日。（注意：具体日期用on）"],
["trap","I need to hand in the assignment before the <em>deadline</em> will pass. (Note: 'will pass' is a distractor — use 'before the deadline passes' with present tense in time clause)","n. 时间状语从句中用一般现在时（非将来时）",M+" I need to hand in the assignment + "+TIM+" before the deadline passes (not will pass)","我需要在截止日期前提交作业。（注意：时间从句用一般现在时）"],
["output","Meeting <em>deadlines</em> consistently demonstrates responsibility and strong time management.","n. 动名词短语中作宾语",M+" Meeting deadlines consistently + demonstrates responsibility and strong time management","始终按时完成截止日期展示了责任心和良好的时间管理能力。"],
["output","Strict <em>deadlines</em> motivate students to prioritize tasks; however, excessive pressure can lead to burnout.","n. 作主语",M+" Strict deadlines motivate students to prioritize tasks; + "+CON+" however, + "+M+" excessive pressure can lead to burnout","严格的截止日期激励学生优先处理任务；然而，过度压力可能导致倦怠。"]
]},

{w:"workshop",ph:"/ˈwɜːrkʃɒp/",pos:"n",cn:"研讨会",stars:2,ss:[
["dialog","Are you going to the writing <em>workshop</em> on Thursday?","n. 作介词宾语",M+" Are you going to + the writing workshop + "+TIM+" on Thursday?","你周四去写作研讨会吗？"],
["dialog","The <em>workshop</em> on time management was really helpful.","n. 作主语",M+" The workshop + "+ATTR+" on time management + was really helpful","关于时间管理的研讨会非常有用。"],
["dialog","I heard there's a free <em>workshop</em> about presentation skills on campus.","n. 作宾语（there be句型）",M+" I heard + "+OBJ+" there's a free workshop + "+ATTR+" about presentation skills + on campus","我听说校园里有一个关于演讲技巧的免费研讨会。"],
["grammar","The <em>workshop</em> that the career center organized attracted over fifty students.","n. 作主语 + 定语从句",M+" The workshop + "+ATTR+" that the career center organized + attracted over fifty students","职业中心组织的研讨会吸引了五十多名学生。"],
["grammar","Attending <em>workshops</em> during the semester helps students develop practical skills beyond lectures.","n. 动名词短语中作宾语",M+" Attending workshops + "+TIM+" during the semester + helps students develop practical skills + beyond lectures","学期中参加研讨会帮助学生发展超越课堂的实践技能。"],
["grammar","A well-organized <em>workshop</em> provides hands-on experience that supplements traditional lectures.","n. 作主语",M+" A well-organized workshop + provides hands-on experience + "+ATTR+" that supplements traditional lectures","组织良好的研讨会提供补充传统讲座的实践经验。"],
["trap","I'm attending a <em>workshop</em> about how to writing a research paper. (Note: 'writing' is a distractor — how to write, not how to writing)","n. how to + 动词原形（非 how to + V-ing）",M+" I'm attending a workshop + about how to write (not writing) a research paper","我在参加一个关于如何写研究论文的研讨会。（注意：how to + 原形）"],
["trap","The <em>workshop</em> will hold in the main auditorium. (Note: 'hold' is a distractor — should be 'will be held' in passive voice)","n. 被动语态 will be held（非 will hold）",M+" The workshop will be held (not will hold) + in the main auditorium","研讨会将在主礼堂举行。（注意：应用被动语态）"],
["output","<em>Workshops</em> provide an interactive learning environment where students can apply theoretical knowledge to real-world scenarios.","n. 作主语",M+" Workshops + provide an interactive learning environment + "+ATTR+" where students can apply theoretical knowledge to real-world scenarios","研讨会提供互动学习环境，学生可以将理论知识应用于现实场景。"],
["output","Universities should offer more <em>workshops</em> focused on professional development to prepare students for the job market.","n. 作宾语 + 后置定语",M+" Universities should offer more workshops + "+PART+" focused on professional development + "+PURP+" to prepare students for the job market","大学应提供更多专注于职业发展的研讨会，为学生进入就业市场做准备。"]
]},

{w:"volunteer",ph:"/ˌvɒlənˈtɪr/",pos:"n/v",cn:"志愿者/志愿",stars:1,ss:[
["dialog","I'm a <em>volunteer</em> at the campus tutoring center.","n. 作表语",M+" I'm a volunteer + at the campus tutoring center","我是校园辅导中心的志愿者。"],
["dialog","Do you want to <em>volunteer</em> with me at the food bank this weekend?","v. 作谓语（不及物）",M+" Do you want to volunteer + with me + at the food bank + "+TIM+" this weekend?","你这周末想和我一起在食物银行做志愿吗？"],
["dialog","She <em>volunteered</em> to help organize the campus workshop.","v. 作谓语（volunteer to do sth）",M+" She volunteered + "+PURP+" to help organize the campus workshop","她自愿帮忙组织校园研讨会。"],
["grammar","<em>Volunteering</em> regularly helps students build connections outside the classroom.","v. 动名词作主语",M+" Volunteering regularly + helps students build connections + outside the classroom","定期做志愿帮助学生建立课堂外的联系。"],
["grammar","The <em>volunteers</em> who participated in the project received certificates at the end of the semester.","n. 作主语 + 定语从句",M+" The volunteers + "+ATTR+" who participated in the project + received certificates + "+TIM+" at the end of the semester","参加项目的志愿者在学期末获得了证书。"],
["grammar","He has <em>volunteered</em> at three different organizations since his first semester on campus.","v. 现在完成时（表示经历）",M+" He has volunteered + at three different organizations + "+TIM+" since his first semester on campus","自从在校园的第一个学期以来，他已经在三个不同的机构做过志愿。"],
["trap","She <em>volunteered</em> for help at the event. (Note: 'for help' is a distractor — volunteer to help, not volunteer for help)","v. volunteer to do（非 volunteer for do / for help）",M+" She volunteered to help (not for help) + at the event","她自愿在活动中帮忙。（注意：volunteer to help，非for help）"],
["trap","The <em>volunteer</em> work is very tired. (Note: 'tired' is a distractor — use 'tiring' for activities, 'tired' for people)","n. tiring修饰事物（非tired修饰事物）",M+" The volunteer work is very tiring (not tired)","志愿工作非常累人。（注意：tiring修饰事物）"],
["output","<em>Volunteering</em> not only benefits the community but also enhances students' personal growth and empathy.","v. 动名词作主语（not only...but also并列）",M+" Volunteering + not only benefits the community + but also enhances students' personal growth and empathy","志愿服务不仅有益于社区，也提升学生的个人成长和同理心。"],
["output","Universities that require students to <em>volunteer</em> should ensure the experiences are meaningful rather than merely obligatory.","v. 作不定式宾补",M+" Universities + "+ATTR+" that require students to volunteer + should ensure + "+OBJ+" the experiences are meaningful rather than merely obligatory","要求学生做志愿的大学应确保这些经历是有意义的而非仅仅是强制性的。"]
]},

{w:"groceries",ph:"/ˈɡroʊsəriz/",pos:"n",cn:"杂货;日用品",stars:2,ss:[
["dialog","I need to pick up some <em>groceries</em> after my last lecture today.","n. 作宾语",M+" I need to pick up some groceries + "+TIM+" after my last lecture today","我需要今天最后一节课后去买些杂货。"],
["dialog","My roommate and I take turns buying <em>groceries</em> each week.","n. 作宾语",M+" My roommate and I + take turns buying groceries + "+TIM+" each week","我和室友每周轮流买杂货。"],
["dialog","Where do you usually get your <em>groceries</em>? The store across from campus?","n. 作宾语",M+" Where do you usually get + your groceries?","你通常在哪买杂货？校园对面那家店吗？"],
["grammar","Buying <em>groceries</em> on a student budget requires careful planning.","n. 动名词短语中作宾语（整个短语作主语）",M+" Buying groceries + on a student budget + requires careful planning","在学生预算内买杂货需要仔细规划。"],
["grammar","The <em>groceries</em> that she bought from the store across from campus were on sale.","n. 作主语 + 定语从句",M+" The groceries + "+ATTR+" that she bought from the store across from campus + were on sale","她从校园对面商店买的杂货在打折。"],
["grammar","Instead of eating out every day, many students save money by cooking with their own <em>groceries</em>.","n. 作介词宾语",CON+" Instead of eating out every day, + "+M+" many students save money + by cooking with their own groceries","许多学生不再每天外出吃饭，而是用自己买的杂货做饭来省钱。"],
["trap","I bought a <em>grocery</em> at the store. (Note: 'grocery' singular is rarely used for items — use 'groceries' for purchased food items, or 'grocery store' for the shop)","n. 买的食品用 groceries（复数），grocery常用于grocery store",M+" I bought groceries (not a grocery) + at the store","我在商店买了杂货。（注意：买的东西用groceries复数）"],
["trap","She went to buy <em>groceries</em> in the grocery store. (Note: 'in' is a distractor — buy groceries at/from the store, not in)","n. at/from the store（非 in the store 表示购买行为）",M+" She went to buy groceries + at the grocery store (not in)","她去杂货店买东西了。（注意：用at/from，非in）"],
["output","Learning to manage <em>groceries</em> and household expenses is an important life skill that college students develop during their first semester.","n. 作宾语（并列）",M+" Learning to manage groceries and household expenses + is an important life skill + "+ATTR+" that college students develop + "+TIM+" during their first semester","学会管理杂货和家庭开支是大学生在第一学期培养的重要生活技能。"],
["output","Sharing <em>groceries</em> with a roommate not only reduces costs but also fosters cooperation and communication.","n. 动名词短语中作宾语",M+" Sharing groceries with a roommate + not only reduces costs + but also fosters cooperation and communication","和室友分享杂货不仅降低费用，还能培养合作和沟通能力。"]
]}

];

registerTask("task1", words, {patterns: patterns, distractors: distractors});
})();
