declare namespace Spatie.LaravelTypeScriptTransformer.Tests.Fixtures.Enums {
    export type PersonType = "actor" | "director" | "both";
}
declare namespace Spatie.LaravelTypeScriptTransformer.Tests.Fixtures.Models {
    export type Award = {
        id: number;
        name: string;
        category: string;
        year: number;
        awardable_type: string;
        awardable_id: number;
        created_at: string | null;
        updated_at: string | null;
        awardable: any;
    };
    export type Casting = {
        id: number;
        movie_id: number;
        person_id: number;
        character_name: string;
        billing_order: number | null;
        salary: string | null;
        contract_details: any[] | null;
        created_at: string | null;
        updated_at: string | null;
        movie: Movie;
        person: Person;
    };
    export type Movie = {
        id: number;
        title: string;
        plot: string | null;
        rating: number | null;
        metadata: any[] | null;
        box_office: number | null;
        runtime: number | null;
        release_date: string | null;
        premiered_at: string | null;
        is_released: boolean;
        director_id: number | null;
        created_at: string | null;
        updated_at: string | null;
        director: Person | null;
        cast: Array<Person & { pivot: Casting }>;
        awards: any[];
    };
    export type Person = {
        id: number;
        name: string;
        biography: string | null;
        type: string;
        awards_received: any[] | null;
        net_worth: string | null;
        date_of_birth: string | null;
        mentor_id: number | null;
        created_at: string | null;
        updated_at: string | null;
        movies: Array<Movie & { casting: Casting }>;
        directedMovies: Movie[];
        mentor: Person | null;
        apprentices: Person[];
        awards: any[];
    };
}

const people: Array<Spatie.LaravelTypeScriptTransformer.Tests.Fixtures.Models.Person> =
    [
        {
            id: 1,
            name: "Eleanor Vance",
            biography:
                "A highly acclaimed veteran director, known for her visually stunning epics. She occasionally takes on mentorship roles.",
            type: "director",
            awards_received: "[]",
            net_worth: "75000000.00",
            date_of_birth: "1965-03-15T00:00:00.000000Z",
            mentor_id: null,
            created_at: "2025-01-01T00:00:00.000000Z",
            updated_at: "2025-01-01T00:00:00.000000Z",
            movies: [],
            directed_movies: [
                {
                    id: 1,
                    title: "Nebula's Dawn",
                    plot: "A sweeping sci-fi saga about colonizing a distant galaxy.",
                    rating: 7,
                    metadata:
                        '{"world_building":"extensive","cgi_budget":50000000,"themes":["exploration","survival","humanity"]}',
                    box_office: 450000000.5,
                    runtime: 155.5,
                    release_date: "2023-05-19T00:00:00.000000Z",
                    premiered_at: "2023-05-15T19:00:00.000000Z",
                    is_released: true,
                    director_id: 1,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    awards: [
                        {
                            id: 1,
                            name: "Galaxy Award",
                            category: "Best Visuals",
                            year: 2023,
                            awardable_type:
                                "Spatie\\LaravelTypeScriptTransformer\\Tests\\Fixtures\\Models\\Movie",
                            awardable_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                        },
                    ],
                    cast: [
                        {
                            id: 2,
                            name: "Marcus Bellweather",
                            biography:
                                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                            type: "actor",
                            awards_received:
                                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                            net_worth: "25000000.00",
                            date_of_birth: "1988-11-20T00:00:00.000000Z",
                            mentor_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 1,
                                person_id: 2,
                            },
                            awards: [],
                        },
                        {
                            id: 3,
                            name: "Chloe Dubois",
                            biography:
                                "A rising star, known for intense dramatic performances. She recently directed her first short film and is working on her feature debut.",
                            type: "both",
                            awards_received: "[]",
                            net_worth: "8000000.00",
                            date_of_birth: "1995-07-01T00:00:00.000000Z",
                            mentor_id: null,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 1,
                                person_id: 3,
                            },
                            awards: [],
                        },
                    ],
                },
            ],
            awards: [
                {
                    id: 2,
                    name: "Golden Lion Award",
                    category: "Lifetime Achievement",
                    year: 2024,
                    awardable_type:
                        "Spatie\\LaravelTypeScriptTransformer\\Tests\\Fixtures\\Models\\Person",
                    awardable_id: 1,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    awardable: {
                        id: 1,
                        name: "Eleanor Vance",
                        biography:
                            "A highly acclaimed veteran director, known for her visually stunning epics. She occasionally takes on mentorship roles.",
                        type: "director",
                        awards_received: "[]",
                        net_worth: "75000000.00",
                        date_of_birth: "1965-03-15T00:00:00.000000Z",
                        mentor_id: null,
                        created_at: "2025-01-01T00:00:00.000000Z",
                        updated_at: "2025-01-01T00:00:00.000000Z",
                    },
                },
            ],
            mentor: null,
            apprentices: [
                {
                    id: 2,
                    name: "Marcus Bellweather",
                    biography:
                        "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                    type: "actor",
                    awards_received:
                        '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                    net_worth: "25000000.00",
                    date_of_birth: "1988-11-20T00:00:00.000000Z",
                    mentor_id: 1,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    directed_movies: [],
                    awards: [],
                },
            ],
        },
        {
            id: 2,
            name: "Marcus Bellweather",
            biography:
                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
            type: "actor",
            awards_received:
                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
            net_worth: "25000000.00",
            date_of_birth: "1988-11-20T00:00:00.000000Z",
            mentor_id: 1,
            created_at: "2025-01-01T00:00:00.000000Z",
            updated_at: "2025-01-01T00:00:00.000000Z",
            movies: [
                {
                    id: 1,
                    title: "Nebula's Dawn",
                    plot: "A sweeping sci-fi saga about colonizing a distant galaxy.",
                    rating: 7,
                    metadata:
                        '{"world_building":"extensive","cgi_budget":50000000,"themes":["exploration","survival","humanity"]}',
                    box_office: 450000000.5,
                    runtime: 155.5,
                    release_date: "2023-05-19T00:00:00.000000Z",
                    premiered_at: "2023-05-15T19:00:00.000000Z",
                    is_released: true,
                    director_id: 1,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    casting: {
                        person_id: 2,
                        movie_id: 1,
                        character_name: "Commander Jax",
                        billing_order: 1,
                        salary: "5000000.00",
                        contract_details: null,
                    },
                    awards: [
                        {
                            id: 1,
                            name: "Galaxy Award",
                            category: "Best Visuals",
                            year: 2023,
                            awardable_type:
                                "Spatie\\LaravelTypeScriptTransformer\\Tests\\Fixtures\\Models\\Movie",
                            awardable_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                        },
                    ],
                    director: {
                        id: 1,
                        name: "Eleanor Vance",
                        biography:
                            "A highly acclaimed veteran director, known for her visually stunning epics. She occasionally takes on mentorship roles.",
                        type: "director",
                        awards_received: "[]",
                        net_worth: "75000000.00",
                        date_of_birth: "1965-03-15T00:00:00.000000Z",
                        mentor_id: null,
                        created_at: "2025-01-01T00:00:00.000000Z",
                        updated_at: "2025-01-01T00:00:00.000000Z",
                    },
                    cast: [
                        {
                            id: 2,
                            name: "Marcus Bellweather",
                            biography:
                                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                            type: "actor",
                            awards_received:
                                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                            net_worth: "25000000.00",
                            date_of_birth: "1988-11-20T00:00:00.000000Z",
                            mentor_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 1,
                                person_id: 2,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                        {
                            id: 3,
                            name: "Chloe Dubois",
                            biography:
                                "A rising star, known for intense dramatic performances. She recently directed her first short film and is working on her feature debut.",
                            type: "both",
                            awards_received: "[]",
                            net_worth: "8000000.00",
                            date_of_birth: "1995-07-01T00:00:00.000000Z",
                            mentor_id: null,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 1,
                                person_id: 3,
                            },
                            awards: [],
                            directed_movies: [
                                {
                                    id: 3,
                                    title: "Echoes in the Static",
                                    plot: "A psychological thriller about a radio host who intercepts a strange signal.",
                                    rating: null,
                                    metadata:
                                        '{"genre_tags":["thriller","mystery","psychological"]}',
                                    box_office: null,
                                    runtime: null,
                                    release_date: "2025-10-31T00:00:00.000000Z",
                                    premiered_at: null,
                                    is_released: false,
                                    director_id: 3,
                                    created_at: "2025-01-01T00:00:00.000000Z",
                                    updated_at: "2025-01-01T00:00:00.000000Z",
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    title: "Crimson Alley",
                    plot: "A gritty neo-noir thriller set in a rain-soaked metropolis.",
                    rating: 8,
                    metadata: '{"style":"neo-noir","setting":"urban dystopia"}',
                    box_office: 85000000,
                    runtime: 118,
                    release_date: "2024-01-12T00:00:00.000000Z",
                    premiered_at: "2024-01-10T20:00:00.000000Z",
                    is_released: true,
                    director_id: 5,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    casting: {
                        person_id: 2,
                        movie_id: 2,
                        character_name: "Detective Miles Corbin",
                        billing_order: 1,
                        salary: "3000000.00",
                        contract_details: {
                            sequel_option: true,
                            stunt_double_required: false,
                        },
                    },
                    awards: [],
                    director: {
                        id: 5,
                        name: "Alex Schmidt",
                        biography: null,
                        type: "director",
                        awards_received: null,
                        net_worth: null,
                        date_of_birth: "1972-09-05T00:00:00.000000Z",
                        mentor_id: null,
                        created_at: "2025-01-01T00:00:00.000000Z",
                        updated_at: "2025-01-01T00:00:00.000000Z",
                    },
                    cast: [
                        {
                            id: 2,
                            name: "Marcus Bellweather",
                            biography:
                                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                            type: "actor",
                            awards_received:
                                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                            net_worth: "25000000.00",
                            date_of_birth: "1988-11-20T00:00:00.000000Z",
                            mentor_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 2,
                                person_id: 2,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                        {
                            id: 4,
                            name: 'Sam "The Rocket" Riley',
                            biography:
                                "A charismatic action star, famous for performing his own stunts.",
                            type: "actor",
                            awards_received: "[]",
                            net_worth: "35000000.00",
                            date_of_birth: "1985-01-10T00:00:00.000000Z",
                            mentor_id: null,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 2,
                                person_id: 4,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                    ],
                },
                {
                    id: 3,
                    title: "Echoes in the Static",
                    plot: "A psychological thriller about a radio host who intercepts a strange signal.",
                    rating: null,
                    metadata:
                        '{"genre_tags":["thriller","mystery","psychological"]}',
                    box_office: null,
                    runtime: null,
                    release_date: "2025-10-31T00:00:00.000000Z",
                    premiered_at: null,
                    is_released: false,
                    director_id: 3,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    casting: {
                        person_id: 2,
                        movie_id: 3,
                        character_name: "Mysterious Caller (Voice)",
                        billing_order: 5,
                        salary: "50000.00",
                        contract_details: {
                            voice_only: true,
                        },
                    },
                    awards: [],
                    director: {
                        id: 3,
                        name: "Chloe Dubois",
                        biography:
                            "A rising star, known for intense dramatic performances. She recently directed her first short film and is working on her feature debut.",
                        type: "both",
                        awards_received: "[]",
                        net_worth: "8000000.00",
                        date_of_birth: "1995-07-01T00:00:00.000000Z",
                        mentor_id: null,
                        created_at: "2025-01-01T00:00:00.000000Z",
                        updated_at: "2025-01-01T00:00:00.000000Z",
                    },
                    cast: [
                        {
                            id: 4,
                            name: 'Sam "The Rocket" Riley',
                            biography:
                                "A charismatic action star, famous for performing his own stunts.",
                            type: "actor",
                            awards_received: "[]",
                            net_worth: "35000000.00",
                            date_of_birth: "1985-01-10T00:00:00.000000Z",
                            mentor_id: null,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 3,
                                person_id: 4,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                        {
                            id: 2,
                            name: "Marcus Bellweather",
                            biography:
                                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                            type: "actor",
                            awards_received:
                                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                            net_worth: "25000000.00",
                            date_of_birth: "1988-11-20T00:00:00.000000Z",
                            mentor_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 3,
                                person_id: 2,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                    ],
                },
            ],
            directed_movies: [],
            awards: [],
            mentor: {
                id: 1,
                name: "Eleanor Vance",
                biography:
                    "A highly acclaimed veteran director, known for her visually stunning epics. She occasionally takes on mentorship roles.",
                type: "director",
                awards_received: "[]",
                net_worth: "75000000.00",
                date_of_birth: "1965-03-15T00:00:00.000000Z",
                mentor_id: null,
                created_at: "2025-01-01T00:00:00.000000Z",
                updated_at: "2025-01-01T00:00:00.000000Z",
                directed_movies: [
                    {
                        id: 1,
                        title: "Nebula's Dawn",
                        plot: "A sweeping sci-fi saga about colonizing a distant galaxy.",
                        rating: 7,
                        metadata:
                            '{"world_building":"extensive","cgi_budget":50000000,"themes":["exploration","survival","humanity"]}',
                        box_office: 450000000.5,
                        runtime: 155.5,
                        release_date: "2023-05-19T00:00:00.000000Z",
                        premiered_at: "2023-05-15T19:00:00.000000Z",
                        is_released: true,
                        director_id: 1,
                        created_at: "2025-01-01T00:00:00.000000Z",
                        updated_at: "2025-01-01T00:00:00.000000Z",
                    },
                ],
                awards: [
                    {
                        id: 2,
                        name: "Golden Lion Award",
                        category: "Lifetime Achievement",
                        year: 2024,
                        awardable_type:
                            "Spatie\\LaravelTypeScriptTransformer\\Tests\\Fixtures\\Models\\Person",
                        awardable_id: 1,
                        created_at: "2025-01-01T00:00:00.000000Z",
                        updated_at: "2025-01-01T00:00:00.000000Z",
                    },
                ],
            },
            apprentices: [],
        },
        {
            id: 3,
            name: "Chloe Dubois",
            biography:
                "A rising star, known for intense dramatic performances. She recently directed her first short film and is working on her feature debut.",
            type: "both",
            awards_received: "[]",
            net_worth: "8000000.00",
            date_of_birth: "1995-07-01T00:00:00.000000Z",
            mentor_id: null,
            created_at: "2025-01-01T00:00:00.000000Z",
            updated_at: "2025-01-01T00:00:00.000000Z",
            movies: [
                {
                    id: 1,
                    title: "Nebula's Dawn",
                    plot: "A sweeping sci-fi saga about colonizing a distant galaxy.",
                    rating: 7,
                    metadata:
                        '{"world_building":"extensive","cgi_budget":50000000,"themes":["exploration","survival","humanity"]}',
                    box_office: 450000000.5,
                    runtime: 155.5,
                    release_date: "2023-05-19T00:00:00.000000Z",
                    premiered_at: "2023-05-15T19:00:00.000000Z",
                    is_released: true,
                    director_id: 1,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    casting: {
                        person_id: 3,
                        movie_id: 1,
                        character_name: "Dr. Aris Thorne",
                        billing_order: 2,
                        salary: "1500000.00",
                        contract_details: null,
                    },
                    awards: [
                        {
                            id: 1,
                            name: "Galaxy Award",
                            category: "Best Visuals",
                            year: 2023,
                            awardable_type:
                                "Spatie\\LaravelTypeScriptTransformer\\Tests\\Fixtures\\Models\\Movie",
                            awardable_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                        },
                    ],
                    director: {
                        id: 1,
                        name: "Eleanor Vance",
                        biography:
                            "A highly acclaimed veteran director, known for her visually stunning epics. She occasionally takes on mentorship roles.",
                        type: "director",
                        awards_received: "[]",
                        net_worth: "75000000.00",
                        date_of_birth: "1965-03-15T00:00:00.000000Z",
                        mentor_id: null,
                        created_at: "2025-01-01T00:00:00.000000Z",
                        updated_at: "2025-01-01T00:00:00.000000Z",
                    },
                    cast: [
                        {
                            id: 2,
                            name: "Marcus Bellweather",
                            biography:
                                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                            type: "actor",
                            awards_received:
                                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                            net_worth: "25000000.00",
                            date_of_birth: "1988-11-20T00:00:00.000000Z",
                            mentor_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 1,
                                person_id: 2,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                        {
                            id: 3,
                            name: "Chloe Dubois",
                            biography:
                                "A rising star, known for intense dramatic performances. She recently directed her first short film and is working on her feature debut.",
                            type: "both",
                            awards_received: "[]",
                            net_worth: "8000000.00",
                            date_of_birth: "1995-07-01T00:00:00.000000Z",
                            mentor_id: null,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 1,
                                person_id: 3,
                            },
                            awards: [],
                            directed_movies: [
                                {
                                    id: 3,
                                    title: "Echoes in the Static",
                                    plot: "A psychological thriller about a radio host who intercepts a strange signal.",
                                    rating: null,
                                    metadata:
                                        '{"genre_tags":["thriller","mystery","psychological"]}',
                                    box_office: null,
                                    runtime: null,
                                    release_date: "2025-10-31T00:00:00.000000Z",
                                    premiered_at: null,
                                    is_released: false,
                                    director_id: 3,
                                    created_at: "2025-01-01T00:00:00.000000Z",
                                    updated_at: "2025-01-01T00:00:00.000000Z",
                                },
                            ],
                        },
                    ],
                },
            ],
            directed_movies: [
                {
                    id: 3,
                    title: "Echoes in the Static",
                    plot: "A psychological thriller about a radio host who intercepts a strange signal.",
                    rating: null,
                    metadata:
                        '{"genre_tags":["thriller","mystery","psychological"]}',
                    box_office: null,
                    runtime: null,
                    release_date: "2025-10-31T00:00:00.000000Z",
                    premiered_at: null,
                    is_released: false,
                    director_id: 3,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    awards: [],
                    cast: [
                        {
                            id: 4,
                            name: 'Sam "The Rocket" Riley',
                            biography:
                                "A charismatic action star, famous for performing his own stunts.",
                            type: "actor",
                            awards_received: "[]",
                            net_worth: "35000000.00",
                            date_of_birth: "1985-01-10T00:00:00.000000Z",
                            mentor_id: null,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 3,
                                person_id: 4,
                            },
                            awards: [],
                        },
                        {
                            id: 2,
                            name: "Marcus Bellweather",
                            biography:
                                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                            type: "actor",
                            awards_received:
                                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                            net_worth: "25000000.00",
                            date_of_birth: "1988-11-20T00:00:00.000000Z",
                            mentor_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 3,
                                person_id: 2,
                            },
                            awards: [],
                        },
                    ],
                },
            ],
            awards: [],
            mentor: null,
            apprentices: [],
        },
        {
            id: 4,
            name: 'Sam "The Rocket" Riley',
            biography:
                "A charismatic action star, famous for performing his own stunts.",
            type: "actor",
            awards_received: "[]",
            net_worth: "35000000.00",
            date_of_birth: "1985-01-10T00:00:00.000000Z",
            mentor_id: null,
            created_at: "2025-01-01T00:00:00.000000Z",
            updated_at: "2025-01-01T00:00:00.000000Z",
            movies: [
                {
                    id: 2,
                    title: "Crimson Alley",
                    plot: "A gritty neo-noir thriller set in a rain-soaked metropolis.",
                    rating: 8,
                    metadata: '{"style":"neo-noir","setting":"urban dystopia"}',
                    box_office: 85000000,
                    runtime: 118,
                    release_date: "2024-01-12T00:00:00.000000Z",
                    premiered_at: "2024-01-10T20:00:00.000000Z",
                    is_released: true,
                    director_id: 5,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    casting: {
                        person_id: 4,
                        movie_id: 2,
                        character_name: 'Victor "The Ghost" Martel',
                        billing_order: 2,
                        salary: "2000000.00",
                        contract_details: {
                            stunt_coordinator_consult: true,
                        },
                    },
                    awards: [],
                    director: {
                        id: 5,
                        name: "Alex Schmidt",
                        biography: null,
                        type: "director",
                        awards_received: null,
                        net_worth: null,
                        date_of_birth: "1972-09-05T00:00:00.000000Z",
                        mentor_id: null,
                        created_at: "2025-01-01T00:00:00.000000Z",
                        updated_at: "2025-01-01T00:00:00.000000Z",
                    },
                    cast: [
                        {
                            id: 2,
                            name: "Marcus Bellweather",
                            biography:
                                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                            type: "actor",
                            awards_received:
                                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                            net_worth: "25000000.00",
                            date_of_birth: "1988-11-20T00:00:00.000000Z",
                            mentor_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 2,
                                person_id: 2,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                        {
                            id: 4,
                            name: 'Sam "The Rocket" Riley',
                            biography:
                                "A charismatic action star, famous for performing his own stunts.",
                            type: "actor",
                            awards_received: "[]",
                            net_worth: "35000000.00",
                            date_of_birth: "1985-01-10T00:00:00.000000Z",
                            mentor_id: null,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 2,
                                person_id: 4,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                    ],
                },
                {
                    id: 3,
                    title: "Echoes in the Static",
                    plot: "A psychological thriller about a radio host who intercepts a strange signal.",
                    rating: null,
                    metadata:
                        '{"genre_tags":["thriller","mystery","psychological"]}',
                    box_office: null,
                    runtime: null,
                    release_date: "2025-10-31T00:00:00.000000Z",
                    premiered_at: null,
                    is_released: false,
                    director_id: 3,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    casting: {
                        person_id: 4,
                        movie_id: 3,
                        character_name: "Jack Ryder (Radio Host)",
                        billing_order: 1,
                        salary: "4000000.00",
                        contract_details: null,
                    },
                    awards: [],
                    director: {
                        id: 3,
                        name: "Chloe Dubois",
                        biography:
                            "A rising star, known for intense dramatic performances. She recently directed her first short film and is working on her feature debut.",
                        type: "both",
                        awards_received: "[]",
                        net_worth: "8000000.00",
                        date_of_birth: "1995-07-01T00:00:00.000000Z",
                        mentor_id: null,
                        created_at: "2025-01-01T00:00:00.000000Z",
                        updated_at: "2025-01-01T00:00:00.000000Z",
                    },
                    cast: [
                        {
                            id: 4,
                            name: 'Sam "The Rocket" Riley',
                            biography:
                                "A charismatic action star, famous for performing his own stunts.",
                            type: "actor",
                            awards_received: "[]",
                            net_worth: "35000000.00",
                            date_of_birth: "1985-01-10T00:00:00.000000Z",
                            mentor_id: null,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 3,
                                person_id: 4,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                        {
                            id: 2,
                            name: "Marcus Bellweather",
                            biography:
                                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                            type: "actor",
                            awards_received:
                                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                            net_worth: "25000000.00",
                            date_of_birth: "1988-11-20T00:00:00.000000Z",
                            mentor_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 3,
                                person_id: 2,
                            },
                            awards: [],
                            directed_movies: [],
                        },
                    ],
                },
            ],
            directed_movies: [],
            awards: [],
            mentor: null,
            apprentices: [],
        },
        {
            id: 5,
            name: "Alex Schmidt",
            biography: null,
            type: "director",
            awards_received: null,
            net_worth: null,
            date_of_birth: "1972-09-05T00:00:00.000000Z",
            mentor_id: null,
            created_at: "2025-01-01T00:00:00.000000Z",
            updated_at: "2025-01-01T00:00:00.000000Z",
            movies: [],
            directed_movies: [
                {
                    id: 2,
                    title: "Crimson Alley",
                    plot: "A gritty neo-noir thriller set in a rain-soaked metropolis.",
                    rating: 8,
                    metadata: '{"style":"neo-noir","setting":"urban dystopia"}',
                    box_office: 85000000,
                    runtime: 118,
                    release_date: "2024-01-12T00:00:00.000000Z",
                    premiered_at: "2024-01-10T20:00:00.000000Z",
                    is_released: true,
                    director_id: 5,
                    created_at: "2025-01-01T00:00:00.000000Z",
                    updated_at: "2025-01-01T00:00:00.000000Z",
                    awards: [],
                    cast: [
                        {
                            id: 2,
                            name: "Marcus Bellweather",
                            biography:
                                "A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.",
                            type: "actor",
                            awards_received:
                                '[{"award":"Rising Star Trophy","year":2015,"category":"Best Newcomer"}]',
                            net_worth: "25000000.00",
                            date_of_birth: "1988-11-20T00:00:00.000000Z",
                            mentor_id: 1,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 2,
                                person_id: 2,
                            },
                            awards: [],
                        },
                        {
                            id: 4,
                            name: 'Sam "The Rocket" Riley',
                            biography:
                                "A charismatic action star, famous for performing his own stunts.",
                            type: "actor",
                            awards_received: "[]",
                            net_worth: "35000000.00",
                            date_of_birth: "1985-01-10T00:00:00.000000Z",
                            mentor_id: null,
                            created_at: "2025-01-01T00:00:00.000000Z",
                            updated_at: "2025-01-01T00:00:00.000000Z",
                            pivot: {
                                movie_id: 2,
                                person_id: 4,
                            },
                            awards: [],
                        },
                    ],
                },
            ],
            awards: [],
            mentor: null,
            apprentices: [],
        },
    ];
