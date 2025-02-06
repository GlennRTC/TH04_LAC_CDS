// Convert input string to JSON object
var inputData = JSON.stringify(msg);

// Initialize output object structure
var outputObj = {};

// Set header
outputObj.caseId = msg['ordenID'].replace(/-/g,'');
outputObj.site = "";

// Array to contain Episodes
var episodeArray = [];

// ---------------------------Episode Date and ID------------------------------ //
//** Import Java classes
var SimpleDateFormat = java.text.SimpleDateFormat;
var TimeZone = java.util.TimeZone;
var sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy");
sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

// ---------------------------Group resultados by fechavalidacion------------------------------ //
var resultadosByDate = {};

for each (resultados in msg['resultados']) {
    var fechaValidacion = resultados['fechavalidacion'];
    if (!resultadosByDate[fechaValidacion]) {
        resultadosByDate[fechaValidacion] = [];
    }
    resultadosByDate[fechaValidacion].push(resultados);
}

// Create an episode for each fechavalidacion
for (var fechaValidacion in resultadosByDate) {
    if (resultadosByDate.hasOwnProperty(fechaValidacion)) {
        // Create episode object
        var episodeObject = {};

        // Parse fechaValidacion to a Date object
        var dateObj;
        try {
            dateObj = DateUtil.getDate("dd/MM/yyyy HH:mm:ss", fechaValidacion);
        } catch (e) {
            // Handle invalid date format
            throw new Error("Invalid date format for fechaValidacion: " + fechaValidacion);
        }

        // Format the date to milliseconds
        var dateFormated = sdf.parse(dateObj);
        var milliseconds = dateFormated.getTime();

        episodeObject.episodeDate = milliseconds;
        episodeObject.episodeId = msg['ordenID'].replace(/-/g, '') + msg['ordennumero'];

        // ---------------------------Attributes Definitions------------------------------ //
        var attributeArr = [];

        // Primary Attributes - PID
        var attributeObjectgeneral = {};
        attributeObjectgeneral.externalName = "PID";
        attributeObjectgeneral.value = msg['tipodocumento'] + msg['numerodocumento'];
        attributeArr.push(attributeObjectgeneral);

        // Primary Attributes - Nombre Paciente
        attributeObjectgeneral = {};
        attributeObjectgeneral.externalName = "NombrePaciente";
        attributeObjectgeneral.value = msg['nombrepaciente'];
        attributeArr.push(attributeObjectgeneral);

        // Primary Attributes - DOB Paciente
        attributeObjectgeneral = {};
        attributeObjectgeneral.externalName = "PatientDOB";
        attributeObjectgeneral.value = msg['PatientDOB'];
        attributeArr.push(attributeObjectgeneral);

        // Primary Attributes - Sexo Paciente
        attributeObjectgeneral = {};
        attributeObjectgeneral.externalName = "PatientSex";
        attributeObjectgeneral.value = msg['PatientSex'];
        attributeArr.push(attributeObjectgeneral);

        // Primary Attributes - OrderID
        attributeObjectgeneral = {};
        attributeObjectgeneral.externalName = "OrderID";
        attributeObjectgeneral.value = msg['ordenID'];
        attributeArr.push(attributeObjectgeneral);

        // ---------------------------Load Results------------------------------ //
        for each (resultados in resultadosByDate[fechaValidacion]) {
            var attributeObject = {};
            attributeObject.externalName = resultados['determinaciondescripcion'];
            attributeObject.value = resultados['resultado'];
            attributeObject.units = resultados['unidad'];
            attributeObject.range = resultados['rangonormal'];
            attributeArr.push(attributeObject);
        }

        // ---------------------------End Load Results-------------------------- //

        // Load attributes to episode
        episodeObject.attributeWithValues = attributeArr;
        episodeArray.push(episodeObject);
    }
}

outputObj.episodes = episodeArray;

// Set sender reference
outputObj.senderReference = UUIDGenerator.getUUID();

// Output Message from Source transformer
msg = JSON.stringify(outputObj);