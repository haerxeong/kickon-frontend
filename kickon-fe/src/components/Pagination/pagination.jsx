import React from "react";
import {NavButton, PageButton, PaginationWrapper} from "./pagination.style.js";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination = ({ activePage, setActivePage, totalPages }) => {
    return (
        <PaginationWrapper>
            <NavButton onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}>
                <GrFormPrevious/> 이전
            </NavButton>
            {Array.from({ length: totalPages }, (_, i) => (
                <PageButton
                    key={i + 1}
                    active={activePage === i + 1}
                    onClick={() => setActivePage(i + 1)}
                >
                    {i + 1}
                </PageButton>
            ))}
            <NavButton onClick={() => setActivePage(prev => Math.min(prev + 1, totalPages))}>
                다음 <GrFormNext/>
            </NavButton>
        </PaginationWrapper>
    )
}

export default Pagination;