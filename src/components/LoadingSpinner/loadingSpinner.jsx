import React from 'react';
import { useState, useEffect } from 'react';
import { SpinnerContainer, SpinnerCircle } from './loadingSpinner.style';

const LoadingSpinner = () => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRotation(prevRotation => (prevRotation + 15) % 360);
        }, 50);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <SpinnerContainer>
            <SpinnerCircle rotation={rotation} />
        </SpinnerContainer>
    );
};

export default LoadingSpinner;