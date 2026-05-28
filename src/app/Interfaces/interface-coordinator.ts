import { InterfaceSchool } from "./interface-school";
import { InterfaceUsers } from "./interface-users";

export interface InterfaceCoordinator {
   TourCoordinatorId : number;
   RoleId : number;
   School : InterfaceSchool;
   user : InterfaceUsers;
}
