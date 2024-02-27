const inquirer = require('inquirer');

// Function to display main menu options
function displayMainMenu() {
    console.log("\n=== Main Menu ===");
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then(answer => {
        // Based on user's choice, call appropriate functions or exit
        switch (answer.option) {
            case 'View all departments':
                // Call function to view all departments
                console.log("Viewing all departments...");
                break;
            case 'View all roles':
                // Call function to view all roles
                console.log("Viewing all roles...");
                break;
            case 'View all employees':
                // Call function to view all employees
                console.log("Viewing all employees...");
                break;
            case 'Add a department':
                // Call function to add a department
                console.log("Adding a department...");
                break;
            case 'Add a role':
                // Call function to add a role
                console.log("Adding a role...");
                break;
            case 'Add an employee':
                // Call function to add an employee
                console.log("Adding an employee...");
                break;
            case 'Update an employee role':
                // Call function to update an employee role
                console.log("Updating an employee role...");
                break;
            case 'Exit':
                // Exit the application
                console.log("Exiting application...");
                return;
        }

        // After completing the chosen action, display the main menu again
        displayMainMenu();
    });
}

// Start the application by displaying the main menu
displayMainMenu();