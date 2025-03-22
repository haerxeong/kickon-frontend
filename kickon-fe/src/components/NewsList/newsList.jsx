// newsList.jsx
import React from "react";
import styled from "styled-components";
import sampleImage from "../../assets/sample_img.png";

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewsItem = styled.div`
  display: flex;
  margin-bottom: 12px;
  gap: 12px;
`;

const NewsImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
`;

const NewsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.h4`
  margin: 0 0 6px 0;
  font-size: 14px;
  line-height: 1.3;
  font-weight: 500;
`;

const NewsDescription = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
  line-height: 1.3;
`;

const NewsList = () => {
    const newsItems = [
        {
            id: 1,
            title: "제주SK, FC서울 상대로 '다음 달' 꺾 계약한다",
            description: "프로축구 K리그1 제주SK가 20일 오후 FC서울과의 홈 경기를 시작으로 2025시즌 정규를 맞게 됐습니다. 지난 5시즌 3년차 제목관리단은...",
            image: sampleImage
        },
        {
            id: 2,
            title: "[K리그] 지 서울 한국에 명문팀 아직 서울은 현대팀을 갈라 썰었다 2등",
            description: "서울은 현재 5위를 기록 하며 아직 강등권에는 한참 멀다 전북은...",
            image: sampleImage
        },
        {
            id: 3,
            title: "[K리그] 지 서울 한국에 명문팀 아직 서울은 현대팀을 갈라 썰었다 2등",
            description: "서울은 현재 5위를 기록 하며 아직 강등권에는 한참 멀다 전북은...",
            image: sampleImage
        },
        {
            id: 4,
            title: "[K리그] 지 서울 한국에 명문팀 아직 서울은 현대팀을 갈라 썰었다 2등",
            description: "서울은 현재 5위를 기록 하며 아직 강등권에는 한참 멀다 전북은...",
            image: sampleImage
        },
        {
            id: 5,
            title: "[K리그] 지 서울 한국에 명문팀 아직 서울은 현대팀을 갈라 썰었다 2등",
            description: "서울은 현재 5위를 기록 하며 아직 강등권에는 한참 멀다 전북은...",
            image: sampleImage
        }
    ];

    return (
        <NewsContainer>
            {newsItems.map(item => (
                <NewsItem key={item.id}>
                    <NewsImage src={item.image} alt={item.title} />
                    <NewsContent>
                        <NewsTitle>{item.title}</NewsTitle>
                        <NewsDescription>{item.description}</NewsDescription>
                    </NewsContent>
                </NewsItem>
            ))}
        </NewsContainer>
    );
};

export default NewsList;