import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import clientPromise from '../../../lib/mongodb';
import Cookies from 'cookies';
import { updateQuestionsSolved } from './scrape';

export default function SignupSuccess() {
  const router = useRouter();

  useEffect(() => {
    const handleSignup = async () => {
      const cookies = new Cookies(document.cookie);
      const signupData = JSON.parse(cookies.get('signupData'));

      if (!signupData) {
        router.push('/signup'); // Redirect if no signup data is found
        return;
      }

      const client = await clientPromise;
      const db = client.db("Users");

      // Check for existing user
      const users = await db.collection("Profiles").find({ "Username": signupData.username }).toArray();
      if (users.length > 0) {
        router.push('/signup?msg=A user already has this username');
        return;
      }

      const password_hash = createHash('sha256').update(signupData.password).digest('hex');
      const currentDate = new Date().toUTCString();
      const bodyObject = {
        Email: signupData.email,
        Username: signupData.username,
        Password: password_hash,
        Created: currentDate,
        Lt_username: signupData.lt_username,
        GFG_username: signupData.gfg_username,
        CC_username: signupData.cc_username,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      };

      await db.collection("Profiles").insertOne(bodyObject);
      await updateQuestionsSolved();

      // Clear the signup data cookie
      cookies.set('signupData', '', { maxAge: 0 });

      // Redirect to the login page after successful signup
      router.push('/login'); // Adjust the path to your login page as needed
    };

    handleSignup();
  }, [router]);

  return (
    <div>
      <h2>Signup Successful!</h2>
      <p>You can now log in with your credentials.</p>
      <button onClick={() => router.push('/login')}>Go to Login</button>
    </div>
  );
}
