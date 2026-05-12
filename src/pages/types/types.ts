export interface Vacancy {
    id: string,
    name: string,
    url?: string,
    salary: {
        from: number | null,
        to: number | null,
        currency: string | null,
        gross: boolean,
    } | null,
    area: {
        id: string,
        name: string,
    },
    experience: {
        id: string,
        name: string,
    },
    schedule: {
        id: string,
        name: string,
    } | null,
    employer: {
        id: string,
        name: string,
        logo_urls?: {
            '90'?: string,
            '240'?: string,
            original?: string,
        };
    } | null;

    snippet?: {
        requirement?: string | null,
        responsibility?: string | null  
    }
    alternate_url: string,
    description?: string,
}

export interface SearchParams {
    skills: string[],
    searchString: string,
    city: string
}