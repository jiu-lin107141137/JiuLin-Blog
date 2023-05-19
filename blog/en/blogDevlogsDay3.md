# Blog development log - Day 3
Developing my own blog - day 3.

## Tasks completed
Here are what I had done today:
* Add article content page.
* Test get .md file by HttpRequest (using Axios).
* Fix 404 error on refreshing page with SPA in gh-page.
* Translate .md file to html.
* Style md-file-translated html.
* Add onScrollEventListner on navbar to change navbar's background color.
<br>

## New things I learned
In this section, I will share things I learned today.
### 404 error on freshing page with SPA deployed on gh-page
* #### Issue
    If you ever browse a SPA(single page application) deployed on gh-page(or try to deploy one), you may encounter 404 error when you try to refresh a page, but why?

* #### Why does it happen
    The issue is that gh-page doesn't ***natively*** support SPA. When the page reloads, the host will directly go to the path and fetch the corresponding .html file, but since SPA only has one entrance(usually the index.html), the host then response a 404 error because it couldn't find the .html file under the directory.

    When the host response a 404 error, it will also return the 404.html file if it's found under the root directory.


* #### How to fix
    To fix the issue, we can add the 404.html, when the 404.html is returned, then we can redirect the page to the index.html.
    Check this amazing solution and follow the instructions to solve the problem.
    https://github.com/rafgraph/spa-github-pages

### Translate .md file to html
There are various ways to translate .md file to html, here I'm using [**marked**](https://marked.js.org/) to do this.
* #### installation
    run the srcipt below
    ```sh
    npm install marked
    # or
    npm install @types/marked # For TypeScript projects
    ```
* #### usage
    In components.vue
    ```js
    import { marked } from 'marked';

    // custom renderer.
    var myMarkdownRenderer = new marked.Renderer();

    // custom render function.
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

    // configurate
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