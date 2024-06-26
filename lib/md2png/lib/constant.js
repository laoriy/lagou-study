const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://unpkg.com/github-markdown-css">
  <style>
    .markdown-body {
      width: 90%;
      max-width: 700px;
      margin: 0 auto;
    }
  </style>
</head>
<body class="markdown-body">
  \${fragment}
</body>
</html>`

module.exports = { defaultHtml }