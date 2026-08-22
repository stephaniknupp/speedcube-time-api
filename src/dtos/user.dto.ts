export interface IUserDTO {
    name: string;
    username: string;
    email: string;
    password: string;
}

export function isIUserDTO(data: unknown): data is IUserDTO {
    if (typeof data !== 'object' || data === null) return false;

    const obj = data as Record<string, unknown>;

    if (typeof obj.name !== 'string') return false;
    if (typeof obj.username !== 'string') return false;
    if (typeof obj.email !== 'string') return false;
    if (typeof obj.password !== 'string') return false;

    return true;
}