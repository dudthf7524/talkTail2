const { v4: uuidv4 } = require('uuid');
const businessService = require('../services/businessService');
const imageService = require('../services/imgService');


const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

const getAllBusinesses = async (req, res) => {
    try {
        console.log('aaa')
        const { category } = req.query;
        console.log('bbb')
        const businesses = await businessService.getBusinessesByCategory(category);
        console.log('businesses:', businesses);
        res.json(businesses);
    } catch (error) {
        console.error('Error fetching businesses:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getBusinessById = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await businessService.getBusinessDetailsById(id);
        res.json(business);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBusiness = async (req, res) => {
    try {
        const formData = req.body; // 폼 데이터
        console.log(formData)
        const password = await bcrypt.hash(req.body.login_password, 10);
        
        console.log(password)
        formData.login_password = password;
        console.log(formData.login_password);
        console.log(formData)
        // 비즈니스 데이터 생성

        const business = await businessService.createBusiness(formData);
        console.log(business)
        res.status(201).json({ business });
    } catch (error) {
        console.error('Error creating business', error.message);
        res.status(500).json({ error: error.message });
    }
};

const createBusinessInformation = async (req, res) => {
    try {
        console.log('aaaaaaaaaaaaaaaa')
        const files = req.files; // 업로드된 파일들
        const formData = req.body; // 폼 데이터
        console.log(req.files)
        console.log('Initial req.files:', req.files);
        console.log('bbbbbbbbbbbbbbbb')
        console.log(formData)
        console.log(formData.business_registration_number)
        console.log('bbbbbbbbbbbbbbbb')
        if (!files) {
            throw new Error('No files uploaded.');
        }
        console.log(Object.keys(files).length)


        // 이미지 업로드 및 URL 가져오기
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).send('No files uploaded.');
        }
        console.log('b')
        const fileArray = [];
        Object.keys(files).forEach(key => {
            fileArray.push(...files[key]);
        });

        console.log('ccccccccccccccccccccc')
        console.log(fileArray)
        console.log('dddddddddddddddddddd')
        const imageUploadResults = await imageService.uploadMultipleImages(fileArray, formData.business_registration_number);
        console.log(imageUploadResults)
        console.log('dddddddddddddddddddd')
        const businessInformation = await businessService.createBusinessInformation(formData);

        res.status(201).json({ businessInformation, imageUploadResults });
    } catch (error) {
        console.error('Error creating business with images:', error.message);
        res.status(500).json({ error: error.message });
    }


};

const businessLogin = async (req, res, next) => {
      // 요청 본문에서 login_id와 password를 추출
    

    passport.use(new LocalStrategy(async (login_id, password, cb) => {
        console.log(login_id)
        console.log(password)
        try {
            // 로그인 ID로 사업자 찾기
            const business = await businessService.businessLogin(login_id, password);
            console.log('aaa')
            console.log(business)
            console.log('aaa')

            // 사업자가 없다면
            if (!business) {
                return cb(null, false, { message: '존재하지 않는 사업자입니다.' });
            }
            
            // 비밀번호 비교 (bcrypt를 사용하여 해시된 비밀번호와 비교)
            const isPasswordValid = await bcrypt.compare(password, business.login_password);
            
            console.log(isPasswordValid)

            // // 비밀번호가 일치하지 않으면
            if (!isPasswordValid) {
                return cb(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
            
            // 인증이 성공하면 business 객체를 반환
            return cb(null, business);
        } catch (error) {
            return cb(error);
        }
    }));

    passport.authenticate('local', (error, user, info) => {
        if (error) return res.status(500).json(error)
        if (!user) return res.status(401).json(info.message)
        req.logIn(user, (err) => {
            if (err) return next(err)
            res.redirect('/')
        })
    })(req, res, next)

    //요청.login 사용하여 로그인 성공화면 세션 document 만들어서 쿠키를 유저에게 보내줌
    passport.serializeUser((user, done) => {
        console.log('세션 document 만들어서 쿠키를 유저에게 보내줌')
        console.log(user.login_id)
        console.log(user.business_owner_name)
        console.log('세션 document 만들어서 쿠키를 유저에게 보내줌')
        process.nextTick(() => {
            done(null, { id: user.login_id, username: user.business_owner_name });
        })
    })

    //쿠키를 분석하는 코드
    passport.deserializeUser(async (user, done) => {
        console.log(user)
        const business = await businessService.businessLogin(user.id, user.password);

        delete business.password
        console.log(business)
        process.nextTick(() => {
            return done(null, business)
        })
    })
};

module.exports = {
    getAllBusinesses,
    getBusinessById,
    createBusiness,
    createBusinessInformation,
    businessLogin,
};
