import Cookies from 'cookies';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Initialize cookies object
        const cookies = new Cookies(req, res);

        // Clear the 'username' cookie by setting it to an empty value and specifying the path
        cookies.set('username', '', { maxAge: -1, path: '/' });

        // Redirect to home page or another page as needed
        res.redirect('/');
    } else {
        // If method is not GET, respond with a method not allowed status
        res.status(405).json({ message: 'Method not allowed' });
    }
}
