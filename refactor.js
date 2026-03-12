const fs = require('fs');
const files = ['index.html', 'about.html', 'contact.html', 'faqs.html', 'shop.html', 'values.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Add <script src="assets/components.js"></script> before </head>
  if (!content.includes('assets/components.js')) {
    content = content.replace('</head>', '  <script src="assets/components.js"></script>\n</head>');
  }

  // 2. Clear out the Cart Overlay block(s). about.html has a duplicate so use /g
  content = content.replace(/<!-- Cart Overlay & Drawer -->[\s\S]*?<div class="cart-footer">[\s\S]*?<\/div>\s*<\/div>/g, '');

  content = content.replace(/<div class="announcement-bar">[\s\S]*?<\/div>/g, '');

  content = content.replace(/<nav class="nav" id="mainNav">[\s\S]*?<\/nav>/g, '<app-header></app-header>');

  // 3. Replace the <footer>...</footer> with <app-footer></app-footer>
  content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/g, '<app-footer></app-footer>');

  fs.writeFileSync(file, content);
  console.log('Processed', file);
});
