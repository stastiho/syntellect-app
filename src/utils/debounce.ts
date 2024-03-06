export const debounce = (callback: Function, wait: number) => {
    let timeoutId: number | null = null;
    return (...args: any[]) => {
        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
            callback.apply(this, args);
        }, wait);
    };
}