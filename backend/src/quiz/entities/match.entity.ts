import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('matches')
@Index('idx_matches_quiz_response_id', ['quizResponseId'])
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quiz_response_id' })
  quizResponseId: number;

  @Column({ name: 'advisor_id' })
  advisorId: number;

  @Column()
  score: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}