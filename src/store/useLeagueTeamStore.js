// useLeagueTeamStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLeagueTeamStore = create(
    persist(
        (set) => ({
            // ✅ 초기값 설정
            selectedLeague: { pk: null, nameKr: null },
            selectedTeam: { pk: null, nameKr: null },

            // ✅ 업데이트 함수
            setSelectedLeague: (league) => set({ selectedLeague: league }),
            setSelectedTeam: (team) => set({ selectedTeam: team }),

            // ✅ 상태 리셋 함수 (옵션)
            reset: () => set({
                selectedLeague: { pk: null, nameKr: null },
                selectedTeam: { pk: null, nameKr: null }
            })
        }),
        {
            name: 'leagueTeamStorage', // 세션 스토리지 키
            storage: {
                getItem: (name) => JSON.parse(sessionStorage.getItem(name)),
                setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => sessionStorage.removeItem(name),
            }
        }
    )
);
