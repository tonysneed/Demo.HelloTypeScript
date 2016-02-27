import { Greeter } from "./greeter/greeter";

let greeter = new Greeter("World");
let msg = greeter.greet();
console.log(msg);