// throw new Error("User not found") // This line will stop the program

try {
    throw new Error("User not found")
} catch (error) {
    console.log(error.message)
} finally {
    console.log("this code runs no matter what")
}

console.log("The program continues")