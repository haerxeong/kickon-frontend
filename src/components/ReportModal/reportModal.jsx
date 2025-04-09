import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeReportModal } from "../../features/modal/modalSlice";
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
    const isReportModalOpen = useSelector((state) => state.reportModal.isReportModalOpen);
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

    const handleOptionChange = (optionId) => {
        setSelectedOption(optionId);

        // Clear other text if switching from "other" to another option
        if (optionId !== "other") {
            setOtherText("");
        }
    };

    const handleSubmit = () => {
        // Handle submission logic here
        const reportData = {
            reason: selectedOption,
            details: selectedOption === "other" ? otherText : null
        };

        console.log("Report submitted:", reportData);
        dispatch(closeReportModal());
    };

    if (!isReportModalOpen) return null;

    return (
        <ModalOverlay onClick={() => dispatch(closeReportModal())}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ReportTitle>게시글 신고</ReportTitle>
                <CloseButton onClick={() => dispatch(closeReportModal())} />

                <ReportForm>
                    <CheckboxContainer>
                        {reportReasons.map((reason) => (
                            <CheckboxLabel key={reason.id}>
                                <CheckboxInput
                                    type="checkbox"
                                    checked={selectedOption === reason.id}
                                    onChange={() => handleOptionChange(reason.id)}
                                />
                                {reason.label}
                            </CheckboxLabel>
                        ))}

                        {selectedOption === "other" && (
                            <OtherInput
                                placeholder="사유를 작성해주세요"
                                value={otherText}
                                onChange={(e) => setOtherText(e.target.value)}
                            />
                        )}
                    </CheckboxContainer>

                    <SubmitButton
                        active={isSubmitActive}
                        disabled={!isSubmitActive}
                        onClick={isSubmitActive ? handleSubmit : undefined}
                    >
                        신고하기
                    </SubmitButton>
                </ReportForm>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default ReportModal;