# LoveObfuscator

把任何句子转换成混淆的 Python / JavaScript 代码，比如“我喜欢你”变成难以阅读的代码，适合整活、表白、做项目彩蛋！

## 在线体验

部署到 GitHub Pages 后，可通过网址访问：

```
https://yourname.github.io/love-obfuscator/
```

## 使用方法

1. 输入你要混淆的句子
2. 选择语言（Python / JS）
3. 点击生成，即可复制混淆代码

## 如何部署

1. 将本项目上传到你的 GitHub 仓库
2. 打开 GitHub 仓库设置 > Pages
3. 选择 `main` 分支，根目录，保存
4. 1 分钟后访问你的 `https://<你的用户名>.github.io/<项目名>/` 页面

## 示例输出

**输入：** `I like you`

**Python 混淆：**
```python
print(''.join(map(chr, [73, 32, 108, 105, 107, 101, 32, 121, 111, 117])))
```

**JS 混淆：**
```javascript
eval(atob('SSBsaWtlIHlvdQ=='))
```
