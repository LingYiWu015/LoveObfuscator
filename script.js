
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

function advancedObfuscate(text, lang) {
  let result = reverseLogicObfuscate(text);
  result = addRedundantCondition(result);
  return dynamicCodeObfuscate(result);
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
