const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
    test("if constructor sets position and default values for mode and generatorWatts", function () {
        let output = new Rover(2);
        expect(output.position).toBe(2);
        expect(output.mode).toBe("NORMAL");
        expect(output.generatorWatts).toBe(110);
    });
    test("if response returned by receiveMessage contains the name of the message", function () {
        let command = new Command("STATUS_CHECK");
        let message = new Message("test", command);
        let rover = new Rover(10);
        let result = rover.receiveMessage(message);
        expect(result.message).toBe("test");
    });
    test("if response returned by receiveMessage includes two results if two commands are sent in the message", function () {
        let arr = [new Command("STATUS_CHECK"), new Command("STATUS_CHECK")];
        let message = new Message("test", arr);
        let rover = new Rover(10);
        let result = rover.receiveMessage(message);
        expect(result.results).toHaveLength(2);
    });
    it("responds correctly to the status check command", function () {
        let rover = new Rover(10);
        let commands = [new Command("STATUS_CHECK")];
        let message = new Message("testing STATUS_CHECK", commands);
        let result = rover.receiveMessage(message);
        expect(result.results[0].roverStatus.mode).toBe("NORMAL");
        expect(result.results[0].roverStatus.generatorWatts).toBe(110);
        expect(result.results[0].roverStatus.position).toBe(10);
    });
    it("responds correctly to the mode change command", function () {
        let rover = new Rover(10);
        let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
        let message = new Message("testing MODE", commands);
        let result = rover.receiveMessage(message);
        expect(rover.mode).toBe("LOW_POWER");
        expect(result.results[0].completed).toBeTruthy();
    });
    it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
        let rover = new Rover(10);
        let commands = [
            new Command("MODE_CHANGE", "LOW_POWER"),
            new Command("MOVE", 50),
        ];
        let message = new Message("testing LOW_POWER MOVE", commands);
        let result = rover.receiveMessage(message);
        expect(result.results[1].completed).toBeFalsy();
    });
    it("responds with the position for the move command", function () {
        let rover = new Rover(10);
        let commands = [new Command("MOVE", 50)];
        let message = new Message("testing MOVE", commands);
        let result = rover.receiveMessage(message);
        expect(rover.position).toBe(50);
    });
});
