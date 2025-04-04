import React, { useState } from "react";
import {
    TableContainer,
    Table,
    TableHeader,
    TableRow,
    TableData,
    Title,
    Divider,
    LeagueSelector,
    DropdownArrow,
    TeamCell,
    TeamLogo,
    TeamName,
    HeaderRow
} from "./rankingTable.style";

const RankingTable = ({ title, rankings, type = "season" }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <TableContainer>
            <Title>{title}</Title>
            <Divider />
            <LeagueSelector onClick={toggleDropdown}>
                K리그 1 <DropdownArrow isOpen={isOpen}>▼</DropdownArrow>
            </LeagueSelector>
            <Divider />

            <Table>
                <thead>
                <HeaderRow>
                    <TableHeader align="left">순위</TableHeader>
                    <TableHeader align="center"></TableHeader>
                    {type === "season" ? (
                        <>
                            <TableHeader align="center">경기</TableHeader>
                            <TableHeader align="center">승점</TableHeader>
                            <TableHeader align="center">득점</TableHeader>
                        </>
                    ) : (
                        <>
                            <TableHeader align="center">경기</TableHeader>
                            <TableHeader align="center">점수</TableHeader>
                        </>
                    )}
                </HeaderRow>
                </thead>
                <tbody>
                {rankings.slice(0, 10).map((item, index) => (
                    <TableRow key={index}>
                        <TableData>{item.rankOrder}</TableData>
                        <TeamCell>
                            <TeamLogo src={item.teamLogoUrl} alt={`${item.teamName} logo`} />
                            <TeamName>{item.teamName}</TeamName>
                        </TeamCell>
                        <TableData>{item.gameNum}</TableData>
                        <TableData>{item.points}</TableData>
                        {type === "season" && <TableData>{item.wonScores}</TableData>}
                    </TableRow>
                ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default RankingTable;