import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/App.errors';
import authConfig from '@config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT Token is missing.');
    }
    // Bearer sdlkfjsldkfjlsjfffdklfjdflksjflkjfdlk3405905
    let token;
    if (authHeader.includes('Bearer')) {

        token = authHeader.split(' ');
    }
    token = authHeader;

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT Token.');
    }
}