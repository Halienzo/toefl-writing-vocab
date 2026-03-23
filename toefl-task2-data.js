// Task 2: Write an Email - Data file
// Will be expanded to 80 words x 10 sentences in next phase
(function(){

var verbs = [
  {word:"describe",cn:"描述：客观陈述事物的外观/特征/过程",
   examples:["Describe the item you purchased and the damage it sustained.","Describe the destinations you have researched."],
   diff:"describe = 画面感，回答 what it looks like / what happened"},
  {word:"explain",cn:"解释：说明原因/理由/逻辑关系",
   examples:["Explain why you are disappointed with the situation.","Explain how the workshop benefits your studies."],
   diff:"explain = 因果链，回答 why / how / the reason behind"},
  {word:"suggest",cn:"建议：提出可行的方案或改进措施",
   examples:["Suggest ways he can contribute to the project.","Suggest how these issues could be resolved in future events."],
   diff:"suggest = 行动方案，回答 what should be done"},
  {word:"request",cn:"请求：正式提出需要对方做的事",
   examples:["Request a replacement or a refund for the damaged item.","Request a meeting with Dr. Smith to discuss further."],
   diff:"request = 具体行动要求，回答 what you need from them"},
  {word:"mention",cn:"提及：简要说明（不需要展开论述）",
   examples:["Mention how much you enjoy the yoga classes.","Mention what you found most valuable about the workshop."],
   diff:"mention = 一笔带过，回答 briefly state / touch on"},
  {word:"recommend",cn:"推荐：基于经验向对方推荐某物/某事",
   examples:["Recommend a specific dish for Riley to try.","Your professor recommended the digital marketing workshop."],
   diff:"recommend = 个人背书，回答 what you think they should try/choose"}
];

var clusters = [
  {name:"Complaint / Product Issue",
   words:["purchase","damage","replacement","refund","shipping","defective","customer service"],
   sentence:"I recently <em>purchased</em> a bookshelf from your online store, but it was <em>damaged</em> during <em>shipping</em>. I would like to request a <em>replacement</em> or a full <em>refund</em>."},
  {name:"Academic Help Request",
   words:["struggle","assignment","improve","advice","specific","understanding","professor"],
   sentence:"I have been <em>struggling</em> with recent <em>assignments</em> and would like your <em>advice</em> on how to <em>improve</em> my <em>understanding</em> of the course material."},
  {name:"Event Planning / Invitation",
   words:["organize","reservation","dietary","recreational","retreat","purpose","venue"],
   sentence:"We are <em>organizing</em> a team-building <em>retreat</em> and would like to make a <em>reservation</em>. Could you tell us about <em>dietary</em> options and <em>recreational</em> activities at the <em>venue</em>?"},
  {name:"Feedback / Quality Issue",
   words:["appreciate","feedback","issue","sound quality","venue","improve","experience"],
   sentence:"I <em>appreciate</em> the effort put into the concert, but I want to provide <em>feedback</em> about the <em>sound quality</em> at the <em>venue</em> to help <em>improve</em> the <em>experience</em> for future events."},
  {name:"Thank / Praise",
   words:["appreciate","contribution","valuable","informative","benefit","frequently","workshop"],
   sentence:"I really <em>appreciate</em> your <em>contribution</em> to the <em>workshop</em>. The session was incredibly <em>informative</em> and <em>valuable</em>, and I hope similar events can be held more <em>frequently</em>."},
  {name:"Problem Solving / Group Work",
   words:["participate","contribute","affect","address","resolve","progress","frustrated"],
   sentence:"I am <em>frustrated</em> because not all members <em>participate</em> equally, which <em>affects</em> our <em>progress</em>. I would like to <em>address</em> this issue and <em>resolve</em> it before the deadline."}
];

var words = [
{w:"describe",ph:"/dɪˈskraɪb/",pos:"v",cn:"描述",cat:"all",stars:1,ss:[
["instr","<em>Describe</em> the item you purchased and the damage it sustained.","v. 祈使句中的指令动词，后接名词宾语",M+" 祈使句: Describe + O(the item you purchased) + and + O(the damage it sustained)","描述你购买的物品及其遭受的损坏。"],
["instr","<em>Describe</em> the destinations you have researched.","v. 后接名词宾语+定语从句",M+" 祈使句: Describe + O(the destinations) + "+ATTR+" you have researched","描述你研究过的目的地。"],
["instr","<em>Describe</em> your ideas for the awareness event.","v. 后接名词宾语",M+" 祈使句: Describe + O(your ideas) + prep.phrase(for the awareness event)","描述你对宣传活动的想法。"],
["prompt","You recently purchased a piece of furniture. <em>Describe</em> the item and the damage.","v. 在题目指令中",M+" 祈使句: Describe + O(the item and the damage)","你最近买了一件家具。描述该物品和损坏情况。"],
["prompt","The group is planning an event. <em>Describe</em> your ideas for activities.","v. 在题目指令中",M+" 祈使句: Describe + O(your ideas for activities)","小组正在策划活动。描述你的活动想法。"],
["email","I would like to <em>describe</em> the issue I experienced with the appliance.","v. would like to + V",M+" I would like to describe + O(the issue) + "+ATTR+" I experienced with the appliance","我想描述一下我在使用该电器时遇到的问题。"],
["email","Let me <em>describe</em> what happened when the package arrived.","v. let me + V",M+" Let me describe + "+OBJ+" what happened when the package arrived","让我描述一下包裹到达时发生了什么。"],
["email","I want to <em>describe</em> my experience at the concert so you can understand the issue.","v. want to + V",M+" I want to describe + O(my experience) + "+PURP+" so you can understand the issue","我想描述我在音乐会的经历以便你理解问题。"],
["cross","Could you <em>describe</em> the recreational activities available at the resort?","v. 在请求句中",M+" Could you describe + O(the recreational activities) + "+ATTR+" available at the resort?","你能描述度假村提供的娱乐活动吗？"],
["cross","In your email, <em>describe</em> how the internet outage is affecting your studies.","v. 指令 + how从句",M+" 祈使句: describe + "+OBJ+" how the internet outage is affecting your studies","在邮件中描述网络中断如何影响你的学习。"]
]},

{w:"explain",ph:"/ɪkˈspleɪn/",pos:"v",cn:"解释;说明",cat:"all",stars:1,ss:[
["instr","<em>Explain</em> why you are disappointed with the situation.","v. explain + why从句",M+" 祈使句: Explain + "+OBJ+" why you are disappointed with the situation","解释你为什么对这种情况感到失望。"],
["instr","<em>Explain</em> how the workshop benefits your studies.","v. explain + how从句",M+" 祈使句: Explain + "+OBJ+" how the workshop benefits your studies","解释研讨会如何有益于你的学业。"],
["instr","<em>Explain</em> why you believe these activities will be effective.","v. explain + why从句",M+" 祈使句: Explain + "+OBJ+" why you believe + "+OBJ+" these activities will be effective","解释你为什么认为这些活动会有效。"],
["prompt","<em>Explain</em> how his lack of participation is affecting the group.","v. explain + how从句",M+" 祈使句: Explain + "+OBJ+" how his lack of participation is affecting the group","解释他缺乏参与如何影响小组。"],
["prompt","<em>Explain</em> the issue you had with the sound quality.","v. explain + 名词宾语",M+" 祈使句: Explain + O(the issue) + "+ATTR+" you had with the sound quality","解释你在音质方面遇到的问题。"],
["email","Let me <em>explain</em> why I think this workshop was particularly valuable.","v. let me + explain + why",M+" Let me explain + "+OBJ+" why I think + "+OBJ+" this workshop was particularly valuable","让我解释为什么我认为这个研讨会特别有价值。"],
["email","I wanted to <em>explain</em> the situation so we can find a solution together.","v. wanted to + explain",M+" I wanted to explain + O(the situation) + "+PURP+" so we can find a solution together","我想解释情况以便我们一起找到解决方案。"],
["email","Allow me to <em>explain</em> how the delayed delivery has impacted my schedule.","v. allow me to + explain",M+" Allow me to explain + "+OBJ+" how the delayed delivery has impacted my schedule","请允许我解释延迟交货如何影响了我的日程。"],
["cross","Could you <em>explain</em> the process for booking a study room in the library?","v. 请求句中",M+" Could you explain + O(the process) + prep.phrase(for booking a study room)?","你能解释一下预订图书馆自习室的流程吗？"],
["cross","I would appreciate it if you could <em>explain</em> why the refund has not been processed.","v. 在if条件从句中",M+" I would appreciate it + "+COND+" if you could explain + "+OBJ+" why the refund has not been processed","如果你能解释为什么退款尚未处理我将不胜感激。"]
]},

{w:"inform",ph:"/ɪnˈfɔːrm/",pos:"v",cn:"通知",cat:"all",stars:1,ss:[
["prompt","You need to <em>inform</em> the housing office about your early departure from the dormitory.","v. inform + sb + about sth",M+" You need to inform + O(the housing office) + prep.phrase(about your early departure from the dormitory)","你需要通知住房办公室你提前离开宿舍的事情。"],
["prompt","Write an email to <em>inform</em> your professor that you will miss the next class.","v. inform + sb + that从句",M+" Write an email to inform + O(your professor) + "+OBJ+" that you will miss the next class","写一封邮件通知你的教授你将缺席下一堂课。"],
["prompt","You want to <em>inform</em> the event coordinator about a scheduling conflict.","v. inform + sb + about sth",M+" You want to inform + O(the event coordinator) + prep.phrase(about a scheduling conflict)","你想通知活动协调员关于日程冲突的事。"],
["instr","<em>Inform</em> the recipient of the reason for your absence.","v. 祈使句 inform + sb + of sth",M+" 祈使句: Inform + O(the recipient) + prep.phrase(of the reason for your absence)","告知收件人你缺席的原因。"],
["instr","<em>Inform</em> them about the changes to the meeting schedule.","v. 祈使句 inform + sb + about sth",M+" 祈使句: Inform + O(them) + prep.phrase(about the changes to the meeting schedule)","通知他们会议日程的变更。"],
["email","I am writing to <em>inform</em> you that I will not be able to attend the workshop next Friday.","v. inform + sb + that从句",M+" I am writing to inform + O(you) + "+OBJ+" that I will not be able to attend the workshop next Friday","我写信是为了通知您我下周五无法参加研讨会。"],
["email","I would like to <em>inform</em> you of a problem I encountered with the online registration system.","v. inform + sb + of sth",M+" I would like to inform + O(you) + prep.phrase(of a problem) + "+ATTR+" I encountered with the online registration system","我想通知您我在网上注册系统中遇到的一个问题。"],
["email","Please allow me to <em>inform</em> you about the updated plan for the group project.","v. inform + sb + about sth",M+" Please allow me to inform + O(you) + prep.phrase(about the updated plan for the group project)","请允许我通知您小组项目的更新计划。"],
["cross","I wanted to <em>inform</em> you that several students have expressed interest in the volunteer program.","v. inform + sb + that从句",M+" I wanted to inform + O(you) + "+OBJ+" that several students have expressed interest in the volunteer program","我想通知您有几位学生对志愿者项目表示了兴趣。"],
["cross","She asked me to <em>inform</em> you about the change of venue for the farewell party.","v. inform + sb + about sth",M+" She asked me to inform + O(you) + prep.phrase(about the change of venue for the farewell party)","她让我通知你告别派对场地变更的事。"]
]},

{w:"confirm",ph:"/kənˈfɜːrm/",pos:"v",cn:"确认",cat:"all",stars:1,ss:[
["prompt","Write an email to the hotel to <em>confirm</em> your reservation for the weekend.","v. confirm + 名词宾语",M+" Write an email to the hotel to confirm + O(your reservation) + prep.phrase(for the weekend)","写一封邮件给酒店确认你的周末预订。"],
["prompt","You want to <em>confirm</em> whether the scholarship application deadline has been extended.","v. confirm + whether从句",M+" You want to confirm + "+OBJ+" whether the scholarship application deadline has been extended","你想确认奖学金申请截止日期是否已延长。"],
["prompt","Email the organizer to <em>confirm</em> your attendance at the charity event.","v. confirm + 名词宾语",M+" 祈使句: Email the organizer to confirm + O(your attendance) + prep.phrase(at the charity event)","给组织者发邮件确认你参加慈善活动。"],
["instr","<em>Confirm</em> the date and time of the meeting in your email.","v. 祈使句 confirm + 名词宾语",M+" 祈使句: Confirm + O(the date and time of the meeting) + prep.phrase(in your email)","在邮件中确认会议的日期和时间。"],
["instr","<em>Confirm</em> that you have received the revised schedule.","v. 祈使句 confirm + that从句",M+" 祈使句: Confirm + "+OBJ+" that you have received the revised schedule","确认你已收到修改后的日程表。"],
["email","I am writing to <em>confirm</em> that I will be attending the orientation session on Monday.","v. confirm + that从句",M+" I am writing to confirm + "+OBJ+" that I will be attending the orientation session on Monday","我写信是为了确认我将参加周一的迎新会。"],
["email","Could you please <em>confirm</em> whether the library will be open during the holiday break?","v. confirm + whether从句",M+" Could you please confirm + "+OBJ+" whether the library will be open during the holiday break?","你能否确认图书馆在假期期间是否开放？"],
["email","I would like to <em>confirm</em> my enrollment in the advanced writing course.","v. confirm + 名词宾语",M+" I would like to confirm + O(my enrollment) + prep.phrase(in the advanced writing course)","我想确认我注册了高级写作课程。"],
["cross","Please <em>confirm</em> the total cost so I can arrange the payment promptly.","v. confirm + 名词宾语",M+" Please confirm + O(the total cost) + "+PURP+" so I can arrange the payment promptly","请确认总费用以便我能及时安排付款。"],
["cross","I need you to <em>confirm</em> that the venue is available for our end-of-semester celebration.","v. confirm + that从句",M+" I need you to confirm + "+OBJ+" that the venue is available for our end-of-semester celebration","我需要你确认场地是否可用于我们的学期末庆祝活动。"]
]},

{w:"clarify",ph:"/ˈklærəfaɪ/",pos:"v",cn:"澄清",cat:"request",stars:2,ss:[
["prompt","Write an email to your advisor to <em>clarify</em> the requirements for the research paper.","v. clarify + 名词宾语",M+" Write an email to your advisor to clarify + O(the requirements) + prep.phrase(for the research paper)","写一封邮件给你的导师澄清研究论文的要求。"],
["prompt","You are confused about the assignment. Email your professor to <em>clarify</em> the instructions.","v. clarify + 名词宾语",M+" Email your professor to clarify + O(the instructions)","你对作业感到困惑。给教授发邮件澄清说明。"],
["prompt","Write to the financial aid office to <em>clarify</em> your eligibility for the grant.","v. clarify + 名词宾语",M+" Write to the financial aid office to clarify + O(your eligibility) + prep.phrase(for the grant)","写信给财务援助办公室澄清你获得助学金的资格。"],
["instr","<em>Clarify</em> any misunderstandings about the project deadline.","v. 祈使句 clarify + 名词宾语",M+" 祈使句: Clarify + O(any misunderstandings) + prep.phrase(about the project deadline)","澄清关于项目截止日期的任何误解。"],
["instr","<em>Clarify</em> what you expect from the team in terms of contributions.","v. 祈使句 clarify + what从句",M+" 祈使句: Clarify + "+OBJ+" what you expect from the team in terms of contributions","澄清你对团队贡献方面的期望。"],
["email","I am writing to <em>clarify</em> a few points regarding the registration process.","v. clarify + 名词宾语",M+" I am writing to clarify + O(a few points) + prep.phrase(regarding the registration process)","我写信是为了澄清关于注册流程的几个问题。"],
["email","Could you <em>clarify</em> whether the tuition fee includes laboratory materials?","v. clarify + whether从句",M+" Could you clarify + "+OBJ+" whether the tuition fee includes laboratory materials?","你能澄清学费是否包括实验室材料吗？"],
["email","I would appreciate it if you could <em>clarify</em> the policy on late submissions.","v. clarify + 名词宾语",M+" I would appreciate it + "+COND+" if you could clarify + O(the policy on late submissions)","如果你能澄清逾期提交的政策我将不胜感激。"],
["cross","Please <em>clarify</em> the dress code for the formal dinner so that all guests can prepare accordingly.","v. clarify + 名词宾语",M+" Please clarify + O(the dress code) + prep.phrase(for the formal dinner) + "+PURP+" so that all guests can prepare accordingly","请澄清正式晚宴的着装要求以便所有客人做好准备。"],
["cross","We need to <em>clarify</em> the roles of each volunteer before the campus event begins.","v. clarify + 名词宾语",M+" We need to clarify + O(the roles of each volunteer) + "+TIM+" before the campus event begins","我们需要在校园活动开始前澄清每位志愿者的角色。"]
]},

{w:"notify",ph:"/ˈnoʊtɪfaɪ/",pos:"v",cn:"通知;告知",cat:"complain",stars:2,ss:[
["prompt","You were not <em>notified</em> about the cancellation of the event. Write an email to complain.","v. 被动语态 be notified about",M+" You were not notified + prep.phrase(about the cancellation of the event)","你没有被通知活动取消的事。写一封邮件投诉。"],
["prompt","Write to the airline to explain that they failed to <em>notify</em> you of the flight delay.","v. notify + sb + of sth",M+" Write to the airline to explain + "+OBJ+" that they failed to notify + O(you) + prep.phrase(of the flight delay)","写信给航空公司解释他们未能通知你航班延误。"],
["prompt","The landlord did not <em>notify</em> you about the maintenance work in advance.","v. notify + sb + about sth",M+" The landlord did not notify + O(you) + prep.phrase(about the maintenance work) + prep.phrase(in advance)","房东没有提前通知你维修工作的事。"],
["instr","<em>Notify</em> the relevant department about the issue you experienced.","v. 祈使句 notify + sb + about sth",M+" 祈使句: Notify + O(the relevant department) + prep.phrase(about the issue) + "+ATTR+" you experienced","通知相关部门你遇到的问题。"],
["instr","<em>Notify</em> them that you expect a timely response.","v. 祈使句 notify + sb + that从句",M+" 祈使句: Notify + O(them) + "+OBJ+" that you expect a timely response","通知他们你期待及时回复。"],
["email","I was never <em>notified</em> that the class had been relocated to a different building.","v. 被动语态 be notified + that从句",M+" I was never notified + "+OBJ+" that the class had been relocated to a different building","我从未被通知课程已搬到另一栋楼。"],
["email","I feel it is unacceptable that residents were not <em>notified</em> about the water shut-off.","v. 被动语态 be notified about",M+" I feel + "+OBJ+" it is unacceptable + "+OBJ+" that residents were not notified + prep.phrase(about the water shut-off)","我觉得居民没有被通知停水是不可接受的。"],
["email","Please <em>notify</em> me as soon as a decision has been made regarding my complaint.","v. notify + sb + 时间状语从句",M+" Please notify + O(me) + "+TIM+" as soon as a decision has been made regarding my complaint","请在关于我投诉的决定作出后立即通知我。"],
["cross","The university should <em>notify</em> students well in advance if any campus facilities will be closed.","v. notify + sb + 条件状语从句",M+" The university should notify + O(students) + prep.phrase(well in advance) + "+COND+" if any campus facilities will be closed","大学应该提前通知学生校园设施是否会关闭。"],
["cross","Could you <em>notify</em> the rest of the team about the updated meeting time?","v. notify + sb + about sth",M+" Could you notify + O(the rest of the team) + prep.phrase(about the updated meeting time)?","你能通知团队其他成员更新后的会议时间吗？"]
]},

{w:"concern",ph:"/kənˈsɜːrn/",pos:"n/v",cn:"担忧;关注",cat:"resolve",stars:1,ss:[
["prompt","You have a <em>concern</em> about the noise levels in your dormitory. Write an email to the housing office.","n. 作主语的一部分",M+" You have + O(a concern) + prep.phrase(about the noise levels in your dormitory)","你对宿舍噪音水平有担忧。给住房办公室写一封邮件。"],
["prompt","Write an email expressing your <em>concern</em> about the lack of study spaces on campus.","n. 作宾语",M+" Write an email expressing + O(your concern) + prep.phrase(about the lack of study spaces on campus)","写一封邮件表达你对校园学习空间不足的担忧。"],
["prompt","A safety issue <em>concerns</em> you. Email the campus security office to discuss it.","v. concern + sb 使某人担忧",M+" A safety issue concerns + O(you)","一个安全问题让你担忧。给校园安保办公室发邮件讨论。"],
["instr","Express your <em>concern</em> and suggest possible solutions.","n. 作宾语",M+" 祈使句: Express + O(your concern) + and + suggest + O(possible solutions)","表达你的担忧并提出可能的解决方案。"],
["instr","Explain what <em>concerns</em> you about the current arrangement.","v. concern + sb",M+" 祈使句: Explain + "+OBJ+" what concerns + O(you) + prep.phrase(about the current arrangement)","解释当前安排中什么让你担忧。"],
["email","My main <em>concern</em> is that the heating system in the dormitory has not been repaired.","n. 作主语",M+" My main concern is + "+OBJ+" that the heating system in the dormitory has not been repaired","我主要的担忧是宿舍的供暖系统尚未修好。"],
["email","I am writing to share my <em>concerns</em> about the proposed changes to the meal plan.","n. 作宾语(复数)",M+" I am writing to share + O(my concerns) + prep.phrase(about the proposed changes to the meal plan)","我写信是为了分享我对餐饮计划拟议变更的担忧。"],
["email","This issue <em>concerns</em> not only me but also several other residents on the floor.","v. concern + sb",M+" This issue concerns + O(not only me but also several other residents) + prep.phrase(on the floor)","这个问题不仅让我担忧也让楼层其他几位住户担忧。"],
["cross","I appreciate your willingness to address my <em>concerns</em> about the group project.","n. 作宾语(复数)",M+" I appreciate + O(your willingness to address my concerns) + prep.phrase(about the group project)","我感谢你愿意解决我对小组项目的担忧。"],
["cross","One <em>concern</em> that many students share is the limited parking available near the lecture hall.","n. 作主语+定语从句",M+" One concern + "+ATTR+" that many students share + is + O(the limited parking available near the lecture hall)","许多学生共同的一个担忧是讲堂附近停车位有限。"]
]},

{w:"encounter",ph:"/ɪnˈkaʊntər/",pos:"v",cn:"遇到",cat:"complain",stars:2,ss:[
["prompt","You <em>encountered</em> a problem with a product you ordered online. Write to the company.","v. encounter + 名词宾语",M+" You encountered + O(a problem) + prep.phrase(with a product) + "+ATTR+" you ordered online","你在网上订购的产品遇到了问题。写信给公司。"],
["prompt","Write an email describing the difficulties you <em>encountered</em> during the registration process.","v. encounter + 名词宾语(定语从句中)",M+" Write an email describing + O(the difficulties) + "+ATTR+" you encountered during the registration process","写一封邮件描述你在注册过程中遇到的困难。"],
["prompt","You <em>encountered</em> rude service at the campus bookstore. Email the manager.","v. encounter + 名词宾语",M+" You encountered + O(rude service) + prep.phrase(at the campus bookstore)","你在校园书店遇到了粗鲁的服务。给经理发邮件。"],
["instr","Describe the issue you <em>encountered</em> and explain how it affected you.","v. 在定语从句中",M+" 祈使句: Describe + O(the issue) + "+ATTR+" you encountered + and + explain + "+OBJ+" how it affected you","描述你遇到的问题并解释它如何影响了你。"],
["instr","Mention any obstacles you <em>encountered</em> while completing the assignment.","v. 在定语从句中",M+" 祈使句: Mention + O(any obstacles) + "+ATTR+" you encountered + "+TIM+" while completing the assignment","提及你在完成作业时遇到的任何障碍。"],
["email","I <em>encountered</em> a technical error when I tried to submit my application online.","v. encounter + 名词宾语 + 时间状语从句",M+" I encountered + O(a technical error) + "+TIM+" when I tried to submit my application online","我在尝试在线提交申请时遇到了一个技术错误。"],
["email","The issue I <em>encountered</em> was that the air conditioning in my room stopped working entirely.","v. 在定语从句中作谓语",M+" The issue + "+ATTR+" I encountered + was + "+OBJ+" that the air conditioning in my room stopped working entirely","我遇到的问题是房间的空调完全停止运作了。"],
["email","I have <em>encountered</em> repeated delays with the delivery of my textbooks this semester.","v. 现在完成时 have encountered",M+" I have encountered + O(repeated delays) + prep.phrase(with the delivery of my textbooks this semester)","本学期我多次遇到教科书配送延误的问题。"],
["cross","Several classmates have also <em>encountered</em> similar problems with the library's online system.","v. 现在完成时 have encountered",M+" Several classmates have also encountered + O(similar problems) + prep.phrase(with the library's online system)","几位同学也遇到了图书馆在线系统的类似问题。"],
["cross","If you <em>encounter</em> any issues during the event, please contact the organizing committee immediately.","v. 在条件从句中",M+" "+COND+" If you encounter + O(any issues) + "+TIM+" during the event + please contact + O(the organizing committee) + adv(immediately)","如果你在活动期间遇到任何问题请立即联系组委会。"]
]},

{w:"inconvenience",ph:"/ˌɪnkənˈviːniəns/",pos:"n",cn:"不便",cat:"complain",stars:2,ss:[
["prompt","The construction noise has caused great <em>inconvenience</em> to residents. Write to the building manager.","n. 作宾语",M+" The construction noise has caused + O(great inconvenience) + prep.phrase(to residents)","施工噪音给住户造成了极大的不便。写信给楼宇经理。"],
["prompt","Write an email about the <em>inconvenience</em> caused by the sudden change in class schedule.","n. 作介词宾语",M+" Write an email about + O(the inconvenience) + "+ATTR+" caused by the sudden change in class schedule","写一封关于课程安排突然变更所造成不便的邮件。"],
["prompt","The internet outage has been a major <em>inconvenience</em> for students in the dormitory.","n. 作表语",M+" The internet outage has been + O(a major inconvenience) + prep.phrase(for students in the dormitory)","网络中断对宿舍学生来说是一个很大的不便。"],
["instr","Describe the <em>inconvenience</em> you have experienced and request a solution.","n. 作宾语",M+" 祈使句: Describe + O(the inconvenience) + "+ATTR+" you have experienced + and + request + O(a solution)","描述你经历的不便并请求解决方案。"],
["instr","Explain the <em>inconvenience</em> this has caused to your daily routine.","n. 作宾语",M+" 祈使句: Explain + O(the inconvenience) + "+ATTR+" this has caused to your daily routine","解释这给你日常生活造成的不便。"],
["email","I apologize for any <em>inconvenience</em>, but I need to reschedule our meeting.","n. 在道歉短语中",M+" I apologize for + O(any inconvenience) + "+CON+" but I need to reschedule our meeting","对于任何不便我深表歉意，但我需要重新安排我们的会议。"],
["email","This situation has caused significant <em>inconvenience</em>, and I hope it can be resolved quickly.","n. 作宾语",M+" This situation has caused + O(significant inconvenience) + and + I hope + "+OBJ+" it can be resolved quickly","这种情况造成了重大不便，我希望能尽快解决。"],
["email","I understand that mistakes happen, but the <em>inconvenience</em> to students should not be overlooked.","n. 作主语",M+" I understand + "+OBJ+" that mistakes happen + "+CON+" but the inconvenience to students should not be overlooked","我理解错误会发生，但对学生造成的不便不应被忽视。"],
["cross","We appreciate your patience and apologize for any <em>inconvenience</em> during the renovation period.","n. 在道歉短语中",M+" We appreciate + O(your patience) + and + apologize for + O(any inconvenience) + "+TIM+" during the renovation period","我们感谢您的耐心，并为翻新期间造成的任何不便道歉。"],
["cross","To minimize <em>inconvenience</em>, the university has arranged shuttle buses to the temporary campus.","n. 作宾语",M+" "+PURP+" To minimize + O(inconvenience) + the university has arranged + O(shuttle buses) + prep.phrase(to the temporary campus)","为了减少不便，大学安排了班车前往临时校区。"]
]},

{w:"promptly",ph:"/ˈprɑːmptli/",pos:"adv",cn:"及时地",cat:"complain",stars:2,ss:[
["prompt","The company did not respond <em>promptly</em> to your complaint. Write a follow-up email.","adv. 修饰动词respond",M+" The company did not respond + adv(promptly) + prep.phrase(to your complaint)","公司没有及时回复你的投诉。写一封跟进邮件。"],
["prompt","You expect the maintenance team to act <em>promptly</em>. Write to the housing office.","adv. 修饰动词act",M+" You expect + O(the maintenance team) + to act + adv(promptly)","你期望维修团队及时行动。写信给住房办公室。"],
["prompt","The issue was not addressed <em>promptly</em>, causing further problems.","adv. 修饰被动动词addressed",M+" The issue was not addressed + adv(promptly) + "+PART+" causing further problems","问题没有被及时处理，导致了更多问题。"],
["instr","Request that the issue be resolved <em>promptly</em>.","adv. 修饰被动动词resolved",M+" 祈使句: Request + "+OBJ+" that the issue be resolved + adv(promptly)","请求及时解决问题。"],
["instr","Ask them to respond <em>promptly</em> to your inquiry.","adv. 修饰动词respond",M+" 祈使句: Ask + O(them) + to respond + adv(promptly) + prep.phrase(to your inquiry)","要求他们及时回复你的询问。"],
["email","I would appreciate it if this matter could be handled <em>promptly</em>.","adv. 修饰被动动词handled",M+" I would appreciate it + "+COND+" if this matter could be handled + adv(promptly)","如果此事能得到及时处理我将不胜感激。"],
["email","I reported the problem two weeks ago, but no one has <em>promptly</em> followed up on it.","adv. 修饰动词followed up",M+" I reported + O(the problem) + prep.phrase(two weeks ago) + "+CON+" but no one has promptly followed up on it","我两周前报告了这个问题，但没有人及时跟进。"],
["email","Please address this issue <em>promptly</em> so that students can resume their studies without disruption.","adv. 修饰动词address",M+" Please address + O(this issue) + adv(promptly) + "+PURP+" so that students can resume their studies without disruption","请及时处理此问题以便学生能不受干扰地恢复学习。"],
["cross","The staff <em>promptly</em> resolved my complaint, and I am very satisfied with the outcome.","adv. 修饰动词resolved",M+" The staff promptly resolved + O(my complaint) + and + I am very satisfied + prep.phrase(with the outcome)","工作人员及时解决了我的投诉，我对结果非常满意。"],
["cross","If the university responds <em>promptly</em>, students will feel their voices are valued.","adv. 修饰动词responds",M+" "+COND+" If the university responds + adv(promptly) + students will feel + "+OBJ+" their voices are valued","如果大学及时回应，学生会觉得他们的声音受到重视。"]
]},

{w:"sincerely",ph:"/sɪnˈsɪrli/",pos:"adv",cn:"真诚地",cat:"thank",stars:1,ss:[
["prompt","Write a thank-you email and close it with '<em>Sincerely</em>' followed by your name.","adv. 信件结尾敬语",M+" Write a thank-you email and close it with + O(Sincerely followed by your name)","写一封感谢邮件并以Sincerely加你的名字结尾。"],
["prompt","You are <em>sincerely</em> grateful for the help your professor provided during the semester.","adv. 修饰形容词grateful",M+" You are sincerely grateful + prep.phrase(for the help) + "+ATTR+" your professor provided during the semester","你真诚地感谢教授在学期中提供的帮助。"],
["prompt","Express how <em>sincerely</em> you appreciate the opportunity to participate in the research.","adv. 修饰动词appreciate",M+" Express + "+OBJ+" how sincerely you appreciate + O(the opportunity to participate in the research)","表达你多么真诚地感激参与研究的机会。"],
["instr","Close your email with a <em>sincere</em> expression of gratitude, such as '<em>Sincerely</em>.'","adv. 用作信件结尾",M+" 祈使句: Close + O(your email) + prep.phrase(with a sincere expression of gratitude)","以真诚的感谢语结束你的邮件，如Sincerely。"],
["instr","<em>Sincerely</em> thank the person for their time and effort.","adv. 修饰动词thank",M+" 祈使句: Sincerely thank + O(the person) + prep.phrase(for their time and effort)","真诚地感谢对方的时间和努力。"],
["email","I <em>sincerely</em> appreciate the time you spent helping me improve my presentation skills.","adv. 修饰动词appreciate",M+" I sincerely appreciate + O(the time) + "+ATTR+" you spent helping me improve my presentation skills","我真诚地感谢你花时间帮助我提高演讲技巧。"],
["email","I <em>sincerely</em> hope that we can continue to collaborate on future projects.","adv. 修饰动词hope",M+" I sincerely hope + "+OBJ+" that we can continue to collaborate on future projects","我真诚地希望我们能继续在未来的项目中合作。"],
["email","<em>Sincerely</em>,<br>Emily Johnson","adv. 信件结尾敬语",M+" 结尾敬语: Sincerely + 署名","此致，艾米莉·约翰逊"],
["cross","I am <em>sincerely</em> sorry for any inconvenience my absence may have caused.","adv. 修饰形容词sorry",M+" I am sincerely sorry + prep.phrase(for any inconvenience) + "+ATTR+" my absence may have caused","对于我缺席可能造成的任何不便我深表歉意。"],
["cross","We <em>sincerely</em> value your feedback and will work to improve our services.","adv. 修饰动词value",M+" We sincerely value + O(your feedback) + and + will work to improve + O(our services)","我们真诚地重视您的反馈，并将努力改善我们的服务。"]
]},

{w:"assistance",ph:"/əˈsɪstəns/",pos:"n",cn:"帮助",cat:"request",stars:2,ss:[
["prompt","You need <em>assistance</em> with your course selection. Write to your academic advisor.","n. 作宾语",M+" You need + O(assistance) + prep.phrase(with your course selection)","你在选课方面需要帮助。写信给你的学术顾问。"],
["prompt","Write an email requesting <em>assistance</em> with finding an internship opportunity.","n. 作宾语",M+" Write an email requesting + O(assistance) + prep.phrase(with finding an internship opportunity)","写一封邮件请求帮助寻找实习机会。"],
["prompt","You would like the IT department's <em>assistance</em> in recovering your lost files.","n. 作宾语",M+" You would like + O(the IT department's assistance) + prep.phrase(in recovering your lost files)","你希望IT部门帮助恢复你丢失的文件。"],
["instr","Request <em>assistance</em> from the appropriate office.","n. 作宾语",M+" 祈使句: Request + O(assistance) + prep.phrase(from the appropriate office)","向相关办公室请求帮助。"],
["instr","Explain why you need <em>assistance</em> and what kind of help would be most useful.","n. 作宾语",M+" 祈使句: Explain + "+OBJ+" why you need + O(assistance) + and + "+OBJ+" what kind of help would be most useful","解释你为什么需要帮助以及什么样的帮助最有用。"],
["email","I am writing to request your <em>assistance</em> with a matter related to my scholarship application.","n. 作宾语",M+" I am writing to request + O(your assistance) + prep.phrase(with a matter related to my scholarship application)","我写信是为了请求您帮助处理与我奖学金申请相关的事宜。"],
["email","Any <em>assistance</em> you could provide would be greatly appreciated.","n. 作主语",M+" Any assistance + "+ATTR+" you could provide + would be greatly appreciated","您能提供的任何帮助都将不胜感激。"],
["email","Thank you in advance for your <em>assistance</em> in resolving this issue.","n. 作介词宾语",M+" Thank you in advance + prep.phrase(for your assistance in resolving this issue)","提前感谢您在解决此问题方面的帮助。"],
["cross","The <em>assistance</em> I received from the tutoring center made a significant difference in my grades.","n. 作主语+定语从句",M+" The assistance + "+ATTR+" I received from the tutoring center + made + O(a significant difference) + prep.phrase(in my grades)","我从辅导中心获得的帮助对我的成绩产生了重大影响。"],
["cross","With your <em>assistance</em>, I was able to complete the registration process without any issues.","n. 在with介词短语中",M+" prep.phrase(With your assistance) + I was able to complete + O(the registration process) + prep.phrase(without any issues)","在您的帮助下，我顺利完成了注册流程。"]
]},

{w:"semester",ph:"/sɪˈmestər/",pos:"n",cn:"学期",cat:"all",stars:1,ss:[
["prompt","You had a wonderful experience this <em>semester</em>. Write to your professor to express your thanks.","n. 作时间状语",M+" You had + O(a wonderful experience) + prep.phrase(this semester)","你这学期有一段美好的经历。写信给教授表达感谢。"],
["prompt","At the end of the <em>semester</em>, you want to give feedback about the course.","n. 在介词短语中",M+" prep.phrase(At the end of the semester) + you want to give + O(feedback) + prep.phrase(about the course)","在学期末你想对课程提出反馈。"],
["prompt","You are starting a new <em>semester</em> and need to sort out a housing issue.","n. 作宾语",M+" You are starting + O(a new semester) + and + need to sort out + O(a housing issue)","你即将开始新学期，需要解决一个住房问题。"],
["instr","Mention which <em>semester</em> you are currently enrolled in.","n. 在which从句中",M+" 祈使句: Mention + "+OBJ+" which semester you are currently enrolled in","提及你目前注册的是哪个学期。"],
["instr","Explain how this <em>semester</em>'s workload has affected your schedule.","n. 所有格修饰名词",M+" 祈使句: Explain + "+OBJ+" how this semester's workload has affected + O(your schedule)","解释本学期的课业负担如何影响了你的日程。"],
["email","I have thoroughly enjoyed the biology course this <em>semester</em> and want to thank you.","n. 作时间状语",M+" I have thoroughly enjoyed + O(the biology course) + prep.phrase(this semester) + and + want to thank + O(you)","我非常喜欢这学期的生物课，想感谢您。"],
["email","This <em>semester</em>, I have been struggling to balance my coursework and part-time job.","n. 作时间状语(句首)",M+" prep.phrase(This semester) + I have been struggling to balance + O(my coursework and part-time job)","这学期我一直在努力平衡课业和兼职工作。"],
["email","I am planning to take an additional course next <em>semester</em> and would like your advice.","n. 在next修饰下作时间状语",M+" I am planning to take + O(an additional course) + prep.phrase(next semester) + and + would like + O(your advice)","我计划下学期多修一门课，想征求您的建议。"],
["cross","Many students reported similar issues with the dining hall during the fall <em>semester</em>.","n. 在修饰语中",M+" Many students reported + O(similar issues) + prep.phrase(with the dining hall) + "+TIM+" during the fall semester","许多学生在秋季学期反映了食堂的类似问题。"],
["cross","The scholarship is renewable each <em>semester</em> provided that you maintain a high GPA.","n. 在each修饰下",M+" The scholarship is renewable + prep.phrase(each semester) + "+COND+" provided that you maintain a high GPA","奖学金每学期可续，前提是你保持高GPA。"]
]},

{w:"dormitory",ph:"/ˈdɔːrmətɔːri/",pos:"n",cn:"宿舍",cat:"resolve",stars:1,ss:[
["prompt","You are having problems with the heating system in your <em>dormitory</em>. Write to the housing office.","n. 在所有格介词短语中",M+" You are having + O(problems) + prep.phrase(with the heating system in your dormitory)","你宿舍的供暖系统有问题。写信给住房办公室。"],
["prompt","Your <em>dormitory</em> roommate plays loud music late at night. Write an email to resolve the situation.","n. 作修饰语",M+" Your dormitory roommate plays + O(loud music) + prep.phrase(late at night)","你的宿舍室友深夜大声播放音乐。写一封邮件解决这种情况。"],
["prompt","Write to the residence advisor about the broken elevator in your <em>dormitory</em> building.","n. 作修饰语",M+" Write to the residence advisor + prep.phrase(about the broken elevator in your dormitory building)","写信给宿舍顾问关于你宿舍楼电梯坏了的事。"],
["instr","Describe the living conditions in your <em>dormitory</em> and suggest improvements.","n. 在介词短语中",M+" 祈使句: Describe + O(the living conditions) + prep.phrase(in your dormitory) + and + suggest + O(improvements)","描述你宿舍的生活条件并提出改进建议。"],
["instr","Explain the issue you are facing in the <em>dormitory</em> and propose a resolution.","n. 在介词短语中",M+" 祈使句: Explain + O(the issue) + "+ATTR+" you are facing in the dormitory + and + propose + O(a resolution)","解释你在宿舍面临的问题并提出解决方案。"],
["email","The Wi-Fi connection in our <em>dormitory</em> has been unreliable for the past two weeks.","n. 在介词短语中修饰Wi-Fi",M+" The Wi-Fi connection + prep.phrase(in our dormitory) + has been unreliable + prep.phrase(for the past two weeks)","我们宿舍的Wi-Fi连接在过去两周一直不稳定。"],
["email","I would like to request a room change within the same <em>dormitory</em> building.","n. 作修饰语",M+" I would like to request + O(a room change) + prep.phrase(within the same dormitory building)","我想申请在同一栋宿舍楼内换房间。"],
["email","Several residents in our <em>dormitory</em> have raised concerns about the cleanliness of shared bathrooms.","n. 在介词短语中",M+" Several residents + prep.phrase(in our dormitory) + have raised + O(concerns) + prep.phrase(about the cleanliness of shared bathrooms)","我们宿舍的几位住户对公共浴室的清洁度提出了担忧。"],
["cross","Moving into the <em>dormitory</em> at the beginning of the semester was an exciting experience.","n. 在动名词短语中",M+" "+PART+" Moving into the dormitory + prep.phrase(at the beginning of the semester) + was + O(an exciting experience)","学期初搬进宿舍是一段令人兴奋的经历。"],
["cross","The <em>dormitory</em> is conveniently located near the main campus library and dining hall.","n. 作主语",M+" The dormitory is conveniently located + prep.phrase(near the main campus library and dining hall)","宿舍位于主校区图书馆和食堂附近，位置便利。"]
]},

{w:"scholarship",ph:"/ˈskɑːlərʃɪp/",pos:"n",cn:"奖学金",cat:"request",stars:2,ss:[
["prompt","You want to apply for a <em>scholarship</em>. Write to the financial aid office for more information.","n. 作介词宾语",M+" You want to apply for + O(a scholarship)","你想申请奖学金。写信给财务援助办公室了解更多信息。"],
["prompt","You believe you qualify for a <em>scholarship</em> but have not received a response. Write a follow-up email.","n. 作介词宾语",M+" You believe + "+OBJ+" you qualify for + O(a scholarship) + "+CON+" but have not received + O(a response)","你认为你有资格获得奖学金但还没收到回复。写一封跟进邮件。"],
["prompt","Write an email to thank the committee for awarding you the <em>scholarship</em>.","n. 作宾语",M+" Write an email to thank + O(the committee) + prep.phrase(for awarding you the scholarship)","写一封邮件感谢委员会授予你奖学金。"],
["instr","Explain why you deserve the <em>scholarship</em> and how it will help you.","n. 作宾语",M+" 祈使句: Explain + "+OBJ+" why you deserve + O(the scholarship) + and + "+OBJ+" how it will help you","解释你为什么值得获得奖学金以及它如何帮助你。"],
["instr","Request details about the <em>scholarship</em> application requirements.","n. 作修饰语",M+" 祈使句: Request + O(details) + prep.phrase(about the scholarship application requirements)","请求关于奖学金申请要求的详情。"],
["email","I am writing to inquire about the eligibility criteria for the merit-based <em>scholarship</em>.","n. 作介词宾语",M+" I am writing to inquire + prep.phrase(about the eligibility criteria for the merit-based scholarship)","我写信是为了咨询基于成绩的奖学金的资格标准。"],
["email","Receiving this <em>scholarship</em> would greatly ease the financial burden on my family.","n. 作宾语(动名词短语主语)",M+" "+PART+" Receiving this scholarship + would greatly ease + O(the financial burden) + prep.phrase(on my family)","获得这份奖学金将大大减轻我家庭的经济负担。"],
["email","I have maintained a GPA of 3.8, which I believe meets the <em>scholarship</em> requirements.","n. 作修饰语",M+" I have maintained + O(a GPA of 3.8) + "+ATTR+" which I believe meets + O(the scholarship requirements)","我保持了3.8的GPA，我认为这符合奖学金要求。"],
["cross","The <em>scholarship</em> committee will announce the results at the end of the semester.","n. 作修饰语",M+" The scholarship committee will announce + O(the results) + "+TIM+" at the end of the semester","奖学金委员会将在学期末公布结果。"],
["cross","Thanks to the <em>scholarship</em>, I was able to focus on my studies without worrying about tuition.","n. 在thanks to短语中",M+" prep.phrase(Thanks to the scholarship) + I was able to focus on + O(my studies) + prep.phrase(without worrying about tuition)","多亏了奖学金，我得以专注学业而不用担心学费。"]
]},

{w:"registration",ph:"/ˌredʒɪˈstreɪʃn/",pos:"n",cn:"注册",cat:"request",stars:2,ss:[
["prompt","You had trouble with the course <em>registration</em> system. Write to the registrar's office.","n. 作修饰语",M+" You had + O(trouble) + prep.phrase(with the course registration system)","你在课程注册系统上遇到了问题。写信给注册办公室。"],
["prompt","The <em>registration</em> deadline has passed, but you still need to add a class. Write an email.","n. 作修饰语",M+" The registration deadline has passed + "+CON+" but you still need to add + O(a class)","注册截止日期已过，但你仍需要加一门课。写一封邮件。"],
["prompt","You missed the <em>registration</em> period due to a medical emergency. Email the academic office.","n. 作修饰语",M+" You missed + O(the registration period) + "+CAU+" due to a medical emergency","你因突发医疗紧急情况错过了注册期。给教务处发邮件。"],
["instr","Explain the problem you encountered during <em>registration</em>.","n. 在介词短语中",M+" 祈使句: Explain + O(the problem) + "+ATTR+" you encountered + "+TIM+" during registration","解释你在注册过程中遇到的问题。"],
["instr","Request an extension to the <em>registration</em> deadline.","n. 作修饰语",M+" 祈使句: Request + O(an extension) + prep.phrase(to the registration deadline)","请求延长注册截止日期。"],
["email","I attempted to complete my <em>registration</em> online, but the system displayed an error message.","n. 作宾语",M+" I attempted to complete + O(my registration) + adv(online) + "+CON+" but the system displayed + O(an error message)","我试图在网上完成注册，但系统显示了错误信息。"],
["email","Could you please assist me with my course <em>registration</em> for the upcoming semester?","n. 作修饰语",M+" Could you please assist + O(me) + prep.phrase(with my course registration for the upcoming semester)?","你能帮我注册下学期的课程吗？"],
["email","I would like to confirm that my <em>registration</em> for the summer program has been processed.","n. 作主语(that从句中)",M+" I would like to confirm + "+OBJ+" that my registration + prep.phrase(for the summer program) + has been processed","我想确认我的暑期项目注册已被处理。"],
["cross","Early <em>registration</em> is available for students who have completed more than sixty credits.","n. 作主语",M+" Early registration is available + prep.phrase(for students) + "+ATTR+" who have completed more than sixty credits","提前注册面向已修完六十学分以上的学生开放。"],
["cross","The <em>registration</em> office confirmed that the issue has been resolved and my schedule is now updated.","n. 作修饰语",M+" The registration office confirmed + "+OBJ+" that the issue has been resolved + and + my schedule is now updated","注册办公室确认问题已解决，我的课程表已更新。"]
]},

{w:"campus",ph:"/ˈkæmpəs/",pos:"n",cn:"校园",cat:"all",stars:1,ss:[
["prompt","You noticed a safety issue on <em>campus</em>. Write to the university administration.","n. 在介词短语中",M+" You noticed + O(a safety issue) + prep.phrase(on campus)","你注意到校园里的一个安全问题。写信给大学管理层。"],
["prompt","A new café has opened on <em>campus</em>, and you want to recommend it to a friend.","n. 在介词短语中",M+" A new café has opened + prep.phrase(on campus) + and + you want to recommend + O(it) + prep.phrase(to a friend)","校园里新开了一家咖啡馆，你想推荐给朋友。"],
["prompt","Write an email about the lack of recycling bins on <em>campus</em>.","n. 在介词短语中",M+" Write an email + prep.phrase(about the lack of recycling bins on campus)","写一封关于校园缺少回收箱的邮件。"],
["instr","Describe what you have observed on <em>campus</em> and why it concerns you.","n. 在介词短语中",M+" 祈使句: Describe + "+OBJ+" what you have observed on campus + and + "+OBJ+" why it concerns you","描述你在校园里观察到的情况以及为什么让你担忧。"],
["instr","Suggest improvements to the <em>campus</em> dining facilities.","n. 作修饰语",M+" 祈使句: Suggest + O(improvements) + prep.phrase(to the campus dining facilities)","建议改善校园餐饮设施。"],
["email","I have noticed that the lighting on the north side of <em>campus</em> is insufficient at night.","n. 在介词短语中",M+" I have noticed + "+OBJ+" that the lighting + prep.phrase(on the north side of campus) + is insufficient + prep.phrase(at night)","我注意到校园北侧夜间照明不足。"],
["email","The <em>campus</em> bookstore does not carry all the required textbooks for my courses.","n. 作修饰语",M+" The campus bookstore does not carry + O(all the required textbooks) + prep.phrase(for my courses)","校园书店没有我课程所需的所有教科书。"],
["email","I believe adding more benches around <em>campus</em> would benefit students who study outdoors.","n. 在介词短语中",M+" I believe + "+OBJ+" "+PART+" adding more benches around campus + would benefit + O(students) + "+ATTR+" who study outdoors","我认为在校园周围增加更多长椅会对在户外学习的学生有益。"],
["cross","The new <em>campus</em> shuttle service has made it much easier to commute between buildings.","n. 作修饰语",M+" The new campus shuttle service has made + O(it) + adj(much easier) + prep.phrase(to commute between buildings)","新的校园班车服务使在各建筑之间通勤方便多了。"],
["cross","Several <em>campus</em> organizations are planning a joint event to welcome incoming freshmen.","n. 作修饰语",M+" Several campus organizations are planning + O(a joint event) + "+PURP+" to welcome incoming freshmen","几个校园组织正在计划联合举办一场迎接新生的活动。"]
]},

{w:"venue",ph:"/ˈvenjuː/",pos:"n",cn:"场地",cat:"invite",stars:2,ss:[
["prompt","You are organizing a student event and need to reserve a <em>venue</em>. Write to the event coordinator.","n. 作宾语",M+" You are organizing + O(a student event) + and + need to reserve + O(a venue)","你正在组织一个学生活动，需要预订场地。写信给活动协调员。"],
["prompt","The <em>venue</em> for the concert was too small. Write an email with your feedback.","n. 作主语",M+" The venue + prep.phrase(for the concert) + was too small","音乐会的场地太小了。写一封反馈邮件。"],
["prompt","Write an email to invite your classmates to a gathering and suggest a <em>venue</em>.","n. 作宾语",M+" Write an email to invite + O(your classmates) + prep.phrase(to a gathering) + and + suggest + O(a venue)","写一封邮件邀请同学参加聚会并建议一个场地。"],
["instr","Suggest a suitable <em>venue</em> for the event and explain your choice.","n. 作宾语",M+" 祈使句: Suggest + O(a suitable venue) + prep.phrase(for the event) + and + explain + O(your choice)","为活动建议一个合适的场地并解释你的选择。"],
["instr","Describe the ideal <em>venue</em> for the team-building retreat.","n. 作宾语",M+" 祈使句: Describe + O(the ideal venue) + prep.phrase(for the team-building retreat)","描述团建活动的理想场地。"],
["email","I would like to suggest the student center as the <em>venue</em> for our end-of-year celebration.","n. 作介词宾语(as)",M+" I would like to suggest + O(the student center) + prep.phrase(as the venue for our end-of-year celebration)","我想建议学生活动中心作为我们年终庆祝活动的场地。"],
["email","The <em>venue</em> should be large enough to accommodate at least one hundred guests.","n. 作主语",M+" The venue should be large enough + "+PURP+" to accommodate + O(at least one hundred guests)","场地应该足够大以容纳至少一百位客人。"],
["email","Could you confirm whether the outdoor <em>venue</em> has a backup plan in case of rain?","n. 作主语(whether从句中)",M+" Could you confirm + "+OBJ+" whether the outdoor venue has + O(a backup plan) + "+COND+" in case of rain?","你能确认户外场地是否有下雨的备用方案吗？"],
["cross","The <em>venue</em> we chose last year received excellent feedback from all the attendees.","n. 作主语+定语从句",M+" The venue + "+ATTR+" we chose last year + received + O(excellent feedback) + prep.phrase(from all the attendees)","我们去年选择的场地得到了所有参加者的好评。"],
["cross","Choosing the right <em>venue</em> is essential for ensuring a successful and enjoyable event.","n. 作宾语(动名词短语中)",M+" "+PART+" Choosing the right venue + is essential + "+PURP+" for ensuring a successful and enjoyable event","选择合适的场地对于确保活动成功和愉快至关重要。"]
]},

{w:"implement",ph:"/ˈɪmplɪment/",pos:"v",cn:"实施",cat:"suggest",stars:2,ss:[
["prompt","You think the university should <em>implement</em> a new recycling program. Write to the dean.","v. implement + 名词宾语",M+" You think + "+OBJ+" the university should implement + O(a new recycling program)","你认为大学应该实施新的回收计划。写信给院长。"],
["prompt","Write an email suggesting that the school <em>implement</em> a peer tutoring system.","v. implement + 名词宾语(虚拟语气)",M+" Write an email suggesting + "+OBJ+" that the school implement + O(a peer tutoring system)","写一封邮件建议学校实施同伴辅导制度。"],
["prompt","The student council plans to <em>implement</em> changes to the club funding process. Share your ideas.","v. implement + 名词宾语",M+" The student council plans to implement + O(changes) + prep.phrase(to the club funding process)","学生会计划对社团资金流程实施改革。分享你的想法。"],
["instr","Suggest a policy the university could <em>implement</em> to improve campus safety.","v. 在定语从句中",M+" 祈使句: Suggest + O(a policy) + "+ATTR+" the university could implement + "+PURP+" to improve campus safety","建议大学可以实施的一项提高校园安全的政策。"],
["instr","Explain how the proposed plan could be <em>implemented</em> effectively.","v. 被动语态 be implemented",M+" 祈使句: Explain + "+OBJ+" how the proposed plan could be implemented + adv(effectively)","解释拟议的计划如何能有效实施。"],
["email","I believe the university should <em>implement</em> a flexible scheduling system for final exams.","v. implement + 名词宾语",M+" I believe + "+OBJ+" the university should implement + O(a flexible scheduling system) + prep.phrase(for final exams)","我认为大学应该为期末考试实施灵活的排期制度。"],
["email","If the school were to <em>implement</em> this change, it would benefit a large number of students.","v. 在虚拟条件句中",M+" "+COND+" If the school were to implement + O(this change) + it would benefit + O(a large number of students)","如果学校实施这一变革，将会使大量学生受益。"],
["email","I suggest that the administration <em>implement</em> a mentorship program for first-year students.","v. 虚拟语气 suggest that ... implement",M+" I suggest + "+OBJ+" that the administration implement + O(a mentorship program) + prep.phrase(for first-year students)","我建议行政部门为大一学生实施导师计划。"],
["cross","Other universities have successfully <em>implemented</em> similar programs with positive results.","v. 现在完成时 have implemented",M+" Other universities have successfully implemented + O(similar programs) + prep.phrase(with positive results)","其他大学已经成功实施了类似的项目并取得了积极成果。"],
["cross","Once the plan is <em>implemented</em>, students should notice improvements in the dining services.","v. 被动语态 is implemented",M+" "+TIM+" Once the plan is implemented + students should notice + O(improvements) + prep.phrase(in the dining services)","一旦计划实施，学生应该会注意到餐饮服务的改善。"]
]},

{w:"volunteer",ph:"/ˌvɑːlənˈtɪr/",pos:"n/v",cn:"志愿者/志愿服务",cat:"suggest",stars:1,ss:[
["prompt","You want to <em>volunteer</em> at a community event. Write to the organizer to offer your help.","v. volunteer at + 地点",M+" You want to volunteer + prep.phrase(at a community event)","你想在社区活动中做志愿服务。写信给组织者提供帮助。"],
["prompt","Write an email suggesting that more students should <em>volunteer</em> at the campus food bank.","v. volunteer at + 地点",M+" Write an email suggesting + "+OBJ+" that more students should volunteer + prep.phrase(at the campus food bank)","写一封邮件建议更多学生在校园食物银行做志愿服务。"],
["prompt","You had a great experience as a <em>volunteer</em> last semester. Write to thank the coordinator.","n. 作表语/介词宾语",M+" You had + O(a great experience) + prep.phrase(as a volunteer) + prep.phrase(last semester)","你上学期做志愿者有很好的经历。写信感谢协调员。"],
["instr","Explain why you would like to <em>volunteer</em> and what skills you can contribute.","v. volunteer 不及物",M+" 祈使句: Explain + "+OBJ+" why you would like to volunteer + and + "+OBJ+" what skills you can contribute","解释你为什么想做志愿服务以及你能贡献什么技能。"],
["instr","Suggest ways to recruit more <em>volunteers</em> for the charity drive.","n. 复数形式作宾语",M+" 祈使句: Suggest + O(ways to recruit more volunteers) + prep.phrase(for the charity drive)","建议为慈善活动招募更多志愿者的方法。"],
["email","I would like to <em>volunteer</em> for the upcoming orientation week to help welcome new students.","v. volunteer for + 活动",M+" I would like to volunteer + prep.phrase(for the upcoming orientation week) + "+PURP+" to help welcome new students","我想为即将到来的迎新周做志愿服务以帮助欢迎新生。"],
["email","As an experienced <em>volunteer</em>, I can help train newcomers and manage the schedule.","n. 作同位语修饰主语",M+" prep.phrase(As an experienced volunteer) + I can help train + O(newcomers) + and + manage + O(the schedule)","作为一名有经验的志愿者，我可以帮助培训新人和管理日程。"],
["email","I am writing to <em>volunteer</em> my time for the annual campus cleanup event.","v. volunteer + 名词宾语",M+" I am writing to volunteer + O(my time) + prep.phrase(for the annual campus cleanup event)","我写信是为了自愿为年度校园清洁活动贡献时间。"],
["cross","The <em>volunteers</em> who participated in the event received certificates of appreciation.","n. 复数作主语+定语从句",M+" The volunteers + "+ATTR+" who participated in the event + received + O(certificates of appreciation)","参与活动的志愿者获得了感谢证书。"],
["cross","<em>Volunteering</em> not only benefits the community but also helps students develop leadership skills.","v. 动名词作主语",M+" "+PART+" Volunteering + not only benefits + O(the community) + but also helps + O(students) + develop + O(leadership skills)","志愿服务不仅有益于社区，还帮助学生培养领导能力。"]
]},

{w:"suggest",ph:"/səˈdʒɛst/",pos:"v",cn:"建议",cat:"all",stars:1,ss:[
["prompt","The email <em>suggests</em> that the library should extend its weekend hours for students.","v. suggest + that宾语从句，主语为 the email",M+" The email suggests + "+OBJ+" that the library should extend its weekend hours","邮件建议图书馆应延长周末开放时间。"],
["prompt","Your roommate <em>suggests</em> hosting a study group in the dormitory lounge.","v. suggest + V-ing 宾语，主语为 roommate",M+" Your roommate suggests + O(hosting a study group) + prep.phrase(in the dormitory lounge)","你的室友建议在宿舍休息室组织学习小组。"],
["prompt","The professor <em>suggested</em> that each student find a research partner before the deadline.","v. suggest + that虚拟语气从句",M+" The professor suggested + "+OBJ+" that each student find a research partner + "+TIM+" before the deadline","教授建议每个学生在截止日期前找到一个研究伙伴。"],
["instr","<em>Suggest</em> ways to improve the dining hall menu.","v. 祈使句中的指令动词",M+" 祈使句: Suggest + O(ways to improve the dining hall menu)","建议改善食堂菜单的方法。"],
["instr","<em>Suggest</em> a solution that would satisfy both parties.","v. 祈使句 + that定语从句",M+" 祈使句: Suggest + O(a solution) + "+ATTR+" that would satisfy both parties","建议一个能让双方都满意的方案。"],
["email","I would like to <em>suggest</em> that we reschedule the meeting to next Friday.","v. would like to suggest + that从句",M+" I would like to suggest + "+OBJ+" that we reschedule the meeting to next Friday","我想建议我们把会议改到下周五。"],
["email","May I <em>suggest</em> an alternative approach to organizing the fundraiser?","v. May I suggest + 名词宾语",M+" May I suggest + O(an alternative approach) + prep.phrase(to organizing the fundraiser)","我可以建议一种组织筹款活动的替代方案吗？"],
["email","I <em>suggest</em> contacting the maintenance office before the problem gets worse.","v. suggest + V-ing 宾语 + 时间状语从句",M+" I suggest + O(contacting the maintenance office) + "+TIM+" before the problem gets worse","我建议在问题恶化之前联系维修办公室。"],
["cross","Several students <em>suggested</em> that the campus bookstore offer more affordable options.","v. suggest + that虚拟语气从句（投诉场景）",M+" Several students suggested + "+OBJ+" that the campus bookstore offer more affordable options","几位学生建议校园书店提供更实惠的选择。"],
["cross","My advisor <em>suggested</em> I participate in the volunteer program to gain experience.","v. suggest + 省略that的宾语从句（活动场景）",M+" My advisor suggested + "+OBJ+" I participate in the volunteer program + "+PURP+" to gain experience","我的导师建议我参加志愿者项目来积累经验。"]
]},

{w:"request",ph:"/rɪˈkwɛst/",pos:"v/n",cn:"请求",cat:"all",stars:1,ss:[
["prompt","The student submitted a <em>request</em> to change dormitory rooms due to noise issues.","n. 作宾语，后接不定式",M+" The student submitted + O(a request to change dormitory rooms) + "+CAU+" due to noise issues","该学生因噪音问题提交了换宿舍的请求。"],
["prompt","Your <em>request</em> for a schedule adjustment has been forwarded to the academic office.","n. 作主语，后接 for 介词短语",M+" Your request + prep.phrase(for a schedule adjustment) + has been forwarded + prep.phrase(to the academic office)","你调整课表的请求已转交至教务处。"],
["prompt","The email asks you to <em>request</em> additional resources for the group project.","v. 不定式作宾补",M+" The email asks you + "+PURP+" to request + O(additional resources) + prep.phrase(for the group project)","邮件要求你为小组项目请求额外资源。"],
["instr","<em>Request</em> a replacement or a refund for the damaged item.","v. 祈使句中的指令动词",M+" 祈使句: Request + O(a replacement or a refund) + prep.phrase(for the damaged item)","请求更换或退还损坏的物品。"],
["instr","<em>Request</em> a meeting with your professor to discuss your concerns.","v. 祈使句 + 不定式目的状语",M+" 祈使句: Request + O(a meeting) + prep.phrase(with your professor) + "+PURP+" to discuss your concerns","请求与教授会面讨论你的顾虑。"],
["email","I am writing to <em>request</em> a full refund for the defective product.","v. 不定式作目的状语",M+" I am writing + "+PURP+" to request + O(a full refund) + prep.phrase(for the defective product)","我写信是为了请求对缺陷产品全额退款。"],
["email","I would like to formally <em>request</em> an extension on the assignment deadline.","v. would like to + adv + V",M+" I would like to formally request + O(an extension) + prep.phrase(on the assignment deadline)","我想正式请求延长作业截止日期。"],
["email","Could I <em>request</em> your assistance in resolving this billing issue?","v. Could I + V + 名词宾语",M+" Could I request + O(your assistance) + "+PART+" in resolving this billing issue","我能请求你帮忙解决这个账单问题吗？"],
["cross","We would like to <em>request</em> a vegetarian menu option for the team dinner.","v. 用于邀请/计划场景",M+" We would like to request + O(a vegetarian menu option) + prep.phrase(for the team dinner)","我们想为团队晚餐请求提供素食菜单选项。"],
["cross","I <em>request</em> that the university address the parking shortage on campus.","v. request + that虚拟语气从句（解决问题场景）",M+" I request + "+OBJ+" that the university address the parking shortage on campus","我请求大学解决校园停车位不足的问题。"]
]},

{w:"mention",ph:"/ˈmɛnʃən/",pos:"v",cn:"提到",cat:"all",stars:1,ss:[
["prompt","The notice <em>mentions</em> that the cafeteria will be closed for renovation next week.","v. mention + that宾语从句",M+" The notice mentions + "+OBJ+" that the cafeteria will be closed for renovation next week","通知提到食堂下周将因装修关闭。"],
["prompt","Your friend <em>mentioned</em> a scholarship opportunity in her last email.","v. mention + 名词宾语（过去时）",M+" Your friend mentioned + O(a scholarship opportunity) + "+TIM+" in her last email","你的朋友在上封邮件中提到了一个奖学金机会。"],
["prompt","The course syllabus <em>mentions</em> a mandatory field trip in the final week.","v. mention + 名词宾语，主语为物",M+" The course syllabus mentions + O(a mandatory field trip) + "+TIM+" in the final week","课程大纲提到最后一周有一次必修的实地考察。"],
["instr","<em>Mention</em> how much you enjoy the yoga classes at the recreation center.","v. 祈使句 + how程度从句",M+" 祈使句: Mention + "+OBJ+" how much you enjoy the yoga classes + prep.phrase(at the recreation center)","提到你多么喜欢娱乐中心的瑜伽课。"],
["instr","<em>Mention</em> what you found most valuable about the workshop.","v. 祈使句 + what名词性从句",M+" 祈使句: Mention + "+OBJ+" what you found most valuable about the workshop","提到你觉得研讨会最有价值的地方。"],
["email","I wanted to <em>mention</em> that the heating system in my room has not been working properly.","v. wanted to mention + that从句",M+" I wanted to mention + "+OBJ+" that the heating system in my room has not been working properly","我想提一下我房间的暖气系统一直运转不正常。"],
["email","I should also <em>mention</em> that several other students have experienced the same problem.","v. should mention + that从句",M+" I should also mention + "+OBJ+" that several other students have experienced the same problem","我也应该提到其他几位学生也遇到了同样的问题。"],
["email","As I <em>mentioned</em> in my previous email, the deadline is approaching quickly.","v. as引导的方式状语从句",TIM+" As I mentioned in my previous email, + "+M+" the deadline is approaching quickly","正如我在之前的邮件中提到的，截止日期正在快速临近。"],
["cross","She <em>mentioned</em> that the concert tickets were selling out fast.","v. mention + that从句（感谢/赞扬场景）",M+" She mentioned + "+OBJ+" that the concert tickets were selling out fast","她提到音乐会的票卖得很快。"],
["cross","Could you <em>mention</em> my contribution when you present the project to the committee?","v. 请求句中（解决问题场景）",M+" Could you mention + O(my contribution) + "+TIM+" when you present the project to the committee","你在向委员会展示项目时能提到我的贡献吗？"]
]},

{w:"offer",ph:"/ˈɔːfər/",pos:"v",cn:"提供;主动提出",cat:"all",stars:1,ss:[
["prompt","The university <em>offers</em> free tutoring sessions for students who need academic support.","v. offer + 名词宾语 + for介词短语",M+" The university offers + O(free tutoring sessions) + prep.phrase(for students) + "+ATTR+" who need academic support","大学为需要学术支持的学生提供免费辅导课程。"],
["prompt","The campus gym <em>offers</em> a variety of fitness classes throughout the semester.","v. offer + 名词宾语 + 时间状语",M+" The campus gym offers + O(a variety of fitness classes) + "+TIM+" throughout the semester","校园健身房在整个学期提供各种健身课程。"],
["prompt","Your neighbor <em>offered</em> to help you move into the new apartment.","v. offer + to do 不定式",M+" Your neighbor offered + "+PURP+" to help you move into the new apartment","你的邻居主动提出帮你搬进新公寓。"],
["instr","<em>Offer</em> to help organize the event as a way to contribute.","v. 祈使句 + to do 不定式",M+" 祈使句: Offer + "+PURP+" to help organize the event + prep.phrase(as a way to contribute)","主动提出帮忙组织活动以作为贡献。"],
["instr","<em>Offer</em> specific suggestions for improving the library services.","v. 祈使句 + 名词宾语",M+" 祈使句: Offer + O(specific suggestions) + prep.phrase(for improving the library services)","提供改善图书馆服务的具体建议。"],
["email","I would like to <em>offer</em> my assistance with the upcoming orientation event.","v. would like to offer + 名词宾语",M+" I would like to offer + O(my assistance) + prep.phrase(with the upcoming orientation event)","我想为即将到来的迎新活动提供我的帮助。"],
["email","The store <em>offered</em> me a discount, but I would prefer a full replacement.","v. offer + IO + DO（双宾语），but转折",M+" The store offered me a discount, + "+CON+" but I would prefer a full replacement","商店给了我折扣，但我更希望完全更换。"],
["email","May I <em>offer</em> a few thoughts on how to make the event more inclusive?","v. May I offer + 名词宾语 + on介词短语",M+" May I offer + O(a few thoughts) + prep.phrase(on how to make the event more inclusive)","我可以就如何使活动更具包容性提几点想法吗？"],
["cross","The restaurant <em>offers</em> catering services that would be perfect for our group dinner.","v. offer + 名词宾语 + 定语从句（邀请场景）",M+" The restaurant offers + O(catering services) + "+ATTR+" that would be perfect for our group dinner","这家餐厅提供的宴会服务非常适合我们的团体聚餐。"],
["cross","I <em>offered</em> to tutor him in math since he was struggling with the coursework.","v. offer + to do（请求帮助场景）",M+" I offered to tutor him in math + "+CAU+" since he was struggling with the coursework","因为他在课程作业上有困难，我主动提出辅导他数学。"]
]},

{w:"recommend",ph:"/ˌrɛkəˈmɛnd/",pos:"v",cn:"推荐",cat:"suggest",stars:1,ss:[
["prompt","The academic advisor <em>recommends</em> that you take a lighter course load next semester.","v. recommend + that虚拟语气从句",M+" The academic advisor recommends + "+OBJ+" that you take a lighter course load next semester","学术顾问建议你下学期选少一些课程。"],
["prompt","A classmate <em>recommended</em> a study app that helps with time management.","v. recommend + 名词宾语 + 定语从句",M+" A classmate recommended + O(a study app) + "+ATTR+" that helps with time management","一位同学推荐了一款帮助时间管理的学习应用。"],
["prompt","The brochure <em>recommends</em> visiting the museum during weekday mornings for shorter queues.","v. recommend + V-ing 宾语",M+" The brochure recommends + O(visiting the museum) + "+TIM+" during weekday mornings + "+PURP+" for shorter queues","宣传册建议在工作日上午参观博物馆以避开长队。"],
["instr","<em>Recommend</em> a specific restaurant for the farewell dinner.","v. 祈使句 + 名词宾语",M+" 祈使句: Recommend + O(a specific restaurant) + prep.phrase(for the farewell dinner)","推荐一家具体的餐厅用于欢送晚宴。"],
["instr","<em>Recommend</em> activities that would appeal to international students.","v. 祈使句 + 名词宾语 + 定语从句",M+" 祈使句: Recommend + O(activities) + "+ATTR+" that would appeal to international students","推荐能吸引国际学生的活动。"],
["email","I would highly <em>recommend</em> the Italian restaurant on Oak Street for our celebration.","v. would recommend + 名词宾语",M+" I would highly recommend + O(the Italian restaurant on Oak Street) + prep.phrase(for our celebration)","我强烈推荐橡树街上的意大利餐厅用于我们的庆祝活动。"],
["email","Based on my experience, I <em>recommend</em> signing up for the writing workshop early.","v. recommend + V-ing（基于经验）",M+" Based on my experience, + "+M+" I recommend + O(signing up for the writing workshop early)","根据我的经验，我推荐尽早报名写作研讨会。"],
["email","I <em>recommend</em> that the student council consider extending library hours during finals.","v. recommend + that虚拟语气从句",M+" I recommend + "+OBJ+" that the student council consider extending library hours + "+TIM+" during finals","我建议学生会考虑在期末考试期间延长图书馆开放时间。"],
["cross","Can you <em>recommend</em> a tutor who specializes in organic chemistry?","v. 用于请求帮助场景 + 定语从句",M+" Can you recommend + O(a tutor) + "+ATTR+" who specializes in organic chemistry","你能推荐一位专门教有机化学的辅导老师吗？"],
["cross","My professor <em>recommended</em> that I reach out to the career center for internship opportunities.","v. recommend + that从句（解决问题场景）",M+" My professor recommended + "+OBJ+" that I reach out to the career center + "+PURP+" for internship opportunities","我的教授建议我联系就业中心获取实习机会。"]
]},

{w:"appreciate",ph:"/əˈpriːʃieɪt/",pos:"v",cn:"感激;欣赏",cat:"thank",stars:1,ss:[
["prompt","The student wrote an email to say she <em>appreciates</em> the professor's extra office hours.","v. appreciate + 名词宾语（that从句内）",M+" The student wrote an email + "+PURP+" to say + "+OBJ+" she appreciates the professor's extra office hours","学生写了封邮件表示她感激教授额外的办公时间。"],
["prompt","Many residents <em>appreciate</em> the new recycling program the university has introduced.","v. appreciate + 名词宾语 + 定语从句",M+" Many residents appreciate + O(the new recycling program) + "+ATTR+" the university has introduced","许多住户感激大学推出的新回收计划。"],
["prompt","The community <em>appreciates</em> the effort volunteers put into organizing the charity event.","v. appreciate + 名词宾语 + 定语从句",M+" The community appreciates + O(the effort) + "+ATTR+" volunteers put into organizing the charity event","社区感激志愿者们为组织慈善活动所付出的努力。"],
["instr","Express how much you <em>appreciate</em> the support you received.","v. 在指令中 how much + appreciate",M+" 祈使句: Express + "+OBJ+" how much you appreciate + O(the support) + "+ATTR+" you received","表达你多么感激你所获得的支持。"],
["instr","<em>Appreciate</em> their contribution and explain how it helped your project.","v. 祈使句 + and并列",M+" 祈使句: Appreciate + O(their contribution) + and + Explain + "+OBJ+" how it helped your project","感谢他们的贡献并解释它如何帮助了你的项目。"],
["email","I truly <em>appreciate</em> the time you took to review my application.","v. appreciate + 名词宾语 + 定语从句",M+" I truly appreciate + O(the time) + "+ATTR+" you took to review my application","我真的很感激你抽出时间审阅我的申请。"],
["email","I cannot <em>appreciate</em> enough how helpful your guidance has been throughout the semester.","v. cannot appreciate enough + how从句",M+" I cannot appreciate enough + "+OBJ+" how helpful your guidance has been + "+TIM+" throughout the semester","我无法充分表达你的指导在整个学期中有多大帮助。"],
["email","We <em>appreciate</em> your prompt response to our maintenance request.","v. appreciate + 名词宾语",M+" We appreciate + O(your prompt response) + prep.phrase(to our maintenance request)","我们感谢你对我们维修请求的迅速回复。"],
["cross","Although I <em>appreciate</em> the store's quick reply, the issue remains unresolved.","v. 让步状语从句中（投诉场景）",CON+" Although I appreciate the store's quick reply, + "+M+" the issue remains unresolved","虽然我感激商店的快速回复，但问题仍未解决。"],
["cross","I <em>appreciate</em> you inviting me to join the planning committee for the spring festival.","v. appreciate + 动名词宾语（邀请场景）",M+" I appreciate + O(you inviting me) + "+PURP+" to join the planning committee + prep.phrase(for the spring festival)","我感谢你邀请我加入春节策划委员会。"]
]},

{w:"purchase",ph:"/ˈpɜːrtʃəs/",pos:"v/n",cn:"购买",cat:"complain",stars:1,ss:[
["prompt","You recently <em>purchased</em> a laptop from the campus electronics store.","v. 过去时，场景描述",M+" You recently purchased + O(a laptop) + prep.phrase(from the campus electronics store)","你最近从校园电子产品商店购买了一台笔记本电脑。"],
["prompt","The <em>purchase</em> was made online and the item arrived in damaged condition.","n. 作主语 + 被动语态",M+" The purchase was made online + and + M the item arrived in damaged condition","购买是在网上完成的，物品到达时已损坏。"],
["prompt","After making the <em>purchase</em>, you noticed several defects in the product.","n. 介词 after + V-ing + 名词",TIM+" After making the purchase, + "+M+" you noticed + O(several defects in the product)","购买后，你注意到产品有几处缺陷。"],
["instr","Describe what you <em>purchased</em> and when the problem occurred.","v. 在指令从句中（过去时）",M+" 祈使句: Describe + "+OBJ+" what you purchased + and + "+OBJ+" when the problem occurred","描述你购买了什么以及问题何时发生的。"],
["instr","Explain why the <em>purchase</em> did not meet your expectations.","n. 在指令从句中作主语",M+" 祈使句: Explain + "+OBJ+" why the purchase did not meet your expectations","解释为什么此次购买没有达到你的期望。"],
["email","I <em>purchased</em> a bookshelf from your store on March 5th, and it arrived with a cracked panel.","v. 过去时 + 并列句",M+" I purchased a bookshelf from your store + "+TIM+" on March 5th, + and + M it arrived with a cracked panel","我于3月5日从贵店购买了一个书架，到货时有一块面板开裂。"],
["email","The item I <em>purchased</em> does not match the description on your website.","v. 定语从句中修饰 item",M+" The item + "+ATTR+" I purchased + does not match + O(the description on your website)","我购买的商品与你们网站上的描述不符。"],
["email","I have the receipt for the <em>purchase</em> and can provide it upon request.","n. 作介词宾语",M+" I have the receipt + prep.phrase(for the purchase) + and + M can provide it upon request","我有购买凭证，可以应要求提供。"],
["cross","I <em>purchased</em> tickets for the charity concert you recommended.","v. 用于感谢/赞扬场景",M+" I purchased + O(tickets for the charity concert) + "+ATTR+" you recommended","我买了你推荐的慈善音乐会的票。"],
["cross","Before making any <em>purchase</em>, I always check online reviews for quality assurance.","n. 用于建议场景（跨主题）",TIM+" Before making any purchase, + "+M+" I always check online reviews + "+PURP+" for quality assurance","在购买任何东西之前，我总是查看网上评价以保证质量。"]
]},

{w:"damage",ph:"/ˈdæmɪdʒ/",pos:"n/v",cn:"损坏",cat:"complain",stars:1,ss:[
["prompt","The furniture was <em>damaged</em> during shipping and several parts were broken.","v. 被动语态 + 并列句",M+" The furniture was damaged + "+TIM+" during shipping + and + M several parts were broken","家具在运输过程中损坏了，几个部件都碎了。"],
["prompt","There is visible <em>damage</em> to the screen of the tablet you ordered.","n. 作主语补语 + 后置介词短语",M+" There is visible damage + prep.phrase(to the screen of the tablet) + "+ATTR+" you ordered","你订购的平板电脑屏幕有明显损坏。"],
["prompt","The <em>damage</em> appears to have occurred before the package was delivered.","n. 作主语 + 不定式完成时",M+" The damage appears to have occurred + "+TIM+" before the package was delivered","损坏似乎在包裹送达之前就已经发生了。"],
["instr","Describe the <em>damage</em> to the item in detail.","n. 在指令中作宾语",M+" 祈使句: Describe + O(the damage to the item) + prep.phrase(in detail)","详细描述物品的损坏情况。"],
["instr","Explain how the <em>damage</em> has affected your ability to use the product.","n. 在指令 how 从句中作主语",M+" 祈使句: Explain + "+OBJ+" how the damage has affected your ability to use the product","解释损坏如何影响了你使用该产品。"],
["email","Upon opening the box, I discovered significant <em>damage</em> to the top shelf.","n. 介词upon + V-ing + 主句",TIM+" Upon opening the box, + "+M+" I discovered + O(significant damage to the top shelf)","打开箱子后，我发现顶层架板有严重损坏。"],
["email","The <em>damage</em> is so severe that the item is completely unusable.","n. so...that 结果状语从句",M+" The damage is so severe + "+CAU+" that the item is completely unusable","损坏如此严重，以至于该物品完全无法使用。"],
["email","I have attached photos showing the <em>damage</em> for your reference.","n. 现在分词短语后置定语",M+" I have attached photos + "+PART+" showing the damage + prep.phrase(for your reference)","我附上了显示损坏情况的照片供你参考。"],
["cross","The water leak <em>damaged</em> several textbooks I need for my final exams.","v. 用于请求帮助场景",M+" The water leak damaged + O(several textbooks) + "+ATTR+" I need for my final exams","漏水损坏了我期末考试需要的几本教科书。"],
["cross","If the venue is <em>damaged</em> by the storm, we may need to find an alternative location.","v. 被动语态在条件从句中（邀请场景）",COND+" If the venue is damaged by the storm, + "+M+" we may need to find an alternative location","如果场地被暴风雨损坏，我们可能需要找一个替代地点。"]
]},

{w:"replacement",ph:"/rɪˈpleɪsmənt/",pos:"n",cn:"替换品",cat:"complain",stars:2,ss:[
["prompt","The customer is requesting a <em>replacement</em> for the broken appliance.","n. 作宾语 + for短语",M+" The customer is requesting + O(a replacement) + prep.phrase(for the broken appliance)","顾客正在请求更换损坏的电器。"],
["prompt","You would like the company to send a <em>replacement</em> as soon as possible.","n. 作宾语 + 时间状语",M+" You would like the company to send + O(a replacement) + "+TIM+" as soon as possible","你希望公司尽快寄送替换品。"],
["prompt","The store has offered a <em>replacement</em>, but you prefer a refund instead.","n. 作宾语 + 转折",M+" The store has offered a replacement, + "+CON+" but you prefer a refund instead","商店提出更换，但你更希望退款。"],
["instr","Request a <em>replacement</em> and explain why you believe it is necessary.","n. 在指令中作宾语 + 并列",M+" 祈使句: Request + O(a replacement) + and + Explain + "+OBJ+" why you believe + "+OBJ+" it is necessary","请求更换并解释你为什么认为这是必要的。"],
["instr","Suggest whether you would prefer a <em>replacement</em> or a refund.","n. 在指令 whether 从句中",M+" 祈使句: Suggest + "+OBJ+" whether you would prefer a replacement or a refund","建议你更希望更换还是退款。"],
["email","I would appreciate it if you could send a <em>replacement</em> at your earliest convenience.","n. 在条件从句中作宾语",M+" I would appreciate it + "+COND+" if you could send a replacement + "+TIM+" at your earliest convenience","如果您能尽早寄送替换品，我将不胜感激。"],
["email","Since the product is under warranty, I believe I am entitled to a free <em>replacement</em>.","n. 作介词宾语 + 原因状语",CAU+" Since the product is under warranty, + "+M+" I believe + "+OBJ+" I am entitled to a free replacement","由于产品在保修期内，我认为我有权获得免费更换。"],
["email","Could you please confirm when I can expect to receive the <em>replacement</em>?","n. 作宾语在 when 从句中",M+" Could you please confirm + "+OBJ+" when I can expect to receive the replacement","请问我何时可以收到替换品？"],
["cross","The library offered a <em>replacement</em> copy of the textbook I accidentally damaged.","n. 用于请求帮助场景",M+" The library offered + O(a replacement copy of the textbook) + "+ATTR+" I accidentally damaged","图书馆提供了我不小心损坏的那本教科书的替换本。"],
["cross","We need a <em>replacement</em> speaker for the conference since Professor Lee cancelled.","n. 用于解决问题场景",M+" We need a replacement speaker + prep.phrase(for the conference) + "+CAU+" since Professor Lee cancelled","由于李教授取消了，我们需要一位替代演讲者参加会议。"]
]},

{w:"refund",ph:"/ˈriːfʌnd/",pos:"n",cn:"退款",cat:"complain",stars:2,ss:[
["prompt","The student is hoping to receive a full <em>refund</em> for the unused meal plan.","n. 作宾语 + for短语",M+" The student is hoping to receive + O(a full refund) + prep.phrase(for the unused meal plan)","该学生希望获得未使用餐饮计划的全额退款。"],
["prompt","You paid for a workshop that was cancelled and you want a <em>refund</em>.","n. 作宾语 + 并列句",M+" You paid for a workshop + "+ATTR+" that was cancelled + and + M you want a refund","你付了一个被取消的研讨会的费用，你想要退款。"],
["prompt","The company's policy states that <em>refunds</em> must be requested within 30 days.","n. 复数作主语 + that同位语从句",M+" The company's policy states + "+OBJ+" that refunds must be requested within 30 days","公司政策规定退款必须在30天内申请。"],
["instr","Request a <em>refund</em> and provide the reason for your dissatisfaction.","n. 在指令中作宾语",M+" 祈使句: Request + O(a refund) + and + Provide + O(the reason for your dissatisfaction)","请求退款并说明你不满意的原因。"],
["instr","Explain why you believe a <em>refund</em> is warranted in this situation.","n. 在 why 从句中作主语",M+" 祈使句: Explain + "+OBJ+" why you believe + "+OBJ+" a refund is warranted in this situation","解释你为什么认为在这种情况下退款是合理的。"],
["email","I am writing to request a full <em>refund</em> for order number 20456.","n. 作宾语 + for短语",M+" I am writing + "+PURP+" to request + O(a full refund) + prep.phrase(for order number 20456)","我写信是为了请求订单号20456的全额退款。"],
["email","If a replacement is not available, I would like to receive a <em>refund</em> instead.","n. 在条件句主句中作宾语",COND+" If a replacement is not available, + "+M+" I would like to receive a refund instead","如果无法更换，我希望获得退款。"],
["email","I kindly ask that the <em>refund</em> be processed to my original payment method.","n. ask + that虚拟语气 + 被动",M+" I kindly ask + "+OBJ+" that the refund be processed + prep.phrase(to my original payment method)","我恳请将退款退回到我原来的支付方式。"],
["cross","After receiving a <em>refund</em>, I decided to purchase a different brand.","n. 用于建议场景（跨主题）",TIM+" After receiving a refund, + "+M+" I decided to purchase a different brand","收到退款后，我决定购买另一个品牌。"],
["cross","The <em>refund</em> process was smooth, which I truly appreciate.","n. 用于感谢场景（跨主题）",M+" The refund process was smooth, + "+ATTR+" which I truly appreciate","退款过程很顺利，对此我非常感激。"]
]},

{w:"disappoint",ph:"/ˌdɪsəˈpɔɪnt/",pos:"v",cn:"使失望",cat:"complain",stars:2,ss:[
["prompt","The quality of the product <em>disappointed</em> the customer who had high expectations.","v. 过去时 + 定语从句",M+" The quality of the product disappointed + O(the customer) + "+ATTR+" who had high expectations","产品质量让抱有高期望的顾客感到失望。"],
["prompt","You were <em>disappointed</em> to find that the hotel room did not match the online photos.","v. 被动 + 不定式",M+" You were disappointed + "+PURP+" to find + "+OBJ+" that the hotel room did not match the online photos","你失望地发现酒店房间与网上照片不符。"],
["prompt","The students were <em>disappointed</em> with the limited food options at the campus event.","v. 被动 + with介词短语",M+" The students were disappointed + prep.phrase(with the limited food options at the campus event)","学生们对校园活动有限的食物选择感到失望。"],
["instr","Explain why you were <em>disappointed</em> with the service you received.","v. 被动形式在 why 从句中",M+" 祈使句: Explain + "+OBJ+" why you were disappointed + prep.phrase(with the service you received)","解释你为什么对所受到的服务感到失望。"],
["instr","Describe what <em>disappointed</em> you about the experience.","v. 主动形式在 what 从句中",M+" 祈使句: Describe + "+OBJ+" what disappointed you about the experience","描述是什么让你对这次经历感到失望。"],
["email","I must say I was deeply <em>disappointed</em> with the condition of the product upon arrival.","v. 被动 + with短语",M+" I must say + "+OBJ+" I was deeply disappointed + prep.phrase(with the condition of the product upon arrival)","我必须说，我对产品到货时的状况深感失望。"],
["email","It <em>disappoints</em> me that such a reputable company would deliver a defective item.","v. it disappoints me + that从句",M+" It disappoints me + "+OBJ+" that such a reputable company would deliver a defective item","像如此有信誉的公司竟然交付了有缺陷的产品，这让我失望。"],
["email","I was <em>disappointed</em> to discover that the warranty does not cover this type of damage.","v. 被动 + to do 不定式",M+" I was disappointed + "+PURP+" to discover + "+OBJ+" that the warranty does not cover this type of damage","我失望地发现保修不涵盖此类损坏。"],
["cross","Although the concert venue was nice, the sound quality <em>disappointed</em> many attendees.","v. 让步状语中（反馈场景）",CON+" Although the concert venue was nice, + "+M+" the sound quality disappointed many attendees","虽然音乐会场地不错，但音质让许多观众失望。"],
["cross","I don't want to <em>disappoint</em> my group members, so I will complete my part on time.","v. 用于解决问题场景",M+" I don't want to disappoint my group members, + "+CAU+" so I will complete my part on time","我不想让组员失望，所以我会按时完成我的部分。"]
]},

{w:"issue",ph:"/ˈɪʃuː/",pos:"n",cn:"问题",cat:"all",stars:1,ss:[
["prompt","There is a recurring <em>issue</em> with the internet connection in the dormitory.","n. there is + 名词 + with短语",M+" There is a recurring issue + prep.phrase(with the internet connection in the dormitory)","宿舍的网络连接有一个反复出现的问题。"],
["prompt","The main <em>issue</em> is that the air conditioning in the classroom is not working.","n. 作主语 + that表语从句",M+" The main issue is + "+OBJ+" that the air conditioning in the classroom is not working","主要问题是教室的空调不工作了。"],
["prompt","Several students have raised the same <em>issue</em> about the parking situation on campus.","n. 作宾语 + about短语",M+" Several students have raised the same issue + prep.phrase(about the parking situation on campus)","几位学生提出了同样的关于校园停车情况的问题。"],
["instr","Describe the <em>issue</em> you encountered and suggest a solution.","n. 在指令中作宾语 + 并列",M+" 祈使句: Describe + O(the issue) + "+ATTR+" you encountered + and + Suggest + O(a solution)","描述你遇到的问题并建议一个解决方案。"],
["instr","Explain how this <em>issue</em> has affected your daily routine.","n. 在 how 从句中作主语",M+" 祈使句: Explain + "+OBJ+" how this issue has affected your daily routine","解释这个问题如何影响了你的日常生活。"],
["email","I am writing to bring an urgent <em>issue</em> to your attention.","n. 作宾语 + to短语",M+" I am writing + "+PURP+" to bring + O(an urgent issue) + prep.phrase(to your attention)","我写信是为了提请您注意一个紧急问题。"],
["email","This <em>issue</em> has been ongoing for two weeks and still has not been resolved.","n. 作主语 + 现在完成进行时",M+" This issue has been ongoing for two weeks + and + M still has not been resolved","这个问题已经持续两周了，仍未解决。"],
["email","I hope we can work together to address this <em>issue</em> promptly.","n. 在不定式短语中作宾语",M+" I hope + "+OBJ+" we can work together + "+PURP+" to address this issue promptly","我希望我们能一起及时解决这个问题。"],
["cross","The <em>issue</em> with the group project is that not everyone is contributing equally.","n. 用于解决问题场景 + that表语从句",M+" The issue with the group project is + "+OBJ+" that not everyone is contributing equally","小组项目的问题是并非每个人都做出了同等贡献。"],
["cross","Thank you for resolving the <em>issue</em> so quickly; I really appreciate your efficiency.","n. 用于感谢场景",M+" Thank you for resolving the issue so quickly; + M I really appreciate your efficiency","感谢你这么快解决了问题；我真的很感激你的效率。"]
]},

{w:"struggle",ph:"/ˈstrʌɡəl/",pos:"v",cn:"挣扎;困难",cat:"request",stars:1,ss:[
["prompt","The student has been <em>struggling</em> with the advanced calculus course this semester.","v. 现在完成进行时 + with短语",M+" The student has been struggling + prep.phrase(with the advanced calculus course) + "+TIM+" this semester","这个学生这学期在高级微积分课程上一直很吃力。"],
["prompt","Many first-year students <em>struggle</em> to balance academics and social life.","v. struggle + to do 不定式",M+" Many first-year students struggle + "+PURP+" to balance + O(academics and social life)","许多大一学生在平衡学业和社交生活方面感到困难。"],
["prompt","You have been <em>struggling</em> with your assignments because of a heavy workload.","v. 现在完成进行时 + 原因状语",M+" You have been struggling with your assignments + "+CAU+" because of a heavy workload","由于繁重的工作量，你一直在为作业发愁。"],
["instr","Explain what you have been <em>struggling</em> with and ask for specific help.","v. 在 what 从句中 + 现在完成进行时",M+" 祈使句: Explain + "+OBJ+" what you have been struggling with + and + Ask for + O(specific help)","解释你一直在哪些方面有困难并寻求具体帮助。"],
["instr","Describe how <em>struggling</em> with the material has affected your confidence.","v. 动名词短语作主语在 how 从句中",M+" 祈使句: Describe + "+OBJ+" how struggling with the material has affected your confidence","描述在这门课上的困难如何影响了你的信心。"],
["email","I have been <em>struggling</em> with the recent assignments and would appreciate your guidance.","v. 现在完成进行时 + 并列句",M+" I have been struggling with the recent assignments + and + M would appreciate your guidance","我最近在作业上一直有困难，希望能得到您的指导。"],
["email","Honestly, I <em>struggle</em> to keep up with the pace of the lectures.","v. struggle + to do 不定式",M+" Honestly, I struggle + "+PURP+" to keep up with the pace of the lectures","老实说，我很难跟上讲座的进度。"],
["email","Since I have been <em>struggling</em>, I was wondering if you could recommend a tutor.","v. 原因状语从句 + 主句请求",CAU+" Since I have been struggling, + "+M+" I was wondering + "+COND+" if you could recommend a tutor","因为我一直有困难，我想知道您能否推荐一位辅导老师。"],
["cross","Some team members are <em>struggling</em> to meet the project deadline.","v. 用于解决问题场景",M+" Some team members are struggling + "+PURP+" to meet the project deadline","一些团队成员在赶项目截止日期方面有困难。"],
["cross","I used to <em>struggle</em> with public speaking, but the workshop really helped.","v. 用于感谢场景",M+" I used to struggle with public speaking, + "+CON+" but the workshop really helped","我以前在公开演讲方面有困难，但研讨会真的很有帮助。"]
]},

{w:"improve",ph:"/ɪmˈpruːv/",pos:"v",cn:"改善;提高",cat:"request",stars:1,ss:[
["prompt","The university is looking for ways to <em>improve</em> campus safety and security.","v. 不定式作后置定语",M+" The university is looking for ways + "+PURP+" to improve + O(campus safety and security)","大学正在寻找改善校园安全的方法。"],
["prompt","You want to <em>improve</em> your writing skills before the final exam.","v. want to + V",M+" You want to improve + O(your writing skills) + "+TIM+" before the final exam","你想在期末考试前提高写作技能。"],
["prompt","The dining hall has <em>improved</em> its menu based on student feedback.","v. 现在完成时 + based on短语",M+" The dining hall has improved its menu + "+PART+" based on student feedback","食堂根据学生反馈改善了菜单。"],
["instr","Suggest how the university could <em>improve</em> the registration process.","v. 在 how 从句中 + could",M+" 祈使句: Suggest + "+OBJ+" how the university could improve the registration process","建议大学如何改善注册流程。"],
["instr","Explain what steps you plan to take to <em>improve</em> your performance.","v. 不定式在 what 从句中",M+" 祈使句: Explain + "+OBJ+" what steps you plan to take + "+PURP+" to improve your performance","解释你计划采取什么步骤来提高你的表现。"],
["email","I am writing to ask for advice on how to <em>improve</em> my understanding of the course material.","v. on how to + V",M+" I am writing + "+PURP+" to ask for advice + prep.phrase(on how to improve my understanding of the course material)","我写信是为了请教如何提高我对课程材料的理解。"],
["email","I believe these changes would significantly <em>improve</em> the overall student experience.","v. would + V 虚拟/推测",M+" I believe + "+OBJ+" these changes would significantly improve the overall student experience","我认为这些变化将显著改善学生的整体体验。"],
["email","Your feedback has helped me <em>improve</em> my essay structure considerably.","v. help + O + V 原形",M+" Your feedback has helped me improve + O(my essay structure) + adv(considerably)","您的反馈帮助我大大改善了论文结构。"],
["cross","The new sound system will <em>improve</em> the audio quality at future campus events.","v. 用于投诉反馈场景",M+" The new sound system will improve + O(the audio quality) + "+TIM+" at future campus events","新的音响系统将改善未来校园活动的音频质量。"],
["cross","Participating in the study group <em>improved</em> my grades and my confidence.","v. 用于感谢场景（动名词主语）",M+" "+PART+" Participating in the study group + improved + O(my grades and my confidence)","参加学习小组提高了我的成绩和信心。"]
]},

{w:"advice",ph:"/ədˈvaɪs/",pos:"n",cn:"建议",cat:"request",stars:1,ss:[
["prompt","The student is seeking <em>advice</em> from a professor about choosing a major.","n. 作宾语 + from/about短语",M+" The student is seeking advice + prep.phrase(from a professor) + prep.phrase(about choosing a major)","该学生正在向教授寻求选专业的建议。"],
["prompt","Your academic advisor has offered <em>advice</em> on how to manage your course schedule.","n. 作宾语 + on how从句",M+" Your academic advisor has offered advice + prep.phrase(on how to manage your course schedule)","你的学术顾问就如何管理课程表提供了建议。"],
["prompt","You need <em>advice</em> on balancing a part-time job with your studies.","n. 作宾语 + on V-ing",M+" You need advice + prep.phrase(on balancing a part-time job with your studies)","你需要关于如何平衡兼职工作和学业的建议。"],
["instr","Ask for <em>advice</em> on how to prepare for the upcoming presentation.","n. 在指令中 + on how不定式",M+" 祈使句: Ask for + O(advice) + prep.phrase(on how to prepare for the upcoming presentation)","就如何准备即将到来的演讲寻求建议。"],
["instr","Mention any <em>advice</em> you have already received and explain why you need more help.","n. 在指令中作宾语 + 并列",M+" 祈使句: Mention + O(any advice) + "+ATTR+" you have already received + and + Explain + "+OBJ+" why you need more help","提到你已经收到的建议并解释为什么你需要更多帮助。"],
["email","I would greatly appreciate your <em>advice</em> on this matter.","n. 作宾语 + on短语",M+" I would greatly appreciate + O(your advice) + prep.phrase(on this matter)","我将非常感激您在这件事上的建议。"],
["email","Could you offer some <em>advice</em> on how I can improve my research methodology?","n. 作宾语 + on how从句",M+" Could you offer some advice + prep.phrase(on how I can improve my research methodology)","您能就我如何改善研究方法提供一些建议吗？"],
["email","Following your <em>advice</em>, I have started attending the writing center sessions.","n. 在分词短语中作宾语",PART+" Following your advice, + "+M+" I have started attending the writing center sessions","遵照您的建议，我已经开始参加写作中心的辅导课了。"],
["cross","Her <em>advice</em> about the travel itinerary was incredibly helpful for our trip.","n. 用于感谢场景 + about短语",M+" Her advice + prep.phrase(about the travel itinerary) + was incredibly helpful + prep.phrase(for our trip)","她关于旅行行程的建议对我们的旅行非常有帮助。"],
["cross","My <em>advice</em> would be to file a complaint directly with customer service.","n. 用于投诉场景 + would be to do",M+" My advice would be + "+PURP+" to file a complaint + prep.phrase(directly with customer service)","我的建议是直接向客服投诉。"]
]},

{w:"inquire",ph:"/ɪnˈkwaɪər/",pos:"v",cn:"询问",cat:"request",stars:2,ss:[
["prompt","The student wants to <em>inquire</em> about available internship opportunities for the summer.","v. inquire + about短语",M+" The student wants to inquire + prep.phrase(about available internship opportunities for the summer)","该学生想询问暑期实习机会。"],
["prompt","A parent called to <em>inquire</em> about the university's housing policies.","v. 不定式表目的 + about短语",M+" A parent called + "+PURP+" to inquire + prep.phrase(about the university's housing policies)","一位家长打电话询问大学的住宿政策。"],
["prompt","You are writing an email to <em>inquire</em> about the process for transferring credits.","v. 不定式表目的",M+" You are writing an email + "+PURP+" to inquire + prep.phrase(about the process for transferring credits)","你正在写邮件询问学分转换的流程。"],
["instr","<em>Inquire</em> about the deadline for submitting the application.","v. 祈使句 + about短语",M+" 祈使句: Inquire + prep.phrase(about the deadline for submitting the application)","询问提交申请的截止日期。"],
["instr","<em>Inquire</em> whether financial aid is available for the workshop.","v. 祈使句 + whether从句",M+" 祈使句: Inquire + "+OBJ+" whether financial aid is available for the workshop","询问该研讨会是否有助学金。"],
["email","I am writing to <em>inquire</em> about the availability of single rooms in the graduate dormitory.","v. 不定式表目的 + about短语",M+" I am writing + "+PURP+" to inquire + prep.phrase(about the availability of single rooms in the graduate dormitory)","我写信是为了询问研究生宿舍单人间的空余情况。"],
["email","I would like to <em>inquire</em> whether it is possible to switch to a different lab section.","v. would like to + V + whether从句",M+" I would like to inquire + "+OBJ+" whether it is possible to switch to a different lab section","我想询问是否可以换到另一个实验课班组。"],
["email","Could I <em>inquire</em> about the estimated timeline for processing my application?","v. Could I + V + about短语",M+" Could I inquire + prep.phrase(about the estimated timeline for processing my application)","我能否询问处理我申请的预计时间？"],
["cross","I also wanted to <em>inquire</em> about group discounts for the upcoming conference.","v. 用于邀请/计划场景",M+" I also wanted to inquire + prep.phrase(about group discounts for the upcoming conference)","我还想询问即将举行的会议是否有团体折扣。"],
["cross","Before filing a complaint, I would like to <em>inquire</em> about your return policy.","v. 用于投诉场景 + 时间状语",TIM+" Before filing a complaint, + "+M+" I would like to inquire + prep.phrase(about your return policy)","在提出投诉之前，我想询问一下你们的退货政策。"]
]},

{w:"contribute",ph:"/kənˈtrɪbjuːt/",pos:"v",cn:"贡献",cat:"resolve",stars:1,ss:[
["prompt","Each group member is expected to <em>contribute</em> equally to the final presentation.","v. be expected to + V + 副词",M+" Each group member is expected to contribute equally + prep.phrase(to the final presentation)","每位组员都应为期末演示做出同等贡献。"],
["prompt","One member of the team has not been <em>contributing</em> to the group project.","v. 现在完成进行时 + to短语",M+" One member of the team has not been contributing + prep.phrase(to the group project)","团队中有一名成员一直没有为小组项目做贡献。"],
["prompt","Students who <em>contribute</em> actively in class discussions receive higher participation grades.","v. 定语从句中 + 副词",M+" Students receive higher participation grades + "+ATTR+" who contribute actively in class discussions","积极参与课堂讨论的学生获得更高的参与分。"],
["instr","Suggest ways he can <em>contribute</em> more effectively to the project.","v. 在 ways 后的定语从句中",M+" 祈使句: Suggest + O(ways) + "+ATTR+" he can contribute more effectively to the project","建议他如何更有效地为项目做贡献。"],
["instr","Explain how you plan to <em>contribute</em> to the team going forward.","v. 在 how 从句中 + plan to",M+" 祈使句: Explain + "+OBJ+" how you plan to contribute to the team going forward","解释你计划今后如何为团队做贡献。"],
["email","I am willing to <em>contribute</em> extra hours to make sure we finish on time.","v. be willing to + V + 目的状语",M+" I am willing to contribute extra hours + "+PURP+" to make sure we finish on time","我愿意多花时间以确保我们按时完成。"],
["email","I hope everyone can <em>contribute</em> their ideas during our next meeting.","v. hope + that从句（省略that）",M+" I hope + "+OBJ+" everyone can contribute their ideas + "+TIM+" during our next meeting","我希望大家在下次会议上都能贡献自己的想法。"],
["email","I would like to <em>contribute</em> by taking on the research portion of the assignment.","v. would like to + V + by V-ing",M+" I would like to contribute + "+PART+" by taking on the research portion of the assignment","我想通过承担作业的研究部分来做出贡献。"],
["cross","The volunteers <em>contributed</em> their time and effort to make the charity event a success.","v. 用于感谢场景",M+" The volunteers contributed their time and effort + "+PURP+" to make the charity event a success","志愿者们贡献了时间和精力使慈善活动取得成功。"],
["cross","I would love to <em>contribute</em> a dish to the potluck dinner you are organizing.","v. 用于邀请/计划场景",M+" I would love to contribute a dish + prep.phrase(to the potluck dinner) + "+ATTR+" you are organizing","我很乐意为你组织的百乐餐晚宴贡献一道菜。"]
]},

{w:"participate",ph:"/pɑːrˈtɪsɪpeɪt/",pos:"v",cn:"参与",cat:"resolve",stars:1,ss:[
["prompt","All students are encouraged to <em>participate</em> in the annual science fair.","v. be encouraged to + V",M+" All students are encouraged to participate + prep.phrase(in the annual science fair)","所有学生都被鼓励参加年度科学展。"],
["prompt","One team member has refused to <em>participate</em> in group meetings.","v. refuse to + V",M+" One team member has refused to participate + prep.phrase(in group meetings)","一名团队成员拒绝参加小组会议。"],
["prompt","You were invited to <em>participate</em> in a research project led by Professor Chen.","v. be invited to + V",M+" You were invited to participate + prep.phrase(in a research project) + "+PART+" led by Professor Chen","你被邀请参加陈教授主导的一个研究项目。"],
["instr","Explain why it is important for everyone to <em>participate</em> in the group work.","v. it is important + for sb to + V",M+" 祈使句: Explain + "+OBJ+" why it is important + prep.phrase(for everyone) + "+PURP+" to participate in the group work","解释为什么每个人参与小组工作很重要。"],
["instr","Describe how you plan to <em>participate</em> in the upcoming community event.","v. 在 how 从句中 + plan to",M+" 祈使句: Describe + "+OBJ+" how you plan to participate in the upcoming community event","描述你计划如何参加即将举行的社区活动。"],
["email","I am eager to <em>participate</em> in the workshop and learn more about data analysis.","v. be eager to + V + and并列",M+" I am eager to participate in the workshop + and + M learn more about data analysis","我渴望参加研讨会并学习更多关于数据分析的知识。"],
["email","Unfortunately, I will not be able to <em>participate</em> in the meeting due to a schedule conflict.","v. will not be able to + V + 原因状语",M+" Unfortunately, I will not be able to participate in the meeting + "+CAU+" due to a schedule conflict","遗憾的是，由于时间冲突，我无法参加会议。"],
["email","I encourage all members to actively <em>participate</em> so that we can meet our deadline.","v. encourage + O + to V + so that目的从句",M+" I encourage all members to actively participate + "+PURP+" so that we can meet our deadline","我鼓励所有成员积极参与，以便我们能赶上截止日期。"],
["cross","Thank you for encouraging me to <em>participate</em> in the debate competition.","v. 用于感谢场景",M+" Thank you for encouraging me to participate + prep.phrase(in the debate competition)","感谢你鼓励我参加辩论赛。"],
["cross","If more students <em>participate</em> in the survey, the results will be more reliable.","v. 用于建议场景 + 条件从句",COND+" If more students participate in the survey, + "+M+" the results will be more reliable","如果更多学生参与调查，结果将更加可靠。"]
]},

{w:"affect",ph:"/əˈfɛkt/",pos:"v",cn:"影响",cat:"resolve",stars:1,ss:[
["prompt","The construction noise is <em>affecting</em> students' ability to concentrate in the library.","v. 现在进行时 + 名词宾语",M+" The construction noise is affecting + O(students' ability to concentrate in the library)","施工噪音正在影响学生们在图书馆集中注意力的能力。"],
["prompt","The schedule change will <em>affect</em> all students enrolled in morning classes.","v. will + V + 名词宾语",M+" The schedule change will affect + O(all students) + "+PART+" enrolled in morning classes","课程时间变更将影响所有选修早间课程的学生。"],
["prompt","The budget cuts have already <em>affected</em> several campus programs.","v. 现在完成时 + 名词宾语",M+" The budget cuts have already affected + O(several campus programs)","预算削减已经影响了几个校园项目。"],
["instr","Explain how this situation has <em>affected</em> your academic performance.","v. 在 how 从句中 + 现在完成时",M+" 祈使句: Explain + "+OBJ+" how this situation has affected your academic performance","解释这种情况如何影响了你的学业成绩。"],
["instr","Describe how the problem <em>affects</em> not only you but also other residents.","v. 在 how 从句中 + not only...but also",M+" 祈使句: Describe + "+OBJ+" how the problem affects not only you but also other residents","描述这个问题不仅影响你也影响其他住户。"],
["email","This issue has seriously <em>affected</em> my ability to complete assignments on time.","v. 现在完成时 + 名词宾语",M+" This issue has seriously affected + O(my ability to complete assignments on time)","这个问题严重影响了我按时完成作业的能力。"],
["email","The water damage has <em>affected</em> the entire fourth floor of the dormitory.","v. 现在完成时 + 名词宾语",M+" The water damage has affected + O(the entire fourth floor of the dormitory)","水损已经影响了宿舍的整个四楼。"],
["email","I wanted to let you know how this delay is <em>affecting</em> our project timeline.","v. 在 how 从句中 + 现在进行时",M+" I wanted to let you know + "+OBJ+" how this delay is affecting our project timeline","我想让你知道这个延误如何影响着我们的项目时间表。"],
["cross","The poor sound quality <em>affected</em> my overall enjoyment of the concert.","v. 用于投诉场景",M+" The poor sound quality affected + O(my overall enjoyment of the concert)","糟糕的音质影响了我对音乐会的整体享受。"],
["cross","Moving to a new dormitory will positively <em>affect</em> my study habits.","v. 用于请求帮助场景",M+" Moving to a new dormitory will positively affect + O(my study habits)","搬到新宿舍将积极影响我的学习习惯。"]
]},

{w:"resolve",ph:"/rɪˈzɒlv/",pos:"v",cn:"解决",cat:"resolve",stars:2,ss:[
["prompt","The students need to <em>resolve</em> a conflict within their group before the presentation.","v. need to + V + 时间状语",M+" The students need to resolve + O(a conflict within their group) + "+TIM+" before the presentation","学生们需要在演示之前解决组内的冲突。"],
["prompt","The university has promised to <em>resolve</em> the dormitory maintenance issues by next month.","v. promise to + V + 时间状语",M+" The university has promised to resolve + O(the dormitory maintenance issues) + "+TIM+" by next month","大学承诺在下个月之前解决宿舍维修问题。"],
["prompt","You are writing to your roommate to <em>resolve</em> a disagreement about shared expenses.","v. 不定式表目的",M+" You are writing to your roommate + "+PURP+" to resolve + O(a disagreement about shared expenses)","你正在给室友写信以解决关于分摊费用的分歧。"],
["instr","Suggest how the issue could be <em>resolved</em> in a fair manner.","v. 被动 + 方式状语",M+" 祈使句: Suggest + "+OBJ+" how the issue could be resolved in a fair manner","建议如何以公平的方式解决问题。"],
["instr","Explain what steps should be taken to <em>resolve</em> this problem.","v. 不定式表目的在 what 从句中",M+" 祈使句: Explain + "+OBJ+" what steps should be taken + "+PURP+" to resolve this problem","解释应采取哪些步骤来解决这个问题。"],
["email","I hope we can <em>resolve</em> this matter without further delay.","v. hope + that从句（省略that）",M+" I hope + "+OBJ+" we can resolve this matter + prep.phrase(without further delay)","我希望我们能毫不拖延地解决这件事。"],
["email","I am confident that we can <em>resolve</em> this disagreement if we communicate openly.","v. 在 that 从句中 + 条件状语",M+" I am confident + "+OBJ+" that we can resolve this disagreement + "+COND+" if we communicate openly","我相信如果我们坦诚沟通，我们能解决这个分歧。"],
["email","To <em>resolve</em> this issue, I suggest we schedule a meeting with the department head.","v. 不定式目的状语前置 + 主句",PURP+" To resolve this issue, + "+M+" I suggest + "+OBJ+" we schedule a meeting with the department head","为了解决这个问题，我建议我们安排与系主任会面。"],
["cross","The store manager promised to <em>resolve</em> my complaint within five business days.","v. 用于投诉场景",M+" The store manager promised to resolve + O(my complaint) + "+TIM+" within five business days","店长承诺在五个工作日内解决我的投诉。"],
["cross","Once we <em>resolve</em> the scheduling conflict, I would love to join the study group.","v. 用于邀请场景 + once时间从句",TIM+" Once we resolve the scheduling conflict, + "+M+" I would love to join the study group","一旦我们解决了时间冲突，我很乐意加入学习小组。"]
]},

// ====== 43-62: Batch 43-62 (modify → thoroughly) ======

{w:"modify",ph:"/ˈmɒdɪfaɪ/",pos:"v",cn:"调整;修改",cat:"request",stars:2,ss:[
["prompt","You signed up for a meal plan but have dietary restrictions. Write an email to <em>modify</em> your current plan.","v. to + V 不定式表目的",M+" Write an email + "+PURP+" to modify + O(your current plan)","你注册了一个餐饮计划但有饮食限制。写邮件修改你目前的计划。"],
["prompt","Your professor assigned a group project, but the timeline does not work for you. Ask to <em>modify</em> the schedule.","v. ask to + V",M+" Ask + "+PURP+" to modify + O(the schedule)","教授布置了小组项目，但时间安排不适合你。请求修改日程。"],
["prompt","The hotel reservation you made has errors. Write an email to <em>modify</em> the booking details.","v. to + V 不定式表目的",M+" Write an email + "+PURP+" to modify + O(the booking details)","你的酒店预订有误。写邮件修改预订详情。"],
["instr","<em>Modify</em> your request to reflect the updated dietary needs.","v. 祈使句，modify + O",M+" 祈使句: Modify + O(your request) + "+PURP+" to reflect the updated dietary needs","修改你的请求以反映更新的饮食需求。"],
["instr","Ask the coordinator to <em>modify</em> the event arrangement based on your feedback.","v. ask sb. to + V",M+" Ask the coordinator + "+PURP+" to modify + O(the event arrangement) + "+CAU+" based on your feedback","请协调员根据你的反馈修改活动安排。"],
["email","I am writing to ask if it would be possible to <em>modify</em> my registration details.","v. to modify 不定式作宾补",M+" I am writing to ask + "+OBJ+" if it would be possible to modify + O(my registration details)","我写信是想问是否可以修改我的注册信息。"],
["email","Could you please <em>modify</em> the seating arrangement so that our group can sit together?","v. 请求句 Could you + V",M+" Could you please modify + O(the seating arrangement) + "+PURP+" so that our group can sit together?","你能否修改座位安排以便我们小组可以坐在一起？"],
["email","I would appreciate it if you could <em>modify</em> the delivery date to next Friday.","v. 在if条件从句中",M+" I would appreciate it + "+COND+" if you could modify + O(the delivery date) + prep.phrase(to next Friday)","如果你能将交货日期改为下周五我将不胜感激。"],
["cross","The manager agreed to <em>modify</em> the refund policy after receiving numerous complaints.","v. agree to + V，投诉场景",M+" The manager agreed + "+PURP+" to modify + O(the refund policy) + "+TIM+" after receiving numerous complaints","经理在收到大量投诉后同意修改退款政策。"],
["cross","We need to <em>modify</em> the agenda to accommodate the guest speaker's availability.","v. need to + V，邀请场景",M+" We need to modify + O(the agenda) + "+PURP+" to accommodate the guest speaker's availability","我们需要修改议程以适应演讲嘉宾的时间。"]
]},

{w:"specific",ph:"/spəˈsɪfɪk/",pos:"adj",cn:"具体的",cat:"request",stars:1,ss:[
["prompt","Write an email to your professor asking for <em>specific</em> feedback on your essay.","adj. 前置定语修饰 feedback",M+" Write an email + "+PURP+" asking for specific feedback + prep.phrase(on your essay)","写邮件给教授请求关于你论文的具体反馈。"],
["prompt","You had a problem with an online order. Provide <em>specific</em> details about the issue.","adj. 前置定语修饰 details",M+" Provide + O(specific details) + prep.phrase(about the issue)","你的网上订单出了问题。提供关于该问题的具体细节。"],
["prompt","Describe the <em>specific</em> changes you would like to make to your dormitory assignment.","adj. 前置定语修饰 changes",M+" Describe + O(the specific changes) + "+ATTR+" you would like to make + prep.phrase(to your dormitory assignment)","描述你希望对宿舍分配做出的具体更改。"],
["instr","Be <em>specific</em> about the dates and times that work for you.","adj. 表语，be specific about",M+" 祈使句: Be specific + prep.phrase(about the dates and times) + "+ATTR+" that work for you","具体说明适合你的日期和时间。"],
["instr","Provide <em>specific</em> examples to support your request for a schedule change.","adj. 前置定语修饰 examples",M+" 祈使句: Provide + O(specific examples) + "+PURP+" to support your request + prep.phrase(for a schedule change)","提供具体例子来支持你更改日程的请求。"],
["email","I would like to share some <em>specific</em> concerns about the noise level in the dormitory.","adj. 前置定语修饰 concerns",M+" I would like to share + O(some specific concerns) + prep.phrase(about the noise level in the dormitory)","我想分享一些关于宿舍噪音水平的具体担忧。"],
["email","To be more <em>specific</em>, the package arrived three days late and the box was torn open.","adj. 表语，To be more specific 插入语",M+" To be more specific(插入语) + the package arrived three days late + and + the box was torn open","具体来说，包裹迟到三天而且箱子被撕开了。"],
["email","Could you provide a <em>specific</em> timeline for when the replacement will be shipped?","adj. 前置定语修饰 timeline",M+" Could you provide + O(a specific timeline) + "+ATTR+" for when the replacement will be shipped?","你能否提供替换品何时发货的具体时间表？"],
["cross","The invitation should include <em>specific</em> instructions on how to reach the venue.","adj. 前置定语，邀请场景",M+" The invitation should include + O(specific instructions) + prep.phrase(on "+OBJ+" how to reach the venue)","邀请函应包含如何到达场地的具体说明。"],
["cross","I <em>specifically</em> asked for a vegetarian meal, but the wrong option was delivered.","adv. 修饰动词 asked，投诉场景",M+" I specifically asked + prep.phrase(for a vegetarian meal) + but + "+M+" the wrong option was delivered","我明确要求了素食餐，但送来的是错误的选项。"]
]},

{w:"discomfort",ph:"/dɪsˈkʌmfərt/",pos:"n",cn:"不适",cat:"request",stars:2,ss:[
["prompt","You are experiencing <em>discomfort</em> in your dormitory due to a broken heater. Write an email to request a repair.","n. 作experiencing的宾语",M+" You are experiencing discomfort + "+CAU+" due to a broken heater","你因暖气坏了在宿舍感到不适。写邮件请求维修。"],
["prompt","The new desk chair is causing you physical <em>discomfort</em>. Email the housing office to ask for a replacement.","n. 作causing的宾语",M+" The new desk chair is causing + O(you) + O(physical discomfort)","新的办公椅让你身体不适。邮件联系住房办公室要求更换。"],
["prompt","Write to the campus health center about the <em>discomfort</em> you have been experiencing in the library.","n. 作介词about的宾语",M+" Write to the campus health center + prep.phrase(about the discomfort) + "+ATTR+" you have been experiencing","写信给校园健康中心说明你在图书馆经历的不适。"],
["instr","Describe the <em>discomfort</em> you are experiencing and suggest a possible solution.","n. 作describe的宾语",M+" 祈使句: Describe + O(the discomfort) + "+ATTR+" you are experiencing + and + suggest + O(a possible solution)","描述你正在经历的不适并提出可能的解决方案。"],
["instr","Explain how the <em>discomfort</em> is affecting your ability to focus on your studies.","n. 作主语",M+" Explain + "+OBJ+" how the discomfort is affecting + O(your ability) + "+PURP+" to focus on your studies","解释这种不适如何影响你集中精力学习的能力。"],
["email","I am writing to report the <em>discomfort</em> I have been experiencing due to the poor ventilation in the classroom.","n. 作report的宾语",M+" I am writing to report + O(the discomfort) + "+ATTR+" I have been experiencing + "+CAU+" due to the poor ventilation","我写信是为了反映因教室通风不良我所经历的不适。"],
["email","The constant noise from the construction site is causing considerable <em>discomfort</em> to all residents.","n. 作causing的宾语",M+" The constant noise + prep.phrase(from the construction site) + is causing + O(considerable discomfort) + prep.phrase(to all residents)","施工现场持续的噪音给所有居民造成了相当大的不适。"],
["email","This <em>discomfort</em> has made it nearly impossible for me to get a good night's sleep.","n. 作主语",M+" This discomfort has made + O(it) + OC(nearly impossible) + "+PURP+" for me to get a good night's sleep","这种不适让我几乎无法睡个好觉。"],
["cross","Several attendees reported <em>discomfort</em> with the temperature at the conference hall.","n. 作reported的宾语，邀请/活动场景",M+" Several attendees reported + O(discomfort) + prep.phrase(with the temperature at the conference hall)","几位与会者反映了对会议厅温度的不适。"],
["cross","I hope my feedback about the <em>discomfort</em> will help improve conditions for future guests.","n. 作介词about的宾语，建议场景",M+" I hope + "+OBJ+" my feedback about the discomfort will help improve + O(conditions) + prep.phrase(for future guests)","我希望我关于不适的反馈能帮助改善未来客人的条件。"]
]},

{w:"delayed",ph:"/dɪˈleɪd/",pos:"adj",cn:"延迟的",cat:"complain",stars:1,ss:[
["prompt","Your online order has been <em>delayed</em> for over two weeks. Write an email to the company expressing your frustration.","adj. 过去分词作表语，被动含义",M+" Your online order has been delayed + "+TIM+" for over two weeks","你的网上订单已延迟两周以上。写邮件向公司表达不满。"],
["prompt","The <em>delayed</em> shipment has caused problems for your event planning. Write to the supplier.","adj. 前置定语修饰 shipment",M+" The delayed shipment has caused + O(problems) + prep.phrase(for your event planning)","延迟的发货给你的活动策划造成了问题。写信给供应商。"],
["prompt","Your university has <em>delayed</em> the release of final grades. Email the registrar to inquire about the reason.","v. 现在完成时，delay + O",M+" Your university has delayed + O(the release of final grades)","你的大学推迟了最终成绩的发布。邮件联系注册办公室询问原因。"],
["instr","Explain how the <em>delayed</em> delivery has affected your plans.","adj. 前置定语修饰 delivery",M+" Explain + "+OBJ+" how the delayed delivery has affected + O(your plans)","解释延迟交货如何影响了你的计划。"],
["instr","Mention when the order was placed and how long it has been <em>delayed</em>.","adj. 过去分词在被动结构中",M+" Mention + "+OBJ+" when the order was placed + and + "+OBJ+" how long it has been delayed","说明订单何时下的以及延迟了多久。"],
["email","I am disappointed to inform you that my order has been <em>delayed</em> without any prior notice.","adj. 被动语态表语",M+" I am disappointed to inform you + "+OBJ+" that my order has been delayed + prep.phrase(without any prior notice)","我很失望地告知您我的订单在没有任何事先通知的情况下被延迟了。"],
["email","The <em>delayed</em> response from your customer service team has only added to my frustration.","adj. 前置定语修饰 response",M+" The delayed response + prep.phrase(from your customer service team) + has only added to + O(my frustration)","你们客服团队的延迟回复只增加了我的不满。"],
["email","Because the shipment was <em>delayed</em>, I missed the deadline for submitting my project materials.","adj. 被动语态表语",CAU+" Because the shipment was delayed + "+M+" I missed + O(the deadline) + prep.phrase(for submitting my project materials)","因为发货延迟，我错过了提交项目材料的截止日期。"],
["cross","The <em>delayed</em> flight forced us to cancel the hotel reservation we had made.","adj. 前置定语，邀请/预订场景",M+" The delayed flight forced + O(us) + "+PURP+" to cancel the hotel reservation + "+ATTR+" we had made","航班延误迫使我们取消了已预订的酒店。"],
["cross","I suggest you send a notice to customers whenever an order is <em>delayed</em> beyond the estimated date.","adj. 被动语态，建议场景",M+" I suggest + "+OBJ+" you send a notice to customers + "+TIM+" whenever an order is delayed beyond the estimated date","我建议每当订单超过预计日期延迟时通知客户。"]
]},

{w:"incorrect",ph:"/ˌɪnkəˈrekt/",pos:"adj",cn:"不正确的",cat:"complain",stars:1,ss:[
["prompt","You received an <em>incorrect</em> item in your delivery. Write an email to the retailer.","adj. 前置定语修饰 item",M+" You received + O(an incorrect item) + prep.phrase(in your delivery)","你收到了错误的物品。写邮件给零售商。"],
["prompt","Your transcript contains <em>incorrect</em> information about your course grades. Email the registrar.","adj. 前置定语修饰 information",M+" Your transcript contains + O(incorrect information) + prep.phrase(about your course grades)","你的成绩单包含关于课程成绩的错误信息。邮件联系注册办公室。"],
["prompt","The restaurant charged you an <em>incorrect</em> amount on your bill. Write to the manager.","adj. 前置定语修饰 amount",M+" The restaurant charged + O(you) + O(an incorrect amount) + prep.phrase(on your bill)","餐厅在账单上向你收取了错误的金额。写信给经理。"],
["instr","Identify the <em>incorrect</em> details and explain what the correct information should be.","adj. 前置定语修饰 details",M+" 祈使句: Identify + O(the incorrect details) + and + explain + "+OBJ+" what the correct information should be","找出错误的细节并解释正确信息应该是什么。"],
["instr","Describe the <em>incorrect</em> charge and request a corrected invoice.","adj. 前置定语修饰 charge",M+" 祈使句: Describe + O(the incorrect charge) + and + request + O(a corrected invoice)","描述错误的收费并要求更正的发票。"],
["email","I recently noticed that the billing address on my account is <em>incorrect</em>.","adj. 表语",M+" I recently noticed + "+OBJ+" that the billing address on my account is incorrect","我最近注意到我账户上的账单地址不正确。"],
["email","The <em>incorrect</em> item I received was a completely different product from what I ordered.","adj. 前置定语修饰 item",M+" The incorrect item + "+ATTR+" I received + was + C(a completely different product) + prep.phrase(from "+OBJ+" what I ordered)","我收到的错误物品与我订购的完全不同。"],
["email","I kindly request that you correct the <em>incorrect</em> grade listed on my official transcript.","adj. 前置定语修饰 grade",M+" I kindly request + "+OBJ+" that you correct + O(the incorrect grade) + "+ATTR+" listed on my official transcript","我恳请您更正我正式成绩单上列出的错误成绩。"],
["cross","Due to the <em>incorrect</em> address, the invitation never reached several of the intended guests.","adj. 前置定语，邀请场景",CAU+" Due to the incorrect address + "+M+" the invitation never reached + O(several of the intended guests)","由于地址错误，邀请函未能送达几位预期的客人。"],
["cross","I would suggest implementing a review step to prevent <em>incorrect</em> orders from being shipped.","adj. 前置定语，建议场景",M+" I would suggest + "+OBJ+" implementing a review step + "+PURP+" to prevent incorrect orders from being shipped","我建议增加一个审核步骤以防止发送错误的订单。"]
]},

{w:"defective",ph:"/dɪˈfektɪv/",pos:"adj",cn:"有缺陷的",cat:"complain",stars:2,ss:[
["prompt","You purchased an appliance that turned out to be <em>defective</em>. Write an email requesting a refund.","adj. 表语，turn out to be + adj.",M+" You purchased an appliance + "+ATTR+" that turned out to be defective","你买的电器结果有缺陷。写邮件请求退款。"],
["prompt","The <em>defective</em> product you received from the online store has caused inconvenience. Write to customer service.","adj. 前置定语修饰 product",M+" The defective product + "+ATTR+" you received from the online store + has caused + O(inconvenience)","你从网店收到的有缺陷的产品造成了不便。写信给客服。"],
["prompt","A piece of furniture you ordered arrived <em>defective</em>. Describe the problem and request a resolution.","adj. 作宾补",M+" A piece of furniture + "+ATTR+" you ordered + arrived defective","你订购的一件家具到货时有缺陷。描述问题并请求解决。"],
["instr","Describe how the <em>defective</em> item has affected your daily routine.","adj. 前置定语修饰 item",M+" Describe + "+OBJ+" how the defective item has affected + O(your daily routine)","描述有缺陷的物品如何影响了你的日常生活。"],
["instr","Explain why you believe the product is <em>defective</em> and not simply damaged during shipping.","adj. 表语",M+" Explain + "+OBJ+" why you believe + "+OBJ+" the product is defective + and + not simply damaged during shipping","解释你为什么认为产品有缺陷而不仅仅是运输中损坏的。"],
["email","Upon opening the package, I immediately noticed that the laptop screen was <em>defective</em>.","adj. 表语",TIM+" Upon opening the package + "+M+" I immediately noticed + "+OBJ+" that the laptop screen was defective","打开包裹后，我立即注意到笔记本电脑屏幕有缺陷。"],
["email","I am requesting a full refund because the item is clearly <em>defective</em> and cannot be used.","adj. 表语",M+" I am requesting a full refund + "+CAU+" because the item is clearly defective + and + cannot be used","我要求全额退款因为该物品明显有缺陷且无法使用。"],
["email","This is the second <em>defective</em> unit I have received, which is extremely disappointing.","adj. 前置定语修饰 unit",M+" This is the second defective unit + "+ATTR+" I have received + "+ATTR+" which is extremely disappointing","这是我收到的第二个有缺陷的产品，非常令人失望。"],
["cross","If <em>defective</em> items continue to be shipped, I would suggest improving your quality control process.","adj. 前置定语，建议场景",COND+" If defective items continue to be shipped + "+M+" I would suggest + "+OBJ+" improving your quality control process","如果继续发送有缺陷的物品，我建议改进质量控制流程。"],
["cross","The <em>defective</em> equipment at the venue made it difficult to enjoy the event we were invited to.","adj. 前置定语，邀请场景",M+" The defective equipment + prep.phrase(at the venue) + made + O(it) + OC(difficult) + "+PURP+" to enjoy the event + "+ATTR+" we were invited to","场地有缺陷的设备让我们难以享受被邀请参加的活动。"]
]},

{w:"apologize",ph:"/əˈpɒlədʒaɪz/",pos:"v",cn:"道歉",cat:"complain",stars:1,ss:[
["prompt","A friend helped you with a project, but you forgot to thank them. Write an email to <em>apologize</em>.","v. 不定式表目的",M+" Write an email + "+PURP+" to apologize","朋友帮了你的项目，但你忘了感谢。写邮件道歉。"],
["prompt","You missed an important meeting with your professor. Write to <em>apologize</em> and reschedule.","v. 不定式表目的",M+" Write + "+PURP+" to apologize + and + reschedule","你错过了与教授的重要会议。写信道歉并重新安排。"],
["prompt","Your behavior at a group meeting was inappropriate. Write an email to your teammates to <em>apologize</em>.","v. 不定式表目的",M+" Write an email + prep.phrase(to your teammates) + "+PURP+" to apologize","你在小组会议上的行为不当。写邮件给队友道歉。"],
["instr","<em>Apologize</em> for the inconvenience and propose a solution.","v. 祈使句，apologize for + N",M+" 祈使句: Apologize + prep.phrase(for the inconvenience) + and + propose + O(a solution)","为造成的不便道歉并提出解决方案。"],
["instr","<em>Apologize</em> sincerely and explain the reason for your absence.","v. 祈使句，apologize + adv.",M+" 祈使句: Apologize sincerely + and + explain + O(the reason) + prep.phrase(for your absence)","真诚地道歉并解释你缺席的原因。"],
["email","I sincerely <em>apologize</em> for not attending the scheduled meeting yesterday.","v. apologize for + 动名词",M+" I sincerely apologize + prep.phrase(for not attending the scheduled meeting yesterday)","我真诚地为昨天没有参加预定会议而道歉。"],
["email","I want to <em>apologize</em> for the misunderstanding and assure you it will not happen again.","v. want to + apologize for",M+" I want to apologize + prep.phrase(for the misunderstanding) + and + assure + O(you) + "+OBJ+" it will not happen again","我想为这次误解道歉并保证不会再发生。"],
["email","Please allow me to <em>apologize</em> for the delay in responding to your email.","v. allow me to + apologize",M+" Please allow me to apologize + prep.phrase(for the delay) + prep.phrase(in responding to your email)","请允许我为回复邮件的延迟道歉。"],
["cross","I expect the company to <em>apologize</em> and offer compensation for the defective product.","v. expect sb. to + V，请求场景",M+" I expect the company + "+PURP+" to apologize + and + offer + O(compensation) + prep.phrase(for the defective product)","我期望公司道歉并为有缺陷的产品提供补偿。"],
["cross","While I <em>apologize</em> for the short notice, I hope you can still attend the event.","v. 让步状语从句，邀请场景",CON+" While I apologize for the short notice + "+M+" I hope + "+OBJ+" you can still attend the event","虽然我为临时通知道歉，但我希望你仍能参加活动。"]
]},

{w:"convenient",ph:"/kənˈviːniənt/",pos:"adj",cn:"方便的",cat:"invite",stars:1,ss:[
["prompt","Invite a friend to visit your new apartment at a time that is <em>convenient</em> for both of you.","adj. 表语，be convenient for sb.",M+" Invite a friend + "+PURP+" to visit + prep.phrase(at a time) + "+ATTR+" that is convenient for both of you","邀请朋友在你们都方便的时间参观你的新公寓。"],
["prompt","Write to your professor suggesting a <em>convenient</em> time for an office-hour meeting.","adj. 前置定语修饰 time",M+" Write to your professor + "+PART+" suggesting + O(a convenient time) + prep.phrase(for an office-hour meeting)","写信给教授建议一个方便的办公时间会面。"],
["prompt","Your club is organizing a trip. Email members to find a <em>convenient</em> date for everyone.","adj. 前置定语修饰 date",M+" Email members + "+PURP+" to find + O(a convenient date) + prep.phrase(for everyone)","你的社团正在组织旅行。邮件联系成员找到大家都方便的日期。"],
["instr","Suggest a <em>convenient</em> location and time for the gathering.","adj. 前置定语修饰 location",M+" 祈使句: Suggest + O(a convenient location and time) + prep.phrase(for the gathering)","建议一个方便的聚会地点和时间。"],
["instr","Ask when it would be <em>convenient</em> for the professor to meet with you.","adj. 表语，it + be + convenient + for sb. + to do",M+" Ask + "+OBJ+" when it would be convenient + prep.phrase(for the professor) + "+PURP+" to meet with you","询问教授什么时候方便与你见面。"],
["email","Would Saturday afternoon be <em>convenient</em> for you to come over for dinner?","adj. 表语",M+" Would Saturday afternoon be convenient + prep.phrase(for you) + "+PURP+" to come over for dinner?","周六下午你方便过来吃晚饭吗？"],
["email","Please let me know a <em>convenient</em> time so we can discuss the project details.","adj. 前置定语修饰 time",M+" Please let me know + O(a convenient time) + "+PURP+" so we can discuss the project details","请告诉我一个方便的时间以便我们讨论项目细节。"],
["email","I hope this weekend is <em>convenient</em> for you, as I have planned a small gathering.","adj. 表语",M+" I hope + "+OBJ+" this weekend is convenient for you + "+CAU+" as I have planned a small gathering","我希望这个周末你方便，因为我计划了一个小型聚会。"],
["cross","If it is <em>convenient</em>, I would also like to discuss the complaint I filed last week.","adj. 表语，投诉场景",COND+" If it is convenient + "+M+" I would also like to discuss + O(the complaint) + "+ATTR+" I filed last week","如果方便的话，我还想讨论上周提交的投诉。"],
["cross","It would be <em>convenient</em> to resolve the scheduling conflict before the deadline.","adj. 表语，it + be + convenient + to do，解决场景",M+" It would be convenient + "+PURP+" to resolve the scheduling conflict + "+TIM+" before the deadline","在截止日期前解决日程冲突会很方便。"]
]},

{w:"available",ph:"/əˈveɪləbl/",pos:"adj",cn:"可用的",cat:"request",stars:1,ss:[
["prompt","You need a study room but none are <em>available</em>. Write to the library to ask about alternatives.","adj. 表语",M+" none are available","你需要自习室但没有可用的。写信给图书馆询问替代方案。"],
["prompt","Ask the bookstore if the textbook you need is <em>available</em> for purchase or rental.","adj. 表语，be available for",M+" Ask the bookstore + "+OBJ+" if the textbook + "+ATTR+" you need + is available + prep.phrase(for purchase or rental)","问书店你需要的教科书是否可以购买或租借。"],
["prompt","Write to the recreation center to find out what programs are <em>available</em> this semester.","adj. 表语",M+" Write to the recreation center + "+PURP+" to find out + "+OBJ+" what programs are available this semester","写信给娱乐中心了解本学期有哪些项目可用。"],
["instr","Ask whether the professor is <em>available</em> for a meeting during office hours.","adj. 表语，be available for",M+" Ask + "+OBJ+" whether the professor is available + prep.phrase(for a meeting during office hours)","询问教授在办公时间是否可以会面。"],
["instr","Mention the dates when you are <em>available</em> to attend the workshop.","adj. 表语",M+" Mention + O(the dates) + "+ATTR+" when you are available + "+PURP+" to attend the workshop","说明你可以参加研讨会的日期。"],
["email","I wanted to check whether the conference room is <em>available</em> on March 15th.","adj. 表语",M+" I wanted to check + "+OBJ+" whether the conference room is available + prep.phrase(on March 15th)","我想确认会议室3月15日是否可用。"],
["email","I am <em>available</em> any day next week, so please feel free to choose the most suitable time.","adj. 表语",M+" I am available + prep.phrase(any day next week) + "+PURP+" so please feel free to choose the most suitable time","我下周任何一天都有空，请随意选择最合适的时间。"],
["email","Could you let me know if there are any <em>available</em> slots for the tutoring program?","adj. 前置定语修饰 slots",M+" Could you let me know + "+OBJ+" if there are any available slots + prep.phrase(for the tutoring program)?","你能否告诉我辅导项目是否还有名额？"],
["cross","The venue has several <em>available</em> time slots this weekend if you would like to reschedule.","adj. 前置定语，邀请场景",M+" The venue has + O(several available time slots) + prep.phrase(this weekend) + "+COND+" if you would like to reschedule","如果你想重新安排，场地本周末有几个可用的时间段。"],
["cross","Unfortunately, no refund options are currently <em>available</em> for this type of purchase.","adj. 表语，投诉场景",M+" Unfortunately + no refund options are currently available + prep.phrase(for this type of purchase)","不幸的是，这类购买目前没有可用的退款选项。"]
]},

{w:"deadline",ph:"/ˈdedlaɪn/",pos:"n",cn:"截止日期",cat:"resolve",stars:1,ss:[
["prompt","The <em>deadline</em> for your group project is approaching, but a teammate is not contributing. Write an email.","n. 作主语",M+" The deadline + prep.phrase(for your group project) + is approaching","小组项目的截止日期临近，但一个队友没有贡献。写邮件。"],
["prompt","You need an extension on the <em>deadline</em> for your assignment. Write to your professor.","n. 作介词on的宾语",M+" You need + O(an extension) + prep.phrase(on the deadline for your assignment)","你需要延长作业的截止日期。写信给教授。"],
["prompt","The <em>deadline</em> to submit your application has already passed. Email the admissions office.","n. 作主语",M+" The deadline + "+PURP+" to submit your application + has already passed","提交申请的截止日期已过。邮件联系招生办。"],
["instr","Mention the <em>deadline</em> and explain why you need extra time.","n. 作mention的宾语",M+" 祈使句: Mention + O(the deadline) + and + explain + "+OBJ+" why you need extra time","提及截止日期并解释你为什么需要额外时间。"],
["instr","State the original <em>deadline</em> and propose a new one.","n. 作state的宾语",M+" 祈使句: State + O(the original deadline) + and + propose + O(a new one)","说明原来的截止日期并提出一个新的。"],
["email","I am writing to request an extension on the <em>deadline</em> for the research paper.","n. 作介词on的宾语",M+" I am writing + "+PURP+" to request an extension + prep.phrase(on the deadline for the research paper)","我写信请求延长研究论文的截止日期。"],
["email","Given the circumstances, I hope you will consider pushing the <em>deadline</em> back by one week.","n. 作pushing的宾语",M+" "+PART+" Given the circumstances + I hope + "+OBJ+" you will consider pushing the deadline back + prep.phrase(by one week)","鉴于情况，我希望您考虑将截止日期推迟一周。"],
["email","I fully understand the importance of meeting <em>deadlines</em> and will make every effort to submit on time.","n. 复数，作meeting的宾语",M+" I fully understand + O(the importance of meeting deadlines) + and + will make every effort + "+PURP+" to submit on time","我完全理解按时完成的重要性，将尽一切努力按时提交。"],
["cross","Could you confirm the <em>deadline</em> for RSVPing to the department dinner?","n. 作confirm的宾语，邀请场景",M+" Could you confirm + O(the deadline) + prep.phrase(for RSVPing to the department dinner)?","你能确认部门晚宴回复的截止日期吗？"],
["cross","I missed the <em>deadline</em> because the delayed shipment prevented me from completing my work.","n. 作missed的宾语，投诉场景",M+" I missed + O(the deadline) + "+CAU+" because the delayed shipment prevented me from completing my work","我错过了截止日期因为延迟的发货阻止我完成工作。"]
]},

{w:"submit",ph:"/səbˈmɪt/",pos:"v",cn:"提交",cat:"resolve",stars:1,ss:[
["prompt","You forgot to <em>submit</em> your assignment on time. Write to your professor to explain and ask for an extension.","v. forget to + V",M+" You forgot + "+PURP+" to submit + O(your assignment) + prep.phrase(on time)","你忘记按时提交作业了。写信给教授解释并请求延期。"],
["prompt","The online system crashed before you could <em>submit</em> your application. Email the IT department.","v. could + V",M+" The online system crashed + "+TIM+" before you could submit + O(your application)","在你提交申请之前在线系统崩溃了。邮件联系IT部门。"],
["prompt","Your group needs to <em>submit</em> the final report by Friday, but a member has not completed their section.","v. need to + V",M+" Your group needs + "+PURP+" to submit + O(the final report) + "+TIM+" by Friday","你的小组需要在周五前提交最终报告，但一个成员还没完成他们的部分。"],
["instr","Explain why you were unable to <em>submit</em> the work by the original deadline.","v. be unable to + V",M+" Explain + "+OBJ+" why you were unable to submit + O(the work) + "+TIM+" by the original deadline","解释你为什么无法在原定截止日期前提交作业。"],
["instr","Ask the professor if you may <em>submit</em> the paper through an alternative method.","v. may + V",M+" Ask the professor + "+OBJ+" if you may submit + O(the paper) + prep.phrase(through an alternative method)","问教授你是否可以通过其他方式提交论文。"],
["email","I was unable to <em>submit</em> my assignment due to a technical issue with the online portal.","v. be unable to + V",M+" I was unable to submit + O(my assignment) + "+CAU+" due to a technical issue + prep.phrase(with the online portal)","由于在线门户的技术问题我无法提交作业。"],
["email","I would like to <em>submit</em> the revised version by the end of this week if that is acceptable.","v. would like to + V",M+" I would like to submit + O(the revised version) + "+TIM+" by the end of this week + "+COND+" if that is acceptable","如果可以的话，我想在本周末之前提交修改版。"],
["email","Please confirm that you have received the documents I <em>submitted</em> earlier today.","v. 过去式，在定语从句中",M+" Please confirm + "+OBJ+" that you have received + O(the documents) + "+ATTR+" I submitted earlier today","请确认您已收到我今天早些时候提交的文件。"],
["cross","All participants must <em>submit</em> their registration forms before attending the event.","v. must + V，邀请场景",M+" All participants must submit + O(their registration forms) + "+TIM+" before attending the event","所有参与者必须在参加活动前提交注册表。"],
["cross","I <em>submitted</em> a complaint two weeks ago but have not yet received a response.","v. 过去式，投诉场景",M+" I submitted + O(a complaint) + "+TIM+" two weeks ago + but + "+M+" have not yet received + O(a response)","我两周前提交了投诉但还没有收到回复。"]
]},

{w:"assignment",ph:"/əˈsaɪnmənt/",pos:"n",cn:"作业;任务",cat:"resolve",stars:1,ss:[
["prompt","You are struggling with a difficult <em>assignment</em>. Write to your professor for guidance.","n. 作介词with的宾语",M+" You are struggling + prep.phrase(with a difficult assignment)","你正在为一项困难的作业苦恼。写信给教授寻求指导。"],
["prompt","A group <em>assignment</em> is due next week, but your partner is not responding. Write an email.","n. 作主语",M+" A group assignment is due + "+TIM+" next week","小组作业下周到期，但你的搭档没有回复。写邮件。"],
["prompt","The <em>assignment</em> instructions are unclear. Email your professor to ask for clarification.","n. 作修饰语（assignment instructions）",M+" The assignment instructions are unclear","作业说明不清楚。邮件联系教授请求澄清。"],
["instr","Describe the <em>assignment</em> you are having difficulty with and ask for specific advice.","n. 作describe的宾语",M+" Describe + O(the assignment) + "+ATTR+" you are having difficulty with + and + ask + prep.phrase(for specific advice)","描述你遇到困难的作业并请求具体建议。"],
["instr","Explain how the late <em>assignment</em> submission has affected your grade.","n. 前置定语修饰 submission",M+" Explain + "+OBJ+" how the late assignment submission has affected + O(your grade)","解释迟交作业如何影响了你的成绩。"],
["email","I am writing to ask for an extension on the <em>assignment</em> that is due this Friday.","n. 作介词on的宾语",M+" I am writing + "+PURP+" to ask for an extension + prep.phrase(on the assignment) + "+ATTR+" that is due this Friday","我写信请求延长本周五到期的作业期限。"],
["email","I have completed most of the <em>assignment</em>, but I need a few more days to finalize it.","n. 作completed的宾语",M+" I have completed + O(most of the assignment) + but + "+M+" I need a few more days + "+PURP+" to finalize it","我已完成大部分作业，但还需要几天时间完成。"],
["email","Could you clarify the requirements for the <em>assignment</em> on comparative literature?","n. 作介词for的宾语",M+" Could you clarify + O(the requirements) + prep.phrase(for the assignment on comparative literature)?","你能澄清比较文学作业的要求吗？"],
["cross","The <em>assignment</em> involves visiting a local museum, which could also be a great group outing.","n. 作主语，邀请场景",M+" The assignment involves + O(visiting a local museum) + "+ATTR+" which could also be a great group outing","这个作业涉及参观当地博物馆，也可以是一次很好的集体出游。"],
["cross","I was unable to focus on my <em>assignment</em> because of the ongoing noise complaint I mentioned.","n. 作介词on的宾语，投诉场景",M+" I was unable to focus + prep.phrase(on my assignment) + "+CAU+" because of the ongoing noise complaint + "+ATTR+" I mentioned","由于我提到的持续噪音投诉我无法专注于作业。"]
]},

{w:"schedule",ph:"/ˈʃedjuːl/",pos:"n/v",cn:"日程;安排",cat:"invite",stars:1,ss:[
["prompt","Your class <em>schedule</em> conflicts with a campus event you want to attend. Write to your professor.","n. 作主语",M+" Your class schedule conflicts + prep.phrase(with a campus event) + "+ATTR+" you want to attend","你的课程安排与你想参加的校园活动冲突。写信给教授。"],
["prompt","You need to <em>schedule</em> a meeting with your academic advisor. Write an email to arrange a time.","v. need to + V",M+" You need + "+PURP+" to schedule + O(a meeting) + prep.phrase(with your academic advisor)","你需要安排与学术顾问的会面。写邮件安排时间。"],
["prompt","A friend has invited you to a trip, but it conflicts with your exam <em>schedule</em>. Write to explain.","n. 作介词with的宾语",M+" it conflicts + prep.phrase(with your exam schedule)","朋友邀请你旅行，但与考试安排冲突。写信解释。"],
["instr","Propose a new <em>schedule</em> that works for all group members.","n. 作propose的宾语",M+" 祈使句: Propose + O(a new schedule) + "+ATTR+" that works for all group members","提出一个适合所有小组成员的新日程。"],
["instr","<em>Schedule</em> a time to meet and discuss the project in person.","v. 祈使句",M+" 祈使句: Schedule + O(a time) + "+PURP+" to meet and discuss the project in person","安排一个时间来面对面讨论项目。"],
["email","I would like to <em>schedule</em> a meeting with you to discuss my progress in the course.","v. would like to + V",M+" I would like to schedule + O(a meeting) + prep.phrase(with you) + "+PURP+" to discuss my progress in the course","我想安排与您会面以讨论我在课程中的进展。"],
["email","Unfortunately, my current <em>schedule</em> does not allow me to attend the Wednesday session.","n. 作主语",M+" Unfortunately + my current schedule does not allow + O(me) + "+PURP+" to attend the Wednesday session","不幸的是，我目前的日程不允许我参加周三的课程。"],
["email","Could we <em>schedule</em> the team dinner for next Saturday instead of this Friday?","v. 在请求句中",M+" Could we schedule + O(the team dinner) + prep.phrase(for next Saturday) + prep.phrase(instead of this Friday)?","我们能把团队晚宴安排在下周六而不是这周五吗？"],
["cross","I need to adjust my <em>schedule</em> to meet the deadline for submitting the final report.","n. 作adjust的宾语，解决场景",M+" I need to adjust + O(my schedule) + "+PURP+" to meet the deadline + prep.phrase(for submitting the final report)","我需要调整日程以赶上提交最终报告的截止日期。"],
["cross","The <em>scheduled</em> delivery was delayed, which forced me to reschedule my entire week.","adj. 过去分词作定语，投诉场景",M+" The scheduled delivery was delayed + "+ATTR+" which forced me to reschedule + O(my entire week)","预定的交货被延迟，迫使我重新安排整周的计划。"]
]},

{w:"accommodate",ph:"/əˈkɒmədeɪt/",pos:"v",cn:"容纳;适应",cat:"invite",stars:3,ss:[
["prompt","You are organizing a club event and the current venue cannot <em>accommodate</em> all attendees. Write to request a larger space.","v. cannot + V + O",M+" The current venue cannot accommodate + O(all attendees)","你在组织社团活动，当前场地无法容纳所有参加者。写信请求更大的空间。"],
["prompt","Your dormitory room cannot <em>accommodate</em> a visiting relative. Write to the housing office for help.","v. cannot + V + O",M+" Your dormitory room cannot accommodate + O(a visiting relative)","你的宿舍无法容纳来访的亲戚。写信给住房办公室求助。"],
["prompt","Write to the restaurant to ask if they can <em>accommodate</em> a group of fifteen for a celebration dinner.","v. can + V + O",M+" Ask + "+OBJ+" if they can accommodate + O(a group of fifteen) + prep.phrase(for a celebration dinner)","写信给餐厅问他们能否容纳十五人的庆祝晚宴。"],
["instr","Ask the venue if they can <em>accommodate</em> guests with special dietary needs.","v. can + V + O",M+" Ask the venue + "+OBJ+" if they can accommodate + O(guests) + prep.phrase(with special dietary needs)","询问场地能否接待有特殊饮食需求的客人。"],
["instr","Explain what changes are needed to <em>accommodate</em> the increased number of participants.","v. to + V 不定式表目的",M+" Explain + "+OBJ+" what changes are needed + "+PURP+" to accommodate + O(the increased number of participants)","解释需要做出哪些改变以容纳增加的参与者人数。"],
["email","I am writing to inquire whether the banquet hall can <em>accommodate</em> up to fifty guests.","v. can + V",M+" I am writing + "+PURP+" to inquire + "+OBJ+" whether the banquet hall can accommodate + O(up to fifty guests)","我写信询问宴会厅是否能容纳多达五十位客人。"],
["email","We would be grateful if you could <em>accommodate</em> our request for wheelchair-accessible seating.","v. could + V + O",M+" We would be grateful + "+COND+" if you could accommodate + O(our request) + prep.phrase(for wheelchair-accessible seating)","如果您能满足我们对轮椅无障碍座位的要求我们将非常感激。"],
["email","The hotel was unable to <em>accommodate</em> our late check-in, which caused significant inconvenience.","v. be unable to + V + O",M+" The hotel was unable to accommodate + O(our late check-in) + "+ATTR+" which caused significant inconvenience","酒店无法安排我们的晚入住，造成了很大的不便。"],
["cross","I hope the new policy can <em>accommodate</em> the concerns raised in my earlier complaint.","v. can + V + O，投诉场景",M+" I hope + "+OBJ+" the new policy can accommodate + O(the concerns) + "+ATTR+" raised in my earlier complaint","我希望新政策能解决我之前投诉中提出的问题。"],
["cross","To <em>accommodate</em> different schedules, I suggest we offer multiple session times for the workshop.","v. to + V 不定式表目的，建议场景",PURP+" To accommodate different schedules + "+M+" I suggest + "+OBJ+" we offer multiple session times + prep.phrase(for the workshop)","为了适应不同的日程，我建议我们为研讨会提供多个时段。"]
]},

{w:"awareness",ph:"/əˈweənəs/",pos:"n",cn:"意识;认知",cat:"suggest",stars:2,ss:[
["prompt","Your university lacks <em>awareness</em> about mental health resources. Write to the dean with suggestions.","n. 作lacks的宾语",M+" Your university lacks + O(awareness) + prep.phrase(about mental health resources)","你的大学缺乏对心理健康资源的意识。写信给院长提出建议。"],
["prompt","Suggest ways to raise <em>awareness</em> about environmental issues on campus.","n. raise awareness about 固定搭配",M+" Suggest + O(ways) + "+PURP+" to raise awareness + prep.phrase(about environmental issues on campus)","建议在校园里提高环保意识的方式。"],
["prompt","Write to a student organization proposing an <em>awareness</em> campaign for healthy eating habits.","n. 前置定语修饰 campaign",M+" Write to a student organization + "+PART+" proposing + O(an awareness campaign) + prep.phrase(for healthy eating habits)","写信给学生组织提议一项关于健康饮食习惯的宣传活动。"],
["instr","Describe your ideas for promoting <em>awareness</em> of the issue among students.","n. 作promoting的宾语",M+" Describe + O(your ideas) + prep.phrase(for promoting awareness of the issue among students)","描述你在学生中推广该问题意识的想法。"],
["instr","Explain how the proposed event will increase <em>awareness</em> within the community.","n. 作increase的宾语",M+" Explain + "+OBJ+" how the proposed event will increase + O(awareness) + prep.phrase(within the community)","解释提议的活动如何提高社区的意识。"],
["email","I believe a workshop on sustainability would help raise <em>awareness</em> among students.","n. raise awareness 固定搭配",M+" I believe + "+OBJ+" a workshop on sustainability would help raise + O(awareness) + prep.phrase(among students)","我认为一个关于可持续发展的研讨会有助于提高学生的意识。"],
["email","There is a general lack of <em>awareness</em> about the recycling program, which I think we should address.","n. lack of awareness 固定搭配",M+" There is a general lack of awareness + prep.phrase(about the recycling program) + "+ATTR+" which I think we should address","关于回收计划普遍缺乏意识，我认为我们应该解决这个问题。"],
["email","Hosting an <em>awareness</em> event would be a great way to engage the student body in this cause.","n. 前置定语修饰 event",M+" "+SUBJ+" Hosting an awareness event + would be + C(a great way) + "+PURP+" to engage the student body in this cause","举办一场宣传活动将是让学生参与这一事业的好方式。"],
["cross","Greater <em>awareness</em> of customer rights might help prevent the kind of complaint I experienced.","n. 作主语，投诉场景",M+" Greater awareness + prep.phrase(of customer rights) + might help prevent + O(the kind of complaint) + "+ATTR+" I experienced","更多的消费者权益意识可能有助于防止我经历的那种投诉。"],
["cross","The invitation should include information to build <em>awareness</em> about the charity we are supporting.","n. build awareness 固定搭配，邀请场景",M+" The invitation should include + O(information) + "+PURP+" to build awareness + prep.phrase(about the charity) + "+ATTR+" we are supporting","邀请函应包含信息以提高我们支持的慈善机构的知名度。"]
]},

{w:"initiative",ph:"/ɪˈnɪʃətɪv/",pos:"n",cn:"倡议;主动性",cat:"suggest",stars:3,ss:[
["prompt","Your campus needs a recycling <em>initiative</em>. Write to the student council with your proposal.","n. 前置定语+名词",M+" Your campus needs + O(a recycling initiative)","你的校园需要一项回收倡议。写信给学生会提出你的提案。"],
["prompt","Suggest a community service <em>initiative</em> that could benefit both students and local residents.","n. 后接定语从句",M+" Suggest + O(a community service initiative) + "+ATTR+" that could benefit both students and local residents","建议一项能惠及学生和当地居民的社区服务倡议。"],
["prompt","Write to the department head proposing an <em>initiative</em> to improve campus safety.","n. 作proposing的宾语",M+" Write to the department head + "+PART+" proposing + O(an initiative) + "+PURP+" to improve campus safety","写信给系主任提议一项改善校园安全的倡议。"],
["instr","Describe the <em>initiative</em> you are proposing and explain its potential benefits.","n. 作describe的宾语",M+" 祈使句: Describe + O(the initiative) + "+ATTR+" you are proposing + and + explain + O(its potential benefits)","描述你提议的倡议并解释其潜在好处。"],
["instr","Explain why this <em>initiative</em> deserves funding and support from the university.","n. 作主语",M+" Explain + "+OBJ+" why this initiative deserves + O(funding and support) + prep.phrase(from the university)","解释为什么这项倡议值得大学的资助和支持。"],
["email","I am writing to propose an <em>initiative</em> that would promote mental health awareness on campus.","n. 作propose的宾语",M+" I am writing + "+PURP+" to propose + O(an initiative) + "+ATTR+" that would promote mental health awareness on campus","我写信提议一项在校园推广心理健康意识的倡议。"],
["email","This <em>initiative</em> has the potential to bring together students from diverse backgrounds.","n. 作主语",M+" This initiative has + O(the potential) + "+PURP+" to bring together students from diverse backgrounds","这项倡议有可能将不同背景的学生聚集在一起。"],
["email","I would appreciate your support in launching this <em>initiative</em> at the beginning of next semester.","n. 作launching的宾语",M+" I would appreciate + O(your support) + prep.phrase(in launching this initiative) + "+TIM+" at the beginning of next semester","我希望在下学期初得到您对发起这项倡议的支持。"],
["cross","Taking the <em>initiative</em> to file a formal complaint led to a swift resolution of the problem.","n. take the initiative 固定搭配，投诉场景",M+" "+SUBJ+" Taking the initiative to file a formal complaint + led to + O(a swift resolution of the problem)","主动提交正式投诉促成了问题的迅速解决。"],
["cross","I admire your <em>initiative</em> in organizing the charity dinner and would love to attend.","n. 作admire的宾语，邀请场景",M+" I admire + O(your initiative) + prep.phrase(in organizing the charity dinner) + and + would love to attend","我钦佩你组织慈善晚宴的主动性，很想参加。"]
]},

{w:"regarding",ph:"/rɪˈɡɑːrdɪŋ/",pos:"prep",cn:"关于",cat:"all",stars:2,ss:[
["prompt","Write an email to customer service <em>regarding</em> a billing error on your recent statement.","prep. 引导介词短语作状语",M+" Write an email + prep.phrase(to customer service) + prep.phrase(regarding a billing error on your recent statement)","写邮件给客服关于你最近账单上的收费错误。"],
["prompt","You have questions <em>regarding</em> the new campus parking policy. Write to the administration.","prep. 引导介词短语作后置定语",M+" You have + O(questions) + prep.phrase(regarding the new campus parking policy)","你有关于新校园停车政策的问题。写信给行政部门。"],
["prompt","Write to your landlord <em>regarding</em> the maintenance issues in your apartment.","prep. 引导介词短语作状语",M+" Write to your landlord + prep.phrase(regarding the maintenance issues in your apartment)","写信给房东关于你公寓的维修问题。"],
["instr","Write a formal email <em>regarding</em> the changes you would like to make to your enrollment.","prep. 引导介词短语作后置定语",M+" Write + O(a formal email) + prep.phrase(regarding the changes) + "+ATTR+" you would like to make to your enrollment","写一封关于你想对注册进行更改的正式邮件。"],
["instr","Include any relevant details <em>regarding</em> the timeline and expected outcome.","prep. 引导介词短语作后置定语",M+" 祈使句: Include + O(any relevant details) + prep.phrase(regarding the timeline and expected outcome)","包括关于时间表和预期结果的任何相关细节。"],
["email","I am writing <em>regarding</em> the issue I reported last week about the broken air conditioning.","prep. 引导介词短语作状语",M+" I am writing + prep.phrase(regarding the issue) + "+ATTR+" I reported last week + prep.phrase(about the broken air conditioning)","我写信是关于我上周报告的空调故障问题。"],
["email","<em>Regarding</em> your question about availability, I can confirm that I am free on Thursday.","prep. 句首状语",M+" prep.phrase(Regarding your question about availability) + I can confirm + "+OBJ+" that I am free on Thursday","关于您询问的时间问题，我可以确认周四有空。"],
["email","I have a few concerns <em>regarding</em> the safety measures at the upcoming outdoor event.","prep. 引导介词短语作后置定语",M+" I have + O(a few concerns) + prep.phrase(regarding the safety measures at the upcoming outdoor event)","我对即将举行的户外活动的安全措施有一些担忧。"],
["cross","<em>Regarding</em> the invitation to the annual banquet, I would be happy to attend.","prep. 句首状语，邀请场景",M+" prep.phrase(Regarding the invitation to the annual banquet) + I would be happy to attend","关于年度宴会的邀请，我很乐意参加。"],
["cross","I would like to follow up <em>regarding</em> the complaint I submitted about the defective merchandise.","prep. 引导介词短语作状语，投诉场景",M+" I would like to follow up + prep.phrase(regarding the complaint) + "+ATTR+" I submitted + prep.phrase(about the defective merchandise)","我想跟进我提交的关于有缺陷商品的投诉。"]
]},

{w:"circumstances",ph:"/ˈsɜːrkəmstænsɪz/",pos:"n",cn:"情况",cat:"resolve",stars:2,ss:[
["prompt","Due to unforeseen <em>circumstances</em>, you cannot attend an event you committed to. Write an email.","n. 作介词due to的宾语",M+" "+CAU+" Due to unforeseen circumstances + you cannot attend + O(an event) + "+ATTR+" you committed to","由于不可预见的情况，你无法参加你承诺的活动。写邮件。"],
["prompt","Explain the <em>circumstances</em> that led to you missing the assignment deadline.","n. 作explain的宾语",M+" Explain + O(the circumstances) + "+ATTR+" that led to you missing the assignment deadline","解释导致你错过作业截止日期的情况。"],
["prompt","Your living <em>circumstances</em> have changed and you need a new dormitory arrangement. Write to housing.","n. 作主语",M+" Your living circumstances have changed + and + you need + O(a new dormitory arrangement)","你的居住情况发生了变化，你需要新的宿舍安排。写信给住房部门。"],
["instr","Describe the <em>circumstances</em> that prevented you from completing the task on time.","n. 作describe的宾语",M+" 祈使句: Describe + O(the circumstances) + "+ATTR+" that prevented you from completing the task on time","描述阻止你按时完成任务的情况。"],
["instr","Explain how your <em>circumstances</em> make it necessary to request special accommodations.","n. 作主语",M+" Explain + "+OBJ+" how your circumstances make + O(it) + OC(necessary) + "+PURP+" to request special accommodations","解释你的情况如何使你有必要请求特殊安排。"],
["email","Given the <em>circumstances</em>, I hope you will understand my request for a deadline extension.","n. 在分词短语中",M+" "+PART+" Given the circumstances + I hope + "+OBJ+" you will understand + O(my request for a deadline extension)","鉴于情况，我希望您理解我延期的请求。"],
["email","I would not normally ask for this, but my current <em>circumstances</em> leave me no alternative.","n. 作主语",M+" I would not normally ask for this + but + "+M+" my current circumstances leave + O(me) + O(no alternative)","我通常不会提出这样的请求，但目前的情况让我别无选择。"],
["email","Under these <em>circumstances</em>, I believe a partial refund would be a fair resolution.","n. 在介词短语中",M+" prep.phrase(Under these circumstances) + I believe + "+OBJ+" a partial refund would be + C(a fair resolution)","在这种情况下，我认为部分退款是合理的解决方案。"],
["cross","Despite the difficult <em>circumstances</em>, I am grateful for the invitation and hope to attend next time.","n. 作介词despite的宾语，邀请场景",CON+" Despite the difficult circumstances + "+M+" I am grateful for the invitation + and + hope to attend next time","尽管情况困难，我很感激邀请并希望下次能参加。"],
["cross","I understand that <em>circumstances</em> beyond your control may have caused the shipping delay.","n. 作主语，投诉场景",M+" I understand + "+OBJ+" that circumstances + prep.phrase(beyond your control) + may have caused + O(the shipping delay)","我理解超出你控制的情况可能导致了发货延迟。"]
]},

{w:"alternatively",ph:"/ɔːlˈtɜːrnətɪvli/",pos:"adv",cn:"或者;另外",cat:"suggest",stars:2,ss:[
["prompt","You cannot attend the morning class. Suggest an alternative or, <em>alternatively</em>, ask to switch sections.","adv. 句间连接副词",M+" Suggest an alternative + or + "+M+" alternatively + ask to switch sections","你无法参加早课。建议替代方案，或者要求转组。"],
["prompt","The product you ordered is out of stock. Ask for a replacement or, <em>alternatively</em>, a full refund.","adv. 句间连接副词",M+" Ask for a replacement + or + "+M+" alternatively + a full refund","你订购的产品缺货。要求更换，或者全额退款。"],
["prompt","Write to the event organizer suggesting a different venue or, <em>alternatively</em>, a virtual format.","adv. 句间连接副词",M+" suggesting a different venue + or + "+M+" alternatively + a virtual format","写信给活动组织者建议不同的场地，或者线上形式。"],
["instr","Suggest a solution and, <em>alternatively</em>, propose a backup plan.","adv. 句间连接副词",M+" Suggest + O(a solution) + and + "+M+" alternatively + propose + O(a backup plan)","提出解决方案，另外提出备选计划。"],
["instr","<em>Alternatively</em>, you may ask the professor if the assignment can be submitted electronically.","adv. 句首副词",M+" Alternatively + you may ask the professor + "+OBJ+" if the assignment can be submitted electronically","或者，你可以问教授作业是否可以电子提交。"],
["email","I would prefer a full refund; <em>alternatively</em>, I would accept a store credit of equal value.","adv. 分号后连接副词",M+" I would prefer a full refund + "+M+" alternatively + I would accept + O(a store credit of equal value)","我希望全额退款；或者，我可以接受等值的商店积分。"],
["email","Could we reschedule for next Tuesday? <em>Alternatively</em>, Thursday afternoon would also work for me.","adv. 句首副词",M+" Could we reschedule + prep.phrase(for next Tuesday)? + "+M+" Alternatively + Thursday afternoon would also work for me","我们能改到下周二吗？或者周四下午也可以。"],
["email","<em>Alternatively</em>, if the original item is no longer available, I would be open to receiving a similar model.","adv. 句首副词",M+" Alternatively + "+COND+" if the original item is no longer available + I would be open to receiving + O(a similar model)","或者，如果原始商品不再有货，我愿意接收类似型号。"],
["cross","<em>Alternatively</em>, we could hold the event outdoors if the indoor venue cannot accommodate everyone.","adv. 句首副词，邀请场景",M+" Alternatively + we could hold the event outdoors + "+COND+" if the indoor venue cannot accommodate everyone","或者，如果室内场地容纳不下所有人，我们可以在户外举办活动。"],
["cross","You could file a formal complaint or, <em>alternatively</em>, speak directly with the store manager.","adv. 句间连接副词，投诉场景",M+" You could file a formal complaint + or + "+M+" alternatively + speak directly with the store manager","你可以提交正式投诉，或者直接与店长沟通。"]
]},

{w:"thoroughly",ph:"/ˈθʌrəli/",pos:"adv",cn:"彻底地",cat:"complain",stars:2,ss:[
["prompt","You feel the repair team did not <em>thoroughly</em> fix the issue in your apartment. Write to the landlord.","adv. 修饰动词 fix",M+" You feel + "+OBJ+" the repair team did not thoroughly fix + O(the issue) + prep.phrase(in your apartment)","你觉得维修团队没有彻底修好公寓的问题。写信给房东。"],
["prompt","The cleaning service did not <em>thoroughly</em> clean your hotel room. Write a complaint to the hotel manager.","adv. 修饰动词 clean",M+" The cleaning service did not thoroughly clean + O(your hotel room)","清洁服务没有彻底打扫你的酒店房间。写投诉信给酒店经理。"],
["prompt","You believe your insurance claim was not <em>thoroughly</em> reviewed. Write to the insurance company.","adv. 修饰被动动词 reviewed",M+" You believe + "+OBJ+" your insurance claim was not thoroughly reviewed","你认为你的保险索赔没有被彻底审查。写信给保险公司。"],
["instr","Explain why you believe the issue was not <em>thoroughly</em> addressed the first time.","adv. 修饰动词 addressed",M+" Explain + "+OBJ+" why you believe + "+OBJ+" the issue was not thoroughly addressed + "+TIM+" the first time","解释你为什么认为这个问题第一次没有被彻底解决。"],
["instr","Request that the matter be <em>thoroughly</em> investigated before a final decision is made.","adv. 修饰动词 investigated",M+" Request + "+OBJ+" that the matter be thoroughly investigated + "+TIM+" before a final decision is made","要求在做出最终决定前彻底调查此事。"],
["email","I expected the problem to be <em>thoroughly</em> resolved after my initial complaint, but it persists.","adv. 修饰动词 resolved",M+" I expected + O(the problem) + OC(to be thoroughly resolved) + "+TIM+" after my initial complaint + but + "+M+" it persists","我以为在初次投诉后问题会被彻底解决，但问题仍然存在。"],
["email","I would appreciate it if you could <em>thoroughly</em> examine the equipment before sending a replacement.","adv. 修饰动词 examine",M+" I would appreciate it + "+COND+" if you could thoroughly examine + O(the equipment) + "+TIM+" before sending a replacement","如果您能在发送替换品之前彻底检查设备我将不胜感激。"],
["email","The technician did not <em>thoroughly</em> test the system, which is why the same error has occurred again.","adv. 修饰动词 test",M+" The technician did not thoroughly test + O(the system) + "+ATTR+" which is why the same error has occurred again","技术人员没有彻底测试系统，这就是为什么同样的错误再次发生。"],
["cross","I suggest that all products be <em>thoroughly</em> inspected before they are shipped to customers.","adv. 修饰动词 inspected，建议场景",M+" I suggest + "+OBJ+" that all products be thoroughly inspected + "+TIM+" before they are shipped to customers","我建议所有产品在发货给客户之前都要彻底检查。"],
["cross","Please <em>thoroughly</em> review the attached documents regarding the deadline extension I requested.","adv. 修饰动词 review，解决场景",M+" Please thoroughly review + O(the attached documents) + prep.phrase(regarding the deadline extension) + "+ATTR+" I requested","请彻底审查关于我请求的截止日期延期的附件文件。"]
]}
,

// ====== Words 23-42 (organize -> problematic) ======
{w:"organize",ph:"/ˈɔːrɡənaɪz/",pos:"v",cn:"组织",cat:"invite",stars:1,ss:[
["prompt","Your club wants to <em>organize</em> a weekend hiking trip for its members.","v. wants to + V，后接名词宾语",M+" Your club wants to organize + O(a weekend hiking trip) + prep.phrase(for its members)","你的俱乐部想为成员组织一次周末远足旅行。"],
["prompt","You and your classmates are planning to <em>organize</em> a cultural exchange event on campus.","v. planning to + V",M+" You and your classmates are planning to organize + O(a cultural exchange event) + prep.phrase(on campus)","你和同学们正计划在校园里组织一场文化交流活动。"],
["prompt","Your department has asked you to help <em>organize</em> a farewell dinner for a retiring professor.","v. help + V",M+" Your department has asked you to help organize + O(a farewell dinner) + prep.phrase(for a retiring professor)","你的系要求你帮忙组织一场退休教授的欢送晚宴。"],
["instr","Describe how you plan to <em>organize</em> the event and explain why these choices are appropriate.","v. plan to + V",M+" Describe + "+OBJ+" how you plan to organize the event + and + explain + "+OBJ+" why these choices are appropriate","描述你计划如何组织该活动并解释为什么这些选择是合适的。"],
["instr","Suggest activities and explain how you would <em>organize</em> the schedule.","v. would + V",M+" Suggest activities + and + explain + "+OBJ+" how you would organize the schedule","建议一些活动并解释你将如何组织日程。"],
["email","I would like to <em>organize</em> a small gathering to celebrate the end of the semester.","v. would like to + V",M+" I would like to organize + O(a small gathering) + "+PURP+" to celebrate the end of the semester","我想组织一次小型聚会来庆祝学期结束。"],
["email","We are hoping to <em>organize</em> a team-building retreat at your facility next month.","v. hoping to + V",M+" We are hoping to organize + O(a team-building retreat) + prep.phrase(at your facility) + "+TIM+" next month","我们希望下个月在你们的场所组织一次团建活动。"],
["email","I have been asked to <em>organize</em> the annual awards banquet for our student association.","v. 被动: been asked to + V",M+" I have been asked to organize + O(the annual awards banquet) + prep.phrase(for our student association)","我被要求为我们的学生会组织年度颁奖宴会。"],
["cross","If we <em>organize</em> the workshop effectively, more students will benefit from the experience.","v. 在条件从句中",COND+" If we organize the workshop effectively + "+M+" more students will benefit from the experience","如果我们有效地组织研讨会，更多学生将从中受益。"],
["cross","The committee decided to <em>organize</em> a feedback session to address the ongoing complaints.","v. decided to + V",M+" The committee decided to organize + O(a feedback session) + "+PURP+" to address the ongoing complaints","委员会决定组织一次反馈会议来处理持续的投诉。"]
]},,

{w:"reservation",ph:"/ˌrezərˈveɪʃn/",pos:"n",cn:"预订",cat:"invite",stars:2,ss:[
["prompt","You need to make a <em>reservation</em> at a restaurant for your study group's end-of-year dinner.","n. make a reservation，后接介词短语",M+" You need to make a reservation + prep.phrase(at a restaurant) + prep.phrase(for your study group's end-of-year dinner)","你需要为学习小组的年终晚餐在餐厅预订。"],
["prompt","Your friend has asked you to help with the <em>reservation</em> for a weekend getaway.","n. 作介词 with 的宾语",M+" Your friend has asked you to help + prep.phrase(with the reservation) + prep.phrase(for a weekend getaway)","你的朋友请你帮忙预订周末短途旅行。"],
["prompt","You are in charge of making the hotel <em>reservation</em> for the class field trip.","n. 作 making 的宾语",M+" You are in charge of making + O(the hotel reservation) + prep.phrase(for the class field trip)","你负责为班级实地考察预订酒店。"],
["instr","Mention the details of the <em>reservation</em> you would like to make.","n. 作介词 of 的宾语",M+" Mention + O(the details) + prep.phrase(of the reservation) + "+ATTR+" you would like to make","提及你想预订的详细信息。"],
["instr","Include the date and time for the <em>reservation</em> in your email.","n. 作介词 for 的宾语",M+" Include + O(the date and time) + prep.phrase(for the reservation) + prep.phrase(in your email)","在邮件中包含预订的日期和时间。"],
["email","I would like to make a <em>reservation</em> for twelve people on Saturday evening.","n. make a reservation + for + 人数",M+" I would like to make a reservation + prep.phrase(for twelve people) + "+TIM+" on Saturday evening","我想预订周六晚上十二人的位置。"],
["email","Could you please confirm whether the <em>reservation</em> has been processed?","n. 作主语，在 whether 从句中",M+" Could you please confirm + "+OBJ+" whether the reservation has been processed","请问您能确认预订是否已经处理了吗？"],
["email","I need to modify the <em>reservation</em> because two additional guests will be joining us.","n. 作 modify 的宾语",M+" I need to modify the reservation + "+CAU+" because two additional guests will be joining us","我需要修改预订因为还有两位客人会加入我们。"],
["cross","The <em>reservation</em> was cancelled without notice, which left us extremely frustrated.","n. 作主语，被动语态",M+" The reservation was cancelled + prep.phrase(without notice) + "+ATTR+" which left us extremely frustrated","预订被无故取消了，这让我们非常沮丧。"],
["cross","Please confirm the <em>reservation</em> so that we can finalize the itinerary for the trip.","n. 作 confirm 的宾语",M+" Please confirm the reservation + "+PURP+" so that we can finalize the itinerary for the trip","请确认预订以便我们敲定旅行行程。"]
]},,

{w:"dietary",ph:"/ˈdaɪətɛri/",pos:"adj",cn:"饮食的",cat:"invite",stars:3,ss:[
["prompt","You are organizing a potluck dinner and need to consider guests' <em>dietary</em> restrictions.","adj. 修饰 restrictions",M+" You are organizing a potluck dinner + and + need to consider + O(guests' dietary restrictions)","你正在组织一场聚餐，需要考虑客人的饮食限制。"],
["prompt","Your university is hosting an international food festival and wants to accommodate various <em>dietary</em> needs.","adj. 修饰 needs",M+" Your university is hosting an international food festival + and + wants to accommodate + O(various dietary needs)","你的大学正在举办国际美食节，想要满足各种饮食需求。"],
["prompt","A friend has invited you to dinner but you have specific <em>dietary</em> requirements.","adj. 修饰 requirements",M+" A friend has invited you to dinner + "+CON+" but you have + O(specific dietary requirements)","一个朋友邀请你吃晚饭，但你有特殊的饮食要求。"],
["instr","Mention any <em>dietary</em> preferences or restrictions that should be considered.","adj. 修饰 preferences or restrictions",M+" Mention + O(any dietary preferences or restrictions) + "+ATTR+" that should be considered","提及任何需要考虑的饮食偏好或限制。"],
["instr","Ask about the <em>dietary</em> options available at the venue.","adj. 修饰 options",M+" Ask about + O(the dietary options) + "+ATTR+" available at the venue","询问场所提供的饮食选项。"],
["email","Several members of our group have <em>dietary</em> restrictions, including vegetarian and gluten-free needs.","adj. 修饰 restrictions",M+" Several members of our group have + O(dietary restrictions) + "+PART+" including vegetarian and gluten-free needs","我们小组的几位成员有饮食限制，包括素食和无麸质需求。"],
["email","Could you provide a menu that accommodates different <em>dietary</em> preferences?","adj. 修饰 preferences",M+" Could you provide + O(a menu) + "+ATTR+" that accommodates different dietary preferences","你能提供一份适应不同饮食偏好的菜单吗？"],
["email","I wanted to inform you in advance about our <em>dietary</em> requirements so the kitchen can prepare accordingly.","adj. 修饰 requirements",M+" I wanted to inform you in advance + prep.phrase(about our dietary requirements) + "+PURP+" so the kitchen can prepare accordingly","我想提前告知我们的饮食要求以便厨房相应准备。"],
["cross","The hotel failed to meet our <em>dietary</em> needs, which made the entire experience problematic.","adj. 修饰 needs",M+" The hotel failed to meet + O(our dietary needs) + "+ATTR+" which made the entire experience problematic","酒店未能满足我们的饮食需求，这使得整个体验有问题。"],
["cross","I would like to thank the organizers for being attentive to everyone's <em>dietary</em> concerns.","adj. 修饰 concerns",M+" I would like to thank the organizers + "+CAU+" for being attentive to everyone's dietary concerns","我想感谢组织者对每个人饮食问题的关注。"]
]},,

{w:"recreational",ph:"/ˌrekriˈeɪʃənl/",pos:"adj",cn:"休闲的",cat:"invite",stars:3,ss:[
["prompt","Your company is planning a retreat with various <em>recreational</em> activities for employees.","adj. 修饰 activities",M+" Your company is planning + O(a retreat) + prep.phrase(with various recreational activities) + prep.phrase(for employees)","你的公司正在为员工策划一次有各种休闲活动的团建。"],
["prompt","You want to suggest adding <em>recreational</em> facilities to the new student center.","adj. 修饰 facilities",M+" You want to suggest adding + O(recreational facilities) + prep.phrase(to the new student center)","你想建议在新学生中心增加休闲设施。"],
["prompt","The campus <em>recreational</em> center has recently changed its operating hours.","adj. 修饰 center",M+" The campus recreational center + has recently changed + O(its operating hours)","校园休闲中心最近更改了营业时间。"],
["instr","Describe the <em>recreational</em> activities you would like to include in the event.","adj. 修饰 activities",M+" Describe + O(the recreational activities) + "+ATTR+" you would like to include in the event","描述你想在活动中安排的休闲活动。"],
["instr","Explain why these <em>recreational</em> options would be enjoyable for all participants.","adj. 修饰 options",M+" Explain + "+OBJ+" why these recreational options would be enjoyable + prep.phrase(for all participants)","解释为什么这些休闲选项对所有参与者来说都是愉快的。"],
["email","We would appreciate it if you could share a list of the <em>recreational</em> activities available at the resort.","adj. 修饰 activities",M+" We would appreciate it + "+COND+" if you could share + O(a list of the recreational activities) + "+ATTR+" available at the resort","如果您能分享度假村可用的休闲活动列表我们将不胜感激。"],
["email","Our group is particularly interested in outdoor <em>recreational</em> options such as kayaking and hiking.","adj. 修饰 options",M+" Our group is particularly interested in + O(outdoor recreational options) + prep.phrase(such as kayaking and hiking)","我们的团队特别对户外休闲选项感兴趣，如皮划艇和远足。"],
["email","I am writing to inquire about the <em>recreational</em> programs offered during the summer session.","adj. 修饰 programs",M+" I am writing to inquire about + O(the recreational programs) + "+ATTR+" offered during the summer session","我写信询问暑期提供的休闲项目。"],
["cross","The lack of <em>recreational</em> spaces on campus has been a frequent complaint among students.","adj. 修饰 spaces",M+" The lack of recreational spaces on campus + has been + O(a frequent complaint) + prep.phrase(among students)","校园缺乏休闲空间一直是学生们频繁投诉的问题。"],
["cross","Adding more <em>recreational</em> opportunities would make the program more valuable for participants.","adj. 修饰 opportunities",M+" "+PART+" Adding more recreational opportunities + "+M+" would make the program + O(more valuable) + prep.phrase(for participants)","增加更多休闲机会将使项目对参与者更有价值。"]
]},,

{w:"itinerary",ph:"/aɪˈtɪnərɛri/",pos:"n",cn:"行程",cat:"invite",stars:3,ss:[
["prompt","You are helping to plan a class trip and need to finalize the <em>itinerary</em>.","n. 作 finalize 的宾语",M+" You are helping to plan a class trip + and + need to finalize + O(the itinerary)","你正在帮忙策划一次班级旅行，需要敲定行程。"],
["prompt","Your travel club has asked you to create an <em>itinerary</em> for a three-day city tour.","n. 作 create 的宾语",M+" Your travel club has asked you to create + O(an itinerary) + prep.phrase(for a three-day city tour)","你的旅行俱乐部要求你为三天的城市游创建行程。"],
["prompt","A group of international students wants your help designing a weekend <em>itinerary</em>.","n. 作 designing 的宾语",M+" A group of international students wants your help designing + O(a weekend itinerary)","一群留学生需要你帮忙设计一个周末行程。"],
["instr","Include a detailed <em>itinerary</em> in your email and explain your choices.","n. 作 include 的宾语",M+" Include + O(a detailed itinerary) + prep.phrase(in your email) + and + explain + O(your choices)","在邮件中附上详细行程并解释你的选择。"],
["instr","Describe the <em>itinerary</em> you have planned and mention any special arrangements.","n. 作 describe 的宾语",M+" Describe + O(the itinerary) + "+ATTR+" you have planned + and + mention + O(any special arrangements)","描述你计划的行程并提及任何特殊安排。"],
["email","I have attached a proposed <em>itinerary</em> for the trip, which includes visits to three museums.","n. 作 attached 的宾语",M+" I have attached + O(a proposed itinerary) + prep.phrase(for the trip) + "+ATTR+" which includes visits to three museums","我附上了旅行的拟议行程，其中包括参观三个博物馆。"],
["email","Please review the <em>itinerary</em> and let me know if any changes are needed.","n. 作 review 的宾语",M+" Please review + O(the itinerary) + and + let me know + "+COND+" if any changes are needed","请查看行程并告诉我是否需要任何更改。"],
["email","The <em>itinerary</em> covers all the major destinations we discussed in last week's meeting.","n. 作主语",M+" The itinerary covers + O(all the major destinations) + "+ATTR+" we discussed in last week's meeting","该行程涵盖了我们上周会议讨论的所有主要目的地。"],
["cross","The <em>itinerary</em> was poorly organized, which frustrated many of the participants.","n. 作主语，被动语态",M+" The itinerary was poorly organized + "+ATTR+" which frustrated many of the participants","行程安排得很差，让许多参与者感到沮丧。"],
["cross","I would suggest revising the <em>itinerary</em> to allow more time for recreational activities.","n. 作 revising 的宾语",M+" I would suggest + "+OBJ+" revising the itinerary + "+PURP+" to allow more time for recreational activities","我建议修改行程以留出更多时间进行休闲活动。"]
]},,

{w:"destination",ph:"/ˌdestɪˈneɪʃn/",pos:"n",cn:"目的地",cat:"invite",stars:2,ss:[
["prompt","Your student club is choosing a <em>destination</em> for this year's annual trip.","n. 作 choosing 的宾语",M+" Your student club is choosing + O(a destination) + prep.phrase(for this year's annual trip)","你的学生俱乐部正在为今年的年度旅行选择目的地。"],
["prompt","You want to recommend a travel <em>destination</em> to a friend who is visiting your country.","n. 作 recommend 的宾语",M+" You want to recommend + O(a travel destination) + prep.phrase(to a friend) + "+ATTR+" who is visiting your country","你想向一位来你国家旅游的朋友推荐一个旅行目的地。"],
["prompt","The class trip committee needs to decide on a <em>destination</em> that is both educational and fun.","n. 作介词 on 的宾语",M+" The class trip committee needs to decide on + O(a destination) + "+ATTR+" that is both educational and fun","班级旅行委员会需要决定一个既有教育意义又有趣的目的地。"],
["instr","Describe the <em>destination</em> you have researched and explain why it is suitable.","n. 作 describe 的宾语",M+" Describe + O(the destination) + "+ATTR+" you have researched + and + explain + "+OBJ+" why it is suitable","描述你研究过的目的地并解释为什么它合适。"],
["instr","Recommend a <em>destination</em> and provide reasons for your choice.","n. 作 recommend 的宾语",M+" Recommend + O(a destination) + and + provide + O(reasons for your choice)","推荐一个目的地并提供你选择的理由。"],
["email","After researching several options, I believe the best <em>destination</em> for our trip would be Kyoto.","n. 作主语补语",M+" "+TIM+" After researching several options + "+M+" I believe + "+OBJ+" the best destination for our trip would be Kyoto","在研究了几个选项后，我认为我们旅行的最佳目的地是京都。"],
["email","This <em>destination</em> offers a wide range of cultural attractions and outdoor activities.","n. 作主语",M+" This destination offers + O(a wide range of cultural attractions and outdoor activities)","这个目的地提供丰富的文化景点和户外活动。"],
["email","I chose this <em>destination</em> because it is affordable and easy to reach by public transportation.","n. 作 chose 的宾语",M+" I chose this destination + "+CAU+" because it is affordable and easy to reach by public transportation","我选择这个目的地是因为它价格实惠且乘公共交通容易到达。"],
["cross","The <em>destination</em> was beautiful, but the hotel service was problematic throughout our stay.","n. 作主语",M+" The destination was beautiful + "+CON+" but the hotel service was problematic + "+TIM+" throughout our stay","目的地很美，但酒店服务在我们整个逗留期间都有问题。"],
["cross","Could you suggest an alternative <em>destination</em> that would better suit our budget?","n. 作 suggest 的宾语",M+" Could you suggest + O(an alternative destination) + "+ATTR+" that would better suit our budget","你能建议一个更符合我们预算的替代目的地吗？"]
]},,

{w:"opinion",ph:"/əˈpɪnjən/",pos:"n",cn:"看法",cat:"suggest",stars:1,ss:[
["prompt","Your professor has asked for your <em>opinion</em> on a proposed change to the course schedule.","n. 作介词 for 的宾语",M+" Your professor has asked for + O(your opinion) + prep.phrase(on a proposed change to the course schedule)","你的教授征求你对课程安排拟议变更的看法。"],
["prompt","A friend wants your <em>opinion</em> on which elective course to take next semester.","n. 作 wants 的宾语",M+" A friend wants + O(your opinion) + prep.phrase(on which elective course to take next semester)","一个朋友想听你对下学期选修哪门课程的看法。"],
["prompt","The student council is collecting students' <em>opinions</em> on improving campus dining services.","n. 作 collecting 的宾语",M+" The student council is collecting + O(students' opinions) + prep.phrase(on improving campus dining services)","学生会正在收集学生对改善校园餐饮服务的看法。"],
["instr","Share your <em>opinion</em> and provide specific reasons to support it.","n. 作 share 的宾语",M+" Share + O(your opinion) + and + provide + O(specific reasons) + "+PURP+" to support it","分享你的看法并提供具体理由来支持它。"],
["instr","Express your <em>opinion</em> on the matter and suggest an alternative.","n. 作 express 的宾语",M+" Express + O(your opinion) + prep.phrase(on the matter) + and + suggest + O(an alternative)","就此事表达你的看法并提出替代方案。"],
["email","In my <em>opinion</em>, the new study room policy would be more effective if it included weekend hours.","n. in my opinion 插入语",M+" In my opinion + the new study room policy would be more effective + "+COND+" if it included weekend hours","在我看来，如果新自习室政策包括周末时间，会更有效。"],
["email","I wanted to share my <em>opinion</em> on the proposed changes to the library's operating hours.","n. 作 share 的宾语",M+" I wanted to share + O(my opinion) + prep.phrase(on the proposed changes to the library's operating hours)","我想分享我对图书馆营业时间拟议变更的看法。"],
["email","I respect your <em>opinion</em>, but I believe a different approach would yield better results.","n. 作 respect 的宾语",M+" I respect your opinion + "+CON+" but I believe + "+OBJ+" a different approach would yield better results","我尊重你的看法，但我认为不同的方法会产生更好的结果。"],
["cross","Many students share the <em>opinion</em> that the current grading system is unfair.","n. 作 share 的宾语，后接同位语从句",M+" Many students share the opinion + "+APPO+" that the current grading system is unfair","许多学生持有相同看法，认为当前的评分制度不公平。"],
["cross","I would appreciate hearing your <em>opinion</em> before we finalize the event itinerary.","n. 作 hearing 的宾语",M+" I would appreciate + "+OBJ+" hearing your opinion + "+TIM+" before we finalize the event itinerary","在我们敲定活动行程之前，我想听听你的看法。"]
]},,

{w:"effective",ph:"/ɪˈfektɪv/",pos:"adj",cn:"有效的",cat:"suggest",stars:1,ss:[
["prompt","You believe the university's current approach to mental health support is not <em>effective</em>.","adj. 作表语",M+" You believe + "+OBJ+" the university's current approach to mental health support is not effective","你认为大学目前的心理健康支持方法不够有效。"],
["prompt","Your professor asked you to suggest a more <em>effective</em> way to conduct group projects.","adj. 修饰 way",M+" Your professor asked you to suggest + O(a more effective way) + "+PURP+" to conduct group projects","你的教授请你建议一种更有效的方式来开展小组项目。"],
["prompt","The current tutoring program has not been very <em>effective</em> in helping struggling students.","adj. 作表语",M+" The current tutoring program has not been very effective + prep.phrase(in helping struggling students)","目前的辅导项目在帮助有困难的学生方面不太有效。"],
["instr","Explain why you think your suggestion would be more <em>effective</em> than the current method.","adj. 作表语（比较级）",M+" Explain + "+OBJ+" why you think + "+OBJ+" your suggestion would be more effective + prep.phrase(than the current method)","解释为什么你认为你的建议比现有方法更有效。"],
["instr","Suggest an <em>effective</em> solution and describe how it could be implemented.","adj. 修饰 solution",M+" Suggest + O(an effective solution) + and + describe + "+OBJ+" how it could be implemented","建议一个有效的解决方案并描述如何实施。"],
["email","I believe that scheduling shorter, more frequent meetings would be a more <em>effective</em> approach.","adj. 修饰 approach",M+" I believe + "+OBJ+" that scheduling shorter, more frequent meetings would be a more effective approach","我认为安排更短、更频繁的会议会是更有效的方法。"],
["email","This method has proven to be highly <em>effective</em> in other departments across the university.","adj. 作表语",M+" This method has proven to be highly effective + prep.phrase(in other departments across the university)","这种方法已被证明在大学其他院系非常有效。"],
["email","An <em>effective</em> strategy would be to assign each group member a specific role from the beginning.","adj. 修饰 strategy",M+" An effective strategy would be + "+OBJ+" to assign each group member a specific role from the beginning","一个有效的策略是从一开始就给每个小组成员分配特定角色。"],
["cross","The workshop offered <em>effective</em> techniques for managing time and reducing stress.","adj. 修饰 techniques",M+" The workshop offered + O(effective techniques) + prep.phrase(for managing time and reducing stress)","研讨会提供了管理时间和减轻压力的有效技巧。"],
["cross","Without an <em>effective</em> plan, we will be unable to address the issues before the deadline.","adj. 修饰 plan",COND+" Without an effective plan + "+M+" we will be unable to address the issues + "+TIM+" before the deadline","没有有效的计划，我们将无法在截止日期前解决这些问题。"]
]},,

{w:"enjoyable",ph:"/ɪnˈdʒɔɪəbl/",pos:"adj",cn:"令人愉快的",cat:"suggest",stars:2,ss:[
["prompt","You attended a campus event that was particularly <em>enjoyable</em> and want to suggest it be held again.","adj. 作表语",M+" You attended a campus event + "+ATTR+" that was particularly enjoyable + and + want to suggest + "+OBJ+" it be held again","你参加了一个特别愉快的校园活动并想建议再次举办。"],
["prompt","Your friend is looking for an <em>enjoyable</em> way to stay active during the winter months.","adj. 修饰 way",M+" Your friend is looking for + O(an enjoyable way) + "+PURP+" to stay active during the winter months","你的朋友正在寻找一种在冬季保持活跃的愉快方式。"],
["prompt","You want to make a class reunion more <em>enjoyable</em> for all attendees.","adj. 作宾语补足语",M+" You want to make + O(a class reunion) + OC(more enjoyable) + prep.phrase(for all attendees)","你想让同学聚会对所有参加者更愉快。"],
["instr","Suggest ways to make the experience more <em>enjoyable</em> for everyone involved.","adj. 作宾语补足语",M+" Suggest + O(ways) + "+PURP+" to make the experience more enjoyable for everyone involved","建议一些方法让所有参与者的体验更愉快。"],
["instr","Explain what made the event <em>enjoyable</em> and recommend specific improvements.","adj. 作宾语补足语",M+" Explain + "+OBJ+" what made the event enjoyable + and + recommend + O(specific improvements)","解释是什么使活动令人愉快并推荐具体改进措施。"],
["email","I found the entire experience incredibly <em>enjoyable</em> and would love to attend again.","adj. 作宾语补足语",M+" I found + O(the entire experience) + OC(incredibly enjoyable) + and + would love to attend again","我觉得整个体验非常愉快，很想再次参加。"],
["email","To make the retreat more <em>enjoyable</em>, I would suggest including a variety of team activities.","adj. 作宾语补足语",M+" "+PURP+" To make the retreat more enjoyable + "+M+" I would suggest + "+OBJ+" including a variety of team activities","为了让团建更愉快，我建议包含各种团队活动。"],
["email","The cooking class was the most <em>enjoyable</em> part of the entire program.","adj. 修饰 part（最高级）",M+" The cooking class was + O(the most enjoyable part) + prep.phrase(of the entire program)","烹饪课是整个项目中最令人愉快的部分。"],
["cross","Although the destination was <em>enjoyable</em>, the travel arrangements were quite problematic.","adj. 作表语（让步从句中）",CON+" Although the destination was enjoyable + "+M+" the travel arrangements were quite problematic","虽然目的地令人愉快，但旅行安排很有问题。"],
["cross","Everyone agreed that the volunteer experience was both <em>enjoyable</em> and valuable.","adj. 作表语（并列）",M+" Everyone agreed + "+OBJ+" that the volunteer experience was both enjoyable and valuable","大家一致认为志愿者经历既令人愉快又有价值。"]
]},,

{w:"valuable",ph:"/ˈvæljuəbl/",pos:"adj",cn:"有价值的",cat:"thank",stars:1,ss:[
["prompt","Your mentor gave you <em>valuable</em> advice that helped you succeed in your internship.","adj. 修饰 advice",M+" Your mentor gave you + O(valuable advice) + "+ATTR+" that helped you succeed in your internship","你的导师给了你有价值的建议，帮助你在实习中取得成功。"],
["prompt","You want to thank a professor for a <em>valuable</em> learning experience in their course.","adj. 修饰 experience",M+" You want to thank a professor + prep.phrase(for a valuable learning experience in their course)","你想感谢一位教授在课程中提供的宝贵学习体验。"],
["prompt","A guest speaker shared <em>valuable</em> insights during a career development workshop.","adj. 修饰 insights",M+" A guest speaker shared + O(valuable insights) + "+TIM+" during a career development workshop","一位嘉宾在职业发展研讨会上分享了有价值的见解。"],
["instr","Mention what you found most <em>valuable</em> about the experience.","adj. 作宾语补足语",M+" Mention + "+OBJ+" what you found most valuable about the experience","提及你认为该经历中最有价值的部分。"],
["instr","Explain why the feedback was <em>valuable</em> to you personally.","adj. 作表语",M+" Explain + "+OBJ+" why the feedback was valuable to you personally","解释为什么这些反馈对你个人来说很有价值。"],
["email","Your guidance has been incredibly <em>valuable</em> throughout this semester.","adj. 作表语",M+" Your guidance has been incredibly valuable + "+TIM+" throughout this semester","您的指导在整个学期中非常有价值。"],
["email","I found your presentation on research methodology extremely <em>valuable</em>.","adj. 作宾语补足语",M+" I found + O(your presentation on research methodology) + OC(extremely valuable)","我觉得您关于研究方法的报告非常有价值。"],
["email","The skills I gained from the workshop have been <em>valuable</em> in both my academic and personal life.","adj. 作表语",M+" The skills + "+ATTR+" I gained from the workshop + have been valuable + prep.phrase(in both my academic and personal life)","我从研讨会获得的技能在学术和个人生活中都很有价值。"],
["cross","The internship was a <em>valuable</em> experience, even though the initial training was poorly organized.","adj. 修饰 experience",M+" The internship was a valuable experience + "+CON+" even though the initial training was poorly organized","实习是一次有价值的经历，尽管最初的培训组织得很差。"],
["cross","I believe this would be a <em>valuable</em> addition to the recreational programs offered on campus.","adj. 修饰 addition",M+" I believe + "+OBJ+" this would be a valuable addition + prep.phrase(to the recreational programs offered on campus)","我认为这将是校园休闲项目的一个有价值的补充。"]
]},,

{w:"informative",ph:"/ɪnˈfɔːrmətɪv/",pos:"adj",cn:"信息丰富的",cat:"thank",stars:2,ss:[
["prompt","You attended an <em>informative</em> seminar on climate change and want to thank the organizer.","adj. 修饰 seminar",M+" You attended + O(an informative seminar on climate change) + and + want to thank the organizer","你参加了一场信息丰富的气候变化研讨会，想感谢组织者。"],
["prompt","A librarian gave you an <em>informative</em> tour of the university's digital resources.","adj. 修饰 tour",M+" A librarian gave you + O(an informative tour) + prep.phrase(of the university's digital resources)","一位图书馆员为你进行了信息丰富的大学数字资源介绍。"],
["prompt","Your classmate delivered a highly <em>informative</em> presentation on study-abroad programs.","adj. 修饰 presentation",M+" Your classmate delivered + O(a highly informative presentation) + prep.phrase(on study-abroad programs)","你的同学做了一个关于留学项目的信息丰富的报告。"],
["instr","Describe what made the session <em>informative</em> and how it helped you.","adj. 作宾语补足语",M+" Describe + "+OBJ+" what made the session informative + and + "+OBJ+" how it helped you","描述是什么使讲座信息丰富以及它如何帮助了你。"],
["instr","Mention which part of the workshop was most <em>informative</em>.","adj. 作表语（最高级）",M+" Mention + "+OBJ+" which part of the workshop was most informative","提及研讨会的哪个部分信息最丰富。"],
["email","I wanted to let you know that the workshop was extremely <em>informative</em> and well-organized.","adj. 作表语",M+" I wanted to let you know + "+OBJ+" that the workshop was extremely informative and well-organized","我想告诉你研讨会信息非常丰富且组织有序。"],
["email","The guest lecture was one of the most <em>informative</em> sessions I have attended this year.","adj. 修饰 sessions（最高级）",M+" The guest lecture was + O(one of the most informative sessions) + "+ATTR+" I have attended this year","这次客座讲座是我今年参加过的信息最丰富的会议之一。"],
["email","Your <em>informative</em> guide to the application process made everything much clearer for me.","adj. 修饰 guide",M+" Your informative guide to the application process + made + O(everything) + OC(much clearer for me)","你关于申请流程的信息丰富的指南让我一切都更清楚了。"],
["cross","Although the brochure was <em>informative</em>, it did not address some of our specific concerns.","adj. 作表语（让步从句中）",CON+" Although the brochure was informative + "+M+" it did not address + O(some of our specific concerns)","虽然宣传册信息丰富，但没有解决我们的一些具体问题。"],
["cross","An <em>informative</em> orientation session would help new students feel less frustrated during their first week.","adj. 修饰 session",M+" An informative orientation session + would help new students feel less frustrated + "+TIM+" during their first week","一次信息丰富的迎新会将帮助新生在第一周感到不那么沮丧。"]
]},,

{w:"benefit",ph:"/ˈbenɪfɪt/",pos:"v/n",cn:"有益于;好处",cat:"thank",stars:1,ss:[
["prompt","You want to thank a community center for a program that has greatly <em>benefited</em> local students.","v. 现在完成时，后接宾语",M+" You want to thank a community center + prep.phrase(for a program) + "+ATTR+" that has greatly benefited local students","你想感谢社区中心为当地学生带来巨大好处的项目。"],
["prompt","A recent campus initiative has <em>benefited</em> students in unexpected ways.","v. 现在完成时",M+" A recent campus initiative has benefited + O(students) + prep.phrase(in unexpected ways)","一项最近的校园倡议以意想不到的方式使学生受益。"],
["prompt","Your school's mentoring program offers many <em>benefits</em> to first-year students.","n. 作 offers 的宾语",M+" Your school's mentoring program offers + O(many benefits) + prep.phrase(to first-year students)","你学校的导师项目为一年级学生提供了许多好处。"],
["instr","Explain how the workshop <em>benefited</em> you and what you learned from it.","v. 过去时，后接宾语",M+" Explain + "+OBJ+" how the workshop benefited you + and + "+OBJ+" what you learned from it","解释研讨会如何使你受益以及你从中学到了什么。"],
["instr","Describe the <em>benefits</em> you gained from the experience.","n. 作 describe 的宾语",M+" Describe + O(the benefits) + "+ATTR+" you gained from the experience","描述你从该经历中获得的好处。"],
["email","The tutoring sessions have greatly <em>benefited</em> my understanding of advanced calculus.","v. 现在完成时",M+" The tutoring sessions have greatly benefited + O(my understanding of advanced calculus)","辅导课极大地促进了我对高等微积分的理解。"],
["email","One of the key <em>benefits</em> of the program is the networking opportunities it provides.","n. 作表语",M+" One of the key benefits of the program + is + O(the networking opportunities) + "+ATTR+" it provides","该项目的主要好处之一是它提供的人脉机会。"],
["email","I hope future students will <em>benefit</em> from this program as much as I did.","v. benefit from",M+" I hope + "+OBJ+" future students will benefit + prep.phrase(from this program) + prep.phrase(as much as I did)","我希望未来的学生能像我一样从该项目中受益。"],
["cross","The new policy would <em>benefit</em> everyone if it were implemented effectively.","v. 在虚拟条件句中",M+" The new policy would benefit + O(everyone) + "+COND+" if it were implemented effectively","如果有效实施，新政策将使每个人受益。"],
["cross","Despite the initial complaints, the revised schedule has <em>benefited</em> the majority of participants.","v. 现在完成时",CON+" Despite the initial complaints + "+M+" the revised schedule has benefited + O(the majority of participants)","尽管最初有投诉，修改后的日程已使大多数参与者受益。"]
]},,

{w:"contribution",ph:"/ˌkɒntrɪˈbjuːʃn/",pos:"n",cn:"贡献",cat:"thank",stars:2,ss:[
["prompt","You want to thank a volunteer for their outstanding <em>contribution</em> to a campus charity event.","n. 作介词 for 的宾语",M+" You want to thank a volunteer + prep.phrase(for their outstanding contribution to a campus charity event)","你想感谢一位志愿者对校园慈善活动的突出贡献。"],
["prompt","A classmate made a significant <em>contribution</em> to your group research project.","n. 作 made 的宾语",M+" A classmate made + O(a significant contribution) + prep.phrase(to your group research project)","一位同学对你的小组研究项目做出了重大贡献。"],
["prompt","The local business's <em>contribution</em> helped fund the annual science fair.","n. 作主语",M+" The local business's contribution + helped fund + O(the annual science fair)","当地企业的贡献帮助资助了年度科学博览会。"],
["instr","Acknowledge the person's <em>contribution</em> and explain how it made a difference.","n. 作 acknowledge 的宾语",M+" Acknowledge + O(the person's contribution) + and + explain + "+OBJ+" how it made a difference","认可此人的贡献并解释它如何产生了影响。"],
["instr","Describe the <em>contribution</em> and mention its impact on the project.","n. 作 describe 的宾语",M+" Describe + O(the contribution) + and + mention + O(its impact on the project)","描述这一贡献并提及其对项目的影响。"],
["email","Your <em>contribution</em> to the fundraiser was instrumental in reaching our target.","n. 作主语",M+" Your contribution to the fundraiser + was instrumental + prep.phrase(in reaching our target)","你对筹款活动的贡献对实现我们的目标至关重要。"],
["email","I want to express my sincere gratitude for your generous <em>contribution</em> to our department.","n. 作介词 for 的宾语",M+" I want to express + O(my sincere gratitude) + prep.phrase(for your generous contribution to our department)","我想对你对我们部门的慷慨贡献表达我诚挚的感谢。"],
["email","Without your <em>contribution</em>, we would not have been able to complete the project on time.","n. 作介词 without 的宾语（虚拟语气）",COND+" Without your contribution + "+M+" we would not have been able to complete the project on time","没有你的贡献，我们不可能按时完成项目。"],
["cross","His lack of <em>contribution</em> to the group project has affected our overall progress.","n. 作介词 of 的宾语",M+" His lack of contribution to the group project + has affected + O(our overall progress)","他对小组项目缺乏贡献影响了我们的整体进展。"],
["cross","Every <em>contribution</em>, no matter how small, helps make the community event more enjoyable.","n. 作主语",M+" Every contribution + "+CON+" no matter how small + "+M+" helps make + O(the community event) + OC(more enjoyable)","每一份贡献，无论多小，都有助于使社区活动更令人愉快。"]
]},,

{w:"frequently",ph:"/ˈfriːkwəntli/",pos:"adv",cn:"频繁地",cat:"thank",stars:2,ss:[
["prompt","You <em>frequently</em> use the university's writing center and want to thank the staff.","adv. 修饰动词 use",M+" You frequently use + O(the university's writing center) + and + want to thank the staff","你经常使用大学写作中心，想感谢工作人员。"],
["prompt","A local café you <em>frequently</em> visit has excellent customer service.","adv. 修饰动词 visit",M+" A local café + "+ATTR+" you frequently visit + has + O(excellent customer service)","你经常光顾的一家咖啡馆有出色的客户服务。"],
["prompt","Your library <em>frequently</em> hosts informative events that benefit the student community.","adv. 修饰动词 hosts",M+" Your library frequently hosts + O(informative events) + "+ATTR+" that benefit the student community","你的图书馆经常举办有益于学生群体的信息丰富的活动。"],
["instr","Mention how <em>frequently</em> you have used the service and why you value it.","adv. 修饰动词 used",M+" Mention + "+OBJ+" how frequently you have used the service + and + "+OBJ+" why you value it","提及你使用该服务的频率以及为什么你重视它。"],
["instr","Explain how <em>frequently</em> this issue occurs and describe its impact.","adv. 修饰动词 occurs",M+" Explain + "+OBJ+" how frequently this issue occurs + and + describe + O(its impact)","解释这个问题发生的频率并描述其影响。"],
["email","I <em>frequently</em> recommend your programs to other students because of the quality of instruction.","adv. 修饰动词 recommend",M+" I frequently recommend + O(your programs) + prep.phrase(to other students) + "+CAU+" because of the quality of instruction","我经常向其他学生推荐你们的项目因为教学质量高。"],
["email","These types of workshops should be held more <em>frequently</em>, as they are highly beneficial.","adv. 修饰动词 held（被动语态）",M+" These types of workshops should be held more frequently + "+CAU+" as they are highly beneficial","这类研讨会应该更频繁地举办因为它们非常有益。"],
["email","I have <em>frequently</em> relied on your guidance when facing academic challenges.","adv. 修饰动词 relied",M+" I have frequently relied on + O(your guidance) + "+TIM+" when facing academic challenges","在面对学术挑战时我经常依赖你的指导。"],
["cross","Customers who <em>frequently</em> experience delays may feel frustrated with the service.","adv. 修饰动词 experience",M+" Customers + "+ATTR+" who frequently experience delays + may feel frustrated + prep.phrase(with the service)","经常遇到延误的顾客可能会对服务感到沮丧。"],
["cross","If such events were organized more <em>frequently</em>, they would benefit a larger number of students.","adv. 修饰动词 organized",COND+" If such events were organized more frequently + "+M+" they would benefit + O(a larger number of students)","如果此类活动更频繁地组织，将使更多学生受益。"]
]},,

{w:"address",ph:"/əˈdres/",pos:"v",cn:"处理;解决",cat:"resolve",stars:2,ss:[
["prompt","A group member's behavior is causing problems and needs to be <em>addressed</em> before the deadline.","v. 被动语态",M+" A group member's behavior is causing problems + and + needs to be addressed + "+TIM+" before the deadline","一位组员的行为正在引起问题，需要在截止日期前解决。"],
["prompt","You are writing to your landlord to <em>address</em> a maintenance issue in your apartment.","v. to address + 宾语",M+" You are writing to your landlord + "+PURP+" to address + O(a maintenance issue in your apartment)","你正在写信给房东处理你公寓的维修问题。"],
["prompt","The university has failed to <em>address</em> repeated complaints about the parking situation.","v. failed to + V",M+" The university has failed to address + O(repeated complaints) + prep.phrase(about the parking situation)","大学未能处理关于停车问题的反复投诉。"],
["instr","Explain the issue and suggest how it should be <em>addressed</em>.","v. 被动语态",M+" Explain + O(the issue) + and + suggest + "+OBJ+" how it should be addressed","解释问题并建议如何解决。"],
["instr","Describe the steps you have taken to <em>address</em> the problem on your own.","v. to address + 宾语",M+" Describe + O(the steps) + "+ATTR+" you have taken + "+PURP+" to address the problem on your own","描述你为自行解决问题所采取的步骤。"],
["email","I am writing to <em>address</em> a concern regarding the noise levels in the dormitory.","v. to address + 宾语",M+" I am writing + "+PURP+" to address + O(a concern) + prep.phrase(regarding the noise levels in the dormitory)","我写信是为了处理关于宿舍噪音水平的问题。"],
["email","I believe we need to <em>address</em> this matter promptly to avoid further complications.","v. need to + V",M+" I believe + "+OBJ+" we need to address this matter promptly + "+PURP+" to avoid further complications","我认为我们需要及时处理此事以避免进一步的问题。"],
["email","Could we schedule a meeting to <em>address</em> the issues that have been affecting our group's progress?","v. to address + 宾语",M+" Could we schedule a meeting + "+PURP+" to address + O(the issues) + "+ATTR+" that have been affecting our group's progress","我们能安排一次会议来处理影响我们小组进展的问题吗？"],
["cross","If the management does not <em>address</em> this issue soon, I will file a formal complaint.","v. 在条件从句中",COND+" If the management does not address this issue soon + "+M+" I will file a formal complaint","如果管理层不尽快解决这个问题，我将提交正式投诉。"],
["cross","I appreciate your willingness to <em>address</em> our dietary concerns for the upcoming event.","v. to address + 宾语",M+" I appreciate + O(your willingness) + "+PURP+" to address our dietary concerns + prep.phrase(for the upcoming event)","我感谢你愿意处理我们即将举办的活动中的饮食问题。"]
]},,

{w:"progress",ph:"/ˈprɒɡres/",pos:"n",cn:"进展",cat:"resolve",stars:1,ss:[
["prompt","Your group project is behind schedule and you are concerned about the lack of <em>progress</em>.","n. 作介词 of 的宾语",M+" Your group project is behind schedule + and + you are concerned about + O(the lack of progress)","你的小组项目落后于计划，你对缺乏进展感到担忧。"],
["prompt","You want to update your professor on the <em>progress</em> of your research assignment.","n. 作介词 on 的宾语",M+" You want to update your professor + prep.phrase(on the progress of your research assignment)","你想就研究作业的进展向教授汇报。"],
["prompt","The renovation of your dormitory building has made little <em>progress</em> over the past month.","n. 作 made 的宾语",M+" The renovation of your dormitory building + has made + O(little progress) + "+TIM+" over the past month","过去一个月宿舍楼的翻新几乎没有进展。"],
["instr","Describe the current <em>progress</em> of the project and identify any obstacles.","n. 作 describe 的宾语",M+" Describe + O(the current progress of the project) + and + identify + O(any obstacles)","描述项目当前的进展并指出任何障碍。"],
["instr","Explain how the lack of <em>progress</em> is affecting the group and suggest a solution.","n. 作介词 of 的宾语",M+" Explain + "+OBJ+" how the lack of progress is affecting the group + and + suggest + O(a solution)","解释缺乏进展如何影响小组并提出解决方案。"],
["email","I am pleased to report that we have made significant <em>progress</em> on the assignment this week.","n. 作 made 的宾语",M+" I am pleased to report + "+OBJ+" that we have made + O(significant progress) + prep.phrase(on the assignment) + "+TIM+" this week","我很高兴地报告我们本周在作业方面取得了重大进展。"],
["email","Unfortunately, our <em>progress</em> has been hindered by the lack of access to the laboratory.","n. 作主语，被动语态",M+" Unfortunately + our progress has been hindered + "+CAU+" by the lack of access to the laboratory","不幸的是，我们的进展因无法进入实验室而受阻。"],
["email","I would like to discuss our <em>progress</em> and determine the next steps for the project.","n. 作 discuss 的宾语",M+" I would like to discuss + O(our progress) + and + determine + O(the next steps for the project)","我想讨论我们的进展并确定项目的下一步计划。"],
["cross","The slow <em>progress</em> on the repairs has left many residents feeling frustrated.","n. 作主语",M+" The slow progress on the repairs + has left + O(many residents) + OC(feeling frustrated)","维修的缓慢进展让许多居民感到沮丧。"],
["cross","Making steady <em>progress</em> requires effective communication among all team members.","n. 作 making 的宾语",M+" "+PART+" Making steady progress + "+M+" requires + O(effective communication) + prep.phrase(among all team members)","取得稳步进展需要所有团队成员之间的有效沟通。"]
]},,

{w:"frustrated",ph:"/frʌˈstreɪtɪd/",pos:"adj",cn:"沮丧的",cat:"resolve",stars:2,ss:[
["prompt","You are <em>frustrated</em> because your group members are not contributing equally to the project.","adj. 作表语",M+" You are frustrated + "+CAU+" because your group members are not contributing equally to the project","你很沮丧因为你的组员们没有平等地为项目做贡献。"],
["prompt","Several students have become <em>frustrated</em> with the unreliable campus Wi-Fi.","adj. 作表语",M+" Several students have become frustrated + prep.phrase(with the unreliable campus Wi-Fi)","几位学生对不可靠的校园Wi-Fi感到沮丧。"],
["prompt","You feel <em>frustrated</em> after receiving an incorrect order from an online store for the second time.","adj. 作表语",M+" You feel frustrated + "+TIM+" after receiving an incorrect order from an online store + prep.phrase(for the second time)","你在第二次从网店收到错误订单后感到沮丧。"],
["instr","Explain why you are <em>frustrated</em> and describe the steps you have already taken.","adj. 作表语",M+" Explain + "+OBJ+" why you are frustrated + and + describe + O(the steps) + "+ATTR+" you have already taken","解释你为什么感到沮丧并描述你已经采取的步骤。"],
["instr","Describe the situation that has made you <em>frustrated</em> and propose a resolution.","adj. 作宾语补足语",M+" Describe + O(the situation) + "+ATTR+" that has made you frustrated + and + propose + O(a resolution)","描述让你沮丧的情况并提出解决方案。"],
["email","I must admit that I am quite <em>frustrated</em> with the lack of response to my previous emails.","adj. 作表语",M+" I must admit + "+OBJ+" that I am quite frustrated + prep.phrase(with the lack of response to my previous emails)","我必须承认，对之前邮件缺乏回复我相当沮丧。"],
["email","As a loyal customer, I feel <em>frustrated</em> that this issue has not been resolved after three attempts.","adj. 作表语",M+" As a loyal customer + I feel frustrated + "+OBJ+" that this issue has not been resolved + "+TIM+" after three attempts","作为忠实客户，这个问题在三次尝试后仍未解决让我感到沮丧。"],
["email","I understand that delays happen, but I am growing increasingly <em>frustrated</em> with the situation.","adj. 作表语",M+" I understand + "+OBJ+" that delays happen + "+CON+" but I am growing increasingly frustrated + prep.phrase(with the situation)","我理解会有延误，但我对这种情况越来越沮丧。"],
["cross","Many attendees felt <em>frustrated</em> because the event itinerary was changed at the last minute.","adj. 作表语",M+" Many attendees felt frustrated + "+CAU+" because the event itinerary was changed at the last minute","许多参加者感到沮丧因为活动行程在最后一刻被更改了。"],
["cross","Being <em>frustrated</em> is understandable, but I suggest we address the issue calmly and professionally.","adj. 在动名词短语中",M+" "+PART+" Being frustrated + "+M+" is understandable + "+CON+" but I suggest + "+OBJ+" we address the issue calmly and professionally","感到沮丧是可以理解的，但我建议我们冷静专业地解决问题。"]
]},,

{w:"unable",ph:"/ʌnˈeɪbl/",pos:"adj",cn:"无法的",cat:"resolve",stars:1,ss:[
["prompt","You are <em>unable</em> to access the online course materials due to a technical error.","adj. be unable to + V",M+" You are unable to access + O(the online course materials) + "+CAU+" due to a technical error","由于技术错误你无法访问在线课程材料。"],
["prompt","Your roommate has been <em>unable</em> to sleep because of construction noise outside the dormitory.","adj. be unable to + V",M+" Your roommate has been unable to sleep + "+CAU+" because of construction noise outside the dormitory","由于宿舍外的施工噪音你的室友一直无法入睡。"],
["prompt","You were <em>unable</em> to attend a mandatory meeting and need to explain the reason.","adj. be unable to + V",M+" You were unable to attend + O(a mandatory meeting) + and + need to explain + O(the reason)","你无法参加一次强制性会议，需要解释原因。"],
["instr","Explain why you are <em>unable</em> to resolve the issue on your own and request assistance.","adj. be unable to + V",M+" Explain + "+OBJ+" why you are unable to resolve the issue on your own + and + request + O(assistance)","解释为什么你无法自行解决问题并请求协助。"],
["instr","Describe why you have been <em>unable</em> to complete the task and suggest a new deadline.","adj. be unable to + V",M+" Describe + "+OBJ+" why you have been unable to complete the task + and + suggest + O(a new deadline)","描述为什么你一直无法完成任务并建议一个新的截止日期。"],
["email","I have been <em>unable</em> to log into the student portal since last Monday.","adj. be unable to + V",M+" I have been unable to log into + O(the student portal) + "+TIM+" since last Monday","自上周一以来我一直无法登录学生门户。"],
["email","Despite multiple attempts, I am still <em>unable</em> to submit my assignment through the online system.","adj. be unable to + V",CON+" Despite multiple attempts + "+M+" I am still unable to submit + O(my assignment) + prep.phrase(through the online system)","尽管多次尝试，我仍然无法通过在线系统提交作业。"],
["email","If I am <em>unable</em> to access the materials by Friday, my grade will be significantly affected.","adj. be unable to + V",COND+" If I am unable to access the materials by Friday + "+M+" my grade will be significantly affected","如果我周五之前无法获取材料，我的成绩将受到严重影响。"],
["cross","Several participants were <em>unable</em> to enjoy the recreational activities due to the poor weather.","adj. be unable to + V",M+" Several participants were unable to enjoy + O(the recreational activities) + "+CAU+" due to the poor weather","由于恶劣天气几位参与者无法享受休闲活动。"],
["cross","I was <em>unable</em> to benefit from the workshop because the content was not relevant to my field.","adj. be unable to + V",M+" I was unable to benefit from + O(the workshop) + "+CAU+" because the content was not relevant to my field","我无法从研讨会中受益因为内容与我的领域不相关。"]
]},,

{w:"sustain",ph:"/səˈsteɪn/",pos:"v",cn:"遭受(损坏)",cat:"complain",stars:3,ss:[
["prompt","The furniture you ordered online <em>sustained</em> significant damage during shipping.","v. 过去时，sustained + damage",M+" The furniture + "+ATTR+" you ordered online + sustained + O(significant damage) + "+TIM+" during shipping","你在网上订购的家具在运输过程中遭受了严重损坏。"],
["prompt","Your laptop <em>sustained</em> water damage after a pipe burst in the dormitory.","v. 过去时",M+" Your laptop sustained + O(water damage) + "+TIM+" after a pipe burst in the dormitory","宿舍水管爆裂后你的笔记本电脑遭受了水损。"],
["prompt","The equipment you rented <em>sustained</em> scratches and dents before it was even delivered.","v. 过去时",M+" The equipment + "+ATTR+" you rented + sustained + O(scratches and dents) + "+TIM+" before it was even delivered","你租的设备在交付前就已经有了划痕和凹痕。"],
["instr","Describe the damage the item <em>sustained</em> and explain when you first noticed it.","v. 过去时，在定语从句中",M+" Describe + O(the damage) + "+ATTR+" the item sustained + and + explain + "+OBJ+" when you first noticed it","描述物品遭受的损坏并解释你何时第一次注意到。"],
["instr","Explain the type of damage <em>sustained</em> and request an appropriate remedy.","v. 过去分词作后置定语",M+" Explain + O(the type of damage sustained) + and + request + O(an appropriate remedy)","说明遭受的损坏类型并请求适当的补救措施。"],
["email","The bookshelf I ordered <em>sustained</em> a large crack along the top panel during transit.","v. 过去时",M+" The bookshelf + "+ATTR+" I ordered + sustained + O(a large crack) + prep.phrase(along the top panel) + "+TIM+" during transit","我订购的书架在运输过程中顶板出现了一条大裂缝。"],
["email","Upon inspection, I discovered that the item had <em>sustained</em> extensive damage to its frame.","v. 过去完成时",M+" Upon inspection + I discovered + "+OBJ+" that the item had sustained + O(extensive damage) + prep.phrase(to its frame)","经检查后我发现该物品的框架遭受了严重损坏。"],
["email","The damage the product <em>sustained</em> makes it completely unusable for its intended purpose.","v. 过去时，在定语从句中",M+" The damage + "+ATTR+" the product sustained + "+M+" makes + O(it) + OC(completely unusable) + prep.phrase(for its intended purpose)","产品遭受的损坏使其完全无法用于预期用途。"],
["cross","If the package <em>sustained</em> damage during delivery, you should be entitled to a full refund.","v. 过去时，在条件从句中",COND+" If the package sustained damage during delivery + "+M+" you should be entitled to + O(a full refund)","如果包裹在递送过程中遭受了损坏，你应该有权获得全额退款。"],
["cross","I am frustrated that the replacement item also <em>sustained</em> damage, just like the original.","v. 过去时",M+" I am frustrated + "+OBJ+" that the replacement item also sustained + O(damage) + prep.phrase(just like the original)","我很沮丧替换品也遭受了损坏，就像原来那个一样。"]
]},,

{w:"problematic",ph:"/ˌprɒbləˈmætɪk/",pos:"adj",cn:"有问题的",cat:"complain",stars:2,ss:[
["prompt","The internet connection in your dormitory has been <em>problematic</em> for several weeks.","adj. 作表语",M+" The internet connection in your dormitory + has been problematic + "+TIM+" for several weeks","你宿舍的网络连接几周来一直有问题。"],
["prompt","You have noticed that the scheduling system for study rooms is <em>problematic</em>.","adj. 作表语",M+" You have noticed + "+OBJ+" that the scheduling system for study rooms is problematic","你注意到自习室的预约系统有问题。"],
["prompt","The new meal plan has been <em>problematic</em> for students with specific dietary needs.","adj. 作表语",M+" The new meal plan has been problematic + prep.phrase(for students with specific dietary needs)","新的用餐计划对有特殊饮食需求的学生来说有问题。"],
["instr","Describe what has been <em>problematic</em> and suggest a way to improve the situation.","adj. 作表语",M+" Describe + "+OBJ+" what has been problematic + and + suggest + O(a way to improve the situation)","描述有什么问题并建议改善情况的方法。"],
["instr","Explain why the current arrangement is <em>problematic</em> and offer an alternative.","adj. 作表语",M+" Explain + "+OBJ+" why the current arrangement is problematic + and + offer + O(an alternative)","解释为什么当前的安排有问题并提供替代方案。"],
["email","I am writing to inform you that the heating system in my apartment has been extremely <em>problematic</em>.","adj. 作表语",M+" I am writing to inform you + "+OBJ+" that the heating system in my apartment has been extremely problematic","我写信通知你我公寓的供暖系统一直非常有问题。"],
["email","The situation has become increasingly <em>problematic</em>, and I would appreciate a prompt response.","adj. 作表语",M+" The situation has become increasingly problematic + and + I would appreciate + O(a prompt response)","情况变得越来越有问题，我希望能得到及时回复。"],
["email","The delivery process was <em>problematic</em> from the start, as the tracking information was never updated.","adj. 作表语",M+" The delivery process was problematic + prep.phrase(from the start) + "+CAU+" as the tracking information was never updated","交付过程从一开始就有问题因为物流信息从未更新。"],
["cross","If the service continues to be <em>problematic</em>, I will have no choice but to cancel my membership.","adj. 作表语（条件从句中）",COND+" If the service continues to be problematic + "+M+" I will have no choice but to cancel my membership","如果服务继续有问题，我将别无选择只能取消会员资格。"],
["cross","The <em>problematic</em> sound quality at the venue made it unable for the audience to enjoy the performance.","adj. 修饰 sound quality",M+" The problematic sound quality at the venue + made + O(it) + OC(unable for the audience to enjoy the performance)","场地有问题的音质让观众无法享受演出。"]
]}
];

registerTask("task2", words, {verbs: verbs, clusters: clusters});
})();
