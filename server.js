const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require("./models");
const art = require("./models/art");
const multer = require("multer");
const db = require("./models");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const now = new Date();
      cb(
        null,
        now.getFullYear().toString() +
          now.getMonth().toString() +
          now.getDate().toString() +
          now.getHours().toString() +
          now.getMinutes().toString() +
          now.getSeconds().toString() +
          file.originalname
      );
    },
  }),
});

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

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
      res.status(400).send("findAll 에서 에러 발생");
    });
});

app.post("/arts", (req, res) => {
  const body = req.body;

  const { artName, artistName, description, imageUrl } = body;
  if (!imageUrl) {
    res.status(400).send("이미지 업로드가 필요합니다.");
  }
  if (!artName || !artistName || !description) {
    res.status(400).send("모든 필드를 입력해주세요");
  }
  models.Art.create({
    artName,
    artistName,
    description,
    imageUrl,
  })
    .then((result) => {
      console.log("create result : ", result);
      res.send({ result });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("업로드에서 문제가 발생했습니다.");
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
      res.status(400).send("그림 상세조회 에러");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  res.send({ imageUrl: file.path });
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
