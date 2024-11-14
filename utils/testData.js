class TestDataGenerator {
    static getTestMatches() {
        return [
            {
                homeTeam: 'Kaizer Chiefs',
                awayTeam: 'Orlando Pirates',
                time: '15:00',
                odds: {
                    hollywoodbets: 2.1,
                    betway: 2.2,
                    supabets: 2.0
                }
            },
            // Add more test matches
        ];
    }

    static getTestHorseRaces() {
        return [
            {
                race: 'Durban July Test',
                time: '14:00',
                horses: [
                    { name: 'Thunder Strike', odds: 4.5 },
                    { name: 'Lucky Star', odds: 3.2 }
                ]
            }
        ];
    }
}

module.exports = TestDataGenerator; 