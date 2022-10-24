export function truncate(str: string | undefined) {
    if (str) {
        return str.length > 40 ? str.substring(0, 37) + '...' : str;
    }
}