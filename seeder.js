import fs from 'fs';

import Doctor from './models/doctor.js';
import Clinic from './models/clinic.js';
import connectDB from './config/db.js';

connectDB();

const doctors = JSON.parse(
  fs.readFileSync('./data-save/db_doctors.json', 'utf-8')
);
const clinics = JSON.parse(
  fs.readFileSync('./data-save/clinics.json', 'utf-8')
);

async function deleteAllDocs() {
  try {
    await Doctor.deleteMany({});
  } catch (error) {
    console.error(error);
  }
  process.exit(1);
}

async function insertDocs() {
  try {
    await Doctor.insertMany(doctors.doctors);
    console.log('doctors added');
  } catch (error) {
    console.error(error);
  }
  process.exit(1);
}

if (process.argv[2] === 'add-doctors') {
  insertDocs();
} else if (process.argv[2] === 'delete-doctors') {
  deleteAllDocs();
}

/////////////////////////////////////////////////////

// insert clinics
async function insertClinics() {
  try {
    await Clinic.insertMany(clinics.clinics);
    console.log('clinics added');
  } catch (error) {
    console.error(error);
  }
  process.exit(1);
}

// Delete clinics
async function deleteAllClinics() {
  try {
    await Clinic.deleteMany({});
    console.log('clinics deleted');
  } catch (error) {
    console.error(error);
  }
  process.exit(1);
}

if (process.argv[2] === 'add-clinics') {
  insertClinics();
} else if (process.argv[2] === 'delete-clinics') {
  deleteAllClinics();
}
