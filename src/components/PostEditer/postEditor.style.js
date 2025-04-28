import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 31rem;
    padding: 1.4rem 0.74rem 4.625rem 0.74rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.39rem;
    border-radius: 0.46rem;
    border: 1px solid #dcdcdc;
    background: #fff;
`;

export const ImageUploadSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    cursor: pointer;
`;

export const ImageUploadText = styled.span`
    color: #8F8F8F;
    font-size: 0.65rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.75rem;
`;

export const SearchAndTabSection = styled.div`
    display: flex;
    width: 100%;
    gap: 0.7rem;
    align-items: center;
`;

export const TeamSearchInput = styled.div`
    display: flex;
    width: 13.13rem;
    //height: 1.166rem;
    padding: 0.416rem 0.74rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.462rem;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #fff;
    position: relative;

    input {
        width: 100%;
        border: none;
        outline: none;
        font-size: 0.65rem;
    }
`;

export const ClearButton = styled.button`
    position: absolute;
    right: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
`;

export const TabSectionWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const TabSelector = styled.div`
    display: flex;
    width: 6.75rem;
    padding: 0.416rem 0.74rem;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    font-size: 0.65rem;
    cursor: pointer;

    span {
        color: ${props => (props.selected ? "#000" : "#8F8F8F")};
    }
`;

export const NewsTabDropdown = styled.div`
    position: absolute;
    width: 6.75rem;
    top: 100%;
    left: 0;
    display: flex;
    padding: 0.462rem 0.74rem;
    align-items: flex-start;
    gap: 0.462rem;
    align-self: stretch;
    flex-direction: column;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    z-index: 10;
    margin-top: 0.185rem;
`;

export const CommunityTabSelector = styled.div`
    display: flex;
    width: 6.75rem;
    padding: 0.416rem 0.7rem;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.48rem;
    align-self: stretch;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    font-size: 0.65rem;
    cursor: pointer;

    span {
        color: ${props => (props.selected ? "#000" : "#8F8F8F")};
    }
`;

export const CommunityTabDropdown = styled.div`
    position: absolute;
    //width: 6.75rem;
    width: auto;
    top: 100%;
    left: 0;
    display: flex;
    padding: 0.462rem 3.2rem 0.462rem 0.7rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.92rem;
    align-self: stretch;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    z-index: 10;
    margin-top: 0.185rem;
`;

export const TabOption = styled.div`
    color: #000;
    font-size: 0.65rem;
    padding: 0.1rem 0;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const HelpIcon = styled.div`
    margin-left: 1.2rem;
    cursor: pointer;
`;

export const TitleInput = styled.input`
    display: flex;
    height: 2.6rem;
    padding: 0.7rem 0.74rem;
    align-items: center;
    gap: 0.462rem;
    align-self: stretch;
    border-radius: 0.37rem;
    border: 1px solid #DCDCDC;
    background: #FFF;
    width: 100%;
    outline: none;
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.2rem;
    font-style: normal;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.7rem;
    width: 100%;
`;

export const CancelButton = styled.button`
    display: flex;
    width: 7.585rem;
    height: 2rem;
    padding: 0.37rem 0.7rem;
    justify-content: center;
    align-items: center;
    gap: 0.462rem;
    border-radius: 0.37rem;
    background: #F0F0F0;
    color: #676767;
    border: none;
    cursor: pointer;
    font-size: 0.7rem;
    font-weight: 500;
`;

export const SubmitButton = styled.button`
    display: flex;
    width: 7.585rem;
    height: 2rem;
    padding: 0.37rem 0.7rem;
    justify-content: center;
    align-items: center;
    gap: 0.462rem;
    border-radius: 0.37rem;
    background: #C00C0B;
    color: #FFF;
    border: none;
    cursor: pointer;
    font-size: 0.7rem;
    font-weight: 500;
`;

export const QuillWrapper = styled.div`
    margin-bottom: 24px;

    .quill {
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #dcdcdc;
    }

    .ql-toolbar {
        border: none !important;
        border-bottom: 1px solid #dcdcdc !important;
        background-color: #f9f9f9;
        padding: 8px !important;

        .ql-formats {
            margin-right: 12px !important;
        }

        button {
            height: 28px;
            width: 28px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background-color: #e9e9e9;
            }

            &.ql-active {
                background-color: #e0e0e0;
            }
        }
    }

    .ql-container {
        border: none !important;
        font-family: inherit;
        font-size: 1rem;
        min-height: 250px;
    }

    .ql-editor {
        min-height: 250px;
        line-height: 1.6;
        padding: 16px !important;

        &.ql-blank::before {
            font-style: normal;
            color: #8f8f8f;
            font-size: 0.95rem;
        }
    }
`;

export const TeamSearchWrapper = styled.div`
  position: relative;
  min-width: 0;
`;

// export const TeamSearchInput = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: #f9f9f9;
//   border: 1px solid #dcdcdc;
//   border-radius: 4px;
//   padding: 0 8px;
//
//   input {
//     flex: 1;
//     min-width: 0;
//     height: 36px;
//     border: none;
//     background: transparent;
//     font-size: 0.87rem;
//     color: #333;
//     outline: none;
//     padding: 0 4px;
//
//     &::placeholder {
//       color: #8f8f8f;
//     }
//   }
// `;

export const SuggestionDropdown = styled.div`
  width: 13rem;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #dcdcdc;
  border-radius: 0.37rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 0.185rem;
`;

export const SuggestionItem = styled.div`
    padding: 0.416rem 0.74rem;
    font-size: 0.65rem;
    color: #333;
    cursor: pointer;
    transition: background-color 0.2s;
    
    //padding: 10px 16px;
    //font-size: 0.87rem;
    //color: #333;
    //cursor: pointer;
    //transition: background-color 0.2s;
    //
    //display: flex;
    //width: 6.75rem;
    //padding: 0.416rem 0.74rem;
    //justify-content: space-between;
    //align-items: flex-start;
    //gap: 1.48rem;
    //align-self: stretch;
    //border-radius: 0.37rem;
    //border: 1px solid #DCDCDC;
    //background: #FFF;
    //font-size: 0.65rem;
    //cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
  }
`;
