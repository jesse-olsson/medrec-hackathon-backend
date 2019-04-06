const express = require('express');
const request = require('request-promise-native');
const cors = require('cors');

const app = express();
app.use(cors())

const santiagoMedStatementUrls = [
    'https://fire-pit.mihin.org/po-ehr-1/baseDstu3/MedicationStatement?patient=SantiagoMorales&_pretty=true',
    'https://fire-pit.mihin.org/po-ehr-2/baseDstu3/MedicationStatement?patient=SantiagoMorales&_pretty=true',
    'https://fire-pit.mihin.org/po-ehr-3/baseDstu3/MedicationStatement?patient=SantiagoMorales&_pretty=true'
];

const santiagoPatientUrl = 'https://fire-pit.mihin.org/po-ehr-1/baseDstu3/Patient/SantiagoMorales';

const headers = {
    'Accept-Charset': 'utf-8',
    'Authorization': 'Basic anBhc2VydmVydWlAbWloaW4ub3JnOkJvc3NSd01JQ29ubmVjdDE4',
    'Accept': 'application/fhir+xml;q=1.0, application/fhir+json;q=1.0, application/xml+fhir;q=0.9, application/json+fhir;q=0.9'
};

app.get('/meds', async (req, res) => {
    const medStatementResponses = await Promise.all(
        santiagoMedStatementUrls.map( url => request(url, {headers, json: true}) )
    );
    res.json(medStatementResponses);
});

app.get('/patient', async (req, res) => {
    const response = await request(santiagoPatientUrl, {headers, json: true});
    res.json(response);
});

app.listen(8080);