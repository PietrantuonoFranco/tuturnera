import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Appointment } from "../entity/Appointment.ts";

const appointmentRepository = AppDataSource.getRepository(Appointment);
export class AppointmentController {
  static async all(request: Request, response: Response, next: NextFunction) {
    try {
      const appointments = await appointmentRepository.find();

      if (appointments.length === 0) {
        return response.status(404).json({ error: "Appointments not found" });
      }

      return response.status(200).json({ message: "Appointments found", appointments: appointments });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).json({ error: "Appointment ID not provided"});
      }

      const appointment = await appointmentRepository.findOne({
        where: { id }
      });

      if (!appointment) {
        return response.status(404).json({ error: "Appointment not found" });
      }

      return response.status(200).json({ message: "Appointment found", appointment: appointment });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  static async save(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        date,
        subject,
        appointmentState,
        service
      } = request.body;

      if (!date || !subject || !appointmentState || !service) {
        return response.status(400).json({ error: "Necesary data not provided" });
      }

      const appointment = Object.assign(new Appointment(), {
        date,
        subject,
        appointmentState,
        service
      });

      await appointmentRepository.save(appointment);

      return response.status(201).json({ message: "Appointment created", appointment: appointment });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

    static async remove(request: Request, response: Response, next: NextFunction) {
      try {
        const id = parseInt(request.params.id);

        if (!id) {
          return response.status(400).json({ error: "Appointment ID not provided"});
        }

        let appointmentToRemove = await appointmentRepository.findOneBy({ id });

        if (!appointmentToRemove) {
            return response.status(404).json({ error: "Appointment not found" });
        }

        await appointmentRepository.remove(appointmentToRemove);

        return response.status(204).json({ message: "Appointment deleted" });
    } catch {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}