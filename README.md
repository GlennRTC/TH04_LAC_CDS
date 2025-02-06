# LIS Results Transformer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)
[![Mirth Connect](https://img.shields.io/badge/Mirth%20Connect-Integration-blue)](https://www.nextgen.com/products-and-services/mirth-connect)

A JavaScript transformer for Mirth Connect that standardizes and processes clinical data from Laboratory Information Systems (LIS). The transformer specializes in grouping laboratory results by validation date and creating separate episodes for each unique date.

## 📋 Overview

This repository contains two main components:

- **TharsisTransformer.js**: The main JavaScript transformer that processes input data
- **EjemploMsg.json**: A JSON specification defining the expected input message format

## ✨ Features

- 🏥 Processes patient demographic information
- 📊 Handles multiple laboratory results in a single message
- 📅 Groups results by validation date (`fechavalidacion`)
- 🔄 Creates separate episodes for each unique date
- 📝 Maintains comprehensive medical result attributes including:
  - Test descriptions
  - Result values
  - Units of measurement
  - Normal ranges
- 🔑 Generates unique message identifiers
- 📑 Structures output in an episode-based format

## 🔨 Output Structure

The transformer generates a JSON output with the following structure:

```json
{
    "caseId": "...",
    "site": "CPO-CDS",
    "episodes": [
        {
            "episodeDate": 1738778606459,
            "episodeId": "37736032554048",
            "attributeWithValues": [
                {
                    "externalName": "PID",
                    "value": "RC1074138474"
                },
                // Additional attributes...
            ]
        }
    ],
    "senderReference": "1eaa52f1-0fc0-4329-ae60-6d029dcedc5d"
}
```

## 📥 Input Message Format

The input message should follow the structure defined in `EjemploMsg.json`, which includes:

### Patient Information
- Full name (`nombrepaciente`)
- Document type (`tipodocumento`)
- Document number (`numerodocumento`)
- Date of birth (`PatientDOB`)
- Sex (`PatientSex`)
- Order ID (`OrderID`)

### Results Array
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

## 🚀 Usage

1. Prepare your input data following the format specified in `EjemploMsg.json`
2. The transformer will:
   - Extract patient information
   - Group laboratory results by validation date
   - Create separate episodes for each unique date
   - Process all laboratory results within each episode
   - Generate a unique sender reference
   - Output a standardized JSON structure

## 🔧 Dependencies

- UUID generator implementation (referenced as `UUIDGenerator.getUUID()`)
- JSON parsing/stringifying capabilities
- Java libraries for date formatting and timezone handling

## 📝 Example Input

```json
{
  "OrderID": "37-736032",
  "tipodocumento": "RC",
  "numerodocumento": "1074138474",
  "nombrepaciente": "MARIA ANGEL BELTRAN ARAGONES",
  "PatientDOB": "18/12/2024 05:00:00",
  "PatientSex": "F",
  "resultados": [
    {
      "determinaciondescripcion": "PROTEINA C REACTIVA PCR",
      "resultado": "NEGATIVO",
      "unidad": "mg/dL",
      "rangonormal": "< 2.15",
      "fechavalidacion": "1738778606459"
    }
  ]
}
```

## ℹ️ Notes

- The transformer assumes input data is properly formatted JSON
- All dates should follow the format shown in the example (DD-MM-YYYY)
- The system is configured to work with the CPO-CDS site by default
- The transformer automatically generates UUIDs for message tracking
- Each episode is uniquely identified by a combination of the OrderID and `fechavalidacion`

## 👥 Contributing

Contributions are welcome! If you'd like to improve this script, please:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Submit a pull request with a detailed description of your changes

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
*Made with ❤️ for healthcare interoperability*
