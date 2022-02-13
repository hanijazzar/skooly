import { Column, Model, Table, DataType, BelongsTo, PrimaryKey } from 'sequelize-typescript';

@Table({
    modelName: 'StudentFamilyMembers',
    timestamps: false,
})
export class StudentFamilyMember extends Model<StudentFamilyMember> {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        field: 'student_id',
    })
    studentId: number;

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
        field: 'relationship',
    })
    relationship: string;

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

}
