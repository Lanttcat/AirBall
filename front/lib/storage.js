/**
 * 本地存储封装
 * @author NikoLan (niko.sky.lan@gmail.com)
 */

let winStorage = window.localStorage;

let storage = {
    setItem(key, value) {
        winStorage.setItem(key, value);
    },
    getItem(key) {
        return winStorage.getItem(key);
    },
    removeItem(key) {
        winStorage.removeItem(key);
    },
    clear() {
        winStorage.clear();
    }
}

module.exports = storage;