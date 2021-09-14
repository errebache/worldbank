export interface Countries {
  pagers:Pagers;
  data:Datacountries[];
}

export interface Datacountries {
    region:Region[];
    adminregion:Adminregion[];
    incomeLevel:IncomeLevel[];
    lendingType:LendingType[];
    rootObject:RootObject[];
}

export interface Pagers {
    page: number;
    pages: number;
    per_page: string;
    total: number;
}

export interface Region {
    id: string;
    iso2code: string;
    value: string;
}

export interface Adminregion {
    id: string;
    iso2code: string;
    value: string;
}

export interface IncomeLevel {
    id: string;
    iso2code: string;
    value: string;
}

export interface LendingType {
    id: string;
    iso2code: string;
    value: string;
}

export interface RootObject {
    id: string;
    iso2Code: string;
    name: string;
    region: Region;
    adminregion: Adminregion;
    incomeLevel: IncomeLevel;
    lendingType: LendingType;
    capitalCity: string;
    longitude: string;
    latitude: string;
}
