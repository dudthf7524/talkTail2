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
const passportConfig = require('./src/passport'); 
dotenv.config(); // .env 파일의 환경 변수 로드

const app = express();

const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // SequelizeStore 선언
const store = new SequelizeStore({
  db: sequelize, // Sequelize 인스턴스 연결
  tableName: 'Sessions', // 세션 테이블 이름
});
passportConfig();
app.set('port', process.env.PORT || 8282);
// app.use(express.static(path.join(__dirname, '../client-business/build')));

// app.get('/', (req, res) => {
   
//     res.sendFile(path.join(__dirname, '../client-business/build/index.html'));
// })
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
  credentials: true, 
}));



app.use(morgan('dev'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));



app.use((req, res, next) => {
  console.log('User in session:', req.user); // 세션에 저장된 사용자 정보 확인
  next();
});

app.use(passport.initialize());
app.use(session({
  secret: '암호화에 쓸 비번', // 세션 암호화 키
  store: store, // 세션 스토어 설정
  resave: false,
  saveUninitialized: false,
  credentials: true,
  cookie: {
    httpOnly: true, // 클라이언트에서 쿠키를 접근하지 못하도록
    secure: true, // HTTPS 환경에서만 true
      // 크로스 도메인에서 쿠키를 전송하기 위한 설정
    maxAge: 24 * 60 * 60 * 1000,  // 쿠키 만료 시간 설정 (1일)
  }
}));


app.use(passport.session());





app.get('/admin-menu', (req, res) => {
  console.log('aaa')
  console.log('aaa')
  console.log('aaa')
  console.log(req.user)
  console.log(res.user)
  res.sendFile(path.join(__dirname, '../client-business/build/index.html'));
})

app.get('/user/auth', (req, res) => {
  console.log('aaa')
  console.log("req : ", req.user)
  console.log(req.user)
  console.log(req.session)
  res.json(req.user)
});



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

