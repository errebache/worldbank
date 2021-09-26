// export interface Countries {
//   pagers?:Pagers;
//   data?:Datacountries[];
// }

// export interface Datacountries {
//     region?:Region[];
//     adminregion?:Adminregion[];
//     incomeLevel?:IncomeLevel[];
//     lendingType?:LendingType[];
//     rootObject?:RootObject[];
// }

// export interface Pagers {
//     page?: number;
//     pages?: number;
//     per_page?: string;
//     total?: number;
// }

// export interface Adminregion {
//     id?: string;
//     iso2code?: string;
//     value?: string;
// }

// export interface IncomeLevel {
//     id?: string;
//     iso2code?: string;
//     value?: string;
// }

// export interface LendingType {
//     id?: string;
//     iso2code?: string;
//     value?: string;
// }

// export interface RootObject {
//     id?: string;
//     iso2Code?: string;
//     name?: string;
//     region?: Region;
//     adminregion?: Adminregion;
//     incomeLevel?: IncomeLevel;
//     lendingType?: LendingType;
//     capitalCity?: string;
//     longitude?: string;
//     latitude?: string;
// }

export interface Countries {
	page?: number;
	pages?: number;
	per_page?: number;
	total?: number;
	sourceid?: number;
	sourcename?: number;
	lastupdated?: Date;
	data: DataCountries;
}
export interface DataCountries {
	indicator: Indicator;
	country: Country;
	countryiso3code?: string;
	date?: number;
	value?: string;
	scale?: string;
	unit?: string;
	obs_status?: string;
	decimal?: number;
}
export interface Indicator {
	id?: string;
	value?: string;
}

export interface Country {
	id?: string;
	value?: string;
}

export interface Region {
	id?: string;
	iso2code?: string;
	value?: string;
}

export interface DataFilter {
	region: string;
	indicator: string;
	startYear: number;
	endYear: number;
}
