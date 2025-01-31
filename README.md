# LIS Results Transformer

This repository contains a JavaScript code for Mirth Connect Source transformer for LIS results, designed to standardize and process clinical data from a specific laboratory information systems.

## Overview

The repo contains two reference documents:
- A JavaScript transformer (`TharsisTransformer.js`) that processes input data
- A JSON message format specification (`EjemploMsg.json`) that defines the expected input structure

## Components

### TharsisTransformer.js

This transformer converts laboratory results data into a standardized format. Key features:

- Processes patient demographic information
- Handles multiple laboratory results in a single message
- Maintains medical result attributes including:
  - Test descriptions
  - Result values
  - Units of measurement
  - Normal ranges
- Generates unique message identifiers
- Structures output in an episode-based format

#### Output Structure
The transformer generates a JSON output with the following main sections:
```json
{
    "caseId": "...",
    "site": "CPO-CDS",
    "episodes": [...],
    "senderReference": "..."
}
```

### Input Message Format (EjemploMsg.json)

The input message should follow a specific JSON structure that includes:

#### Patient Information
- Full name (`nombrepaciente`)
- Document type (`tipodocumento`)
- Document number (`numerodocumento`)
- Date of birth (`PatientDOB`)
- Sex (`PatientSex`)
- Order ID (`OrderID`)

#### Results Array
Each result in the `resultados` array contains:
- External ID (`idexterno`)
- Study ID (`idestudio`)
- Validation date (`fechavalidacion`)
- Test code (`codigodeterminacion`)
- Test description (`determinaciondescripcion`)
- Result value (`resultado`)
- Unit of measurement (`unidad`)
- Result observations (`observacionresultado`)
- Normal range (`rangonormal`)
- Validating user (`usuariovalido`)

## Usage

1. Prepare your input data following the format specified in `EjemploMsg.json`
2. The transformer will:
   - Extract patient information
   - Process all laboratory results
   - Generate a unique sender reference
   - Output a standardized JSON structure

## Notes

- The transformer assumes input data is properly formatted JSON
- All dates should follow the format shown in the example (DD-MM-YYYY)
- The system is configured to work with the CPO-CDS site by default
- The transformer automatically generates UUIDs for message tracking

## Dependencies

- Requires a UUID generator implementation (referenced as `UUIDGenerator.getUUID()`)
- JSON parsing/stringifying capabilities
