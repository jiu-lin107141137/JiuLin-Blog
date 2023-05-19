# 部落格開發日誌 - 第三天
繼續開發我的部落格 - 第三天。

## 完成事項
以下為今日所完成的內容:
* 新增文章瀏覽頁面。
* 測試透過HTTPRequest讀取.md檔案
* 處理單頁應用程式(SPA)在部署至Github-page上後，重整造成404的問題。
* 將從.md檔案中讀取到的markdown語法轉為html語法
* 替由markdown轉換而成的html加入css
* 在導覽列上加入 onScrollEventListener 監聽位置，以改變顏色。
<br>

## 新知
在此章節，我將介紹今天所學到的事情。
### 單頁應用程式(SPA)在部署至Github-page上後，重整造成404的問題。
* #### 問題
    如果你曾經瀏覽過部署在Github-page上的單頁應用程式(或是嘗試部署)，當你在重整頁面時，你可能會收到404錯誤訊息，但為何會這樣?
    
* #### 原因
    造成該問題的原因是因為Github-page***原生***並不支援單頁應用程式。當頁面進行重整時，主機端會直接至指定的路由尋找對應的.html檔案，但單頁應用程式只有一個進入點(通常為index.html)，此時主機端在該路徑無法找到.html檔案，進而回傳404錯誤。

    當主機端回傳404錯誤時，如果在根目錄下有404.html，也會一並進行會傳。

* #### 解決方法
    要解決這個問題，我們可以加入404.html，當該檔案被回傳時，將頁面重新導向index.html即可。
    依照下面連結的指示來解決問題。
    https://github.com/rafgraph/spa-github-pages

### 將.md檔案轉為html語法
現在有許多套件可以達到該目的，在此我選擇使用[**marked**](https://marked.js.org/)。
* #### 安裝
    於終端及執行輸入:
    ```sh
    npm install marked
    # or
    npm install @types/marked # For TypeScript projects
    ```
* #### 使用方法
    在 components.vue 內
    ```js
    import { marked } from 'marked';

    // 自定義的renderer
    var myMarkdownRenderer = new marked.Renderer();

    // 自定義渲染函式
    myMarkdownRenderer.heading = function(text, level) {
    if (level > 0 && level < 4) {
        headingCount[level-1] ++;
        headings.push({
        id: 'markdown-heading-' + level + '-' + headingCount[level-1],
        level: level,
        text: text
        });
        return  `
                <h${level} id="markdown-heading-${level}-${headingCount[level-1]}" class='markdown-anchor'>
                    ${text}
                </h${level}>
                `;
    }
    else
        return  `
                <h${level}>
                    ${text}
                </h${level}>
                `;
    }

    // 設定
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        headerPrefix: 'markdown-heading-',
        highlight: (code, lang) => {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language: language }).value;
        },
        langPrefix: 'hljs language-',
        renderer: myMarkdownRenderer,
    });

    const translateMd = async markdownStr => {
        return await marked.parse(markdownStr);
    };
    ```