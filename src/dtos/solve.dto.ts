export interface ISolveDTO {
    time: number;
}


export function isISolveDTO(data: unknown): data is ISolveDTO {
    if (typeof data !== 'object' || data === null) return false;

    const obj = data as Record<string, unknown>;

    if (typeof obj.time != 'number') return false;
    if (obj.time <= 0) return false;

    return true;
}