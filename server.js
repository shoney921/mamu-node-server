const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require("./models");
const art = require("./models/art");

app.use(express.json());
app.use(cors());

app.get("/arts", (req, res) => {
  models.Art.findAll({
    attributes: ["id", "artName", "artistName", "imageUrl", "createdAt"],
    order: [["createdAt", "DESC"]],
    limit: 10,
  })
    .then((result) => {
      console.log("Arts :", result);
      res.send({
        arts: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("findAll 에서 에러 발생");
    });
});

app.post("/arts", (req, res) => {
  const body = req.body;
  const { artName, artistName, description } = body;
  if (!artName || !artistName || !description) {
    res.send("모든 필드를 입력해주세요");
  }
  models.Art.create({
    artName,
    artistName,
    description,
  })
    .then((result) => {
      console.log("create result : ", result);
      res.send({ result });
    })
    .catch((error) => {
      console.error(error);
      res.send("업로드에서 문제가 발생했습니다.");
    });
});

app.get("/arts/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Art.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("art : ", art);
      res.send({ art: result });
    })
    .catch((error) => {
      console.error(error);
      res.send("그림 상세조회 에러");
    });
});

app.listen(port, () => {
  console.log("서버 정상 작동");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB connect success");
    })
    .catch((error) => {
      console.error(error);
      console.log("DB connect Error");
      process.exit;
    });
});
