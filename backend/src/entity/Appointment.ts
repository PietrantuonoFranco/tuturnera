import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Service } from "./Service.ts";

@Entity()
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column({ type: "varchar", length: 45, nullable: true })
    subject: string | null = null;

    @Column({ type: "varchar", length: 45 })
    appointmentState!: string;

    @ManyToOne(() => Appointment, (appointment) => appointment.service)
    service: Service;
}