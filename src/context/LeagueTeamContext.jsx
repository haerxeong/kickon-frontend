import React, { createContext, useState, useEffect } from "react";

export const LeagueTeamContext = createContext();

export const LeagueTeamProvider = ({ children }) => {
    const [selectedLeague, setSelectedLeague] = useState(undefined);
    const [selectedTeam, setSelectedTeam] = useState(undefined);

    // ✅ 세션 스토리지에서 초기값 불러오기
    useEffect(() => {
        const savedLeague = sessionStorage.getItem("selectedLeague");
        const savedTeam = sessionStorage.getItem("selectedTeam");

        if (savedLeague) setSelectedLeague(JSON.parse(savedLeague));
        else setSelectedLeague({ pk: null, nameKr: null });

        if (savedTeam) setSelectedTeam(JSON.parse(savedTeam));
        else setSelectedTeam({ pk: null, nameKr: null });
    }, []);

    // ✅ 값이 null일 경우에는 저장하지 않도록 조건 추가
    useEffect(() => {
        if (selectedLeague && selectedLeague.pk !== null) {
            sessionStorage.setItem("selectedLeague", JSON.stringify(selectedLeague));
        }
    }, [selectedLeague]);

    useEffect(() => {
        if (selectedTeam && selectedTeam.pk !== null) {
            sessionStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
        }
    }, [selectedTeam]);

    return (
        <LeagueTeamContext.Provider value={{
            selectedLeague,
            setSelectedLeague,
            selectedTeam,
            setSelectedTeam
        }}>
            {children}
        </LeagueTeamContext.Provider>
    );
};