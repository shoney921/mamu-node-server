const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/arts", (req, res) => {
  res.send("업로드 된 그림입니다.");
});

app.post("/arts", (req, res) => {
  res.send("그림이 등록되었습니다.");
});

app.listen(port, () => {
  console.log("서버 정상 작동");
});
