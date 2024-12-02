const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserById, updateUserProfile } = require('../services/userService');

// 사용자 프로필 정보 가져오기
const getUserProfile = async (req, res) => {
  try {
    const { id, platform } = req.user;
    const user = await getUserById(id, platform);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch user profile.' });
  }
};

// 사용자 프로필 수정
const updateUserProfileHandler = async (req, res) => {
  try {
    const { id, platform } = req.user;
    const { name, nickname, phoneNumber, address } = req.body;

    console.log('Received request to update user profile:', { id, platform, name, nickname, phoneNumber, address });

    // 서비스 계층을 통해 사용자 정보 업데이트
    const updatedUser = await updateUserProfile( id, platform, {name, nickname, phoneNumber, address });

    if (!updatedUser) {
      console.log('User not found for ID:', id);
      return res.status(404).json({ message: 'User not found.' });
    }

    console.log('User profile updated successfully:', updatedUser);
    return res.json({ message: 'User profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Failed to update user profile.', error: error.message });
  }
};


// 프로필 조회 API
router.get('/profile', authMiddleware, getUserProfile);

// 프로필 수정 API
router.put('/profile', authMiddleware, updateUserProfileHandler);

module.exports = router;
