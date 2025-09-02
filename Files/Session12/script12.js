// Error Handling

// Try_Catch :
const makestring = (arr) =>
{
    console.log(arr.join(""));
}

makestring(["parmis","delfani"]);

try
{
makestring(22);
//makestring(["parmis","delfani"]);
console.log("Done");
}
catch(error)
{
    console.log("Error");
    throw("An Error acuured")
}

finally 
{
    console.log("continue");   
}



