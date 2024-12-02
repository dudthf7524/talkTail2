const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./src/routes/authRoutes');
const petRoutes = require('./src/routes/petRoutes');
const storageRoutes = require('./src/routes/storageRoutes');
const businessRoutes = require('./src/routes/businessRoutes');
const savedRoutes = require('./src/routes/savedRoutes');

dotenv.config(); // .env 파일의 환경 변수 로드

const app = express();
app.set('port', process.env.PORT || 8282);

// 데이터베이스 연결
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패:', err);
  });

// CORS 설정
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || /^http:\/\/223.130.150.169(:\d+)?$/.test(origin)) {
//       // 로컬호스트에서 모든 포트 허용
//       callback(null, true);
//     } else {
//       // 기타 도메인은 허용하지 않음
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true  // 인증정보 (쿠키, 인증 헤더 등)를 전송할 수 있도록 허용
// }));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4400'], // 허용할 도메인을 배열로 제공
  methods: ['GET', 'POST'], // 허용할 HTTP 메소드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
}));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우트 설정
app.use('/api', authRoutes);
app.use('/api/pet', petRoutes);
app.use('/api', storageRoutes);
app.use('/api', businessRoutes);
app.use('/api', savedRoutes);

// 서버 실행
app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버가 실행 중입니다.`);
});
