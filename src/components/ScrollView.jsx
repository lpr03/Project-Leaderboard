import { useEffect } from 'react';

function ScrollView() {
    useEffect(() => {
        const hiddenText = document.querySelector('.text-center');
        const features = document.querySelector('.features');

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    hiddenText.classList.add('visible');
                    features.classList.add('visible');
                }
            },
            { threshold: 0.1 }
        );

        if (hiddenText) observer.observe(hiddenText);
        if (features) observer.observe(features);

        return () => {
            if (hiddenText) observer.unobserve(hiddenText);
            if (features) observer.unobserve(features);
        };
    }, []);

    return (
        <>
            <h1 className="text-center">Our platform provides detailed analytics and insights to help you improve your coding skills.</h1>
            <div className="features">
                <div className="feature">
                    <img src="images/slide1.jpg" alt="Feature 1" />
                    <div className="hover-text">Detailed analytics at your fingertips.</div>
                </div>
                <div className="feature">
                    <img src="images/slide2.jpg" alt="Feature 2" />
                    <div className="hover-text">Tailored insights just for you.</div>
                </div>
                <div className="feature">
                    <img src="images/slide3.jpg" alt="Feature 3" />
                    <div className="hover-text">Connect and collaborate globally.</div>
                </div>
            </div>
        </>
    );
}

export default ScrollView;
