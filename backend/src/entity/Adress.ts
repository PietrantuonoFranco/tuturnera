import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Adress extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45 })
    street!: string;
    
    @Column({ type: "int" })
    number!: number;

    @Column({ type: "int", nullable: true })
    floor: number | null = null;

    @Column({ type: "varchar", length: 255, nullable: true })
    department: string | null = null;

    @Column({ type: "varchar", length: 45, nullable: true })
    intersectionStreet: string | null = null;

    @Column({ type: "varchar", length: 45 })
    city!: string;

    @Column({ type: "varchar", length: 45 })
    province!: string;

    @Column({ type: "varchar", length: 45 })
    country!: string;
}