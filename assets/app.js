/* Dhiman Enviro — site assistant, lead capture, quote estimator */
(function () {
  var WA = "917494962137";
  var LEAD = {};

  /* ---------------- knowledge base ---------------- */
  var KB = [
    { k: ["price","cost","rate","quote","quotation","kitna","kimat","daam","paisa","budget","rs","rupee"],
      a: "Price depends on your shed size, bird count and which systems you need — so we quote per house rather than a fixed list price.<br><br>Tell me your <b>shed size</b> and <b>bird count</b> and I'll pass it straight to the team for a written quote.",
      chips: ["Get my quote","What affects the price?"] },
    { k: ["affect","depend","why","factors"],
      a: "Four things: shed dimensions (length × width), bird count, which systems you want (ventilation / cooling / feeding / drinking / brooding / control), and your location for delivery. Send those and you get an exact figure." ,
      chips: ["Get my quote"] },
    { k: ["fan","ventilation","exhaust","cone","box fan","hawa","tunnel","air"],
      a: "We manufacture <b>box fans, 36″ ventilation fans, 3-blade cone fans and push-pull fans</b>, plus air inlets and tunnel doors.<br><br>Fan size and quantity are worked out from your shed dimensions so airflow is right across the whole house.",
      chips: ["See ventilation products","Get my quote"] },
    { k: ["cool","cooling","pad","summer","garmi","temperature","heat"],
      a: "Our <b>evaporative cooling pad system</b> sits at the air-inlet end. Incoming air passes through wet pads and drops shed temperature in summer, then tunnel fans pull it across the birds.<br><br>Pad wall length is sized to your house.",
      chips: ["See cooling products","Get my quote"] },
    { k: ["feed","feeding","pan","hopper","silo","dana","feeder"],
      a: "For feed we make the <b>automatic pan feeding system, feeding lines, godown hoppers and feed silos</b>. Pan lines cut feed waste and labour compared with manual feeding.",
      chips: ["See feeding products","Get my quote"] },
    { k: ["water","drink","nipple","pani","drinker"],
      a: "Our <b>nipple drinking system</b> is a closed line with regulated pressure, so birds get clean water along the full run and litter stays drier.",
      chips: ["See drinking products","Get my quote"] },
    { k: ["brood","brooder","chick","gas","chuza","heating","heater"],
      a: "We make <b>gas brooders</b> for the brooding stage, plus insulation sheet and rubber matting for housing. Brooder count depends on chick numbers and shed area.",
      chips: ["See brooding products","Get my quote"] },
    { k: ["panel","control","automatic","controller","sensor","climate"],
      a: "The <b>automatic control panel</b> runs the house: sensors read temperature and humidity, and the panel stages fans and the cooling pad automatically — so the climate holds without someone switching things by hand.",
      chips: ["See control panel","Get my quote"] },
    { k: ["install","installation","fitting","setup","lagana","commission"],
      a: "Yes — our own team installs and commissions the system on your farm, and trains your staff to run and maintain it. Installation isn't sub-contracted.",
      chips: ["Get my quote","What after installation?"] },
    { k: ["after","support","service","maintenance","warranty","repair","problem"],
      a: "After handover you get <b>technical support, maintenance help and spares</b>. We built the equipment, so troubleshooting is direct — call the same number, not a call centre.",
      chips: ["Talk to the team"] },
    { k: ["deliver","delivery","ship","transport","time","kitne din","how long","lead time"],
      a: "We supply across India and export to nearby markets. Delivery time depends on the item and quantity — the team confirms a date with your quote.",
      chips: ["Get my quote","Do you export?"] },
    { k: ["export","international","country","abroad","foreign","import"],
      a: "Yes, we export. For an export enquiry send the <b>destination country</b>, your requirement, and any local voltage or certification need — we work out packing and delivery.",
      chips: ["Send export enquiry"] },
    { k: ["certif","iso","quality","registration","gst","cin","udyam","company","trust","genuine"],
      a: "All verifiable:<br>• <b>ISO 9001:2015</b> — UC-01559<br>• <b>DPIIT Startup India</b> — DIPP235682<br>• <b>CIN</b> U28251HR2025PTC127877<br>• <b>GSTIN</b> 06AALCD3645A1ZZ<br>• <b>Udyam</b> UDYAM-HR-08-0046690<br><br>We send certificates with a quote.",
      chips: ["See quality page"] },
    { k: ["where","location","address","factory","office","safidon","haryana","visit","kahan"],
      a: "Our works and sales office: <b>Near Hotel Ananta, Panipat Road, Safidon, Jind, Haryana 126112</b>. Everything is manufactured there — you're welcome to visit.",
      chips: ["Get directions","Talk to the team"] },
    { k: ["dealer","distributor","partner","franchise","business"],
      a: "We supply directly and through dealers. If you serve poultry farms in your district and want to carry our equipment, send your area and what you currently supply.",
      chips: ["Dealer enquiry"] },
    { k: ["whole","complete","turnkey","full","poora","everything","all system","new farm","new shed"],
      a: "Yes — we can specify and fit a <b>complete house</b>: ventilation, cooling, feeding, drinking, brooding and the control panel, all working together.<br><br>Give me the shed size and bird count and the team will send a full layout with a price.",
      chips: ["Get my quote"] },
    { k: ["hello","hi","hey","namaste","namaskar","salam","good morning","good evening"],
      a: "Namaste! 🙏 I can help with products, pricing, installation or exports — or take your details so the team sends a quote.",
      chips: ["Get my quote","See products","Talk to the team"] },
    { k: ["thank","thanks","dhanyavad","shukriya","ok","theek"],
      a: "Happy to help. If you'd like a quote, I can pass your shed details to the team right now.",
      chips: ["Get my quote","Talk to the team"] }
  ];

  function reply(text) {
    var t = (text || "").toLowerCase(), best = null, score = 0;
    KB.forEach(function (e) {
      var s = 0;
      e.k.forEach(function (kw) { if (t.indexOf(kw) !== -1) s += kw.length; });
      if (s > score) { score = s; best = e; }
    });
    if (best) return best;
    return { a: "I may not have that one. The quickest route is a person — tell me your shed size and bird count and the team will come back with an answer and a price. Or WhatsApp us directly.",
             chips: ["Get my quote", "Talk to the team"] };
  }

  /* ---------------- markup ---------------- */
  var css = '\
  .de-launch{position:fixed;right:20px;bottom:20px;z-index:70;display:flex;flex-direction:column;gap:10px;align-items:flex-end}\
  .de-bub{background:#fff;border:1px solid var(--line);border-radius:14px;padding:10px 14px;font-size:13.5px;box-shadow:0 10px 30px rgba(22,20,58,.16);max-width:210px;cursor:pointer;animation:dePop .4s ease}\
  @keyframes dePop{from{opacity:0;transform:translateY(8px)}to{opacity:1}}\
  .de-btns{display:flex;gap:10px}\
  .de-fab{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;cursor:pointer;border:none;box-shadow:0 10px 30px rgba(22,20,58,.28);transition:transform .2s}\
  .de-fab:hover{transform:scale(1.08)}\
  .de-fab.chat{background:var(--ink)}.de-fab.wa{background:#25d366}\
  .de-panel{position:fixed;right:20px;bottom:20px;z-index:80;width:min(380px,calc(100vw - 32px));height:min(560px,calc(100vh - 40px));background:#fff;border-radius:22px;box-shadow:0 30px 80px rgba(22,20,58,.3);display:none;flex-direction:column;overflow:hidden}\
  .de-panel.open{display:flex}\
  .de-top{background:var(--ink);color:#fff;padding:16px 18px;display:flex;align-items:center;gap:12px}\
  .de-top .av{width:38px;height:38px;border-radius:50%;background:#5fe08a;display:grid;place-items:center;color:#0c3d1e;font-weight:700;font-family:var(--disp)}\
  .de-top h4{font-family:var(--disp);font-size:15px;margin:0;color:#fff}\
  .de-top p{font-size:11.5px;color:#9fe8b8;margin:2px 0 0;font-family:var(--mono)}\
  .de-x{margin-left:auto;background:none;border:none;color:#fff;font-size:22px;cursor:pointer;line-height:1;opacity:.8}\
  .de-x:hover{opacity:1}\
  .de-log{flex:1;overflow-y:auto;padding:18px;background:var(--bg);display:flex;flex-direction:column;gap:12px}\
  .de-msg{max-width:86%;padding:11px 14px;border-radius:14px;font-size:14.5px;line-height:1.55}\
  .de-msg.bot{background:#fff;border:1px solid var(--line);border-bottom-left-radius:4px;align-self:flex-start}\
  .de-msg.me{background:var(--ink);color:#fff;border-bottom-right-radius:4px;align-self:flex-end}\
  .de-chips{display:flex;flex-wrap:wrap;gap:7px}\
  .de-chip{background:#fff;border:1.5px solid var(--green);color:var(--green-deep);border-radius:999px;padding:7px 13px;font-size:13px;font-weight:500;cursor:pointer;font-family:var(--body)}\
  .de-chip:hover{background:var(--green-wash)}\
  .de-in{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line);background:#fff}\
  .de-in input{flex:1;border:1.5px solid var(--line);border-radius:999px;padding:11px 16px;font-family:var(--body);font-size:14.5px;outline:none}\
  .de-in input:focus{border-color:var(--green)}\
  .de-send{background:var(--green);border:none;color:#fff;width:42px;height:42px;border-radius:50%;cursor:pointer;display:grid;place-items:center;flex:0 0 auto}\
  .de-typing span{display:inline-block;width:6px;height:6px;border-radius:50%;background:#9aa3ab;margin-right:3px;animation:deT 1s infinite}\
  .de-typing span:nth-child(2){animation-delay:.2s}.de-typing span:nth-child(3){animation-delay:.4s}\
  @keyframes deT{0%,60%,100%{opacity:.3}30%{opacity:1}}\
  .de-mob{position:fixed;left:0;right:0;bottom:0;z-index:65;background:#fff;border-top:1px solid var(--line);display:none;padding:10px 12px calc(10px + env(safe-area-inset-bottom));gap:8px;box-shadow:0 -6px 24px rgba(22,20,58,.1)}\
  .de-mob a{flex:1;text-align:center;justify-content:center;padding:12px 8px;font-size:14px}\
  @media(max-width:640px){.de-mob{display:flex}.de-launch{bottom:78px;right:14px}.de-panel{bottom:78px;right:14px;height:min(520px,calc(100vh - 120px))}.wa-float{display:none}}\
  ';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var wrap = document.createElement("div");
  wrap.innerHTML = '\
  <div class="de-launch">\
    <div class="de-bub" id="deBub">Need a price or size advice? Ask me →</div>\
    <div class="de-btns">\
      <a class="de-fab wa" href="https://wa.me/' + WA + '?text=Hello%20Dhiman%20Enviro" target="_blank" rel="noopener" aria-label="WhatsApp">\
        <svg width="27" height="27" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6 0l.9-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.4.1.1.1.6-.1 1.3z"/></svg>\
      </a>\
      <button class="de-fab chat" id="deOpen" aria-label="Chat with us">\
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z"/></svg>\
      </button>\
    </div>\
  </div>\
  <div class="de-panel" id="dePanel" role="dialog" aria-label="Chat">\
    <div class="de-top">\
      <div class="av">DE</div>\
      <div><h4>Dhiman Enviro</h4><p>Usually replies in minutes</p></div>\
      <button class="de-x" id="deClose" aria-label="Close">&times;</button>\
    </div>\
    <div class="de-log" id="deLog"></div>\
    <div class="de-in">\
      <input id="deInput" placeholder="Ask about products, price, installation…" autocomplete="off"/>\
      <button class="de-send" id="deSend" aria-label="Send">\
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>\
      </button>\
    </div>\
  </div>\
  <div class="de-mob">\
    <a class="btn btn-primary" href="tel:+' + WA + '">Call</a>\
    <a class="btn btn-wa" href="https://wa.me/' + WA + '?text=Hello%20Dhiman%20Enviro" target="_blank" rel="noopener">WhatsApp</a>\
    <a class="btn btn-ghost" href="/contact/">Quote</a>\
  </div>';
  document.body.appendChild(wrap);

  var log = document.getElementById("deLog"),
      panel = document.getElementById("dePanel"),
      input = document.getElementById("deInput"),
      bub = document.getElementById("deBub");

  function scroll() { log.scrollTop = log.scrollHeight; }
  function bot(htmlText, chips) {
    var d = document.createElement("div"); d.className = "de-msg bot"; d.innerHTML = htmlText; log.appendChild(d);
    if (chips && chips.length) {
      var c = document.createElement("div"); c.className = "de-chips";
      chips.forEach(function (t) {
        var b = document.createElement("button"); b.className = "de-chip"; b.textContent = t;
        b.onclick = function () { c.remove(); me(t); handle(t); };
        c.appendChild(b);
      });
      log.appendChild(c);
    }
    scroll();
  }
  function me(t) { var d = document.createElement("div"); d.className = "de-msg me"; d.textContent = t; log.appendChild(d); scroll(); }
  function typing(cb) {
    var d = document.createElement("div"); d.className = "de-msg bot de-typing";
    d.innerHTML = "<span></span><span></span><span></span>"; log.appendChild(d); scroll();
    setTimeout(function () { d.remove(); cb(); }, 480);
  }

  /* ---------------- lead flow ---------------- */
  var FLOW = [
    { key: "name",  q: "Sure — I'll take a few details.<br><br>What's your <b>name</b>?" },
    { key: "phone", q: "Thanks! Your <b>phone number</b>?" },
    { key: "loc",   q: "Which <b>village or city</b> is the farm in?" },
    { key: "size",  q: "What's the <b>shed size</b>? (e.g. 300 × 40 ft — or say 'not sure')" },
    { key: "birds", q: "Roughly how many <b>birds</b>? (or 'not sure')" },
    { key: "need",  q: "Last one — what do you need?", chips: ["Whole house", "Ventilation", "Cooling", "Feeding", "Drinking", "Brooding"] }
  ];
  var step = -1;

  function startLead() { step = 0; typing(function () { bot(FLOW[0].q); }); }

  function finishLead() {
    var t = "Hello Dhiman Enviro, I'd like a quote.%0A%0A" +
      "Name: " + encodeURIComponent(LEAD.name || "-") + "%0A" +
      "Phone: " + encodeURIComponent(LEAD.phone || "-") + "%0A" +
      "Location: " + encodeURIComponent(LEAD.loc || "-") + "%0A" +
      "Shed size: " + encodeURIComponent(LEAD.size || "-") + "%0A" +
      "Birds: " + encodeURIComponent(LEAD.birds || "-") + "%0A" +
      "Need: " + encodeURIComponent(LEAD.need || "-");
    var url = "https://wa.me/" + WA + "?text=" + t;
    typing(function () {
      bot("Got it, " + (LEAD.name || "") + " 👍<br><br>Tap below and it sends everything to our team on WhatsApp — they'll reply with a system layout and price.<br><br><a class='btn btn-wa' style='margin-top:6px' href='" + url + "' target='_blank' rel='noopener'>Send to the team →</a><br><br>Prefer a call? <a href='tel:+" + WA + "' style='color:var(--green-deep);font-weight:600'>+91 74949 62137</a>");
      step = -1;
    });
  }

  var NAV = {
    "see products": "/products/", "see ventilation products": "/products/",
    "see cooling products": "/products/", "see feeding products": "/products/",
    "see drinking products": "/products/", "see brooding products": "/products/",
    "see control panel": "/products/automatic-control-panel/", "see quality page": "/quality/",
    "dealer enquiry": "/dealers/", "send export enquiry": "/exports/",
    "get directions": "/contact/"
  };

  function handle(text) {
    var t = (text || "").trim(); if (!t) return;
    var low = t.toLowerCase();

    if (step >= 0) {                       /* collecting lead */
      LEAD[FLOW[step].key] = t;
      step++;
      if (step < FLOW.length) {
        var f = FLOW[step];
        typing(function () { bot(f.q, f.chips); });
      } else finishLead();
      return;
    }
    if (/get my quote|quote me|my quote|price for my|request a quote/.test(low)) { me1(); return; }
    function me1() { typing(startLead); }

    if (/talk to the team|talk to a person|call|human/.test(low)) {
      typing(function () {
        bot("Of course.<br><br>📞 <a href='tel:+" + WA + "' style='color:var(--green-deep);font-weight:600'>+91 74949 62137</a><br>💬 <a href='https://wa.me/" + WA + "' target='_blank' rel='noopener' style='color:var(--green-deep);font-weight:600'>WhatsApp us</a><br>✉️ <a href='mailto:poultry@dhimanenviro.com' style='color:var(--green-deep);font-weight:600'>poultry@dhimanenviro.com</a>");
      });
      return;
    }
    if (NAV[low]) { var u = NAV[low]; typing(function () { bot("Opening that page for you…"); setTimeout(function(){ location.href = u; }, 500); }); return; }

    var r = reply(t);
    typing(function () { bot(r.a, r.chips); });
  }

  function send() { var v = input.value.trim(); if (!v) return; me(v); input.value = ""; handle(v); }
  document.getElementById("deSend").onclick = send;
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });

  function open() {
    panel.classList.add("open"); bub.style.display = "none";
    if (!log.children.length) {
      bot("Namaste 🙏 I'm the Dhiman Enviro assistant.<br><br>I can help with equipment, sizing, installation or exports — or take your details for a quote.",
          ["Get my quote", "Fan / ventilation", "Cooling pads", "Feeding system", "Talk to the team"]);
    }
    setTimeout(function () { input.focus(); }, 120);
  }
  document.getElementById("deOpen").onclick = open;
  bub.onclick = open;
  document.getElementById("deClose").onclick = function () { panel.classList.remove("open"); };
  setTimeout(function () { if (bub) bub.style.display = "none"; }, 12000);

  /* ---------------- quote estimator (on pages that include it) ---------------- */
  window.deEstimate = function () {
    var L = parseFloat(document.getElementById("es_len").value) || 0;
    var W = parseFloat(document.getElementById("es_wid").value) || 0;
    var out = document.getElementById("es_out");
    if (!L || !W) { out.innerHTML = "<p style='color:var(--clay);font-size:14px'>Enter both length and width to see an indicative system.</p>"; return; }
    var area = L * W;
    var birds = Math.round(area / 1.1);
    var fans = Math.max(2, Math.ceil(W / 8));
    var pad = Math.round(W * 0.9);
    var pans = Math.round(birds / 55);
    var nipples = Math.round(birds / 12);
    out.innerHTML =
      "<div class='panel' style='margin-top:20px'>" +
      "<p class='eyebrow'>Indicative system</p>" +
      "<dl class='kv' style='margin-top:14px'>" +
      "<dt>Floor area</dt><dd>" + area.toLocaleString() + " sq ft</dd>" +
      "<dt>Approx. birds</dt><dd>" + birds.toLocaleString() + "</dd>" +
      "<dt>Tunnel fans</dt><dd>~" + fans + " units</dd>" +
      "<dt>Cooling pad wall</dt><dd>~" + pad + " ft</dd>" +
      "<dt>Feeding pans</dt><dd>~" + pans.toLocaleString() + "</dd>" +
      "<dt>Nipple points</dt><dd>~" + nipples.toLocaleString() + "</dd>" +
      "</dl>" +
      "<p style='color:var(--muted);font-size:13.5px;margin-top:16px;line-height:1.6'>These are rough starting figures based on floor area — not a quotation. Actual counts depend on climate, bird type, ceiling height and stocking density. Send it to us and we'll work out the exact specification.</p>" +
      "<div style='display:flex;gap:10px;flex-wrap:wrap;margin-top:18px'>" +
      "<a class='btn btn-primary' href='https://wa.me/" + WA + "?text=" +
        encodeURIComponent("Hello Dhiman Enviro, my shed is " + L + " x " + W + " ft (approx " + birds + " birds). Please send a quotation.") +
        "' target='_blank' rel='noopener'>Send this for a quote →</a>" +
      "<a class='btn btn-ghost' href='/contact/'>Contact form</a>" +
      "</div></div>";
    out.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
})();
