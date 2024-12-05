const express = require('express');
const multer = require('multer');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const businessController = require('../controllers/businessController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const passport = require("passport");

dotenv.config();

router.get('/businesses', authMiddleware, businessController.getAllBusinesses);
router.get('/businesses/:id', authMiddleware, businessController.getBusinessById);

router.post('/businesses', businessController.createBusiness);
// router.post('/business/login', businessController.businessLogin)

router.post('/business/login', async(req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) return res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
        if (!user) return res.status(401).json({ message: info.message });
    
        req.login(user, (err) => {
          if (err) return next(err);
    
          // 세션 상태 확인
    
          return res.status(200).json({
            message: '로그인 성공',
            user: {
              id: user.login_id,
              name: user.business_owner_name,
            },
          });
        });
      })(req, res, next);
})

// router.post('/business/login', businessController.businessLogin)

// router.post('/business/login', async(req, res) =>{
//     console.log(req.body)
// })

router.post('/businesses-information', upload.fields([
    { name: 'main', maxCount: 1 },
    { name: 'pricing', maxCount: 3 }
]), businessController.createBusinessInformation);


module.exports = router;

