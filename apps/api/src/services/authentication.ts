import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@saas-monorepo/database';
import {
  AuthCheckPayload,
  AuthCheckResult,
  ForgotPayload,
  ForgotResult,
  LoginPayload,
  LoginResult,
  RegisterPayload,
  RegisterResult,
  ResetPayload,
} from '../types/auth.js';
import { AbstractServiceOptions } from '../types/services.js';

export class AuthenticationService {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }

  async login(payload: LoginPayload) {
    console.log('Starting login process...');
    let user = null;
    try {
      console.log('Querying the database for user...');
      user = await this.prisma.user.findUniqueOrThrow({
        where: { email: payload.email.toLowerCase() },
        select: {
          email: true,
          id: true,
          password: true,
        },
      });
      console.log('User found:', user);
    } catch (err) {
      console.error('Error querying the database:', err);
      throw err;
    }

    console.log('Validating password...');
    const isPasswordValid = await this.validatePassword(payload.password, user.password as string);

    if (!isPasswordValid) {
      console.error('test');
      throw new Error('test');
    }

    console.log('Generating access token...');
    const tokenPayload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = jwt.sign(tokenPayload, process.env['ACCESS_TOKEN_SECRET'] as string, {
      expiresIn: process.env['ACCESS_TOKEN_TTL'],
    });

    console.log('Login successful!');

    return {
      accessToken,
      user,
    };
  }

  async register(payload: RegisterPayload) {
    let user = null;
    user = await this.prisma.user.findUnique({
      where: { email: payload.email.toLowerCase() },
      select: {
        email: true,
        id: true,
        password: true,
      },
    });
    if (user) {
      throw new Error("user already exist");
    }

    const hashedPassword = await this.hashPassword(payload.password);
    user = await this.prisma.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });
    return user;
  }

  async authCheck(payload: AuthCheckPayload) {
    let user = null;

    console.log(payload)
    try {
      user = await this.prisma.user.findUniqueOrThrow({
        where: { id: payload.id },
        select: {
          email: true,
          id: true,
        },
      });
    } catch (err) {
      throw new Error("Not Found");
    }
    return user;
  }
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  private async validatePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
