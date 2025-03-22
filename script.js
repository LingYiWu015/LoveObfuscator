// 新增混淆类型
const OBFUSCATION_METHODS = {
  BASE64: 'base64',
  HEX: 'hex',
  UNICODE: 'unicode',
  VARIABLE_MASK: 'variable-mask',
  CONTROL_FLOW: 'control-flow'
};

function obfuscate(text, lang = 'python', style = 'basic', targetLang = 'python') {
  if (style === 'basic') {
    return basicObfuscate(text, lang, targetLang);
  } else if (style === 'random') {
    return randomObfuscate(text, lang, targetLang);
  } else if (style === 'advanced') {
    return advancedObfuscate(text, lang, targetLang);
  }
  return 'Unsupported style';
}

function basicObfuscate(text, lang, targetLang) {
  const arr = Array.from(text).map(c => c.charCodeAt(0));
  if (targetLang === 'python') {
    return `print(''.join(map(chr, ${JSON.stringify(arr)})))`;
  }
  if (targetLang === 'js') {
    return `eval(atob('${btoa(text)}'))`;
  }
  if (targetLang === 'php') {
    return `<?php echo chr(${arr.join(').' + 'chr(')}); ?>`;
  }
  if (targetLang === 'cpp') {
    return `std::cout << ${arr.map(c => `char(${c})`).join(' << ')};`;
  }
  return 'Unsupported target language';
}

function reverseLogicObfuscate(text) {
  let reversed = text.split('').reverse().join('');
  return `console.log("${reversed}")`;
}

function addRedundantCondition(text) {
  return `if (true) { ${text} } else { console.log('Dead code'); }`;
}

function dynamicCodeObfuscate(text) {
  let encoded = btoa(text);
  return `eval(atob('${encoded}'))`;
}

// 加强的混淆核心方法
function advancedObfuscate(text, lang) {
  let result = '';
  switch(lang) {
    case 'python':
      result = `exec(__import__('base64').b64decode('${btoa(text)}').decode())`;
      break;
    case 'js':
      const hexStr = Array.from(text).map(c => 
        `\\x${c.charCodeAt(0).toString(16).padStart(2, '0')}`
      ).join('');
      result = `eval("${hexStr}")`;
      break;
    case 'php':
      result = `<?php eval(base64_decode('${btoa(text)}')); ?>`;
      break;
    case 'cpp':
      const bytes = Array.from(text).map(c => 
        `static_cast<char>(${c.charCodeAt(0)})`
      ).join(' << ');
      result = `std::cout << ${bytes};`;
      break;
  }
  return applyAdvancedObfuscation(result, lang);
}

function generate() {
  document.getElementById("loading").style.display = 'block';
  const text = document.getElementById("input").value;
  const lang = document.getElementById("lang").value;
  const targetLang = document.getElementById("targetLang").value;
  const style = document.getElementById("style").value;
  const result = obfuscate(text, lang, style, targetLang);
  document.getElementById("output").innerText = result;
  document.getElementById("loading").style.display = 'none';
}

function copyToClipboard() {
  const output = document.getElementById("output").innerText;
  navigator.clipboard.writeText(output).then(() => {
    alert('代码已复制到剪贴板！');
  });
}


// 应用控制流混淆和变量替换
function applyAdvancedObfuscation(code, lang) {
  const randomVar = () => Math.random().toString(36).substr(2, 4);
  const vars = Array.from({length: 3}, randomVar);
  
  let obfuscated = code;
  vars.forEach(v => {
    obfuscated = obfuscated.replace(/var/g, v);
  });

  if (lang === 'js') {
    obfuscated = `
      (function() {
        const ${vars[0]} = [${[...vars].reverse().map(v => `'${v}'`).join(',')}];
        ${obfuscated}
      })();
    `;
  }
  
  return obfuscated;
}

// 新增混淆选项界面需要更新 HTML