/**
 * ItalianGreeter
 */
export class ItalianGreeter {
    constructor(public message: string) {

    }
    greet(): string {
        return "Ciao " + this.message;
    }
}
