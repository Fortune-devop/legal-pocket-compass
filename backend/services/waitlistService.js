const WaitlistUser = require('../models/WaitlistUser');

class WaitlistService {
  async addToWaitlist(userData) {
    try {
      const waitlistUser = new WaitlistUser({
        email: userData.email,
        fullName: userData.fullName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        metadata: userData.metadata || {}
      });
      const savedUser = await waitlistUser.save();
      return { success: true, user: savedUser };
    } catch (error) {
      if (error.code === 11000) {
        return { success: false, error: 'Email already exists in waitlist' };
      }
      throw error;
    }
  }

  async getWaitlistedUsers() {
    return await WaitlistUser.find().sort({ waitlistedAt: -1 });
  }

  async getPendingUsers() {
    return await WaitlistUser.find({ approved: false }).sort({ waitlistedAt: 1 });
  }

  async approveUser(userId) {
    return await WaitlistUser.findByIdAndUpdate(
      userId,
      { approved: true, approvedAt: new Date(), status: 'approved' },
      { new: true }
    );
  }

  async updateCognitoUserId(waitlistId, cognitoUserId) {
    return await WaitlistUser.findByIdAndUpdate(
      waitlistId,
      { cognitoUserId },
      { new: true }
    );
  }

  async getUserByEmail(email) {
    return await WaitlistUser.findOne({ email: email.toLowerCase() });
  }

  async getUserById(id) {
    return await WaitlistUser.findById(id);
  }

  async getWaitlistStats() {
    const stats = await WaitlistUser.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$approved', false] }, 1, 0] } },
          approved: { $sum: { $cond: [{ $eq: ['$approved', true] }, 1, 0] } }
        }
      }
    ]);
    return stats[0] || { total: 0, pending: 0, approved: 0 };
  }

  async deleteUser(userId) {
    return await WaitlistUser.findByIdAndDelete(userId);
  }
}

module.exports = new WaitlistService(); 