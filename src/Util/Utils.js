export default class Utils {
    static getRndNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min
    }
}