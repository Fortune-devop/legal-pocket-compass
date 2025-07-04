const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const waitlistService = require('../services/waitlistService');
const router = express.Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Returns the health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * @openapi
 * /api/waitlist/join:
 *   post:
 *     summary: Join the waitlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               fullName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       200:
 *         description: Successfully joined waitlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/WaitlistUser'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to join waitlist
 */
router.post('/waitlist/join', async (req, res) => {
  try {
    const { email, fullName, firstName, lastName, metadata } = req.body;
    if (!email || !fullName) {
      return res.status(400).json({ error: 'Email and full name are required' });
    }
    const result = await waitlistService.addToWaitlist({
      email,
      fullName,
      firstName,
      lastName,
      metadata
    });
    if (result.success) {
      res.json({ message: 'Successfully joined waitlist', user: result.user });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error joining waitlist:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
});

/**
 * @openapi
 * /api/admin/waitlist:
 *   get:
 *     summary: Get waitlisted users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of waitlisted users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WaitlistUser'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/admin/waitlist', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await waitlistService.getWaitlistedUsers();
    res.json({ users });
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    res.status(500).json({ error: 'Failed to fetch waitlist' });
  }
});

/**
 * @openapi
 * /api/admin/approve-user:
 *   post:
 *     summary: Approve a waitlisted user (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/WaitlistUser'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/admin/approve-user', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const user = await waitlistService.approveUser(userId);
    if (user) {
      res.json({ message: 'User approved successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Failed to approve user' });
  }
});

/**
 * @openapi
 * /api/user/profile:
 *   get:
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 publicMetadata:
 *                   type: object
 *                 unsafeMetadata:
 *                   type: object
 *       401:
 *         description: Unauthorized
 */
router.get('/user/profile', authenticateToken, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    publicMetadata: req.user.publicMetadata,
    unsafeMetadata: req.user.unsafeMetadata
  });
});

module.exports = router; 