import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
import { TokenUserDto } from '../dto/token-user.dto.js';

export type TokenUserRequest = Request<RequestParams, RequestBody, TokenUserDto>;
