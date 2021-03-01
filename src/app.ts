console.log("Welcome to pw-manager");

const [command] = process.argv.slice(2);

if (command === "set") {
  console.log("You like to set something?");
} else if (command == "get") {
  console.log("Ehat should I get?");
}
