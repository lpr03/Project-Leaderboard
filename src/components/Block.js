// components/Block.js
import Image from 'next/image';

const Block = ({ imageSrc, description }) => {
    return (
        <div className="block">
            <div className="block-image">
                <Image src={imageSrc} alt="Block Image" layout="fill" objectFit="cover" />
            </div>
            <div className="block-description">
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Block;
