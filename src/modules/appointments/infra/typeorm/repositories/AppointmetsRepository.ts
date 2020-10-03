import { EntityRepository, Repository } from 'typeorm';

import {IAppointmentsRepository} from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from "../entities/Appointment";

// para o entity repository passei meu model -> Appointment
@EntityRepository(Appointment)
// extends Repository é a metodo criado pelo typeorm, ja vem nativo do proprio typeorm
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }

}

export default AppointmentsRepository;
