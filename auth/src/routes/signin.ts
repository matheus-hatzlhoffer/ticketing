import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../utils/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must bem valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a valid password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid Credencials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password,
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credencials');
    }

    // Generate Json web token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jkt: userJwt,
    };

    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
