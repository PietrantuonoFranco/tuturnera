import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Timetable extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45 })
    day!: string;
    
    @Column()
    hour!: string;
}