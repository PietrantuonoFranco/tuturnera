import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { Adress } from "./Adress.ts";
import { Timetable } from "./Timetable.ts";

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 45 })
    name: string;
    
    @Column({ nullable: true })
    phone: number | null = null;

    @Column({ type: "varchar", length: 45, unique: true, nullable: true })
    email: string | null = null;

    @Column({ type: "varchar", length: 255, nullable: true })
    description: string | null = null

    @Column({ type: "varchar", length: 45, nullable: true })
    imgProfileURL: string | null = null;

    @OneToOne(() => Service, (service) => service.adress)
    adress: Adress;

    @OneToMany(() => Service, (service) => service.timetables)
    timetables: Timetable[];
}