import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Service } from "./Service.ts";
import { Appointment } from "./Appointment.ts";
import { Role } from "./Role.ts";

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

    @OneToOne(() => Role)
    @JoinColumn()
    role!: Role;

    @OneToMany(() => User, (user) => user.parent)
    associatedUsers!: User[];

    @ManyToOne(() => User, (user) => user.associatedUsers, { nullable: true })
    parent: User | null = null;

    @OneToMany(() => User, (user) => user.services, {nullable: true})
    services: Service[] | null = null;

    @OneToMany(() => User, (user) => user.appointments, {nullable: true})
    appointments: Appointment[] | null = null;
}