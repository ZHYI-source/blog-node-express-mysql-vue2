import hljs from "highlight.js"
// https://highlightjs.org/static/demo/
import 'highlight.js/styles/base16/atelier-forest-light.css'


const vHighlight = {
  update(el) {
    let blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  },
};

export default vHighlight;
