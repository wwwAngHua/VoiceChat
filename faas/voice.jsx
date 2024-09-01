function main() {
  ctx.setHeader("Content-Type", "application/json");
  const token = "sk-XXX";
  const model = "moonshot-v1-8k";
  const prompt =
    "你是爱丽丝，你是我的私人助手。你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。";
  const question = ctx.query("q");
  if (question == "") {
    return JSON.stringify({
      code: 400,
      text: "你好！有什么可以帮助你的吗？",
      mp3: "http://api.t1y.net/storage/1001/assistant/audio/hello.mp3",
    });
  }
  const data = {
    model: model,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: question },
    ],
    temperature: 0.3,
  };
  let resp = http.send(
    "POST",
    "https://api.moonshot.cn/v1/chat/completions",
    { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    JSON.stringify(data)
  );
  if (resp == null) {
    return JSON.stringify({
      code: 500,
      text: "系统错误，请重新尝试一次！",
      mp3: "http://api.t1y.net/storage/1001/assistant/audio/error.mp3",
    });
  }
  if (resp.statusCode != 200) {
    return JSON.stringify({
      code: 500,
      text: "系统错误，请重新尝试一次！",
      mp3: "http://api.t1y.net/storage/1001/assistant/audio/error.mp3",
    });
  }
  resp = http.send(
    "GET",
    "https://api.lolimi.cn/API/yyhc/api.php?msg=" +
      JSON.parse(resp.body).choices[0].message.content +
      "&sp=AD%E5%AD%A6%E5%A7%90",
    { "Content-Type": "application/json" },
    null
  );
  if (resp == null) {
    return JSON.stringify({
      code: 500,
      text: "系统错误，请重新尝试一次！",
      mp3: "http://api.t1y.net/storage/1001/assistant/audio/error.mp3",
    });
  }
  if (resp.statusCode != 200) {
    return JSON.stringify({
      code: 500,
      text: "系统错误，请重新尝试一次！",
      mp3: "http://api.t1y.net/storage/1001/assistant/audio/error.mp3",
    });
  }
  return resp.body;
}
