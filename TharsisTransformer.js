// Convert the input message to a JSON string
var inputData = JSON.stringify(msg);

// Initialize the output object structure
var outputObj = {};

// Set the header information
outputObj.caseId = msg['OrderID']; // Assign the OrderID from the input message
outputObj.site = "CPO-CDS"; // Set a static site value

// Array to contain episode objects
var episodeArray = [];

// Create an episode object
var episodeObject = {};

// --------------------------- Episode Date and ID ------------------------------ //
// Import Java classes for date formatting
var SimpleDateFormat = java.text.SimpleDateFormat;
var TimeZone = java.util.TimeZone;

// Create a date formatter for UTC timezone
var sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

// Get the current date and format it
var dateObj = DateUtil.getCurrentDate("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
var dateFormated = sdf.parse(dateObj);
var milliseconds = dateFormated.getTime(); // Convert to milliseconds

// Set episode date and ID
episodeObject.episodeDate = milliseconds; // Assign the formatted date in milliseconds
episodeObject.episodeId = msg['OrderID']; // Assign the OrderID as the episode ID

// --------------------------- Attributes Definitions ------------------------------ //
var attributeArr = []; // Array to hold attribute objects

// Primary Attributes - PID
var attributeObjectPID = {};
attributeObjectPID.externalName = "PID";
attributeObjectPID.value = msg['tipodocumento'] + msg['numerodocumento']; // Combine document type and number
attributeArr.push(attributeObjectPID);

// Primary Attributes - Patient Name
var attributeObjectName = {};
attributeObjectName.externalName = "NombrePaciente";
attributeObjectName.value = msg['nombrepaciente']; // Assign patient name
attributeArr.push(attributeObjectName);

// Primary Attributes - Patient Date of Birth
var attributeObjectDOB = {};
attributeObjectDOB.externalName = "PatientDOB";
attributeObjectDOB.value = msg['PatientDOB']; // Assign patient date of birth
attributeArr.push(attributeObjectDOB);

// Primary Attributes - Patient Sex
var attributeObjectSex = {};
attributeObjectSex.externalName = "PatientSex";
attributeObjectSex.value = msg['PatientSex']; // Assign patient sex
attributeArr.push(attributeObjectSex);

// Primary Attributes - OrderID
var attributeObjectOrderID = {};
attributeObjectOrderID.externalName = "OrderID";
attributeObjectOrderID.value = msg['OrderID']; // Assign OrderID
attributeArr.push(attributeObjectOrderID);

// --------------------------- Load Results ------------------------------ //
var z = 0; // Initialize counter for results loop
for each (resultados in msg['resultados']) {
    var attributeObject = {};
    attributeObject.externalName = msg['resultados'][z]['determinaciondescripcion']; // Assign test description
    attributeObject.value = msg['resultados'][z]['resultado']; // Assign test result
    attributeObject.units = msg['resultados'][z]['unidad']; // Assign units
    attributeObject.range = msg['resultados'][z]['rangonormal']; // Assign normal range
    attributeArr.push(attributeObject); // Add to attributes array
    z++; // Increment counter
}
// --------------------------- End Load Results ------------------------------ //

// Load attributes into the episode object
episodeObject.attributeWithValues = attributeArr;
episodeArray.push(episodeObject); // Add episode to the episodes array
outputObj.episodes = episodeArray; // Assign episodes array to the output object

// Set sender reference using a UUID generator
outputObj.senderReference = UUIDGenerator.getUUID();

// Convert the output object to a JSON string and assign it to the message
msg = JSON.stringify(outputObj);
