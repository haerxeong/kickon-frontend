import React, { Component } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import {
    BannerContainer, LeftArrow, RightArrow, IndicatorContainer, IndicatorDot
} from './mainBanner.style';

const images = [banner1, banner2, banner3];

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

                <LeftArrow onClick={this.handlePrev}>
                    <ChevronLeft size={80} strokeWidth={1} />
                </LeftArrow>

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