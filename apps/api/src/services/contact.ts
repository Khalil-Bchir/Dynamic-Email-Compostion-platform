import { PrismaClient } from '@saas-monorepo/database';
import { ContactPayload } from 'src/types/contact.js';

import { AbstractServiceOptions } from '../types/services.js';

export class ContactService {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }

  async createContact(payload: ContactPayload) {
    try {
      const contact = await this.prisma.contact.create({
        data: {
          firstName: payload.firstName,
          email: payload.email,
          phone: payload.phone,
          lastName: payload.lastName,
          createdById: payload.createdBy,
        },
      });
      return contact;
    } catch (error) {
      throw error;
    }
  }

  async getAllContacts(createdById: string) {
    try {
      const contacts = await this.prisma.contact.findMany({ where: { createdById: createdById } });
      console.log(contacts);
      return contacts;
    } catch (error) {
      throw error;
    }
  }

  async getContact(id: string) {
    try {
      return await this.prisma.contact.findUnique({
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateContact(id: string, payload: ContactPayload) {
    try {
      const updatedContact = await this.prisma.contact.update({
        where: { id: id },
        data: {
          firstName: payload.firstName,
          email: payload.email,
          phone: payload.phone,
          lastName: payload.lastName,
          createdById: payload.createdBy,
        },
      });
      return updatedContact;
    } catch (error) {
      throw error;
    }
  }

  async deleteContact(id: string) {
    try {
      const deletedContact = await this.prisma.contact.delete({
        where: { id: id },
      });
      return deletedContact;
    } catch (error) {
      throw error;
    }
  }
}
