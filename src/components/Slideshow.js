// components/Slideshow.js
import { Slide } from 'react-slideshow-image';
/*import 'react-slideshow-image/dist/styles.css';*/

const slideImages = [
    {
        url: 'https://i.pinimg.com/originals/be/e2/5a/bee25afeb1e4d0d264564d473d0ef9b1.jpg',
        caption: 'Slide 1'
    },
    {
        url: 'https://i.pinimg.com/originals/bd/f7/2d/bdf72dce4cc7c1af28fbf246d6c97b04.jpg',
        caption: 'Slide 2'
    },
    {
        url: 'https://img.freepik.com/premium-photo/black-white-tree-nature-minimal-background-blank-empty-background-backdrop_715671-773.jpg',
        caption: 'Slide 3'
    }
];

const Slideshow = () => {
    return (
        <div className="slide-container">
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div className="each-slide" key={index}>
                        <div style={{ 'backgroundImage': `url(${slideImage.url})` }}>
                            <span>{slideImage.caption}</span>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default Slideshow;

