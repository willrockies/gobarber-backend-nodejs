import { startOfHour } from "date-fns";
import { getCustomRepository } from 'typeorm';
import Appointment from "../models/Appointment";
import AppointmentRepository from "../repository/AppointmentsRepository";
import AppError from "../errors/AppError";
interface Request {
  provider_id: string,
  date: Date,
}
/**
 * Single Reponsability Principle
 * Dependency Inversion Principle (SOLID)
 */
class CreateAppointmentService {

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    //const appointmentsRepository = getCustomRepository(AppointmentRepository);

    
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await AppointmentRepository.findByDate(appointmentDate);

    //const findAppointmentInSameDate = await AppointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new Error('This appointment is already booked');
    }

    const appointment = AppointmentRepository.create(
      {
        provider_id,
        date: appointmentDate,
      });

      await AppointmentRepository.save(appointment);

    return appointment;

  }


}

export default CreateAppointmentService;