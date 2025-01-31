// Convert input string to JSON object
var inputData = JSON.stringify(msg);

// Initialize output object structure
var outputObj = {};

// Set header
outputObj.caseId = msg['OrderID'];
outputObj.site = "CPO-CDS";

// Array to contain Episodes
var episodeArray = new Array();

// Create episode object
var episodeObject = {};

// Episode Data and ID
episodeObject.episodeDate = "1738351672000";
episodeObject.episodeId = msg['OrderID'];

// Attributes Definition
var attributeArr = new Array();

// Primary Attributes - PID
var attributeObjectgeneral = {};
attributeObjectgeneral.externalName="PID" 
attributeObjectgeneral.value = msg['tipodocumento'] + msg['numerodocumento'];
attributeArr.push(attributeObjectgeneral);

// Primary Attributes - Nombre Paciente
var attributeObjectgeneral = {};
attributeObjectgeneral.externalName="NombrePaciente" 
attributeObjectgeneral.value = msg['nombrepaciente'];
attributeArr.push(attributeObjectgeneral);

// Primary Attributes - DOB Paciente
var attributeObjectgeneral = {};
attributeObjectgeneral.externalName="PatientDOB" 
attributeObjectgeneral.value = msg['PatientDOB'];
attributeArr.push(attributeObjectgeneral);

// Primary Attributes - Sexo Paciente
var attributeObjectgeneral = {};
attributeObjectgeneral.externalName="PatientSex" 
attributeObjectgeneral.value = msg['PatientSex'];
attributeArr.push(attributeObjectgeneral);

// Primary Attributes - OrderID
var attributeObjectgeneral = {};
attributeObjectgeneral.externalName="OrderID" 
attributeObjectgeneral.value = msg['OrderID'];
attributeArr.push(attributeObjectgeneral);

// ---------------------------Load Results------------------------------ //

var z = 0;
for each (resultados in msg['resultados']) {
    var attributeObject = {};
    attributeObject.externalName = msg['resultados'][z]['determinaciondescripcion'];
    attributeObject.value = msg['resultados'][z]['resultado'];
    attributeObject.units = msg['resultados'][z]['unidad'];
    attributeObject.range = msg['resultados'][z]['rangonormal'];
    attributeArr.push(attributeObject);
    z++;
}

// ---------------------------End Load Results-------------------------- //

// Load attributes to episode
episodeObject.attributeWithValues = attributeArr;
episodeArray.push(episodeObject);
outputObj.episodes = episodeArray;

// Set sender reference
outputObj.senderReference = UUIDGenerator.getUUID();//JSON.stringify(aux_message);

// Output Message from Source transformer
msg = JSON.stringify(outputObj);
