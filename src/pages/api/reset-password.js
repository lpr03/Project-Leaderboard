import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
const { createHash } = require('node:crypto');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token, newPassword } = req.body;

        try {
            await client.connect();
            const db = client.db('Users');
            const users = db.collection('Profiles');

            const user = await users.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
            if (!user) {
                return res.status(400).json({ message: 'Token is invalid or expired' });
            }

            const hashedPassword = createHash('sha256').update(newPassword).digest('hex');

            await users.updateOne({ _id: user._id }, { $set: { Password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null } });

            res.status(200).json({ message: 'Password has been reset' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}