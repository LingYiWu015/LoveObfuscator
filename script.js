// 混淆核心模块
const Obfuscator = {
  methods: {
    base64: text => btoa(text),
    hex: text => Array.from(text).map(c => 
      `\\x${c.charCodeAt(0).toString(16).padStart(2, '0')}`
    ).join(''),
    unicode: text => Array.from(text).map(c => 
      `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`
    ).join('')
  },

  generate: (text, lang, method) => {
    const encoder = Obfuscator.methods[method];
    switch(lang) {
      case 'python':
        return `exec(__import__('base64').b64decode('${btoa(text)}'))`;
      case 'js':
        return `eval("${encoder(text)}")`;
      case 'php':
        return `<?php eval(base64_decode('${btoa(text)}')) ?>`;
      case 'cpp':
        return `std::cout << "${encoder(text)}";`;
      default:
        return 'Unsupported language';
    }
  }
};

// UI控制模块
const UI = {
  init: () => {
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.key === 'Enter') UI.generate();
    });
    
    if ('ontouchstart' in window) {
      document.querySelector('textarea').focus();
    }
  },

  generate: () => {
    const input = document.getElementById('input').value;
    const lang = document.getElementById('lang').value;
    const method = document.getElementById('style').value;
    const output = Obfuscator.generate(input, lang, method);
    
    document.getElementById('output').textContent = output;
    window.scrollTo({
      top: document.getElementById('output').offsetTop - 100,
      behavior: 'smooth'
    });
  },

  copy: () => {
    navigator.clipboard.writeText(
      document.getElementById('output').textContent
    ).then(() => {
      alert('代码已复制到剪贴板！');
    });
  }
};

// 初始化
document.addEventListener('DOMContentLoaded', UI.init);