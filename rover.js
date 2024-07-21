class Rover {
    constructor(position) {
        this.mode = "NORMAL";
        this.generatorWatts = 110;
        this.position = position;
    }
    receiveMessage = function (message) {
        let results = [];
        let roverStatus = {};
        for (let i = 0; i < message.command.length; i++) {
            if (message.command[i].commandType === "STATUS_CHECK") {
                roverStatus.mode = this.mode;
                roverStatus.generatorWatts = this.generatorWatts;
                roverStatus.position = this.position;
                let status = {
                    completed: true,
                    roverStatus: roverStatus,
                };
                results.push(status);
            }
            if (message.command[i].commandType === "MODE_CHANGE") {
                if (
                    message.command[i].value === "LOW_POWER" ||
                    message.command[i].value === "NORMAL"
                ) {
                    this.mode = message.command[i].value;
                    let status = {
                        completed: true,
                    };
                    results.push(status);
                } else {
                    let status = {
                        completed: false,
                    };
                    results.push(status);
                }
            }
            if (message.command[i].commandType === "MOVE") {
                if (this.mode === "NORMAL") {
                    this.position = message.command[i].value;
                    let status = {
                        completed: true,
                    };
                    results.push(status);
                } else if (this.mode === "LOW_POWER") {
                    let status = {
                        completed: false,
                    };
                    results.push(status);
                }
            }
        }
        let response = {
            message: message.name,
            results: results,
        };
        return response;
    };
}

module.exports = Rover;
