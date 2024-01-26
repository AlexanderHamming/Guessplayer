export interface SpelarKarriar {
    år: string;
    klubb: string;
    seriematcher: number;
    mål: number;
    klubbLand: string;
}

export interface LandslagsKarriar {
    år: string;
    landslag: string;
    landslagsmatcher: number;
    landslagsmål: number;
}

export interface Spelare {
    id: number;
    namn: string;
    spelarKarriar: SpelarKarriar[];
    landslagsKarriar: LandslagsKarriar[];
}

export interface LattareSpelareRoot {
    lattaspelare: Spelare[];
}

export interface SvarareSpelareRoot {
    svararespelare: Spelare[];
}
