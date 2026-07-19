import {Router} from "express";

import { getAllAddresses, getAddressById, createAddress, updateAddress, deleteAddress } from "./address.controller.js";
import { addressIdSchema, createAddressSchema, updateAddressSchema } from "./address.validation.js";

import validate from "../../middlewares/validate.js";
import { protect } from "../auth/auth.middleware.js";

const router = Router();

router.use(protect);

router.get("/", getAllAddresses);
router.get("/:id", validate(addressIdSchema), getAddressById)
router.post("/", validate(createAddressSchema), createAddress);
router.patch("/:id", validate(updateAddressSchema), updateAddress);
router.delete("/:id", validate(addressIdSchema), deleteAddress);

export default router;