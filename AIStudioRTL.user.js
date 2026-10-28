// ==UserScript==
// @name         AIStudioRTL
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  RTL, Hebrew, WhatsApp chat theme, fixed popup position, and timeline (Optimized performance without code-collapse or chat downloader).
// @author       elch
// @match        *://aistudio.google.com/*
// @updateURL    https://raw.githubusercontent.com/Tzadikvtovlo/AIStudioRTL/main/AIStudioRTL.user.js
// @downloadURL  https://raw.githubusercontent.com/Tzadikvtovlo/AIStudioRTL/main/AIStudioRTL.user.js
// @icon         https://www.google.com/s2/favicons?sz=256&domain=AiStudio.google.com
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // ==========================================
    // 1. הגדרות CSS (RTL, עיצוב וואטסאפ וציר זמן בלבד)
    // ==========================================
    const css = `
        /* הגדרות RTL בסיסיות */
        body, html, main, section, nav, mat-drawer, ms-prompt-editor, .main-container {
            direction: rtl !important;
            text-align: right !important;
        }

        textarea, input, [contenteditable="true"], .textarea {
            direction: rtl !important;
            text-align: right !important;
        }

        pre, code, .monaco-editor, .code-block, .code-editor {
            direction: ltr !important;
            text-align: left !important;
        }

        /* רקע וואצאפ */
        ms-prompt-editor, .chat-container, .conversation-container, main {
            background-image: url('https://raw.githubusercontent.com/Tzadikvtovlo/AIStudioRTL/main/background.png') !important;
            background-size: cover !important;
            background-attachment: fixed !important;
            background-color: #efeae2 !important;
        }

        /* עיצוב הבועות */
        .chat-turn-container.render {
            box-sizing: border-box !important;
            max-width: 100% !important;
            overflow-wrap: anywhere;
            margin: 15px 0 !important;
            border-radius: 12px !important;
            padding: 15px 18px !important;
            position: relative !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.15) !important;
            border: 1px solid rgba(0,0,0,0.05) !important;
            transition: box-shadow 0.3s;
        }

        .chat-turn-container.render.user {
            background-color: #d9fdd3 !important;
            color: #000 !important;
            border-top-right-radius: 0px !important;
            margin-right: 2% !important;
            margin-left: 15% !important;
        }
        .chat-turn-container.render.user * { background-color: transparent !important; }

        .chat-turn-container.render:not(.user) {
            background-color: #ffffff !important;
            color: #000 !important;
            border-top-left-radius: 0px !important;
            margin-left: 2% !important;
            margin-right: 15% !important;
        }
        .chat-turn-container.render:not(.user) > * { background-color: transparent !important; }

        .mat-mdc-tooltip, .mdc-tooltip, .mat-mdc-tooltip-surface {
            display: none !important;
            pointer-events: none !important;
        }

        /* ציר זמן */
        #chat-timeline-container {
            position: fixed !important;
            top: 75px !important;
            left: 20px !important;
            width: 240px !important;
            max-height: 70vh !important;
            overflow-y: auto !important;
            background: rgba(255, 255, 255, 0.95) !important;
            border: 1px solid #ccc !important;
            border-radius: 12px !important;
            padding: 10px !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            direction: rtl !important;
            font-size: 13px !important;
            font-family: system-ui, sans-serif !important;
            z-index: 9999999 !important;
            display: block !important;
        }

        #chat-timeline-list { display: flex !important; flex-direction: column !important; gap: 6px !important; }

        .timeline-item {
            padding: 8px 10px !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            background: #f9f9f9 !important;
            border: 1px solid #e0e0e0 !important;
            transition: all 0.2s !important;
        }
        .timeline-item:hover { background: #e6e6e6 !important; transform: translateX(-3px) !important; }
        .timeline-item.user-item { border-right: 4px solid #25D366 !important; }
        .timeline-item.model-item { border-right: 4px solid #34B7F1 !important; }
    `;

    function injectStyle() {
        if (document.getElementById('rtl-custom-style')) return;
        const style = document.createElement('style');
        style.id = 'rtl-custom-style';
        style.innerText = css;
        document.head.appendChild(style);
    }
    injectStyle();

    // ==========================================
    // 2. מילון תרגום
    // ==========================================
    const rawTranslations = [
        ['Temporary chat', "צ'אט זמני"],
        ['No changes to save', 'אין שינויים לשמירה'],
        ['Make a copy', 'צור עותק'],
        ['Delete', 'מחיקה'],
        ['Raw Mode', 'מצב גולמי (Raw)'],
        ['Explore Google models', 'סיור במודלי Google'],
        ['Image Generation', 'יצירת תמונות'],
        ['Code and Chat', "קוד וצ'אט"],
        ['Speech and Music', 'דיבור ומוזיקה'],
        ['Video Generation', 'יצירת וידאו'],
        ['Real-time', 'זמן אמת'],
        ['Featured', 'מומלצים'],
        ['Agents', 'סוכנים'],
        ['EXPLORE', 'סיור'],
        ['Explore', 'סיור'],
        ['Playground', 'סביבת עבודה'],
        ['History', 'היסטוריה'],
        ['BUILD', 'בנייה'],
        ['New app', 'אפליקציה חדשה'],
        ['+ New app', '+ אפליקציה חדשה'],
        ['My apps', 'האפליקציות שלי'],
        ['Gallery', 'גלריה'],
        ['MANAGE', 'ניהול'],
        ['Manage', 'ניהול'],
        ['Dashboard', 'לוח בקרה'],
        ['Documentation', 'תיעוד'],
        ['Upgrade to unlock more', 'שדרג לפתיחת אפשרויות נוספות'],
        ['Run settings', 'הגדרות הרצה'],
        ['Get code', 'קבל קוד'],
        ['System instructions', 'הוראות מערכת'],
        ['System Instructions', 'הוראות מערכת'],
        ['Model', 'מודל'],
        ['Temperature', 'טמפרטורה'],
        ['Tools', 'כלים'],
        ['Structured outputs', 'פלט מובנה'],
        ['Safety Settings', 'הגדרות בטיחות'],
        ['Safety settings', 'הגדרות בטיחות'],
        ['Advanced settings', 'הגדרות מתקדמות'],
        ['Run Ctrl ↵', 'הרצה Ctrl ↵'],
        ['Run', 'הרצה'],
        ['Get API key', 'קבל מפתח API'],
        ['Create new prompt', 'צור פרומפט חדש'],
        ['Chat prompt', "פרומפט צ'אט"],
        ['Freeform prompt', 'פרומפט חופשי'],
        ['Structured prompt', 'פרומפט מובנה'],
        ['User', 'משתמש'],
        ['Model response', 'תשובת מודל'],
        ['Token count', 'מספר טוקנים'],
        ['tokens', 'טוקנים'],
        ['Save', 'שמירה'],
        ['Share', 'שיתוף'],
        ['Clear chat', "נקה צ'אט"],
        ['Thinking', 'חשיבה'],
        ['Reasoning', 'הסקה (Reasoning)'],
        ['Model selection', 'בחירת מודל']
    ];

    const dictionary = rawTranslations.sort((a, b) => b[0].length - a[0].length);

    function translateText(str) {
        if (!str || typeof str !== 'string') return str;
        const normalized = str.trim();
        if (!normalized) return str;
        for (let [from, to] of dictionary) {
            if (normalized === from) return str.replace(from, to);
        }
        return str;
    }

    function pierceShadowAndTranslate(node) {
        if (!node) return;
        if (node.nodeType === Node.TEXT_NODE) {
            const translated = translateText(node.nodeValue);
            if (translated !== node.nodeValue) node.nodeValue = translated;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (['SCRIPT', 'STYLE', 'PRE', 'CODE', 'TEXTAREA'].includes(node.tagName)) return;
            if (node.classList && node.classList.contains('monaco-editor')) return;
            if (node.placeholder) node.placeholder = translateText(node.placeholder);
            if (node.shadowRoot) Array.from(node.shadowRoot.childNodes).forEach(pierceShadowAndTranslate);
            Array.from(node.childNodes).forEach(pierceShadowAndTranslate);
        }
    }

    // תרגום חכם מבוסס MutationObserver (חוסך 95% מעומס המעבד)
    let translateTimer = null;
    const translationObserver = new MutationObserver((mutations) => {
        clearTimeout(translateTimer);
        translateTimer = setTimeout(() => {
            for (let mutation of mutations) {
                mutation.addedNodes.forEach(node => {
                    pierceShadowAndTranslate(node);
                });
            }
        }, 200);
    });
    translationObserver.observe(document.body, { childList: true, subtree: true });

    // ריצה ראשונית חד-פעמית של התרגום
    setTimeout(() => pierceShadowAndTranslate(document.body), 1000);

    // ==========================================
    // 3. תיקון הפופ-אפ שמסתיר את כפתור ההיסטוריה
    // ==========================================
    let mouseX = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; }, { passive: true });
    const popupObserver = new MutationObserver((mutations) => {
        mutations.forEach(mut => {
            mut.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const boundingBox = node.classList.contains('cdk-overlay-connected-position-bounding-box') ? node : (node.querySelector ? node.querySelector('.cdk-overlay-connected-position-bounding-box') : null);
                    if (boundingBox && mouseX > window.innerWidth - 300) {
                        boundingBox.style.setProperty('transform', 'translateX(-260px)', 'important');
                    }
                }
            });
        });
    });
    popupObserver.observe(document.body, { childList: true, subtree: true });

    // ==========================================
    // 4. ציר זמן (Timeline)
    // ==========================================
    function initWidgets() {
        let timeline = document.getElementById('chat-timeline-container');
        if (!timeline) {
            timeline = document.createElement('div');
            timeline.id = 'chat-timeline-container';
            const title = document.createElement('div');
            title.innerHTML = '📍 ציר זמן';
            title.style.cssText = 'font-weight: bold; margin-bottom: 10px; text-align: center; border-bottom: 2px solid #25D366; padding-bottom: 5px; color: #333;';
            timeline.appendChild(title);

            const list = document.createElement('div');
            list.id = 'chat-timeline-list';
            timeline.appendChild(list);

            document.body.appendChild(timeline);
        }
    }

    function updateTimeline() {
        const timeline = document.getElementById('chat-timeline-container');
        const list = document.getElementById('chat-timeline-list');
        if (!timeline || !list) return;

        const turns = document.querySelectorAll('.chat-turn-container.render');
        if (turns.length === 0) {
            timeline.style.display = 'none';
            return;
        } else {
            timeline.style.display = 'block';
        }

        if (list.childElementCount === turns.length) return;

        list.innerHTML = '';
        turns.forEach((turn) => {
            const isUser = turn.classList.contains('user');
            const textElement = turn.querySelector('p, span, .text-content, .markdown-content');
            let text = textElement ? textElement.innerText.trim() : '';
            if (!text) text = isUser ? 'הודעת משתמש...' : 'תשובת מודל...';

            let snippet = text.substring(0, 25).replace(/\n/g, ' ');
            if (text.length > 25) snippet += '...';

            const item = document.createElement('div');
            item.className = `timeline-item ${isUser ? 'user-item' : 'model-item'}`;
            item.innerHTML = `<strong>${isUser ? '👤' : '🤖'}</strong> ${snippet}`;
            item.title = text.substring(0, 100);

            item.addEventListener('click', () => {
                turn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const oldShadow = turn.style.boxShadow;
                turn.style.boxShadow = '0 0 15px #25D366';
                setTimeout(() => { turn.style.boxShadow = oldShadow; }, 1500);
            });
            list.appendChild(item);
        });
    }

    // ==========================================
    // 5. הרצה מרווחת ומיוצבת (כל 1.5 שניות במקום 800ms)
    // ==========================================
    setInterval(() => {
        try { initWidgets(); } catch(e){}
        try { updateTimeline(); } catch(e){}
    }, 1500);

})();
