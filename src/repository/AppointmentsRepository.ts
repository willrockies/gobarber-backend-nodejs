import { AppDataSource } from './../data-source';
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';


// class AppointmentRepository extends Repository<Appointment> {
 

//   public static async findByDate(date: Date): Promise<Appointment | null> {

//     const findAppointment = await this.findOne({
//       where: { date },
//     });

//     return findAppointment || null;

//   }

// }

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
  async findByDate(date: Date): Promise<Appointment | null> {

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;

  }
})

export default AppointmentRepository;