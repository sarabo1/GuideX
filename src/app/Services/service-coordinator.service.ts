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
      TourCoordinatorId: 202,
      RoleId: 303,
      SchoolId: 1,
    },
    {
      UserId: 2,
      TourCoordinatorId: 203,
      RoleId: 304,
      SchoolId: 2,
    },
    {
      UserId: 3,
      TourCoordinatorId: 204,
      RoleId: 305,
      SchoolId: 3,
    },
    {
      UserId: 4,
      TourCoordinatorId: 205,
      RoleId: 306,
      SchoolId: 4,
    },
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
}
