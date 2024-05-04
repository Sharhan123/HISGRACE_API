export interface hashPassword{
    encrypt(password:String):Promise<String>
    compare(password:String,hashedPass:String):Promise<boolean>
}