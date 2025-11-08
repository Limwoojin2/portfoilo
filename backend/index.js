const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

// ✅ 미들웨어 설정
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- 수정됨
app.use(
  cors({
    origin: process.env.FRONT_ORIGIN || "http://localhost:5173", // 프론트 주소
    credentials: true,
  })
);

// ✅ DB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB 연결 성공"))
  .catch((error) => console.log("❌ MongoDB 연결 실패:", error));

// ✅ 라우터 등록
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/auth", userRoutes);
app.use("/api/contact", contactRoutes);

// ✅ 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello Express (백엔드 정상 작동 중)");
});

// ✅ 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
