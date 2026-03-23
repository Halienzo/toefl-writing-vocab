// ============================================================
// TOEFL Writing Mock Test Engine (Task 2 & Task 3)
// Rubric-based scoring + interactive feedback
// Note: innerHTML usage is limited to our own ICON module
// output (safe pre-built SVG strings) and improvement tips
// with lightbulb icons. No user input is rendered via innerHTML.
// ============================================================

(function(){

var RUBRIC = {
  task2: {
    5:{level:"Fully Successful",desc:"Effective, clearly expressed, consistent facility in language use.",details:["Elaboration that effectively supports the communicative purpose","Effective syntactic variety and precise, idiomatic word choice","Consistent use of appropriate social conventions","Almost no lexical or grammatical errors"]},
    4:{level:"Generally Successful",desc:"Mostly effective and easily understood. Language facility adequate.",details:["Adequate elaboration to support the communicative purpose","Syntactic variety and appropriate word choice","Mostly appropriate social conventions","Few lexical or grammatical errors"]},
    3:{level:"Partially Successful",desc:"Generally accomplishes the task. Limitations may prevent full clarity.",details:["Elaboration that partially supports the communicative purpose","A moderate range of syntax and vocabulary","Some noticeable errors in structure, word forms, or social conventions"]},
    2:{level:"Mostly Unsuccessful",desc:"Attempt to address the task, but mostly ineffective.",details:["Limited or irrelevant elaboration","Limited range of syntax and vocabulary","An accumulation of errors in sentence structure and/or language use"]},
    1:{level:"Unsuccessful",desc:"Ineffective attempt. Message may be unintelligible.",details:["Very little elaboration","Telegraphic language with very limited vocabulary","Serious and frequent errors","Minimal original language"]},
    0:{level:"No Response",desc:"Blank, off-topic, not English, or copied from prompt.",details:[]}
  },
  task3: {
    5:{level:"Fully Successful",desc:"Relevant, very clearly expressed contribution. Consistent facility in language.",details:["Relevant and well-elaborated explanations, exemplifications and/or details","Effective use of a variety of syntactic structures and precise word choice","Almost no lexical or grammatical errors"]},
    4:{level:"Generally Successful",desc:"Relevant contribution. Ideas easily understood.",details:["Relevant and adequately elaborated explanations, exemplifications and/or details","A variety of syntactic structures and appropriate word choice","Few lexical or grammatical errors"]},
    3:{level:"Partially Successful",desc:"Mostly relevant and mostly understandable. Some facility in language.",details:["Elaboration in which part may be missing, unclear or irrelevant","Some variety in syntactic structures and a range of vocabulary","Some noticeable lexical and grammatical errors"]},
    2:{level:"Mostly Unsuccessful",desc:"Attempt to contribute, but ideas may be hard to follow.",details:["Ideas that may be poorly elaborated or only partially relevant","A limited range of syntactic structures and vocabulary","An accumulation of errors"]},
    1:{level:"Unsuccessful",desc:"Ineffective attempt. Limitations prevent expression of ideas.",details:["Few or no coherent ideas","Severely limited range of structures and vocabulary","Serious and frequent errors","Minimal original language"]},
    0:{level:"No Response",desc:"Blank, off-topic, not English, or copied from prompt.",details:[]}
  }
};

function analyzeText(text){
  var words = text.trim().split(/\s+/).filter(function(w){return w.length>0;});
  var sentences = text.split(/[.!?]+/).filter(function(s){return s.trim().length>3;});
  var uniqueWords = {};
  words.forEach(function(w){var lw=w.toLowerCase().replace(/[^a-z'-]/g,'');if(lw.length>0)uniqueWords[lw]=true;});
  var connectors = ["however","moreover","furthermore","nevertheless","therefore","although","because","since","while","whereas","consequently","additionally","meanwhile","instead","otherwise","similarly","specifically","indeed"];
  var foundConnectors = [];
  connectors.forEach(function(c){if(text.toLowerCase().indexOf(c)>-1)foundConnectors.push(c);});
  var questionCount = (text.match(/\?/g)||[]).length;
  var conditionalCount = 0;
  ["if ","would ","could ","should "].forEach(function(c){conditionalCount+=(text.match(new RegExp(c,"gi"))||[]).length;});
  var politeExpressions = [];
  ["i would appreciate","could you please","i would like to","would it be possible","thank you for","i am writing to","i hope","please let me know","looking forward","i sincerely","if you could"].forEach(function(p){if(text.toLowerCase().indexOf(p)>-1)politeExpressions.push(p);});
  var hasGreeting = /^(dear|hi|hello|hey)\s/im.test(text);
  var hasClosing = /(sincerely|best regards|regards|best wishes|thank you|thanks|yours truly)[,.]?\s*$/im.test(text)||(/(sincerely|best regards|regards)[,.]?\s*\n/im.test(text));
  var evidenceMarkers = [];
  ["for example","for instance","such as","in fact","according to","research shows","in my experience","personally"].forEach(function(m){if(text.toLowerCase().indexOf(m)>-1)evidenceMarkers.push(m);});
  var opinionMarkers = [];
  ["i agree","i disagree","i believe","i think","in my opinion","from my perspective","i feel","i would argue","i maintain","i strongly"].forEach(function(m){if(text.toLowerCase().indexOf(m)>-1)opinionMarkers.push(m);});
  var sentLengths = sentences.map(function(s){return s.trim().split(/\s+/).length;});
  var avgSentLen = sentLengths.length?sentLengths.reduce(function(a,b){return a+b;},0)/sentLengths.length:0;
  var sentLenVar = 0;
  if(sentLengths.length>1){sentLengths.forEach(function(l){sentLenVar+=(l-avgSentLen)*(l-avgSentLen);});sentLenVar=Math.sqrt(sentLenVar/sentLengths.length);}
  var ttr = words.length>0?Object.keys(uniqueWords).length/words.length:0;
  var commonErrors = {"recieve":"receive","definately":"definitely","occured":"occurred","seperate":"separate","accomodate":"accommodate","untill":"until","recomend":"recommend","sucessful":"successful","necesary":"necessary","enviroment":"environment","alot":"a lot"};
  var spellingIssues = [];
  Object.keys(commonErrors).forEach(function(wrong){if(text.toLowerCase().indexOf(wrong)>-1)spellingIssues.push(wrong+" -> "+commonErrors[wrong]);});
  var capIssues = 0;
  sentences.forEach(function(s){var t=s.trim();if(t.length>0&&t[0]===t[0].toLowerCase()&&/[a-z]/.test(t[0]))capIssues++;});
  return {wordCount:words.length,sentenceCount:sentences.length,uniqueWordCount:Object.keys(uniqueWords).length,ttr:ttr,avgSentenceLength:avgSentLen,sentLengthVariance:sentLenVar,connectors:foundConnectors,questionCount:questionCount,conditionalCount:conditionalCount,politeExpressions:politeExpressions,hasGreeting:hasGreeting,hasClosing:hasClosing,evidenceMarkers:evidenceMarkers,opinionMarkers:opinionMarkers,spellingIssues:spellingIssues,capIssues:capIssues};
}

function checkBulletCoverage(text, keywords){
  var lower = text.toLowerCase();
  var results = [];
  Object.keys(keywords).forEach(function(k){
    var found = [];
    keywords[k].forEach(function(kw){if(lower.indexOf(kw.toLowerCase())>-1)found.push(kw);});
    results.push({key:k,covered:found.length>=1,matchCount:found.length,foundWords:found});
  });
  return results;
}

function checkOriginality(text, promptText){
  var pw = promptText.toLowerCase().split(/\s+/);
  var rl = text.toLowerCase();
  var copied = 0;
  for(var i=0;i<pw.length-4;i++){var phrase=pw.slice(i,i+5).join(" ");if(rl.indexOf(phrase)>-1)copied++;}
  var ratio = pw.length>5?copied/(pw.length-4):0;
  return {copiedRatio:ratio,isOriginal:ratio<0.15};
}

function checkReferenceToStudents(text, nameA, nameB){
  var lower = text.toLowerCase();
  var refs = [];
  if(lower.indexOf(nameA.toLowerCase())>-1) refs.push(nameA);
  if(lower.indexOf(nameB.toLowerCase())>-1) refs.push(nameB);
  ["he says","she says","he argues","she argues","he believes","she believes","his point","her point","both students"].forEach(function(r){if(lower.indexOf(r)>-1)refs.push(r);});
  return refs;
}

function scoreTask2(text, prompt){
  var a = analyzeText(text);
  var bc = checkBulletCoverage(text, prompt.keywords);
  var orig = checkOriginality(text, prompt.scenario+" "+prompt.bullets.map(function(b){return b.text;}).join(" "));
  var coveredCount = bc.filter(function(b){return b.covered;}).length;
  var totalBullets = bc.length;

  var pScore, pFb=[];
  if(a.wordCount<10){pScore=0;pFb.push("Response is too short.");}
  else if(coveredCount===totalBullets&&a.wordCount>=100){pScore=5;pFb.push("All "+totalBullets+" bullet points addressed with good elaboration.");}
  else if(coveredCount===totalBullets&&a.wordCount>=60){pScore=4;pFb.push("All points addressed. Add more detail for each to reach Score 5.");}
  else if(coveredCount>=totalBullets-1){pScore=3;bc.forEach(function(b){if(!b.covered)pFb.push("Missing: "+b.key);});pFb.push("Address all bullet points and elaborate.");}
  else if(coveredCount>=1){pScore=2;pFb.push("Only "+coveredCount+"/"+totalBullets+" requirements addressed.");}
  else{pScore=1;pFb.push("None of the required points appear addressed.");}

  var synPts=0;
  if(a.sentenceCount>=5)synPts++;if(a.connectors.length>=3)synPts++;if(a.questionCount>=1)synPts++;if(a.ttr>=0.45)synPts++;if(a.sentLengthVariance>=3)synPts++;
  var synScore=Math.min(5,synPts+(a.wordCount>=80?1:0));
  var synFb=[];
  if(a.connectors.length<2)synFb.push("Use more connectors (however, because, moreover). Found: "+(a.connectors.length?a.connectors.join(", "):"none"));
  if(a.questionCount===0)synFb.push("Add a question for sentence variety.");
  if(a.ttr<0.45)synFb.push("Vocabulary range is limited.");
  if(synScore>=4)synFb.push("Good syntactic variety detected.");

  var socPts=0,socFb=[];
  if(a.hasGreeting){socPts+=2;socFb.push("Greeting detected.");}else socFb.push("Missing greeting (Dear.../Hi...).");
  if(a.hasClosing){socPts++;socFb.push("Closing detected.");}else socFb.push("Missing closing (Sincerely/Best regards).");
  if(a.politeExpressions.length>=1){socPts++;socFb.push("Polite expression(s): "+a.politeExpressions.join(", "));}else socFb.push("Add polite expressions.");
  if(a.politeExpressions.length>=2)socPts++;
  var socScore=Math.min(5,socPts);

  var accScore=4,accFb=[];
  if(a.spellingIssues.length>0){accScore-=a.spellingIssues.length;accFb.push("Spelling: "+a.spellingIssues.join("; "));}
  if(a.capIssues>1){accScore--;accFb.push(a.capIssues+" sentences start with lowercase.");}
  if(!orig.isOriginal){accScore--;accFb.push("Heavy copying from prompt detected.");}
  accScore=Math.max(1,Math.min(5,accScore));
  if(accFb.length===0)accFb.push("No major accuracy issues detected (full grammar check requires human review).");

  var overall=Math.round((pScore*0.35+synScore*0.20+socScore*0.25+accScore*0.20)*10)/10;
  return {overall:Math.min(5,Math.max(0,overall)),dimensions:[
    {name:"Communicative Purpose",score:pScore,max:5,feedback:pFb,weight:"35%",details:bc},
    {name:"Syntactic Variety",score:synScore,max:5,feedback:synFb,weight:"20%"},
    {name:"Social Conventions",score:socScore,max:5,feedback:socFb,weight:"25%"},
    {name:"Language Accuracy",score:accScore,max:5,feedback:accFb,weight:"20%",note:"Estimated"}
  ],stats:a,rubric:RUBRIC.task2[Math.round(overall)]||RUBRIC.task2[3]};
}

function scoreTask3(text, prompt){
  var a = analyzeText(text);
  var orig = checkOriginality(text, prompt.professor.question+" "+prompt.studentA.opinion+" "+prompt.studentB.opinion);
  var refs = checkReferenceToStudents(text, prompt.studentA.name, prompt.studentB.name);

  var cPts=0,cFb=[];
  if(a.opinionMarkers.length>=1){cPts+=2;cFb.push("Opinion expressed: "+a.opinionMarkers[0]);}else cFb.push("No clear opinion. Use 'I agree/disagree/believe that...'");
  if(refs.length>=1){cPts++;cFb.push("References: "+refs.join(", "));}else cFb.push("No reference to other students. Mention their points.");
  if(orig.isOriginal){cPts++;cFb.push("Original language used.");}else cFb.push("Too much copied from prompt.");
  if(a.wordCount>=100)cPts++;
  var cScore=Math.min(5,cPts);

  var ePts=0,eFb=[];
  if(a.evidenceMarkers.length>=1){ePts+=2;eFb.push("Evidence: "+a.evidenceMarkers.join(", "));}else eFb.push("Add examples (for example, such as).");
  var reasons=a.connectors.filter(function(c){return["because","since","therefore","consequently"].indexOf(c)>-1;});
  if(reasons.length>=1){ePts++;eFb.push("Reasoning: "+reasons.join(", "));}else eFb.push("Add reasoning (because, therefore).");
  if(a.wordCount>=100){ePts++;eFb.push("Word count: "+a.wordCount+" (meets 100-word minimum).");}else eFb.push("Word count: "+a.wordCount+" (below 100). Develop further.");
  if(a.sentenceCount>=5)ePts++;
  var eScore=Math.min(5,ePts);

  var synPts=0,synFb=[];
  if(a.sentenceCount>=4)synPts++;if(a.connectors.length>=3)synPts++;if(a.ttr>=0.45)synPts++;if(a.sentLengthVariance>=3)synPts++;if(a.conditionalCount>=1)synPts++;
  var synScore=Math.min(5,synPts+1);
  if(a.connectors.length<3)synFb.push("Use more connectors. Found: "+(a.connectors.length?a.connectors.join(", "):"none"));
  else synFb.push("Good connector usage: "+a.connectors.join(", "));

  var accScore=4,accFb=[];
  if(a.spellingIssues.length>0){accScore-=a.spellingIssues.length;accFb.push("Spelling: "+a.spellingIssues.join("; "));}
  if(a.capIssues>1){accScore--;accFb.push(a.capIssues+" sentences start with lowercase.");}
  accScore=Math.max(1,Math.min(5,accScore));
  if(accFb.length===0)accFb.push("No major accuracy issues (full grammar check requires human review).");

  var overall=Math.round((cScore*0.30+eScore*0.30+synScore*0.20+accScore*0.20)*10)/10;
  return {overall:Math.min(5,Math.max(0,overall)),dimensions:[
    {name:"Relevant Contribution",score:cScore,max:5,feedback:cFb,weight:"30%"},
    {name:"Elaboration Quality",score:eScore,max:5,feedback:eFb,weight:"30%"},
    {name:"Syntactic Variety",score:synScore,max:5,feedback:synFb,weight:"20%"},
    {name:"Language Accuracy",score:accScore,max:5,feedback:accFb,weight:"20%",note:"Estimated"}
  ],stats:a,rubric:RUBRIC.task3[Math.round(overall)]||RUBRIC.task3[3]};
}

var improveTips = {
  "Communicative Purpose":{1:"Address at least one bullet point.",2:"Cover more required points.",3:"Address ALL bullet points with 1-2 sentences each.",4:"Add detailed elaboration with specific examples."},
  "Relevant Contribution":{1:"State a clear opinion (I agree/disagree).",2:"Express opinion AND mention other students.",3:"Add examples to support your opinion. Reference both students.",4:"Develop one argument in depth with original reasoning."},
  "Elaboration Quality":{1:"Write more. Aim for 50+ words.",2:"Add a specific example (for example, such as).",3:"Include 2+ reasons with examples. Reach 100 words.",4:"Develop one argument in depth rather than listing many."},
  "Syntactic Variety":{1:"Write in complete sentences.",2:"Use 2+ different connectors.",3:"Add a question or conditional. Use 3+ connectors.",4:"Vary sentence length. Mix short and complex sentences."},
  "Social Conventions":{1:"Add greeting (Dear/Hi) and closing (Sincerely).",2:"Add greeting AND closing plus one polite expression.",3:"Use polite forms (I would appreciate, Could you please).",4:"Maintain polite register throughout with 2+ polite expressions."},
  "Language Accuracy":{1:"Write complete sentences with subjects and verbs.",2:"Check capitalization at sentence starts.",3:"Proofread for common spelling errors.",4:"Double-check word forms and agreement."}
};

// --- UI ---
window.initWritingMock = function(taskType){
  var paneId = taskType==="task2"?"pane-emailmock":"pane-discmock";
  var pane = document.getElementById(paneId);
  if(!pane)return;
  if(typeof WRITING_PROMPTS==="undefined"){pane.textContent="Loading prompts...";return;}
  renderHome(pane, taskType);
};

function renderHome(pane, taskType){
  pane.textContent="";
  var prompts = taskType==="task2"?WRITING_PROMPTS.task2:WRITING_PROMPTS.task3;
  if(!prompts||!prompts.length){pane.textContent="No prompts available.";return;}
  var isE = taskType==="task2";
  var desc=el("div","task-desc "+(isE?"t2":"t3"));
  desc.appendChild(elText("h3",isE?"Email Writing Mock":"Academic Discussion Mock"));
  desc.appendChild(elText("p",isE?"Write an email in 7 min. Rubric-based scoring on 4 dimensions.":"Write a discussion post in 10 min. Scoring aligned with ETS criteria."));
  pane.appendChild(desc);
  pane.appendChild(elText("div","Choose a prompt ("+prompts.length+" available):",{cssText:"font-size:.82rem;font-weight:700;padding:8px 0 4px"}));

  prompts.forEach(function(pr,idx){
    var card=el("div","module-card");card.style.cursor="pointer";
    var head=el("div","module-head");
    head.style.borderLeft="4px solid "+(isE?"var(--t2)":"var(--t3)");
    var num=elText("span","#"+(idx+1),{cssText:"font-size:.78rem;font-weight:800;color:"+(isE?"var(--t2)":"var(--t3)")+";min-width:24px"});
    var wrap=el("div");wrap.style.flex="1";
    wrap.appendChild(elText("div",isE?pr.scenario.substring(0,80)+"...":pr.topic,{cssText:"font-size:.82rem;font-weight:600"}));
    wrap.appendChild(elText("div",isE?pr.category:"Prof: "+pr.professor.name,{cssText:"font-size:.68rem;color:var(--muted)"}));
    head.appendChild(num);head.appendChild(wrap);
    if(typeof ICON!=="undefined"){var ar=el("span");ar.style.color="var(--dim)";setSafeIcon(ar,ICON.chevronRight(16));head.appendChild(ar);}
    card.appendChild(head);
    card.addEventListener("click",function(){startTest(pane,taskType,pr);});
    pane.appendChild(card);
  });
}

function startTest(pane, taskType, prompt){
  pane.textContent="";
  var isE=taskType==="task2";
  var timeLimit=isE?420:600;
  var timeLeft=timeLimit;
  var timerInt;

  var header=el("div");header.style.cssText="display:flex;justify-content:space-between;align-items:center;padding:6px 0";
  header.appendChild(elText("div",isE?"Write an Email":"Academic Discussion",{cssText:"font-size:.82rem;font-weight:700"}));
  var timerEl=elText("div",formatTime(timeLeft),{cssText:"font-size:.88rem;font-weight:700;color:var(--gold);font-family:monospace"});
  header.appendChild(timerEl);pane.appendChild(header);

  var prog=el("div","progress");var fill=el("div","progress-fill "+(isE?"pf-t2":"pf-t3"));fill.style.width="100%";prog.appendChild(fill);pane.appendChild(prog);

  // Prompt
  var pc=el("div");pc.style.cssText="background:var(--card);border-radius:10px;padding:14px;margin:8px 0;border-left:4px solid "+(isE?"var(--t2)":"var(--t3)");
  if(isE){
    pc.appendChild(elText("div",prompt.scenario,{cssText:"font-size:.82rem;color:var(--text);margin-bottom:8px;line-height:1.6"}));
    pc.appendChild(elText("div","Write an email to "+prompt.recipient+":",{cssText:"font-size:.72rem;color:var(--dim);font-weight:600;margin-bottom:4px"}));
    prompt.bullets.forEach(function(b){pc.appendChild(elText("div","\u2022 "+b.text,{cssText:"font-size:.8rem;color:var(--text);padding:2px 0 2px 12px"}));});
  } else {
    pc.appendChild(elText("div",prompt.professor.name,{cssText:"font-size:.68rem;color:var(--blue);font-weight:700;margin-bottom:2px"}));
    pc.appendChild(elText("div",prompt.professor.question,{cssText:"font-size:.82rem;color:var(--text);margin-bottom:10px;line-height:1.6"}));
    [prompt.studentA,prompt.studentB].forEach(function(stu){
      pc.appendChild(elText("div",stu.name,{cssText:"font-size:.68rem;color:var(--purple);font-weight:700;margin-top:6px"}));
      pc.appendChild(elText("div",stu.opinion,{cssText:"font-size:.8rem;color:var(--muted);line-height:1.5"}));
    });
    pc.appendChild(elText("div","Express and support your opinion. Contribute in your own words. (100+ words)",{cssText:"font-size:.72rem;color:var(--dim);margin-top:8px;font-style:italic"}));
  }
  pane.appendChild(pc);

  if(isE) pane.appendChild(elText("div","To: "+prompt.recipient+" | Subject: "+(prompt.subject||""),{cssText:"font-size:.75rem;color:var(--dim);padding:6px 0 2px"}));

  var ta=document.createElement("textarea");
  ta.style.cssText="width:100%;min-height:220px;padding:14px;border:1px solid var(--border);background:var(--surface);color:var(--text);border-radius:10px;font-size:.88rem;line-height:1.7;font-family:inherit;resize:vertical;outline:none";
  ta.placeholder=isE?"Dear "+prompt.recipient+",\n\n":"I believe that...";
  pane.appendChild(ta);

  var wcDisp=elText("div","Words: 0",{cssText:"font-size:.72rem;color:var(--dim);padding:4px 0;text-align:right"});
  pane.appendChild(wcDisp);
  ta.addEventListener("input",function(){
    var wc=this.value.trim().split(/\s+/).filter(function(w){return w.length>0;}).length;
    wcDisp.textContent="Words: "+wc;
    wcDisp.style.color=wc>=(isE?60:100)?"var(--accent)":"var(--dim)";
  });

  var btnDiv=el("div");btnDiv.style.cssText="display:flex;gap:8px;justify-content:center;padding:12px 0;flex-wrap:wrap";
  var subBtn=elText("button","Submit for Analysis",{cssText:"padding:12px 28px;border:1px solid var(--gold);background:var(--gold);color:#0a0f1a;border-radius:10px;cursor:pointer;font-size:.88rem;font-weight:700;min-height:48px"});
  subBtn.addEventListener("click",function(){
    clearInterval(timerInt);
    if(ta.value.trim().length<5){alert("Please write your response first.");return;}
    var result=isE?scoreTask2(ta.value,prompt):scoreTask3(ta.value,prompt);
    renderFeedback(pane,taskType,prompt,ta.value,result);
  });
  var canBtn=elText("button","Cancel",{cssText:"padding:12px 20px;border:1px solid var(--border);background:var(--surface);color:var(--text);border-radius:10px;cursor:pointer;font-size:.85rem;min-height:48px"});
  canBtn.addEventListener("click",function(){clearInterval(timerInt);renderHome(pane,taskType);});
  btnDiv.appendChild(subBtn);btnDiv.appendChild(canBtn);pane.appendChild(btnDiv);

  timerInt=setInterval(function(){
    timeLeft--;timerEl.textContent=formatTime(timeLeft);
    fill.style.width=Math.round(timeLeft/timeLimit*100)+"%";
    if(timeLeft<=60)timerEl.style.color="var(--red)";
    if(timeLeft<=0){clearInterval(timerInt);timerEl.textContent="TIME UP";
      if(ta.value.trim().length>=5){var r=isE?scoreTask2(ta.value,prompt):scoreTask3(ta.value,prompt);renderFeedback(pane,taskType,prompt,ta.value,r);}
    }
  },1000);
  ta.focus();
}

function renderFeedback(pane, taskType, prompt, text, result){
  pane.textContent="";
  // Score card
  var sc=el("div");sc.style.cssText="text-align:center;padding:20px;background:var(--surface);border:1px solid var(--border);border-radius:14px;margin:8px 0;box-shadow:var(--shadow)";
  sc.appendChild(elText("div",result.overall.toFixed(1)+" / 5",{cssText:"font-size:2.5rem;font-weight:800;color:"+(result.overall>=4?"var(--accent)":result.overall>=3?"var(--gold)":"var(--red)")}));
  sc.appendChild(elText("div",result.rubric.level,{cssText:"font-size:.88rem;color:var(--muted);margin-top:4px;font-weight:600"}));
  sc.appendChild(elText("div",result.rubric.desc,{cssText:"font-size:.75rem;color:var(--dim);margin-top:4px;max-width:500px;margin-left:auto;margin-right:auto"}));
  sc.appendChild(elText("div","Words: "+result.stats.wordCount+" | Sentences: "+result.stats.sentenceCount+" | Unique: "+result.stats.uniqueWordCount+" | Connectors: "+result.stats.connectors.length,{cssText:"font-size:.72rem;color:var(--dim);padding:8px 0 0"}));
  pane.appendChild(sc);

  // Dimension cards
  result.dimensions.forEach(function(dim){
    var card=el("div","module-card open");
    var head=el("div","module-head");
    var tw=el("div");tw.style.flex="1";
    tw.appendChild(elText("div",dim.name+" ("+dim.weight+")",{cssText:"font-size:.85rem;font-weight:700"}));
    tw.appendChild(elText("div",dim.score+"/"+dim.max,{cssText:"font-size:.72rem;color:"+(dim.score>=4?"var(--accent)":dim.score>=3?"var(--gold)":"var(--red)")}));
    var bar=el("div");bar.style.cssText="width:60px;height:6px;background:var(--card);border-radius:3px;overflow:hidden;flex-shrink:0";
    var bf=el("div");bf.style.cssText="height:100%;border-radius:3px;background:"+(dim.score>=4?"var(--accent)":dim.score>=3?"var(--gold)":"var(--red)")+";width:"+Math.round(dim.score/dim.max*100)+"%";
    bar.appendChild(bf);
    var ar=el("span","module-arrow");setSafeIcon(ar,typeof ICON!=="undefined"?ICON.chevronDown(14):null);
    if(!ar.firstChild)ar.textContent="\u25bc";
    head.appendChild(tw);head.appendChild(bar);head.appendChild(ar);
    head.addEventListener("click",function(){card.classList.toggle("open");});
    card.appendChild(head);

    var body=el("div","module-body");
    dim.feedback.forEach(function(fb){
      var item=el("div");item.style.cssText="font-size:.78rem;padding:4px 0;color:var(--text);display:flex;gap:6px;align-items:flex-start";
      var dot=el("span");dot.style.cssText="flex-shrink:0;margin-top:4px";
      var isNeg=fb.indexOf("Missing")>-1||fb.indexOf("missing")>-1||fb.indexOf("No ")===0||fb.indexOf("none")>-1||fb.indexOf("below")>-1||fb.indexOf("Too short")>-1||fb.indexOf("copied")>-1||fb.indexOf("Only ")===0;
      dot.style.color=isNeg?"var(--red)":"var(--accent)";
      setSafeIcon(dot,typeof ICON!=="undefined"?(isNeg?ICON.x(14):ICON.check(14)):null);
      if(!dot.firstChild)dot.textContent=isNeg?"\u2717":"\u2713";
      item.appendChild(dot);item.appendChild(elText("span",fb));
      body.appendChild(item);
    });
    if(dim.note)body.appendChild(elText("div",dim.note,{cssText:"font-size:.7rem;color:var(--dim);font-style:italic;padding:6px 0 0"}));
    if(dim.score<5){
      var tip=el("div");tip.style.cssText="font-size:.75rem;color:var(--gold);padding:8px 10px;background:var(--card);border-radius:6px;margin-top:6px";
      var tipText="To reach Score "+(dim.score+1)+": "+((improveTips[dim.name]&&improveTips[dim.name][dim.score])||"Continue practicing.");
      setSafeIcon(tip,typeof ICON!=="undefined"?ICON.lightbulb(14):null);
      tip.appendChild(document.createTextNode(" "+tipText));
      body.appendChild(tip);
    }
    card.appendChild(body);pane.appendChild(card);
  });

  // Model response
  var mc=el("div","module-card");
  var mh=el("div","module-head");
  mh.appendChild(elText("span","Model Response (Score 5)",{className:"module-title"}));
  var mar=el("span","module-arrow");setSafeIcon(mar,typeof ICON!=="undefined"?ICON.chevronDown(14):null);
  if(!mar.firstChild)mar.textContent="\u25bc";
  mh.appendChild(mar);mh.addEventListener("click",function(){mc.classList.toggle("open");});
  mc.appendChild(mh);
  var mb=el("div","module-body");
  mb.appendChild(elText("div",prompt.modelResponse,{cssText:"font-size:.82rem;color:var(--text);line-height:1.7;white-space:pre-wrap;background:var(--card);padding:12px;border-radius:8px;border-left:3px solid var(--accent)"}));
  mc.appendChild(mb);pane.appendChild(mc);

  // Official rubric
  var rc=el("div","module-card");
  var rh=el("div","module-head");
  rh.appendChild(elText("span","Official Rubric - Score "+Math.round(result.overall),{className:"module-title"}));
  var rar=el("span","module-arrow");setSafeIcon(rar,typeof ICON!=="undefined"?ICON.chevronDown(14):null);
  if(!rar.firstChild)rar.textContent="\u25bc";
  rh.appendChild(rar);rh.addEventListener("click",function(){rc.classList.toggle("open");});
  rc.appendChild(rh);
  var rb=el("div","module-body");
  result.rubric.details.forEach(function(d){rb.appendChild(elText("div",d,{cssText:"font-size:.78rem;color:var(--muted);padding:3px 0 3px 12px;border-left:2px solid var(--border)"}));});
  rc.appendChild(rb);pane.appendChild(rc);

  // Buttons
  var bd=el("div");bd.style.cssText="display:flex;gap:8px;justify-content:center;padding:16px 0;flex-wrap:wrap";
  var rb2=elText("button","Try Again",{cssText:"padding:10px 24px;border:1px solid var(--accent);background:var(--accent);color:#0a0f1a;border-radius:8px;cursor:pointer;font-size:.85rem;font-weight:600;min-height:44px"});
  rb2.addEventListener("click",function(){startTest(pane,taskType,prompt);});
  var hb=elText("button","Choose Another",{cssText:"padding:10px 24px;border:1px solid var(--border);background:var(--surface);color:var(--text);border-radius:8px;cursor:pointer;font-size:.85rem;min-height:44px"});
  hb.addEventListener("click",function(){renderHome(pane,taskType);});
  bd.appendChild(rb2);bd.appendChild(hb);pane.appendChild(bd);
}

// --- Helpers ---
function el(tag,cls){var e=document.createElement(tag||"div");if(cls)e.className=cls;return e;}
function elText(tag,text,opts){var e=document.createElement(tag||"div");e.textContent=text;if(opts){if(opts.cssText)e.style.cssText=opts.cssText;if(opts.className)e.className=opts.className;}return e;}
function setSafeIcon(el,svgStr){if(svgStr)el.innerHTML=svgStr;}
function formatTime(s){var m=Math.floor(s/60);var sec=s%60;return m+":"+(sec<10?"0":"")+sec;}

})();
