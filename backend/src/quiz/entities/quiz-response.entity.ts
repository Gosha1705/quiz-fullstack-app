import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('quiz_responses')
export class QuizResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'session_id', length: 255 })
  sessionId: string;

  @Column('jsonb')
  answers: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}