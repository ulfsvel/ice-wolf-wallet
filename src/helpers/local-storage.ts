const storage = window.localStorage;

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

export const getAccessToken = (): string | null => {
    return storage.getItem(ACCESS_TOKEN_KEY)
};

export const setAccessToken = (accessToken: string): void => {
    storage.setItem(ACCESS_TOKEN_KEY, accessToken)
};

export const clearStorage = (): void => {
    storage.clear()
};