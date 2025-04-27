import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeReportModal } from "../../features/modal/modalSlice";
import { reportBoard, reportNews } from "../../apis/domains/report/report";
import {
    ModalOverlay,
    ModalContainer,
    CloseButton,
    ReportTitle,
    CheckboxContainer,
    CheckboxLabel,
    CheckboxInput,
    OtherInput,
    SubmitButton,
    ReportForm
} from "./reportModal.style.js";

const ReportModal = () => {
    const { isReportModalOpen, reportType, contentId } = useSelector((state) => state.reportModal);
    const dispatch = useDispatch();

    // Options for reporting
    const reportReasons = [
        { id: "inappropriate", label: "허위사실이에요." },
        { id: "violence", label: "비방 및 욕설 표현을 사용했어요." },
        { id: "sexual", label: "선정성 게시글이에요." },
        { id: "spam", label: "스팸 홍보/도배글이에요." },
        { id: "privacy", label: "개인정보가 노출되었어요." },
        { id: "copyright", label: "저작권 및 법적인 문제이에요." },
        { id: "other", label: "기타" }
    ];

    // Single selected option instead of multiple
    const [selectedOption, setSelectedOption] = useState(null);
    const [otherText, setOtherText] = useState("");
    const [isSubmitActive, setIsSubmitActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const otherInputRef = useRef(null);

    useEffect(() => {
        // Button is active if any non-other option is selected OR if other is selected with text
        if (!selectedOption) {
            setIsSubmitActive(false);
        } else if (selectedOption === "other") {
            setIsSubmitActive(otherText.trim().length > 0);
        } else {
            setIsSubmitActive(true);
        }
    }, [selectedOption, otherText]);

    const handleOtherTextChange = (e) => {
        const value = e.target.value;
        setOtherText(value);

        if (otherInputRef.current) {
            otherInputRef.current.style.height = "auto"; // 초기화
            otherInputRef.current.style.height = `${otherInputRef.current.scrollHeight}px`; // 내용만큼 높이 조절
        }
    };

    const handleOptionChange = (optionId) => {
        setSelectedOption(optionId);

        // Clear other text if switching from "other" to another option
        if (optionId !== "other") {
            setOtherText("");
        }
    };

    const handleSubmit = async () => {
        if (!isSubmitActive || isSubmitting) return;
        
        setIsSubmitting(true);
        
        try {
          // 신고 내용 준비
          const reason = selectedOption === "other" ? otherText : selectedOption;
          
          // 신고 타입에 따라 API 호출
          let response;
          if (reportType === 'board') {
            response = await reportBoard(contentId, reason);
          } else if (reportType === 'news') {
            response = await reportNews(contentId, reason);
          }
          
          // 응답 코드에 따라 다른 메시지 표시
          if (response && response.code === "GET_SUCCESS") {
            alert("신고가 접수되었습니다.");
            dispatch(closeReportModal());
          } else {
            // 실패 메시지 표시 (응답의 message 필드 사용)
            const errorMessage = response?.message || "신고 처리 중 오류가 발생했습니다.";
            alert(errorMessage);
          }
        } catch (error) {
          console.error("신고 처리 중 오류 발생:", error);
          
          // 오류 응답에서 메시지 추출 시도
          const errorMessage = error.response?.data?.message || "신고 처리 중 오류가 발생했습니다. 다시 시도해주세요.";
          alert(errorMessage);
        } finally {
          setIsSubmitting(false);
        }
      };

    if (!isReportModalOpen) return null;

    return (
        <ModalOverlay onClick={() => dispatch(closeReportModal())}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ReportTitle>
              {reportType === 'news' ? '뉴스 신고' : '게시글 신고'}
            </ReportTitle>
            <CloseButton onClick={() => dispatch(closeReportModal())} />
            <ReportForm>
              <CheckboxContainer>
                {reportReasons.map((reason) => (
                  <CheckboxLabel key={reason.id}>
                    <CheckboxInput
                      type="radio"
                      name="reportReason"
                      checked={selectedOption === reason.id}
                      onChange={() => handleOptionChange(reason.id)}
                    />
                    {reason.label}
                  </CheckboxLabel>
                ))}
              </CheckboxContainer>
              
              {selectedOption === "other" && (
                <OtherInput
                  ref={otherInputRef}
                  value={otherText}
                  onChange={handleOtherTextChange}
                  placeholder="신고 사유를 직접 입력해주세요."
                />
              )}
              
              <SubmitButton 
                active={isSubmitActive} 
                onClick={handleSubmit}
                disabled={!isSubmitActive || isSubmitting}
              >
                {isSubmitting ? "처리 중..." : "신고하기"}
              </SubmitButton>
            </ReportForm>
          </ModalContainer>
        </ModalOverlay>
      );
    };
    
    export default ReportModal;