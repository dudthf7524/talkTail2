const express = require('express');
const router = express.Router();
const savedService = require('../services/savedService');

// 찜 항목 추가
router.post('/saved', async (req, res) => {
    try {
        const { id, platform } = req.user;
        const { business_id } = req.body;
        console.log('id', id);
        console.log('platform', platform);
        console.log('businessId', business_id);
        const saved = await savedService.registerSaved(id, platform, business_id);
        res.json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 찜한 목록 조회
router.get('/saved', async (req, res) => {
    try {
        const { id, platform } = req.user;
        const saved = await savedService.getSaved(id, platform);
        res.json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 찜한 항목 삭제
router.delete('/saved/:business_id', async (req, res) => {
    try {
        const { id, platform } = req.user;
        const { business_id } = req.params;
        console.log('id', id);
        console.log('platform', platform);
        console.log('businessId to delete', business_id);
        await savedService.deleteSaved(id, platform, business_id);
        res.json({ message: '찜한 항목이 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;