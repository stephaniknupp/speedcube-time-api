export class Solve {
    private _id: string;
    private _userId: string;
    private _time: number;
    private _createdAt: Date;


    constructor(id: string, userId: string, time: number, createdAt: Date) {
        this._id = id;
        this._userId = userId;
        this._time = time;
        this._createdAt = createdAt;
    }

    
    get id(): string {
        return this._id;
    }


    get userId(): string {
        return this._userId;
    }

    
    get time(): number {
        return this._time;
    }


    get createdAt(): Date {
        return this._createdAt;
    }

    updateTime(time: number): void {
    this._time = time;
    }
}