import React, {useEffect, useState} from "react";
import { IoIosArrowDown } from "react-icons/io";
import * as S from "./leagueDropdown.style.js";
import {getLeagues} from "../../apis/domains/common/getLeagues.js";

const LeagueDropdown = ({selectedLeague, setSelectedLeague, activeTab}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [leagues, setLeagues] = useState([]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLeagueSelect = (league) => {
        setSelectedLeague(league); // 전체 리그 객체 저장
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const data = await getLeagues();
                setLeagues(data);
            } catch (error) {
                console.error("Failed to fetch leagues:", error);
            }
        };

        fetchLeagues();
    }, []);

    return (
        <S.DropdownContainer>
            <S.TabSelector
                onClick={toggleDropdown}
                isActive={selectedLeague?.nameKr === activeTab} // 👈 드롭다운도 현재 탭인지 체크!
            >
                <span>{selectedLeague?.nameKr || "리그 선택"}</span>
                <IoIosArrowDown size="0.7rem" color="#8F8F8F" />
            </S.TabSelector>

            {isDropdownOpen && (
                <S.DropdownMenu>
                    {leagues.map(league => (
                        <S.TabOption key={league.pk} onClick={() => handleLeagueSelect(league)}>
                            <S.LeagueImage src={league.logoUrl} alt={league.nameKr} />
                            <S.LeagueName>{league.nameKr}</S.LeagueName>
                        </S.TabOption>
                    ))}
                </S.DropdownMenu>
            )}
        </S.DropdownContainer>
    );
};

export default LeagueDropdown;