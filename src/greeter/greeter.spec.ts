/// <reference path="../../typings/main.d.ts" />

describe("Greeter", () => {

    describe("greet", () => {

        it("returns Hello World", () => {

            // Arrange
            let greeter = new HelloTypeScript.Greeter("World");

            // Act
            let result = greeter.greet();

            // Assert
            expect(result).toEqual("Hello World");
        });
    });
});