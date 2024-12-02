const sequelize = require('./models').sequelize;
const User = require('./models/User');
const Authority = require('./models/Authority');
const UserAuthority = require('./models/UserAuthority');
const PetSpecies = require('./models/PetSpecies');
const PetBreed = require('./models/PetBreed');
const Pet = require('./models/Pet');
const PetImage = require('./models/PetImage');
const PetDetailInfo = require('./models/PetOption');
const PetSpeciesInfoRS = require('./models/PetOptionRS');
const PetDetailInfoStatus = require('./models/PetOptionStatus');
const Community = require('./models/Community');
const CommunityTag = require('./models/CommunityTag');
const CommunityTagRS = require('./models/CommunityTagRS');
const Comment = require('./models/Comment');
const Business = require('./models/Business');
const Saved = require('./models/Saved');
const BeautyTag = require('./models/BeautyTag');
const BeautyTagRS = require('./models/BeautyTagRS');
const BeautyReview = require('./models/BeautyReview');
const PetWeight = require('./models/PetWeight');
const BeautyOption = require('./models/BeautyOption');
const BeautyPrice = require('./models/BeautyPrice');
const Reservation = require('./models/Reservation');
const ReservationPriceRS = require('./models/ReservationPriceRS');
const ReservationStatus = require('./models/ReservationStatus');
const NoticePart = require('./models/NoticePart');
const NoticeStatus = require('./models/NoticeStatus');
const NoticeStatusOfPart = require('./models/NoticeStatusOfPart');
const Notice = require('./models/Notice');
const LogLogin = require('./models/LogLogin');
const PathList = require('./models/PathList');
const LogVisitPath = require('./models/LogVisitPath');
const image = require('./models/Image');

async function initializeDatabase() {
  try {
    await sequelize.authenticate(); // DB 연결 테스트
    console.log('DB 연결 성공!');

    // Force: true로 설정하면 기존 테이블을 삭제하고 새로 생성합니다.
    await sequelize.sync({ alter: true });

    console.log('테이블이 성공적으로 생성되었습니다.');
    process.exit(); // 프로세스 종료
  } catch (error) {
    console.error('테이블 생성 실패:', error);
    process.exit(); // 오류 발생 시 프로세스 종료
  }
}

initializeDatabase();
