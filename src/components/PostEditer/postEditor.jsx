import React, { useState, useRef, useEffect } from "react";
import * as S from "./postEditor.style";
import { PiImageSquare } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import "react-quill-new/dist/quill.snow.css";
import { uploadImageToS3 } from "../../utils/imageUpload";
import { getTeams } from "../../apis/domains/common/getTeams";
import axiosInstance from "../../apis/axios-instance.js";
import { useLeagueTeamStore } from '../../store/useLeagueTeamStore.js'
import { useNavigate } from "react-router-dom";
import newsCategoryMap  from "../../utils/newsCategoryMap.js";
import MyEditor from "./myEditor.jsx";
import { marked } from "marked";
import DOMPurify from "dompurify";

const PostEditor = ({ type = "news" }) => {
    const [teamName, setTeamName] = useState("");
    const [teamSuggestions, setTeamSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedTab, setSelectedTab] = useState("");
    const [price, setPrice] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploadedImagePreview, setUploadedImagePreview] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const fileInputRef = useRef(null);
    const teamSearchRef = useRef(null);
    const navigate = useNavigate();
    const categoryMap = newsCategoryMap;
    const [isTyping, setIsTyping] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const quillRef = useRef();

    const { selectedTeam, selectedLeague } = useLeagueTeamStore();

    const isNews = type === "news";
    const isMarkets = type === "market";
    const isCommunity = type === "community";

    const newsTabs = [
        "부상", "이적", "감독 교체", "재계약",
        "불화설", "은퇴", "인터뷰", "현지 팬 반응", "기타"
    ];

    const communityTabs = ["전체", selectedTeam?.nameKr || ""];

    const marketTabs = ["유니폼", "굿즈","축구화","응원용품","기타"];

    // 전화번호 포맷팅 함수
    const formatPhoneNumber = (value) => {
        // 숫자만 추출
        const numbers = value.replace(/\D/g, '');

        // 길이에 따라 포맷팅
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else if (numbers.length <= 11) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
        } else {
            // 11자리 초과시 자르기
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
        }
    };

    const handlePhoneNumberChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatPhoneNumber(inputValue);
        setPhoneNumber(formattedValue);
    };

    useEffect(() => {
        if (selectedTeam?.pk) {
            setSelectedTeamId(selectedTeam.pk);
        }
    }, [selectedTeam]);

    // Handle outside click to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (teamSearchRef.current && !teamSearchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Search for teams
    useEffect(() => {
        if (teamName.trim() === "") {
            setTeamSuggestions([]);
            setShowSuggestions(false); // 빈 문자열이면 닫기
            return;
        }

        const fetchTeams = async () => {
            try {
                // keyword가 있을 경우 league는 제외
                const queryParams = teamName
                    ? { keyword: teamName }
                    : { league: selectedLeague?.pk };

                const teams = await getTeams(queryParams);

                // Teams are directly in the response from getTeams
                if (Array.isArray(teams)) {
                    const formattedTeams = teams.map(team => ({
                        id: team.pk,
                        name: team.nameKr,
                        logoUrl: team.logoUrl,
                    }));

                    setTeamSuggestions(formattedTeams);
                    // 직접 타이핑한 경우에만 열기
                    if (isTyping) {
                        setShowSuggestions(true);
                    }
                } else {
                    setTeamSuggestions([]);
                }
            } catch (error) {
                console.error("Failed to fetch teams:", error);
                setTeamSuggestions([]);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchTeams();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [teamName, selectedLeague?.pk]);

    const handleTeamSelect = (team) => {
        setTeamName(team.name);
        setSelectedTeamId(team.id);
        setShowSuggestions(false);
        setIsTyping(false); // 직접 선택한 경우엔 false로 설정
    };

    const handleTeamNameClear = () => {
        setTeamName("");
        setSelectedTeamId(null);
    };

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
        setShowDropdown(false);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show preview immediately
        const previewUrl = URL.createObjectURL(file);
        setUploadedImagePreview(previewUrl);

        try {
            // Upload to S3
            const imageUrl = await uploadImageToS3(file);
            setUploadedImageUrl(imageUrl);
            alert('이미지가 성공적으로 업로드되었습니다!');
        } catch (error) {
            console.error(error);
            alert('이미지 업로드에 실패했습니다.');
            setUploadedImagePreview("");
        }
    };

    const handleRemoveImage = () => {
        setUploadedImagePreview("");
        setUploadedImageUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const getSanitizedHtml = (markdown) => {
        const rawHtml = marked.parse(markdown || "");
        return DOMPurify.sanitize(rawHtml);
    };

    const handleSubmit = async () => {
        if (!selectedTeamId && !(isCommunity && selectedTab === "전체")) {
            alert("팀을 선택해주세요.");
            return;
        }

        if (!title.trim() || !content.trim()) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        if (isNews && !selectedTab) {
            alert("카테고리를 설정해주세요.");
            return;
        }

        // 마켓 타입일 때 필수 필드 검증
        if (isMarkets) {
            if (!price.trim()) {
                alert("가격을 입력해주세요.");
                return;
            }
            if (!phoneNumber.trim()) {
                alert("전화번호를 입력해주세요.");
                return;
            }
            // 전화번호 형식 검증 (010-0000-0000)
            const phoneRegex = /^010-\d{4}-\d{4}$/;
            if (!phoneRegex.test(phoneNumber)) {
                alert("올바른 전화번호 형식을 입력해주세요. (010-0000-0000)");
                return;
            }
        }

        const endpoint = isNews
            ? "/api/news"
            : isMarkets
                ? "/api/usedProduct"
                : "/api/board";

        const sanitizedHtml = getSanitizedHtml(content);

        let payload = {};

        if (isMarkets) {
            payload = {
                productName: title.trim(),
                description: sanitizedHtml,
                price: parseInt(price.trim(), 10),
                phoneNumber: phoneNumber.trim(),
                profileImageUrl: uploadedImageUrl,
                category: selectedTab,
                teamPk: selectedTeamId,
            };
        } else if (isCommunity) {
            payload = {
                title: title.trim(),
                contents: content.trim(),
                category: categoryMap[selectedTab],
                ...(selectedTab !== "전체" && selectedTeamId && { team: selectedTeamId })  // 팀이 전체가 아닐 때만 포함
            };
        } else {
            payload = {
                team: selectedTeamId,
                title: title.trim(),
                contents: sanitizedHtml,
                category: categoryMap[selectedTab],
            };
        }

        if (isNews && uploadedImageUrl) {
            payload.thumbnailUrl = uploadedImageUrl;
        }

        try {
            await axiosInstance.post(endpoint, payload);
            alert("글 작성이 완료되었습니다.");
            if (type === "news") {
                navigate("/news");
            } else if (type === "market") {
                navigate("/market");
            } else {
                navigate("/community");
            }
        } catch (error) {
            console.error("Failed to submit post:", error);
            alert("Failed to submit post.");
        }
    };

    // const imageHandler = () => {
    //     const input = document.createElement("input");
    //     input.setAttribute("type", "file");
    //     input.setAttribute("accept", "image/*");
    //     input.click();
    //
    //     input.onchange = async () => {
    //         const file = input.files[0];
    //         if (!file) return;
    //
    //         try {
    //             const imageUrl = await uploadImageToS3(file);
    //             const quill = Quill.find(document.querySelector(".ql-editor")); // 현재 에디터 인스턴스
    //             const range = quill.getSelection(true);
    //
    //             quill.insertEmbed(range.index, "image", imageUrl);
    //             quill.setSelection(range.index + 1); // 커서 다음 줄로 이동
    //         } catch (error) {
    //             alert("이미지 업로드에 실패했습니다.");
    //         }
    //     };
    // };

    const handleCancel = () => {
        const confirmLeave = window.confirm("작성 중인 글이 사라집니다. 정말 나가시겠어요?");
        if (confirmLeave) {
            navigate(-1); // 이전 페이지로
        }
    };

    return (
        <S.Container>
            {!isCommunity && (
                <>
                    {/* 대표 이미지 업로드 섹션 */}
                    {!uploadedImagePreview ? (
                        <S.ImageUploadSection onClick={handleButtonClick}>
                            <PiImageSquare size="0.93rem" color="#8F8F8F" />
                            <S.ImageUploadText>
                                {isNews ? '대표 이미지 추가' : isMarkets ? '사진 업로드하기' : ''}
                            </S.ImageUploadText>
                        </S.ImageUploadSection>
                    ) : (
                        <S.ImagePreviewContainer>
                            <S.ImagePreview src={uploadedImagePreview} alt="Uploaded preview" />
                            <S.RemoveImageButton onClick={handleRemoveImage}>
                                <IoClose size="1rem" color="#fff" />
                            </S.RemoveImageButton>
                        </S.ImagePreviewContainer>
                    )}

                    {/* 숨겨진 파일 선택 input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />

                    {/* 팀명 검색창 및 탭 영역 */}
                    <S.SearchAndTabSection>
                        <S.TeamSearchWrapper ref={teamSearchRef}>
                            <S.TeamSearchInput>
                                <input
                                    type="text"
                                    placeholder="팀명 검색"
                                    value={teamName}
                                    onChange={(e) => {
                                        setTeamName(e.target.value);
                                        setIsTyping(true); // 사용자가 타이핑한 경우에만 true
                                    }}
                                    onFocus={() => {
                                        if (teamName && teamSuggestions.length > 0 && isTyping) {
                                            setShowSuggestions(true);
                                        }
                                    }}
                                />
                                {teamName && (
                                    <S.ClearButton onClick={handleTeamNameClear}>
                                        <IoClose size="0.83rem" color="#8F8F8F" />
                                    </S.ClearButton>
                                )}
                            </S.TeamSearchInput>

                            {showSuggestions && teamSuggestions.length > 0 && (
                                <S.SuggestionDropdown>
                                    {teamSuggestions.map((team) => (
                                        <S.SuggestionItem
                                            key={team.id}
                                            onClick={() => handleTeamSelect(team)}
                                        >
                                            {team.name}
                                        </S.SuggestionItem>
                                    ))}
                                </S.SuggestionDropdown>
                            )}
                        </S.TeamSearchWrapper>

                        <S.TabSectionWrapper>
                            <S.TabSelector onClick={() => setShowDropdown(!showDropdown)} selected={!!selectedTab}>
                                <span>{selectedTab || "탭 선택하기"}</span>
                                <FaChevronDown size="0.6rem" color="#8F8F8F" />
                            </S.TabSelector>

                            {showDropdown && (
                                <S.NewsTabDropdown>
                                    {isNews &&
                                        newsTabs.map((tab) => (
                                            <S.TabOption key={tab} onClick={() => handleTabSelect(tab)}>
                                                {tab}
                                            </S.TabOption>
                                        ))
                                    }
                                    {isMarkets &&
                                        marketTabs.map((tab) => (
                                            <S.TabOption key={tab} onClick={() => handleTabSelect(tab)}>
                                                {tab}
                                            </S.TabOption>
                                        ))
                                    }
                                </S.NewsTabDropdown>
                            )}
                            <S.HelpIcon>
                                <FiHelpCircle size="0.9rem" color="#8F8F8F" />
                            </S.HelpIcon>
                        </S.TabSectionWrapper>
                    </S.SearchAndTabSection>

                    {/* 마켓 전용 입력 필드들 - 별도 섹션으로 분리 */}
                    {isMarkets && (
                        <S.MarketFieldsSection>
                            <S.PriceInput
                                type="text"
                                placeholder="가격"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <S.PhoneInput
                                type="text"
                                placeholder="판매자 전화번호"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                maxLength={13}
                            />
                        </S.MarketFieldsSection>
                    )}
                </>
            )}

            {/* 커뮤니티 탭 선택 */}
            {isCommunity && (
                <S.TabSectionWrapper>
                    <S.CommunityTabSelector onClick={() => setShowDropdown(!showDropdown)} selected={!!selectedTab}>
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


            {/* 제목 입력 */}
            <S.TitleInput
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <S.QuillWrapper>
                <MyEditor
                    content={content}
                    setContent={setContent}
                    placeholder={
                        isMarkets
                            ? "허위 정보 작성, 불법 물품 거래 시 이용 제한 및 법적 처벌을 받을 수 있습니다."
                            : "내용을 입력하세요."
                    }
                />
            </S.QuillWrapper>

            {/* 버튼 영역 */}
            <S.ButtonContainer>
                <S.CancelButton onClick={handleCancel}>취소</S.CancelButton>
                <S.SubmitButton onClick={handleSubmit}>작성완료</S.SubmitButton>
            </S.ButtonContainer>
        </S.Container>
    );
};

export default PostEditor;