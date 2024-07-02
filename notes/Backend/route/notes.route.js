import express from 'express';

import { getNotes } from '../controller/notes.controller.js'

const router=express.Router();

router.get("/",getNotes );

export default router;