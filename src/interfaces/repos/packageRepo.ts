import { Ipackage, IpackageAuth, IpackageEdit } from "../schema/packageSchema";

export interface IpackageRepo{
 savePackage(data:IpackageAuth):Promise<Ipackage>
 getPackages():Promise<Ipackage[] | null> 
 editById(data:IpackageEdit):Promise<Ipackage | null>  
}