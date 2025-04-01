import React, { useState } from "react";
import * as S from "./postEditor.style";
import { PiImageSquare } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaAlignLeft
} from "react-icons/fa";
import {
    BsLink45Deg,
    BsImage,
    BsYoutube,
    BsChatSquareText
} from "react-icons/bs";
import { FaQuoteRight } from "react-icons/fa";

const PostEditor = ({ type = "news" }) => {
    const [teamName, setTeamName] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedTab, setSelectedTab] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const isNews = type === "news";

    const newsTabs = [
        "부상", "이적", "감독 교체", "재계약",
        "불화설", "은퇴", "인터뷰", "현지 팬 반응", "기타"
    ];

    const communityTabs = ["전체", "우리팀"];

    const handleTeamNameClear = () => {
        setTeamName("");
    };

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
        setShowDropdown(false);
    };

    return (
        <S.Container>
            {/* 대표 이미지 추가 */}
            <S.ImageUploadSection>
                <PiImageSquare size="0.93rem" color="#8F8F8F" />
                <S.ImageUploadText>대표 이미지 추가</S.ImageUploadText>
            </S.ImageUploadSection>

            {/* 팀명 검색창 및 탭 영역 */}
            <S.SearchAndTabSection>
                <S.TeamSearchInput>
                    <input
                        type="text"
                        placeholder="팀명 검색"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    {teamName && (
                        <S.ClearButton onClick={handleTeamNameClear}>
                            <IoClose size="0.83rem" color="#8F8F8F" />
                        </S.ClearButton>
                    )}
                </S.TeamSearchInput>

                {isNews ? (
                    <S.TabSectionWrapper>
                        <S.TabSelector onClick={() => setShowDropdown(!showDropdown)}>
                            <span>{selectedTab || "탭 선택"}</span>
                            <FaChevronDown size="0.83rem" color="#8F8F8F" />
                        </S.TabSelector>

                        {showDropdown && (
                            <S.NewsTabDropdown>
                                {newsTabs.map((tab) => (
                                    <S.TabOption key={tab} onClick={() => handleTabSelect(tab)}>
                                        {tab}
                                    </S.TabOption>
                                ))}
                            </S.NewsTabDropdown>
                        )}

                        <S.HelpIcon>
                            <FiHelpCircle size="0.83rem" color="#8F8F8F" />
                        </S.HelpIcon>
                    </S.TabSectionWrapper>
                ) : (
                    <S.TabSectionWrapper>
                        <S.CommunityTabSelector onClick={() => setShowDropdown(!showDropdown)}>
                            <span>{selectedTab || "전체"}</span>
                            <FaChevronDown size="0.83rem" color="#8F8F8F" />
                        </S.CommunityTabSelector>

                        {showDropdown && (
                            <S.CommunityTabDropdown>
                                {communityTabs.map((tab) => (
                                    <S.TabOption key={tab} onClick={() => handleTabSelect(tab)}>
                                        {tab}
                                    </S.TabOption>
                                ))}
                            </S.CommunityTabDropdown>
                        )}
                    </S.TabSectionWrapper>
                )}
            </S.SearchAndTabSection>

            {/* 제목 입력 */}
            <S.TitleInput
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* 글 작성 툴바 */}
            <S.EditorToolbar>
                <S.FormatDropdown>
                    <span>본문</span>
                    <FaChevronDown size="0.83rem" color="#8F8F8F" />
                </S.FormatDropdown>

                <S.Divider />

                <S.FormattingToolsContainer>
                    <FaBold size="0.925rem" color="#8C8C8C" />
                    <FaUnderline size="0.925rem" color="#8C8C8C" />
                    <FaItalic size="0.925rem" color="#8C8C8C" />
                    <FaAlignLeft size="0.925rem" color="#8C8C8C" />
                </S.FormattingToolsContainer>

                <S.Divider />

                <S.ToolIcon>
                    <FaQuoteRight size="0.925rem" color="#8C8C8C" />
                </S.ToolIcon>

                <S.ToolIcon>
                    <BsChatSquareText size="0.925rem" color="#8C8C8C" />
                </S.ToolIcon>

                <S.Divider />

                <S.ToolIcon>
                    <BsLink45Deg size="0.925rem" color="#8C8C8C" />
                </S.ToolIcon>

                <S.ToolIcon>
                    <BsImage size="0.925rem" color="#8C8C8C" />
                </S.ToolIcon>

                <S.ToolIcon>
                    <BsYoutube size="0.925rem" color="#8C8C8C" />
                </S.ToolIcon>
            </S.EditorToolbar>

            {/* 글 작성 영역 */}
            <S.ContentTextarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            {/* 버튼 영역 */}
            <S.ButtonContainer>
                <S.CancelButton>취소</S.CancelButton>
                <S.SubmitButton>작성완료</S.SubmitButton>
            </S.ButtonContainer>
        </S.Container>
    );
};

export default PostEditor;