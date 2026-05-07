import {
  getSavedMonos,
  saveMono,
  deleteSavedMono,
  isMonoSaved,
} from '../utils/db'

export async function getAllSavedMonos() {
  return getSavedMonos()
}

export async function saveMonoToLocal(mono) {
  return saveMono(mono)
}

export async function removeSavedMono(id) {
  return deleteSavedMono(id)
}

export async function checkIsMonoSaved(id) {
  return isMonoSaved(id)
}
