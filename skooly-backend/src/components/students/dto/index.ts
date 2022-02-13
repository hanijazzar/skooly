import { Transform } from 'class-transformer';
import { IsNumberString, IsOptional, IsString, IsArray } from 'class-validator';
import { ObjectLiteral } from 'src/common/types';

export class StudentsDto {
    @IsOptional()
    @IsNumberString()
    count: number;

    @IsOptional()
    @IsNumberString()
    page: number;

    @IsOptional()
    @IsString()
    searchTerm: string;
}

export class StudentDto {
    @IsOptional()
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    nationality: string;

    @IsString()
    dateOfBirth: string;

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsArray()
    familyMembers: ObjectLiteral[];

}

export interface IStudent {
    id?: number;
    firstName: string;
    lastName: string;
    nationality: string;
    dateOfBirth: string;
}
