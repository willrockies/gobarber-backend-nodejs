import Appoinment from '../infra/typeorm/entities/Appointment';

export interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appoinment | undefined>;
}
