import styled from "styled-components";

export const CommentInputBox = styled.div`
    display: flex;
    width: 95%;
    max-width: 100%;
    padding: 0.8rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    border-radius: 0.625rem;
    background: #f0f0f0;
    color: black;
    margin: 0 auto 3.32rem auto;
    box-sizing: border-box;
`;

export const CommentInputLabel = styled.div`
    font-size: 0.628rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
`;

export const CommentInputContainer = styled.div`
    display: flex;
    width: 100%;
    border: 0.0625rem solid #ddd;
    border-radius: 0.5rem;
    background: #fff;
    align-items: flex-start;
    overflow: hidden;
    box-sizing: border-box;
`;

export const CommentInput = styled.textarea`
    width: 100%;
    flex: 1;
    border: none;
    padding: 0.875rem;
    font-size: 0.583rem;
    background: transparent;
    min-height: 4rem;
    max-height: 10rem;
    overflow-y: auto;
    resize: none;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }
`;

export const SubmitButton = styled.button`
    background: var(--Primary-primary_900, #C00C0B);
    color: white;
    border: none;
    height: 4rem;
    font-size: 0.85rem;
    padding: 0 1.125rem;
    cursor: pointer;
    font-weight: 500;
    white-space: nowrap;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const CommentsSection = styled.div`
`;

export const CommentsSectionTitle = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 0.628rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem;
    padding: 0.45rem 1rem;
    border-top: 0.0625rem solid #eee;
    border-bottom: 0.0625rem solid #eee;
`;

export const CommentItem = styled.div`
    border-bottom: 0.0625rem solid #eee;
`;

export const CommentHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.375rem;
    padding: 0.75rem 1rem 0 1rem;
`;

export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 0.1rem;
`;

export const CommentLikes = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    font-size: 0.75rem;
    color: ${(props) => (props.active ? "#000" : "#888")};
    cursor: pointer;
    padding: 0 1rem;
`;

export const CommentContent = styled.div`
    font-size: 0.628rem;
    margin-left: 1.875rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
    color: #000;
    padding: 0 1rem;
`;

export const CommentActions = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
    margin-left: 1.875rem;
    padding: 0 1rem;
    margin-bottom: 0.5rem;
`;

export const ReplyButton = styled.button`
    display: flex;
    height: 1.077rem;
    padding: 0.25rem 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.448rem;
    border: none;

    color: ${(props) =>
            props.isActive
                    ? "var(--Black-black_100, #F8F8F8)"
                    : "var(--Black-black_700, #676767)"};
    font-family: Pretendard;
    font-size: 0.538rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;

    border-radius: 0.25rem;
    background: ${(props) =>
            props.isActive
                    ? "var(--Black-black_500, #AFAFAF)"
                    : "var(--Black-black_200, #F0F0F0)"};
    cursor: pointer;
`;

export const MoreButton = styled.button`
    background: none;
    border: none;
    font-size: 0.75rem;
    color: #888;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    color: var(--Black-black_700, #676767);
    font-family: Pretendard;
    font-size: 0.538rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
`;

export const ReplyInputWrapper = styled.div`
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border: 0.0625rem solid #ddd;
    border-radius: 0.5rem;
    background: #fff;
    align-items: flex-start;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
`;

export const EditableReplyInput = styled.div`
    flex: 1;
    border: none;
    padding: 0.625rem;
    font-size: 0.583rem;
    background: var(--Black-black_100, #f8f8f8);
    min-height: 2.5rem;
    max-height: 5rem;
    overflow-y: auto;
    line-height: 1.4;
    color: #000;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }

    &:empty:before {
        content: "답글을 입력하세요...";
        color: #888;
        pointer-events: none;
    }

    span[style*="color: #C00C0B"] {
        color: #C00C0B !important;
        font-weight: 500;
    }

    * {
        color: #000;
    }

    span[style*="color: #C00C0B"],
    span[style*="color:#C00C0B"] {
        color: #C00C0B !important;
        font-weight: 500 !important;
    }
`;

export const ReplySubmitButton = styled.button`
    background: var(--Primary-primary_900, #C00C0B);
    color: white;
    border: none;
    font-size: 0.75rem;
    padding: 0 0.875rem;
    cursor: pointer;
    font-weight: 500;
    white-space: nowrap;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const RepliesContainer = styled.div``;

export const ReplyItem = styled.div`
    padding: 1rem 1rem 1rem 2.875rem;
    border-bottom: 0.0625rem solid #eee;

    &:first-of-type {
        border-top: 0.0625rem solid #eee;
    }

    &:last-of-type {
        border-bottom: none;
    }
`;

export const ReplyHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
`;

export const ReplyContent = styled.div`
    font-size: 0.628rem;
    margin-left: 1.625rem;
    line-height: 1.4;
    color: #000;
    margin-bottom: 0.25rem;
`;

export const ReplyLikes = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    font-size: 0.75rem;
    color: ${(props) => (props.active ? "#000" : "#888")};
    cursor: pointer;
    padding: 0 1rem;
`;

export const ReplyHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.375rem;
`;

export const ReplyActions = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
    margin-left: 1.625rem;
`;

export const ReplyActionButton = styled.button`
    display: flex;
    height: 1.077rem;
    padding: 0.25rem 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.448rem;
    border: none;

    color: ${(props) =>
            props.isActive
                    ? "var(--Black-black_100, #F8F8F8)"
                    : "var(--Black-black_700, #676767)"};
    font-family: Pretendard;
    font-size: 0.538rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;

    border-radius: 0.25rem;
    background: ${(props) =>
            props.isActive
                    ? "var(--Black-black_500, #AFAFAF)"
                    : "var(--Black-black_200, #F0F0F0)"};
    cursor: pointer;
`;