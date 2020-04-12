import express from "express";
import routes from "../routes";
import { postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registervView, postRegisterView);

export default apiRouter;
