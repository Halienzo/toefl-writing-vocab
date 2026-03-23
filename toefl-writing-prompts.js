var WRITING_PROMPTS = {

  task2: [
    // ===== Prompt 1 (2026.1.21) — suggest =====
    {
      id: 1,
      category: "suggest",
      scenario: "Your community center is organizing an environmental conservation event next month. Your friend Julia is in charge of planning activities for the event. Write an email to Julia suggesting activities that could be included in the event.",
      recipient: "Julia",
      subject: "Ideas for the Environmental Conservation Event",
      bullets: [
        { action: "suggest", text: "Suggest one or two specific activities for the event." },
        { action: "explain", text: "Explain why these activities would be effective for raising environmental awareness." },
        { action: "offer", text: "Offer to help Julia organize or prepare for the activities you suggested." }
      ],
      keywords: {
        bullet1: ["suggest", "activity", "activities", "tree planting", "cleanup", "recycling", "workshop", "nature walk", "event", "organize"],
        bullet2: ["effective", "awareness", "environment", "educate", "engage", "community", "inspire", "understand", "importance", "conservation"],
        bullet3: ["help", "assist", "volunteer", "prepare", "organize", "contribute", "support", "available", "willing", "happy to"]
      },
      modelResponse: "Dear Julia,\n\nI heard you are organizing the environmental conservation event next month, and I have a couple of ideas that I think would work really well.\n\nFirst, I suggest we organize a neighborhood cleanup walk where participants pick up litter along the river trail. Second, we could set up a recycling workshop where people learn how to sort waste and make simple crafts from recycled materials.\n\nI think these activities would be very effective because they give people hands-on experience. Instead of just listening to a lecture, participants actually do something, which makes the message about protecting the environment much more memorable. The cleanup walk especially helps people see how much waste ends up in nature, which can be a real eye-opener.\n\nI would be happy to help you organize either of these activities. I can gather supplies for the cleanup walk or contact a local artist to lead the recycling workshop. Just let me know what you need!\n\nBest regards",
      pitfall: "Students often list too many activities without explaining why they are effective, resulting in a shallow response that lacks development."
    },

    // ===== Prompt 2 (2026.1.27) — complain =====
    {
      id: 2,
      category: "complain",
      scenario: "You recently ordered a piece of furniture from Home Comforts, an online store. When the item arrived, it was damaged. Write an email to Ms. Brown, the customer service manager, to complain about the situation.",
      recipient: "Ms. Brown",
      subject: "Complaint About Damaged Furniture Order",
      bullets: [
        { action: "describe", text: "Describe the item you purchased and the damage it sustained." },
        { action: "explain", text: "Explain why you are disappointed with the situation." },
        { action: "request", text: "Request a replacement or a refund for the damaged item." }
      ],
      keywords: {
        bullet1: ["purchased", "bought", "ordered", "item", "product", "furniture", "bookshelf", "table", "damaged", "broken", "scratched", "cracked"],
        bullet2: ["disappointed", "frustrated", "upset", "because", "since", "expected", "quality", "unacceptable", "inconvenient", "trusted"],
        bullet3: ["replacement", "refund", "exchange", "return", "would like", "request", "appreciate", "resolve", "compensation", "full refund"]
      },
      modelResponse: "Dear Ms. Brown,\n\nI am writing to inform you about a problem with a recent order I placed with Home Comforts. I purchased a wooden bookshelf, order number HC-2938, which arrived last Tuesday. Unfortunately, when I unpacked it, I found that one of the side panels was cracked and two shelves had deep scratches on the surface.\n\nI am really disappointed because I chose Home Comforts based on the positive reviews about product quality. I had been looking forward to setting up the bookshelf in my living room, but the damage makes it completely unusable. It is frustrating to receive a damaged product after waiting two weeks for delivery.\n\nI would appreciate it if you could arrange a replacement for the bookshelf as soon as possible. If a replacement is not available, I would like to request a full refund. Please let me know the next steps to resolve this matter.\n\nThank you for your attention.\nSincerely",
      pitfall: "Students forget to include specific details about the damage, writing only that the item was 'broken' without describing what exactly was wrong."
    },

    // ===== Prompt 3 (2026.1.28) — suggest =====
    {
      id: 3,
      category: "suggest",
      scenario: "Your friend John is planning a trip to Europe this summer but is unsure which destinations to visit. He has asked for your recommendations. Write an email to John suggesting destinations for his trip.",
      recipient: "John",
      subject: "Destination Ideas for Your Europe Trip",
      bullets: [
        { action: "suggest", text: "Suggest one or two European destinations that John should visit." },
        { action: "explain", text: "Explain what makes these destinations special or worth visiting." },
        { action: "advise", text: "Give John practical travel advice for the destinations you suggested." }
      ],
      keywords: {
        bullet1: ["suggest", "recommend", "visit", "destination", "city", "country", "travel", "trip", "Europe", "go to"],
        bullet2: ["special", "beautiful", "famous", "culture", "history", "architecture", "food", "scenery", "experience", "worth visiting"],
        bullet3: ["advice", "tip", "recommend", "should", "book", "plan", "budget", "season", "transportation", "hotel"]
      },
      modelResponse: "Dear John,\n\nI am so excited to hear about your Europe trip this summer! I have two destinations I strongly recommend.\n\nFirst, you should definitely visit Barcelona, Spain. The architecture there is incredible, especially the famous Sagrada Familia church designed by Gaudi. The city also has amazing beaches and fantastic food. Second, I suggest spending a few days in Prague, Czech Republic. It is much more affordable than Western European cities, and the old town looks like something from a fairy tale with its medieval bridges and castles.\n\nFor practical advice, I recommend booking your flights and hotels at least two months in advance because summer is peak tourist season and prices go up fast. Also, in Barcelona, try to buy tickets for popular attractions online ahead of time to avoid long lines. In Prague, public transportation is very efficient, so you probably do not need to rent a car.\n\nHave an amazing trip!\nBest",
      pitfall: "Students tend to give very generic descriptions like 'it is a nice place' instead of mentioning specific attractions or unique features of the destination."
    },

    // ===== Prompt 4 (2026.2.1) — request =====
    {
      id: 4,
      category: "request",
      scenario: "You recently started taking a yoga class at a local studio. After a few sessions, you have been experiencing back pain and are unsure whether it is related to the yoga exercises. Write an email to the instructor, Ms. Martinez, to ask for advice.",
      recipient: "Ms. Martinez",
      subject: "Seeking Advice About Back Pain After Yoga Sessions",
      bullets: [
        { action: "describe", text: "Describe the back pain you have been experiencing since starting the class." },
        { action: "ask", text: "Ask whether certain yoga poses might be causing or worsening the pain." },
        { action: "request", text: "Request suggestions for modifications or alternative exercises." }
      ],
      keywords: {
        bullet1: ["back pain", "pain", "discomfort", "soreness", "lower back", "started", "after", "sessions", "experiencing", "noticed"],
        bullet2: ["pose", "poses", "exercise", "causing", "worsening", "related", "wonder", "possible", "bending", "stretching"],
        bullet3: ["modification", "alternative", "adjust", "suggestion", "recommend", "easier", "safer", "adapt", "avoid", "gentle"]
      },
      modelResponse: "Dear Ms. Martinez,\n\nI hope this email finds you well. I am writing because I have been experiencing some lower back pain since I started your yoga class about three weeks ago. The pain usually appears the morning after class and feels like a dull ache that lasts for most of the day. It is not extremely severe, but it is definitely noticeable and somewhat uncomfortable.\n\nI am wondering whether certain poses we do in class might be causing this. In particular, I find the deep forward bends and the backbend poses quite challenging, and I think the pain may be related to those movements. Do you think that is possible?\n\nCould you suggest any modifications I could try during class? I really enjoy the sessions and do not want to stop attending, but I want to make sure I am not injuring myself. If there are alternative poses that are gentler on the lower back, I would really appreciate your guidance.\n\nThank you so much.\nBest regards",
      pitfall: "Students often forget to describe the pain specifically (location, timing, severity) and jump straight to asking for advice, making the email feel incomplete."
    },

    // ===== Prompt 5 (2026.2.2) — complain =====
    {
      id: 5,
      category: "complain",
      scenario: "You recently attended an orchestra concert at your university. While you enjoyed the music selection, the sound quality in the auditorium was poor. Write an email to Mr. Bridges, the event coordinator, to provide feedback about the experience.",
      recipient: "Mr. Bridges",
      subject: "Feedback on Sound Quality at the Orchestra Concert",
      bullets: [
        { action: "compliment", text: "Mention what you enjoyed about the concert." },
        { action: "describe", text: "Describe the sound quality problems you experienced." },
        { action: "suggest", text: "Suggest improvements for future concerts." }
      ],
      keywords: {
        bullet1: ["enjoyed", "wonderful", "excellent", "music", "performance", "talented", "selection", "repertoire", "impressed", "appreciated"],
        bullet2: ["sound", "quality", "audio", "echo", "distorted", "loud", "quiet", "unclear", "balance", "microphone", "speakers", "muffled"],
        bullet3: ["suggest", "improve", "recommend", "future", "consider", "test", "sound check", "equipment", "upgrade", "adjust"]
      },
      modelResponse: "Dear Mr. Bridges,\n\nI attended the orchestra concert last Saturday evening, and I wanted to share some feedback. First of all, the music selection was wonderful. The Beethoven symphony and the modern jazz piece were both excellent choices, and the musicians were clearly very talented.\n\nHowever, I was quite disappointed with the sound quality in the auditorium. From where I was sitting in the middle section, the sound was often muffled and the balance between instruments was off. The brass section was far too loud compared to the strings, and during quieter passages, I could barely hear the woodwinds at all. Several people around me mentioned the same issue.\n\nFor future concerts, I would suggest doing a thorough sound check before the event to make sure the acoustics are balanced throughout the hall. It might also help to adjust the speaker placement or bring in a professional sound engineer. These changes would really enhance the overall experience.\n\nThank you for organizing the event.\nBest regards",
      pitfall: "Students spend too much time complimenting the concert and rush through the actual feedback, leaving the sound quality description vague and underdeveloped."
    },

    // ===== Prompt 6 (2026.2.4) — request =====
    {
      id: 6,
      category: "request",
      scenario: "You are a university student who has been struggling in your biology course this semester. You are worried about your grade and want to seek help. Write an email to your professor, Dr. Smith, to request assistance.",
      recipient: "Dr. Smith",
      subject: "Request for Additional Help in Biology",
      bullets: [
        { action: "explain", text: "Explain which topics or concepts you are struggling with." },
        { action: "describe", text: "Describe what steps you have already taken to try to improve." },
        { action: "request", text: "Request a specific form of help, such as office hours, extra materials, or tutoring." }
      ],
      keywords: {
        bullet1: ["struggling", "difficult", "confusing", "trouble", "understand", "concept", "topic", "chapter", "cellular", "genetics", "photosynthesis"],
        bullet2: ["tried", "studied", "reviewed", "textbook", "notes", "watched", "videos", "practice", "effort", "attempted"],
        bullet3: ["office hours", "meeting", "tutor", "tutoring", "materials", "resources", "extra", "additional", "guidance", "appointment"]
      },
      modelResponse: "Dear Dr. Smith,\n\nI am writing because I have been having a difficult time in your biology course this semester, and I would like to ask for some help. Specifically, I am struggling with the topics of cellular respiration and genetics. I find it hard to understand how the different stages of cellular respiration connect to each other, and the genetics problems involving probability are very confusing to me.\n\nI want you to know that I have been trying my best to improve on my own. I have re-read the textbook chapters several times, reviewed my class notes after every lecture, and watched some online videos about these topics. Unfortunately, I still feel lost when I try to solve practice problems.\n\nWould it be possible to meet with you during office hours this week? I think a one-on-one explanation would help me a lot. Also, if you have any extra practice materials or can recommend a tutor, I would really appreciate it.\n\nThank you for your time.\nSincerely",
      pitfall: "Students write vaguely about 'struggling with biology' without identifying specific topics, which makes the request less convincing and harder for the professor to address."
    },

    // ===== Prompt 7 (2026.2.7) — complain =====
    {
      id: 7,
      category: "complain",
      scenario: "You recently bought a kitchen appliance from a store called Kitchen World. The appliance stopped working properly after just one week. Write an email to Ms. Parker, the store manager, to complain about the product.",
      recipient: "Ms. Parker",
      subject: "Complaint About Defective Kitchen Appliance",
      bullets: [
        { action: "describe", text: "Describe the appliance you bought and the problem with it." },
        { action: "explain", text: "Explain how this has affected you." },
        { action: "request", text: "Request a solution such as a repair, replacement, or refund." }
      ],
      keywords: {
        bullet1: ["appliance", "blender", "toaster", "mixer", "bought", "purchased", "stopped", "working", "defective", "malfunction", "broken"],
        bullet2: ["affected", "inconvenient", "frustrating", "unable", "cannot", "rely", "waste", "money", "daily", "routine", "disappointed"],
        bullet3: ["repair", "replacement", "refund", "fix", "exchange", "return", "warranty", "resolve", "solution", "compensation"]
      },
      modelResponse: "Dear Ms. Parker,\n\nI am writing to complain about a blender I purchased from Kitchen World on January 30th. The model is the PowerBlend 3000, and I paid $85 for it. After using it for just one week, the motor started making a loud grinding noise and then stopped working entirely. The blades do not spin anymore no matter which speed setting I use.\n\nThis has been really frustrating for me because I bought this blender specifically to make smoothies every morning as part of my new diet plan. Now I am unable to prepare my meals the way I need to, and I feel like I wasted my money on a product that should have lasted much longer than a week.\n\nI would like to request either a replacement with a new unit or a full refund. Since the product clearly has a manufacturing defect and is still within the warranty period, I believe this is a reasonable request. Please let me know how to proceed.\n\nThank you.\nSincerely",
      pitfall: "Students often fail to mention when the product was purchased or the model name, making it harder to write a convincing and specific complaint."
    },

    // ===== Prompt 8 (2026.2.8) — complain =====
    {
      id: 8,
      category: "complain",
      scenario: "You live in a university dormitory, and the internet connection has been extremely slow for the past two weeks. This is affecting your ability to complete coursework. Write an email to Mr. Evans, the dormitory manager, to complain about the issue.",
      recipient: "Mr. Evans",
      subject: "Complaint About Slow Internet Connection in the Dormitory",
      bullets: [
        { action: "describe", text: "Describe the internet problems you have been experiencing." },
        { action: "explain", text: "Explain how the slow internet is affecting your studies." },
        { action: "request", text: "Request that the issue be resolved as soon as possible." }
      ],
      keywords: {
        bullet1: ["internet", "slow", "connection", "Wi-Fi", "wifi", "speed", "buffering", "disconnects", "loading", "weeks", "unreliable"],
        bullet2: ["studies", "coursework", "assignment", "research", "online", "class", "submit", "deadline", "grades", "affected", "unable"],
        bullet3: ["resolve", "fix", "repair", "upgrade", "soon", "possible", "urgent", "immediately", "technician", "improve", "address"]
      },
      modelResponse: "Dear Mr. Evans,\n\nI am writing to bring to your attention a serious problem with the internet connection in the dormitory. For the past two weeks, the Wi-Fi has been extremely slow and unreliable. Pages take several minutes to load, videos buffer constantly, and the connection drops completely at least three or four times a day, especially during the evening hours.\n\nThis is really affecting my academic work. I have several online classes that require a stable connection, and I have been kicked out of video lectures multiple times. I also need to download research papers and submit assignments through the university portal, and the slow speed has made it nearly impossible to meet my deadlines. Last week I almost missed a submission because the upload kept failing.\n\nI respectfully request that this issue be addressed as soon as possible. Perhaps a technician could check the network equipment, or the bandwidth could be upgraded. Many other students in the building are experiencing the same problem and would also appreciate a quick resolution.\n\nThank you for your attention.\nBest regards",
      pitfall: "Students tend to focus only on the inconvenience without clearly connecting the internet problem to specific academic consequences like missed deadlines or failed uploads."
    },

    // ===== Prompt 9 (2026.2.10) — complain =====
    {
      id: 9,
      category: "complain",
      scenario: "You recently attended a charity event organized by a local nonprofit. While the event was meaningful, there were several issues with the catering service. Write an email to Ms. Johnson, the event organizer, to provide feedback about the catering.",
      recipient: "Ms. Johnson",
      subject: "Feedback on Catering at the Charity Event",
      bullets: [
        { action: "compliment", text: "Mention what you appreciated about the event overall." },
        { action: "describe", text: "Describe the specific problems with the catering service." },
        { action: "suggest", text: "Suggest ways to improve the catering for future events." }
      ],
      keywords: {
        bullet1: ["appreciated", "enjoyed", "meaningful", "wonderful", "cause", "charity", "inspiring", "organized", "event", "community"],
        bullet2: ["catering", "food", "cold", "late", "limited", "options", "vegetarian", "ran out", "quality", "service", "staff", "portions"],
        bullet3: ["suggest", "improve", "recommend", "future", "consider", "caterer", "survey", "dietary", "options", "plan ahead"]
      },
      modelResponse: "Dear Ms. Johnson,\n\nThank you for organizing such a meaningful charity event last weekend. The speakers were truly inspiring, and the fundraising activities were creative and engaging. It was clear that a lot of effort went into planning the event, and I was happy to be part of it.\n\nHowever, I wanted to share some concerns about the catering. The food was served almost 45 minutes late, and by the time it arrived, many dishes were cold. Additionally, there were very limited options for guests with dietary restrictions. I noticed that several vegetarian attendees had almost nothing to eat because the only meatless option ran out very quickly.\n\nFor future events, I would suggest working with a different catering company or at least communicating the schedule more clearly with the current one. It might also help to send out a survey beforehand asking guests about dietary needs so that enough variety and portions can be prepared.\n\nThank you again for all your hard work.\nWarm regards",
      pitfall: "Students often write the feedback section as a harsh complaint rather than constructive feedback, forgetting that the prompt asks for a balanced tone that also acknowledges the positive aspects."
    },

    // ===== Prompt 10 (2026.2.24) — thank =====
    {
      id: 10,
      category: "thank",
      scenario: "You recently completed a group project for one of your university courses. One of your group members, Lisa, went above and beyond to help the team succeed. Write an email to Lisa to thank her for her contributions.",
      recipient: "Lisa",
      subject: "Thank You for Your Amazing Work on the Group Project",
      bullets: [
        { action: "thank", text: "Thank Lisa for her specific contributions to the project." },
        { action: "explain", text: "Explain how her efforts made a difference to the team and the project outcome." },
        { action: "express", text: "Express your appreciation and wish her well in future endeavors." }
      ],
      keywords: {
        bullet1: ["thank", "grateful", "appreciate", "contribution", "effort", "work", "research", "presentation", "slides", "data"],
        bullet2: ["difference", "outcome", "result", "grade", "quality", "team", "improved", "without you", "success", "helped"],
        bullet3: ["appreciate", "wish", "future", "luck", "hope", "work together", "pleasure", "forward", "best", "wonderful"]
      },
      modelResponse: "Dear Lisa,\n\nI just wanted to take a moment to thank you for everything you did on our group project. Your contributions were truly outstanding. You took the lead on the research section, organized all the data into clear charts, and even redesigned the entire presentation slides to make them look more professional. That was so much extra work, and the team really noticed.\n\nYour efforts made a huge difference in the final result. Honestly, I do not think we would have received such a high grade without your dedication. When we were struggling to find reliable sources, you stepped in and found exactly what we needed, which saved us a lot of time and stress. The professor even complimented our visuals, which were all your work.\n\nI truly appreciate having you as a teammate, and I hope we get the chance to work together again in the future. I wish you all the best with the rest of the semester!\n\nWarmly",
      pitfall: "Students write generic thank-you messages without mentioning specific things Lisa did, which makes the email feel impersonal and underdeveloped."
    },

    // ===== Prompt 11 (2026.3.1) — resolve =====
    {
      id: 11,
      category: "resolve",
      scenario: "You are working on a group project for a university course, but the work has been divided unequally. Some members are not contributing their fair share. Write an email to your professor, Dr. Smith, to explain the situation and seek a resolution.",
      recipient: "Dr. Smith",
      subject: "Concerns About Unequal Work Distribution in Group Project",
      bullets: [
        { action: "describe", text: "Describe how the work has been divided unequally in your group." },
        { action: "explain", text: "Explain the steps you have already taken to try to resolve the issue within the group." },
        { action: "request", text: "Request the professor's guidance or intervention to help resolve the situation." }
      ],
      keywords: {
        bullet1: ["unequal", "unfair", "divided", "contribute", "contribution", "workload", "share", "responsible", "tasks", "most of the work"],
        bullet2: ["tried", "discussed", "talked", "meeting", "message", "reminded", "asked", "attempted", "group chat", "confronted"],
        bullet3: ["guidance", "advice", "intervention", "help", "suggestion", "mediate", "peer evaluation", "individual grade", "meeting", "resolve"]
      },
      modelResponse: "Dear Dr. Smith,\n\nI am writing to discuss a concern I have about our group project for your course. Unfortunately, the workload has been divided very unequally. Out of four group members, only two of us, myself and one other student, have been doing almost all of the research, writing, and editing. The other two members have missed several group meetings and have not completed the tasks they were assigned.\n\nI have already tried to address this within the group. I sent messages in our group chat reminding everyone of their responsibilities and even scheduled an extra meeting to redistribute the work. However, the situation has not improved, and our deadline is approaching.\n\nI am not writing this to get anyone in trouble, but I would appreciate your guidance on how to handle this fairly. Would it be possible to include a peer evaluation component so that individual contributions are taken into account? Alternatively, I would welcome any suggestions you might have for resolving this issue.\n\nThank you for your understanding.\nSincerely",
      pitfall: "Students sometimes sound too accusatory or emotional, which makes the email unprofessional. The key is to remain factual and solution-focused."
    },

    // ===== Prompt 12 (2026.3.3) — request =====
    {
      id: 12,
      category: "request",
      scenario: "You attended a choir concert at your community center last week and accidentally left your jacket behind. You believe it may have been left in the auditorium. Write an email to Ms. Davis, the community center coordinator, to ask about the jacket.",
      recipient: "Ms. Davis",
      subject: "Lost Jacket at the Choir Concert Last Week",
      bullets: [
        { action: "describe", text: "Describe the jacket you lost and where you think you left it." },
        { action: "explain", text: "Explain why the jacket is important to you." },
        { action: "request", text: "Request help in locating the jacket or ask about a lost-and-found service." }
      ],
      keywords: {
        bullet1: ["jacket", "coat", "left", "lost", "auditorium", "seat", "row", "black", "blue", "concert", "forgot", "behind"],
        bullet2: ["important", "sentimental", "gift", "expensive", "valuable", "special", "favorite", "meaning", "irreplaceable", "belonged"],
        bullet3: ["lost and found", "check", "look", "locate", "pick up", "retrieve", "collect", "available", "help", "contact"]
      },
      modelResponse: "Dear Ms. Davis,\n\nI hope you are doing well. I am writing because I believe I left my jacket at the community center during the choir concert last Friday evening. It is a dark navy blue jacket with a small logo on the chest pocket and a zipper front. I was sitting in Row F, about four seats from the left aisle. I think I hung it over the back of my chair and forgot to grab it when I left.\n\nThis jacket is very important to me because it was a birthday gift from my grandmother, who passed away last year. It has great sentimental value, and I would be heartbroken if I could not get it back.\n\nCould you please check whether anyone has turned it in to a lost-and-found area? If so, I would be happy to come by the community center anytime this week to pick it up. If it has not been found yet, I would appreciate it if you could let the cleaning staff know to keep an eye out for it.\n\nThank you so much for your help.\nBest regards",
      pitfall: "Students often give a vague description of the jacket (just 'my jacket') without details like color, brand, or distinguishing features, which makes the request less effective."
    },

    // ===== Prompt 13 (2026.3.6) — invite =====
    {
      id: 13,
      category: "invite",
      scenario: "Your company is planning a team-building retreat for next month. You have been asked to help coordinate the event. Write an email to Ms. Taylor, your department head, to discuss the plan and invite her input on activities.",
      recipient: "Ms. Taylor",
      subject: "Team-Building Retreat Planning and Activity Ideas",
      bullets: [
        { action: "inform", text: "Inform Ms. Taylor about the basic plan for the retreat, including the proposed date and location." },
        { action: "suggest", text: "Suggest some team-building activities for the retreat." },
        { action: "invite", text: "Invite Ms. Taylor to share her ideas or preferences for the event." }
      ],
      keywords: {
        bullet1: ["retreat", "planned", "scheduled", "date", "location", "venue", "weekend", "hotel", "resort", "next month"],
        bullet2: ["activity", "activities", "team-building", "games", "workshop", "outdoor", "challenge", "hiking", "cooking", "bonding"],
        bullet3: ["input", "ideas", "suggestions", "preferences", "thoughts", "feedback", "opinion", "welcome", "share", "let me know"]
      },
      modelResponse: "Dear Ms. Taylor,\n\nI am writing to update you on the team-building retreat we are planning for next month. We are looking at holding the event on Saturday, April 12th, at the Lakeside Resort about an hour outside the city. The venue has both indoor meeting rooms and outdoor spaces, which gives us a lot of flexibility for activities.\n\nSo far, I have come up with a few activity ideas. I am thinking we could start the morning with an outdoor problem-solving challenge where teams work together to complete tasks. In the afternoon, a cooking workshop could be fun and would encourage collaboration in a relaxed setting. We could end the day with a casual group discussion about team goals for the next quarter.\n\nI would love to hear your thoughts on these plans. Do you have any preferences for the types of activities, or are there any specific goals you would like the retreat to focus on? Your input would be very valuable in making sure the event is a success.\n\nLooking forward to hearing from you.\nBest regards",
      pitfall: "Students often focus too heavily on logistics and forget to actually invite Ms. Taylor's input, which is a key requirement of the prompt."
    },

    // ===== Prompt 14 (OG) — suggest =====
    {
      id: 14,
      category: "suggest",
      scenario: "Your friend Riley is thinking about starting a food truck business in the downtown area. Riley has asked you for your opinion on what type of food to serve. Write an email to Riley with your recommendation.",
      recipient: "Riley",
      subject: "My Suggestion for Your Food Truck Menu",
      bullets: [
        { action: "suggest", text: "Suggest a type of food or cuisine that Riley should consider for the food truck." },
        { action: "explain", text: "Explain why this type of food would be a good choice for a downtown food truck." },
        { action: "advise", text: "Give Riley practical advice on how to make the food truck successful." }
      ],
      keywords: {
        bullet1: ["suggest", "recommend", "cuisine", "food", "menu", "tacos", "Asian", "Mediterranean", "fusion", "serve", "type"],
        bullet2: ["downtown", "popular", "demand", "affordable", "quick", "workers", "lunch", "crowd", "competition", "unique"],
        bullet3: ["advice", "tip", "social media", "marketing", "price", "location", "quality", "consistent", "customer", "strategy"]
      },
      modelResponse: "Dear Riley,\n\nThat is so exciting that you are starting a food truck! I have been thinking about it, and I strongly recommend going with Korean-Mexican fusion tacos. I know it sounds unusual, but hear me out.\n\nThis type of food would be perfect for a downtown location because it is quick to serve, affordable, and very trendy right now. Most downtown workers only have about 30 minutes for lunch, so they need something fast but delicious. Korean-Mexican fusion is also unique enough to stand out from the regular burger and pizza trucks that are already everywhere downtown. People love trying something different, and the combination of Korean flavors like kimchi and bulgogi with Mexican-style tacos is really popular these days.\n\nMy practical advice would be to start with a small menu of maybe five or six items so you can keep quality high and waste low. Also, create an Instagram page right away and post photos of your food daily. Social media is how most food trucks build their customer base.\n\nGood luck!\nBest",
      pitfall: "Students recommend a generic food type like 'sandwiches' without explaining what makes it a strategic choice for the specific downtown setting."
    },

    // ===== Prompt 15 (OG) — resolve =====
    {
      id: 15,
      category: "resolve",
      scenario: "You are working on a group presentation for a university class. One of your group members, Alex, has not been participating in meetings or completing assigned tasks. Write an email to Alex to address the situation.",
      recipient: "Alex",
      subject: "Checking In About Our Group Presentation",
      bullets: [
        { action: "describe", text: "Describe the tasks that Alex has not completed and the meetings missed." },
        { action: "explain", text: "Explain how this is affecting the group and the project." },
        { action: "propose", text: "Propose a solution or ask Alex to discuss how to move forward." }
      ],
      keywords: {
        bullet1: ["tasks", "missed", "meetings", "assigned", "section", "slides", "research", "deadline", "incomplete", "absent"],
        bullet2: ["affecting", "behind", "schedule", "extra work", "others", "unfair", "progress", "delay", "grade", "team"],
        bullet3: ["solution", "discuss", "plan", "catch up", "redistribute", "meet", "talk", "moving forward", "together", "help"]
      },
      modelResponse: "Dear Alex,\n\nI hope you are doing well. I am reaching out because I wanted to talk about our group presentation that is due next week. I have noticed that you were not able to attend our last two group meetings, and the research summary and three slides you were assigned have not been completed yet. The last deadline for your section was this past Monday.\n\nI understand that things come up, but I wanted to let you know that this is putting the rest of the group in a difficult position. We are now behind schedule, and the other members have had to take on extra tasks to try to keep the project on track. It is becoming stressful for everyone, and we are worried about the quality of our final presentation.\n\nI am not writing this to blame you. I genuinely want to find a way to make this work. Could we meet for coffee tomorrow or have a quick video call? We can figure out a new plan to redistribute the work if needed. Let me know what works for you.\n\nThanks,\nBest regards",
      pitfall: "Students often come across as too confrontational or passive-aggressive, which does not demonstrate the diplomatic tone expected in a Score 5 response."
    }
  ],

  task3: [
    // ===== Prompt 1 (OG) — Volunteering =====
    {
      id: 1,
      topic: "education",
      professor: {
        name: "Dr. Achebe",
        question: "This week, we are discussing community service in education. Many high schools now require students to complete a certain number of volunteer hours before graduation. Some people believe that mandatory volunteering teaches responsibility and empathy, while others argue that forcing students to volunteer defeats the purpose. What is your view? Should community service be a graduation requirement, or should it remain voluntary?"
      },
      studentA: {
        name: "Claire",
        opinion: "I think volunteering should be mandatory for high school students. Many teenagers would never try volunteering on their own, but once they experience it, they often find it rewarding. A requirement gives them the push they need to get involved in their community."
      },
      studentB: {
        name: "Andrew",
        opinion: "I disagree. If students are forced to volunteer, they will just treat it like another assignment to complete. True volunteering comes from genuine compassion, and making it mandatory takes away the personal meaning behind it."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "perspective"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "experience"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "on the other hand"]
      },
      modelResponse: "I agree with Claire that volunteering should be a mandatory requirement for high school students, although I understand Andrew's concern about it feeling forced.\n\nThe reality is that most teenagers are busy with schoolwork and social activities, so they rarely seek out volunteer opportunities on their own. By making it a requirement, schools give students exposure to real-world issues they might never encounter otherwise. For example, when my high school required us to volunteer at a local food bank, I initially did not want to go. However, after spending time there, I developed a genuine interest in helping my community and continued volunteering even after I met the requirement.\n\nWhile Andrew argues that mandatory service removes personal meaning, I think the opposite is often true. Many students discover a passion for service precisely because they were required to try it first. The initial push does not diminish the value of the experience. Furthermore, even if some students only do the minimum, the communities they serve still benefit from their contributions.",
      pitfall: "Students restate Claire's and Andrew's opinions at length instead of developing their own argument with personal examples or reasoning."
    },

    // ===== Prompt 2 (OG) — Boarding schools =====
    {
      id: 2,
      topic: "education",
      professor: {
        name: "Dr. Gupta",
        question: "Today I would like us to consider different schooling models. Boarding schools, where students live on campus, have been an option for centuries. Supporters say they foster independence and provide a structured environment for academic success. Critics, however, argue that separating children from their families at a young age can be emotionally harmful. Do you think boarding schools are beneficial or harmful for students?"
      },
      studentA: {
        name: "Claire",
        opinion: "I think boarding schools are very beneficial. Students learn to be independent, manage their own time, and develop social skills by living with peers. These are life skills that help them succeed in college and beyond."
      },
      studentB: {
        name: "Andrew",
        opinion: "I believe boarding schools can do more harm than good. Children need the emotional support of their families during their formative years. Being away from home can cause loneliness and anxiety, which can actually hurt their academic performance."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "beneficial", "harmful"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "experience"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "in contrast"]
      },
      modelResponse: "I partially agree with both Claire and Andrew, but I lean more toward Andrew's view that boarding schools can be harmful, especially for younger students.\n\nClaire makes a valid point that boarding schools can teach independence. However, I think this benefit depends heavily on the age of the student. A sixteen-year-old might thrive in a boarding school environment, but sending a ten-year-old away from home is a very different situation. Young children are still developing emotionally, and they need the daily presence of their parents for comfort and guidance.\n\nMoreover, while boarding schools provide structure, the same structure can be achieved at a good day school without separating children from their families. For example, my cousin attended a boarding school at age twelve and struggled with homesickness for years, which affected his grades and his confidence. He told me he would have performed much better if he had been able to go home every evening.\n\nTherefore, I believe families should carefully consider the child's age and emotional readiness before choosing a boarding school.",
      pitfall: "Students take an extreme position without acknowledging the valid points of the other side, resulting in a one-sided response that lacks nuance."
    },

    // ===== Prompt 3 (OG) — History study =====
    {
      id: 3,
      topic: "social studies",
      professor: {
        name: "Dr. Morrison",
        question: "This week we are exploring the value of studying history. Some educators argue that a deep understanding of history is essential for making informed decisions in the present and future. Others feel that too much focus on the past distracts us from addressing current challenges and that educational resources should prioritize modern, practical subjects. In your opinion, is studying history essential, or should we focus more on the present?"
      },
      studentA: {
        name: "Claire",
        opinion: "I strongly believe studying history is essential. History teaches us about past mistakes and successes, which helps us make better decisions today. Without understanding where we came from, we are likely to repeat the same errors."
      },
      studentB: {
        name: "Andrew",
        opinion: "While I respect history, I think schools should spend more time on practical, present-focused subjects like technology and financial literacy. The world is changing so fast that what happened centuries ago may not be directly relevant to today's problems."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "essential"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "past"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "that said"]
      },
      modelResponse: "I agree with Claire that studying history is essential, though I think Andrew raises a fair point about the importance of practical subjects.\n\nThe main reason I believe history matters is that it provides context for understanding current events. For instance, you cannot fully understand modern conflicts in many parts of the world without knowing their historical roots. When we study history, we learn patterns of human behavior, political decisions, and social movements that are still relevant today. Ignoring this knowledge would leave us poorly equipped to analyze the present.\n\nHowever, I do not think it has to be an either-or situation, which is where I slightly differ from both Claire and Andrew. Schools can teach history alongside practical subjects like technology and finance. Moreover, history itself can be taught in a practical way. For example, studying the economic history of the Great Depression directly connects to modern financial literacy.\n\nTherefore, rather than reducing history education, we should find ways to integrate it with the practical skills Andrew values.",
      pitfall: "Students argue that history is important but only give abstract reasons ('we learn from the past') without providing concrete historical examples that support their point."
    },

    // ===== Prompt 4 — Self-employment =====
    {
      id: 4,
      topic: "economics",
      professor: {
        name: "Dr. Patel",
        question: "In recent years, more and more people have chosen to work for themselves rather than for a company. This includes freelancers, small business owners, and gig workers. Some people argue that self-employment is the best career option because it offers freedom and flexibility. Others warn that it comes with financial instability and stress. Do you think self-employment is the best option for most people, or are traditional jobs preferable?"
      },
      studentA: {
        name: "Claire",
        opinion: "I believe self-employment is the best option for people who want control over their careers. You can set your own schedule, choose your own projects, and there is no limit to how much you can earn. It is the most rewarding way to work."
      },
      studentB: {
        name: "Andrew",
        opinion: "I think traditional employment is better for most people. A regular job provides a stable salary, health benefits, and retirement plans. Self-employment sounds appealing, but the financial uncertainty and lack of benefits make it too risky for the average person."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "prefer"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "statistics"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "on the other hand"]
      },
      modelResponse: "While I appreciate Claire's enthusiasm for self-employment, I mostly agree with Andrew that traditional jobs are better suited for most people.\n\nClaire is right that self-employment offers freedom, but she overlooks the significant challenges that come with it. Most self-employed people, especially in their first few years, earn less than they would at a regular job and have no guaranteed income. For example, my uncle started a small restaurant business three years ago. Although he loves being his own boss, he works over 70 hours a week and did not earn a profit for the first eighteen months. That kind of financial pressure is not something everyone can handle.\n\nMoreover, Andrew makes an excellent point about benefits. In many countries, health insurance and retirement plans are tied to traditional employment. Self-employed workers must pay for these out of pocket, which significantly reduces their actual earnings.\n\nThat said, I think self-employment can be wonderful for people with strong financial planning skills and a high tolerance for risk. It is just not the best option for everyone.",
      pitfall: "Students focus entirely on the 'freedom' argument without addressing practical concerns like income stability, benefits, or the statistical success rate of self-employment."
    },

    // ===== Prompt 5 — Technology in education =====
    {
      id: 5,
      topic: "education",
      professor: {
        name: "Dr. Chen",
        question: "Technology has transformed the way we learn. Online courses, educational apps, and AI tools are now widely used in classrooms. Proponents say technology has made education more accessible and engaging. However, some critics argue that over-reliance on technology leads to distraction, reduced critical thinking, and a loss of meaningful teacher-student interaction. Has technology made education better or worse overall?"
      },
      studentA: {
        name: "Claire",
        opinion: "Technology has definitely made education better. Students can now access information from anywhere in the world, watch lectures at their own pace, and use interactive tools that make learning more fun. It has opened doors for millions of people who could not attend traditional schools."
      },
      studentB: {
        name: "Andrew",
        opinion: "I think technology has actually made education worse in many ways. Students are constantly distracted by their phones and laptops in class, and many rely on the internet for answers instead of thinking critically. The human connection between teachers and students is being lost."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "better", "worse"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "study"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "admittedly"]
      },
      modelResponse: "I believe technology has made education better overall, so I mostly agree with Claire, but I think Andrew's concerns about distraction deserve attention.\n\nThe biggest advantage of technology in education is accessibility. Before online learning platforms existed, students in rural areas or developing countries had very limited educational opportunities. Now, anyone with an internet connection can take courses from top universities for free. This is a revolutionary change that has benefited millions of learners worldwide.\n\nAdmittedly, Andrew raises a legitimate concern about distraction. However, I would argue that distraction is not a technology problem but a discipline problem. Students who are not interested in learning will find ways to be distracted whether they have a laptop or not. The solution is better classroom management, not removing technology.\n\nFurthermore, technology enables personalized learning. Educational apps can adapt to each student's level and pace, which is something a single teacher with thirty students simply cannot do. Therefore, when used properly, technology is a powerful tool that enhances education rather than diminishing it.",
      pitfall: "Students list technologies (apps, websites, AI) without explaining HOW these tools specifically improve learning outcomes, making their argument superficial."
    },

    // ===== Prompt 6 — Grades =====
    {
      id: 6,
      topic: "education",
      professor: {
        name: "Dr. Williams",
        question: "Grades are a fundamental part of most educational systems. They are used to evaluate student performance and determine academic progress. Some educators believe that grades motivate students to work harder and provide clear feedback. Others argue that grades create unnecessary stress and actually discourage genuine learning because students focus on scores rather than understanding. Do grades encourage real learning, or do they hinder it?"
      },
      studentA: {
        name: "Claire",
        opinion: "I think grades are necessary and helpful. They give students clear goals to work toward and help teachers identify who needs extra support. Without grades, students would have no way to measure their progress or know where they stand."
      },
      studentB: {
        name: "Andrew",
        opinion: "I believe grades do more harm than good. Students become obsessed with getting an A instead of actually understanding the material. The pressure of grades causes anxiety and makes students afraid to take intellectual risks or explore topics they are curious about."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "encourage", "hinder"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "experience"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "in addition"]
      },
      modelResponse: "This is a topic I have thought about a lot, and I find myself agreeing more with Andrew, although I think Claire makes a reasonable point about measuring progress.\n\nFrom my own experience, grades often discourage genuine learning. When I was in high school, I chose easier courses to protect my GPA instead of taking challenging classes that genuinely interested me. I know many classmates who did the same thing. This shows that grades can actually push students away from learning because the risk of a low grade feels too costly.\n\nMoreover, grades often measure memorization rather than understanding. A student who memorizes facts the night before an exam might get an A, while a student who deeply understands the material but struggles with test-taking might get a C. This does not seem like an accurate reflection of learning.\n\nHowever, I acknowledge Claire's point that some form of feedback is necessary. Perhaps a system that combines written evaluations with pass-fail grading would reduce stress while still giving students useful information about their performance.",
      pitfall: "Students argue for or against grades in the abstract without providing personal examples or specific scenarios that illustrate how grades affect learning behavior."
    },

    // ===== Prompt 7 — Large assignments =====
    {
      id: 7,
      topic: "education",
      professor: {
        name: "Dr. Nakamura",
        question: "When students face large assignments like research papers or major projects, they often have to decide how to manage their time. Some students prefer to work gradually, starting early and completing the work in small steps over several weeks. Others prefer to work intensively, waiting until closer to the deadline and completing most of the work in a few concentrated sessions. Which approach do you think is more effective for producing high-quality academic work?"
      },
      studentA: {
        name: "Claire",
        opinion: "I think working gradually is definitely the better approach. When you spread the work over weeks, you have time to revise, ask for feedback, and improve your ideas. Rushing at the last minute usually leads to careless mistakes and shallow analysis."
      },
      studentB: {
        name: "Andrew",
        opinion: "I actually work best under pressure. When I focus intensively for a short period, I am completely immersed in the topic and my ideas flow more naturally. Starting too early sometimes means I lose motivation and end up procrastinating anyway."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "effective", "prefer"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "experience"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "in my experience"]
      },
      modelResponse: "While I can relate to Andrew's experience of working well under pressure, I believe Claire's gradual approach is more effective for producing high-quality academic work.\n\nThe main advantage of starting early is that it allows time for revision. In my experience, the best papers I have written were ones where I completed a first draft early and then had several days to revise and improve it. When I waited until the last minute, I sometimes produced decent work, but I never had the chance to catch errors or deepen my analysis. The quality ceiling is simply higher when you have time to review.\n\nFurthermore, large assignments often involve research, and good research takes time. You might need to request a book from the library or wait for a professor's feedback on your thesis statement. These steps cannot be rushed into a single weekend.\n\nHowever, I think the key insight from Andrew's point is that focused, concentrated work sessions are valuable. Therefore, the ideal approach might be to start early but schedule specific intensive work blocks rather than doing a tiny amount every day.",
      pitfall: "Students pick one approach and argue for it without acknowledging that different tasks or personality types might suit different strategies, making the response seem rigid."
    },

    // ===== Prompt 8 — Advertising and culture =====
    {
      id: 8,
      topic: "social studies",
      professor: {
        name: "Dr. Okonkwo",
        question: "Advertising is everywhere in modern society. Some scholars argue that advertisements reflect the values, beliefs, and priorities of a country's culture. Others contend that advertising primarily reflects the goals of corporations to sell products and does not accurately represent the culture of the people. In your view, does advertising reflect a country's culture, or does it mainly serve commercial interests?"
      },
      studentA: {
        name: "Claire",
        opinion: "I think advertising definitely reflects culture. Companies design ads to appeal to their audience, so they use cultural values, humor, and traditions that people identify with. You can learn a lot about a society by looking at its advertisements."
      },
      studentB: {
        name: "Andrew",
        opinion: "I disagree. Advertising is designed to sell products, not to represent culture. Many ads create unrealistic ideals and promote consumerism. They show what corporations want people to value, not what people actually value."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "reflect"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "advertisement"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "for instance"]
      },
      modelResponse: "I think both Claire and Andrew make valid points, but I believe the truth lies somewhere in the middle. Advertising both reflects and shapes culture at the same time.\n\nClaire is right that advertisers use cultural values to connect with their audience. For instance, advertisements in the United States frequently emphasize individualism and personal freedom, while ads in Japan often highlight harmony and group belonging. These differences clearly mirror real cultural values. If ads did not reflect culture at all, they would not be effective.\n\nHowever, Andrew makes an important point that advertising also distorts culture. Many ads promote beauty standards, lifestyles, and material desires that do not represent how most people actually live. For example, luxury car commercials suggest that success means owning expensive things, which is a corporate message rather than a genuine cultural value.\n\nTherefore, I would argue that advertising is like a funhouse mirror. It reflects real cultural elements but exaggerates and distorts them to serve commercial purposes. We should be critical viewers who can distinguish between authentic cultural reflection and manufactured desire.",
      pitfall: "Students discuss advertising in general terms without giving specific examples of actual advertisements or cultural differences, making the argument feel unsupported."
    },

    // ===== Prompt 9 — Dangerous sports =====
    {
      id: 9,
      topic: "social studies",
      professor: {
        name: "Dr. Larsson",
        question: "Every year, millions of people participate in or watch extreme and dangerous sports such as rock climbing, skydiving, and mixed martial arts. Despite the obvious risks of serious injury or even death, these activities continue to grow in popularity. Why do you think people are attracted to dangerous sports? Is this attraction something positive or something we should be concerned about?"
      },
      studentA: {
        name: "Claire",
        opinion: "I think people are attracted to dangerous sports because they provide an adrenaline rush and a sense of achievement. Pushing your limits in a controlled environment builds confidence and mental toughness, which I see as a very positive thing."
      },
      studentB: {
        name: "Andrew",
        opinion: "I am concerned about the popularity of dangerous sports. I think social media and marketing glamorize the risks and pressure people, especially young people, into trying activities they are not prepared for. The attraction is often about showing off rather than genuine personal growth."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "attracted"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "experience"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "in addition"]
      },
      modelResponse: "I believe the attraction to dangerous sports is driven by a combination of factors, and I agree with Claire that it is mostly a positive phenomenon, though Andrew's concern about social media influence is worth considering.\n\nHumans have always been drawn to challenges and risks. Throughout history, people have explored unknown territories, climbed mountains, and tested their physical limits. Dangerous sports are simply a modern expression of this natural drive. The adrenaline rush Claire mentions is real. It creates a feeling of being fully alive and present in the moment, which is something many people lack in their routine daily lives.\n\nMoreover, overcoming fear in a dangerous sport can genuinely build character. A friend of mine started rock climbing and told me it taught her to stay calm under pressure, a skill she now uses in her professional life as well.\n\nHowever, I think Andrew is right that social media sometimes encourages people to take risks for views rather than personal growth. Nevertheless, this is an issue with social media culture, not with dangerous sports themselves. When practiced responsibly with proper training, extreme sports can be incredibly rewarding.",
      pitfall: "Students explain why people like dangerous sports but forget to address the second part of the question about whether this attraction is positive or concerning."
    },

    // ===== Prompt 10 — Dancing and culture =====
    {
      id: 10,
      topic: "social studies",
      professor: {
        name: "Dr. Rivera",
        question: "Dance has been a part of human civilization for thousands of years, from traditional folk dances to modern styles like hip-hop and contemporary dance. Some scholars argue that dance plays an essential role in preserving cultural identity and bringing communities together. Others believe that while dance is entertaining, its cultural importance has diminished in modern society. Do you think dance still plays an important role in culture today?"
      },
      studentA: {
        name: "Claire",
        opinion: "Absolutely. Dance is one of the most powerful forms of cultural expression. Traditional dances pass down stories and values from one generation to the next, and modern dance styles create new cultural movements. Dance is very much alive and relevant."
      },
      studentB: {
        name: "Andrew",
        opinion: "I think dance is mainly entertainment now. Most people watch dance on TV shows or social media for fun, not for cultural meaning. Traditional dances are becoming less common, and modern dance styles are more about individual expression than community culture."
      },
      keywords: {
        opinion: ["agree", "disagree", "believe", "think", "opinion", "view", "feel", "important", "role"],
        reference: ["Claire", "Andrew", "professor", "point", "argument", "claim", "mentioned", "stated"],
        evidence: ["example", "instance", "because", "reason", "evidence", "shows", "research", "culture"],
        connector: ["however", "moreover", "although", "therefore", "furthermore", "while", "nevertheless", "for example"]
      },
      modelResponse: "I strongly agree with Claire that dance continues to play a vital role in culture, and I think Andrew underestimates its significance even in modern contexts.\n\nFirst, traditional dances remain deeply important in many communities around the world. For example, in many Latin American countries, traditional dances like salsa and tango are not just performances but are central to social gatherings, celebrations, and national identity. Similarly, indigenous communities use dance to preserve their history and spiritual practices. These traditions have not disappeared.\n\nMoreover, even the modern dance styles that Andrew dismisses as entertainment carry cultural weight. Hip-hop dance, for instance, emerged from African American communities and became a global cultural movement that expresses resistance, creativity, and identity. The fact that it spreads through social media does not reduce its cultural value. It actually amplifies it by connecting people across borders.\n\nWhile Andrew is right that some people consume dance passively as entertainment, this has always been partly true. What matters is that dance continues to bring people together, tell stories, and express cultural identity, which it clearly still does.",
      pitfall: "Students write about dance in very general terms ('dance is important because it is cultural') without naming specific dance forms or explaining how they connect to particular cultural traditions."
    }
  ]

};
