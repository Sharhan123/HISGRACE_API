import { userController } from "../adapters/userController";
import { UserRepository } from "../infrastructure/respostories/userRepository";
import { tempUserRepository } from "../infrastructure/respostories/tempUserRepository";
import { userUseCase } from "../useCases/userUseCase";
import { driverUseCase } from "../useCases/driverUseCase";

import { encrypting } from "./encrypt";
import { JWTTOKEN } from "./jwt";
import { GenerateOtp } from "./generateOtp";
import { mailSender } from "./nodeMailer";
import { vehicleController } from "../adapters/vehicleControllers";
import { vehicleUseCase } from "../useCases/vehicleUseCase";
import { vehicleRepository } from "../infrastructure/respostories/vehicleRepositories";
import { adminUseCase } from "../useCases/adminUseCase";
import { adminRepository } from "../infrastructure/respostories/adminRepository";
import { adminController } from "../adapters/adminController";
import { packageController } from "../adapters/packageController";
import { packageUseCase } from "../useCases/packagesUseCase";
import { packageRepository } from "../infrastructure/respostories/packageRepository";
import { driverRepository } from "../infrastructure/respostories/driverRepository";
import { driverController } from "../adapters/driverController";
import { bookingRepository } from "../infrastructure/respostories/bookingRepository";
import { bookingusecase } from "../useCases/bookingUseCase";
import { bookingController } from "../adapters/bookingController";
import { chatRepository } from "../infrastructure/respostories/chatRepository";
import { chatUsecase } from "../useCases/chatUseCase";
import { chatController } from "../adapters/chatController";
import { PackageBookingRepository } from "../infrastructure/respostories/packageBookingRepository";
import { packageBookingUsecase } from "../useCases/packageBooking";
import { packageBookingController } from "../adapters/packageBookingController";
import { ReviewRepository } from "../infrastructure/respostories/reviewRespositories";
import { ReviewUsecase } from "../useCases/reviewUsecase";
import { reviewController } from "../adapters/reviewControllers";


// Providers used ****
const encrypt = new encrypting()
const generateOTP = new GenerateOtp()
const  sendMail = new mailSender()
const jwt = new JWTTOKEN()
// repositories ****
const userRepository = new UserRepository()
const tempuserRepository = new tempUserRepository()
const VehicleRepository = new vehicleRepository()
const AdminRepository = new adminRepository()
const PackageRepository = new packageRepository()
const DriverRepository = new driverRepository()
const BookingRepository = new bookingRepository()
const ChatRepository  = new chatRepository()
const packageBookingRepository = new PackageBookingRepository()
const reviewRepository = new ReviewRepository()
// usecases ****
const useruseCase = new userUseCase(userRepository,tempuserRepository,jwt,sendMail,encrypt)
const vehicleuseCase = new vehicleUseCase(VehicleRepository)
const adminuseCase = new adminUseCase(AdminRepository)
const packageuseCase = new packageUseCase(PackageRepository)
const driverusecase = new driverUseCase(DriverRepository,sendMail)
const bookingUsecase = new bookingusecase(BookingRepository)
const chatusecase = new chatUsecase(ChatRepository)
const packageBookingusecase = new packageBookingUsecase(packageBookingRepository)
const reviewUsecase = new ReviewUsecase(reviewRepository)
// controller ****
export const uController = new userController(useruseCase,generateOTP,encrypt,bookingUsecase)
export const vController = new vehicleController(vehicleuseCase)
export const aConntroller = new adminController(adminuseCase,jwt)
export const pController = new packageController(packageuseCase)
export const dController = new driverController(driverusecase,jwt)
export const bController = new bookingController(bookingUsecase,vehicleuseCase)
export const cController = new chatController(chatusecase)
export const pbController = new packageBookingController(packageBookingusecase)
export const rController = new reviewController(reviewUsecase)