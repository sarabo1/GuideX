import { Injectable } from '@angular/core';
import { InterfaceCoordinator } from '../Interfaces/int-coordinator';

@Injectable({
  providedIn: 'root',
})
export class ServiceCoordinatorService {
  constructor() {}
  mock_Coordinators: InterfaceCoordinator[] = [
    {
      UserId: 1,
      TourCoordinatorId: 1,
      RoleId: 3,
      SchoolId: 1,
    },
    {
      UserId: 2,
      TourCoordinatorId: 2,
      RoleId: 4,
      SchoolId: 2,
    },
    {
      UserId: 3,
      TourCoordinatorId: 3,
      RoleId: 5,
      SchoolId: 3,
    },
    {
      UserId: 4,
      TourCoordinatorId: 4,
      RoleId: 2,
      SchoolId: 4,
    },
    {
      UserId: 10,
      TourCoordinatorId: 5,
      RoleId:5,
      SchoolId: 4,
    }
  ];
  GetCoordinators() {
    return this.mock_Coordinators;
  }

  GetLastTourCoordinatorId() {
    const coordinatorIds = this.mock_Coordinators.map(
      (coordinator) => coordinator.TourCoordinatorId,
    );
    return Math.max(...coordinatorIds);
  }

  InsertCoordinator(
    UserId: number,
    TourCoordinatorId: number,
    RoleId: number,
    SchoolId: number,
  ) {
    const newCoordinator: InterfaceCoordinator = {
      UserId: UserId,
      TourCoordinatorId: TourCoordinatorId,
      RoleId: RoleId,
      SchoolId: SchoolId,
    };
    this.mock_Coordinators.push(newCoordinator);
  }
   userExist(userId: number): boolean {
    return this.mock_Coordinators.some(c => c.UserId === userId);
  }
}
