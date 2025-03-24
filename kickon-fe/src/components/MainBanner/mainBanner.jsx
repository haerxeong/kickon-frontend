import React, { Component } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    BannerContainer, Overlay, TextContainer, MainText, SubText,
    LeftArrow, RightArrow, IndicatorContainer, IndicatorDot
} from './mainBanner.style';

const images = [
    'https://pplx-res.cloudinary.com/image/upload/v1742812791/user_uploads/NsLfdIIdgqrKPSc/image.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
];

class MainBanner extends Component {
    state = {
        currentIndex: 0
    };

    handleNext = () => {
        this.setState(prevState => ({
            currentIndex: (prevState.currentIndex + 1) % images.length
        }));
    };

    handlePrev = () => {
        this.setState(prevState => ({
            currentIndex: (prevState.currentIndex - 1 + images.length) % images.length
        }));
    };

    render() {
        const { currentIndex } = this.state;

        return (
            <BannerContainer style={{ backgroundImage: `url(${images[currentIndex]})` }}>
                <Overlay />

                <LeftArrow onClick={this.handlePrev}>
                    <ChevronLeft size={80} strokeWidth={1} />
                </LeftArrow>

                <TextContainer>
                    <MainText>KICK-ON</MainText>
                    <SubText>내 손 안의 스타디움</SubText>
                </TextContainer>

                <RightArrow onClick={this.handleNext}>
                    <ChevronRight size={80} strokeWidth={1} />
                </RightArrow>

                <IndicatorContainer>
                    {images.map((_, index) => (
                        <IndicatorDot key={index} active={index === currentIndex} />
                    ))}
                </IndicatorContainer>
            </BannerContainer>
        );
    }
}

export default MainBanner;