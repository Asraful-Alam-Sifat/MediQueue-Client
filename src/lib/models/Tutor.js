import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  name: String,
  photo: String,
  availableDays: String,
  timeSlot: String,
  pricePerHour: Number,
  totalSlots: Number,
  startDate: String,
  location: String,
  institution: String,
  experience: String,
  subject: String,
  teachingMode: String,
});

export const Tutor = mongoose.models.Tutor || mongoose.model('Tutor', tutorSchema, 'tutor');