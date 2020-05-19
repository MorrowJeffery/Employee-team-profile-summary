const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

async function getTeam() {
    let moreEngineers = true;
    let moreInterns = true;
    let team = [];
    let idCounter = 2;
    console.log("Welcome to the team profile generator. Lets get started!");

    //this will get the manager's information
        let managerInfo = await inquirer.prompt(
            [
            {
                name: "managerName",
                message: "What is the team manager's name?",
            },
            {
                name: "managerEmail",
                message: "What is the manager's email?",
            },
            {
                name: "managerOffice",
                message: "What is the manager's office number?",
            },
        ]
        )
        let manager = new Manager(managerInfo.managerName, 1, managerInfo.managerEmail, managerInfo.managerOffice);
        team.push(manager);


    //this will get see if there are any engineers and generate them accordingly
        let engineerAnswer = await inquirer.prompt({
            message: "Are there any Engineers?",
            name: "isEngineer",
            type: "rawlist",
            choices: ["Yes", "No"]
        })
        if (engineerAnswer.isEngineer == "Yes") {
            do {
                let engineers = await inquirer.prompt(
                    [
                    {
                        name: "engineerName",
                        message: "What is the engineer's name?"
                    },
                    {
                        name: "engineerEmail",
                        message: "What is the engineer's email?"
                    },
                    {
                        name: "engineerGithub",
                        message: "What is the engineer's Github username?"
                    },
                    {
                        name: "more",
                        message: "Are there anymore Engineers to add?",
                        type: "rawlist",
                        choices: ["Yes", "No"]
                    },
                ]
                )

                let engineer = new Engineer(engineers.engineerName, idCounter, engineers.engineerEmail, engineers.engineerGIthub);
                idCounter++;
                team.push(engineer);
                if (engineers.more == "No") {moreEngineers = false;}
            } while (moreEngineers == true)
        }

    //this will see if there are any interns and generate the accordingly
        let internAnswer = await inquirer.prompt({
            message: "Are there any Interns?",
            name: "isIntern",
            type: "rawlist",
            choices: ["Yes", "No"]
        })
        if (internAnswer.isIntern == "Yes") {
            do {
                let interns = await inquirer.prompt(
                    [
                    {
                        name: "internName",
                        message: "What is the interns's name?"
                    },
                    {
                        name: "internEmail",
                        message: "What is the intern's email?"
                    },
                    {
                        name: "internSchool",
                        message: "What is the intern's school name?"
                    },
                    {
                        name: "more",
                        message: "Are there anymore interns to add?",
                        type: "rawlist",
                        choices: ["Yes", "No"]
                    },
                ]
                )

                let intern = new Intern(interns.internName, idCounter, interns.internEmail, interns.internSchool);
                idCounter++;
                team.push(intern);
                if (interns.more == "No") {moreInterns = false;}
            } while (moreInterns == true)
        }
        generateHTML(team);
}
function generateHTML(team) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(team), "utf-8");
}

getTeam();