function obfuscate(text, lang = 'python') {
  if (lang === 'python') {
    const arr = Array.from(text).map(c => c.charCodeAt(0));
    return `print(''.join(map(chr, ${JSON.stringify(arr)})))`;
  }
  if (lang === 'js') {
    const b64 = btoa(text);
    return `eval(atob('${b64}'))`;
  }
  return '// Unsupported language';
}

function generate() {
  const text = document.getElementById("input").value;
  const lang = document.getElementById("lang").value;
  const result = obfuscate(text, lang);
  document.getElementById("output").innerText = result;
}
