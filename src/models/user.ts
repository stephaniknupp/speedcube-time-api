export class User {
    private _id: string;
    private _name: string;
    private _username: string;
    private _email: string;
    private _password: string;
    private _role: string;

    constructor(
        id: string,
        name: string,
        username: string,
        email: string,
        password: string,
        role: string
    ) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._email = email;
        this._password = password;
        this._role = role;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get username(): string {
        return this._username;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    get role(): string {
        return this._role;
    }
}