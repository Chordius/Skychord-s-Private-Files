const prompt = require('prompt-sync')();

var gamingAllNight = []
var alwaysTrue = true

while (alwaysTrue)  {
    // Sort the tasks in Pending-Finished-Failed order
    // Why is this sorting algorithm so fucking complicated????
    gamingAllNight.sort(function(a, b){
            let x = a.status
            let y = b.status
            if ((x == "Pending" && (y == "Finished" || y == "Failed")) || (x == "Finished" && y == "Failed")) {
                return -1;
            } else if ((x == "Failed" && (y == "Finished" || y == "Pending")) || (x == "Finished" && y == "Pending")) {
                return 1;
            } else {
                return 0;
            }
        }
    );
    
    console.log("Welcome to Task Tracker\nWhat would you like to do?\n[1] Make a schedule\n[2] View schedules\n[3] Update schedule\n[0] Exit");
    var selection = prompt('Please input a number (1-4): ');

    // Choice Number 1: Make Schedule
    if (selection == 1) {
        console.log("\n===========================================\n\nPlease enter the details of your task")
        var taskName = prompt('Name: ');
        var taskDeadline = prompt('Deadline: ')
        console.log("Status:\n[1] Pending\n[2] Finished\n[3] Failed")
        var taskStatus = prompt('Input (1-3): ')
        if (taskStatus == 1 || taskStatus == 2 || taskStatus == 3) {
            if (taskStatus == 1) { taskStatus = "Pending" }
            if (taskStatus == 2) { taskStatus = "Finished" }
            if (taskStatus == 3) { taskStatus = "Failed" }
        } else {
            console.log("Error! Invalid task status!\n")
            break
        }
        let newTask = {
            name: taskName,
            deadline: taskDeadline,
            status: taskStatus,
            data:
                function fetchInformation() {
                    let text = "Task name: " + this.name + "    ||    Deadline: " + this.deadline + "   ||    Status: " + this.status
                    console.log(text)
                },
        }
        gamingAllNight.push(newTask)
        console.log("\nTask has successfully been added!")
        var taskName = prompt('Click any key...');
        console.log("\n===========================================\n")
    }

    // Choice Number 2: Display Schedule Made
    else if (selection == 2) {
        if (gamingAllNight.length == 0) {
            console.log("There are no tasks to be seen.")
            break
        } 
        console.log("\n===========================================\n")
        for (var i = 0; i < (gamingAllNight.length); i++) {
            gamingAllNight[i].data()
        }
        console.log("\n===========================================\n")
        var taskName = prompt('Click any key...');
        console.log("")

    // Choice Number 3: 
    } else if (selection == 3) {
        if (gamingAllNight.length == 0) {
            console.log("There are no tasks to be seen.")
            break
        }
        console.log("\n===========================================\n\nPending:")
        var statusPending = false
        for (var i = 0; i < (gamingAllNight.length); i++) {
            if (gamingAllNight[i].status == "Pending") {
                console.log((i+1) + ". " + gamingAllNight[i].name)
                var statusPending = true
            }
        }
        if (!statusPending) {
            console.log("-  None")
        }
        console.log("Finished:")
        var statusFinish = false
        for (var i = 0; i < (gamingAllNight.length); i++) {
            if (gamingAllNight[i].status == "Finished") {
                console.log((i+1) + ". " + gamingAllNight[i].name)
                var statusFinish = true
            }
        }
        if (!statusFinish) {
            console.log("-  None")
        }
        console.log("Failed:")
        var statusFailed = false
        for (var i = 0; i < (gamingAllNight.length); i++) {
            if (gamingAllNight[i].status == "Failed") {
                console.log((i+1) + ". " + gamingAllNight[i].name)
                var statusFailed = true
            }
        }
        if (!statusFailed) {
            console.log("-  None")
        }
        console.log("\nWhich task would you like to update?")
        var updateStatus1 = prompt('Input task number: ')
        if (gamingAllNight[updateStatus1 - 1]) {
            console.log("\nChange " + gamingAllNight[updateStatus1-1].name + " (" + gamingAllNight[updateStatus1-1].status + ") status to?")
        } else {
            console.log("Error! Invalid task status!\n")
            break
        }
        console.log("Status:\n[1] Pending\n[2] Finished\n[3] Failed")
        var updateStatus2 = prompt('Input task number: ')
        if (updateStatus2 == 1 ||updateStatus2 == 2 || updateStatus2 == 3) {
            if (updateStatus2 == 1) { gamingAllNight[updateStatus1 - 1].status = "Pending" }
            if (updateStatus2 == 2) { gamingAllNight[updateStatus1 - 1].status = "Finished" }
            if (updateStatus2 == 3) { gamingAllNight[updateStatus1 - 1].status = "Failed" }
            console.log("Status successfully updated! " + gamingAllNight[updateStatus1 - 1].name + " is now " + gamingAllNight[updateStatus1 - 1].status)
            var taskName = prompt('Click any key...');
            console.log("\n===========================================\n")
        } else {
            console.log("Error! Invalid task status!\n")
            break
        }
    
    // Quit the program
    } else if (selection == 0) {
        console.log("\nProgram Over\nThanks for using Task Tracker!")
        var alwaysTrue = false
        break;
    } else {
        console.log("\nInvalid input! Try again!\n===========================================\n")
    }
}