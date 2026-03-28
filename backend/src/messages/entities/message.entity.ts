import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'advisor_id' }) // Кому отправляем
  advisorId: number;

  @Column({ name: 'sender_name' })
  senderName: string;

  @Column({ name: 'sender_email' })
  senderEmail: string;

  @Column('text')
  body: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}