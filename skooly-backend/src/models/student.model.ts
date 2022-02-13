import { Date } from 'mongoose';
import { Column, Model, Table, DataType, HasMany, HasOne, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { StudentFamilyMember } from './student-family-member.model';

@Table({
    modelName: 'Students',
    timestamps: true,
    paranoid: true,
})
export class Student extends Model<Student> {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        field: 'first_name',
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        field: 'last_name',
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        field: 'nationality',
    })
    nationality: string;

    @Column({
        type: DataType.STRING,
        field: 'date_of_birth',
    })
    dateOfBirth: string;

    @Column({
        type: DataType.STRING,
        field: 'status',
    })
    status: string;
    
    @Column({
        type: DataType.DATE,
        field: 'created_at',
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        field: 'updated_at',
    })
    updatedAt: Date;

    @Column({
        type: DataType.DATE,
        field: 'deleted_at',
    })
    deletedAt: Date;


    @HasMany(() => StudentFamilyMember, 'studentId' )
    studentFamilyMembers: StudentFamilyMember[];

}
