import { MongoClient } from 'mongodb';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
if (!uri) {
    console.error("not defined");
}
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        try {
            await client.connect();
            const db = client.db('Users');
            const users = db.collection('Profiles');

            const user = await users.findOne({ "Email": email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const token = crypto.randomBytes(20).toString('hex');
            const expireDate = Date.now() + 3600000; // Token valid for 1 hour

            await users.updateOne( { Email: email }, { $set: { resetPasswordToken: token, resetPasswordExpires: expireDate } });

            // Configure email transporter
            const transporter = nodemailer.createTransport({
                secure: true,
                service: 'Gmail', // or other service
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            // Send email
            await transporter.sendMail({
                to: email,
                from: 'harikamallepally11@gmail.com',
                subject: 'Password Reset Request',
                text: `You requested a password reset. Click the link to reset your password: ${process.env.BASE_URL}/reset-password?token=${token}`,
            });

            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            console.error("error = ",error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}