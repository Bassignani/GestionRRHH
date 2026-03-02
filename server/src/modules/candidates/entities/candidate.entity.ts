import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkExperience } from './work-experience.entity';
import { Attachment } from './attachment.entity';

export enum CandidateStatus {
  ACTIVE = 'Active',
  ARCHIVED = 'Archived',
}

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  dni: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  nationality: string | null;

  @Column({ nullable: true })
  address: string | null;

  @Column({ name: 'marital_status', nullable: true })
  maritalStatus: string | null;

  @Column({ nullable: true })
  email: string | null;

  @Column({ nullable: true })
  phone: string | null;

  @Column({ name: 'zone_id', type: 'int', nullable: true })
  zoneId: number | null;

  @Column({ name: 'rotation_id', type: 'int', nullable: true })
  rotationId: number | null;

  @Column({ name: 'medical_status', nullable: true })
  medicalStatus: string | null;

  @Column({
    type: 'enum',
    enum: CandidateStatus,
    default: CandidateStatus.ACTIVE,
  })
  status: CandidateStatus;

  @Column({ name: 'ai_raw_data', type: 'jsonb', nullable: true })
  aiRawData: Record<string, unknown> | null;

  @OneToMany(() => WorkExperience, (workExperience) => workExperience.candidate)
  workExperiences: WorkExperience[];

  @OneToMany(() => Attachment, (attachment) => attachment.candidate)
  attachments: Attachment[];

  archive(): void {
    this.status = CandidateStatus.ARCHIVED;
  }
}
