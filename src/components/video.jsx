import React from 'react';

const VideoPlayer = () => {
    return (
        <div>
            <video width="600" controls>
                <source src="/bublevedio.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;