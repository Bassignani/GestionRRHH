import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Candidate } from './candidate.entity';

export enum AttachmentType {
  CV = 'CV',
  ID_CARD = 'ID_Card',
  MEDICAL = 'Medical',
  CERTIFICATION = 'Certification',
}

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Candidate, (candidate) => candidate.attachments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({
    type: 'enum',
    enum: AttachmentType,
  })
  type: AttachmentType;

  @Column({ name: 'file_url' })
  fileUrl: string;

  @Column({ name: 'original_name' })
  originalName: string;
}
