(function () {

  const api_Url = "http://localhost:3000/api/chat";

  const scriptTag = document.currentScript;
  const OwnerId = scriptTag.getAttribute("data-owner-id");

  if (!OwnerId) {
    console.error("OwnerId is required");
    return;
  }

  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    #boltsync-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 24px rgba(0,0,0,0.22), 0 1px 6px rgba(0,0,0,0.12);
      z-index: 999999;
      border: 3px solid #fff;
      animation: bs-float 2.4s ease-in-out infinite;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }
    #boltsync-btn:hover {
      animation: none;
      transform: scale(1.04);
      box-shadow: 0 8px 32px rgba(0,0,0,0.28);
    }
    #boltsync-btn svg { width: 22px; height: 22px; fill: white; }

    @keyframes bs-float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-7px); }
    }

    #boltsync-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 999997;
    }

    #boltsync-box {
      position: fixed;
      bottom: 104px;
      right: 28px;
      width: 336px;
      height: 460px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 999998;
      font-family: 'Inter', system-ui, sans-serif;
      border: 1px solid #e8edf2;
      transform-origin: bottom right;
    }
    #boltsync-box.bs-open {
      display: flex;
      animation: bs-popIn 0.26s cubic-bezier(.22,1,.36,1) forwards;
    }
    #boltsync-box.bs-close {
      animation: bs-popOut 0.2s cubic-bezier(.4,0,1,1) forwards;
    }
    @keyframes bs-popIn {
      0%   { opacity: 0; transform: scale(0.92) translateY(12px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes bs-popOut {
      0%   { opacity: 1; transform: scale(1) translateY(0); }
      100% { opacity: 0; transform: scale(0.92) translateY(12px); }
    }

    /* Header */
    #boltsync-header {
      background: #0f172a;
      color: #fff;
      padding: 13px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    #boltsync-header-left { display: flex; align-items: center; gap: 9px; }
    #boltsync-avatar {
      width: 30px; height: 30px;
      border-radius: 50%;
      background: #1e293b;
      border: 1.5px solid rgba(255,255,255,0.15);
      display: flex; align-items: center; justify-content: center;
    }
    #boltsync-avatar svg { width: 15px; height: 15px; fill: #94a3b8; }
    #boltsync-header-text {}
    #boltsync-title { font-size: 13px; font-weight: 600; line-height: 1.2; }
    #boltsync-status { font-size: 11px; color: #4ade80; display: flex; align-items: center; gap: 4px; margin-top: 1px; }
    #boltsync-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
      animation: bs-pulse 2s ease-in-out infinite;
    }
    @keyframes bs-pulse {
      0%, 100% { opacity: 1; } 50% { opacity: 0.5; }
    }
    #boltsync-close {
      cursor: pointer; opacity: 0.4; font-size: 16px; line-height: 1;
      transition: opacity 0.15s; width: 26px; height: 26px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 6px;
    }
    #boltsync-close:hover { opacity: 0.9; background: rgba(255,255,255,0.08); }

    /* Messages */
    #boltsync-messages {
      flex: 1;
      padding: 12px 12px 8px;
      overflow-y: auto;
      overflow-x: hidden;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 6px;
      scroll-behavior: smooth;
    }
    #boltsync-messages::-webkit-scrollbar { width: 3px; }
    #boltsync-messages::-webkit-scrollbar-track { background: transparent; }
    #boltsync-messages::-webkit-scrollbar-thumb { background: #dde3ea; border-radius: 99px; }

    .bs-bubble {
      max-width: 80%;
      padding: 8px 12px;
      font-size: 13px;
      line-height: 1.5;
      word-break: break-word;
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      opacity: 0;
      animation: bs-msgIn 0.22s ease forwards;
    }
    @keyframes bs-msgIn {
      0%   { opacity: 0; transform: translateY(6px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .bs-bubble-user {
      align-self: flex-end;
      background: #4f46e5;
      color: #fff;
      border-radius: 16px 3px 16px 16px;
    }
    .bs-bubble-ai {
      align-self: flex-start;
      background: #fff;
      color: #1e293b;
      border-radius: 3px 16px 16px 16px;
      border: 1px solid #e8edf2;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    /* Typing */
    #boltsync-typing {
      align-self: flex-start;
      background: #fff;
      border: 1px solid #e8edf2;
      border-radius: 3px 16px 16px 16px;
      padding: 10px 13px;
      display: flex; gap: 4px; align-items: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      animation: bs-msgIn 0.22s ease forwards;
    }
    .bs-typing-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #cbd5e1;
      animation: bs-dot 1.1s ease-in-out infinite;
    }
    .bs-typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .bs-typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bs-dot {
      0%, 60%, 100% { transform: translateY(0); background: #cbd5e1; }
      30%            { transform: translateY(-5px); background: #94a3b8; }
    }

    /* Footer */
    #boltsync-footer {
      display: flex;
      border-top: 1px solid #f0f3f7;
      padding: 9px;
      gap: 7px;
      background: #fff;
      flex-shrink: 0;
      align-items: center;
    }
    #boltsync-input {
      flex: 1;
      min-width: 0;
      padding: 8px 12px;
      border: 1.5px solid #e8edf2;
      border-radius: 10px;
      font-size: 13px;
      outline: none;
      font-family: 'Inter', system-ui, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
      resize: none;
    }
    #boltsync-input:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
      background: #fff;
    }
    #boltsync-input::placeholder { color: #b0bac5; }
    #boltsync-send {
      width: 36px; height: 36px;
      border: none;
      background: #0f172a;
      color: #fff;
      border-radius: 10px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: background 0.15s, transform 0.12s, opacity 0.15s;
    }
    #boltsync-send:hover  { background: #1e293b; }
    #boltsync-send:active { transform: scale(0.9); }
    #boltsync-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    #boltsync-send svg { width: 15px; height: 15px; fill: white; }

    #boltsync-powered {
      text-align: center;
      font-size: 10px;
      color: #b0bac5;
      padding: 4px 0 6px;
      background: #fff;
      flex-shrink: 0;
      font-family: 'Inter', system-ui, sans-serif;
    }
  `;
  document.head.appendChild(style);

  // OVERLAY (for outside click) 
  const overlay = document.createElement("div");
  overlay.id = "boltsync-overlay";
  document.body.appendChild(overlay);

  //  BUTTON 
  const button = document.createElement("div");
  button.id = "boltsync-btn";
  button.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.157-.878l-2.433.454.454-2.433A7.944 7.944 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/><circle cx="8" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/></svg>';
  document.body.appendChild(button);

  // ── BOX ───────────────────────────────────────────────────────────────────
  const box = document.createElement("div");
  box.id = "boltsync-box";
  box.innerHTML = `
    <div id="boltsync-header">
      <div id="boltsync-header-left">
        <div id="boltsync-avatar">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.157-.878l-2.433.454.454-2.433A7.944 7.944 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/><circle cx="8" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/></svg>
        </div>
        <div id="boltsync-header-text">
          <div id="boltsync-title">Customer Support</div>
          <div id="boltsync-status"><div id="boltsync-dot"></div> Online</div>
        </div>
      </div>
      <span id="boltsync-close">&#x2715;</span>
    </div>
    <div id="boltsync-messages"></div>
    <div id="boltsync-footer">
      <input id="boltsync-input" type="text" placeholder="Type a message…" autocomplete="off" />
      <button id="boltsync-send">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div id="boltsync-powered">Powered by BoltSync</div>`;
  document.body.appendChild(box);

  //  REFS 
  const input        = box.querySelector("#boltsync-input");
  const sendBtn      = box.querySelector("#boltsync-send");
  const messagesArea = box.querySelector("#boltsync-messages");
  const closeBtn     = box.querySelector("#boltsync-close");

  //  OPEN / CLOSE 
  let isOpen = false;

  function openBox() {
    overlay.style.display = "block";
    box.style.display = "flex";
    box.classList.remove("bs-close");
    box.classList.add("bs-open");
    isOpen = true;
    if (messagesArea.children.length === 0) {
      addMessage("Hi! How can I help you? 👋", "ai");
    }
    setTimeout(() => input.focus(), 120);
  }

  function closeBox() {
    overlay.style.display = "none";
    box.classList.remove("bs-open");
    box.classList.add("bs-close");
    isOpen = false;
    setTimeout(() => {
      box.style.display = "none";
      box.classList.remove("bs-close");
    }, 200);
  }

  button.onclick = () => isOpen ? closeBox() : openBox();
  closeBtn.onclick = closeBox;

  // Outside click — only close if input is empty
  overlay.onclick = () => {
    if (input.value.trim() === "") {
      closeBox();
    }
  };

  //  ADD MESSAGE 
  function addMessage(text, from) {
    const bubble = document.createElement("div");
    bubble.className = "bs-bubble " + (from === "user" ? "bs-bubble-user" : "bs-bubble-ai");
    bubble.textContent = text;
    messagesArea.appendChild(bubble);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  // TYPING DOTS 
  function showTyping() {
    const t = document.createElement("div");
    t.id = "boltsync-typing";
    t.innerHTML = '<div class="bs-typing-dot"></div><div class="bs-typing-dot"></div><div class="bs-typing-dot"></div>';
    messagesArea.appendChild(t);
    messagesArea.scrollTop = messagesArea.scrollHeight;
    return t;
  }

  // SEND 
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    sendBtn.disabled = true;
    const typing = showTyping();

    try {
      const response = await fetch(api_Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ OwnerId, message: text }),
      });
      const data = await response.json();
      typing.remove();
      addMessage(data || "Something went wrong.", "ai");
    } catch (error) {
      console.error("BoltSync Error:", error);
      typing.remove();
      addMessage("Something went wrong. Please try again.", "ai");
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.onclick = sendMessage;
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

})();