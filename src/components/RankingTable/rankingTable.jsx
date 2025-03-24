// rankingTable.jsx
import React, { useState } from "react";
import sampleImage from "../../assets/sample_img.png";
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
                {rankings.map((item, index) => (
                    <TableRow key={index}>
                        <TableData>{item.rank}</TableData>
                        <TeamCell>
                            <TeamLogo src="../../assets/sample_img.png" alt={`${item.team} logo`} />
                            <TeamName>{item.team}</TeamName>
                        </TeamCell>
                        <TableData>{item.games}</TableData>
                        <TableData>{item.points}</TableData>
                        {type === "season" && <TableData>{item.goals}</TableData>}
                    </TableRow>
                ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default RankingTable;