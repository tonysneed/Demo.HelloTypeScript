/**
 * ItalianGreeter
 */
export default class ItalianGreeter {
    constructor(public message: string) {

    }
    greet(): string {
        return "Ciao " + this.message;
    }
}
