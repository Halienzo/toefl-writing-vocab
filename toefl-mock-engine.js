// ============================================================
// TOEFL Build a Sentence - Mock Test Engine
// Handles: drag-drop, timer, scoring, review, pattern learning
// ============================================================

(function(){

// --- State ---
var mockState = {
  mode: null, // "test","practice","distractor","strategy"
  questions: [],
  currentIdx: 0,
  answers: {}, // {qId: [ordered chunks]}
  startTime: 0,
  timerInterval: null,
  timeLeft: 420, // 7 minutes in seconds
  score: 0,
  completed: false,
  difficulty: 0 // 0=all, 1=easy, 2=medium, 3=hard
};

// --- Pattern definitions ---
var PATTERNS = [
  {id:"wh-question", name:"WH-Question",
   formula:"WH + aux + S + V (+ O)?",
   desc:"WH疑问词开头，助动词提前到主语之前。",
   signal:"看到 what/which/how/why/where/when + do/does/did/will/can",
   examples:[
     {chunks:["which","store","has","the best","deals"], answer:["which","store","has","the best","deals"], prompt:"I need to buy a new laptop."},
     {chunks:["what","subjects","do","you","have","assignments in"], answer:["what","subjects","do","you","have","assignments in"], prompt:"I have to finish my homework before dinner."}
   ]},
  {id:"embedded-question", name:"Embedded Question",
   formula:"S + V + wh/if/whether + S + V (NO inversion!)",
   desc:"间接问句（嵌入式问句）：主句后接疑问词引导的从句，从句内用陈述语序，不倒装！这是最常考也最容易出错的模式。",
   signal:"看到 know/wonder/tell me/ask + what/which/how/if/whether → 从句不倒装",
   examples:[
     {chunks:["she","wanted","to know","which","colleges","I'm considering","was"], answer:["she","wanted","to know","which","colleges","I'm considering"], distractor:"was", prompt:"I just got out of a meeting with my academic advisor."},
     {chunks:["do","you","know","if","it","is","usually crowded"], answer:["do","you","know","if","it","is","usually crowded"], prompt:"Let's go to that new gym this afternoon."}
   ]},
  {id:"wh-infinitive", name:"WH + to-infinitive",
   formula:"S + V + wh-word + to + V",
   desc:"疑问词 + to do 结构：用简洁的不定式替代完整的间接问句从句。如 where to go = where I should go。",
   signal:"看到 what/where/how/when + to → 组合为一个名词短语",
   examples:[
     {chunks:["don't","you","know","where","to get","the recordings","of the sessions"], answer:["don't","you","know","where","to get","the recordings","of the sessions"], prompt:"I wish I hadn't missed the conference last week."}
   ]},
  {id:"relative-clause", name:"Relative Clause",
   formula:"N + who/that/which + V... + main V",
   desc:"关系从句紧跟在它修饰的名词后面。主句的谓语在关系从句结束后才出现。",
   signal:"看到 who/that/which → 找到它修饰的名词 → 从句插在名词和主句动词之间",
   examples:[
     {chunks:["the","tour guides","who","showed us around","the old city","were","fantastic","was"], answer:["the","tour guides","who","showed us around","the old city","were","fantastic"], distractor:"was", prompt:"What was the highlight of your trip?"}
   ]},
  {id:"yesno-embedded", name:"Yes/No Embedded",
   formula:"Aux + S + V + if/whether + S + V?",
   desc:"Yes/No嵌入式问句：外层是一般疑问句（助动词提前），内层 if/whether 引导的从句用陈述语序。",
   signal:"看到 Do you know / Can you tell me + if/whether → 内层不倒装",
   examples:[
     {chunks:["does","anybody","know","whether","it","is open","all year long","they"], answer:["does","anybody","know","whether","it","is open","all year long"], distractor:"they", prompt:"We had a blast at the national park yesterday."}
   ]}
];

// --- Initialize mock test pane ---
window.initMockTest = function(){
  var pane = document.getElementById("pane-mock");
  if(!pane) return;
  if(typeof MOCK_QUESTIONS === "undefined") {
    pane.textContent = "Loading question bank...";
    return;
  }
  renderMockHome(pane);
};

function renderMockHome(pane){
  pane.textContent = "";

  // Task description
  var desc = document.createElement("div");
  desc.className = "task-desc t1";
  var h = document.createElement("h3"); h.textContent = "Build a Sentence Mock Test";
  var p = document.createElement("p"); p.textContent = "Drag and drop word chunks to build grammatically correct sentences. 10 questions, 7 minutes, all-or-nothing scoring per question.";
  desc.appendChild(h); desc.appendChild(p);
  pane.appendChild(desc);

  // Mode selection cards
  var modes = [
    {icon:"\ud83c\udfaf", title:"Full Mock Test", sub:"10 questions, 7-min timer, real exam simulation", mode:"test", color:"var(--t1)"},
    {icon:"\ud83d\udcda", title:"Practice Mode", sub:"No timer, instant feedback, choose difficulty", mode:"practice", color:"var(--accent)"},
    {icon:"\ud83e\udde0", title:"Pattern Learning", sub:"Master the 5 core grammar patterns with examples", mode:"patterns", color:"var(--purple)"},
    {icon:"\u26a0\ufe0f", title:"Distractor Training", sub:"Spot the extra word that doesn't belong", mode:"distractor", color:"var(--red)"},
    {icon:"\u23f1\ufe0f", title:"Speed Drill", sub:"Find Subject + Verb in under 5 seconds", mode:"strategy", color:"var(--orange)"}
  ];

  var grid = document.createElement("div");
  grid.style.cssText = "display:grid;grid-template-columns:1fr;gap:8px;padding:12px 0";

  modes.forEach(function(m){
    var card = document.createElement("div");
    card.className = "module-card";
    card.style.cursor = "pointer";
    var head = document.createElement("div");
    head.className = "module-head";
    head.style.cssText = "border-left:4px solid "+m.color;
    var ic = document.createElement("span"); ic.className = "module-icon"; ic.textContent = m.icon;
    var wrap = document.createElement("div"); wrap.style.flex = "1";
    var ti = document.createElement("div"); ti.style.cssText = "font-size:.88rem;font-weight:700"; ti.textContent = m.title;
    var su = document.createElement("div"); su.style.cssText = "font-size:.72rem;color:var(--muted)"; su.textContent = m.sub;
    wrap.appendChild(ti); wrap.appendChild(su);
    head.appendChild(ic); head.appendChild(wrap);
    var ar = document.createElement("span"); ar.style.cssText = "color:var(--dim);font-size:.8rem"; ar.textContent = "\u2192";
    head.appendChild(ar);
    card.appendChild(head);
    card.addEventListener("click", function(){ startMode(m.mode); });
    grid.appendChild(card);
  });
  pane.appendChild(grid);

  // History stats
  var history = JSON.parse(localStorage.getItem("toefl_mock_history") || "[]");
  if(history.length > 0){
    var statsDiv = document.createElement("div");
    statsDiv.className = "task-desc";
    var sh = document.createElement("h3"); sh.textContent = "Your History";
    statsDiv.appendChild(sh);
    var lastThree = history.slice(-3).reverse();
    lastThree.forEach(function(h){
      var line = document.createElement("div");
      line.style.cssText = "font-size:.78rem;color:var(--muted);padding:2px 0";
      line.textContent = h.date + " | Score: " + h.score + "/10 | " + h.difficulty;
      statsDiv.appendChild(line);
    });
    pane.appendChild(statsDiv);
  }
}

function startMode(mode){
  var pane = document.getElementById("pane-mock");
  if(!pane) return;

  if(mode === "patterns"){
    renderPatternLearning(pane);
    return;
  }
  if(mode === "distractor"){
    renderDistractorTraining(pane);
    return;
  }
  if(mode === "strategy"){
    renderStrategyDrill(pane);
    return;
  }

  // Test or Practice mode
  mockState.mode = mode;
  mockState.completed = false;
  mockState.answers = {};
  mockState.score = 0;
  mockState.currentIdx = 0;

  if(mode === "test"){
    // Select 10 random questions, mixed difficulty
    var pool = MOCK_QUESTIONS.slice();
    shuffle(pool);
    mockState.questions = pool.slice(0, 10);
    mockState.timeLeft = 420;
    startTimer();
  } else {
    // Practice: show difficulty picker
    renderDifficultyPicker(pane);
    return;
  }

  renderQuestion(pane);
}

function renderDifficultyPicker(pane){
  pane.textContent = "";
  var desc = document.createElement("div"); desc.className = "task-desc t1";
  var h = document.createElement("h3"); h.textContent = "Choose Difficulty";
  desc.appendChild(h); pane.appendChild(desc);

  [
    {label:"All Levels (Mixed)", diff:0},
    {label:"Easy (4-5 words, no distractors)", diff:1},
    {label:"Medium (5-7 words, some distractors)", diff:2},
    {label:"Hard (7-9 words, with distractors)", diff:3}
  ].forEach(function(opt){
    var btn = document.createElement("button");
    btn.style.cssText = "display:block;width:100%;padding:14px 16px;margin-bottom:8px;border:1px solid var(--border);background:var(--surface);color:var(--text);border-radius:10px;cursor:pointer;font-size:.88rem;text-align:left;min-height:48px";
    btn.textContent = opt.label;
    btn.addEventListener("click", function(){
      var pool = opt.diff === 0 ? MOCK_QUESTIONS.slice() : MOCK_QUESTIONS.filter(function(q){ return q.difficulty === opt.diff; });
      shuffle(pool);
      mockState.questions = pool.slice(0, 10);
      mockState.mode = "practice";
      mockState.timeLeft = 0; // no timer
      renderQuestion(pane);
    });
    pane.appendChild(btn);
  });

  addBackButton(pane);
}

// --- Render question ---
function renderQuestion(pane){
  pane.textContent = "";
  var q = mockState.questions[mockState.currentIdx];
  if(!q){ renderResults(pane); return; }

  // Header: question number + timer
  var header = document.createElement("div");
  header.style.cssText = "display:flex;justify-content:space-between;align-items:center;padding:8px 0;margin-bottom:8px";
  var qNum = document.createElement("div");
  qNum.style.cssText = "font-size:.82rem;font-weight:700;color:var(--text)";
  qNum.textContent = "Question " + (mockState.currentIdx + 1) + " / " + mockState.questions.length;
  header.appendChild(qNum);

  if(mockState.mode === "test"){
    var timerEl = document.createElement("div");
    timerEl.id = "mockTimer";
    timerEl.style.cssText = "font-size:.82rem;font-weight:700;color:var(--gold);font-family:monospace";
    timerEl.textContent = formatTime(mockState.timeLeft);
    header.appendChild(timerEl);
  }

  // Difficulty + Pattern badges
  var badges = document.createElement("div");
  badges.style.cssText = "display:flex;gap:6px;margin-bottom:8px";
  var diffBadge = document.createElement("span");
  diffBadge.style.cssText = "font-size:.68rem;padding:2px 8px;border-radius:10px;background:var(--card);color:var(--gold);border:1px solid var(--gold)";
  diffBadge.textContent = ["\u2b50","\u2b50\u2b50","\u2b50\u2b50\u2b50"][q.difficulty-1] || "\u2b50";
  var patBadge = document.createElement("span");
  patBadge.style.cssText = "font-size:.68rem;padding:2px 8px;border-radius:10px;background:var(--card);color:var(--cyan);border:1px solid var(--cyan)";
  patBadge.textContent = q.pattern;
  if(mockState.mode === "practice") { badges.appendChild(diffBadge); badges.appendChild(patBadge); }

  pane.appendChild(header);
  if(mockState.mode === "practice") pane.appendChild(badges);

  // Progress bar
  var prog = document.createElement("div"); prog.className = "progress";
  var fill = document.createElement("div"); fill.className = "progress-fill pf-t1";
  fill.style.width = Math.round((mockState.currentIdx / mockState.questions.length) * 100) + "%";
  prog.appendChild(fill); pane.appendChild(prog);

  // Prompt sentence
  var promptCard = document.createElement("div");
  promptCard.style.cssText = "background:var(--card);border-radius:10px;padding:16px;margin:12px 0;border-left:4px solid var(--t1)";
  var promptText = document.createElement("div");
  promptText.style.cssText = "font-size:.95rem;color:var(--text);font-weight:600";
  promptText.textContent = q.prompt;
  var promptLabel = document.createElement("div");
  promptLabel.style.cssText = "font-size:.68rem;color:var(--dim);margin-top:4px";
  promptLabel.textContent = "Speaker A";
  promptCard.appendChild(promptLabel);
  promptCard.appendChild(promptText);
  pane.appendChild(promptCard);

  // Answer area (drop zone)
  var answerLabel = document.createElement("div");
  answerLabel.style.cssText = "font-size:.72rem;color:var(--dim);margin:8px 0 4px;font-weight:600";
  answerLabel.textContent = "YOUR ANSWER (drag chunks here):";
  pane.appendChild(answerLabel);

  var dropZone = document.createElement("div");
  dropZone.id = "dropZone";
  dropZone.style.cssText = "min-height:56px;background:var(--card);border:2px dashed var(--border);border-radius:10px;padding:10px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;transition:border-color .15s";

  // Drag over styling
  dropZone.addEventListener("dragover", function(e){ e.preventDefault(); this.style.borderColor = "var(--accent)"; });
  dropZone.addEventListener("dragleave", function(){ this.style.borderColor = "var(--border)"; });
  dropZone.addEventListener("drop", function(e){
    e.preventDefault();
    this.style.borderColor = "var(--border)";
    var chunkText = e.dataTransfer.getData("text/plain");
    moveChunkToZone(chunkText, "drop");
  });
  pane.appendChild(dropZone);

  // Word chunks (drag source)
  var chunkLabel = document.createElement("div");
  chunkLabel.style.cssText = "font-size:.72rem;color:var(--dim);margin:4px 0;font-weight:600";
  chunkLabel.textContent = "WORD CHUNKS" + (q.distractor ? " (one extra word!)" : "") + ":";
  pane.appendChild(chunkLabel);

  var chunkPool = document.createElement("div");
  chunkPool.id = "chunkPool";
  chunkPool.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:8px 0;min-height:48px";

  // Shuffle chunks for display
  var displayChunks = q.chunks.slice();
  shuffle(displayChunks);

  // Restore previous answer if navigating back
  var prevAnswer = mockState.answers[q.id];
  var usedChunks = prevAnswer ? prevAnswer.slice() : [];
  var poolChunks = prevAnswer ? displayChunks.filter(function(c){ return usedChunks.indexOf(c) === -1; }) : displayChunks;

  poolChunks.forEach(function(chunk){ chunkPool.appendChild(createChunkEl(chunk, "pool")); });
  pane.appendChild(chunkPool);

  // Render previous answer in drop zone
  if(prevAnswer){
    prevAnswer.forEach(function(chunk){ dropZone.appendChild(createChunkEl(chunk, "drop")); });
  }

  // Navigation buttons
  var navDiv = document.createElement("div");
  navDiv.style.cssText = "display:flex;gap:8px;justify-content:center;padding:16px 0;flex-wrap:wrap";

  if(mockState.currentIdx > 0){
    var prevBtn = document.createElement("button");
    prevBtn.style.cssText = "padding:10px 20px;border:1px solid var(--border);background:var(--surface);color:var(--text);border-radius:8px;cursor:pointer;font-size:.85rem;min-height:44px";
    prevBtn.textContent = "\u2190 Previous";
    prevBtn.addEventListener("click", function(){ saveCurrentAnswer(); mockState.currentIdx--; renderQuestion(pane); });
    navDiv.appendChild(prevBtn);
  }

  var clearBtn = document.createElement("button");
  clearBtn.style.cssText = "padding:10px 20px;border:1px solid var(--border);background:var(--surface);color:var(--muted);border-radius:8px;cursor:pointer;font-size:.85rem;min-height:44px";
  clearBtn.textContent = "Clear";
  clearBtn.addEventListener("click", function(){
    delete mockState.answers[q.id];
    renderQuestion(pane);
  });
  navDiv.appendChild(clearBtn);

  if(mockState.currentIdx < mockState.questions.length - 1){
    var nextBtn = document.createElement("button");
    nextBtn.style.cssText = "padding:10px 20px;border:1px solid var(--accent);background:var(--accent);color:#0a0f1a;border-radius:8px;cursor:pointer;font-size:.85rem;font-weight:600;min-height:44px";
    nextBtn.textContent = "Next \u2192";
    nextBtn.addEventListener("click", function(){ saveCurrentAnswer(); mockState.currentIdx++; renderQuestion(pane); });
    navDiv.appendChild(nextBtn);
  } else {
    var submitBtn = document.createElement("button");
    submitBtn.style.cssText = "padding:10px 24px;border:1px solid var(--gold);background:var(--gold);color:#0a0f1a;border-radius:8px;cursor:pointer;font-size:.85rem;font-weight:700;min-height:44px";
    submitBtn.textContent = "Submit Test";
    submitBtn.addEventListener("click", function(){ saveCurrentAnswer(); finishTest(pane); });
    navDiv.appendChild(submitBtn);
  }
  pane.appendChild(navDiv);
}

function createChunkEl(text, zone){
  var el = document.createElement("div");
  el.style.cssText = "padding:8px 14px;background:" + (zone === "pool" ? "var(--surface)" : "var(--card2)") + ";border:1px solid var(--border);border-radius:8px;cursor:grab;font-size:.88rem;color:var(--text);user-select:none;-webkit-user-select:none;touch-action:none;min-height:40px;display:flex;align-items:center";
  el.textContent = text;
  el.draggable = true;
  el.setAttribute("data-chunk", text);
  el.setAttribute("data-zone", zone);

  // Drag events
  el.addEventListener("dragstart", function(e){
    e.dataTransfer.setData("text/plain", text);
    e.dataTransfer.effectAllowed = "move";
    this.style.opacity = "0.5";
  });
  el.addEventListener("dragend", function(){ this.style.opacity = "1"; });

  // Touch events for mobile
  var touchData = {startX:0, startY:0, clone:null, moved:false};
  el.addEventListener("touchstart", function(e){
    var touch = e.touches[0];
    touchData.startX = touch.clientX;
    touchData.startY = touch.clientY;
    touchData.moved = false;
  }, {passive:true});

  el.addEventListener("touchmove", function(e){
    touchData.moved = true;
    e.preventDefault();
  }, {passive:false});

  el.addEventListener("touchend", function(e){
    if(!touchData.moved){
      // Tap = move to other zone
      var currentZone = this.getAttribute("data-zone");
      moveChunkToZone(text, currentZone === "pool" ? "drop" : "pool");
    }
  });

  // Click to move (fallback)
  el.addEventListener("click", function(){
    var currentZone = this.getAttribute("data-zone");
    moveChunkToZone(text, currentZone === "pool" ? "drop" : "pool");
  });

  return el;
}

function moveChunkToZone(chunkText, targetZone){
  var dropZone = document.getElementById("dropZone");
  var chunkPool = document.getElementById("chunkPool");
  if(!dropZone || !chunkPool) return;

  // Find and remove from current location
  var allChunks = document.querySelectorAll("[data-chunk]");
  var found = null;
  allChunks.forEach(function(el){
    if(el.getAttribute("data-chunk") === chunkText && el.getAttribute("data-zone") !== targetZone){
      found = el;
    }
  });

  if(found){
    found.parentNode.removeChild(found);
    var newEl = createChunkEl(chunkText, targetZone);
    if(targetZone === "drop") dropZone.appendChild(newEl);
    else chunkPool.appendChild(newEl);
  }
}

function saveCurrentAnswer(){
  var q = mockState.questions[mockState.currentIdx];
  if(!q) return;
  var dropZone = document.getElementById("dropZone");
  if(!dropZone) return;
  var ordered = [];
  dropZone.querySelectorAll("[data-chunk]").forEach(function(el){
    ordered.push(el.getAttribute("data-chunk"));
  });
  if(ordered.length > 0) mockState.answers[q.id] = ordered;
}

// --- Timer ---
function startTimer(){
  if(mockState.timerInterval) clearInterval(mockState.timerInterval);
  mockState.startTime = Date.now();
  mockState.timerInterval = setInterval(function(){
    mockState.timeLeft--;
    var el = document.getElementById("mockTimer");
    if(el) el.textContent = formatTime(mockState.timeLeft);
    if(mockState.timeLeft <= 0){
      clearInterval(mockState.timerInterval);
      saveCurrentAnswer();
      finishTest(document.getElementById("pane-mock"));
    }
  }, 1000);
}

function formatTime(s){
  var m = Math.floor(s / 60);
  var sec = s % 60;
  return m + ":" + (sec < 10 ? "0" : "") + sec;
}

// --- Finish test & show results ---
function finishTest(pane){
  if(mockState.timerInterval) clearInterval(mockState.timerInterval);
  mockState.completed = true;

  // Score
  var correct = 0;
  var results = [];
  mockState.questions.forEach(function(q){
    var userAns = mockState.answers[q.id] || [];
    var isCorrect = arraysEqual(userAns, q.answer);
    if(isCorrect) correct++;
    results.push({q:q, userAns:userAns, correct:isCorrect});
  });
  mockState.score = correct;

  // Save history
  var history = JSON.parse(localStorage.getItem("toefl_mock_history") || "[]");
  history.push({
    date: new Date().toLocaleDateString(),
    score: correct,
    total: mockState.questions.length,
    difficulty: mockState.mode === "test" ? "Mock Test" : "Practice"
  });
  localStorage.setItem("toefl_mock_history", JSON.stringify(history));

  renderResults(pane, results);
}

function renderResults(pane, results){
  pane.textContent = "";
  var score = mockState.score;
  var total = mockState.questions.length;

  // Score display
  var scoreCard = document.createElement("div");
  scoreCard.style.cssText = "text-align:center;padding:24px;background:var(--surface);border:1px solid var(--border);border-radius:14px;margin:12px 0;box-shadow:var(--shadow)";
  var scoreNum = document.createElement("div");
  scoreNum.style.cssText = "font-size:2.5rem;font-weight:800;color:" + (score >= 7 ? "var(--accent)" : score >= 4 ? "var(--gold)" : "var(--red)");
  scoreNum.textContent = score + " / " + total;
  var scoreLabel = document.createElement("div");
  scoreLabel.style.cssText = "font-size:.85rem;color:var(--muted);margin-top:4px";
  scoreLabel.textContent = score >= 8 ? "Excellent!" : score >= 6 ? "Good job!" : score >= 4 ? "Keep practicing!" : "Review the patterns below";
  scoreCard.appendChild(scoreNum);
  scoreCard.appendChild(scoreLabel);
  pane.appendChild(scoreCard);

  // Pattern analysis
  if(results){
    var patternStats = {};
    results.forEach(function(r){
      var p = r.q.pattern;
      if(!patternStats[p]) patternStats[p] = {total:0, correct:0};
      patternStats[p].total++;
      if(r.correct) patternStats[p].correct++;
    });

    var anaCard = document.createElement("div");
    anaCard.className = "task-desc";
    var anaH = document.createElement("h3"); anaH.textContent = "Pattern Analysis";
    anaCard.appendChild(anaH);

    Object.keys(patternStats).forEach(function(p){
      var s = patternStats[p];
      var row = document.createElement("div");
      row.style.cssText = "display:flex;justify-content:space-between;padding:4px 0;font-size:.82rem";
      var name = document.createElement("span"); name.textContent = p; name.style.color = "var(--text)";
      var val = document.createElement("span");
      val.textContent = s.correct + "/" + s.total;
      val.style.color = s.correct === s.total ? "var(--accent)" : "var(--red)";
      val.style.fontWeight = "700";
      row.appendChild(name); row.appendChild(val);
      anaCard.appendChild(row);
    });
    pane.appendChild(anaCard);

    // Question review
    var revH = document.createElement("div");
    revH.style.cssText = "font-size:.85rem;font-weight:700;padding:12px 0 6px";
    revH.textContent = "Question Review";
    pane.appendChild(revH);

    results.forEach(function(r, i){
      var card = document.createElement("div");
      card.className = "word-card" + (r.correct ? "" : " open");
      var head = document.createElement("div"); head.className = "wc-head";
      var num = document.createElement("span");
      num.style.cssText = "font-size:.85rem;font-weight:700;min-width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:6px;color:" + (r.correct ? "var(--accent)" : "var(--red)") + ";background:" + (r.correct ? "#064e3b" : "#7f1d1d");
      num.textContent = (i+1);
      var prompt = document.createElement("span"); prompt.style.cssText = "font-size:.82rem;flex:1"; prompt.textContent = r.q.prompt;
      var mark = document.createElement("span"); mark.style.cssText = "font-size:.82rem;font-weight:700;color:" + (r.correct ? "var(--accent)" : "var(--red)");
      mark.textContent = r.correct ? "\u2713" : "\u2717";
      var arrow = document.createElement("span"); arrow.className = "wc-arrow"; arrow.textContent = "\u25bc";
      head.appendChild(num); head.appendChild(prompt); head.appendChild(mark); head.appendChild(arrow);
      head.addEventListener("click", function(){ card.classList.toggle("open"); });
      card.appendChild(head);

      var body = document.createElement("div"); body.className = "wc-body";
      // Correct answer
      var correctDiv = document.createElement("div");
      correctDiv.style.cssText = "font-size:.82rem;padding:8px 10px;background:var(--card);border-radius:6px;margin-bottom:6px;border-left:3px solid var(--accent)";
      correctDiv.textContent = "Correct: " + r.q.answer.join(" ");
      body.appendChild(correctDiv);
      // User answer
      if(!r.correct){
        var userDiv = document.createElement("div");
        userDiv.style.cssText = "font-size:.82rem;padding:8px 10px;background:var(--card);border-radius:6px;margin-bottom:6px;border-left:3px solid var(--red)";
        userDiv.textContent = "Your answer: " + (r.userAns.length ? r.userAns.join(" ") : "(empty)");
        body.appendChild(userDiv);
      }
      // Distractor
      if(r.q.distractor){
        var distDiv = document.createElement("div");
        distDiv.style.cssText = "font-size:.78rem;color:var(--red);padding:2px 0";
        distDiv.textContent = "Extra word: " + r.q.distractor;
        body.appendChild(distDiv);
      }
      // Explanation
      var expDiv = document.createElement("div");
      expDiv.style.cssText = "font-size:.78rem;color:var(--muted);padding:6px 0";
      expDiv.textContent = r.q.explanation;
      body.appendChild(expDiv);

      card.appendChild(body);
      pane.appendChild(card);
    });
  }

  // Buttons
  var btnDiv = document.createElement("div");
  btnDiv.style.cssText = "display:flex;gap:8px;justify-content:center;padding:16px 0;flex-wrap:wrap";
  var retryBtn = document.createElement("button");
  retryBtn.style.cssText = "padding:10px 24px;border:1px solid var(--accent);background:var(--accent);color:#0a0f1a;border-radius:8px;cursor:pointer;font-size:.85rem;font-weight:600;min-height:44px";
  retryBtn.textContent = "Try Again";
  retryBtn.addEventListener("click", function(){ startMode(mockState.mode === "test" ? "test" : "practice"); });
  var homeBtn = document.createElement("button");
  homeBtn.style.cssText = "padding:10px 24px;border:1px solid var(--border);background:var(--surface);color:var(--text);border-radius:8px;cursor:pointer;font-size:.85rem;min-height:44px";
  homeBtn.textContent = "Back to Menu";
  homeBtn.addEventListener("click", function(){ renderMockHome(pane); });
  btnDiv.appendChild(retryBtn); btnDiv.appendChild(homeBtn);
  pane.appendChild(btnDiv);
}

// --- Pattern Learning ---
function renderPatternLearning(pane){
  pane.textContent = "";
  var desc = document.createElement("div"); desc.className = "task-desc t1";
  var h = document.createElement("h3"); h.textContent = "5 Core Grammar Patterns";
  var p = document.createElement("p"); p.textContent = "Master these 5 patterns and you can solve 90%+ of Build a Sentence questions. Each pattern has a formula, signal words, and practice examples.";
  desc.appendChild(h); desc.appendChild(p); pane.appendChild(desc);

  PATTERNS.forEach(function(pat, idx){
    var card = document.createElement("div"); card.className = "module-card open";
    var head = document.createElement("div"); head.className = "module-head";
    var num = document.createElement("span"); num.style.cssText = "font-size:.85rem;font-weight:800;color:var(--t1);min-width:24px"; num.textContent = (idx+1);
    var ti = document.createElement("span"); ti.className = "module-title"; ti.textContent = pat.name;
    var ar = document.createElement("span"); ar.className = "module-arrow"; ar.textContent = "\u25bc";
    head.appendChild(num); head.appendChild(ti); head.appendChild(ar);
    head.addEventListener("click", function(){ card.classList.toggle("open"); });
    card.appendChild(head);

    var body = document.createElement("div"); body.className = "module-body";
    // Formula
    var formula = document.createElement("div"); formula.className = "pattern-formula"; formula.textContent = pat.formula;
    body.appendChild(formula);
    // Description
    var descP = document.createElement("div"); descP.style.cssText = "font-size:.8rem;color:var(--muted);margin-bottom:8px"; descP.textContent = pat.desc;
    body.appendChild(descP);
    // Signal
    var signal = document.createElement("div"); signal.style.cssText = "font-size:.78rem;color:var(--gold);margin-bottom:10px;padding:6px 10px;background:var(--card);border-radius:6px";
    signal.textContent = "\ud83d\udca1 " + pat.signal;
    body.appendChild(signal);
    // Examples
    pat.examples.forEach(function(ex){
      var exDiv = document.createElement("div"); exDiv.className = "pattern";
      var pr = document.createElement("div"); pr.style.cssText = "font-size:.78rem;color:var(--dim);margin-bottom:3px"; pr.textContent = "A: " + ex.prompt;
      var ans = document.createElement("div"); ans.style.cssText = "font-size:.85rem;color:var(--accent);font-weight:600"; ans.textContent = "B: " + ex.answer.join(" ");
      exDiv.appendChild(pr); exDiv.appendChild(ans);
      if(ex.distractor){
        var dist = document.createElement("div"); dist.style.cssText = "font-size:.72rem;color:var(--red);margin-top:3px";
        dist.textContent = "Extra word: " + ex.distractor;
        exDiv.appendChild(dist);
      }
      body.appendChild(exDiv);
    });

    card.appendChild(body);
    pane.appendChild(card);
  });

  addBackButton(pane);
}

// --- Distractor Training ---
function renderDistractorTraining(pane){
  pane.textContent = "";
  var desc = document.createElement("div"); desc.className = "task-desc t1";
  var h = document.createElement("h3"); h.textContent = "Distractor Identification";
  var p = document.createElement("p"); p.textContent = "Tap the word you think is the EXTRA word that does NOT belong in the sentence. Scored instantly.";
  desc.appendChild(h); desc.appendChild(p); pane.appendChild(desc);

  // Get questions with distractors
  var distQuestions = (typeof MOCK_QUESTIONS !== "undefined") ?
    MOCK_QUESTIONS.filter(function(q){ return q.distractor !== null; }) : [];
  shuffle(distQuestions);
  var subset = distQuestions.slice(0, 10);

  if(subset.length === 0){
    pane.appendChild(document.createTextNode("No distractor questions available."));
    addBackButton(pane);
    return;
  }

  var distScore = {correct:0, total:0};

  function renderDistQ(idx){
    var area = document.getElementById("distArea");
    if(area) area.parentNode.removeChild(area);
    area = document.createElement("div"); area.id = "distArea";

    if(idx >= subset.length){
      var result = document.createElement("div");
      result.style.cssText = "text-align:center;padding:20px;font-size:1.2rem;font-weight:700;color:var(--accent)";
      result.textContent = "Score: " + distScore.correct + " / " + distScore.total;
      area.appendChild(result);
      pane.appendChild(area);
      return;
    }

    var q = subset[idx];
    var qCard = document.createElement("div");
    qCard.style.cssText = "background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:10px";
    var pr = document.createElement("div"); pr.style.cssText = "font-size:.82rem;color:var(--dim);margin-bottom:8px";
    pr.textContent = (idx+1) + ". " + q.prompt;
    qCard.appendChild(pr);

    var chunkDiv = document.createElement("div");
    chunkDiv.style.cssText = "display:flex;flex-wrap:wrap;gap:6px";
    var shuffled = q.chunks.slice(); shuffle(shuffled);
    shuffled.forEach(function(chunk){
      var btn = document.createElement("button");
      btn.style.cssText = "padding:8px 14px;border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:8px;cursor:pointer;font-size:.85rem;min-height:40px;transition:all .12s";
      btn.textContent = chunk;
      btn.addEventListener("click", function(){
        distScore.total++;
        chunkDiv.querySelectorAll("button").forEach(function(b){
          b.style.pointerEvents = "none";
          if(b.textContent === q.distractor){
            b.style.background = "#7f1d1d"; b.style.borderColor = "var(--red)"; b.style.color = "var(--red)";
            b.style.textDecoration = "line-through";
          }
        });
        if(chunk === q.distractor){
          distScore.correct++;
          btn.style.background = "#064e3b"; btn.style.borderColor = "var(--accent)"; btn.style.color = "var(--accent)";
        } else {
          btn.style.background = "#7f1d1d"; btn.style.borderColor = "var(--red)"; btn.style.color = "var(--red)";
        }
        // Show explanation
        var exp = document.createElement("div");
        exp.style.cssText = "font-size:.78rem;color:var(--muted);padding:8px 0";
        exp.textContent = q.explanation;
        qCard.appendChild(exp);
        // Next after delay
        setTimeout(function(){ renderDistQ(idx + 1); }, 1500);
      });
      chunkDiv.appendChild(btn);
    });
    qCard.appendChild(chunkDiv);
    area.appendChild(qCard);
    pane.appendChild(area);
  }

  renderDistQ(0);
  addBackButton(pane);
}

// --- Speed Drill (Strategy) ---
function renderStrategyDrill(pane){
  pane.textContent = "";
  var desc = document.createElement("div"); desc.className = "task-desc t1";
  var h = document.createElement("h3"); h.textContent = "Speed Drill: Find S + V";
  var p = document.createElement("p"); p.textContent = "You see a set of word chunks. Tap the SUBJECT and then the MAIN VERB as fast as possible. Target: under 5 seconds.";
  desc.appendChild(h); desc.appendChild(p); pane.appendChild(desc);

  var pool = (typeof MOCK_QUESTIONS !== "undefined") ? MOCK_QUESTIONS.slice() : [];
  shuffle(pool);
  var subset = pool.slice(0, 8);
  var drillIdx = 0;
  var drillScore = {total:0, fast:0};

  function renderDrillQ(){
    var area = document.getElementById("drillArea");
    if(area) area.parentNode.removeChild(area);
    area = document.createElement("div"); area.id = "drillArea";

    if(drillIdx >= subset.length){
      var result = document.createElement("div");
      result.style.cssText = "text-align:center;padding:20px;font-size:1rem;font-weight:700;color:var(--accent)";
      result.textContent = "Fast answers (< 5s): " + drillScore.fast + " / " + drillScore.total;
      area.appendChild(result);
      pane.appendChild(area);
      return;
    }

    var q = subset[drillIdx];
    var startT = Date.now();

    var qCard = document.createElement("div");
    qCard.style.cssText = "background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:10px";
    var timerDisp = document.createElement("div");
    timerDisp.style.cssText = "font-size:.82rem;color:var(--gold);font-family:monospace;text-align:right;margin-bottom:6px";
    timerDisp.textContent = "0.0s";
    var timerInt = setInterval(function(){
      timerDisp.textContent = ((Date.now() - startT) / 1000).toFixed(1) + "s";
    }, 100);

    var pr = document.createElement("div"); pr.style.cssText = "font-size:.82rem;color:var(--dim);margin-bottom:8px";
    pr.textContent = (drillIdx+1) + ". Tap the SUBJECT first, then the VERB:";
    qCard.appendChild(timerDisp);
    qCard.appendChild(pr);

    var chunkDiv = document.createElement("div");
    chunkDiv.style.cssText = "display:flex;flex-wrap:wrap;gap:6px";
    var shuffled = q.chunks.slice(); shuffle(shuffled);
    var selected = [];

    shuffled.forEach(function(chunk){
      var btn = document.createElement("button");
      btn.style.cssText = "padding:8px 14px;border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:8px;cursor:pointer;font-size:.85rem;min-height:40px";
      btn.textContent = chunk;
      btn.addEventListener("click", function(){
        selected.push(chunk);
        btn.style.borderColor = selected.length === 1 ? "var(--cyan)" : "var(--purple)";
        btn.style.background = selected.length === 1 ? "#164e63" : "#312e81";
        if(selected.length >= 2){
          clearInterval(timerInt);
          var elapsed = (Date.now() - startT) / 1000;
          drillScore.total++;
          if(elapsed < 5) drillScore.fast++;
          var feedback = document.createElement("div");
          feedback.style.cssText = "font-size:.82rem;padding:6px 0;color:" + (elapsed < 5 ? "var(--accent)" : "var(--orange)");
          feedback.textContent = elapsed.toFixed(1) + "s " + (elapsed < 5 ? "\u2713 Fast!" : "- Try faster!");
          qCard.appendChild(feedback);
          var correctAns = document.createElement("div");
          correctAns.style.cssText = "font-size:.78rem;color:var(--muted);padding:4px 0";
          correctAns.textContent = "Answer: " + q.answer.join(" ");
          qCard.appendChild(correctAns);
          drillIdx++;
          setTimeout(renderDrillQ, 1500);
        }
      });
      chunkDiv.appendChild(btn);
    });
    qCard.appendChild(chunkDiv);
    area.appendChild(qCard);
    pane.appendChild(area);
  }

  renderDrillQ();
  addBackButton(pane);
}

// --- Helpers ---
function addBackButton(pane){
  var btn = document.createElement("button");
  btn.style.cssText = "display:block;margin:16px auto;padding:10px 24px;border:1px solid var(--border);background:var(--surface);color:var(--text);border-radius:8px;cursor:pointer;font-size:.85rem;min-height:44px";
  btn.textContent = "\u2190 Back to Menu";
  btn.addEventListener("click", function(){ renderMockHome(pane); });
  pane.appendChild(btn);
}

function arraysEqual(a, b){
  if(a.length !== b.length) return false;
  for(var i = 0; i < a.length; i++){
    if(a[i] !== b[i]) return false;
  }
  return true;
}

function shuffle(a){
  for(var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
}

})();
