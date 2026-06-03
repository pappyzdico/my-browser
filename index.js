const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Browser</title>
      <style>
        body { font-family: Arial, sans-serif; background: #1a1a2e; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .box { background: #16213e; padding: 40px; border-radius: 16px; width: 90%; max-width: 500px; }
        input { width: 100%; padding: 12px; border-radius: 8px; border: none; font-size: 16px; box-sizing: border-box; }
        button { margin-top: 12px; width: 100%; padding: 12px; background: #0f3460; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; }
        button:hover { background: #533483; }
      </style>
    </head>
    <body>
      <div class="box">
        <h2>🌐 My Browser</h2>
        <form method="GET" action="/proxy">
          <input type="text" name="url" placeholder="Enter a URL (e.g. example.com)" required />
          <button type="submit">Go</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

app.get('/proxy', async (req, res) => {
  let url = req.query.url;
  if (!url.startsWith('http')) url = 'https://' + url;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.send('<h2 style="color:red">Failed to load that site. It may be blocking proxies.</h2>');
  }
});

app.listen(3000, () => console.log('Running'));
