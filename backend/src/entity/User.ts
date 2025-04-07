import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import type { Service } from "./Service.ts";
import type { Appointment } from "./Appointment.ts";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 45 })
    name!: string;

    @Column({ type: "varchar", length: 45 })
    surname!: string;

    @Column({ type: "varchar", length: 45 })
    password!: string;

    @Column({ type: "varchar", length: 45, nullable: true })
    imgProfileURL: string | null = null;

    @OneToMany(() => User, (user) => user.parent)
    associatedUsers!: User[];

    @ManyToOne(() => User, (user) => user.associatedUsers, { nullable: true })
    parent: User | null = null;

    @OneToMany(() => User, (user) => user.services, {nullable: true})
    services: Service[] | null = null;

    @OneToMany(() => User, (user) => user.appointments, {nullable: true})
    appointments: Appointment[] | null = null;
}