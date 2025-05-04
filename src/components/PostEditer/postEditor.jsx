import React, { useState, useRef, useEffect } from "react";
import * as S from "./postEditor.style";
import { PiImageSquare } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { uploadImageToS3 } from "../../utils/imageUpload";
import { getTeams } from "../../apis/domains/common/getTeams";
import axiosInstance from "../../apis/axios-instance.js";
import { useLeagueTeamStore } from '../../store/useLeagueTeamStore.js'
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import newsCategoryMap  from "../../utils/newsCategoryMap.js";

const PostEditor = ({ type = "news" }) => {
    const [teamName, setTeamName] = useState("");
    const [teamSuggestions, setTeamSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedTab, setSelectedTab] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploadedImagePreview, setUploadedImagePreview] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const fileInputRef = useRef(null);
    const teamSearchRef = useRef(null);
    const navigate = useNavigate();
    const categoryMap = newsCategoryMap;

    const { selectedTeam, selectedLeague } = useLeagueTeamStore();

    const isNews = type === "news";

    const newsTabs = [
        "부상", "이적", "감독 교체", "재계약",
        "불화설", "은퇴", "인터뷰", "현지 팬 반응", "기타"
    ];

    const communityTabs = ["전체", selectedTeam?.nameKr || ""];

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
                    setShowSuggestions(true);
                } else {
                    console.error("Unexpected team data format:", teams);
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

    const handleSubmit = async () => {
        if (!selectedTeamId) {
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

        const endpoint = isNews ? "/api/news" : "/api/board";

        // 기본 payload
        const payload = {
            team: selectedTeamId,
            title: title.trim(),
            contents: content.trim(),
            category: categoryMap[selectedTab],
        };

        // 썸네일이 있다면 추가
        if (isNews && uploadedImageUrl) {
            payload.thumbnailUrl = uploadedImageUrl;
        }

        try {
            await axiosInstance.post(endpoint, payload);
            alert("글 작성이 완료되었습니다.");
            navigate(type === "news" ? "/news" : "/community"); // Navigate after success
        } catch (error) {
            console.error("Failed to submit post:", error);
            alert("Failed to submit post.");
        }
    };

    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            try {
                const imageUrl = await uploadImageToS3(file);
                const quill = Quill.find(document.querySelector(".ql-editor")); // 현재 에디터 인스턴스
                const range = quill.getSelection(true);

                quill.insertEmbed(range.index, "image", imageUrl);
                quill.setSelection(range.index + 1); // 커서 다음 줄로 이동
            } catch (error) {
                alert("이미지 업로드에 실패했습니다.");
            }
        };
    };

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "link", "image", "video"],
                ["clean"]
            ],
            handlers: {
                image: imageHandler,
            }
        }
    };

    const formats = [
        "header",
        "bold", "italic", "underline",
        "list", "bullet",
        "blockquote",
        "link", "image", "video"
    ];

    return (
        <S.Container>
            {isNews && (
                <>
                    {/* 대표 이미지 업로드 섹션 */}
                    {!uploadedImagePreview ? (
                        <S.ImageUploadSection onClick={handleButtonClick}>
                            <PiImageSquare size="0.93rem" color="#8F8F8F" />
                            <S.ImageUploadText>대표 이미지 추가</S.ImageUploadText>
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
                                    onChange={(e) => setTeamName(e.target.value)}
                                    onFocus={() => {
                                        if (teamName && teamSuggestions.length > 0) {
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
                                    {newsTabs.map((tab) => (
                                        <S.TabOption key={tab} onClick={() => handleTabSelect(tab)}>
                                            {tab}
                                        </S.TabOption>
                                    ))}
                                </S.NewsTabDropdown>
                            )}

                            <S.HelpIcon>
                                <FiHelpCircle size="0.9rem" color="#8F8F8F" />
                            </S.HelpIcon>
                        </S.TabSectionWrapper>
                    </S.SearchAndTabSection>
                </>
            )}

            {/* 커뮤니티 탭 선택 */}
            {!isNews && (
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

            {/* 글 작성 영역 (ReactQuill 적용) */}
            <S.QuillWrapper>
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="내용을 입력하세요"
                />
            </S.QuillWrapper>

            {/* 버튼 영역 */}
            <S.ButtonContainer>
                <S.CancelButton>취소</S.CancelButton>
                <S.SubmitButton onClick={handleSubmit}>작성완료</S.SubmitButton>
            </S.ButtonContainer>
        </S.Container>
    );
};

export default PostEditor;