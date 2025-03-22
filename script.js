// 混淆核心方法 ========================================
const ObfuscationEngine = {
  // 基础编码方法
  baseEncode: (text, method) => {
    switch(method) {
      case 'base64':
        return btoa(unescape(encodeURIComponent(text)));
      case 'hex':
        return Array.from(text).map(c => 
          `\\x${c.charCodeAt(0).toString(16).padStart(2, '0')}`
        ).join('');
      case 'unicode':
        return Array.from(text).map(c => 
          `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`
        ).join('');
      default:
        return text;
    }
  },

  // 语言特定生成器
  generateForLang: (text, lang, method) => {
    const encoded = ObfuscationEngine.baseEncode(text, method);
    switch(lang) {
      case 'python':
        return `exec(__import__('base64').b64decode('${btoa(text)}').decode())`;
      case 'js':
        return `(function(){ return eval("${encoded}"); })();`;
      case 'php':
        return `<?php eval(base64_decode('${btoa(text)}')); ?>`;
      case 'cpp':
        return `std::cout << "${encoded}";`;
      default:
        return '// 不支持的语言';
    }
  },

  // 安全过滤
  sanitizeInput: (text) => {
    return text.replace(/[^\x00-\x7F]/g, '').substring(0, 1000);
  }
};

// UI 交互模块 ========================================
const AppController = {
  init: function() {
    // 跨平台事件监听
    document.getElementById('generateBtn').addEventListener('click', () => this.generate());
    document.getElementById('copyBtn').addEventListener('click', () => this.copyToClipboard());
    
    // 桌面端快捷键
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') this.generate();
    });

    // 移动端自动聚焦
    if ('ontouchstart' in window) {
      document.getElementById('input').focus();
    }
  },

  generate: function() {
    try {
      const input = document.getElementById('input');
      const lang = document.getElementById('lang');
      const style = document.getElementById('style');
      const output = document.getElementById('output');
      const feedback = document.getElementById('feedback');

      // 输入验证
      const cleanText = ObfuscationEngine.sanitizeInput(input.value);
      if (!cleanText) {
        throw new Error('输入内容不能为空');
      }

      // 显示加载状态
      feedback.textContent = '生成中...';
      feedback.style.color = '#007AFF';

      // 新增参数映射
      const methodMap = {
        basic: 'base64',
        random: 'hex',
        advanced: 'unicode'
      };
      const method = methodMap[style.value] || 'base64';

      // 执行混淆
      const result = ObfuscationEngine.generateForLang(
        cleanText,
        lang.value,
        method
      );

      // 更新界面
      output.textContent = result;
      feedback.textContent = '就绪';
      
      // 自动滚动到结果
      output.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });

    } catch (error) {
      console.error('生成错误:', error);
      document.getElementById('feedback').textContent = `错误: ${error.message}`;
      document.getElementById('feedback').style.color = '#FF3B30';
    }
  },

  copyToClipboard: function() {
    const output = document.getElementById('output');
    navigator.clipboard.writeText(output.textContent).then(() => {
      const feedback = document.getElementById('feedback');
      feedback.textContent = '已复制到剪贴板！';
      feedback.style.color = '#34C759';
      setTimeout(() => feedback.textContent = '就绪', 2000);
    }).catch(err => {
      console.error('复制失败:', err);
    });
  }
};

// 初始化应用 ========================================
document.addEventListener('DOMContentLoaded', () => {
  AppController.init();
});