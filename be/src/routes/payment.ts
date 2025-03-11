import express, { Router } from 'express';
import { createPaymentIntentController } from '../controller/paymntController';

const paymentRouter: Router = express.Router();

paymentRouter.post('/create-payment-intent', createPaymentIntentController);

export default paymentRouter;