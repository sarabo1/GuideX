import { Injectable } from '@angular/core';
import { ServiceCoordinatorService } from './service-coordinator.service';
import { ServicesGuideService } from './services-guide.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsersService {

  public mock_Users: any[]; 

  constructor(public serviceCoordinator: ServiceCoordinatorService, public serviceGuide: ServicesGuideService) { 
      this.mock_Users = [...this.serviceCoordinator.mock_Coordinators, ...this.serviceGuide.mock_Guides];
  }
  GetUsers(): any[] {
    return this.mock_Users;
  }
}
