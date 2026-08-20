

import { Injectable } from '@angular/core';
import { int_Favorite } from '../Interfaces/int_Favorite';
import { srv_Hostels } from './srv_Hostels';
import { srv_Attractions } from './srv_Attractions';
import { SrvWalkingTrailService } from './srv-WalkingTrail.service';

@Injectable({
  providedIn: 'root',
})
export class srv_Favorite {

  constructor(public srv_walkingTrail:SrvWalkingTrailService,
      public srv_attractions:srv_Attractions,
      public srv_hostels:srv_Hostels) { }
  mock_favorites: int_Favorite[] = [
    // Attractions
    { FavoriteId: 1, TourCoordinatorId: 1, AttractionsId: 3 },
    { FavoriteId: 2, TourCoordinatorId: 3, AttractionsId: 3 },
    { FavoriteId: 3, TourCoordinatorId: 2, AttractionsId: 1 },
    { FavoriteId: 4, TourCoordinatorId: 5, AttractionsId: 2 },
    { FavoriteId: 5, TourCoordinatorId: 1, AttractionsId: 3 },
    { FavoriteId: 6, TourCoordinatorId: 3, AttractionsId: 1 },
    { FavoriteId: 7, TourCoordinatorId: 4, AttractionsId: 2 },
    { FavoriteId: 8, TourCoordinatorId: 1, AttractionsId: 3 },
    { FavoriteId: 9, TourCoordinatorId: 3, AttractionsId: 1 },
    { FavoriteId: 10, TourCoordinatorId: 4, AttractionsId: 2 },
    { FavoriteId: 11, TourCoordinatorId: 1, AttractionsId: 3 },

    // Hostels
    { FavoriteId: 12, TourCoordinatorId: 2, HostelsId: 1 },
    { FavoriteId: 13, TourCoordinatorId: 5, HostelsId: 4 },
    { FavoriteId: 14, TourCoordinatorId: 1, HostelsId: 9 },
    { FavoriteId: 15, TourCoordinatorId: 3, HostelsId: 1 },
    { FavoriteId: 16, TourCoordinatorId: 4, HostelsId: 2 },
    { FavoriteId: 17, TourCoordinatorId: 2, HostelsId: 3 },
    { FavoriteId: 18, TourCoordinatorId: 5, HostelsId: 4 },
    { FavoriteId: 19, TourCoordinatorId: 1, HostelsId: 5 },

    // Walking Trails
    { FavoriteId: 20, TourCoordinatorId: 3, WalkingTrailId: 2 },
    { FavoriteId: 21, TourCoordinatorId: 4, WalkingTrailId: 6 },
    { FavoriteId: 22, TourCoordinatorId: 1, WalkingTrailId: 1 },
    { FavoriteId: 23, TourCoordinatorId: 5, WalkingTrailId: 2 },
    { FavoriteId: 24, TourCoordinatorId: 2, WalkingTrailId: 7 },
    { FavoriteId: 25, TourCoordinatorId: 3, WalkingTrailId: 3 },
    { FavoriteId: 26, TourCoordinatorId: 4, WalkingTrailId: 5 },
    { FavoriteId: 27, TourCoordinatorId: 1, WalkingTrailId: 6 },
    { FavoriteId: 28, TourCoordinatorId: 2, WalkingTrailId: 4 },
    { FavoriteId: 29, TourCoordinatorId: 2, WalkingTrailId: 2 },
  ];
  getFavorites() {
    return this.mock_favorites;
  }

  getFavoriteByCoordinatorId(id: number) {
    return this.mock_favorites.filter(f => f.TourCoordinatorId === id);
  }

  isFavorite(userId: number, id: number, type: 'attraction' | 'hostel' | 'trail'): boolean {
    return this.mock_favorites.some(f =>
      f.TourCoordinatorId === userId &&
      (
        (type === 'attraction' && f.AttractionsId === id) ||
        (type === 'hostel' && f.HostelsId === id) ||
        (type === 'trail' && f.WalkingTrailId === id)
      )
    );
  }

  addFavorite(userId: number, id: number, type: 'attraction' | 'hostel' | 'trail') {
    if (this.isFavorite(userId, id, type)) return;

    const newFavorite: int_Favorite = {
      FavoriteId: this.mock_favorites.length + 1,
      TourCoordinatorId: userId,
      ...(type === 'attraction' && { AttractionsId: id }),
      ...(type === 'hostel' && { HostelsId: id }),
      ...(type === 'trail' && { WalkingTrailId: id }),
    };

    this.mock_favorites.push(newFavorite);
    console.log(`Favorite added: ${JSON.stringify(newFavorite)}`);
  }

  removeFavorite(userId: number, id: number, type: 'attraction' | 'hostel' | 'trail') {
    const index = this.mock_favorites.findIndex(f =>
      f.TourCoordinatorId === userId &&
      (
        (type === 'attraction' && f.AttractionsId === id) ||
        (type === 'hostel' && f.HostelsId === id) ||
        (type === 'trail' && f.WalkingTrailId === id)
      )
    );

    if (index !== -1) {
      this.mock_favorites.splice(index, 1);
    }
  }

  removeByFavoriteId(favoriteId: number) {
    const index = this.mock_favorites.findIndex(f => f.FavoriteId === favoriteId);
    if (index !== -1) {
      this.mock_favorites.splice(index, 1);
      console.log(`Favorite with ID ${favoriteId} removed successfully.`);
    }
  }
}