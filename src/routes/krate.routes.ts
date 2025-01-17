import express, { Router } from 'express'
import { validators } from '@src/middleware/validation'
import { deleteData, getData, putData, setData } from '@src/controller/storage.controller'
import { rateLimit } from '@src/middleware/rateLimit'
import { authenticateRequest } from '@src/middleware/authentication'

export const krateRouter: Router = express.Router()

krateRouter.get('/:krateId/record/:recordId/', validators.getRecordData, getData)
krateRouter.get('/:krateId/:collectionId?/', validators.getAllData, getData)
krateRouter.post('/:krateId/:collectionId?/', rateLimit, validators.postData, authenticateRequest, setData)
krateRouter.put('/:krateId/:recordId/', rateLimit, validators.putData, putData)
krateRouter.delete('/:krateId/', rateLimit, validators.deleteAllData, deleteData)
krateRouter.delete('/:krateId/record/:recordId', rateLimit, validators.deleteRecordData, deleteData)
