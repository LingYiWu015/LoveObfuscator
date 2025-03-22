function obfuscate(text, lang = 'python', style = 'basic') {
  if (style === 'basic') {
    return basicObfuscate(text, lang);
  } else if (style === 'random') {
    return randomObfuscate(text, lang);
  } else if (style === 'advanced') {
    return advancedObfuscate(text, lang);
  }
  return 'Unsupported style';
}

function basicObfuscate(text, lang) {
  if (lang === 'python') {
    const arr = Array.from(text).map(c => c.charCodeAt(0));
    return `print(''.join(map(chr, ${JSON.stringify(arr)})))`;
  }
  if (lang === 'js') {
    const b64 = btoa(text);
    return `eval(atob('${b64}'))`;
  }
  if (lang === 'php') {
    const arr = Array.from(text).map(c => c.charCodeAt(0));
    return `<?php echo chr(${arr.join(').' + 'chr(')}); ?>`;
  }
  if (lang === 'cpp') {
    const arr = Array.from(text).map(c => `char(${c})`).join(' << ');
    return `std::cout << ${arr};`;
  }
  return '// Unsupported language';
}

function randomObfuscate(text, lang) {
  const randomStyle = Math.random() < 0.5 ? 'python' : 'js';
  return basicObfuscate(text, randomStyle);
}

function advancedObfuscate(text, lang) {
  if (lang === 'php') {
    const arr = Array.from(text).map(c => c.charCodeAt(0));
    return `<?php echo chr(${arr.join(').' + 'chr(')}); ?>`;
  }
  if (lang === 'cpp') {
    const arr = Array.from(text).map(c => `char(${c})`).join(' << ');
    return `std::cout << ${arr};`;
  }
  return lang === 'js' ? `eval(atob('${btoa(text)}'))` : `exec("${text}")`;
}

function generate() {
  const feedback = document.getElementById("feedback");
  feedback.innerText = '正在生成混淆代码...';
  const text = document.getElementById("input").value;
  const lang = document.getElementById("lang").value;
  const style = document.getElementById("style").value;
  const result = obfuscate(text, lang, style);
  document.getElementById("output").innerText = result;
  feedback.innerText = '混淆代码生成完毕！';
}

function copyToClipboard() {
  const output = document.getElementById("output").innerText;
  navigator.clipboard.writeText(output).then(() => {
    alert('代码已复制到剪贴板！');
  });
}
