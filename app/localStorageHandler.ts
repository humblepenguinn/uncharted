export function saveDataToLocalStorage(riddleIndex: number) {
    localStorage.setItem("riddleIndex", riddleIndex.toString());
}