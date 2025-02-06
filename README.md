# 🔬 Laboratory Results Transformer

A JavaScript transformer for Mirth Connect that processes and standardizes laboratory results data send from an LIS and received via HTTP POST.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-production-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

## 🎯 Overview

Transform laboratory data from external systems into a standardized JSON format with ease. This transformer expertly handles patient information and multiple laboratory results, grouping them by validation date into episodes.

## 🧩 Components

### 🔄 Source Transformer

```javascript
// Core functionality preview
outputObj.caseId = msg['ordenID'].replace(/-/g,'');
outputObj.episodes = episodeArray;
outputObj.senderReference = UUIDGenerator.getUUID();
```

### 📝 Message Format

The transformer processes JSON data with this structure:

```json
{
    "caseId": "orderIdentifier",
    "site": "",
    "episodes": [
        {
            "episodeDate": "milliseconds",
            "episodeId": "uniqueId",
            "attributeWithValues": [
                {
                    "externalName": "testName",
                    "value": "resultValue",
                    "units": "measurementUnit",
                    "range": "normalRange"
                }
            ]
        }
    ],
    "senderReference": "uuid"
}
```

## 🛠️ Technical Details

Key features:
- ⏰ UTC timezone date processing
- 🔍 Result grouping by validation date
- 🔑 Unique identifier generation
- 👤 Patient demographics handling
- 📊 Laboratory results processing

## 📦 Dependencies

Required components:
- ⚡ Mirth Connect JavaScript environment
- 📅 Java SimpleDateFormat and TimeZone classes
- 🎲 UUID generation utility
- ⚙️ DateUtil for date parsing

## 📈 Performance

The transformer is optimized for:
- 🚀 Fast processing
- 💾 Memory efficiency
- 🔄 High throughput
- 🛡️ Error resilience

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
Made with ❤️ for healthcare interoperability