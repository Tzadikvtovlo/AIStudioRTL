
// ==UserScript==
// @name         Google AI Studio RTL & Complete Hebrew
// @namespace    http://tampermonkey.net/
// @version      12.1
// @description  Full Hebrew translation and RTL for Google AI Studio
// @author       elch
// @match        *://aistudio.google.com/*
// @updateURL    https://raw.githubusercontent.com/Tzadikvtovlo/AIStudioRTL/main/Tampermonkey.user.js
// @downloadURL  https://raw.githubusercontent.com/Tzadikvtovlo/AIStudioRTL/main/Tampermonkey.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=AiStudio.google.com
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==
 
(function() {
    'use strict';
 
    const css = `
        body, html, div, main, section, nav, mat-drawer, ms-prompt-editor, .main-container {
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
    `;
 
    function injectStyle(root) {
        if (!root || (root.querySelector && root.querySelector('#rtl-custom-style'))) return;
        const style = document.createElement('style');
        style.id = 'rtl-custom-style';
        style.innerText = css;
        (root.head || root).appendChild(style);
    }
 
    injectStyle(document);
 
    const rawTranslations = [
        // לשונית סוכנים (Agents)
        ['Build with Agents', 'בנה באמצעות סוכנים'],
        ['Build with', 'בנה באמצעות'],
        ['Customer Support', 'תמיכת לקוחות'],
        ['Scans a website to build a custom knowledge base and answer support questions using that content', 'סורק אתר אינטרנט כדי לבנות מאגר ידע מותאם אישית ולענות על שאלות תמיכה'],
        ['AI Talk Radio', 'תכנית רדיו AI'],
        ['Transforms a text source into a polished, simulated radio show with hosts, callers, and background music', 'הופך מקור טקסט לתכנית רדיו מדומה ומלוטשת עם מנחים, מאזינים ומוזיקת רקע'],
        ['Antigravity Preview', 'תצוגה מקדימה של Antigravity'],
        ['A general-purpose autonomous agent running in a remote, Google-hosted Linux environment', 'סוכן אוטונומי לשימוש כללי הרץ בסביבת Linux מרוחקת במארח של Google'],
        ['Repo Maintainer', 'מתחזק מאגר קוד (Repo)'],
        ['Analyzes your codebase to identify issues, answer questions, and generate bug-fixing patches', 'מנתח את בסיס הקוד שלך כדי לזהות בעיות, לענות על שאלות וליצור תיקוני באגים'],
        ['Document Processor', 'מעבד מסמכים'],
        ['Reconciles expenses and invoices, verifies vendors, and creates interactive HTML slideshow reports', 'מתאם הוצאות וחשבוניות, מאמת ספקים ויוצר דוחות מצגת אינטראקטיביים ב-HTML'],
        ['Data Analyst', 'מנתח נתונים'],
        ['Delivers interactive business intelligence and data analysis using the Microsoft Northwind dataset', 'מספק בינה עסקית אינטראקטיבית וניתוח נתונים באמצעות מאגר Northwind של Microsoft'],
 
        // תפריט שלוש נקודות / תפריט עליון
        ['Temporary chat', "צ'אט זמני"],
        ['No changes to save', 'אין שינויים לשמירה'],
        ['Make a copy', 'צור עותק'],
        ['Delete', 'מחיקה'],
        ['Raw Mode', 'מצב גולמי (Raw)'],
 
        // הגדרות מתקדמות (Advanced Settings)
        ['Media resolution', 'רזולוציית מדיה'],
        ['Default', 'ברירת מחדל'],
        ['Safety settings', 'הגדרות בטיחות'],
        ['Add stop sequence', 'הוסף רצף עצירה'],
        ['Output length', 'אורך פלט'],
        ['Top P', 'Top P'],
        ['Top K', 'Top K'],
 
        // מסך Explore / סביבת עבודה / כרטיסיות מודלים
        ['Explore Google models', 'סיור במודלי Google'],
        ['Create and edit images with Nano Banana and Imagen', 'צור וערוך תמונות עם Nano Banana ו-Imagen'],
        ['Build chatbots, agents, and code with Gemini 3', 'בנה צ\'אטבוטים, סוכנים וקוד עם Gemini 3'],
        ['Test out our most advanced and newest models', 'נסה את המודלים המתקדמים והחדשים ביותר שלנו'],
        ['Real-time voice and video with Live API', 'קול ווידאו בזמן אמת עם Live API'],
        ['our text to speech and music generation models', 'מודלי הפיכת טקסט לדיבור ויצירת מוזיקה שלנו'],
        ['Generate videos with Veo models, our state of the art video generation models', 'צור סרטונים עם מודלי Veo, המודלים המתקדמים ביותר שלנו ליצירת וידאו'],
        ['Image Generation', 'יצירת תמונות'],
        ['Code and Chat', "קוד וצ'אט"],
        ['Speech and Music', 'דיבור ומוזיקה'],
        ['Video Generation', 'יצירת וידאו'],
        ['Real-time', 'זמן אמת'],
        ['Featured', 'מומלצים'],
        ['Agents', 'סוכנים'],
 
        // כותרות מורכבות ומסך Apps
        ['Build your ideas with Gemini', 'בנה את הרעיונות שלך עם Gemini'],
        ['your ideas with Gemini', 'את הרעיונות שלך עם Gemini'],
        ['Describe an app and let Gemini do the rest', 'תאר אפליקציה ותן ל-Gemini לעשות את השאר'],
        ["I'm feeling lucky", 'אני מרגיש בר מזל'],
        ['Build an Android app', 'בנה אפליקציה ל-Android'],
        ['Browse the app gallery', 'עיון בגלריית האפליקציות'],
        ['Discover and remix app ideas', 'גלה ושפר רעיונות לאפליקציות'],
 
        // ניווט וסרגל צד
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
        ['Access higher limits, Pro models, and more.', 'גישה למגבלות גבוהות יותר, מודלי Pro ועוד.'],
 
        // הגדרות הרצה (Run settings)
        ['Run settings', 'הגדרות הרצה'],
        ['Get code', 'קבל קוד'],
        ['System instructions', 'הוראות מערכת'],
        ['System Instructions', 'הוראות מערכת'],
        ['Optional tone and style instructions for the model', 'הוראות טון וסגנון רשות עבור המודל'],
        ['Model', 'מודל'],
        ['Temperature', 'טמפרטורה'],
        ['Thinking level', 'רמת חשיבה'],
        ['High', 'גבוהה'],
        ['Low', 'נמוכה'],
        ['Medium', 'בינונית'],
        ['Tools', 'כלים'],
        ['Structured outputs', 'פלט מובנה'],
        ['Edit', 'עריכה'],
        ['Code execution', 'הרצת קוד'],
        ['Function calling', 'קריאה לפונקציות'],
        ['Grounding with Google Search', 'ביסוס עם חיפוש גוגל'],
        ['Grounding with Google Maps', 'ביסוס עם מפות גוגל'],
        ['URL context', 'הקשר כתובת URL'],
        ['Source', 'מקור'],
        ['Safety Settings', 'הגדרות בטיחות'],
        ['Advanced settings', 'הגדרות מתקדמות'],
 
        // צ'אט ותחתית העמוד
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
        ['Start typing a prompt to see what our models can do', 'התחל להקליד פרומפט כדי לראות מה המודלים יכולים לעשות'],
        ['Google AI models may make mistakes, so double-check outputs', 'מודלי Google AI עשויים לטעות, מומלץ לוודא את הנתונים']
    ];
 
    const dictionary = rawTranslations.sort((a, b) => b[0].length - a[0].length);
 
    function translateText(str) {
        if (!str) return str;
        let result = str;
        const normalized = str.trim().replace(/\s+/g, ' ');
 
        for (let [from, to] of dictionary) {
            if (normalized === from) {
                return str.replace(str.trim(), to);
            }
            if (result.includes(from)) {
                result = result.replaceAll(from, to);
            }
        }
        return result;
    }
 
    function processNode(node) {
        if (!node) return;
 
        if (node.nodeType === Node.TEXT_NODE) {
            const translated = translateText(node.nodeValue);
            if (translated !== node.nodeValue) {
                node.nodeValue = translated;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.shadowRoot) {
                injectStyle(node.shadowRoot);
                processNode(node.shadowRoot);
            }
 
            if (['SCRIPT', 'STYLE', 'PRE', 'CODE'].includes(node.tagName) || (node.classList && node.classList.contains('monaco-editor'))) {
                return;
            }
 
            if (node.placeholder) {
                node.placeholder = translateText(node.placeholder);
            }
 
            for (let child of node.childNodes) {
                processNode(child);
            }
        }
    }
 
    const observer = new MutationObserver(() => {
        processNode(document.body);
    });
 
    observer.observe(document.body, { childList: true, subtree: true });
    processNode(document.body);
})();
