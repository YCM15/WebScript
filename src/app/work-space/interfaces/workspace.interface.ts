export interface Proyects {
    _id:           string;
    nombre:        string;
    creador:       string;
    html:          string;
    css:           string;
    js:            string;
    colaboradores: Colaboradores[];
    createdAt:     Date;
    updatedAt:     Date;
    __v:           number;
}

export interface Colaboradores {
    _id: ID;
}

export interface ID {
    _id:      string;
    nickname: string;
}