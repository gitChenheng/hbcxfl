export interface IStudent {
    role: number;
    name: string;
    phone: string;
    studyNum: string;
    grade: string;
    faculty: string;
    major: string;
    clbum: string;
}

export interface ITeacher {
    role: number;
    name: string;
    phone: string;
    teachCardNum: string;
    grade?: string;
    faculty?: string;
    major?: string;
    clbum?: string;
}

export interface IParent {
    id?: string;
}

export interface ITeacher {
    id?: string;
}
