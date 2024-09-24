import { MongoClient } from 'mongodb';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

if (!uri) {
    console.error("MONGODB_URI is not defined");
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, username } = req.body;

        try {
            await client.connect();
            const db = client.db('Users');
            const users = db.collection('Profiles');

            // Find user by both Email and Username
            const user = await users.findOne({ "Email": email, "Username": username });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const token = crypto.randomBytes(20).toString('hex');
            const expireDate = Date.now() + 3600000; // Token valid for 1 hour

            // Update user document with reset token and expiration time
            await users.updateOne(
                { Email: email, Username: username },
                { $set: { resetPasswordToken: token, resetPasswordExpires: expireDate } }
            );

            // Configure email transporter
            const transporter = nodemailer.createTransport({
                secure: true,
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            // Send reset password email
            await transporter.sendMail({
                to: email,
                from: 'harikamallepally11@gmail.com',
                subject: 'Password Reset Request',
                text: `Hi ${username},\n\nYou requested a password reset. Click the link to reset your password: ${process.env.BASE_URL}/reset-password?token=${token}\n\nIf you did not request this, please ignore this email.`,
            });

            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
