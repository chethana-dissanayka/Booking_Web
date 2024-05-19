import express from "express";
import { createHotel, deleteHotel, getHotel,
    countByCity, getHotelRooms,
    countByType, getHotels, updateHotel } from "../controllers/hotelc.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyAdmin, createHotel);

//update
router.put("/:id",verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

//get
router.get("/:id",getHotel);

//get all
router.get("/",getHotels);


router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router