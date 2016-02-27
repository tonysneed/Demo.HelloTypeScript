/**
 * HelloTypeScript.Greeter
 */
namespace HelloTypeScript {
    export class Greeter {
        constructor(public message: string) {

        }
        greet(): string {
            return "Hello " + this.message;
        }
    }
}